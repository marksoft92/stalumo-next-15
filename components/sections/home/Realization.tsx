// Realization.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import IconBox from "@/components/IconBox";
import RealizationBox from "@/components/RealizationBox";

const Realization: React.FC = () => {
  return (
    <section className="flex  f-row p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] mx-auto flex-col">
      <div className="w-full flex justify-center flex-col justify-center gap-5 items-center max-lg:text-center">
        <h4 className="text-[#EB4036] text-[1rem]  font-semibold uppercase">
          Realizacje
        </h4>
        <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem]">
          Zrealizowane zamówienia naszych klientów
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-[2rem] max-lg:flex max-lg:flex-col">
        <RealizationBox
          iconUrl={"/assets/images/img_work15.jpg"}
          title={"Bezpieczne balustrady, elegancja w każdym szczególe."}
          subTitle={"Balustrady"}
          href="/gallery"
        />
        <RealizationBox
          iconUrl={"/assets/images/img_work9.jpg"}
          title={"Nowoczesne bramy, ochrona i styl."}
          subTitle={"Bramy"}
          href="/gallery"
        />
        <RealizationBox
          iconUrl={"/assets/images/img_work37.jpg"}
          title={"Rozszerzone przestrzenie - dostawiane balkony."}
          subTitle={"Balkony dostawiane"}
          href="/gallery"
        />
        <RealizationBox
          iconUrl={"/assets/images/img_work21.jpg"}
          title={"Solidne ogrodzenia, Twoja prywatność w pełni chroniona."}
          subTitle={"Ogrodzenia"}
          href="/gallery"
        />
      </div>
    </section>
  );
};

export default Realization;
