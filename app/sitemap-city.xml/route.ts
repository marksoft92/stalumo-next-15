import { NextResponse } from 'next/server';
import rawDescriptions from '@/data/spawanie_zachodniopomorskie_uslugi.json';

const locales = ["en", "pl", "de"];
const BASE_URL = process.env.APP_URL || "https://stalumo.com";

type ServiceEntry = {
  slugCity: string;
  city: string;
  service_slug: string;
  service_name: string;
  description: string;
  cta: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
};

const descriptions = rawDescriptions as ServiceEntry[];

export async function GET() {
    const allCity = await Promise.all(
   locales.map(async (locale) => {
   return descriptions.map(entry => {
        const slugCityParam = `${entry.service_slug}~${entry.slugCity}`;
        return `${BASE_URL}${locale}/${slugCityParam}`;
      });
        
    })
);
const flattened = allCity.flat();
    console.log(flattened)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${flattened
      .map(
        (url) => `
      <url>
        <loc>${url}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
      )
      .join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
