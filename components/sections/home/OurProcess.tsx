// OurProcess.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
const OurProcess: React.FC = async () => {
  const t = await getTranslations("HomePage.OurProcess");

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
            alt="Ikona"
            loading="lazy"
          />
        </div>
        <div>
          <Image
            src="/assets/images/spawanie4.jpg"
            width={100}
            height={100}
            className="p-[0.3em]"
            alt="welding"
            loading="lazy"
            layout="responsive"
          />
        </div>
        <div className="bg-transparent bg-gradient-to-l from-[#02010100] to-[#EB4036] lg:absolute lg:bottom-[-5rem] lg:right-[-5rem] lg:max-h-[300px] lg:flex items-center flex-row p-[32px] ">
          <div>
            <Image
              src="/assets/images/icons/Number-1.png"
              width={41}
              height={41}
              alt="ikona projektów"
              loading="lazy"
            />
            <div className="flex  flex-col gap-5">
              <p className="text-[1.5rem] font-semibold uppercase uppercase">
                {t("count1")}
              </p>
              <p>{t("count1description")}</p>
            </div>
          </div>

          <div className="gap-5">
            <Image
              src="/assets/images/icons/Number-2.png"
              width={41}
              height={41}
              alt="ikona projektów"
              loading="lazy"
            />
            <div className="flex  flex-col gap-5">
              <p className="text-[1.5rem] font-semibold uppercase uppercase">
                {t("count2")}
              </p>
              <p>{t("count2description")}</p>
            </div>
          </div>

          <div>
            <Image
              src="/assets/images/icons/Number-3.png"
              width={41}
              height={41}
              alt="ikona projektów"
              loading="lazy"
            />
            <div className="flex  flex-col gap-5">
              <p className="text-[1.5rem] font-semibold uppercase uppercase">
                {t("count3")}
              </p>
              <p>{t("count3description")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full lg:max-w-[50%] flex justify-center flex-col gap-5 max-lg:text-center max-lg:py-10 items-center">
        <h4 className="text-[#EB4036] text-[1rem] font-semibold max-lg:not">
          {t("subTitle")}
        </h4>
        <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem]">
          {t("title")}
        </h2>
        <p
          className="text-[#A5A5A5] text-[1.2rem]"
          dangerouslySetInnerHTML={{ __html: t("description") }}
        ></p>
        <Button href="/contact" title={t("button")} />
      </div>
    </section>
  );
};

export default OurProcess;
