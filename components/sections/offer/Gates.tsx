"use client";

import BeforeAfterImages from "@/components/BeforeAfterImages";
import BoxImg from "@/components/ImageGox";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";


  
export default function (props: any) {
  const {images,loading,error,beforeAfter} = props
  const t = useTranslations("Offer");
  return (
<section className="max-w-[1280px] mx-auto px-4 py-24 flex flex-col gap-16">
 
  <div className="flex flex-col gap-6">
    <h4 className="text-[#EB4036] text-sm font-semibold uppercase tracking-[4px]">

      {t("descriptionPage.category")}{t("descriptionPage.gates.titleCategory")}
    </h4>
    <h1 className="text-white text-[4rem] leading-[1.1] font-oswald font-bold uppercase max-lg:text-[2.5rem]">
    {t("descriptionPage.gates.header")}
    </h1>
    <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
  <p className="text-[#A5A5A5] text-[1.25rem] leading-[2.1rem] tracking-wide max-w-[80ch] font-raleway">
  {t("descriptionPage.gates.description1")}
  </p>
  <p className="text-[#A5A5A5] text-[1.25rem] leading-[2.1rem] tracking-wide max-w-[80ch] font-raleway">
  {t("descriptionPage.gates.description2")}
  </p>
  <p className="text-[#A5A5A5] text-[1.25rem] leading-[2.1rem] tracking-wide max-w-[80ch] font-raleway">
  {t("descriptionPage.gates.description3")}
  </p>
  </div>

  {/* Sekcja korzyści */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
    <div className="flex flex-col gap-5">
      <h2 className="text-[2rem] text-white font-semibold uppercase">  {t("descriptionPage.gates.questionTitle")}</h2>
      <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
      <ul className="list-disc list-inside text-[#A5A5A5] text-[1.1rem] font-raleway leading-[2rem] tracking-wide">
        <li>{t("descriptionPage.gates.example1")}</li>
        <li>{t("descriptionPage.gates.example2")}</li>
        <li>{t("descriptionPage.gates.example3")}</li>
        <li>{t("descriptionPage.gates.example4")}</li>
        <li>{t("descriptionPage.gates.example5")}</li>
      </ul>
    </div>
    <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#2e2e2e]">
      <h3 className="text-[#EB4036] text-xl font-semibold mb-4 uppercase">{t("descriptionPage.gates.materialTitle")}</h3>
      <p className="text-[#A5A5A5] font-raleway text-[1.1rem] leading-[2rem]">
      {t("descriptionPage.gates.mateiralDescription")}
      </p>
    </div>
  </div>

  {/* Sekcja "Before / After" */}
  {beforeAfter && <div className="flex flex-col gap-10">
    <h2 className="text-[2.5rem] font-semibold uppercase text-white"> {t("descriptionPage.gates.check")} </h2>
    <div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
    <BeforeAfterImages
      beforeUrl="/assets/images/offer/before_fences.jpg"
      afterUrl="/assets/images/offer/after_fences.jpg"
      beforeLabel={t("descriptionPage.gates.before")}
      afterLabel={t("descriptionPage.gates.after")}
    />
    <p className="text-[#A5A5A5] text-[1.1rem] leading-[2rem] tracking-wide max-w-[85ch] font-raleway mt-4">
    {t("descriptionPage.gates.efectDescription")} </p>
  </div>}



  {error && <p className="text-center text-red-500">{error}</p>}

{!loading && !error && (
<>
<h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">{t("descriptionPage.gates.realization")}</h2>
<div className="w-[12%] h-[5px] bg-gradient-to-r from-[#EB4036] to-transparent opacity-80 mb-2" />
  <section className="grid grid-cols-3 gap-5 my-10 max-lg:flex max-lg:flex-col max-lg:items-center">
    {images.map((image:any, index:any) => (
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

  {/* Call To Action */}
  <div className="bg-gradient-to-r from-[#EB4036] to-[#9e1c12] rounded-xl p-10 text-white flex flex-col items-start gap-4 shadow-xl mt-20">
    <h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">{t("descriptionPage.gates.contactTitle")}</h2>
    <p className="text-lg font-raleway leading-[2rem]">
    {t("descriptionPage.gates.contactDescription")}
    </p>
    <Link
          href="/contact"
          className="mt-4 inline-block px-6 py-3 bg-white text-[#EB4036] font-semibold rounded-xl uppercase tracking-wider hover:bg-[#f8f8f8] transition-all duration-200"
        >
          {t("descriptionPage.fences.contactButtonLabel")}
        </Link>
  </div>
</section>


  );
}
