// app/product/page.tsx
"use client"
import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { use } from "react";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default function ProductPage({ params }: Props) {
  const resolvedParams = use(params);
  const { locale, slug } = resolvedParams;
  const t = useTranslations("Products");

  const images = ["/assets/images/products/Flux_Dev_Create_an_image_of_a_steel_grill_for_a_campfire_coal__0.jpg", "/assets/images/products/Flux_Dev_Create_an_image_of_a_steel_grill_for_a_campfire_coal__1.jpg", "/assets/images/products/Flux_Dev_Create_an_image_of_a_steel_grill_for_a_campfire_coal__2.jpg", "/assets/images/products/Flux_Dev_Create_an_image_of_a_steel_grill_for_a_campfire_coal__3.jpg"];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <main className="bg-neutral-900 min-h-screen text-white px-4 sm:px-8 lg:px-24 py-12">
      {/* Nagłówek */}
      <h1 className="text-4xl font-bold mb-8 text-center text-white">{t("productTitle")}</h1>

      {/* Sekcja zdjęć */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <Image
            src={images[selectedImageIndex]}
            alt="Grill Stalumo"
            width={400}
            height={400}
            className="rounded-lg object-cover w-full h-auto mb-4"
          />
          <div className="grid grid-cols-4 gap-4">
            {images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Miniatura ${index + 1}`}
                width={100}
                height={100}
                className={`rounded-md object-cover w-full h-24 border ${
                  selectedImageIndex === index ? 'border-red-500' : 'border-neutral-700'
                } cursor-pointer`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Opis produktu */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Opis produktu</h2>
            <p className="text-neutral-300 mb-6">
              Grill Titan 900 to wyjątkowe rozwiązanie stworzone dla prawdziwych miłośników grillowania, 
              którzy nie akceptują kompromisów w kwestii jakości i funkcjonalności. Ten nowoczesny grill 
              został zaprojektowany z myślą o intensywnym użytkowaniu w każdych warunkach atmosferycznych. 
              Wykonany ze stali walcowanej na zimno najwyższej jakości, charakteryzuje się niezwykłą 
              odpornością na korozję, wysokie temperatury oraz mechaniczne uszkodzenia.
            </p>
            <p className="text-neutral-300 mb-6">
              Dzięki przemyślanej konstrukcji i ergonomicznemu designowi, Grill Titan 900 zapewnia 
              równomierne rozprowadzanie ciepła na całej powierzchni grillowania, co gwarantuje 
              perfekcyjne przygotowanie każdej potrawy. Duży ruszt o powierzchni grillowania 
              umożliwia jednoczesne przygotowanie posiłków dla całej rodziny lub grupy przyjaciół. 
              Zaawansowany system regulacji ciepła pozwala na precyzyjne kontrolowanie temperatury 
              i dostosowanie jej do rodzaju grillowanego produktu.
            </p>
            <p className="text-neutral-300 mb-6">
              Idealny nie tylko do domowego ogrodu czy tarasu, ale także na wycieczki, camping 
              i wszelkie imprezy plenerowe. Solidna, stabilna konstrukcja zapewnia bezpieczeństwo 
              użytkowania, a matowe wykończenie w kolorze czarnym nadaje mu elegancki, profesjonalny wygląd.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-neutral-200">Specyfikacja techniczna</h3>
            <ul className="list-disc pl-5 text-neutral-400 space-y-2 mb-6">
              <li>Materiał: Stal walcowana na zimno - najwyższa jakość i trwałość</li>
              <li>Wymiary: 68 x 39 x 58.5 cm - optymalne proporcje</li>
              <li>Powierzchnia grillowania: 39 x 68 cm (2652 cm²)</li>
              <li>Kolor: Czarny mat - eleganckie wykończenie odporne na zarysowania</li>
              <li>Waga: 15 kg - stabilność bez nadmiernej ciężkości</li>
              <li>Wysokość robocza: 58.5 cm - komfortowe grillowanie</li>
              <li>Stabilna konstrukcja - nogi z regulacją wysokości</li>
              <li>Prosty montaż - instrukcja w języku polskim</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-200">Kluczowe zalety</h3>
            <ul className="list-disc pl-5 text-neutral-400 space-y-2 mb-6">
              <li>Odporność na wysokie temperatury do 800°C</li>
              <li>Powłoka antykorozyjna - długotrwała ochrona</li>
              <li>System wentylacji - optymalne spalanie</li>
              <li>Ergonomiczne uchwyty - bezpieczne przenoszenie</li>
              <li>Łatwe czyszczenie - gładkie powierzchnie</li>
              <li>Kompatybilność z węglem drzewnym i brykietem</li>
              <li>Gwarancja producenta 24 miesiące</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-200">W zestawie</h3>
            <ul className="list-disc pl-5 text-neutral-400 space-y-1">
              <li>Korpus grilla ze stali walcowanej</li>
              <li>Ruszt grillowy chromowany</li>
              <li>Nogi z regulacją (4 szt.)</li>
              <li>Elementy montażowe</li>
              <li>Instrukcja obsługi w języku polskim</li>
              <li>Karta gwarancyjna</li>
            </ul>
          </div>
          <div className="mt-10">
            <div className="mb-4">
              <span className="text-lg text-neutral-400 line-through">899,00 zł</span>
              <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded text-sm">-17%</span>
            </div>
            <p className="text-3xl text-red-500 font-bold mb-4">749,00 zł</p>
            <p className="text-sm text-neutral-400 mb-6">
              Darmowa dostawa przy zamówieniach powyżej 500 zł
            </p>
            <div className="space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg transition-colors duration-200 max-w-[10rem]" >
               Kup Teraz
              </button>

            </div>
            <div className="mt-6 text-sm text-neutral-400">
              <p>✓ Dostępny od ręki</p>
              <p>✓ Wysyłka w 24h</p>
              <p>✓ Gwarancja 24 miesiące</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opinie klientów */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">Opinie klientów</h2>
        <div className="mb-6 flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
          <span className="text-neutral-300">(5.0 na podstawie 14 opinii)</span>
        </div>
        <div className="space-y-6">
          {[
            {
              name: "Adam K.",
              content:
                "Świetna jakość, grill sprawdza się perfekcyjnie na każdej imprezie. Solidna konstrukcja.",
            },
            {
              name: "Marta P.",
              content:
                "Estetyczny i łatwy w użyciu. Stal rzeczywiście wytrzymała na deszcz. Polecam!",
            },
          ].map((review, i) => (
            <div key={i} className="bg-neutral-800 p-4 rounded-lg">
              <p className="font-semibold text-white mb-1">{review.name}</p>
              <p className="text-neutral-300">{review.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sekcja podobnych produktów */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">Podobne produkty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Grill Pro 600", price: "749,00 zł", img: "/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_0.jpg" },
            { name: "Grill Master XL", price: "899,00 zł", img: "/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_1.jpg" },
            { name: "Grill Compact 400", price: "549,00 zł", img: "/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_2.jpg" },
            { name: "Wędzarnia Stalumo", price: "999,00 zł", img: "/assets/images/products/Flux_Dev_Generate_a_highly_detailed_realistic_image_of_a_steel_3.jpg" },
          ].map((item, i) => (
            <div key={i} className="bg-neutral-800 p-4 rounded-lg text-center">
              <Image
                src={item.img}
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
