"use client";

import { createContext, useEffect, useMemo, useState } from "react";

const LANGUAGE_STORAGE_KEY = "app-language";
const FALLBACK_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["de", "en"];

const sanitizeLanguage = (value) => (
  SUPPORTED_LANGUAGES.includes(value) ? value : FALLBACK_LANGUAGE
);

const findBrowserLocale = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const { navigator } = window;
  if (!navigator) {
    return null;
  }

  if (Array.isArray(navigator.languages) && navigator.languages.length) {
    return navigator.languages.find(Boolean) ?? null;
  }

  return navigator.language ?? null;
};

const resolveInitialLanguage = () => {
  if (typeof window === "undefined") {
    return FALLBACK_LANGUAGE;
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored) {
    return sanitizeLanguage(stored);
  }

  const locale = findBrowserLocale();
  if (!locale) {
    return FALLBACK_LANGUAGE;
  }

  const normalized = locale.toLowerCase();
  const [languagePart, regionPart] = normalized.split(/[-_]/);

  if (regionPart === "de") {
    return "de";
  }

  if (languagePart === "de") {
    return "de";
  }

  return FALLBACK_LANGUAGE;
};

export const LanguageContext = createContext({
  language: FALLBACK_LANGUAGE,
  setLanguage: () => {},
});

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") {
      return FALLBACK_LANGUAGE;
    }

    return resolveInitialLanguage();
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const resolved = resolveInitialLanguage();
    setLanguage((prev) => (prev === resolved ? prev : resolved));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage: (nextLanguage) => {
      setLanguage((prev) => {
        const next = sanitizeLanguage(nextLanguage);
        return prev === next ? prev : next;
      });
    },
  }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
