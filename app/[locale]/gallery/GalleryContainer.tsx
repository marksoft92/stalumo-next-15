"use client";
import React, { use, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/container";
import BackgroundSlider from "@/components/BackgroundSilder";
import BoxImg from "@/components/ImageGox";
import { useTranslations } from "next-intl";


export default function GalleryPage() {
  const imagesSlider: string[] = [
    "/assets/images/spawanie1.jpg",
    "/assets/images/spawanie2.jpg",
    "/assets/images/spawanie3.jpg",
    "/assets/images/spawanie4.jpg",
    "/assets/images/spawanie5.jpg",
  ];

  const t = useTranslations("Gallery");

  const [images, setImages] = useState<{ url: string; alt: string }[]>([]); // Przechowujemy listę obiektów z url i alt
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
<>
    <Container>
      <BackgroundSlider images={imagesSlider} maxHeight={"500px"} />
      <div>
        <div className="flex flex-col items-center relative min-h-[500px] justify-center">
          <h2 className="text-[6rem] font-semibold uppercase">{t("title")}</h2>
          <h3>
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
        <section className="grid grid-cols-3 gap-5 my-10 max-lg:flex max-lg:flex-col max-lg:items-center">
          {images.map((image, index) => (
            <BoxImg key={index} url={image?.url} alt={image?.alt} images={images} index={index} />
          ))}
        </section>
      </div>
      <div className="bg-gradient-to-r from-[#EB4036] to-[#9e1c12] rounded-xl p-10 text-white flex flex-col items-start gap-4 shadow-xl mt-20">
    <h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">{t("ctaTitle")}</h2>
    <p className="text-lg font-raleway leading-[2rem]">
    {t("contactDescription")}
    </p>
    <Link
          href="/contact"
          className="mt-4 inline-block px-6 py-3 bg-white text-[#EB4036] font-semibold rounded-xl uppercase tracking-wider hover:bg-[#f8f8f8] transition-all duration-200"
        >
          {t("cta")}
        </Link>
  </div>
    </Container>
</>
  );
}
