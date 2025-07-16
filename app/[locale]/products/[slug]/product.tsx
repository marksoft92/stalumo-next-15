"use client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import VideoPlayer from "@/components/sections/products/VideoPlayer";

interface Props {
  params: {
    slug: string;
  };
}

interface ProductData {
  product: {
    title: string;
    images: string[];
    video: string;
    description: string[];
    specifications: string[];
    advantages: string[];
    included: string[];
    price: {
      old: string;
      discountPercent: string;
      current: string;
      freeShippingThreshold: string;
    };
    availability: string[];
  };
  reviews: {
    rating: number;
    reviewCount: number;
    reviewsList: {
      name: string;
      content: string;
    }[];
  };
  relatedProducts: {
    name: string;
    price: string;
    image: string;
  }[];
}



const ProductBox =  ({ data }: any)=> {
//   const resolvedParams = params;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);





  const {reviews,relatedProducts} = data

  return (
    <main className="bg-neutral-900 min-h-screen text-white px-4 sm:px-8 lg:px-24 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">{data.title}</h1>

      {/* Sekcja zdjęć */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="grid gap-4 items-start">
          <Image
            src={data.images[selectedImageIndex]}
            alt="Zdjęcie produktu"
            width={400}
            height={400}
            className="rounded-lg object-cover w-full h-auto mb-4"
          />
          <div className="grid grid-cols-4 gap-4">
            {data.images.map((src: any, index: any) => (
              <Image
                key={index}
                src={src}
                alt={`Miniatura ${index + 1}`}
                width={100}
                height={100}
                className={`rounded-md object-cover w-full h-24 border ${
                  selectedImageIndex === index ? "border-red-500" : "border-neutral-700"
                } cursor-pointer`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
          <VideoPlayer src={data.video} />
        </div>

        {/* Opis */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Opis produktu</h2>
            {data.description.map((desc: any, i: any) => (
              <p key={i} className="text-neutral-300 mb-6">
                {desc}
              </p>
            ))}

            <h3 className="text-xl font-semibold mb-3 text-neutral-200">Specyfikacja techniczna</h3>
            <ul className="list-disc pl-5 text-neutral-400 space-y-2 mb-6">
              {data.specifications.map((s: any, i: any) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-200">Kluczowe zalety</h3>
            <ul className="list-disc pl-5 text-neutral-400 space-y-2 mb-6">
              {data.advantages.map((a: any, i: any) => (
                <li key={i}>{a}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-200">W zestawie</h3>
            <ul className="list-disc pl-5 text-neutral-400 space-y-1">
              {data.included.map((inc: any, i: any) => (
                <li key={i}>{inc}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <div className="mb-4">
              <span className="text-lg text-neutral-400 line-through">{data.price.old}</span>
              <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
                -{data.price.discountPercent}
              </span>
            </div>
            <p className="text-3xl text-red-500 font-bold mb-4">{data.price.current}</p>
            <p className="text-sm text-neutral-400 mb-6">
              Darmowa dostawa przy zamówieniach powyżej {data.price.freeShippingThreshold}
            </p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg transition-colors duration-200 max-w-[10rem]">
              Kup Teraz
            </button>
            <div className="mt-6 text-sm text-neutral-400 space-y-1">
              {data.availability.map((line: any, i: any) => (
                <p key={i}>✓ {line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Opinie */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">Opinie klientów</h2>
        <div className="mb-6 flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
          <span className="text-neutral-300">
            ({reviews.rating.toFixed(1)} na podstawie {reviews.reviewCount} opinii)
          </span>
        </div>
        <div className="space-y-6">
          {reviews.reviewsList.map((review: any, i: any) => (
            <div key={i} className="bg-neutral-800 p-4 rounded-lg">
              <p className="font-semibold text-white mb-1">{review.name}</p>
              <p className="text-neutral-300">{review.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Podobne produkty */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">Podobne produkty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item: any, i: any) => (
            <div key={i} className="bg-neutral-800 p-4 rounded-lg text-center">
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                className="w-full h-52 object-cover rounded-md mb-4"
              />
              <h3 className="text-white font-semibold mb-1">{item.name}</h3>
              <p className="text-red-500 font-bold">{item.price}</p>
              <button className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm">
                Zobacz produkt
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


export default ProductBox