// app/[locale]/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProductBox from "./product";
import type { Metadata } from "next";
const fetchProducts = async (locale: string, page: number, limit: number, slug: string) => {
  try {
    const url = `${process.env.APP_URL}api/products?locale=${locale}&page=${page}&limit=${limit}`;


    const res = await fetch(url, { cache: "no-store" }); // zawsze aktualne dane
    if (!res.ok) {
      throw new Error("❌ Failed to fetch products");
    }

    const data = await res.json();

    const product = data?.find((p: any) =>
      Object.values(p.meta_data_parsed.slugs).includes(slug)
    );


    // ✅ Jeżeli chcesz wyciągnąć locale + globalne dane (jak w starym fetchPosts)
    if (product) {
      return {
        ...product,
        ...product.meta_data_parsed.locales[locale],
        // images: product.meta_data_parsed.images,
        video: product.meta_data_parsed.video,
      };
    }

    return null;
  } catch (err) {
    console.error("❌ Błąd podczas pobierania produktów:", err);
    return [];
  }
};

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const { locale, slug } = params;

  // pobieramy produkt (możesz wykorzystać tę samą funkcję co w page)
  const productData = await fetchProducts(locale, 1, 12, slug);

  if (!productData) {
    return {
      title: "Produkt nie znaleziony - Stalumo",
      description: "Nie znaleziono produktu.",
    };
  }

 // dane lokalizowane
 const localized = productData.meta_data_parsed?.locales?.[locale] || {};

 // SEO dane
 const title =
   localized.seo_title ||
   localized.title ||
   productData.title ||
   "Produkt stalowy - Stalumo";

 const description =
   localized.seo_description ||
   localized.short_description ||
   productData.description ||
   "Poznaj wyjątkowe produkty stalowe od Stalumo.";

 const image =
   productData?.images?.[0]?.src ||
   "/og-image-default.jpg";

 const url = `${process.env.APP_URL}${locale}/products/${slug}`;

  console.log(productData)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image }],
      type: "website",
    },
    alternates: {
      canonical: url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}




const ProductPage = async ({ params }: { params: any }) => {
  const slug = params.slug;
  const locale = params.locale

  const productData = await fetchProducts(locale, 1, 12, slug);


  if (!productData) {
    notFound();
  }

  return <ProductBox
    productData={productData}
    locale={locale}
  />;
};

export default ProductPage;
