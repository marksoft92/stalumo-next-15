import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "pl", "de"],

  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    "/": {
      en: "/",
      pl: "/",
      de: "/",
    },
    "/about": {
      en: "/about-us",
      pl: "/o-nas",
      de: "/uber-uns",
    },
    "/offer": {
      en: "/offer",
      pl: "/oferta",
      de: "/angebot",
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
    "/blog": {
      en: "/blog",
      pl: "/blog",
      de: "/blog",
    },
    "/products": {
      en: "/products",
      pl: "/produkty",
      de: "/producten",
    },
    "/privacy-policy": {
      en: "/privacy-policy",
      pl: "/polityka-prywatnosci",
      de: "/datenschutzrichtlinie",
    },
    "/products/[slug]": {
      en: "/products/[slug]",
      pl: "/produkty/[slug]",
      de: "/producten/[slug]",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
