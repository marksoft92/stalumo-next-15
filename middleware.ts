import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Check if path matches any translated version and return its locale and base path
function findTranslatedPath(path: string): { locale: string; basePath: string } | null {
  for (const [basePath, translations] of Object.entries(routing.pathnames)) {
    for (const [locale, translatedPath] of Object.entries(translations)) {
      if (translatedPath === `/${path}`) {
        return { locale, basePath };
      }
    }
  }
  return null;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.match(/\.(xml|txt|ico|svg|png|jpg|jpeg|webp|json)$/)) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api/")) {
    const referer = request.headers.get("referer") || "";
    const isFromBrowser = referer.includes(process.env.APP_URL || "");
    const isGalleryOrContact = pathname.startsWith("/api/gallery") || pathname.startsWith("/api/contact");
    const hasNoReferer = referer === "";

    if (!isFromBrowser && isGalleryOrContact && hasNoReferer) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const localeFromPath = segments[0];

  // If the first segment is a valid locale, let it pass through
  if (routing.locales.includes(firstSegment as (typeof routing.locales)[number])) {
    return intlMiddleware(request);
  }

  // Check if the path is a translated version (only for paths without locale)
  const translatedPath = findTranslatedPath(firstSegment);
  if (translatedPath) {
    const newPath = pathname.replace(`/${firstSegment}`, translatedPath.basePath);
    return NextResponse.redirect(new URL(`/${translatedPath.locale}${newPath}`, request.url));
  }

  // If not a translated path, check if it's a main route
  const isMainRoute = Object.keys(routing.pathnames).includes(`/${firstSegment}`);
  if (isMainRoute) {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}${pathname}`, request.url));
  }

  // If locale is invalid, redirect to 404
  if (localeFromPath && !routing.locales.includes(localeFromPath as (typeof routing.locales)[number])) {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}/404`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/api/:path*",
    "/",
    "/(en|pl|de)/:path*",
    "/:locale((?!api|_next|.*\\..*).*)"
  ],
};


