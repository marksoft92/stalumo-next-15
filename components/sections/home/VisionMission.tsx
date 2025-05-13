// VisionMission.tsx
import React from "react";
import Image from "next/image";

import { getTranslations } from "next-intl/server";
import LazyBackground from "@/components/lazyBackground";
const VisionMission: React.FC = async () => {
  const t = await getTranslations("HomePage.VisionMission");
  return (
    <section className="flex  f-row p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] max-lg:my-[5rem] mx-auto max-lg:flex-col">
      <div className="max-w-full lg:max-w-[50%] flex justify-center flex-col gap-5 max-lg:text-center">
        <h4 className="text-[#EB4036] text-[1rem] font-semibold uppercase">
          {t("subTitle")}
        </h4>
        <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem]">
          {t("title")}
        </h2>
        <p className="text-[#A5A5A5] text-[1.2rem]">{t("description")}</p>
        <div className="bg-[#222222] p-4">
          <h3 className="flex text-[1.6rem] font-semibold gap-2">
            <Image
              src="/assets/images/icons/check-mark-2-32.ico"
              width={32}
              height={32}
              alt="ikona ckeck"
              loading="lazy"
            />
            {t("missionTitle")}
          </h3>
          <p className="text-[#A5A5A5]">{t("missionDescription")}</p>
        </div>
        <div className="border border-solid border-[#222222] p-4">
          <h3 className="flex text-[1.6rem] font-semibold gap-2">
            <Image
              src="/assets/images/icons/check-mark-2-32.ico"
              width={32}
              height={32}
              alt="ikona ckeck"
              loading="lazy"
            />
            {t("visionTitle")}
          </h3>
          <p className="text-[#A5A5A5]">{t("visionDescription")}</p>
        </div>
      </div>

      <LazyBackground
        imageUrl="/assets/images/person_center.png"
        className="relative bg-cover bg-no-repeat w-full max-lg:flex max-lg:flex-col"
      >
        <div className="flex justify-end lg:translate-x-[30%]">
          <h4 className="text-[2rem] w-[55%] p-5 bg-[#EB4036] font-semibold uppercase max-lg:w-full">
            "STALUMO - <br />{" "}
            <span className="text-[#000]">
              {t("sentence")}
              <br />
            </span>{" "}
            {t("sentencePart")}"
          </h4>
        </div>
        {/*<div className="flex items-end bg-transparent bg-gradient-to-r from-[#02010100] via-[#EB4036] to-[#EB4036] rotate-90 h-[72%] relative z-[-9] absolute bottom-0 h-full w-full left-1/2 -translate-x-1/2 transform">*/}
        {/*  <div className="w-full"></div>*/}
        {/*</div>*/}
      </LazyBackground>
    </section>
  );
};

export default VisionMission;
