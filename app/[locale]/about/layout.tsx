// app/[locale]/opinie/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const locale = params.locale as keyof typeof meta;

    const meta = {
        en: {
            title: "About Us | Stalumo - Custom Steel Craftsmanship Experts",
            description:
                "Learn more about Stalumo – experts in crafting custom steel railings, gates, and metalwork. Discover our mission, values, and commitment to quality.",
            keywords:
                "about Stalumo, custom steel company, steelwork team, metalwork experience, steel craftsmanship",
            url: "https://stalumo.com/en/about-us",
            image: "https://stalumo.com/assets/images/og.png",
        },
        pl: {
            title: "O Nas | Stalumo - Specjaliści od Stali i Konstrukcji",
            description:
                "Poznaj firmę Stalumo – tworzymy balustrady, bramy i konstrukcje stalowe na zamówienie. Dowiedz się więcej o naszej misji, zespole i podejściu do jakości.",
            keywords:
                "o nas stalumo, firma stalowa, konstrukcje stalowe, balustrady stalowe, doświadczenie w metaloplastyce",
            url: "https://stalumo.com/pl/o-nas",
            image: "https://stalumo.com/assets/images/og.png",
        },
        de: {
            title: "Über Uns | Stalumo - Maßgeschneiderte Stahl- und Metalllösungen",
            description:
                "Erfahren Sie mehr über Stalumo – wir fertigen individuelle Stahlgeländer, Tore und Metallkonstruktionen. Lernen Sie unser Team und unsere Werte kennen.",
            keywords:
                "über Stalumo, stahlbau unternehmen, metallarbeiten team, maßgefertigte lösungen, stahl konstruktionen",
            url: "https://stalumo.com/de/uber-uns",
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
                en: "https://stalumo.com/en/about-us",
                pl: "https://stalumo.com/pl/o-nas",
                de: "https://stalumo.com/de/uber-uns",
            },
        },
        icons: {
            icon: "/favicon.ico",
        },
    };
}

export default function OpinieLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
