"use client";

import BoxImg from "@/components/ImageGox";
import { useTranslations } from "next-intl";



export default function FencesSection(props: any) {
  const { images, loading, error } = props
  const t = useTranslations("Offer");
  return (
    <section className="max-w-[1280px] mx-auto px-4 py-24 flex flex-col gap-16">

      <div className="flex flex-col gap-6">
        <h4 className="text-[#EB4036] text-sm font-semibold uppercase tracking-[4px]">

          {t("descriptionPage.category")}{t("descriptionPage.fences.titleCategory")}
        </h4>
        <h1 className="text-white text-[4rem] leading-[1.1] font-oswald font-bold uppercase max-lg:text-[2.5rem]">
          {t("descriptionPage.fences.header")}
        </h1>
        <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
        <p className="text-[#A5A5A5] text-[1.25rem] leading-[2.1rem] tracking-wide max-w-[80ch] font-raleway">
          {t("descriptionPage.fences.description1")}
        </p>
        <p className="text-[#A5A5A5] text-[1.25rem] leading-[2.1rem] tracking-wide max-w-[80ch] font-raleway">
          {t("descriptionPage.fences.description2")}
        </p>
        <p className="text-[#A5A5A5] text-[1.25rem] leading-[2.1rem] tracking-wide max-w-[80ch] font-raleway">
          {t("descriptionPage.fences.description3")}
        </p>
      </div>

      {/* Sekcja korzyści */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="flex flex-col gap-5">
          <h2 className="text-[2rem] text-white font-semibold uppercase">  {t("descriptionPage.fences.questionTitle")}</h2>
          <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
          <ul className="list-disc list-inside text-[#A5A5A5] text-[1.1rem] font-raleway leading-[2rem] tracking-wide">
            <li>{t("descriptionPage.fences.example1")}</li>
            <li>{t("descriptionPage.fences.example2")}</li>
            <li>{t("descriptionPage.fences.example3")}</li>
            <li>{t("descriptionPage.fences.example4")}</li>
            <li>{t("descriptionPage.fences.example5")}</li>
          </ul>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#2e2e2e]">
          <h3 className="text-[#EB4036] text-xl font-semibold mb-4 uppercase">{t("descriptionPage.fences.materialTitle")}</h3>
          <p className="text-[#A5A5A5] font-raleway text-[1.1rem] leading-[2rem]">
            {t("descriptionPage.fences.mateiralDescription")}
          </p>
        </div>
      </div>

      {/* Sekcja "Before / After" */}
      <div className="flex flex-col gap-10">
        <h2 className="text-[2.5rem] font-semibold uppercase text-white"> {t("descriptionPage.fences.check")} </h2>
        <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-xl border border-[#2e2e2e] shadow-md">
            <img
              src="/assets/images/offer/before_fences.jpg"
              alt="Stara balustrada - Before"
              className="w-full h-auto object-cover max-h-[50vh]"
            />
            <div className="absolute top-4 left-4 bg-[#EB4036] text-white text-sm px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
              {t("descriptionPage.fences.before")}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-[#2e2e2e] shadow-md">
            <img
              src="/assets/images/offer/after_fences.jpg"
              alt="Nowa balustrada - After"
              className="w-full h-auto object-cover max-h-[50vh]"
            />
            <div className="absolute top-4 left-4 bg-white text-red-600 border-2 border-red-600
 text-sm px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
              {t("descriptionPage.fences.after")}
            </div>
          </div>
        </div>
        <p className="text-[#A5A5A5] text-[1.1rem] leading-[2rem] tracking-wide max-w-[85ch] font-raleway mt-4">
          {t("descriptionPage.fences.efectDescription")} </p>
      </div>


      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">{t("descriptionPage.fences.realization")}</h2>
          <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
          <section className="grid grid-cols-3 gap-5 my-10 max-lg:flex max-lg:flex-col max-lg:items-center">
            {images.map((image: any, index: any) => (
              <BoxImg
                key={index}
                url={image?.url}
                alt={image?.alt}
                images={images}
                index={index}
              />
            ))}
          </section>

        </>
      )}



      <div className="bg-gradient-to-r from-[#EB4036] to-[#9e1c12] rounded-xl p-10 text-white flex flex-col items-start gap-4 shadow-xl mt-20">
        <h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">{t("descriptionPage.fences.contactTitle")}</h2>
        <p className="text-lg font-raleway leading-[2rem]">
          {t("descriptionPage.fences.contactDescription")}
        </p>
        <a
          href="/contact"
          className="mt-4 inline-block px-6 py-3 bg-white text-[#EB4036] font-semibold rounded-xl uppercase tracking-wider hover:bg-[#f8f8f8] transition-all duration-200"
        >
          {t("descriptionPage.fences.contactButtonLabel")}
        </a>
      </div>


    </section>






  );
}
