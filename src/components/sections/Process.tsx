"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";

/* ------------------------------------------------------------------ *
 * Data-driven 5-step workflow. Each step is a numbered node; on md+ the
 * nodes are connected by a hairline to read as a left-to-right flow, and
 * they stack into a single column on smaller screens.
 * ------------------------------------------------------------------ */
const STEPS = [
  { n: "01", titleKey: "process.s1.t", descKey: "process.s1.d" },
  { n: "02", titleKey: "process.s2.t", descKey: "process.s2.d" },
  { n: "03", titleKey: "process.s3.t", descKey: "process.s3.d" },
  { n: "04", titleKey: "process.s4.t", descKey: "process.s4.d" },
  { n: "05", titleKey: "process.s5.t", descKey: "process.s5.d" },
];

export function Process() {
  const { t } = useI18n();

  return (
    <section
      id="processo"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vh,120px)]"
    >
      <SectionHeader number="03" labelKey="sec.process" />

      <ol className="grid list-none grid-cols-1 gap-[clamp(24px,3vw,20px)] sm:grid-cols-2 md:grid-cols-5">
        {STEPS.map((step, i) => (
          <li key={step.n} className="h-full">
            <Reveal delay={40 + i * 70} className="h-full">
              {/* Node header: number badge + connector to the next step */}
              <div className="flex items-center gap-3">
                <span className="grid size-[46px] shrink-0 place-items-center rounded-full border border-[rgba(90,140,255,0.4)] bg-[rgba(90,140,255,0.06)] font-mono text-[15px] text-accent">
                  {step.n}
                </span>
                {i < STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(90,140,255,0.45),rgba(255,255,255,0.06))] md:block"
                  />
                ) : null}
              </div>

              <h3 className="mt-[18px] font-display text-[clamp(20px,1.6vw,23px)] font-normal leading-[1.2] text-ink">
                {t(step.titleKey)}
              </h3>
              <p className="mt-[9px] text-[14px] font-light leading-[1.6] text-muted">
                {t(step.descKey)}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>

      <SectionFrost />
    </section>
  );
}
