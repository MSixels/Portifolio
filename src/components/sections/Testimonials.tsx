"use client";

import Image from "next/image";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";
import { TiltCard } from "../TiltCard";

/* Real LinkedIn recommendation. Hardcoded on purpose: the quote is an
   authentic PT statement (not machine-translated) and the name/role are
   proper data, so they stay identical across every locale. */
const TESTIMONIAL = {
  name: "Victor Sixel",
  role: "Product Designer @ Itaú (NTT Data) | UX/UI | Banking | User-Centered & Data Driven Design",
  quote:
    "Matheus tem uma habilidade incrível na hora de desenvolver aplicações, e é visível sua capacidade de adaptação e resolução de problemas. Garanto que é um ótimo profissional, e estará pronto para atuar da melhor forma nas melhores equipes",
  avatar: "/testimonials/depoimento_victor.png",
  linkedin: "https://www.linkedin.com/in/vsixel/",
};

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vh,120px)]"
    >
      <SectionHeader number="06" labelKey="sec.words" extraKey="words.edit" />

      {/* Single featured recommendation — centered, premium, deep-cyan glow. */}
      <Reveal delay={40} className="mx-auto w-full max-w-[760px]">
        <TiltCard
          as="figure"
          className="relative m-0 overflow-hidden rounded-[22px] border border-[rgba(90,140,255,0.22)] bg-[linear-gradient(180deg,rgba(90,140,255,0.05),rgba(255,255,255,0.01))] p-[clamp(30px,4vw,56px)] shadow-[0_0_60px_-24px_rgba(90,140,255,0.5)] backdrop-blur-[6px]"
        >
          {/* cyan neon wash at the top edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(90,140,255,0.14),transparent_55%)]"
          />

          {/* opening quote mark */}
          <span className="relative font-display text-[72px] leading-[0.4] text-accent">
            &ldquo;
          </span>

          <blockquote className="relative m-0 mt-[18px] font-display text-[clamp(21px,2.3vw,30px)] italic leading-[1.4] text-ink">
            {TESTIMONIAL.quote}
          </blockquote>

          {/* hairline divider */}
          <div className="relative my-[clamp(24px,3vw,34px)] h-px bg-[linear-gradient(90deg,rgba(90,140,255,0.4),rgba(255,255,255,0.06),transparent)]" />

          <figcaption className="relative flex flex-wrap items-center justify-between gap-[18px]">
            <span className="flex items-center gap-[14px]">
              {/* circular avatar with a deep-cyan gradient ring + glow */}
              <span className="relative size-[58px] shrink-0 rounded-full bg-[linear-gradient(145deg,rgba(90,140,255,0.9),rgba(90,140,255,0.15))] p-[2px] shadow-[0_0_22px_-4px_rgba(90,140,255,0.6)]">
                <span className="relative block size-full overflow-hidden rounded-full bg-dark">
                  <Image
                    src={TESTIMONIAL.avatar}
                    alt={TESTIMONIAL.name}
                    fill
                    sizes="58px"
                    className="object-cover"
                  />
                </span>
              </span>

              <span className="min-w-0">
                <span className="block text-[16px] font-semibold text-ink">
                  {TESTIMONIAL.name}
                </span>
                <span className="mt-[3px] block max-w-[46ch] font-mono text-[11px] leading-[1.5] text-muted-2">
                  {TESTIMONIAL.role}
                </span>
              </span>
            </span>

            {/* text link → opens the recommendation on LinkedIn */}
            <a
              href={TESTIMONIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex shrink-0 items-center gap-[6px] font-mono text-[12px] uppercase tracking-[1.5px] text-accent no-underline transition-colors duration-[200ms] hover:text-[#8fb0ff]"
            >
              Ver no LinkedIn
              <span
                aria-hidden
                className="transition-transform duration-[200ms] group-hover/link:translate-x-[2px] group-hover/link:-translate-y-[2px]"
              >
                ↗
              </span>
            </a>
          </figcaption>
        </TiltCard>
      </Reveal>

      <SectionFrost />
    </section>
  );
}
