"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import MessageIcon from "@mui/icons-material/Message";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ConstructionIcon from "@mui/icons-material/Construction";
import SecurityIcon from "@mui/icons-material/Security";

const steps = [
  {
    id: 1,
    title: "timeLineTitleContact",
    description: "timeLineDescriptionContact",
    icon: <MessageIcon className="!text-[2rem] text-white" />,
  },
  {
    id: 2,
    title: "timeLineTitleSize",
    description: "timeLineDescriptionSize",
    icon: <SquareFootIcon className="!text-[2rem] text-white" />,
  },
  {
    id: 3,
    title: "timeLineTitleProduction",
    description: "timeLineDescriptionProduction",
    icon: <PrecisionManufacturingIcon className="!text-[2rem] text-white" />,
  },
  {
    id: 4,
    title: "timeLineTitleMake",
    description: "timeLineDescriptionMake",
    icon: <ConstructionIcon className="!text-[2rem] text-white" />,
  },
  {
    id: 5,
    title: "timeLineTitleWarranty",
    description: "timeLineDescriptionWarranty",
    icon: <SecurityIcon className="!text-[2rem] text-white" />,
  },
];

export default function ProcessTimeline() {
  const t = useTranslations("About");

  return (
    <section className="max-w-[1280px] mx-auto px-4 py-24 z-0 relative">
      <h2 className="text-[2.5rem] font-oswald font-bold uppercase text-white mb-16 text-center">
       {t("timeLineHeader")}
      </h2>

      <div className="relative">
        {/* pionowa linia */}
        <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[4px] bg-gradient-to-b from-[#EB4036] to-[#9e1c12] rounded" />

        <div className="flex flex-col space-y-20">
          {steps.map(({ id, title, description, icon }, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={id}
                className="relative flex flex-col md:flex-row items-center md:items-stretch justify-center"
              >
                {/* LEFT SIDE TEXT (only if isLeft on desktop) */}
                <div className={`hidden md:flex md:w-1/2 px-6 ${isLeft ? "justify-end text-right" : "justify-end"}`}>
                  {isLeft && (
                    <div className="max-w-md">
                      <h3 className="text-white text-[2rem] font-oswald font-bold uppercase mb-2">
                        {t(title)}
                      </h3>
                      <p className="text-[#A5A5A5] text-[1.25rem] font-raleway leading-[2rem] tracking-wide">
                        {t(description)}
                      </p>
                    </div>
                  )}
                </div>

                {/* ICON (always center) */}
                <div className="z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#EB4036] to-[#9e1c12] shadow-lg mb-4 md:mb-0" >
                  {icon}
                </div>

                {/* RIGHT SIDE TEXT (only if !isLeft on desktop) */}
                <div className={`hidden md:flex md:w-1/2 px-6 ${!isLeft ? "justify-start text-left" : "justify-start"}`}>
                  {!isLeft && (
                    <div className="max-w-md">
                      <h3 className="text-white text-[2rem] font-oswald font-bold uppercase mb-2">
                        {t(title)}
                      </h3>
                      <p className="text-[#A5A5A5] text-[1.25rem] font-raleway leading-[2rem] tracking-wide">
                        {t(description)}
                      </p>
                    </div>
                  )}
                </div>

                {/* MOBILE: tekst pod ikoną */}
                <div className="md:hidden text-center mt-4 px-4">
                  <h3 className="text-white text-[2rem] font-oswald font-bold uppercase mb-2">
                    {t(title)}
                  </h3>
                  <p className="text-[#A5A5A5] text-[1.25rem] font-raleway leading-[2rem] tracking-wide">
                    {t(description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      
        
      </div>
      <div className="bg-gradient-to-r from-[#EB4036] to-[#9e1c12] rounded-xl p-10 text-white flex flex-col items-start gap-4 shadow-xl mt-20">
        <h2 className="text-[2.5rem] font-semibold uppercase max-lg:text-[1.8rem]">{t("ctaTitle")}</h2>
        <p className="text-lg font-raleway leading-[2rem]">
          {t("ctaDescription")}
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block px-6 py-3 bg-white text-[#EB4036] font-semibold rounded-xl uppercase tracking-wider hover:bg-[#f8f8f8] transition-all duration-200"
        >
          {t("buttonContact")}
        </Link>
      </div>
    </section>
  );
}
