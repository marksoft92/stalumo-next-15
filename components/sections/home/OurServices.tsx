// OurServices.tsx
import React from "react";
import IconBox from "@/components/IconBox";
import { getTranslations } from "next-intl/server";
const OurServices: React.FC = async () => {
  const t = await getTranslations("HomePage.OurServices");
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
      <div className="grid grid-cols-3 gap-5 mt-[2rem] max-lg:flex max-lg:flex-col">
        <IconBox
          iconUrl={"/assets/images/icons/Icon-5.png"}
          title={t("count1")}
          description={t("count1description")}
        />
        <IconBox
          iconUrl={"/assets/images/icons/smart-gate.png"}
          title={t("count2")}
          description={t("count2description")}
        />
        <IconBox
          iconUrl={"/assets/images/icons/Icon-7.png"}
          title={t("count3")}
          description={t("count3description")}
        />
        <IconBox
          iconUrl={"/assets/images/icons/window.png"}
          title={t("count4")}
          description={t("count4description")}
        />
        <IconBox
          iconUrl={"/assets/images/icons/repair.png"}
          title={t("count5")}
          description={t("count5description")}
        />
        <IconBox
          iconUrl={"/assets/images/icons/decision-making.png"}
          title={t("count6")}
          description={t("count6description")}
        />
      </div>
    </section>
  );
};

export default OurServices;
