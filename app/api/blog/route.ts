import allPosts from "@/lib/dataBlog";
import { NextRequest } from "next/server";

interface BlogContent {
  slug: string;
  title: string;
  content: string;
  lang: string;
}

interface BlogPost {
  id: number;
  imgUrl: string;
  alt: string;
  pl: BlogContent;
  en: BlogContent;
  de: BlogContent;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "de"; // Domyślny język
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 5;
  // Check if the language exists in allPosts
  if (!allPosts.some((post) => post.hasOwnProperty(lang))) {
    return new Response(JSON.stringify({ error: "Language not found" }), {
      status: 404,
    });
  }

  // Paginacja
  const posts = allPosts.slice((page - 1) * pageSize, page * pageSize);

  return new Response(JSON.stringify({ posts, total: allPosts.length, page }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
