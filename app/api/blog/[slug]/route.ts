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

export async function GET(req: NextRequest, { params }: { params: any }) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en";

  if (!allPosts[lang]) {
    return new Response(JSON.stringify({ error: "Language not found" }), {
      status: 404,
    });
  }

  const post = allPosts[lang].find((p) => p.slug === params.slug);
  if (!post) {
    return new Response(JSON.stringify({ error: "Post not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
