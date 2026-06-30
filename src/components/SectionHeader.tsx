"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1] as const;

/**
 * Section header: mono number + uppercase label + a hairline that
 * "draws" from the left (scaleX 0→1) when it enters the viewport.
 * `extraKey` renders the optional trailing note (e.g. testimonials).
 */
export function SectionHeader({
  number,
  labelKey,
  extraKey,
}: {
  number: string;
  labelKey: string;
  extraKey?: string;
}) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  return (
    <div className="mb-[clamp(40px,6vh,64px)] flex items-center gap-[18px]">
      <span className="font-mono text-[13px] tracking-[1px] text-accent">
        {number}
      </span>
      <span className="font-mono text-[12px] uppercase tracking-[3px] text-[#7e8794]">
        {t(labelKey)}
      </span>
      <motion.span
        aria-hidden
        className="hairline h-px flex-1 origin-left"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT_CUBIC }}
      />
      {extraKey ? (
        <span className="font-mono text-[10.5px] tracking-[1px] text-[#5c6573]">
          {t(extraKey)}
        </span>
      ) : null}
    </div>
  );
}
