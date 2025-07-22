import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

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
  pl: BlogContent | null;
  en: BlogContent | null;
  de: BlogContent | null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const lang = searchParams.get("lang") || "de"; // Default language
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10); // <-- domyślnie 5, ale można nadpisać

  const offset = (page - 1) * limit;

  try {
    const posts = await prisma.blog.findMany({
      skip: offset,
      take: limit, 
      orderBy: {
        id: "desc",
      },
      include: {
        translations: {
          where: { lang },
        },
      },
    });

    if (posts.length === 0) {
      return new Response(
        JSON.stringify({ error: "No posts found for the selected language" }),
        { status: 404 }
      );
    }

    const formattedPosts: BlogPost[] = posts.map((post: any) => {
      const blogPost: BlogPost = {
        id: post.id,
        imgUrl: post.imgUrl,
        alt: post.alt,
        pl: null,
        en: null,
        de: null,
      };

      post.translations.forEach((langContent: any) => {
        const content = {
          slug: langContent.slug,
          title: langContent.title,
          content: langContent.content,
          lang: langContent.lang,
        };

        if (langContent.lang === "pl") blogPost.pl = content;
        else if (langContent.lang === "en") blogPost.en = content;
        else if (langContent.lang === "de") blogPost.de = content;
      });

      return blogPost;
    });

    const totalPosts = await prisma.blog.count({
      where: {
        translations: {
          some: { lang },
        },
      },
    });

    return new Response(
      JSON.stringify({ posts: formattedPosts, total: totalPosts, page }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error fetching posts" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
