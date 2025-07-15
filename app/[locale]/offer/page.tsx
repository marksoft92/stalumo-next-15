"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/container";
import BackgroundSlider from "@/components/BackgroundSilder";
import { useTranslations } from "next-intl";
import RailingsSection from "@/components/sections/offer/Railings";
import FencesSection from "@/components/sections/offer/Fences";
import GatesSection from "@/components/sections/offer/Gates";
import OtherStelSection from "@/components/sections/offer/OtherSteelStructures";

const categories = [
    "railings",
    "fences",
    "gates",
    "other-steel-structures",
  ];
  

export default function OfferPage() {
  const imagesSlider: any[] = [
    "/assets/images/img_work9.jpg",
    "/assets/images/img_work15.jpg",
    "/assets/images/img_work21.jpg",
    "/assets/images/img_work37.jpg",
  ];

  const t = useTranslations("Offer");

  const [images, setImages] = useState<{ url: any; alt: any }[]>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>("railings");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data.images); // Załaduj obrazy
      } catch (error) {
        setError("Error fetching images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);



  return (
    <Container>
      <BackgroundSlider images={imagesSlider} maxHeight={"500px"} />
      <div>
        <div className="flex flex-col items-center relative min-h-[400px] justify-center">
          <h2 className="text-[6rem] font-semibold uppercase">{t("title")}</h2>
          <h3>
            <Link
              className="text-[1.6rem] font-semibold uppercase text-[#EB4036]"
              href="/"
            >
              {t("homeTitle")}
            </Link>
            <span className="text-[1.6rem] font-semibold uppercase">
              /{t("title")}
            </span>
          </h3>
        </div>

        {/* KATEGORIE */}
        <div className="flex gap-4 justify-center  flex-wrap relative z-1 ">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 uppercase font-semibold rounded-2xl shadow-md transition ${
                selectedCategory === cat
                  ? "bg-[#EB4036] text-white"
                  : "bg-gray-200 text-red-500" 
              }`}
            >
              {t(cat)}
            </button>
          ))}
        </div>

      <> { 
      selectedCategory === "railings" && <RailingsSection images={images} loading={loading} error={error}/> || 
        selectedCategory === "fences" && <FencesSection images={images} loading={loading} error={error}/> ||
        selectedCategory === "gates" && <GatesSection images={images} loading={loading} error={error}/> ||
        selectedCategory === "other-steel-structures" && <OtherStelSection images={images} loading={loading} error={error}/> ||
        loading && <p className="text-center">Loading...</p>
      
      
      }</>
     
      </div>
    </Container>
  );
}
