"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import {
  FALLBACK_LANGUAGE,
  SUPPORTED_LANGUAGES as SUPPORTED_LANGUAGES_LIST,
  LANGUAGE_STORAGE_KEY,
  LANGUAGE_SOURCE_STORAGE_KEY,
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_SOURCE_COOKIE_KEY,
  LANGUAGE_SOURCE_AUTO,
  LANGUAGE_SOURCE_MANUAL,
  sanitizeLanguage,
  sanitizeLanguageSource,
} from "@/lib/language";
import { getLocaleFromPathname } from "@/lib/localeRouting";

export const SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES_LIST;

const writeLocalStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {}
};

const writeCookie = (name, value, { maxAge = 60 * 60 * 24 * 365 } = {}) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
};

export const LanguageContext = createContext({
  language: FALLBACK_LANGUAGE,
  setLanguage: () => {},
});

export default function LanguageProvider({
  children,
  initialLanguage = FALLBACK_LANGUAGE,
  initialLanguageSource = LANGUAGE_SOURCE_AUTO,
}) {
  const pathname = usePathname();
  const [language, setLanguage] = useState(() => sanitizeLanguage(initialLanguage));
  const [languageSource, setLanguageSource] = useState(() => sanitizeLanguageSource(initialLanguageSource));

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const languageFromPath = getLocaleFromPathname(pathname);
    setLanguage((prev) => (prev === languageFromPath ? prev : languageFromPath));
    setLanguageSource(LANGUAGE_SOURCE_MANUAL);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    writeLocalStorage(LANGUAGE_STORAGE_KEY, language);
    writeLocalStorage(LANGUAGE_SOURCE_STORAGE_KEY, languageSource);
    writeCookie(LANGUAGE_COOKIE_KEY, language);
    writeCookie(LANGUAGE_SOURCE_COOKIE_KEY, languageSource);
    document.documentElement.lang = language;
  }, [language, languageSource]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage: (nextLanguage) => {
      setLanguage((prev) => {
        const next = sanitizeLanguage(nextLanguage);
        return prev === next ? prev : next;
      });
      setLanguageSource(LANGUAGE_SOURCE_MANUAL);
    },
  }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
