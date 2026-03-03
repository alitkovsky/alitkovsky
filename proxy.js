import { NextResponse } from "next/server";

function resolveLocaleFromPathname(pathname) {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  return "de";
}

export function proxy(request) {
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
