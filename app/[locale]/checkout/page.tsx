import { notFound } from "next/navigation";
import CheckoutForm from "./Ckeckout";

// Fetch produktów (server-side)
const fetchProducts = async (locale: string, page: number, limit: number) => {
    try {
        const res = await fetch(
            `${process.env.APP_URL}api/products?locale=${locale}&page=${page}&limit=${limit}`,
            { cache: "no-store" } // zawsze aktualne dane
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Błąd podczas pobierania produktów:", err);
        return [];
    }
};

export default async function CartPage({ params }: { params: any }) {
    const { locale } = params;
    const products = await fetchProducts(locale, 1, 100); // wszystkie produkty

    if (!products || products.length === 0) {
        notFound();
    }

    // Przekazanie produktów do komponentu client-side
    return <CheckoutForm products={products} locale={locale} />;
}
