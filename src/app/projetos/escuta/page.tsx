import type { Metadata } from "next";
import { Background3D } from "@/components/Background3D";
import { Overlay } from "@/components/Overlay";
import { EscutaCaseStudy } from "@/components/case-study/EscutaCaseStudy";

export const metadata: Metadata = {
  title: "escuta... — Estudo de caso técnico | Matheus Sixel",
  description:
    "Estudo de caso técnico do escuta..., uma plataforma de gestão clínica: backend de alta performance em Go, modelagem em PostgreSQL, sessões seguras com JWT e deploy dividido entre Vercel e Render.",
};

export default function EscutaCaseStudyPage() {
  return (
    <>
      {/* z-0: fixed 3D canvas — z-1: scrim/vignette overlay (same chrome as home) */}
      <Background3D />
      <Overlay />

      {/* z-2: page content */}
      <EscutaCaseStudy />
    </>
  );
}
