import allPosts from "@/lib/dataBlog";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  // const { searchParams } = new URL(req.url);
  // const lang = searchParams.get("lang") || "en"; // Domyślnie angielski
  // const slug = params.slug; // Używamy slug z params
  // const allPostsFlat = Object.values(allPosts).flat(); // Łączenie wszystkich postów z różnych języków
  // // Znajdź post po slug w całym zbiorze postów
  // const postInAnyLanguage = allPostsFlat.find((p) => p.slug === slug);
  // if (!postInAnyLanguage) {
  //   return new Response(JSON.stringify({ error: "Post not found" }), {
  //     status: 404,
  //   });
  // }
  // // Teraz używamy id, aby znaleźć post w odpowiednim języku
  // const post = allPosts[lang]?.find((p) => p.id === postInAnyLanguage.id);
  // if (!post) {
  //   return new Response(
  //     JSON.stringify({ error: "Post not found in the selected language" }),
  //     {
  //       status: 404,
  //     }
  //   );
  // }
  // return new Response(JSON.stringify(post), {
  //   status: 200,
  //   headers: { "Content-Type": "application/json" },
  // });
}
