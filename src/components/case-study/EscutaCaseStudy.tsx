"use client";

import Image from "next/image";
import Link from "next/link";
import { LANGS, useI18n, type Lang } from "@/i18n/I18nProvider";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { Footer } from "@/components/sections/Footer";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { CodeBlock } from "./CodeBlock";
import { GO_HEALTH, SQL_INDEX, SQL_SCHEMA } from "./snippets";

/* ------------------------------------------------------------------ *
 * External links. The escuta… repository is private (clinical product),
 * so no "Ver código" CTA is rendered at all. Swap LIVE_URL for the real
 * production URL once the platform is deployed.
 * ------------------------------------------------------------------ */
const LIVE_URL = "https://escutaclinica.app";

/* Data-driven sections — text lives in i18n so PT/EN/ES stay in sync. */
const ARCH = [
  { badge: "GO", titleKey: "case.arch.go.title", descKey: "case.arch.go.desc" },
  { badge: "SQL", titleKey: "case.arch.db.title", descKey: "case.arch.db.desc" },
  { badge: "JWT", titleKey: "case.arch.jwt.title", descKey: "case.arch.jwt.desc" },
  { badge: "OPS", titleKey: "case.arch.infra.title", descKey: "case.arch.infra.desc" },
] as const;

const CHALLENGES = [
  {
    titleKey: "case.chal.avail.title",
    problemKey: "case.chal.avail.problem",
    solutionKey: "case.chal.avail.solution",
  },
  {
    titleKey: "case.chal.billing.title",
    problemKey: "case.chal.billing.problem",
    solutionKey: "case.chal.billing.solution",
  },
  {
    titleKey: "case.chal.currency.title",
    problemKey: "case.chal.currency.problem",
    solutionKey: "case.chal.currency.solution",
  },
] as const;

/* Screenshot ↔ caption mapping, verified against the actual PNGs.
 *
 * shot-2 = dashboard · shot-3 = agenda · shot-4 = comunidade
 * shot-1 = public landing page (closed beta)
 *
 * <!-- print faltando --> Prontuário/anamnese
 * <!-- print faltando --> Autenticação (login)
 * Add the files as shot-5/shot-6 and append two entries here; the i18n
 * keys case.shot.5.* / case.shot.6.* still need to be written. */
const SHOTS = [
  { src: "/projects/escuta/shot-2.png", titleKey: "case.shot.1.title", capKey: "case.shot.1.cap" },
  { src: "/projects/escuta/shot-3.png", titleKey: "case.shot.2.title", capKey: "case.shot.2.cap" },
  { src: "/projects/escuta/shot-4.png", titleKey: "case.shot.3.title", capKey: "case.shot.3.cap" },
  { src: "/projects/escuta/shot-1.png", titleKey: "case.shot.4.title", capKey: "case.shot.4.cap" },
] as const;

export function EscutaCaseStudy() {
  return (
    <div className="relative z-[2]">
      <CaseNav />
      <main className="mx-auto max-w-[1100px] px-[clamp(24px,5vw,72px)]">
        <Header />
        <ProblemSection />
        <ArchitectureSection />
        <ChallengesSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}

/* ---- Slim page header: brand → home, back-link, language switcher ---- */
function CaseNav() {
  const { t, lang, setLang } = useI18n();

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(24px,5vw,72px)] py-[22px] backdrop-blur-[10px]"
      style={{
        background:
          "linear-gradient(180deg,rgba(8,10,14,0.72),rgba(8,10,14,0))",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-3 text-ink no-underline"
        aria-label="Matheus Sixel — início"
      >
        <span className="grid size-[38px] place-items-center rounded-[11px] border border-[rgba(90,140,255,0.45)] bg-[linear-gradient(145deg,rgba(90,140,255,0.16),rgba(90,140,255,0.03))] font-mono text-[14px] font-semibold tracking-[0.5px] text-accent shadow-[0_0_18px_rgba(90,140,255,0.18)]">
          MS
        </span>
        <span className="hidden font-mono text-[12.5px] uppercase tracking-[1px] text-muted sm:inline">
          Matheus Sixel
        </span>
      </Link>

      <div className="flex items-center gap-[clamp(16px,2.4vw,38px)]">
        <Link
          href="/#projetos"
          className="inline-flex items-center gap-[8px] text-[14px] tracking-[0.3px] text-muted no-underline transition-colors hover:text-ink"
        >
          <svg
            aria-hidden
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="hidden sm:inline">{t("case.back")}</span>
        </Link>

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

/* ---- Project header: title, subtitle, meta, primary/secondary CTAs ---- */
function Header() {
  const { t } = useI18n();

  return (
    <header className="pb-[clamp(48px,8vh,88px)] pt-[clamp(120px,18vh,190px)]">
      <Reveal>
        <span className="inline-flex w-fit items-center gap-[7px] rounded-full border border-[rgba(90,140,255,0.4)] bg-[rgba(90,140,255,0.08)] px-[12px] py-[6px] font-mono text-[10.5px] uppercase tracking-[1.5px] text-accent">
          <span className="h-[6px] w-[6px] rounded-full bg-accent" />
          {t("proj.status.dev")}
        </span>

        <h1 className="mt-[22px] font-display text-[clamp(56px,9vw,120px)] font-normal leading-[1.0] text-white">
          {t("proj.title")}
        </h1>
        <p className="mt-[10px] font-mono text-[clamp(13px,1.4vw,17px)] uppercase tracking-[4px] text-accent">
          {t("proj.subtitle")}
        </p>
        <p className="mt-[24px] max-w-[62ch] text-[clamp(15px,1.4vw,19px)] font-light leading-[1.65] text-muted">
          {t("case.lead")}
        </p>

        {/* Meta row */}
        <dl className="mt-[36px] grid max-w-[720px] grid-cols-1 gap-[18px] sm:grid-cols-3">
          <MetaItem labelKey="case.meta.timeline" valueKey="case.meta.timelineValue" />
          <MetaItem labelKey="case.meta.role" valueKey="case.meta.roleValue" />
          <MetaItem labelKey="case.meta.stack" valueKey="case.meta.stackValue" />
        </dl>

        {/* CTAs */}
        <div className="mt-[34px] flex flex-col gap-[12px] sm:flex-row">
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-[9px] rounded-[12px] bg-accent px-[22px] py-[13px] text-[14px] font-medium text-[#04060a] no-underline transition-[background] duration-[220ms] hover:bg-[#54e4ff]"
          >
            <ExternalIcon />
            {t("case.cta.live")}
          </a>
          {/* No "Ver código" CTA: the repository is private, and a link that
              404s for a recruiter is worse than no link. */}
        </div>
      </Reveal>
    </header>
  );
}

function MetaItem({ labelKey, valueKey }: { labelKey: string; valueKey: string }) {
  const { t } = useI18n();
  return (
    <div className="border-l border-[rgba(90,140,255,0.3)] pl-[14px]">
      <dt className="font-mono text-[10.5px] uppercase tracking-[2px] text-muted-2">
        {t(labelKey)}
      </dt>
      <dd className="mt-[6px] text-[14px] text-ink">{t(valueKey)}</dd>
    </div>
  );
}

/* ---- Shared section shell: hairline header + revealed body ---- */
function Section({
  number,
  labelKey,
  children,
}: {
  number: string;
  labelKey: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/[0.08] py-[clamp(50px,9vh,100px)]">
      <SectionHeader number={number} labelKey={labelKey} />
      <Reveal>{children}</Reveal>
    </section>
  );
}

function ProblemSection() {
  const { t } = useI18n();
  return (
    <Section number="01" labelKey="case.sec.problem">
      <h2 className="max-w-[20ch] font-display text-[clamp(30px,4vw,52px)] font-normal leading-[1.1] text-white">
        {t("case.problem.head")}
      </h2>
      <div className="mt-[26px] grid max-w-[900px] grid-cols-1 gap-[22px] md:grid-cols-2">
        <p className="text-[clamp(15px,1.3vw,17px)] font-light leading-[1.7] text-muted">
          {t("case.problem.p1")}
        </p>
        <p className="text-[clamp(15px,1.3vw,17px)] font-light leading-[1.7] text-muted">
          {t("case.problem.p2")}
        </p>
      </div>
    </Section>
  );
}

function ArchitectureSection() {
  const { t } = useI18n();
  return (
    <Section number="02" labelKey="case.sec.arch">
      <p className="max-w-[70ch] text-[clamp(15px,1.4vw,19px)] font-light leading-[1.65] text-muted">
        {t("case.arch.intro")}
      </p>
      <div className="mt-[34px] grid grid-cols-1 gap-[18px] md:grid-cols-2">
        {ARCH.map((a) => (
          <article
            key={a.badge}
            className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] p-[clamp(22px,2.4vw,32px)] transition-[border-color,box-shadow,transform] duration-[240ms] hover:-translate-y-[3px] hover:border-[rgba(90,140,255,0.45)] hover:shadow-[0_18px_44px_-16px_rgba(90,140,255,0.4)]"
          >
            <span className="inline-grid h-[42px] min-w-[42px] place-items-center rounded-[11px] border border-[rgba(90,140,255,0.4)] bg-[rgba(90,140,255,0.08)] px-[10px] font-mono text-[13px] font-semibold tracking-[1px] text-accent shadow-[0_0_18px_rgba(90,140,255,0.15)]">
              {a.badge}
            </span>
            <h3 className="mt-[18px] font-display text-[clamp(21px,2vw,27px)] font-normal leading-[1.15] text-white">
              {t(a.titleKey)}
            </h3>
            <p className="mt-[10px] text-[14.5px] font-light leading-[1.65] text-muted">
              {t(a.descKey)}
            </p>
          </article>
        ))}
      </div>

      <DeepDive />
    </Section>
  );
}

/* ---- Diagram + schema + real source excerpts, all read-only ---- */
function DeepDive() {
  const { t } = useI18n();

  return (
    <div className="mt-[clamp(38px,5vw,60px)] flex flex-col gap-[clamp(30px,4vw,48px)]">
      <figure className="m-0">
        <SubHead title={t("case.diagram.title")} />
        <div className="overflow-x-auto rounded-[18px] border border-white/10 bg-[rgba(4,6,10,0.5)] p-[clamp(16px,2.4vw,28px)]">
          <ArchitectureDiagram
            title={t("case.diagram.title")}
            labels={{
              front: t("case.diagram.role.front"),
              api: t("case.diagram.role.api"),
              db: t("case.diagram.role.db"),
              edge: t("case.diagram.role.edge"),
            }}
          />
        </div>
        <figcaption className="mt-[14px] max-w-[70ch] text-[14px] font-light leading-[1.65] text-muted">
          {t("case.diagram.caption")}
        </figcaption>
      </figure>

      <figure className="m-0">
        <SubHead title={t("case.schema.title")} />
        <CodeBlock
          code={SQL_SCHEMA}
          lang="sql"
          filename="migrations/0001_core.sql"
          label={t("case.schema.title")}
        />
        <figcaption className="mt-[14px] max-w-[70ch] text-[14px] font-light leading-[1.65] text-muted">
          {t("case.schema.caption")}
        </figcaption>
      </figure>

      <figure className="m-0">
        <SubHead title={t("case.code.sql.title")} />
        <CodeBlock
          code={SQL_INDEX}
          lang="sql"
          filename="migrations/0007_stripe_customer_unique.sql"
          label={t("case.code.sql.title")}
        />
        <figcaption className="mt-[14px] max-w-[70ch] text-[14px] font-light leading-[1.65] text-muted">
          {t("case.code.sql.caption")}
        </figcaption>
      </figure>

      <figure className="m-0">
        <SubHead title={t("case.code.go.title")} />
        <CodeBlock
          code={GO_HEALTH}
          lang="go"
          filename="cmd/api/main.go"
          label={t("case.code.go.title")}
        />
        <figcaption className="mt-[14px] max-w-[70ch] text-[14px] font-light leading-[1.65] text-muted">
          {t("case.code.go.caption")}
        </figcaption>
      </figure>
    </div>
  );
}

function SubHead({ title }: { title: string }) {
  return (
    <h3 className="mb-[16px] flex items-center gap-[12px] font-mono text-[11px] uppercase tracking-[2.5px] text-accent">
      <span aria-hidden className="h-px w-[26px] bg-[rgba(90,140,255,0.55)]" />
      {title}
    </h3>
  );
}

function ChallengesSection() {
  const { t } = useI18n();
  return (
    <Section number="03" labelKey="case.sec.challenges">
      <div className="grid grid-cols-1 gap-[18px]">
        {CHALLENGES.map((c) => (
          <article
            key={c.titleKey}
            className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] p-[clamp(22px,2.4vw,32px)]"
          >
            <h3 className="font-display text-[clamp(22px,2.2vw,30px)] font-normal leading-[1.15] text-white">
              {t(c.titleKey)}
            </h3>
            <div className="mt-[18px] grid grid-cols-1 gap-[16px] md:grid-cols-2">
              <div className="rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-[16px]">
                <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-muted-2">
                  {t("case.chal.problemLabel")}
                </p>
                <p className="mt-[8px] text-[14px] font-light leading-[1.6] text-muted">
                  {t(c.problemKey)}
                </p>
              </div>
              <div className="rounded-[12px] border border-[rgba(90,140,255,0.28)] bg-[rgba(90,140,255,0.05)] p-[16px]">
                <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-accent">
                  {t("case.chal.solutionLabel")}
                </p>
                <p className="mt-[8px] text-[14px] font-light leading-[1.6] text-ink">
                  {t(c.solutionKey)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function GallerySection() {
  const { t } = useI18n();
  return (
    <Section number="04" labelKey="case.sec.gallery">
      <p className="max-w-[70ch] text-[clamp(15px,1.4vw,19px)] font-light leading-[1.65] text-muted">
        {t("case.gallery.intro")}
      </p>
      <div className="mt-[30px] grid grid-cols-1 gap-[clamp(22px,3vw,40px)] md:grid-cols-2">
        {SHOTS.map((s) => (
          <figure key={s.src} className="group m-0">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] border border-[rgba(90,140,255,0.25)] bg-[repeating-linear-gradient(135deg,rgba(90,140,255,0.06)_0_14px,rgba(90,140,255,0.015)_14px_28px)] shadow-[0_22px_60px_-28px_rgba(90,140,255,0.5)] transition-[border-color,box-shadow] duration-[240ms] group-hover:border-[rgba(90,140,255,0.5)]">
              <Image
                src={s.src}
                alt={t(s.titleKey)}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(90,140,255,0.14),transparent_60%)]"
              />
            </div>
            <figcaption className="mt-[14px]">
              <p className="font-mono text-[11px] uppercase tracking-[2px] text-accent">
                {t(s.titleKey)}
              </p>
              <p className="mt-[6px] text-[14px] font-light leading-[1.6] text-muted">
                {t(s.capKey)}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Icons
 * ------------------------------------------------------------------ */
function ExternalIcon() {
  return (
    <svg
      aria-hidden
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

