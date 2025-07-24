import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { Link } from "@/i18n/routing";
import rawDescriptions from '@/data/spawanie_zachodniopomorskie_uslugi.json';

type ServiceEntry = {
  slugCity: string;
  city: string;
  defCity:string;
  service_slug: string;
  service_name: string;
  description: string;
  cta: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    postalCode: string;
    street: string;
  };
};

const descriptions = rawDescriptions as ServiceEntry[];

type Props = {
  params: {
    slugCity: any;
  };
};

export async function generateStaticParams() {
  const uslugi = [
    "barierki", "balustrady", "bramy", "ogrodzenia", "konstrukcje-stalowe", "schody"
  ];

  const miasta = [
    'szczecin', 'koszalin', 'kolobrzeg', 'stargard', 'drawsko-pomorskie', 
    'swinoujscie', 'police','goleniow' ,'walcz','gryfino','szczecinek','bialogard',
    'gryfice','mysliborz', 'nowogard','zlocieniec','lobez', 'swidwin','choszczno','barlinek'
  ];

  return descriptions.map((entry) => ({
    slugCity: `${entry.service_slug}~${entry.slugCity}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const [slug, city] = params.slugCity.split('~');
  const resolvedParams = params;
  const locale = resolvedParams.locale;

  const entry = descriptions.find(
    (item) => item.slugCity === city && item.service_slug === slug
  );

  if (!entry) notFound(); // 🔴 Ważne: 404 jeśli brak danych

  return {
    title: entry.seo.title,
    keywords: entry.seo.keywords,
    description: entry.seo.description,
    openGraph: {
      title: entry.seo.title,
      description: entry.seo.description,
      images: ['https://stalumo.com/assets/images/stalumo.png'],
    },
    alternates: {
      canonical: `https://stalumo.com/pl/${slug}~${city}`,
    },
  };
}

export default function Page({ params }: any) {
  const [slug, city] = params.slugCity.split('~');

  const entry = descriptions.find(
    (item) => item.slugCity === city && item.service_slug === slug
  );

  if (!entry) notFound(); // 🔴 Ważne: 404 jeśli brak danych

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Stalumo",
    "image": "https://stalumo.com/assets/images/stalumo.png",
    "@id": "https://stalumo.com#stalumo",
    "url": `https://stalumo.com/pl/${slug}~${city}`,
    "telephone": "+48 784-532-549",
    "priceRange": "500–10000 PLN",
    "description": entry.description,
    "sameAs": [
  "https://www.facebook.com/stalumo",
  "https://www.instagram.com/stalumo",
  "https://www.google.com/maps/place/ul.+Kolejowa+6,+73-220+Drawno"
],

    "address": {
      "@type": "PostalAddress",
      "streetAddress":  "ul. Kolejowa 6",
      "addressLocality": "Drawno",
      "postalCode":  "73-220",
      "addressCountry": {
        "@type": "Country",
        "name": "Poland"
      }
    },
    "hasMap": `https://www.google.com/maps/place/${encodeURIComponent(
      `${entry.seo.street}, ${entry.city}, ${entry.seo.postalCode}`
    )}`,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": entry.city
      },
      {
        "@type": "AdministrativeArea",
        "name": "Zachodniopomorskie"
      }
    ]
  };


  return (
    <section className="max-w-[1280px] mx-auto px-4 py-24 flex flex-col gap-16">

  {/* Nagłówek z kategorią i tytułem */}
  <div className="flex flex-col gap-6">
    <h4 className="text-[#EB4036] text-sm font-semibold uppercase tracking-[4px]">
      {/* Przykładowo "Usługi: " + kategoria */}
      Usługi: {entry.service_name}
    </h4>
    <h1 className="text-white text-[4rem] leading-[1.1] font-oswald font-bold uppercase max-lg:text-[2.5rem]">
      {entry.city} — {entry.service_name}
    </h1>
    <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
    <p className="text-[#A5A5A5] text-[1.25rem] leading-[2.1rem] tracking-wide max-w-[80ch] font-raleway">
      {/* Opis 1 */}
      {entry.seo.description ?? entry.description}
    </p>
    <p className="text-[#A5A5A5] text-[1.25rem] leading-[2.1rem] tracking-wide max-w-[80ch] font-raleway">
      {/* Opis 2 */}
      {entry.seo.description}
    </p>
    <p className="text-[#A5A5A5] text-[1.25rem] leading-[2.1rem] tracking-wide max-w-[80ch] font-raleway">
      {/* Opis 3 */}
      {entry.seo.description}
    </p>
  </div>

  {/* Sekcja korzyści */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
    <div className="flex flex-col gap-5">
      <h2 className="text-[2rem] text-white font-semibold uppercase">
        Dlaczego warto wybrać nasze usługi w {entry.defCity}?
      </h2>
      <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
      <ul className="list-disc list-inside text-[#A5A5A5] text-[1.1rem] font-raleway leading-[2rem] tracking-wide">
        {/* Tu wpisz konkretne korzyści z entry lub na sztywno */}
      
          <>
            <li>Profesjonalne podejście do każdego zlecenia</li>
            <li>Terminowość i rzetelność</li>
            <li>Użycie materiałów najwyższej jakości</li>
            <li>Konkurencyjne ceny</li>
            <li>Doświadczenie i pasja</li>
          </>
      
      </ul>
    </div>
    <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#2e2e2e]">
      <h3 className="text-[#EB4036] text-xl font-semibold mb-4 uppercase">
        Materiały i technologia
      </h3>
      <p className="text-[#A5A5A5] font-raleway text-[1.1rem] leading-[2rem]">
        {entry.seo.description ?? "Stosujemy wyłącznie sprawdzone materiały oraz nowoczesne metody wykonania, aby zapewnić trwałość i estetykę."}
      </p>
    </div>
  </div>

  {/* Sekcja Before / After */}
  {1 && (
    <div className="flex flex-col gap-10">
      <h2 className="text-[2.5rem] font-semibold uppercase text-white">
        Zobacz efekt przed i po
      </h2>
      <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />

      {/* <BeforeAfterImages
        beforeUrl={entry.beforeAfter.beforeUrl}
        afterUrl={entry.beforeAfter.afterUrl}
        beforeLabel={entry.beforeAfter.beforeLabel || "Przed"}
        afterLabel={entry.beforeAfter.afterLabel || "Po"}
      /> */}

      <p className="text-[#A5A5A5] text-[1.1rem] leading-[2rem] tracking-wide max-w-[85ch] font-raleway mt-4">
        {entry.seo.description || "Zobacz jak zmieniła się realizacja dzięki naszym usługom."}
      </p>
    </div>
  )}

 

  {1&& (
    <>
      <h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">
        Nasze realizacje
      </h2>
      <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
      <section className="grid grid-cols-3 gap-5 my-10 max-lg:flex max-lg:flex-col max-lg:items-center">
        {/* {images.map((image: any, index: number) => (
          <BoxImg
            key={index}
            url={image.url}
            alt={image.alt}
            images={images}
            index={index}
          />
        ))} */}
      </section>
    </>
  )}

  {/* Sekcja kontaktowa z CTA */}
  <div className="bg-gradient-to-r from-[#EB4036] to-[#9e1c12] rounded-xl p-10 text-white flex flex-col items-start gap-4 shadow-xl mt-20">
    <h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">
    {entry.city} {entry.service_name}
    </h2>
    <p className="text-lg font-raleway leading-[2rem]">
      {entry.description ?? "Masz pytania? Skontaktuj się z nami, chętnie pomożemy!"}
    </p>
    <Link
      href="/contact"
      className="mt-4 inline-block px-6 py-3 bg-white text-[#EB4036] font-semibold rounded-xl uppercase tracking-wider hover:bg-[#f8f8f8] transition-all duration-200"
    >
      {entry?.cta ?? "Kontakt"}
    </Link>
  </div>

</section>

//     <section className="max-w-[1280px] mx-auto px-4 py-24 flex flex-col gap-16">
//     <div className="bg-gradient-to-r from-[#EB4036] to-[#9e1c12] rounded-xl p-10 text-white flex flex-col items-start gap-4 shadow-xl mt-20">
//     <h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">    {entry.city} {entry.service_name}</h2>
//     <p className="text-lg font-raleway leading-[2rem]">
// {entry.description}
//     </p>
//     <Link
//           href="/contact"
//           className="mt-4 inline-block px-6 py-3 bg-white text-[#EB4036] font-semibold rounded-xl uppercase tracking-wider hover:bg-[#f8f8f8] transition-all duration-200"
//         >
//            {entry.cta}
//         </Link>
//   </div>
//   <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//       />
//   </section>
  );
}
