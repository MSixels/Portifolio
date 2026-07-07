"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";

const LINKS = [
  { label: "EMAIL", value: "msixel22@gmail.com", href: "mailto:msixel22@gmail.com", min: true },
  {
    label: "WHATSAPP",
    value: "(32) 98479-2703",
    href: "https://wa.me/5532984792703",
    external: true,
  },
  {
    label: "GITHUB",
    value: "MSixels",
    href: "https://github.com/MSixels",
    external: true,
  },
  {
    label: "LINKEDIN",
    value: "dev-matheus-sixel",
    href: "https://www.linkedin.com/in/dev-matheus-sixel",
    external: true,
  },
];

export function Contact() {
  const { t } = useI18n();

  return (
    <section
      id="contato"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] pb-[clamp(60px,8vh,100px)] pt-[clamp(80px,11vh,150px)]"
    >
      <SectionHeader number="09" labelKey="sec.contact" />

      <Reveal delay={60}>
        <h2 className="max-w-[16ch] font-display text-[clamp(40px,7vw,96px)] font-normal leading-[1.02] tracking-[-1px] text-ink">
          {t("contact.h1")}{" "}
          <em className="italic text-accent">{t("contact.h2")}</em>{" "}
          {t("contact.h3")}
        </h2>
      </Reveal>

      <Reveal delay={140}>
        <p className="mt-[26px] max-w-[48ch] text-[clamp(16px,1.5vw,19px)] font-light leading-[1.6] text-muted">
          {t("contact.sub")}
        </p>
      </Reveal>

      <Reveal delay={200} className="mt-[40px] flex flex-wrap gap-[14px]">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={`flex items-center gap-3 rounded-[14px] border border-white/[0.14] px-[24px] py-[18px] no-underline transition-[border-color,background] duration-[250ms] hover:border-[rgba(90,140,255,0.55)] hover:bg-[rgba(90,140,255,0.05)] ${
              link.min ? "min-w-[240px]" : ""
            }`}
          >
            <span className="font-mono text-[11px] tracking-[1px] text-accent">
              {link.label}
            </span>
            <span className="text-[15px] text-ink">{link.value}</span>
          </a>
        ))}
      </Reveal>

      <SectionFrost />
    </section>
  );
}
