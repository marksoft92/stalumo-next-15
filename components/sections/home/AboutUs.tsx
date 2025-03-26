// AboutUs.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

const AboutUs: React.FC = async () => {
  const t = await getTranslations("HomePage.AboutUs");

  return (
    <section className="flex  f-row p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] mx-auto max-lg:flex-col">
      <div className="relative">
        <div>
          {" "}
          <Image
            src="/assets/images/icons/Gp-2.png"
            width={133}
            height={133}
            className="p-[0.3em] absolute top-[-1rem] left-[-1rem] z-[-1]"
            alt="Logo Facebook"
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
        <div className="bg-transparent bg-gradient-to-l from-[#02010100] to-[#EB4036] absolute bottom-[0] lg:right-[-2rem] max-h-[215px] flex items-center flex-row p-[32px]">
          <Image
            src="/assets/images/icons/Icon-4.png"
            width={100}
            height={120}
            className="h-[120px]"
            alt="ikona projektów"
            loading="lazy"
          />
          <div className="">
            <h3 className="text-[4.5rem] font-semibold">115 +</h3>
            <p
              className="text-[1.5rem] font-semibold uppercase uppercase"
              dangerouslySetInnerHTML={{ __html: t("count") }}
            ></p>
          </div>
        </div>
      </div>
      <div className="max-w-full lg:max-w-[50%] flex justify-center flex-col gap-5 max-lg:text-center max-lg:items-center max-lg:py-10">
        <h4 className="text-[#EB4036] text-[1rem] font-semibold">
          {t("subTitle")}
        </h4>
        <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem]">
          {t("title")}
        </h2>
        <p
          className="text-[#A5A5A5] text-[1.2rem]"
          dangerouslySetInnerHTML={{ __html: t("description") }}
        ></p>
        <Button href="/about" title={t("button")} />
      </div>
    </section>
  );
};

export default AboutUs;
