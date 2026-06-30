"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";
import { TiltCard } from "../TiltCard";

const FEATURED_TAGS = ["Go", "Node", "React", "PostgreSQL"];

export function Projects() {
  const { t } = useI18n();

  return (
    <section
      id="projetos"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vh,120px)]"
    >
      <SectionHeader number="02" labelKey="sec.work" />

      {/* Featured card with 3D tilt */}
      <Reveal>
        <TiltCard
          as="article"
          className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))]"
        >
          <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center p-[clamp(28px,3.4vw,52px)]">
              <span className="self-start rounded-full bg-accent px-[11px] py-[5px] font-mono text-[10.5px] uppercase tracking-[1.5px] text-[#04060a]">
                {t("proj.badge")}
              </span>
              <h3 className="mt-[22px] font-display text-[clamp(40px,5vw,72px)] font-normal leading-[1] text-white">
                escuta<span className="text-accent">...</span>
              </h3>
              <p className="mt-[18px] max-w-[38ch] text-[clamp(15px,1.3vw,17px)] font-light leading-[1.65] text-muted">
                {t("proj.desc")}
              </p>
              <div className="mt-[26px] flex flex-wrap gap-[9px]">
                {FEATURED_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-[rgba(43,217,255,0.25)] px-[12px] py-[5px] font-mono text-[12px] text-[#9fd8ff]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image slot — swap escuta-placeholder.svg for a real screenshot */}
            <div className="relative grid min-h-[340px] place-items-center border-l border-white/[0.08] bg-[repeating-linear-gradient(135deg,rgba(43,217,255,0.055)_0_14px,rgba(43,217,255,0.015)_14px_28px)]">
              <Image
                src="/projects/escuta-placeholder.svg"
                alt={t("proj.shot")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </TiltCard>
      </Reveal>

      {/* Placeholder slots for future projects */}
      <div className="mt-[clamp(18px,2vw,28px)] grid grid-cols-1 gap-[clamp(18px,2vw,28px)] md:grid-cols-2">
        {[
          { tag: "02 — A", titleKey: "proj.soon", txtKey: "proj.soontxt", delay: 80 },
          {
            tag: "02 — B",
            titleKey: "proj.soon2",
            txtKey: "proj.soontxt2",
            delay: 140,
          },
        ].map((slot) => (
          <Reveal key={slot.tag} delay={slot.delay}>
            <TiltCard
              as="article"
              className="relative flex min-h-[230px] flex-col justify-end rounded-[18px] border border-dashed border-white/[0.16] bg-white/[0.015] p-[30px]"
            >
              <span className="font-mono text-[11px] tracking-[2px] text-accent">
                {slot.tag}
              </span>
              <h4 className="mt-[10px] font-display text-[28px] font-normal text-[#8b94a0]">
                {t(slot.titleKey)}
              </h4>
              <p className="mt-[8px] font-mono text-[11.5px] tracking-[0.5px] text-[#5c6573]">
                {t(slot.txtKey)}
              </p>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <SectionFrost />
    </section>
  );
}
