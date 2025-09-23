// app/[locale]/about_developer/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const locale = params.locale as keyof typeof meta;

    const meta = {
        en: {
            title: "About the Developer | Bienkowski.dev - Web & App Solutions",
            description: "Discover Bienkowski.dev – professional web, mobile, SaaS and smart home applications developer. View portfolio and contact for projects.",
            keywords: "web development, Next.js developer, SaaS, mobile apps, smart home, portfolio, SEO, full-stack",
            url: "https://bienkowski.dev/en/about_developer",
            image: "https://bienkowski.dev/assets/images/og-about.png",
        },
        pl: {
            title: "O autorze strony | Bienkowski.dev - Tworzenie Stron i Aplikacji",
            description: "Poznaj Bienkowski.dev – profesjonalnego developera stron internetowych, aplikacji mobilnych, SaaS i smart home. Zobacz portfolio i skontaktuj się.",
            keywords: "tworzenie stron internetowych, Next.js developer, SaaS, aplikacje mobilne, smart home, portfolio, SEO, full-stack",
            url: "https://bienkowski.dev/pl/about_developer",
            image: "https://bienkowski.dev/assets/images/og-about.png",
        },
        de: {
            title: "Über den Entwickler | Bienkowski.dev - Web- & App-Lösungen",
            description: "Entdecken Sie Bienkowski.dev – professioneller Entwickler von Webseiten, mobilen Apps, SaaS und Smart-Home-Anwendungen. Portfolio einsehen und Kontakt aufnehmen.",
            keywords: "Webentwicklung, Next.js Entwickler, SaaS, mobile Apps, Smart Home, Portfolio, SEO, Full-Stack",
            url: "https://bienkowski.dev/de/about_developer",
            image: "https://bienkowski.dev/assets/images/og-about.png",
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
            siteName: "Bienkowski.dev",
        },
        twitter: {
            card: "summary_large_image",
            site: "@BienkowskiDev",
            title: currentMeta.title,
            description: currentMeta.description,
            images: currentMeta.image,
        },
        alternates: {
            canonical: currentMeta.url,
            languages: {
                en: "https://stalumo.com/en/about_developer",
                pl: "https://stalumo.com/pl/about_developer",
                de: "https://stalumo.com/de/about_developer",
            },
        },
        icons: {
            icon: "/favicon.ico",
        },
    };
}

export default function AboutDeveloperLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
