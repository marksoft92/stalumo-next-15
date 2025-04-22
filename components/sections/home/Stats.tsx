// Stats.tsx
import React from "react";
import { getTranslations } from "next-intl/server";
const Stats: React.FC = async () => {
  const t = await getTranslations("HomePage.Stats");
  return (
    <section className="flex items-center  justify-center p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] max-lg:my-[5rem] max-lg:m-[1rem] max-lg:flex-col">
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
          {t("hours")}
        </h4>
        <h2 className="text-[5.5rem] font-semibold uppercase max-lg:flex">
          1000 <span className="text-[#EB4036]">+</span>
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase ">
          {t("clients")}
        </h4>
        <h2 className="text-[5.5rem] font-semibold uppercase max-lg:flex">
          50 <span className="text-[#EB4036]">+</span>
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-[#A5A5A5] text-[1.2rem] font-semibold uppercase">
          {t("projects")}
        </h4>
        <h2 className="text-[5.5rem] font-semibold uppercase max-lg:flex">
          115 <span className="text-[#EB4036]">+</span>
        </h2>
      </div>
    </section>
  );
};

export default Stats;
