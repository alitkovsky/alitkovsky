"use client";

import { createContext, useEffect, useMemo, useState } from "react";

import {
  FALLBACK_LANGUAGE,
  SUPPORTED_LANGUAGES as SUPPORTED_LANGUAGES_LIST,
  LANGUAGE_STORAGE_KEY,
  LANGUAGE_SOURCE_STORAGE_KEY,
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_SOURCE_COOKIE_KEY,
  LANGUAGE_SOURCE_AUTO,
  LANGUAGE_SOURCE_MANUAL,
  isDachCountry,
  isDachTimeZone,
  resolveLanguageFromCountry,
  sanitizeLanguage,
  sanitizeLanguageSource,
} from "@/lib/language";

export const SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES_LIST;

const readLocalStorage = (key) => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

const writeLocalStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {}
};

const readCookie = (name) => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (const cookie of cookies) {
    const [rawKey, ...rawValue] = cookie.trim().split("=");
    if (!rawKey) continue;
    if (rawKey === name) {
      return decodeURIComponent(rawValue.join("="));
    }
  }

  return null;
};

const writeCookie = (name, value, { maxAge = 60 * 60 * 24 * 365 } = {}) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
};

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

const findTimeZone = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch (error) {
    return null;
  }
};

const resolveAutomaticLanguage = () => {
  const countryFromCookie = readCookie("app-country");
  if (countryFromCookie) {
    return resolveLanguageFromCountry(countryFromCookie);
  }

  const timeZone = findTimeZone();
  if (timeZone) {
    return isDachTimeZone(timeZone) ? "de" : "en";
  }

  const locale = findBrowserLocale();
  if (locale) {
    const [, regionPart] = locale.split(/[-_]/);
    if (regionPart) {
      return isDachCountry(regionPart) ? "de" : "en";
    }
  }

  return FALLBACK_LANGUAGE;
};

const resolveStoredPreference = () => {
  const storedLanguage = readLocalStorage(LANGUAGE_STORAGE_KEY);
  const storedSource = readLocalStorage(LANGUAGE_SOURCE_STORAGE_KEY);

  if (storedLanguage && (!storedSource || storedSource === LANGUAGE_SOURCE_MANUAL)) {
    return { language: sanitizeLanguage(storedLanguage), source: LANGUAGE_SOURCE_MANUAL };
  }

  const cookieLanguage = readCookie(LANGUAGE_COOKIE_KEY);
  const cookieSource = readCookie(LANGUAGE_SOURCE_COOKIE_KEY);

  if (cookieLanguage && (!cookieSource || cookieSource === LANGUAGE_SOURCE_MANUAL)) {
    return { language: sanitizeLanguage(cookieLanguage), source: LANGUAGE_SOURCE_MANUAL };
  }

  return { language: resolveAutomaticLanguage(), source: LANGUAGE_SOURCE_AUTO };
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
  const [language, setLanguage] = useState(() => sanitizeLanguage(initialLanguage));
  const [languageSource, setLanguageSource] = useState(() => sanitizeLanguageSource(initialLanguageSource));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const resolved = resolveStoredPreference();
    setLanguage((prev) => (prev === resolved.language ? prev : resolved.language));
    setLanguageSource((prev) => (prev === resolved.source ? prev : resolved.source));
  }, []);

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
