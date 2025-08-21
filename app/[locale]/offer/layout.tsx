// app/[locale]/about-us/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({ params }: {
    params: any;
  }): Promise<Metadata> {
  const locale = params.locale as keyof typeof meta;

  const meta = {
    en: {
      title: "Our Offer | Stalumo - Custom Steel Railings, Fences & Gates",
      description:
        "Explore our wide range of handcrafted steel products including railings, fences, gates, and other custom metal structures tailored to your needs.",
      keywords:
        "custom steel railings, steel fences, metal gates, welded structures, metalwork offer, steel fabrication, custom metal products, Stalumo",
      url: "https://stalumo.com/en/offer",
      image: "https://stalumo.com/assets/images/og.png",
    },
    pl: {
      title: "Oferta | Stalumo - Balustrady, Ogrodzenia i Konstrukcje Stalowe",
      description:
        "Zobacz naszą ofertę balustrad, ogrodzeń, bram oraz innych konstrukcji stalowych. Tworzymy na wymiar, z dbałością o każdy detal.",
      keywords:
        "balustrady stalowe, ogrodzenia metalowe, bramy stalowe, konstrukcje spawane, wyroby ze stali, oferta metaloplastyki, konstrukcje na zamówienie, Stalumo",
      url: "https://stalumo.com/pl/offer",
      image: "https://stalumo.com/assets/images/og.png",
    },
    de: {
      title: "Angebot | Stalumo - Maßgefertigte Geländer, Zäune und Stahltore",
      description:
        "Entdecken Sie unser Angebot an Geländern, Zäunen, Toren und weiteren maßgeschneiderten Metallkonstruktionen – individuell gefertigt nach Ihren Wünschen.",
      keywords:
        "Stahlgeländer, Metallzäune, maßgefertigte Tore, geschweißte Konstruktionen, Metallbau, individuelle Metallprodukte, Metallbearbeitung, Stalumo",
      url: "https://stalumo.com/de/offer",
      image: "https://stalumo.com/assets/images/og.png",
    },
  };
  
  

  const currentMeta = meta[locale] || meta.en;

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
        en: "https://stalumo.com/en/offer",
        pl: "https://stalumo.com/pl/oferta",
        de: "https://stalumo.com/de/angebot",
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
