import services from "@/data/services.json";
import cities from "@/data/city.json";
import type { Metadata } from "next";
import { ReactNode } from "react";



export async function generateMetadata({ params }: any): Promise<Metadata> {
  const [slug, citySlug] = params.slugCity.split("~");

  const serviceEntry = services.find(item => item.service_slug === slug);
  const cityEntry = cities.find(c => c.slugCity === citySlug);

  // ⛔ Nie używamy już notFound() tutaj!
  if (!serviceEntry || !cityEntry) {
    return {
      title: "Nie znaleziono strony | Stalumo",
      description: "Przepraszamy, ta strona nie istnieje lub została przeniesiona.",
      robots: "noindex, nofollow",
    };
  }

  const seo = {
    title: serviceEntry.seo.title.replace("{defCity}", cityEntry.city),
    description: serviceEntry.seo.description.replace("{defCity}", cityEntry.city),
    keywords:
      `${serviceEntry.longtail_1} w ${cityEntry.defCity}, ` +
      `${serviceEntry.longtail_5} w ${cityEntry.defCity}, ` +
      `${serviceEntry.longtail_3} w ${cityEntry.defCity}, ` +
      `${serviceEntry.longtail_6} w ${cityEntry.defCity}, ` +
      `${serviceEntry.longtail_9} w ${cityEntry.defCity}`,
  };

  const url = `https://stalumo.com/pl/${slug}~${cityEntry.slugCity}`;
  const image = "https://stalumo.com/assets/images/og.png";

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: "index, follow",
    openGraph: {
      url,
      title: seo.title,
      description: seo.description,
      type: "website",
      siteName: "Stalumo",
      images: [
        { url: image, width: 1200, height: 630, alt: seo.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
    alternates: { canonical: url },
  };
}

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
