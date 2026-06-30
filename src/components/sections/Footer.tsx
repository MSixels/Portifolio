"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] px-[clamp(24px,5vw,72px)] py-[34px]">
      <span className="font-mono text-[12px] tracking-[0.5px] text-[#5c6573]">
        © 2026 Matheus Sixel
      </span>
      <span className="font-mono text-[11px] tracking-[0.5px] text-[#5c6573]">
        {t("footer.built")}
      </span>
    </footer>
  );
}
