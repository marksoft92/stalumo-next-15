// OurServices.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import IconBox from "@/components/IconBox";

const OurServices: React.FC = () => {
  return (
    <section className="flex  f-row p-7rem py-0 gap-x-[70px] gap-y-0 m-[10rem] mx-auto flex-col">
      <div className="w-full flex justify-center flex-col justify-center gap-5 items-center">
        <h4 className="text-[#EB4036] text-[1rem]  font-semibold uppercase">
          Wizja i Misja
        </h4>
        <h2 className="text-[3.5rem] font-semibold uppercase">
          KUJEMY POŁĄCZENIA. ROZPALAMY POSTĘP.
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-[2rem]">
        <IconBox
          iconUrl={"/assets/images/icons/Icon-5.png"}
          title={"Spawanie balustrad i ogrodzeń"}
          description={
            "Nasze doświadczenie w spawaniu pozwala nam tworzyć balustrady i ogrodzenia o doskonałej wytrzymałości i estetyce. Niezależnie od projektu, jesteśmy gotowi dostarczyć solidne i eleganckie rozwiązania, które dodadzą wartości Twojej przestrzeni."
          }
        />
        <IconBox
          iconUrl={"/assets/images/icons/smart-gate.png"}
          title={"Konstrukcje metalowe na wymiar"}
          description={
            "Potrzebujesz niestandardowej konstrukcji metalowej? Nasz zespół specjalistów może zaprojektować i wykonać dokładnie to, czego potrzebujesz. Bez względu na to, czy jest to wiatrak, konstrukcja pod reklamę czy element architektoniczny, zapewniamy wysoką jakość i precyzję wykonania."
          }
        />
        <IconBox
          iconUrl={"/assets/images/icons/Icon-7.png"}
          title={"Spawanie schodów i balkonów"}
          description={
            "Dzięki naszemu doświadczeniu i umiejętnościom w spawaniu, możemy stworzyć schody i balkony, które nie tylko będą estetycznym elementem Twojej przestrzeni, ale także zapewnią bezpieczeństwo i trwałość przez wiele lat."
          }
        />
        <IconBox
          iconUrl={"/assets/images/icons/window.png"}
          title={"Ogrody zimowe i przestrzenie rekreacyjne"}
          description={
            "Marzysz o wyjątkowym ogrodzie zimowym lub przestrzeni rekreacyjnej? Nasza firma może zrealizować Twoje marzenia, tworząc spawane konstrukcje, które staną się centrum relaksu i rozrywki dla Ciebie i Twoich bliskich."
          }
        />
        <IconBox
          iconUrl={"/assets/images/icons/repair.png"}
          title={"Montaż i instalacja"}
          description={
            "Nie musisz martwić się o montaż naszych konstrukcji - nasi wykwalifikowani technicy zajmą się tym za Ciebie. Dzięki naszemu profesjonalnemu podejściu i dbałości o szczegóły, możesz mieć pewność, że wszystko zostanie zainstalowane zgodnie z najwyższymi standardami."
          }
        />
        <IconBox
          iconUrl={"/assets/images/icons/decision-making.png"}
          title={"Doradztwo i projektowanie"}
          description={
            "Potrzebujesz pomocy w doborze najlepszego rozwiązania dla Twojego projektu? Nasz zespół doradców i projektantów służy fachowym wsparciem, pomagając Ci wybrać odpowiednie materiały, konstrukcje i rozwiązania techniczne, które spełnią Twoje oczekiwania i potrzeby."
          }
        />
      </div>
    </section>
  );
};

export default OurServices;
