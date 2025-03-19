// OurProcess.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

const OurProcess: React.FC = () => {
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
            src="/assets/images/spawanie4.jpg"
            width={100}
            height={100}
            className="p-[0.3em]"
            alt="spawacz"
            loading="lazy"
            layout="responsive"
          />
        </div>
        {/* <div className="bg-transparent bg-gradient-to-l from-[#02010100] to-[#EB4036] absolute bottom-[0] right-[-2rem] max-h-[215px] flex items-center flex-row p-[32px]">
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
        </div> */}

        <div className="bg-transparent bg-gradient-to-l from-[#02010100] to-[#EB4036] absolute bottom-[-5rem] right-[-5rem] max-h-[300px] flex items-center flex-row p-[32px]">
          <div>
            <Image
              src="/assets/images/icons/Number-1.png"
              width={41}
              height={41}
              alt="ikona projektów"
              loading="lazy"
            />
            <div className="flex  flex-col gap-5">
              <p className="text-[1.5rem] font-semibold uppercase uppercase">
                Konsultacja i projektowanie
              </p>
              <p>
                Rozpoczynamy od szczegółowej konsultacji, aby ustalić Twoje
                potrzeby i preferencje. Następnie tworzymy spersonalizowany
                projekt.
              </p>
            </div>
          </div>

          <div className="gap-5">
            <Image
              src="/assets/images/icons/Number-2.png"
              width={41}
              height={41}
              alt="ikona projektów"
              loading="lazy"
            />
            <div className="flex  flex-col gap-5">
              <p className="text-[1.5rem] font-semibold uppercase uppercase">
                Produkcja i spawanie
              </p>
              <p>
                Po zatwierdzeniu projektu, przechodzimy do produkcji i spawania.
                Nasze doświadczone zespoły zapewniają wysoką jakość i precyzję
                wykonania.
              </p>
            </div>
          </div>

          <div>
            <Image
              src="/assets/images/icons/Number-3.png"
              width={41}
              height={41}
              alt="ikona projektów"
              loading="lazy"
            />
            <div className="flex  flex-col gap-5">
              <p className="text-[1.5rem] font-semibold uppercase uppercase">
                Montaż i dostawa
              </p>
              <p>
                Po produkcji, dostarczamy zamówione elementy na miejsce i
                dokładnie je montujemy, dbając o każdy detal.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full lg:max-w-[50%] flex justify-center flex-col gap-5">
        <h4 className="text-[#EB4036] text-[1rem] font-semibold">
          NASZ PROCES
        </h4>
        <h2 className="text-[3.5rem] font-semibold uppercase">
          NAJLEPSZE DOŚWIADCZENIE W REALIZACJI
        </h2>
        <p className="text-[#A5A5A5] text-[1.2rem]">
          Nasz proces realizacji zamówień to gwarancja najwyższej jakości i
          profesjonalizmu na każdym etapie. Dzięki starannej konsultacji,
          precyzyjnej produkcji i dokładnemu montażowi zapewniamy naszym
          klientom niezrównane doświadczenie, które spełnia nawet najwyższe
          oczekiwania. <br />
          <br />
          Nasza pasja do doskonałości jest kluczem do sukcesu każdego projektu.
        </p>
        <Button href="/contact" title={"Skontaktuj się z nami"} />
      </div>
    </section>
  );
};

export default OurProcess;
