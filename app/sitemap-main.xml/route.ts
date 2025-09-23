// app/api/sitemap-main/route.ts
import { NextResponse } from 'next/server';

const baseUrl = 'https://stalumo.com';

const pages = [
    '',
    'about',
    'gallery',
    'contact',
    'blog',
    'products',
    'offer',
    'offer/barriers',
    'offer/gates',
    'offer/fences',
    'offer/other-steel-structures',
    'privacy-policy',
    'terms',
    'about_developer'
];

const locales = ['en', 'pl', 'de'];

const localizedPaths = {
    en: ['', 'about-us', 'offer','gallery', 'contact-me', 'blog', 'products','privacy-policy','about_developer','offer/barriers','offer/gates','offer/fences','offer/other-steel-structures','privacy-policy','terms'],
    pl: ['', 'o-nas', 'oferta','projekty', 'kontakt', 'blog', 'produkty','polityka-prywatności','about_developer','oferta/barierki','oferta/bramy','oferta/ogrodzenia','oferta/inne-stalowe-konstrukcje','polityka-prywatnosci','terms'],
    de: ['', 'uber-uns', 'angebot','projekte', 'kontaktiere-mich', 'blog', 'producten','datenschutzrichtlinie','about_developer','angebot/gelander','angebot/tore','angebot/gehege"','angebot/andere-stahlkonstruktionen','datenschutzrichtlinie','terms'],
};

export async function GET() {
    const urls: any = [];

    for (const locale of locales) {
        for (const path of localizedPaths[locale as keyof typeof localizedPaths]) {
            urls.push(`${baseUrl}/${locale}/${path}`);
        }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                (url: any) => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
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
