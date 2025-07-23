import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { Link } from "@/i18n/routing";
import rawDescriptions from '@/data/spawanie_zachodniopomorskie_uslugi.json';

type ServiceEntry = {
  slugCity: string;
  city: string;
  service_slug: string;
  service_name: string;
  description: string;
  cta: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
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

  return (
    <section className="max-w-[1280px] mx-auto px-4 py-24 flex flex-col gap-16">
    <div className="bg-gradient-to-r from-[#EB4036] to-[#9e1c12] rounded-xl p-10 text-white flex flex-col items-start gap-4 shadow-xl mt-20">
    <h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">    {entry.city} {entry.service_name}</h2>
    <p className="text-lg font-raleway leading-[2rem]">
{entry.description}
    </p>
    <Link
          href="/contact"
          className="mt-4 inline-block px-6 py-3 bg-white text-[#EB4036] font-semibold rounded-xl uppercase tracking-wider hover:bg-[#f8f8f8] transition-all duration-200"
        >
           {entry.cta}
        </Link>
  </div>
  </section>
  );
}
