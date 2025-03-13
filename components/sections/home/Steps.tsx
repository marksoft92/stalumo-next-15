// Excellence.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

const Excellence: React.FC = () => {
  return (
    <section className=" p-20 steps py-20 flex flex-row w-auto h-full flex-grow self-stretch gap-0 transition-bg duration-300 mt-[-77px] mb-0 ml-0 mr-0 relative gap-[30px] items-end">
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
            Jakość wykonania
          </h4>
        </div>
        <p>
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
        <p>
          Wykorzystujemy tylko najwyższej jakości materiały, które są zgodne z
          najnowszymi standardami i posiadają odpowiednie certyfikaty
          potwierdzające ich jakość i bezpieczeństwo.
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
            Konkurencyjne ceny
          </h4>
        </div>
        <p>
          Oferujemy konkurencyjne ceny, niezależnie od skali projektu, bez
          kompromisów w jakości wykonania. Naszym celem jest zapewnienie
          wartościowych usług przy zachowaniu atrakcyjnych cen dla naszych
          klientów.
        </p>
      </div>

      <div className="bg-red-500 opacity-100 py-8 px-8 w-[27%] flex flex-col gap-4 h-full relativ before:content-['']  before:w-[233] before:h-[300] before:top-0 before:left-0 before:w-full before:h-full before:bg-[url('/assets/images/spawacz10years.png')] before:bg-[position:88px_21px] before:bg-no-repeat before:bg-[size:87%_auto]">
        <div className="flex flex-row items-end">
          <h4 className="text-xl font-semibold uppercase leading-[1.3em] tracking-[1.6px]">
            10 + Lata doświadczenia
          </h4>
        </div>
        <p>
          Nasza firma może pochwalić się dziesięcioletnim doświadczeniem w
          branży, co świadczy o naszej solidności, zaufaniu klientów i
          umiejętnościach zdobytych na przestrzeni lat.
        </p>
      </div>
    </section>
  );
};

export default Excellence;
