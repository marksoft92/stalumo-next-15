import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "pl", "de"],

  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    "/home": {
      en: "/home",
      pl: "/strona-glowna",
      de: "/heim",
    },
    "/about": {
      en: "/about-us",
      pl: "/o-nas",
      de: "/uber-uns",
    },
    "/gallery": {
      en: "/gallery",
      pl: "/projekty",
      de: "/projekte",
    },
    "/contact": {
      en: "/contact-me",
      pl: "/kontakt",
      de: "/kontaktiere-mich",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
