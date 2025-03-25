import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
console.log(prisma);
export async function POST(req: NextRequest) {
  try {
    // Odczytujemy dane z body żądania
    const { email, topic, content } = await req.json();

    // Sprawdzamy, czy wszystkie wymagane pola zostały dostarczone
    if (!email || !topic || !content) {
      return new NextResponse(
        JSON.stringify({ error: "Email, topic, and content are required" }),
        { status: 400 }
      );
    }

    // Tworzymy nowy rekord w tabeli ClientChat
    const newChat = await prisma.clientChat.create({
      data: {
        email,
        topic,
        content,
        read_me: false, // ustawiamy domyślnie, że wiadomość nie została przeczytana
      },
    });

    // Zwracamy odpowiedź po pomyślnym zapisaniu danych
    return new NextResponse(
      JSON.stringify({ message: "Message sent successfully", chat: newChat }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving chat:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to send message" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Zawsze zamykamy połączenie z bazą
  }
}
