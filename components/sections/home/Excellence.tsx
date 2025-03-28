// Excellence.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import BackgroundSlider from "@/components/BackgroundSilder";
import { getTranslations } from "next-intl/server";

const Excellence: React.FC = async () => {
  const images: string[] = [
    "/assets/images/spawanie1.jpg",
    "/assets/images/spawanie2.jpg",
    "/assets/images/spawanie3.jpg",
    "/assets/images/spawanie4.jpg",
    "/assets/images/spawanie5.jpg",
  ];
  const t = await getTranslations("HomePage.Excellence");

  return (
    <>
      <BackgroundSlider images={images} />
      <section className="min-h-[80vh] excellence py-20 flex flex-row relative mx-auto max-w-[1280px] p-4">
        <div className="w-[97%] max-lg:w-[90%]">
          <div className="text-left lg:w-[70%] lg:max-w-[70%] flex-grow-0 flex flex-col">
            <h4 className="text-[#EB4036] font-oswald text-base font-semibold uppercase leading-[0.9em] tracking-[3.8px] relative">
              {t("subTitle")}
              <div className="hidden w-[15%] max-w-[15%] flex-grow-0 absolute top-[-30px] left-[450px] h-[50px] bg-transparent bg-gradient-to-r from-[#EB4036] to-[#02010100] opacity-[0.8]"></div>
            </h4>
            <h1 className="mt-10 mb-10 leading-tight --font-oswald text-[#FFFFFF] font-oswald text-[6.5rem] font-semibold uppercase leading-[1em] tracking-[3.8px] max-lg:text-[2.5rem]">
              {t("title")}
            </h1>
            <p className="pt-[10px] pl-0 pr-0 pb-0 text-[#A5A5A5] font-raleway text-[1.2rem] font-normal leading-[1.6em] tracking-[1.6px] word-spacing-[normal] flex-grow-0">
              {t("description")}
            </p>
            <Button href="/contact" title={t("button")} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[20px]">
          <div className="h-[200px] m-0 p-0 border-solid border-[0px] border-r-[1px] border-t-0 border-b-0 border-l-0 border-[#A5A5A5]"></div>
          <a
            href="https://www.facebook.com/profile.php?id=61563758556441"
            target="_blank"
            className="box-content hover:bg-[#EB4036] transition-all duration-300 ease-in-out
bg-[#02010100]  border-solid border-[1px] border-[#EB4036] text-[25px] leading-[25px] rounded-full"
          >
            <Image
              src="/assets/images/facebook.svg"
              width={33}
              height={33}
              className="p-[0.3em]"
              alt="Logo Facebook"
              loading="lazy"
            />
          </a>
          <a
            href="https://www.tiktok.com/@stalumo.com?is_from_webapp=1&sender_device=pc"
            target="_blank"
            className="box-content hover:bg-[#EB4036] transition-all duration-300 ease-in-out
bg-[#02010100]  border-solid border-[1px] border-[#EB4036] text-[25px] leading-[25px] rounded-full"
          >
            <Image
              src="/assets/images/tiktok.svg"
              width={33}
              height={33}
              className="p-[0.3em]"
              alt="Logo Facebook"
              loading="lazy"
            />
          </a>
          <a
            href="https://www.instagram.com/stalumo/"
            target="_blank"
            className="box-content hover:bg-[#EB4036] transition-all duration-300 ease-in-out
bg-[#02010100]  border-solid border-[1px] border-[#EB4036] text-[25px] leading-[25px] rounded-full"
          >
            <Image
              src="/assets/images/instagram.svg"
              width={33}
              height={33}
              className="p-[0.3em]"
              alt="Logo Facebook"
              loading="lazy"
            />
          </a>
          <div className="h-[200px] m-0 p-0 border-solid border-[0px] border-r-[1px] border-t-0 border-b-0 border-l-0 border-[#A5A5A5]"></div>
        </div>
      </section>
    </>
  );
};

export default Excellence;
