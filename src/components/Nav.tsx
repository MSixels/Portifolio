"use client";

import { LANGS, useI18n, type Lang } from "@/i18n/I18nProvider";

const NAV_LINKS: { key: string; href: string }[] = [
  { key: "nav.about", href: "#sobre" },
  { key: "nav.work", href: "#projetos" },
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
        <span className="grid size-[34px] place-items-center rounded-lg border border-[rgba(43,217,255,0.5)] font-mono text-[13px] font-medium tracking-[0.5px] text-accent">
          MS
        </span>
        <span className="font-mono text-[12.5px] uppercase tracking-[1px] text-muted">
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
                  background: active ? "#2bd9ff" : "transparent",
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
