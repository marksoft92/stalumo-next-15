// Steps.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

const Steps: React.FC = () => {
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
            Jakość wykonania
          </h4>
        </div>
        <p className="text-[#A5A5A5]">
          Doskonała precyzja i staranność są naszymi priorytetami. Każdy detal
          jest dopracowany z dbałością o najwyższą jakość, aby zapewnić
          satysfakcję naszych klientów.
        </p>
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
            Certyfikaty i zgodność
          </h4>
        </div>
        <p className="text-[#A5A5A5]">
          Wykorzystujemy tylko najwyższej jakości materiały, które są zgodne z
          najnowszymi standardami i posiadają odpowiednie certyfikaty
          potwierdzające ich jakość i bezpieczeństwo.
        </p>
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
            Konkurencyjne ceny
          </h4>
        </div>
        <p className="text-[#A5A5A5]">
          Oferujemy konkurencyjne ceny, niezależnie od skali projektu, bez
          kompromisów w jakości wykonania. Naszym celem jest zapewnienie
          wartościowych usług przy zachowaniu atrakcyjnych cen dla naszych
          klientów.
        </p>
      </div>

      <div className="bg-red-500 h-[466px] opacity-100 justify-between py-8 px-8 lg:w-[31%] flex flex-col gap-4 h-full relativ bg-[url('/assets/images/spawacz10years.png')] bg-contain bg-no-repeat bg-[6rem]">
        <div className="flex flex-row items-end">
          <h4 className="text-xl font-semibold uppercase leading-[1.3em] tracking-[1.6px]">
            <strong
              className="text-[4.5rem]
"
            >
              10 +
            </strong>{" "}
            <br />
            Lata <br /> doświadczenia
          </h4>
        </div>
        <p className="text-[1.3rem]">
          Nasza firma może pochwalić się dziesięcioletnim doświadczeniem w
          branży, co świadczy o naszej solidności, zaufaniu klientów i
          umiejętnościach zdobytych na przestrzeni lat.
        </p>
        <a className="text-[1rem] font-medium uppercase" href="/contact">
          Skontaktuj się z nami
        </a>
      </div>
    </section>
  );
};

export default Steps;
