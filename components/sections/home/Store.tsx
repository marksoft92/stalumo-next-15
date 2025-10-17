// Realization.tsx
import React from "react";
import { getTranslations } from "next-intl/server";
const Realization = async ({children}:Readonly<{
    children: React.ReactNode;
    
  }>) => {
  const t = await getTranslations("HomePage.Store");
  return (
    <section className="flex  f-row p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] max-lg:my-[5rem] mx-auto flex-col">
      <div className="w-full flex justify-center flex-col justify-center gap-5 items-center max-lg:text-center">
        <h4 className="text-[#EB4036] text-[1rem]  font-semibold uppercase">
          {t("subTitle")}
        </h4>
        <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem] text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#EB4036]">
          {t("title")}
        </h2>
      </div>
        {children}
    </section>
  );
};

export default Realization;
