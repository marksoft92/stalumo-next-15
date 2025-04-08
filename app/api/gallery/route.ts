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
    const images = await prisma.image.findMany();

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
    console.error(error);
    return new Response(JSON.stringify({ error: "Error fetching images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // Always disconnect the Prisma Client
    await prisma.$disconnect();
  }
}
