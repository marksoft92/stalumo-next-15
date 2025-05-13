import Header from "@/components/Header";
import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "./globals.css";
import Footer from "@/components/Footer";
import GoogleRecaptchaWrapper from "@/components/GoogleCaptchaWrapper";
import CookieBanner from "@/components/CookieBanner";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";
const oswaldVariable = localFont({
  src: "./fonts/Oswald-VariableFont_wght.ttf",
  variable: "--font-oswald",
  weight: "100 200 300 400 500 600 700 800 900",
});

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = await params;

  const meta = {
    en: {
      title: "Custom Steel Railings, Gates & Metalwork for Homes | Stalumo",
      description: "Discover top-quality steel railings, gates, and custom metalwork tailored to your needs. Precision and durability from Stalumo.",
      keywords:
        "steel railings, gates, steel constructions, custom steel designs, railings, metal work",
      url: "https://stalumo.com/en",
      image: "https://stalumo.com/assets/images/logo.png",
    },
    pl: {
      title: "Balustrady, Bramy i Konstrukcje Stalowe na Zamówienie",
      description: "Wykonujemy balustrady, bramy i konstrukcje stalowe na zamówienie. Precyzja, trwałość i estetyka – zaufaj firmie Stalumo.",
      keywords:
        "balustrady stalowe, bramy stalowe, konstrukcje stalowe, ogrodzenia stalowe, stalowe na zamówienie",
      url: "https://stalumo.com/pl",
      image: "https://stalumo.com/assets/images/logo.png",
    },
    de: {
      title: "Stahlgeländer, Tore & Maßgefertigte Metallkonstruktionen",
      description: "Stalumo bietet maßgefertigte Stahlgeländer, Tore und Metallarbeiten. Hochwertige Konstruktionen für Ihr Zuhause oder Gewerbe.",
      keywords:
        "stahlgeländer, toren, stahlkonstruktionen, maßgefertigte stahlkonstruktionen",
      url: "https://stalumo.com/de",
      image: "https://stalumo.com/assets/images/logo.png",
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Suspense fallback={null}>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.GA_MEASUREMENT_ID} />
        <StructuredData locale={locale}/>
      </Suspense>
      <body
        className={`${oswaldVariable.variable} antialiased`}
        style={{ fontFamily: "var(--font-oswald), sans-serif" }}
      >
        {" "}
        <NextIntlClientProvider messages={messages}>
          <Header />
          <GoogleRecaptchaWrapper>{children}</GoogleRecaptchaWrapper>
          <Footer locale={locale}/>
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
