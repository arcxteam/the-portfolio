"use client";

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import { Locale, defaultLocale, getTranslations, TranslationKeys } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: getTranslations(defaultLocale),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-locale") as Locale;
      if (saved) return saved;
    }
    return defaultLocale;
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-locale", newLocale);
      // Set dir attribute for RTL languages
      document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: getTranslations(locale),
  }), [locale, setLocale]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
