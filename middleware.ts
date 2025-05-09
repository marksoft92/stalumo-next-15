import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";


const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  const localeFromPath = pathname.split("/")[1];

  if (
    localeFromPath &&
    !routing.locales.includes(localeFromPath as (typeof routing.locales)[number]) &&
    localeFromPath !== ""
  ) {
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
