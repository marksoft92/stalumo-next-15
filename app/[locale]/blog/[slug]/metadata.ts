import { Metadata } from "next";
import { notFound } from "next/navigation";

const fetchPosts = async (lang: string, slug: string) => {
  const res = await fetch(
    `${process.env.APP_URL}api/blog/${slug}?lang=${lang}`,
    { cache: "no-store" } // świeże dane dla metadata
  );
  if (!res.ok) {
    notFound(); // przerwie render i wyświetli 404
  }
  const data = await res.json();
  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;

  // fetchPosts wywoła notFound jeśli brak artykułu
  const article = await fetchPosts(locale, slug);

  return {
    title: article.title,
    description: article.content,
    keywords: article?.tags?.join(", ") || "blog, news, articles",
    authors: [{ name: "Stalumo", url: "/about" }],
    openGraph: {
      title: article.title,
      description: article.content,
      url: `https://stalumo.com/${locale}/blog/${slug}`,
      type: "article",
      images: [
        {
          url: article.featuredImage || "/default-image.jpg",
          alt: article.title,
        },
      ],
      siteName: "Stalumo",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.content,
      images: article.featuredImage || "/default-image.jpg",
    },
    alternates: {
      canonical: `https://stalumo.com/${locale}/blog/${slug}`,
    },
  };
}
