import allPosts from "@/lib/dataBlog";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "de";
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
