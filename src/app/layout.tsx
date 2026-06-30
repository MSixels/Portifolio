import type { Metadata } from "next";
import {
  Instrument_Serif,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matheus Sixel — Desenvolvedor Fullstack",
  description:
    "Portfólio de Matheus Sixel. Engenharia fullstack com foco em sistemas escaláveis, código limpo e experiências precisas — do back-end em Go e Node ao front-end em React e Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${instrumentSerif.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <I18nProvider defaultLang="pt">{children}</I18nProvider>
      </body>
    </html>
  );
}
