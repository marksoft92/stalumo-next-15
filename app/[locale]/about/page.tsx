import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import BackgroundSlider from "@/components/BackgroundSilder";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
export async function generateMetadata({
  params,
}: any): Promise<any> {
  const { locale } = params;

  const meta: any = {
    en: {
      title: "About Us | Stalumo - Custom Steel Craftsmanship Experts",
      description:
        "Learn more about Stalumo – experts in crafting custom steel railings, gates, and metalwork. Discover our mission, values, and commitment to quality.",
      keywords:
        "about Stalumo, custom steel company, steelwork team, metalwork experience, steel craftsmanship",
      url: "https://stalumo.com/en/about-us",
      image: "https://stalumo.com/assets/images/logo.png",
    },
    pl: {
      title: "O Nas | Stalumo - Specjaliści od Stali i Konstrukcji",
      description:
        "Poznaj firmę Stalumo – tworzymy balustrady, bramy i konstrukcje stalowe na zamówienie. Dowiedz się więcej o naszej misji, zespole i podejściu do jakości.",
      keywords:
        "o nas stalumo, firma stalowa, konstrukcje stalowe, balustrady stalowe, doświadczenie w metaloplastyce",
      url: "https://stalumo.com/pl/o-nas",
      image: "https://stalumo.com/assets/images/logo.png",
    },
    de: {
      title: "Über Uns | Stalumo - Maßgeschneiderte Stahl- und Metalllösungen",
      description:
        "Erfahren Sie mehr über Stalumo – wir fertigen individuelle Stahlgeländer, Tore und Metallkonstruktionen. Lernen Sie unser Team und unsere Werte kennen.",
      keywords:
        "über Stalumo, stahlbau unternehmen, metallarbeiten team, maßgefertigte lösungen, stahl konstruktionen",
      url: "https://stalumo.com/de/uber-uns",
      image: "https://stalumo.com/assets/images/logo.png",
    },
  };

  const currentMeta = meta[locale] || meta["en"];

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    robots: "index, follow",
    openGraph: {
      url: currentMeta.url,
      title: currentMeta.title,
      description: currentMeta.description,
      type: "website",
      images: [
        {
          url: currentMeta.image,
          width: 1200,
          height: 630,
          alt: currentMeta.title,
        },
      ],
      siteName: "Stalumo",
    },
    twitter: {
      card: "summary_large_image",
      site: "@Stalumo",
      title: currentMeta.title,
      description: currentMeta.description,
      images: currentMeta.image,
    },
    alternates: {
      canonical: currentMeta.url,
      languages: {
        en: "https://stalumo.com/en/about-us",
        pl: "https://stalumo.com/pl/o-nas",
        de: "https://stalumo.com/de/uber-uns",
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
export default async function AboutPage({
  params,
}: any) {
  const { locale } = await params;
  const images: string[] = [
    "/assets/images/spawanie1.jpg",
    "/assets/images/spawanie2.jpg",
    "/assets/images/spawanie3.jpg",
    "/assets/images/spawanie4.jpg",
    "/assets/images/spawanie5.jpg",
  ];
  const t = await getTranslations("About");

  return (
    <>
    <Container>
      <BackgroundSlider images={images} maxHeight={"500px"} />
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
              / {t("title")}
            </span>
          </h3>
        </div>
        <section className="flex  f-row p-7rem py-0 lg:gap-x-[70px] gap-y-0 m-[10rem] max-lg:my-[5rem] mx-auto max-lg:flex-col">
          <div className="relative">
            <div>
              <Image
                src="/assets/images/icons/Gp-2.png"
                width={133}
                height={133}
                className="p-[0.3em] absolute top-[-1rem] left-[-1rem] z-[-1]"
                alt="Icon"
                loading="lazy"
              />
            </div>
            <div>
              <Image
                src="/assets/images/spawacz2.jpg"
                width={100}
                height={100}
                className="p-[0.3em]"
                alt="spawacz"
                loading="lazy"
                layout="responsive"
              />
            </div>
          </div>
          <div className="max-w-full lg:max-w-[50%] flex justify-center flex-col gap-5">
            <h4 className="text-[#EB4036] text-[1rem] font-semibold">
              STALUMO
            </h4>
            <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem]">
              {t("descriptionTitle")}
            </h2>
            <p
              className="text-[#A5A5A5] text-[1.2rem]"
              dangerouslySetInnerHTML={{ __html: t("description") }}
            ></p>
          </div>
        </section>
      </div>
    </Container>
    </>
  );
}
