interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  lang: string;
}

const allPosts: Record<string, BlogPost[]> = {
  en: [
    {
      id: 1,
      slug: "first-post",
      title: "First Post",
      content: "Content in English",
      lang: "en",
    },
    {
      id: 2,
      slug: "second-post",
      title: "Second Post",
      content: "More content in English",
      lang: "en",
    },
  ],
  pl: [
    {
      id: 1,
      slug: "pierwszy-post",
      title: "Pierwszy Post",
      content: "Treść po polsku",
      lang: "pl",
    },
    {
      id: 2,
      slug: "drugi-post",
      title: "Drugi Post",
      content: "Więcej treści po polsku",
      lang: "pl",
    },
  ],
  de: [
    {
      id: 1,
      slug: "erste-post",
      title: "Erster Post",
      content: "Inhalt auf Deutsch",
      lang: "de",
    },
    {
      id: 2,
      slug: "zweite-post",
      title: "Zweiter Post",
      content: "Mehr Inhalt auf Deutsch",
      lang: "de",
    },
  ],
};

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 5;

  if (!allPosts[lang]) {
    return new Response(JSON.stringify({ error: "Language not found" }), {
      status: 404,
    });
  }

  const posts = allPosts[lang].slice((page - 1) * pageSize, page * pageSize);
  return new Response(
    JSON.stringify({ posts, total: allPosts[lang].length, page }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
