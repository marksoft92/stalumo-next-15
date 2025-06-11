import ArticleBox from "@/components/ArticleBox";
import Container from "@/components/ui/container";
import { generateMetadata } from "./metadata";
import { notFound } from "next/navigation";
// Funkcja do pobierania danych artykułów
const fetchPosts = async (lang: string, slug: string) => {
  const res = await fetch(
    `${process.env.APP_URL}api/blog/${slug}?lang=${lang}`
  );
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
};


const ArticlePageContainer = async ({ params }: { params: any }) => {

  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const article = await fetchPosts(locale, slug);
  if (!article) {
    notFound();
  }
  return (
    <Container>
      <ArticleBox article={article} />
    </Container>
  );
};

export { generateMetadata };
export default ArticlePageContainer;
