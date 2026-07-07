"use client";

import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";
import { ProjectCard, type Project } from "../ProjectCard";

/* ------------------------------------------------------------------ *
 * Single source of truth for the Projects section. Each entry drives a
 * <ProjectCard/>. Text fields are i18n keys (resolved inside the card);
 * URLs are optional — omit them to render the CTA in a disabled state.
 * Swap the placeholder copy/links per project without touching markup.
 * ------------------------------------------------------------------ */
const FEATURED: Project = {
  id: "proj-escuta",
  titleKey: "proj.title",
  subtitleKey: "proj.subtitle",
  status: "dev",
  tags: ["Go", "PostgreSQL", "React", "JWT", "Vercel", "Render"],
  descKey: "proj.desc",
  // Primary CTA → dedicated internal detail route (opens in-app, not a new tab).
  demoUrl: "/projetos/escuta",
  demoLabelKey: "proj.cta.details",
  repoUrl: "https://github.com/MSixels/gestao-clinica-escuta...",
  // Product screenshots rendered as a carousel in the right column.
  carousel: [
    { src: "/projects/escuta/shot-1.png", altKey: "proj.shot" },
    { src: "/projects/escuta/shot-2.png", altKey: "proj.shot" },
    { src: "/projects/escuta/shot-3.png", altKey: "proj.shot" },
    { src: "/projects/escuta/shot-4.png", altKey: "proj.shot" },
  ],
};

const PROJECTS: Project[] = [
  {
    id: "proj-cryptoplace",
    titleKey: "proj.soon",
    status: "done",
    tags: ["React", "TypeScript", "CoinGecko API"],
    descKey: "proj.soontxt",
    demoUrl: undefined,
    repoUrl: undefined,
  },
  {
    id: "proj-b",
    titleKey: "proj.soon2",
    status: "oss",
    tags: ["Go", "PostgreSQL", "Docker"],
    descKey: "proj.soontxt2",
    demoUrl: undefined,
    repoUrl: undefined,
  },
];

export function Projects() {
  return (
    <section
      id="projetos"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vh,120px)]"
    >
      <SectionHeader number="02" labelKey="sec.work" />

      {/* Featured project — full width, 3D tilt, screenshot column */}
      <Reveal>
        <ProjectCard project={FEATURED} featured />
      </Reveal>

      {/* Secondary projects — responsive 2-up grid, equal-height cards */}
      <div className="mt-[clamp(18px,2vw,28px)] grid grid-cols-1 items-stretch gap-[clamp(18px,2vw,28px)] md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.id} delay={80 + i * 60} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <SectionFrost />
    </section>
  );
}
