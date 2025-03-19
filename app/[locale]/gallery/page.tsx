"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import BackgroundSlider from "@/components/BackgroundSilder";
import BoxImg from "@/components/ImageGox";
export default function GalleryPage() {
  const imagesSlider: string[] = [
    "/assets/images/spawanie1.jpg",
    "/assets/images/spawanie2.jpg",
    "/assets/images/spawanie3.jpg",
    "/assets/images/spawanie4.jpg",
    "/assets/images/spawanie5.jpg",
  ];

  const [images, setImages] = useState<string[]>([]); // Przechowujemy tylko listę URLi
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
        setImages(data.map((image: { url: string }) => image.url)); // Załaduj obrazy
      } catch (error) {
        setError("Error fetching images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>{error}</div>;

  return (
    <Container>
      <BackgroundSlider images={imagesSlider} maxHeight={"500px"} />
      <div>
        <div className="flex flex-col items-center relative min-h-[500px] justify-center">
          <h2 className="text-[6rem] font-semibold uppercase">Galeria</h2>
          <h3>
            <Link
              className="text-[1.6rem] font-semibold uppercase text-[#EB4036]"
              href="/"
            >
              Strona Główna
            </Link>
            <span className="text-[1.6rem] font-semibold uppercase ">
              /Galeria
            </span>
          </h3>
        </div>
        <section className="grid grid-cols-3 gap-5 my-10">
          {images.map((imageUrl, index) => (
            <BoxImg key={index} src={imageUrl} alt={`Image ${index + 1}`} />
          ))}
        </section>
      </div>
    </Container>
  );
}
