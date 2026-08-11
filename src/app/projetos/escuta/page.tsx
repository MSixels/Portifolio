import type { Metadata } from "next";
import { Background3D } from "@/components/Background3D";
import { Overlay } from "@/components/Overlay";
import { EscutaCaseStudy } from "@/components/case-study/EscutaCaseStudy";
import { baseOpenGraph, OG_IMAGE_PATH } from "@/lib/seo";

const CASE_TITLE = "escuta… — Estudo de caso técnico";

const CASE_DESCRIPTION =
  "Estudo de caso técnico do escuta..., uma plataforma de gestão clínica: backend de alta performance em Go, modelagem em PostgreSQL, sessões seguras com JWT e deploy dividido entre Vercel e Render.";

export const metadata: Metadata = {
  title: "escuta... — Estudo de caso técnico | Matheus Sixel",
  description: CASE_DESCRIPTION,
  // Spread, not a fresh object: page metadata merges shallowly, so writing
  // only title/description here would drop the image, siteName and locale
  // inherited from the root layout.
  openGraph: {
    ...baseOpenGraph,
    title: CASE_TITLE,
    description: CASE_DESCRIPTION,
    url: "/projetos/escuta",
  },
  // `twitter` merges shallowly too — without this the X card would still
  // announce the site title instead of the case study's.
  twitter: {
    card: "summary_large_image",
    title: CASE_TITLE,
    description: CASE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
};

export default function EscutaCaseStudyPage() {
  return (
    <>
      {/* z-0: fixed 3D canvas — z-1: scrim/vignette overlay (same chrome as
          home, but the sphere runs in `soft` mode: this page is long-form
          text and the background must stay out of the way of reading). */}
      <Background3D mode="soft" />
      <Overlay />

      {/* z-2: page content */}
      <EscutaCaseStudy />
    </>
  );
}
