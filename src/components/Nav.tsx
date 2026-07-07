"use client";

import { LANGS, useI18n, type Lang } from "@/i18n/I18nProvider";

const NAV_LINKS: { key: string; href: string }[] = [
  { key: "nav.about", href: "#sobre" },
  { key: "nav.work", href: "#projetos" },
  { key: "nav.process", href: "#processo" },
  { key: "nav.experience", href: "#experiencia" },
  { key: "nav.stack", href: "#stack" },
  { key: "nav.contact", href: "#contato" },
];

export function Nav() {
  const { t, lang, setLang } = useI18n();

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(24px,5vw,72px)] py-[22px] backdrop-blur-[10px]"
      style={{
        background:
          "linear-gradient(180deg,rgba(8,10,14,0.72),rgba(8,10,14,0))",
      }}
    >
      <a
        href="#top"
        className="flex items-center gap-3 text-ink no-underline"
        aria-label="Matheus Sixel — início"
      >
        {/* Monogram — always visible; scales cleanly on mobile */}
        <span className="grid size-[38px] place-items-center rounded-[11px] border border-[rgba(90,140,255,0.45)] bg-[linear-gradient(145deg,rgba(90,140,255,0.16),rgba(90,140,255,0.03))] font-mono text-[14px] font-semibold tracking-[0.5px] text-accent shadow-[0_0_18px_rgba(90,140,255,0.18)]">
          MS
        </span>
        {/* Full name — hidden on small screens to leave room for the CV CTA */}
        <span className="hidden font-mono text-[12.5px] uppercase tracking-[1px] text-muted sm:inline">
          Matheus Sixel
        </span>
      </a>

      <div className="flex items-center gap-[clamp(16px,2.4vw,38px)]">
        <div className="hidden items-center gap-[clamp(16px,2.4vw,38px)] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-[14px] tracking-[0.3px] text-muted no-underline transition-colors hover:text-ink"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* Persistent CV download — visible on every breakpoint */}
        <a
          href="/cv.pdf"
          download
          className="inline-flex items-center gap-[7px] rounded-full border border-[rgba(90,140,255,0.4)] bg-[rgba(90,140,255,0.06)] px-[14px] py-[8px] font-mono text-[11px] uppercase tracking-[1px] text-accent no-underline transition-colors duration-[220ms] hover:border-[rgba(90,140,255,0.7)] hover:bg-[rgba(90,140,255,0.12)]"
        >
          <svg
            aria-hidden
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t("nav.cv")}
        </a>

        <div
          className="flex items-center gap-[2px] rounded-full border border-white/12 p-[3px] font-mono text-[11px]"
          role="group"
          aria-label="Idioma"
        >
          {LANGS.map((code: Lang) => {
            const active = code === lang;
            return (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={active}
                className="cursor-pointer rounded-full px-[10px] py-[5px] tracking-[0.5px] transition-colors"
                style={{
                  background: active ? "#5a8cff" : "transparent",
                  color: active ? "#04060a" : "#aeb6c2",
                }}
              >
                {code.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
