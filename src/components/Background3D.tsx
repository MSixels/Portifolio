"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * "Rede" — network sphere: ~78 Fibonacci nodes drawn as light points and
 * cyan lines connecting nearby nodes. The globe is hollow: there is no
 * inner mesh, so the far side of the lattice and the star field behind it
 * both show through the middle.
 * ------------------------------------------------------------------ */
const R = 2.05;
const NODE_COUNT = 78;
const GOLDEN_ANGLE = 2.399963; // ~ pi * (3 - sqrt(5))

function useNetworkGeometry() {
  return useMemo(() => {
    const verts: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = i * GOLDEN_ANGLE;
      verts.push(
        new THREE.Vector3(
          Math.cos(th) * rad,
          y,
          Math.sin(th) * rad
        ).multiplyScalar(R)
      );
    }

    const nodePos = new Float32Array(NODE_COUNT * 3);
    verts.forEach((v, i) => {
      nodePos[i * 3] = v.x;
      nodePos[i * 3 + 1] = v.y;
      nodePos[i * 3 + 2] = v.z;
    });
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));

    const edges: number[] = [];
    const thr = R * 0.62;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (verts[i].distanceTo(verts[j]) < thr) {
          edges.push(
            verts[i].x,
            verts[i].y,
            verts[i].z,
            verts[j].x,
            verts[j].y,
            verts[j].z
          );
        }
      }
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(edges), 3)
    );

    return { nodeGeo, edgeGeo };
  }, []);
}

function useStarGeometry(count: number) {
  return useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 8.6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count]);
}

function Scene({
  reduceMotion,
  starCount,
  showStars = true,
}: {
  reduceMotion: boolean;
  starCount: number;
  showStars?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);
  const { nodeGeo, edgeGeo } = useNetworkGeometry();
  const starGeo = useStarGeometry(starCount);
  const { camera } = useThree();

  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const scrollP = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth - 0.5;
      target.current.y = e.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight || 1;
      scrollP.current = Math.min(window.scrollY / max, 1);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion]);

  useFrame((state) => {
    if (reduceMotion) return;
    const t = state.clock.getElapsedTime();
    cur.current.x += (target.current.x - cur.current.x) * 0.05;
    cur.current.y += (target.current.y - cur.current.y) * 0.05;
    const sp = scrollP.current;

    const group = groupRef.current;
    if (group) {
      group.rotation.y = t * 0.12 + cur.current.x * 0.9 + sp * Math.PI * 1.4;
      group.rotation.x = cur.current.y * 0.7 + sp * 0.6;
      group.scale.setScalar(1 - sp * 0.28);
    }

    const stars = starsRef.current;
    if (stars) {
      stars.rotation.y = t * 0.02 + cur.current.x * 0.3;
      stars.rotation.x = Math.sin(t * 0.06) * 0.12;
      stars.position.y = Math.sin(t * 0.22) * 0.18;
    }

    camera.position.x = cur.current.x * 0.6;
    camera.position.y = -cur.current.y * 0.6;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Both materials are additive with depthWrite off, so front and back
            of the globe draw unconditionally and simply accumulate light —
            nothing occludes anything, which is what makes the sphere read as
            hollow wireframe instead of a filled ball. Opacities are pulled
            down from the occluder-era values because additive blending stacks
            wherever the near and far halves overlap. */}
        <points geometry={nodeGeo}>
          <pointsMaterial
            color={0x9fe8ff}
            size={0.075}
            transparent
            opacity={0.7}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        {/* cyan connecting lines */}
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial
            color={0x5a8cff}
            transparent
            opacity={0.22}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>

      {showStars ? (
        <points ref={starsRef} geometry={starGeo}>
          <pointsMaterial
            color={0x9fd8ff}
            size={0.015}
            transparent
            opacity={0.5}
          />
        </points>
      ) : null}
    </>
  );
}

/**
 * How loud the background is allowed to be:
 * - `hero-fade` (home): full strength behind the hero, fading to the soft
 *   floor across the first viewport so About/Experiência/FAQ/Contato read
 *   against a calm backdrop.
 * - `soft` (case study): pinned at the floor from the first pixel — that page
 *   is dense long-form text and the sphere must not compete with it.
 */
export type Background3DMode = "hero-fade" | "soft";

export function Background3D({
  mode = "hero-fade",
}: {
  mode?: Background3DMode;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // On narrow screens the 3D is more subtle: fewer stars, lower opacity.
  const starCount = isMobile ? 420 : 950;
  const strong = isMobile ? 0.55 : 0.92;
  const soft = isMobile ? 0.1 : 0.16;

  // Opacity is written straight to the node instead of going through state:
  // this runs on every scroll frame and must not re-render the Canvas tree.
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    if (mode === "soft") {
      shell.style.opacity = String(soft);
      return;
    }

    const update = () => {
      const span = window.innerHeight * 0.85 || 1;
      const p = Math.min(window.scrollY / span, 1);
      shell.style.opacity = String(strong + (soft - strong) * p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mode, strong, soft]);

  return (
    <div
      ref={shellRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: mode === "soft" ? soft : strong }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 5.2], near: 0.1, far: 100 }}
        frameloop={reduceMotion ? "demand" : "always"}
      >
        <Scene reduceMotion={reduceMotion} starCount={starCount} showStars />
      </Canvas>
    </div>
  );
}
