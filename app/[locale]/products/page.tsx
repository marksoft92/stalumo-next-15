import { Metadata } from "next";
import Container from "@/components/ui/container";
import BlogPage from "@/components/BlogPage";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import BackgroundSlider from "@/components/BackgroundSilder";
import {Alert} from "@mui/material";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
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



const CategoriesPage = async ({ params }: { params: any }) => {
  const imagesSlider: string[] = [
    "/assets/images/spawanie1.jpg",
    "/assets/images/spawanie2.jpg",
    "/assets/images/spawanie3.jpg",
    "/assets/images/spawanie4.jpg",
    "/assets/images/spawanie5.jpg",
  ];
  const data = await params;
  const locale = data.locale
  const categories  = {
    pl: [
      { title: "Grill gazowy", slug: "/pl/produkty/grill-gazowy", description: "Grill klasy premium - wysoka jakość",price: 888 , imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg',currency: 'zł'},
      { title: "Grill węglowy", slug: "/pl/produkty/grill-weglowy", description: "Grill klasy premium - wysoka jakość",price: 777 , imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg',currency: 'zł'},
      { title: "Grill gazowy", slug: "/pl/produkty/grill-gazowy", description: "Grill klasy premium - wysoka jakość",price: 888 , imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg',currency: 'zł'},
      { title: "Grill węglowy", slug: "/pl/produkty/grill-weglowy", description: "Grill klasy premium - wysoka jakość",price: 777 , imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg',currency: 'zł'},
      { title: "Grill gazowy", slug: "/pl/produkty/grill-gazowy", description: "Grill klasy premium - wysoka jakość",price: 888 , imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg',currency: 'zł'},
      { title: "Grill węglowy", slug: "/pl/produkty/grill-weglowy", description: "Grill klasy premium - wysoka jakość",price: 777 , imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg',currency: 'zł'},
    ],
    en: [
      { title: "Gas Grill", slug: "/en/products/gas-grill", description: "Premium-class grill – high quality",price: 244, imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg' ,currency: '€'},
      { title: "Charcoal Grill", slug: "/en/products/charcoal-grill", description: "Premium-class grill – high quality",price: 222 , imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg',currency: '€'},
      { title: "Gas Grill", slug: "/en/products/gas-grill", description: "Premium-class grill – high quality",price: 244, imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg' ,currency: '€'},
      { title: "Charcoal Grill", slug: "/en/products/charcoal-grill", description: "Premium-class grill – high quality",price: 222 , imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg',currency: '€'},
      { title: "Gas Grill", slug: "/en/products/gas-grill", description: "Premium-class grill – high quality",price: 244, imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg' ,currency: '€'},
      { title: "Charcoal Grill", slug: "/en/products/charcoal-grill", description: "Premium-class grill – high quality",price: 222 , imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg',currency: '€'},
    ],
    
    de: [
      { title: "Gasgrill", slug: "/de/producten/gasgrill", description: "Grill der Premiumklasse – hohe Qualität",price: 244, imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg' ,currency: '€'},
      { title: "Holzkohlegrill", slug: "/de/producten/holzkohlegrill", description: "Grill der Premiumklasse – hohe Qualität",price: 222, imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg' ,currency: '€'},
      { title: "Gasgrill", slug: "/de/producten/gasgrill", description: "Grill der Premiumklasse – hohe Qualität",price: 244, imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg' ,currency: '€'},
      { title: "Holzkohlegrill", slug: "/de/producten/holzkohlegrill", description: "Grill der Premiumklasse – hohe Qualität",price: 222, imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg' ,currency: '€'},
      { title: "Gasgrill", slug: "/de/producten/gasgrill", description: "Grill der Premiumklasse – hohe Qualität",price: 244, imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg',currency: '€' },
      { title: "Holzkohlegrill", slug: "/de/producten/holzkohlegrill", description: "Grill der Premiumklasse – hohe Qualität",price: 222, imageUrl: '/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg',currency: '€' },
    ],
    
  }
  const t = await getTranslations("Products");
  return (
    <Container>
      <BackgroundSlider images={imagesSlider} maxHeight={"500px"} />
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
          {categories?.[locale as keyof typeof categories].map((cat:any) => (
        //     <a
        //       key={cat.slug}
        //       href={`/${locale}/products/${cat.slug}`}
        //       className="overflow-hidden bg-neutral-800 border border-neutral-700 hover:border-red-600 transition-all rounded-lg p-6 text-white shadow-md hover:shadow-xl hover:scale-[1.02]"
        //     >
        //       <h2 className="text-xl font-semibold uppercase tracking-wider mb-2">
        //         {cat.title}
        //       </h2>
        //       <p className="text-sm text-neutral-400">{cat.description}</p>
        //       <Image
        //   width={300}
        //   height={300}
        //   alt={'Grill'}
        //   src={'/miniatura.jpeg'}
        //   className="cursor-pointer h-full rounded-[6px] w-[100%] h-[100%]"
        //   loading="lazy"
        // />
        //     </a>
            <ProductCard 
            description={cat?.description}
            slug={cat?.slug}
            title={cat?.title}
            imageUrl={cat?.imageUrl}
            price= {cat?.price}
currency={cat?.currency}
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
