"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";

export function About() {
  const { t } = useI18n();

  return (
    <section
      id="sobre"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(90px,13vh,170px)]"
    >
      <SectionHeader number="01" labelKey="sec.about" />

      {/* Two balanced columns: biography (wider) + portrait, vertically centered
          against each other now that the "Foco Atual" side card is gone. */}
      <div className="grid grid-cols-1 items-center gap-[clamp(40px,6vw,96px)] md:grid-cols-[1.5fr_1fr]">
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

        {/* Portrait slot — interactive 3D card flip.
            Front: profile.png (realistic photo). Back: caricatura.png
            (neon line-art). Both faces keep the hatch + glow + gradient
            layers so the cyan aesthetic is consistent through the flip.
            Capped + centered so it stays balanced beside the bio. */}
        <Reveal delay={100} className="mx-auto w-full max-w-[380px]">
          {/* `group` + `perspective` set the 3D viewing frustum for children.
              Focusable so the flip is reachable by keyboard, not just hover. */}
          <figure
            tabIndex={0}
            className="group relative m-0 aspect-[4/5] cursor-pointer rounded-2xl outline-none [perspective:1200px]"
          >
            {/* Rotating stage: preserves 3D depth and spins 180° on hover/focus */}
            <div className="relative h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
              {/* ---------- FRONT: profile.png ---------- */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[rgba(90,140,255,0.22)] bg-[repeating-linear-gradient(135deg,rgba(90,140,255,0.06)_0_14px,rgba(90,140,255,0.015)_14px_28px)] [backface-visibility:hidden]">
                <Image
                  src="/profile.png"
                  alt="Matheus Sixel"
                  fill
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="object-cover"
                />
                {/* cyan glow (top) + dark fade (bottom) → duotone-friendly blend */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(90,140,255,0.18),transparent_60%)]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,10,14,0.7))]"
                />
              </div>

              {/* ---------- BACK: caricatura.png (pre-rotated 180°) ---------- */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[rgba(90,140,255,0.35)] bg-[repeating-linear-gradient(135deg,rgba(90,140,255,0.06)_0_14px,rgba(90,140,255,0.015)_14px_28px)] shadow-[0_0_36px_-6px_rgba(90,140,255,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <Image
                  src="/caricatura.png"
                  alt="Matheus Sixel — caricatura"
                  fill
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="object-cover"
                />
                {/* stronger cyan glow on the neon line-art side */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(90,140,255,0.28),transparent_62%)]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,10,14,0.65))]"
                />
              </div>
            </div>
          </figure>
        </Reveal>
      </div>

      <SectionFrost />
    </section>
  );
}
