"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";

const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1] as const;

const ITEMS = [
  { id: "faq-1", qKey: "faq.q1", aKey: "faq.a1" },
  { id: "faq-2", qKey: "faq.q2", aKey: "faq.a2" },
  { id: "faq-3", qKey: "faq.q3", aKey: "faq.a3" },
  { id: "faq-4", qKey: "faq.q4", aKey: "faq.a4" },
  { id: "faq-5", qKey: "faq.q5", aKey: "faq.a5" },
  { id: "faq-6", qKey: "faq.q6", aKey: "faq.a6" },
];

/**
 * Single-open accordion. State is one `openId` string (or null) rather
 * than a boolean per item: opening a panel simply overwrites openId, so
 * only one answer is ever expanded and closing is `openId -> null`.
 * The first item is open by default. Each header is a <button> with
 * aria-expanded + aria-controls; each panel is a labelled region.
 */
export function FAQ() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(ITEMS[0].id);

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-[900px] px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vh,120px)]"
    >
      <SectionHeader number="07" labelKey="sec.faq" />

      <ul className="flex list-none flex-col border-t border-white/[0.08]">
        {ITEMS.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id} className="border-b border-white/[0.08]">
              <h3 className="m-0">
                <button
                  type="button"
                  id={`${item.id}-btn`}
                  aria-expanded={open}
                  aria-controls={`${item.id}-panel`}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-[24px] bg-transparent py-[22px] text-left"
                >
                  <span className="font-display text-[clamp(18px,2vw,23px)] font-normal leading-[1.3] text-ink">
                    {t(item.qKey)}
                  </span>
                  <span
                    aria-hidden
                    className={`grid size-[30px] shrink-0 place-items-center rounded-full border transition-[transform,border-color,color] duration-[300ms] ${
                      open
                        ? "rotate-45 border-[rgba(90,140,255,0.6)] text-accent"
                        : "border-white/[0.16] text-muted-2"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    key="panel"
                    id={`${item.id}-panel`}
                    role="region"
                    aria-labelledby={`${item.id}-btn`}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE_OUT_CUBIC }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[68ch] pb-[24px] pr-[46px] text-[clamp(14px,1.3vw,16px)] font-light leading-[1.7] text-muted">
                      {t(item.aKey)}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <SectionFrost />
    </section>
  );
}
