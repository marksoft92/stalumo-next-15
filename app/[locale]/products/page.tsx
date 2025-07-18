import { Metadata } from "next";
import Container from "@/components/ui/container";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import PerformanceSlider from "@/components/PerformanceSlider";
import ProductCard from "@/components/ProductCard";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
// Funkcja do generowania metadanych SEO

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("Categories");
  const p = await params
  return {
    title: `${t("title")}`, // Dynamiczny tytuł
    description: t("description"), // Dynamiczny opis
    authors: [{ name: "Stalumo", url: "/about" }],
    keywords: `${t("keywords")}`,
    openGraph: {
      title: `${t("title")} | My Website`,
      description: t("description"),
      url: `/${p.locale}/blog`,
      siteName: "Stalumo.com",
      type: "website",
    },
  };
}

// Pobieranie początkowych postów z AP

const fetchPosts = async (locale: any,slug: any) => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/data/products.json`);
  if (!res.ok) return null;
  const data = await res.json();
  const product = data?.products

  if (product) {
    return product
  }

  return null;
};


const CategoriesPage = async ({ params }: { params: any }) => {
  const slug = params.slug;
  const locale = params.locale

  const productData = await fetchPosts(locale,slug);
console.log(productData)

  if (!productData[0]) {
    notFound();
  }


  const imagesSlider: string[] = [
    "/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg",
    "/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg",

  ];

  const t = await getTranslations("Products");
  return (
    <Container>
      <PerformanceSlider images={imagesSlider} maxHeight={"500px"} />
      <div className="flex flex-col items-center relative min-h-[500px] justify-center">
          <h2 className="text-[6rem] font-semibold uppercase text-center max-lg:text-[4rem] ">{t("title")}</h2>
          <h3 className="text-center">
            <Link
              className="text-[1.6rem] font-semibold uppercase text-[#EB4036]"
              href="/"
            >
              {t("homeTitle")}
            </Link>
            <span className="text-[1.6rem] font-semibold uppercase ">
              /{t("title")}
            </span>
          </h3>
        </div>
      <div>


        <div className=" ">
      <div className="max-w-6xl mx-auto">


        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden mt-[5rem]">
          {productData.map((cat:any) => (
  
            <ProductCard 
            slug={(locale === 'pl' ? '/produkty/' : locale === 'en' ? '/products/' : '/producten/')+cat?.slugs?.[locale]}
            title={cat?.locales?.[locale]?.title}
            imageUrl={cat?.images?.[0]}
            price= {cat?.locales?.[locale]?.price?.current}

            />
           
          ))}
        </div>
      </div>
    </div>
        
      </div>
    </Container>
  );
};

export default CategoriesPage;
