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
import GTMHead from "@/components/GTMHead";
import GTMNoScript from "@/components/GTMNoScript";
import StructuredData from "@/components/StructuredData";
const oswaldVariable = localFont({
  src: "./fonts/Oswald-VariableFont_wght.ttf",
  variable: "--font-oswald",
  weight: "100 200 300 400 500 600 700 800 900",
});



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
      <head>
        <GTMHead />
      </head>
      <body
        className={`${oswaldVariable.variable} antialiased`}
        style={{ fontFamily: "var(--font-oswald), sans-serif" }}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.GA_MEASUREMENT_ID} />
          <StructuredData locale={locale} />
        </Suspense>
        <GTMNoScript />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <GoogleRecaptchaWrapper>{children}</GoogleRecaptchaWrapper>
          <Footer locale={locale} />
          <CookieBanner locale={locale}/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
