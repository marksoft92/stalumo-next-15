import { Metadata } from "next";
import Container from "@/components/ui/container";
import BlogPage from "@/components/BlogPage";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import PerformanceSlider from "@/components/PerformanceSlider";
import { Alert } from "@mui/material";
import { notFound } from "next/navigation";
// Funkcja do generowania metadanych SEO

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("Blog");
  const locale = params.locale || "en";

  const urlMap: Record<any, any> = {
    en: "https://stalumo.com/en/blog",
    pl: "https://stalumo.com/pl/blog",
    de: "https://stalumo.com/de/blog",
  };

  const currentUrl = urlMap[locale] || urlMap.en;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Stalumo", url: "/about" }],
    openGraph: {
      title: `${t("title")} | Stalumo`,
      description: t("description"),
      url: currentUrl,
      siteName: "Stalumo.com",
      type: "website",
      images: [
        {
          url: "https://stalumo.com/assets/images/og.png", // lub dedykowana grafika dla bloga
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: urlMap.en,
        pl: urlMap.pl,
        de: urlMap.de,
      },
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
  if (!posts || posts.length === 0) {
    notFound();
  }
  const t = await getTranslations("Blog");
  return (
    <Container>
      <div>
        <PerformanceSlider images={images} maxHeight={"500px"} />
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
            <h2 className="my-5"><Alert severity="warning">{t("empty")}</Alert></h2>
          </>
        )}
      </div>
    </Container>
  );
};

export default BlogPageContainer;
