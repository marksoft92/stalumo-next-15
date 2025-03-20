import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Metadata } from "next";

type Post = {
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  excerpt: string;
};

const BlogPostPage = () => {
  const { slug, locale } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  // Pobieranie danych artykułu po slug i locale
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/blog/${slug}?lang=${locale}`);
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [slug, locale]);

  if (!post) return <p>Ładowanie...</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.title} />
      <div>{post.content}</div>
    </article>
  );
};

// Funkcja generująca metadane SEO (tytuł, opis, itp.)
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const { slug } = params;
  const lang = searchParams.lang || "en";

  // Pobieranie danych artykułu na podstawie slug
  const res = await fetch(`/api/blog/${slug}?lang=${lang}`);
  const post: Post = await res.json();

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
      url: `https://stalumo.com/${lang}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      // image: post.imageUrl,
    },
  };
}

export default BlogPostPage;
