// app/[locale]/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProductBox from "./product";
import { headers } from "next/headers";

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
