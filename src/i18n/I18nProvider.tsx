"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import pt from "./messages/pt.json";
import en from "./messages/en.json";
import es from "./messages/es.json";

export type Lang = "pt" | "en" | "es";

type Messages = Record<string, string>;

const dictionaries: Record<Lang, Messages> = { pt, en, es };

export const LANGS: Lang[] = ["pt", "en", "es"];

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  defaultLang = "pt",
}: {
  children: ReactNode;
  defaultLang?: Lang;
}) {
  // The page always opens in the default language (Portuguese). The choice is
  // not persisted, so every visit starts in `defaultLang`; the switcher only
  // changes the language for the current session.
  const [lang, setLang] = useState<Lang>(defaultLang);

  // Keep the document language attribute in sync for a11y / SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => {
    const messages = dictionaries[lang];
    return {
      lang,
      setLang,
      t: (key: string) => messages[key] ?? dictionaries.pt[key] ?? key,
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
