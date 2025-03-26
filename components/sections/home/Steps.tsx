// Steps.tsx
import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
const Steps: React.FC = async () => {
  const t = await getTranslations("HomePage.Steps");
  return (
    <section className=" p-1 lg:p-20 steps py-20 flex flex-row w-auto h-full flex-grow self-stretch gap-0 transition-bg duration-300 mt-[-77px] mb-0 ml-0 mr-0 relative gap-[30px] items-end max-lg:flex-col max-lg:flex-col-reverse">
      <div className="flex-1 flex flex-col gap-4 h-full">
        <div className="flex flex-row items-end">
          <Image
            src="/assets/images/icons/Icon-1-1.png"
            width={61}
            height={161}
            alt="Logo Stalumo"
            loading="lazy"
            className="mr-5"
          />
          <h4 className="text-xl font-semibold uppercase leading-[1.3em] tracking-[1.6px]">
            {t("quality")}
          </h4>
        </div>
        <p className="text-[#A5A5A5]">{t("qualityDescription")}</p>
      </div>

      <div className="flex-1 flex flex-col gap-4 h-full">
        <div className="flex flex-row items-end">
          <Image
            src="/assets/images/icons/Icon-2-1.png"
            width={61}
            height={161}
            alt="Logo Stalumo"
            loading="lazy"
            className="mr-5"
          />
          <h4 className="text-xl font-semibold uppercase leading-[1.3em] tracking-[1.6px]">
            {t("apply")}
          </h4>
        </div>
        <p className="text-[#A5A5A5]">{t("applyDescription")}</p>
      </div>

      <div className="flex-1 flex flex-col gap-4 h-full">
        <div className="flex flex-row items-end">
          <Image
            src="/assets/images/icons/Icon-3-1.png"
            width={61}
            height={161}
            alt="Logo Stalumo"
            loading="lazy"
            className="mr-5"
          />
          <h4 className="text-xl font-semibold uppercase leading-[1.3em] tracking-[1.6px]">
            {t("price")}
          </h4>
        </div>
        <p className="text-[#A5A5A5]">{t("priceDescription")}</p>
      </div>

      <div className="bg-red-500 h-[466px] opacity-100 justify-between py-8 px-8 lg:w-[31%] flex flex-col gap-4 h-full relativ bg-[url('/assets/images/spawacz10years.png')] bg-contain bg-no-repeat bg-[6rem]">
        <div className="flex flex-row items-end">
          <h4
            className="text-xl font-semibold uppercase leading-[1.3em] tracking-[1.6px]"
            dangerouslySetInnerHTML={{
              __html: `<strong style="font-size: 4.5rem;">10 +</strong> ${t(
                "expierience"
              )}`,
            }}
          ></h4>
        </div>
        <p className="text-[1.3rem]">{t("expierienceDescription")}</p>
        <Link className="text-[1rem] font-medium uppercase" href="/contact">
          {" "}
          {t("button")}
        </Link>
      </div>
    </section>
  );
};

export default Steps;
