import { Metadata } from "next";
import Container from "@/components/ui/container";
import BlogPage from "@/components/BlogPage";

// Funkcja do generowania metadanych SEO
export const metadata: Metadata = {
  title: "Blog | My Website",
  description: "Najświeższe artykuły na temat X, Y, Z.",
  openGraph: {
    title: "Blog | My Website",
    description: "Najświeższe artykuły na temat X, Y, Z.",
    url: "/blog",
    siteName: "My Website",
    type: "website",
  },
};

// Pobieranie początkowych postów z API
const fetchPosts = async (lang: string, page: number, limit: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/blog?lang=${lang}&page=${page}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await res.json();
    return data.posts;
  } catch {
    console.error("Błąd podczas pobierania postów:");
    return [];
  }
};

const BlogPageContainer = async ({
  params,
}: {
  params: { locale: string };
}) => {
  const data = await params;
  const posts = await fetchPosts(data.locale, 1, 5);

  return (
    <Container>
      {(posts?.length && <BlogPage initialPosts={posts} />) || (
        <>
          <h2>Brak wpisów</h2>
        </>
      )}
    </Container>
  );
};

export default BlogPageContainer;
