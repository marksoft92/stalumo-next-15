// app/sitemap-blog.xml/route.ts

import { NextResponse } from "next/server";

const locales = ["pl"];
const BASE_URL = process.env.APP_URL || "https://stalumo.com";

async function fetchPosts(lang: string) {
    try {
        const res = await fetch(`${BASE_URL}/api/blog?lang=${lang}&page=1&limit=1000`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        return data.posts || [];
    } catch (err) {
        console.error(`❌ Błąd dla języka ${lang}:`, err);
        return [];
    }
}

export async function GET() {
    const allPosts = await Promise.all(
        locales.map(async (locale) => {
            const posts = await fetchPosts(locale);
            return posts
                .filter((post: any) => post[locale]?.slug) // ⬅️ filtrujemy błędne wpisy
                .map((post: any) => ({
                    loc: `${BASE_URL}${locale}/blog/${post[locale].slug}`,
                    lastmod: post.updatedAt || new Date().toISOString(),
                }));
        })
    );

    const flattened = allPosts.flat();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${flattened.map(entry => `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("")}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
