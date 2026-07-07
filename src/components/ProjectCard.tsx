"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { TiltCard } from "./TiltCard";

/* ------------------------------------------------------------------ *
 * Types — the whole card is data-driven so the Projects section only
 * has to declare an array of these. Text values are i18n keys, resolved
 * with t() inside the component, so PT/EN/ES stay in sync.
 * ------------------------------------------------------------------ */
export type ProjectStatus = "production" | "mvp" | "oss" | "dev" | "done";

export type Project = {
  /** Stable key + id used for the anchor target. */
  id: string;
  /** i18n key for the title (falls back to a literal if the key is absent). */
  titleKey: string;
  /** Optional i18n key for a subtitle shown just below the title. */
  subtitleKey?: string;
  status: ProjectStatus;
  /** Tech stack, rendered as tags. Plain labels — not translated. */
  tags: string[];
  /** i18n key for the "Problem & Technical solution" body copy. */
  descKey: string;
  /** Primary CTA URL. Internal routes ("/…") navigate in-app; external URLs
      open in a new tab. Omit to render the CTA in a disabled state. */
  demoUrl?: string;
  /** Optional i18n key overriding the primary CTA label (defaults to demo). */
  demoLabelKey?: string;
  /** Source repository URL — omit to render the CTA disabled. */
  repoUrl?: string;
  /** Optional single screenshot. When present the card uses a 2-column layout. */
  image?: { src: string; altKey: string };
  /** Optional product screenshots rendered as an interactive carousel in the
      right column of the 2-column layout. Provide 3–5 for the best fit. */
  carousel?: { src: string; altKey?: string }[];
};

/* Status badge styling — kept inside the cyan/sci-fi palette, differentiated
 * only by fill vs. outline and hue so the states read at a glance. */
const STATUS_STYLES: Record<
  ProjectStatus,
  { labelKey: string; className: string; dot: string }
> = {
  production: {
    labelKey: "proj.status.production",
    className: "bg-accent text-[#04060a] border-transparent",
    dot: "bg-[#04060a]",
  },
  mvp: {
    labelKey: "proj.status.mvp",
    className:
      "bg-[rgba(90,140,255,0.08)] text-accent border-[rgba(90,140,255,0.4)]",
    dot: "bg-accent",
  },
  oss: {
    labelKey: "proj.status.oss",
    className:
      "bg-[rgba(43,217,255,0.08)] text-[#9fb4ff] border-[rgba(43,217,255,0.4)]",
    dot: "bg-[#2bd9ff]",
  },
  // In-progress work — blue outline reads as "still shipping".
  dev: {
    labelKey: "proj.status.dev",
    className:
      "bg-[rgba(90,140,255,0.08)] text-accent border-[rgba(90,140,255,0.4)]",
    dot: "bg-accent",
  },
  // Finished/live project — filled accent reads as "done, go look".
  done: {
    labelKey: "proj.status.done",
    className: "bg-accent text-[#04060a] border-transparent",
    dot: "bg-[#04060a]",
  },
};

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const { t } = useI18n();
  const status = STATUS_STYLES[project.status];
  const hasImage = Boolean(project.image);
  const hasCarousel = Boolean(project.carousel?.length);
  // Any visual media promotes the card to a 2-column layout on large screens.
  const twoCol = hasImage || hasCarousel;
  const primaryInternal = Boolean(project.demoUrl?.startsWith("/"));

  return (
    <TiltCard
      as="article"
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))]"
    >
      <div id={project.id} className="relative z-[2] flex h-full flex-col">
        <div
          className={`grid flex-1 grid-cols-1 ${
            twoCol ? "lg:grid-cols-2" : ""
          }`}
        >
          {/* ---- Content column (text, tags, buttons) ---- */}
          <div className="flex flex-col p-[clamp(26px,3vw,44px)]">
            {/* Status badge */}
            <span
              className={`inline-flex w-fit items-center gap-[7px] rounded-full border px-[12px] py-[6px] font-mono text-[10.5px] uppercase tracking-[1.5px] ${status.className}`}
            >
              <span className={`h-[6px] w-[6px] rounded-full ${status.dot}`} />
              {t(status.labelKey)}
            </span>

            {/* Title */}
            <h3
              className={`mt-[20px] font-display font-normal leading-[1.05] text-white ${
                featured
                  ? "text-[clamp(38px,4.6vw,64px)]"
                  : "text-[clamp(28px,3vw,38px)]"
              }`}
            >
              {t(project.titleKey)}
            </h3>

            {/* Subtitle */}
            {project.subtitleKey ? (
              <p className="mt-[8px] font-mono text-[clamp(12px,1.1vw,14px)] uppercase tracking-[3px] text-accent">
                {t(project.subtitleKey)}
              </p>
            ) : null}

            {/* Problem & Technical solution */}
            <p className="mt-[18px] font-mono text-[10.5px] uppercase tracking-[2px] text-muted-2">
              {t("proj.problem")}
            </p>
            <p className="mt-[10px] max-w-[46ch] text-[clamp(14px,1.2vw,16px)] font-light leading-[1.6] text-muted">
              {t(project.descKey)}
            </p>

            {/* Tech stack tags */}
            <div className="mt-[22px] flex flex-wrap gap-[9px]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[rgba(90,140,255,0.25)] px-[12px] py-[5px] font-mono text-[12px] text-[#9fd8ff]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Call-to-action buttons — side by side, stack on narrow screens */}
            <div className="mt-auto flex flex-col gap-[10px] pt-[28px] sm:flex-row">
              <CtaButton
                href={project.demoUrl}
                label={t(project.demoLabelKey ?? "proj.cta.demo")}
                variant="primary"
                icon={primaryInternal ? "arrow" : "external"}
              />
              <CtaButton
                href={project.repoUrl}
                label={t("proj.cta.code")}
                variant="ghost"
                icon="github"
              />
            </div>
          </div>

          {/* ---- Media column (carousel takes priority over single image) ---- */}
          {hasCarousel ? (
            <div className="relative flex items-center border-t border-white/[0.08] bg-[repeating-linear-gradient(135deg,rgba(90,140,255,0.045)_0_14px,rgba(90,140,255,0.012)_14px_28px)] lg:border-l lg:border-t-0">
              <Carousel shots={project.carousel!} t={t} />
            </div>
          ) : project.image ? (
            <div className="relative grid min-h-[260px] place-items-center border-t border-white/[0.08] bg-[repeating-linear-gradient(135deg,rgba(90,140,255,0.055)_0_14px,rgba(90,140,255,0.015)_14px_28px)] lg:min-h-full lg:border-l lg:border-t-0">
              <Image
                src={project.image.src}
                alt={t(project.image.altKey)}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </TiltCard>
  );
}

/* ------------------------------------------------------------------ *
 * Carousel — a lightweight, dependency-free image slider. One slide is
 * visible at a time; a translated track animates between them. Prev/next
 * controls and dot indicators keep it usable on touch and pointer alike.
 * ------------------------------------------------------------------ */
function Carousel({
  shots,
  t,
}: {
  shots: { src: string; altKey?: string }[];
  t: (key: string) => string;
}) {
  const [index, setIndex] = useState(0);
  const count = shots.length;

  // Autoplay — advance one slide every 3s. The interval is cleared on unmount
  // (and whenever `count` changes) so no timer leaks after the card is gone.
  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 3000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="flex w-full flex-col gap-[16px] p-[clamp(20px,2.4vw,34px)]">
      {/* Viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] border border-[rgba(90,140,255,0.28)] bg-[repeating-linear-gradient(135deg,rgba(90,140,255,0.06)_0_14px,rgba(90,140,255,0.015)_14px_28px)] shadow-[0_22px_60px_-26px_rgba(90,140,255,0.55)]">
        {/* Sliding track */}
        <div
          className="flex h-full transition-transform duration-[440ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {shots.map((shot, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              <Image
                src={shot.src}
                alt={shot.altKey ? t(shot.altKey) : ""}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Subtle cyan top glow to blend the strip into the card */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(90,140,255,0.16),transparent_60%)]"
        />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-[8px]">
        {shots.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ir para a imagem ${i + 1}`}
            aria-current={i === index}
            className={`h-[7px] rounded-full transition-all duration-[240ms] ${
              i === index
                ? "w-[22px] bg-accent shadow-[0_0_10px_rgba(43,217,255,0.85)]"
                : "w-[7px] bg-white/25 hover:bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CTA button — renders a real link when a URL is provided, otherwise a
 * disabled placeholder so the layout is always complete. Internal routes
 * ("/…") navigate in-app; external URLs open safely in a new tab.
 * ------------------------------------------------------------------ */
function CtaButton({
  href,
  label,
  variant,
  icon,
}: {
  href?: string;
  label: string;
  variant: "primary" | "ghost";
  icon: "external" | "github" | "arrow";
}) {
  const base =
    "inline-flex flex-1 items-center justify-center gap-[9px] rounded-[12px] px-[18px] py-[12px] text-[13.5px] font-medium no-underline transition-[border-color,background,opacity] duration-[220ms]";

  const styles =
    variant === "primary"
      ? "bg-accent text-[#04060a] hover:bg-[#54e4ff]"
      : "border border-white/[0.16] text-ink hover:border-[rgba(90,140,255,0.55)] hover:bg-[rgba(90,140,255,0.05)]";

  const content = (
    <>
      <Icon name={icon} />
      {label}
    </>
  );

  if (!href) {
    return (
      <span
        aria-disabled
        className={`${base} ${styles} cursor-not-allowed opacity-40`}
      >
        {content}
      </span>
    );
  }

  // Internal routes navigate in-app via next/link; external URLs open safely
  // in a new tab.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={`${base} ${styles}`}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles}`}
    >
      {content}
    </a>
  );
}

function Icon({ name }: { name: "external" | "github" | "arrow" }) {
  if (name === "github") {
    return (
      <svg
        aria-hidden
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    );
  }
  if (name === "arrow") {
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
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    );
  }
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
