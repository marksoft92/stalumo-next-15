import ArticleBox from "@/components/ArticleBox";
import Container from "@/components/ui/container";

// Funkcja do generowania metadanych SEO

// Pobieranie początkowych postów z API
const fetchPosts = async (lang: string, slug: string) => {
  const res = await fetch(
    `http://localhost:3001/api/blog/${slug}?lang=${lang}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data;
};

const ArticlePageContainer = async ({
  params,
}: {
  params: { locale: string; slug: string };
}) => {
  const data = await params;

  const article = await fetchPosts(data.locale, data?.slug);

  return (
    <Container>
      <ArticleBox article={article} />
    </Container>
  );
};

export default ArticlePageContainer;
