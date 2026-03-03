import { NextResponse } from "next/server";

const ENGLISH_PREFIX = "/en";
const ENGLISH_HOST = "litkovskyi.de";
const REDIRECT_HOSTS = new Set(["litkovskyi.com", "www.litkovskyi.com"]);

function normalizeHost(hostHeader) {
  if (typeof hostHeader !== "string") {
    return "";
  }

  return hostHeader.split(":")[0].trim().toLowerCase();
}

function toEnglishPathname(pathname) {
  if (pathname === ENGLISH_PREFIX || pathname.startsWith(`${ENGLISH_PREFIX}/`)) {
    return pathname;
  }

  return pathname === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${pathname}`;
}

function resolveLocaleFromPathname(pathname) {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  return "de";
}

export function proxy(request) {
  const host = normalizeHost(request.headers.get("host"));

  if (REDIRECT_HOSTS.has(host)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.hostname = ENGLISH_HOST;
    redirectUrl.pathname = toEnglishPathname(redirectUrl.pathname);
    return NextResponse.redirect(redirectUrl, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-app-locale", resolveLocaleFromPathname(request.nextUrl.pathname));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)",
  ],
};
