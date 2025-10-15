import { create } from "zustand";

type Product = {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  regular_price?: number;
  currency?: string;
  images: any;
  meta_data_parsed: any;
};

type ProductsState = {
  products: Product[];
  fetchProducts: (locale: any) => Promise<void>;
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],

  fetchProducts: async (locale: any) => {
    // jeśli już mamy produkty, nie fetchujemy ponownie
    if (get().products.length > 0) return;

    try {
      const res = await fetch(
        `/api/products?locale=${locale}&page=1&limit=12`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      set({ products: data });
    } catch (err) {
      console.error("Błąd podczas pobierania produktów:", err);
    }
  },
}));
