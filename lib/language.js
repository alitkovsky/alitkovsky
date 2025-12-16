export const SUPPORTED_LANGUAGES = ["de", "en"];
export const FALLBACK_LANGUAGE = "de";

export const LANGUAGE_STORAGE_KEY = "app-language";
export const LANGUAGE_SOURCE_STORAGE_KEY = "app-language-source";

export const LANGUAGE_COOKIE_KEY = "app-language";
export const LANGUAGE_SOURCE_COOKIE_KEY = "app-language-source";

export const LANGUAGE_SOURCE_AUTO = "auto";
export const LANGUAGE_SOURCE_MANUAL = "manual";

export const DACH_COUNTRY_CODES = ["DE", "AT", "CH", "LI"];

const DACH_COUNTRY_SET = new Set(DACH_COUNTRY_CODES);
const DACH_TIMEZONE_SET = new Set([
  "Europe/Berlin",
  "Europe/Busingen",
  "Europe/Vienna",
  "Europe/Zurich",
  "Europe/Vaduz",
]);

export function sanitizeLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value) ? value : FALLBACK_LANGUAGE;
}

export function sanitizeLanguageSource(value) {
  return value === LANGUAGE_SOURCE_MANUAL ? LANGUAGE_SOURCE_MANUAL : LANGUAGE_SOURCE_AUTO;
}

export function normalizeCountryCode(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().toUpperCase();
  if (trimmed.length !== 2) return null;
  if (!/^[A-Z]{2}$/.test(trimmed)) return null;
  return trimmed;
}

export function isDachCountry(countryCode) {
  const normalized = normalizeCountryCode(countryCode);
  if (!normalized) return false;
  return DACH_COUNTRY_SET.has(normalized);
}

export function isDachTimeZone(timeZone) {
  if (typeof timeZone !== "string") return false;
  return DACH_TIMEZONE_SET.has(timeZone);
}

export function resolveLanguageFromCountry(countryCode) {
  const normalized = normalizeCountryCode(countryCode);
  if (!normalized) return FALLBACK_LANGUAGE;
  return isDachCountry(normalized) ? "de" : "en";
}

export function getCountryFromHeaders(headers) {
  if (!headers || typeof headers.get !== "function") {
    return null;
  }

  const candidates = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-country-code",
    "x-geo-country",
    "x-forwarded-country",
    "x-app-country",
  ];

  for (const name of candidates) {
    const value = headers.get(name);
    const normalized = normalizeCountryCode(value);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}
