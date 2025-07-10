import ContactForm from "./ContactForm";
import { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: any): Promise<any> {
  const { locale } = params;

  const meta:any = {
    en: {
      title: "Contact Stalumo | Custom Steel Solutions & Inquiries",
      description:
        "Get in touch with Stalumo for custom steel railings, gates, and metalwork. We're here to answer your questions and provide personalized solutions.",
      keywords:
        "contact Stalumo, steel railing contact, metalwork inquiry, custom steel gates, steel consultation",
      url: "https://stalumo.com/en/contact",
      image: "https://stalumo.com/assets/images/logo.png",
    },
    pl: {
      title: "Kontakt ze Stalumo | Balustrady, Bramy i Konstrukcje Stalowe",
      description:
        "Skontaktuj się z nami w sprawie balustrad, bram i konstrukcji stalowych na zamówienie. Odpowiemy na Twoje pytania i przygotujemy indywidualną ofertę.",
      keywords:
        "kontakt stalumo, balustrady kontakt, bramy stalowe kontakt, stalowe konstrukcje zapytanie, oferta stalowa",
      url: "https://stalumo.com/pl/kontakt",
      image: "https://stalumo.com/assets/images/logo.png",
    },
    de: {
      title: "Kontakt Stalumo | Maßgefertigte Stahlgeländer & Metallarbeiten",
      description:
        "Kontaktieren Sie Stalumo für individuelle Stahlgeländer, Tore und Metallkonstruktionen. Wir beraten Sie gern und erstellen ein passendes Angebot.",
      keywords:
        "kontakt Stalumo, stahlgeländer anfrage, metallarbeiten kontakt, maßgefertigte stahlkonstruktionen, tor kontakt",
      url: "https://stalumo.com/de/kontaktiere-mich",
      image: "https://stalumo.com/assets/images/logo.png",
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
        en: "https://stalumo.com/en/contact",
        pl: "https://stalumo.com/pl/kontakt",
        de: "https://stalumo.com/de/kontaktiere-mich",
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

type ContactPageProps = {
  params: Promise<{
    locale: string;  // better to type locale as string instead of any
  }>;
};

export default async function  ContactPage({ params }: ContactPageProps) {
  const { locale } =  await params;

  return <ContactForm locale={locale} />;
}