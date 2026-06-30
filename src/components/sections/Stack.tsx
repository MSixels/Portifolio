"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";

type StackItem = { name: string; tag: string };

const COLUMNS: { catKey: string; delay: number; items: StackItem[] }[] = [
  {
    catKey: "stack.cat1",
    delay: 40,
    items: [
      { name: "Go", tag: "golang" },
      { name: "Node.js", tag: "runtime" },
      { name: "PostgreSQL", tag: "sql" },
    ],
  },
  {
    catKey: "stack.cat2",
    delay: 120,
    items: [
      { name: "React", tag: "ui" },
      { name: "Next.js", tag: "framework" },
      { name: "Tailwind", tag: "css" },
    ],
  },
  {
    catKey: "stack.cat3",
    delay: 200,
    items: [
      { name: "TypeScript", tag: "ts" },
      { name: "Git", tag: "vcs" },
    ],
  },
];

export function Stack() {
  const { t } = useI18n();

  return (
    <section
      id="stack"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vh,120px)]"
    >
      <SectionHeader number="03" labelKey="sec.stack" />

      <div className="grid grid-cols-1 gap-[clamp(28px,4vw,64px)] sm:grid-cols-3">
        {COLUMNS.map((col) => (
          <Reveal key={col.catKey} delay={col.delay}>
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-accent">
              {t(col.catKey)}
            </span>
            <ul className="mt-[22px] flex list-none flex-col">
              {col.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between border-b border-white/[0.08] py-[15px]"
                >
                  <span className="font-display text-[26px] text-ink">
                    {item.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#5c6573]">
                    {item.tag}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <SectionFrost />
    </section>
  );
}
