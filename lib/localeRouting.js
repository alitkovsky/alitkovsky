import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from "@/lib/language";

const ENGLISH_PREFIX = "/en";
const INTERNAL_PROTOCOL_PATTERN = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

function normalizePathname(pathname) {
  if (typeof pathname !== "string" || pathname.length === 0) {
    return "/";
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalized === "/" ? normalized : normalized.replace(/\/+$/, "");
}

export function isEnglishPath(pathname) {
  const normalizedPath = normalizePathname(pathname);
  return normalizedPath === ENGLISH_PREFIX || normalizedPath.startsWith(`${ENGLISH_PREFIX}/`);
}

export function getLocaleFromPathname(pathname) {
  return isEnglishPath(pathname) ? "en" : "de";
}

export function stripLocaleFromPathname(pathname) {
  const normalizedPath = normalizePathname(pathname);
  if (!isEnglishPath(normalizedPath)) {
    return normalizedPath;
  }

  const stripped = normalizedPath.slice(ENGLISH_PREFIX.length);
  return stripped.length > 0 ? stripped : "/";
}

export function normalizeLocale(value) {
  if (SUPPORTED_LANGUAGES.includes(value)) {
    return value;
  }

  return FALLBACK_LANGUAGE;
}

export function localizePath(pathname, locale) {
  const targetLocale = normalizeLocale(locale);
  const basePath = stripLocaleFromPathname(pathname);

  if (targetLocale === "en") {
    return basePath === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${basePath}`;
  }

  return basePath;
}

export function localizeHref(href, locale) {
  if (typeof href !== "string" || href.length === 0) {
    return href;
  }

  if (href.startsWith("#")) {
    return href;
  }

  if (INTERNAL_PROTOCOL_PATTERN.test(href)) {
    return href;
  }

  if (href.startsWith("//")) {
    return href;
  }

  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  if (!match) {
    return href;
  }

  const [, rawPath = "", query = "", hash = ""] = match;
  if (rawPath === ENGLISH_PREFIX || rawPath.startsWith(`${ENGLISH_PREFIX}/`)) {
    return `${rawPath}${query}${hash}`;
  }

  const path = rawPath.length > 0 ? rawPath : "/";
  const localizedPath = localizePath(path, locale);

  return `${localizedPath}${query}${hash}`;
}
