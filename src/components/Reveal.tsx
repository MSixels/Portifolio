"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// ease-out-cubic — matches the prototype's `1 - (1 - t)^3` tween.
const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in milliseconds, mirroring the prototype's data-delay. */
  delay?: number;
  className?: string;
};

/**
 * Scroll-reveal wrapper: fade + translateY(44px→0) + scale(0.97→1),
 * ease-out, ~850ms, fired once when 12% enters the viewport.
 * Honors prefers-reduced-motion by rendering content statically.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.85,
        delay: delay / 1000,
        ease: EASE_OUT_CUBIC,
      }}
    >
      {children}
    </motion.div>
  );
}
