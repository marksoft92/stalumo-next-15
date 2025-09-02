import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

interface Image {
  id: number;
  url: string;
  alt: string;
}



export async function GET(req: NextRequest) {
  try {
    const images = await prisma.image.findMany({
      include: { translations: true }, // <-- pobiera wszystkie tłumaczenia
      orderBy: { id: "desc" },          // opcjonalnie: najnowsze pierwsze
    });

    if (images.length === 0) {
      return new Response(JSON.stringify({ error: "No images found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ images }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return new Response(JSON.stringify({ error: "Error fetching images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
