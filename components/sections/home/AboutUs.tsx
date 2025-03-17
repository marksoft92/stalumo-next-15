// AboutUs.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

const AboutUs: React.FC = () => {
  return (
    <section className="flex  f-row p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] mx-auto">
      <div className="relative">
        <div>
          {" "}
          <Image
            src="/assets/images/icons/Gp-2.png"
            width={133}
            height={133}
            className="p-[0.3em] absolute top-[-1rem] left-[-1rem] z-[-1]"
            alt="Logo Facebook"
            loading="lazy"
          />
        </div>
        <div>
          <Image
            src="/assets/images/spawacz2.jpg"
            width={100}
            height={100}
            className="p-[0.3em]"
            alt="spawacz"
            loading="lazy"
            layout="responsive"
          />
        </div>
        <div className="bg-transparent bg-gradient-to-l from-[#02010100] to-[#EB4036] absolute bottom-[0] right-[-2rem] max-h-[215px] flex items-center flex-row p-[32px]">
          <Image
            src="/assets/images/icons/Icon-4.png"
            width={100}
            height={120}
            className="h-[120px]"
            alt="ikona projektów"
            loading="lazy"
          />
          <div className="">
            <h3 className="text-[4.5rem] font-semibold">115 +</h3>
            <p className="text-[1.5rem] font-semibold uppercase uppercase">
              Wykonanych
              <br /> Projektów
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-full lg:max-w-[50%] flex justify-center flex-col gap-5">
        <h4 className="text-[#EB4036] text-[1rem] font-semibold">O NAS</h4>
        <h2 className="text-[3.5rem] font-semibold uppercase">
          Kunszt spawalniczy kujący doskonałość
        </h2>
        <p className="text-[#A5A5A5] text-[1.2rem]">
          Jesteśmy zespołem specjalistów, których cechuje nie tylko umiejętność
          perfekcyjnego spawania, ale także głęboka pasja do tworzenia. Nasze
          doświadczenie oparte na dziesięcioletniej praktyce pozwala nam śmiało
          kroczyć ścieżką doskonałości. <br />
          <br />
          Każdy projekt traktujemy jako wyzwanie, które podejmujemy z
          determinacją, aby zapewnić naszym klientom nie tylko produkt o
          najwyższej jakości, ale także satysfakcję i pewność, że ich
          oczekiwania zostały spełnione ponad oczekiwania.
        </p>
        <Button href="/AboutUs" title={"Więcej o nas"} />
      </div>
    </section>
  );
};

export default AboutUs;
