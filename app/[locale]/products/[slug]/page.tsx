// app/[locale]/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProductBox from "./product";
import { headers } from "next/headers";
import { any } from "zod";

interface Props {
  params: {
    slug: any;
    locale: any
  };
}

const fetchPosts = async (locale: any,slug: any) => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/data/products.json`);
  if (!res.ok) return null;

  const data = await res.json();

  const product = data?.products?.find((p: any) =>
    Object.values(p.slugs).includes(slug)
  );

  // Jeśli znaleziono, zwróć dane z locales[locale] + inne globalne dane jak images/video
  if (product) {
    return {
      ...product.locales[locale],
      images: product.images,
      video: product.video,
    };
  }

  return null;
};

const ProductPage = async ({ params }: Props) => {
  const slug = params.slug;
  const locale = params.locale

  const productData = await fetchPosts(locale,slug);


  if (!productData) {
    notFound();
  }

  return <ProductBox data={productData} />;
};

export default ProductPage;
