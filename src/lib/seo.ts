import type { Metadata } from "next";

/* ------------------------------------------------------------------ *
 * Shared SEO / social-sharing values.
 *
 * These live outside layout.tsx because the case-study page needs the
 * same Open Graph block: Next merges page metadata into the layout's
 * SHALLOWLY, so a page that declares `openGraph` replaces the parent's
 * object wholesale — images, siteName and locale included. Pages spread
 * `baseOpenGraph` and override only the fields that differ.
 * ------------------------------------------------------------------ */

/**
 * Production origin. `metadataBase` uses it to expand relative asset paths
 * into the absolute URLs crawlers require — a bare "/og-image.png" is
 * ignored by LinkedIn and WhatsApp. Swap this for the custom domain when
 * there is one; nothing else needs to change.
 */
export const SITE_URL = "https://portifolio-theta-tan-81.vercel.app";

export const SITE_TITLE = "Matheus Sixel — Desenvolvedor Full-Stack";

export const SITE_DESCRIPTION =
  "Portfólio de Matheus Sixel. Engenharia fullstack com foco em sistemas escaláveis, código limpo e experiências precisas — do back-end em Go e Node ao front-end em React e Next.js.";

export const OG_IMAGE_PATH = "/og-image.png";

export const baseOpenGraph = {
  type: "website",
  siteName: "Matheus Sixel",
  locale: "pt_BR",
  alternateLocale: ["en_US", "es_ES"],
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: "/",
  images: [
    {
      url: OG_IMAGE_PATH,
      width: 1200,
      height: 630,
      alt: SITE_TITLE,
    },
  ],
} satisfies Metadata["openGraph"];

/** Structured data for the person behind the site — lets search engines
 *  tie the portfolio to the GitHub and LinkedIn profiles. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matheus Sixel",
  jobTitle: "Full-Stack Developer",
  url: SITE_URL,
  sameAs: [
    "https://github.com/MSixels",
    "https://linkedin.com/in/dev-matheus-sixel",
  ],
} as const;
