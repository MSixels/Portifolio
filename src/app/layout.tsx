import type { Metadata } from "next";
import {
  Instrument_Serif,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";
import {
  baseOpenGraph,
  personJsonLd,
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: "Matheus Sixel — Desenvolvedor Fullstack",
  description: SITE_DESCRIPTION,
  openGraph: baseOpenGraph,
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
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
        {/* Person structured data. The payload is a static literal, but the
            "<" escape is kept anyway so no future edit can close the script
            tag from inside the JSON. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <I18nProvider defaultLang="pt">{children}</I18nProvider>
      </body>
    </html>
  );
}
