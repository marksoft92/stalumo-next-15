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
    'offer'
];

const locales = ['en', 'pl', 'de'];

const localizedPaths = {
    en: ['', 'about-us', 'offer','gallery', 'contact-me', 'blog', 'products','privacy-policy'],
    pl: ['', 'o-nas', 'oferta','projekty', 'kontakt', 'blog', 'produkty','polityka-prywatności'],
    de: ['', 'uber-uns', 'angebot','projekte', 'kontaktiere-mich', 'blog', 'producten','datenschutzrichtlinie'],
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
