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
  const pageSize = 5;

  console.log("Query params:", lang, page);

  try {
    const offset = (page - 1) * pageSize;
    console.log("Running Prisma query...");

    // Fetch data from both tables using Prisma
    const posts = await prisma.blog.findMany({
      skip: offset,
      take: pageSize,
      include: {
        translations: {
          where: {
            lang: lang,
          },
        },
      },
    });

    console.log("Fetched posts:", posts);

    // If no posts found
    if (posts.length === 0) {
      return new Response(
        JSON.stringify({ error: "No posts found for the selected language" }),
        {
          status: 404,
        }
      );
    }

    // Format posts according to the requested language
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

        if (langContent.lang === "pl") {
          blogPost.pl = content;
        } else if (langContent.lang === "en") {
          blogPost.en = content;
        } else if (langContent.lang === "de") {
          blogPost.de = content;
        }
      });

      return blogPost;
    });

    // Count all posts for the selected language
    const totalPosts = await prisma.blog.count({
      where: {
        translations: {
          some: {
            lang: lang,
          },
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
    // Always disconnect the Prisma Client
    await prisma.$disconnect();
  }
}
