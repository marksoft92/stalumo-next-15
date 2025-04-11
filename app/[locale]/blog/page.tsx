import { Metadata } from "next";
import Container from "@/components/ui/container";
import BlogPage from "@/components/BlogPage";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import BackgroundSlider from "@/components/BackgroundSilder";

// Funkcja do generowania metadanych SEO

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("Blog");

  return {
    title: `${t("title")} | My Website`, // Dynamiczny tytuł
    description: t("description"), // Dynamiczny opis
    authors: [{ name: "Stalumo", url: "/about" }],
    keywords: `${t("keywords")}`,
    openGraph: {
      title: `${t("title")} | My Website`,
      description: t("description"),
      url: `/${params.locale}/blog`,
      siteName: "Stalumo.pl",
      type: "website",
    },
  };
}

// Pobieranie początkowych postów z API
const fetchPosts = async (lang: string, page: number, limit: number) => {
  try {
    const res = await fetch(
      `${process.env.APP_URL}api/blog?lang=${lang}&page=${page}`
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

const images: string[] = [
  "/assets/images/spawanie1.jpg",
  "/assets/images/spawanie2.jpg",
  "/assets/images/spawanie3.jpg",
  "/assets/images/spawanie4.jpg",
  "/assets/images/spawanie5.jpg",
];

const BlogPageContainer = async ({ params }: { params: any }) => {
  const data = await params;
  const posts = await fetchPosts(data.locale, 1, 5);
  const t = await getTranslations("Blog");
  return (
    <Container>
      <div>
        <BackgroundSlider images={images} maxHeight={"500px"} />
        <div className="flex flex-col items-center relative min-h-[500px] justify-center">
          <h2 className="text-[6rem] font-semibold uppercase">Blog</h2>
          <h3 className="max-lg:text-center">
            <Link
              className="text-[1.6rem] font-semibold uppercase text-[#EB4036]"
              href="/"
            >
              {t("homeTitle")}
            </Link>
            <span className="text-[1.6rem] font-semibold uppercase ">
              /{t("titleMain")}
            </span>
          </h3>
        </div>
        {(posts?.length && <BlogPage initialPosts={posts} />) || (
          <>
            <h2>{t("empty")}</h2>
          </>
        )}
      </div>
    </Container>
  );
};

export default BlogPageContainer;
