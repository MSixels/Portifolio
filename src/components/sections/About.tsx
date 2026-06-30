"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";

export function About() {
  const { t } = useI18n();

  const principles = ["about.v1", "about.v2", "about.v3"];

  return (
    <section
      id="sobre"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(90px,13vh,170px)]"
    >
      <SectionHeader number="01" labelKey="sec.about" />

      <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,96px)] md:grid-cols-[1.5fr_1fr]">
        <div>
          <Reveal delay={60}>
            <h2 className="max-w-[18ch] font-display text-[clamp(30px,4vw,56px)] font-normal leading-[1.08] tracking-[-0.5px] text-ink">
              {t("about.head")}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-[30px] max-w-[58ch] text-[clamp(15px,1.4vw,18px)] font-light leading-[1.7] text-muted">
              {t("about.p1")}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-[18px] max-w-[58ch] text-[clamp(15px,1.4vw,18px)] font-light leading-[1.7] text-muted">
              {t("about.p2")}
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={120}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-[28px] backdrop-blur-[6px]"
        >
          <span className="font-mono text-[11px] uppercase tracking-[2px] text-accent">
            {t("about.now")}
          </span>
          <p className="mt-[14px] text-[15.5px] leading-[1.6] text-[#dfe4ea]">
            {t("about.nowpre")}
            <strong className="font-semibold text-white">
              {t("about.nowname")}
            </strong>
            {t("about.nowpost")}
          </p>
          <div className="my-[22px] h-px bg-white/[0.08]" />
          <ul className="flex list-none flex-col gap-[13px]">
            {principles.map((key) => (
              <li
                key={key}
                className="flex items-center gap-[11px] text-[14px] text-muted"
              >
                <span className="size-[5px] shrink-0 rounded-full bg-accent" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <SectionFrost />
    </section>
  );
}
