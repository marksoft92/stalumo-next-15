import GalleryContainer from "./GalleryContainer";
import { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: any): Promise<any> {
  const { locale } = params;

  const meta: any = {
    en: {
      title: "Gallery | Stalumo - Custom Steel Projects & Inspiration",
      description:
        "Explore our gallery of custom steel railings, gates, and metalwork. See examples of Stalumo's craftsmanship and find inspiration for your own project.",
      keywords:
        "steel gallery, metalwork projects, custom steel railings, gates inspiration, Stalumo portfolio",
      url: "https://stalumo.com/en/gallery",
      image: "https://stalumo.com/assets/images/og.png",
    },
    pl: {
      title: "Galeria | Stalumo - Realizacje Balustrad, Bram i Konstrukcji",
      description:
        "Zobacz nasze realizacje balustrad, bram i konstrukcji stalowych. Przeglądaj galerię projektów Stalumo i zainspiruj się do własnych rozwiązań.",
      keywords:
        "galeria stalumo, realizacje stalowe, projekty balustrad, bramy stalowe, portfolio konstrukcji stalowych",
      url: "https://stalumo.com/pl/projekty",
      image: "https://stalumo.com/assets/images/og.png",
    },
    de: {
      title: "Galerie | Stalumo - Maßgeschneiderte Stahlprojekte & Inspiration",
      description:
        "Entdecken Sie unsere Galerie mit maßgefertigten Stahlgeländern, Toren und Metallarbeiten. Lassen Sie sich von unseren Projekten inspirieren.",
      keywords:
        "Stahl Galerie, Metallarbeiten Projekte, maßgefertigte Geländer, Tore Inspiration, Stalumo Referenzen",
      url: "https://stalumo.com/de/projekte",
      image: "https://stalumo.com/assets/images/og.png",
    },
  };

  const currentMeta = meta[locale] || meta["en"];

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    robots: "index, follow",
    openGraph: {
      url: currentMeta.url,
      title: currentMeta.title,
      description: currentMeta.description,
      type: "website",
      images: [
        {
          url: currentMeta.image,
          width: 1200,
          height: 630,
          alt: currentMeta.title,
        },
      ],
      siteName: "Stalumo",
    },
    twitter: {
      card: "summary_large_image",
      site: "@Stalumo",
      title: currentMeta.title,
      description: currentMeta.description,
      images: currentMeta.image,
    },
    alternates: {
      canonical: currentMeta.url,
      languages: {
        en: "https://stalumo.com/en/gallery",
        pl: "https://stalumo.com/pl/projekty",
        de: "https://stalumo.com/de/projekte",
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function GalleryPage({ params }: any) {

  return <GalleryContainer locale={params.locale} />;
}
