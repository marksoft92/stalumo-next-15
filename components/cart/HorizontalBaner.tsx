"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProductsStore } from "@/store/productStore"; // <- Twój store

export default function ProductsBanner() {

  const params = useParams();
  const locale = params?.locale as any;

  const { products, fetchProducts } = useProductsStore();
  const [isMobile, setIsMobile] = useState<any>(false);

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
  }, []);

  useEffect(() => {
    fetchProducts(locale); // fetch raz i zapis do store
  }, [locale, fetchProducts]);

  if (products.length === 0) return null;

  // duplikujemy listę, żeby zrobić "infinite loop"
  const items = [...products, ...products];

  return (
    <div className="relative w-full overflow-hidden  my-[2rem]">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: isMobile ? 12 : 40, // krótszy czas na mobilki
          ease: "linear",
        }}
      >
        {items.map((p, idx) => {
          const difference =
            p.regular_price && p.price
              ? Math.round(((p.regular_price - p.price) / p.regular_price) * 100)
              : 0;

          return (
            <Link
              href={
                (locale === "pl"
                  ? "/produkty/"
                  : locale === "en"
                  ? "/products/"
                  : "/producten/") + p?.meta_data_parsed?.slugs?.[locale]
              }
              key={`${p.id}-${idx}`}
              className="flex w-[400px] h-[200px] min-w-[400px] bg-gradient-to-r from-neutral-800 to-neutral-900 border border-neutral-700/50 rounded-xl overflow-hidden mx-2 shadow-md hover:border-red-500/30 transition-all duration-300"
            >
              {/* Obrazek */}
              <div className="relative w-1/2 h-full">
                <Image
                  src={p?.images?.[0]?.src}
                  alt={p?.meta_data_parsed?.locales?.[locale]?.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Treść */}
              <div className="w-1/2 p-4 flex flex-col justify-between text-white">
                <h3 className="font-semibold text-sm line-clamp-2 overflow-visible">
                  {p?.meta_data_parsed?.locales?.[locale]?.title}
                </h3>

                <div>
                  <p className="text-red-500 font-bold text-lg">
                    {p.price} {p.currency}
                  </p>
                  {p.regular_price && p.regular_price > p.price && (
                    <p className="text-neutral-400 text-xs line-through">
                      {p.regular_price} {p.currency}
                    </p>
                  )}
                  {difference > 0 && (
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold inline-block mt-1">
                      -{difference}%
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
