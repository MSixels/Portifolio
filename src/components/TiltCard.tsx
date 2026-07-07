"use client";

import {
  createElement,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

/**
 * 3D tilt card: on mousemove applies perspective rotateX/rotateY (max ~9°)
 * + translateZ(8px) and a cyan radial "shine" that follows the cursor.
 * On leave it eases back over ~500ms. Disabled under reduced motion and
 * on touch/coarse pointers (no hover).
 */
export function TiltCard({
  as,
  children,
  className,
  style,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const max = 9;

  const handleMove = (ev: React.MouseEvent) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const r = el.getBoundingClientRect();
    const px = (ev.clientX - r.left) / r.width - 0.5;
    const py = (ev.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(
      2
    )}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(8px)`;
    const sh = shineRef.current;
    if (sh) {
      sh.style.opacity = "1";
      sh.style.background = `radial-gradient(440px circle at ${(
        (px + 0.5) *
        100
      ).toFixed(1)}% ${((py + 0.5) * 100).toFixed(
        1
      )}%, rgba(90,140,255,0.18), transparent 60%)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    const sh = shineRef.current;
    if (sh) sh.style.opacity = "0";
    if (reduceMotion) return;

    // Parse current rotation/translate and ease them back to rest.
    const start = performance.now();
    const dur = 500;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const m = el.style.transform.match(
      /rotateX\(([-\d.]+)deg\) rotateY\(([-\d.]+)deg\) translateZ\(([-\d.]+)px\)/
    );
    const sx = m ? parseFloat(m[1]) : 0;
    const sy = m ? parseFloat(m[2]) : 0;
    const sz = m ? parseFloat(m[3]) : 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = ease(p);
      el.style.transform = `perspective(900px) rotateX(${(sx * (1 - e)).toFixed(
        2
      )}deg) rotateY(${(sy * (1 - e)).toFixed(2)}deg) translateZ(${(
        sz *
        (1 - e)
      ).toFixed(1)}px)`;
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(step);
  };

  return createElement(
    Tag,
    {
      ref,
      className,
      style: { transformStyle: "preserve-3d", ...style },
      onMouseMove: handleMove,
      onMouseLeave: handleLeave,
    },
    <div
      key="shine"
      ref={shineRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-300"
    />,
    children
  );
}
