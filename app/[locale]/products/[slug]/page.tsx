// app/product/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = params;
  const t = await getTranslations("Products");

  // Tutaj możesz dodać logikę pobierania danych produktu
  // Jeśli produkt nie istnieje, możesz użyć notFound()
  // if (!product) notFound();

  return (
    <main className="bg-neutral-900 min-h-screen text-white px-4 sm:px-8 lg:px-24 py-12">
      {/* Nagłówek */}
      <h1 className="text-4xl font-bold mb-8 text-center text-white">{t("productTitle")}</h1>

      {/* Sekcja zdjęć */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <Image
            src="/miniatura.jpeg"
            alt="Grill Stalumo"
            width={400}
            height={400}
            className="rounded-lg object-cover w-full h-auto mb-4"
          />
          <div className="grid grid-cols-4 gap-4">
            {["/miniatura.jpeg", "/miniatura.jpeg", "/miniatura.jpeg", "/miniatura.jpeg"].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Miniatura ${index + 1}`}
                width={100}
                height={100}
                className="rounded-md object-cover w-full h-24 border border-neutral-700"
              />
            ))}
          </div>
        </div>

        {/* Opis produktu */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Opis produktu</h2>
            <p className="text-neutral-300 mb-6">
              Grill Titan 900 to nowoczesne rozwiązanie dla fanów grillowania. Wykonany ze stali
              walcowanej na zimno, odporny na warunki atmosferyczne i intensywne użytkowanie.
              Idealny do ogrodu, tarasu czy wyjazdów plenerowych. Posiada duży ruszt i system
              regulacji ciepła.
            </p>
            <ul className="list-disc pl-5 text-neutral-400 space-y-1">
              <li>Materiał: Stal walcowana na zimno</li>
              <li>Wymiary: 68 x 39 x 58.5 cm</li>
              <li>Kolor: Czarny mat</li>
              <li>Stabilna konstrukcja</li>
              <li>Prosty montaż</li>
            </ul>
          </div>
          <div className="mt-10">
            <p className="text-3xl text-red-500 font-bold mb-4">749,00 zł</p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg transition">
              Dodaj do koszyka
            </button>
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
            { name: "Grill Pro 600", price: "749,00 zł", img: "/miniatura.jpeg" },
            { name: "Grill Master XL", price: "899,00 zł", img: "/miniatura.jpeg" },
            { name: "Grill Compact 400", price: "549,00 zł", img: "/miniatura.jpeg" },
            { name: "Wędzarnia Stalumo", price: "999,00 zł", img: "/miniatura.jpeg" },
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
