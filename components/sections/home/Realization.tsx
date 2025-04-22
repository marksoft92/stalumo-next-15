// Realization.tsx
import React from "react";
import RealizationBox from "@/components/RealizationBox";
import { getTranslations } from "next-intl/server";
const Realization: React.FC = async () => {
  const t = await getTranslations("HomePage.Realization");
  return (
    <section className="flex  f-row p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] max-lg:my-[5rem] mx-auto flex-col">
      <div className="w-full flex justify-center flex-col justify-center gap-5 items-center max-lg:text-center">
        <h4 className="text-[#EB4036] text-[1rem]  font-semibold uppercase">
          {t("subTitle")}
        </h4>
        <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem]">
          {t("title")}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-[2rem] max-lg:flex max-lg:flex-col">
        <RealizationBox
          iconUrl={"/assets/images/img_work15.jpg"}
          title={t("count1description")}
          subTitle={t("count1")}
          href="/gallery"
        />
        <RealizationBox
          iconUrl={"/assets/images/img_work9.jpg"}
          title={t("count2description")}
          subTitle={t("count2")}
          href="/gallery"
        />
        <RealizationBox
          iconUrl={"/assets/images/img_work37.jpg"}
          title={t("count3description")}
          subTitle={t("count3")}
          href="/gallery"
        />
        <RealizationBox
          iconUrl={"/assets/images/img_work21.jpg"}
          title={t("count4description")}
          subTitle={t("count4")}
          href="/gallery"
        />
      </div>
    </section>
  );
};

export default Realization;
