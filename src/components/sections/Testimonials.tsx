"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";
import { TiltCard } from "../TiltCard";

const ITEMS = [
  { quoteKey: "words.q1", nameKey: "words.n1", roleKey: "words.r1", delay: 40 },
  { quoteKey: "words.q2", nameKey: "words.n2", roleKey: "words.r2", delay: 120 },
];

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section
      id="depoimentos"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vh,120px)]"
    >
      <SectionHeader number="04" labelKey="sec.words" extraKey="words.edit" />

      <div className="grid grid-cols-1 gap-[clamp(18px,2vw,28px)] md:grid-cols-2">
        {ITEMS.map((item) => (
          <Reveal key={item.quoteKey} delay={item.delay}>
            <TiltCard
              as="figure"
              className="relative m-0 rounded-[18px] border border-white/10 bg-white/[0.02] p-[clamp(28px,3vw,44px)]"
            >
              <span className="font-display text-[60px] leading-[0.4] text-accent">
                &ldquo;
              </span>
              <blockquote className="m-0 mt-[14px] font-display text-[clamp(20px,2vw,28px)] italic leading-[1.35] text-ink">
                {t(item.quoteKey)}
              </blockquote>
              <figcaption className="mt-[26px] flex items-center gap-3">
                <span className="relative size-[40px] shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/testimonials/avatar-placeholder.svg"
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block text-[14px] font-medium text-ink">
                    {t(item.nameKey)}
                  </span>
                  <span className="font-mono text-[11px] text-[#7e8794]">
                    {t(item.roleKey)}
                  </span>
                </span>
              </figcaption>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <SectionFrost />
    </section>
  );
}
