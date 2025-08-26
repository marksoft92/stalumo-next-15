import type { Metadata } from "next";
import rawDescriptions from "@/data/spawanie_zachodniopomorskie_uslugi.json";
import { ReactNode } from "react";
import { notFound } from "next/navigation";



const descriptions = rawDescriptions as any[];


interface Props {
  params: any;
}


export async function generateMetadata({
  params,
}: {
  params: any;
}) {
  const [slug, city] = params.slugCity.split('~');

  const entry = descriptions.find(
    (item) => item.slugCity === city && item.service_slug === slug
  );

  if (!entry) notFound();

  return {
    title: entry.seo.og_title || entry.seo.title,
    keywords: entry.seo.keywords,
    description: entry.seo.og_description || entry.seo.description,
    openGraph: {
      title: entry.seo.og_title || entry.seo.title,
      description: entry.seo.og_description || entry.seo.description,
      images: [entry.seo.og_image || 'https://stalumo.com/assets/images/stalumo.png'],
    },
    twitter: {
      card: entry.seo.twitter_card || 'summary_large_image',
      title: entry.seo.og_title || entry.seo.title,
      description: entry.seo.og_description || entry.seo.description,
      images: [entry.seo.og_image || 'https://stalumo.com/assets/images/stalumo.png'],
    },
    alternates: {
      canonical: entry.seo.canonical_url || `https://stalumo.com/pl/${slug}~${city}`,
    },
  };
}

export default function ServiceLayout({ children }: { children: ReactNode }) {

  return <>{children}</>;
}