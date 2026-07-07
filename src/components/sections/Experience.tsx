"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";

const LINKEDIN_URL = "https://www.linkedin.com/in/dev-matheus-sixel";

/* ------------------------------------------------------------------ *
 * Vertical timeline. Each entry is a placeholder for a role/milestone
 * with a date, short description and a subtle LinkedIn link. A single
 * gradient rail runs behind the dots; content is offset with left
 * padding so the dots sit on the rail.
 * ------------------------------------------------------------------ */
const ENTRIES = [
  { roleKey: "exp.e1.role", dateKey: "exp.e1.date", descKey: "exp.e1.desc" },
  { roleKey: "exp.e2.role", dateKey: "exp.e2.date", descKey: "exp.e2.desc" },
  { roleKey: "exp.e3.role", dateKey: "exp.e3.date", descKey: "exp.e3.desc" },
];

export function Experience() {
  const { t } = useI18n();

  return (
    <section
      id="experiencia"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vh,120px)]"
    >
      <SectionHeader number="04" labelKey="sec.experience" />

      <div className="relative">
        {/* Vertical rail — passes through the center of each dot (x = 7px) */}
        <span
          aria-hidden
          className="absolute left-[7px] top-[6px] bottom-[6px] w-px bg-[linear-gradient(180deg,rgba(90,140,255,0.45),rgba(255,255,255,0.06))]"
        />

        <ol className="flex list-none flex-col gap-[clamp(30px,4vw,48px)]">
          {ENTRIES.map((entry, i) => (
            <li key={entry.roleKey} className="relative pl-[40px]">
              {/* Dot on the rail */}
              <span
                aria-hidden
                className="absolute left-0 top-[4px] size-[15px] rounded-full border-2 border-accent bg-base"
              />
              <Reveal delay={40 + i * 80}>
                <span className="font-mono text-[11px] uppercase tracking-[2px] text-accent">
                  {t(entry.dateKey)}
                </span>
                <h3 className="mt-[10px] font-display text-[clamp(24px,2.4vw,30px)] font-normal leading-[1.15] text-ink">
                  {t(entry.roleKey)}
                </h3>
                <p className="mt-[10px] max-w-[62ch] text-[clamp(14px,1.3vw,16px)] font-light leading-[1.65] text-muted">
                  {t(entry.descKey)}
                </p>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-[14px] inline-flex items-center gap-[7px] font-mono text-[12px] tracking-[0.5px] text-muted-2 no-underline transition-colors duration-[220ms] hover:text-accent"
                >
                  {t("exp.linkedin")}
                  <svg
                    aria-hidden
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <SectionFrost />
    </section>
  );
}
