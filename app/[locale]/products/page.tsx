import { Metadata } from "next";
import Container from "@/components/ui/container";
import ProductCard from "@/components/ProductCard";
import PerformanceSlider from "@/components/PerformanceSlider";
import { Flame, Truck, Shield } from 'lucide-react';
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Alert } from "@mui/material";
import { notFound } from "next/navigation";
import ProductsCTASection from "@/components/cart/ProductsCta";

const fetchProducts = async (locale: string, page: number, limit: number) => {

  try {
    const res = await fetch(
      `${process.env.APP_URL}api/products?locale=${locale}&page=${page}&limit=${limit}`,
      { cache: "no-store" } // zawsze aktualne dane
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data; // zakładam że API zwraca tablicę produktów
  } catch (err) {
    console.error("Błąd podczas pobierania produktów:", err);
    return [];
  }
};

const images: string[] = [
  "/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg",
  "/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg",
];

const ProductsPageContainer = async ({ params }: { params: any }) => {
  const { locale } = params;
  const products = await fetchProducts(locale, 1, 12);

  if (!products || products.length === 0) {
    notFound();
  }



  const t = await getTranslations("Products");
  const tHeader = await getTranslations("Header");
  const currency = locale === "pl" ? 'zł' : "PLN"
  return (<>
    <Container>

      <div>

          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-neutral-400 mt-[1rem]">
            <Link href="/"><span>{tHeader("home")}</span></Link> / <Link href="/products"><span>{t("title")}</span></Link> 
          </nav>

        {(products?.length && (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden mt-[3rem]">
            
            {products.map((p: any) => (

              <ProductCard
                currency={currency}
                key={p.id}
                slug={
                  (locale === "pl"
                    ? "/produkty/"
                    : locale === "en"
                      ? "/products/"
                      : "/producten/") + p?.meta_data_parsed?.slugs?.[locale]
                }
                title={p?.meta_data_parsed?.locales?.[locale]?.title}
                imageUrl={p?.images?.[0]?.src}
                price={p?.sale_price}
                regular_price={p?.regular_price}
                features={p?.meta_data_parsed?.locales?.[locale]?.availability}
              />
            ))}
          </div>
        )) || (
            <h2 className="my-5">
              <Alert severity="warning">{t("empty")}</Alert>
            </h2>
          )}
      </div>
      <ProductsCTASection />
    </Container>
    </>
  );
};

export default ProductsPageContainer;
