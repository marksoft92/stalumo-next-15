import ArticleBox from "@/components/ArticleBox";
import Container from "@/components/ui/container";
import { generateMetadata } from "./metadata";

// Funkcja do pobierania danych artykułów
const fetchPosts = async (lang: string, slug: string) => {
  const res = await fetch(
    `${process.env.APP_URL}api/blog/${slug}?lang=${lang}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data;
};


const ArticlePageContainer = async ({ params }: { params: any }) => {

  const { locale, slug } = await params;

  const article = await fetchPosts(locale, slug);

  return (
    <Container>
      <ArticleBox article={article} />
    </Container>
  );
};

export { generateMetadata };
export default ArticlePageContainer;
