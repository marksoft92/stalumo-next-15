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
    "/offer/barriers": {
      en: "/offer/barriers",
      pl: "/oferta/barierki",
      de: "/angebot/gelander",
    },
    "/offer/gates": {
      en: "/offer/gates",
      pl: "/oferta/bramy",
      de: "/angebot/tore",
    },
    "/offer/fences": {
      en: "/offer/fences",
      pl: "/oferta/ogrodzenia",
      de: "/angebot/gehege",
    },
    "/offer/other-steel-structures": {
      en: "/offer/other-steel-structures",
      pl: "/oferta/inne-stalowe-konstrukcje",
      de: "/angebot/andere-stahlkonstruktionen",
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
    "/opinions": {
      en: "/opinions",
      pl: "/opinie",
      de: "/meinungen",
    },
    "/certificates": {
      en: "/certificates",
      pl: "/certyfikaty",
      de: "/zertifikate",
    },
    "/shop": {
      en: "/store",
      pl: "/sklep",
      de: "/speichern",
    }
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
