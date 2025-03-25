// VisionMission.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

const VisionMission: React.FC = () => {
  return (
    <section className="flex  f-row p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] mx-auto max-lg:flex-col">
      <div className="max-w-full lg:max-w-[50%] flex justify-center flex-col gap-5 max-lg:text-center">
        <h4 className="text-[#EB4036] text-[1rem] font-semibold uppercase">
          Wizja i Misja
        </h4>
        <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem]">
          KUJEMY POŁĄCZENIA. ROZPALAMY POSTĘP.
        </h2>
        <p className="text-[#A5A5A5] text-[1.2rem]">
          Jesteśmy oddani jakości i precyzji w naszej pracy, nie tylko tworzymy
          ogrodzenia, bramy i balustrady, ale także budujemy trwałe relacje z
          naszymi klientami. Nasza misja polega na zapewnieniu nie tylko
          bezpieczeństwa i estetyki, lecz także pełnej satysfakcji i zaufania.
        </p>
        <div className="bg-[#222222] p-4">
          <h3 className="flex text-[1.6rem] font-semibold gap-2">
            <Image
              src="/assets/images/icons/check-mark-2-32.ico"
              width={32}
              height={32}
              alt="ikona ckeck"
              loading="lazy"
            />
            Nasza misja
          </h3>
          <p className="text-[#A5A5A5]">
            Śmiało stawiamy na jakość i precyzję, tworząc nie tylko ogrodzenia,
            bramy i balustrady, lecz także trwające więzi z naszymi klientami.
            Nasza misja polega na zapewnieniu nie tylko bezpieczeństwa i
            estetyki, ale również satysfakcji i zaufania.
          </p>
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
            Nasza wizja
          </h3>
          <p className="text-[#A5A5A5]">
            Wyobrażamy sobie świat, w którym nasze wyroby stanowią nie tylko
            element architektoniczny, ale także symbol solidności i stylu. Nasza
            wizja obejmuje inspirujące przestrzenie, które łączą ludzi i
            inspirują do ciągłego postępu i rozwoju.
          </p>
        </div>
      </div>
      <div className="relative bg-[url('/assets/images/person_center.png')] bg-cover bg-no-repeat w-full max-lg:flex max-lg:flex-col">
        <div className="flex justify-end lg:translate-x-[30%]">
          <h4 className="text-[2rem] w-[55%] p-5 bg-[#EB4036] font-semibold uppercase max-lg:w-full">
            "STALUMO - <br />{" "}
            <span className="text-[#000]">
              Twój solidny fundament,
              <br />
            </span>{" "}
            twoje estetyczne wyobrażenia."
          </h4>
        </div>
        <div className="flex items-end bg-transparent bg-gradient-to-r from-[#02010100] via-[#EB4036] to-[#EB4036] rotate-90 h-[72%] relative z-[-9]">
          <div className="w-full"></div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
