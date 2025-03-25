// app/[locale]/blog/metadata.ts

import { Metadata } from "next";

// Funkcja do pobierania postów
const fetchPosts = async (lang: string, slug: string) => {
  const res = await fetch(
    `http://localhost:3000/api/blog/${slug}?lang=${lang}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;

  try {
    // Pobieramy dane artykułu na podstawie slug
    const article = await fetchPosts(locale, slug);

    // Jeżeli artykuł istnieje, generujemy metadane
    if (article) {
      return {
        title: article.title, // Tytuł posta
        description: article.content, // Krótki opis posta
        openGraph: {
          title: article.title,
          description: article.content,
          images: [
            {
              url: article.featuredImage || "/default-image.jpg", // Obrazek wyróżniający
              alt: article.title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image", // Typ karty Twittera
          title: article.title,
          description: article.content,
          images: article.featuredImage || "/default-image.jpg", // Obrazek do Twittera
        },
      };
    }

    // W przypadku braku artykułu zwróć domyślne metadane
    return {
      title: "Blog - Post not found",
      description: "Post not found on this page.",
    };
  } catch (error) {
    console.error("Error fetching post for metadata:", error);
    return {
      title: "Blog - Error",
      description: "There was an error loading the post data.",
    };
  }
}
