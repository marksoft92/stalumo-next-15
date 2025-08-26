import About from "@/components/sections/home/AboutUs";
import Excellence from "@/components/sections/home/Excellence";
import Faq from "@/components/sections/home/Faq";
import OurProcess from "@/components/sections/home/OurProcess";
import OurServices from "@/components/sections/home/OurServices";
import Realization from "@/components/sections/home/Realization";
import Stats from "@/components/sections/home/Stats";
import Steps from "@/components/sections/home/Steps";
import VisionMission from "@/components/sections/home/VisionMission";
import Container from "@/components/ui/container";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: any): Promise<any> {
  const { locale } = await params;

  const meta: any = {
    en: {
      title: "Custom Steel Railings, Gates & Metalwork for Homes | Stalumo",
      description: "Discover top-quality steel railings, gates, and custom metalwork tailored to your needs. Precision and durability from Stalumo.",
      keywords:
        "steel railings, gates, steel constructions, custom steel designs, railings, metal work",
      url: "https://stalumo.com/en",
      image: "https://stalumo.com/assets/images/og.png",
    },
    pl: {
      title: "Balustrady, Bramy i Konstrukcje Stalowe na Zamówienie",
      description: "Wykonujemy balustrady, bramy i konstrukcje stalowe na zamówienie. Precyzja, trwałość i estetyka – zaufaj firmie Stalumo.",
      keywords:
        "balustrady stalowe, bramy stalowe, konstrukcje stalowe, ogrodzenia stalowe, stalowe na zamówienie",
      url: "https://stalumo.com/pl",
      image: "https://stalumo.com/assets/images/og.png",
    },
    de: {
      title: "Stahlgeländer, Tore & Maßgefertigte Metallkonstruktionen",
      description: "Stalumo bietet maßgefertigte Stahlgeländer, Tore und Metallarbeiten. Hochwertige Konstruktionen für Ihr Zuhause oder Gewerbe.",
      keywords:
        "stahlgeländer, toren, stahlkonstruktionen, maßgefertigte stahlkonstruktionen",
      url: "https://stalumo.com/de",
      image: "https://stalumo.com/assets/images/og.png",
    },
  };

  const currentMeta = meta[locale] || meta["en"];

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    robots: "index, follow", // Wskazuje wyszukiwarkom, by indeksowały stronę i śledziły linki
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
        en: "https://stalumo.com/en",
        pl: "https://stalumo.com/pl",
        de: "https://stalumo.com/de",
      },
    },
    icons: {
      icon: "/favicon.ico", // Ścieżka do favicon
    },
  };
}

export default async function HomePage() {

  return (
    <>

      <Container>
        <Excellence />
        <ScrollAnimation direction="left"><Steps /></ScrollAnimation>
        <ScrollAnimation direction="left"> <About /></ScrollAnimation>
        <ScrollAnimation direction="left"><VisionMission /></ScrollAnimation>
        <OurServices />
        <ScrollAnimation direction="left"><Realization /></ScrollAnimation>
        <ScrollAnimation direction="left"> <OurProcess /></ScrollAnimation>
        <ScrollAnimation direction="left"> <Faq /></ScrollAnimation>
        <ScrollAnimation direction="left"> <Stats /></ScrollAnimation>
      </Container>
    </>
  );
}
