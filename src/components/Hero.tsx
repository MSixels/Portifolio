"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";

export function Hero() {
  const { t } = useI18n();

  return (
    <header
      id="top"
      className="mx-auto flex min-h-screen max-w-[1240px] flex-col justify-center px-[clamp(24px,5vw,72px)] pb-[80px] pt-[120px]"
    >
      <div className="relative max-w-[min(900px,96%)] self-start">
        {/* frosted-glass behind the text (fades at the edges, never a box) */}
        <div
          aria-hidden
          className="frosted-hero pointer-events-none absolute z-0"
          style={{ inset: "-34px -140px -34px -46px" }}
        />

        <div className="relative z-[1]">
          <Reveal delay={40}>
            <span className="font-mono text-[13px] uppercase tracking-[3px] text-accent">
              {t("hero.kicker")}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <span className="mt-[18px] inline-flex items-center gap-[9px] rounded-full border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.08)] px-[14px] py-[7px] text-[12.5px] tracking-[0.3px] text-[#7ff0c4]">
              {/* Glowing green dot with a pulsing ring (frozen under reduced motion) */}
              <span className="relative flex size-[9px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-75" />
                <span className="relative inline-flex size-[9px] rounded-full bg-[#34d399] shadow-[0_0_10px_2px_rgba(52,211,153,0.65)]" />
              </span>
              {t("hero.available")}
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-[26px] max-w-[14ch] font-display text-[clamp(48px,8.5vw,128px)] font-normal leading-[0.98] tracking-[-1px]">
              {t("hero.t1")}{" "}
              <em className="italic text-accent">{t("hero.t2")}</em>{" "}
              {t("hero.t3")} <em className="italic">{t("hero.t4")}</em>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-[34px] max-w-[52ch] text-[clamp(16px,1.5vw,19px)] font-light leading-[1.6] text-muted">
              {t("hero.sub")}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-[42px] flex flex-wrap gap-4">
              <a
                href="#projetos"
                className="rounded-full bg-accent px-[30px] py-[15px] text-[14.5px] font-medium tracking-[0.3px] text-[#04060a] no-underline transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(90,140,255,0.35)]"
              >
                {t("hero.cta1")}
              </a>
              <a
                href="#contato"
                className="rounded-full border border-white/18 px-[30px] py-[15px] text-[14.5px] font-medium tracking-[0.3px] text-ink no-underline transition-[border-color,background] duration-[250ms] hover:border-[rgba(90,140,255,0.6)] hover:bg-[rgba(90,140,255,0.06)]"
              >
                {t("hero.cta2")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal
        delay={500}
        className="absolute bottom-[38px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-[10px]"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#5c6573]">
          {t("hero.scroll")}
        </span>
        <span className="relative h-[34px] w-px overflow-hidden bg-[linear-gradient(180deg,rgba(90,140,255,0.7),transparent)]">
          <span className="absolute left-[-1px] top-0 h-[8px] w-[3px] rounded-[2px] bg-accent [animation:scrollDot_1.8s_infinite]" />
        </span>
      </Reveal>
    </header>
  );
}
