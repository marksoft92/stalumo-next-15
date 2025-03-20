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
  const res = await fetch(
    `http://localhost:3001/api/blog?lang=${lang}&page=${page}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data.posts;
};

const BlogPageContainer = async ({
  params,
}: {
  params: { locale: string };
}) => {
  const posts = await fetchPosts(params.locale, 1, 5);

  return (
    <Container>
      <BlogPage initialPosts={posts} />
    </Container>
  );
};

export default BlogPageContainer;
