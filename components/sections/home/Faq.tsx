"use client";
import { useState } from "react";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    answer:
      "Oczywiście! Nasz zespół projektowy specjalizuje się w tworzeniu niestandardowych rozwiązań, które idealnie odpowiadają Twoim wymaganiom i preferencjom. Bez względu na to, czy potrzebujesz balustrady o nietypowym kształcie, czy też nietypowego wzoru ogrodzenia, jesteśmy gotowi zrealizować Twoje pomysłu",
    question:
      "Czy możecie zaprojektować balustrady i ogrodzenia dostosowane do moich indywidualnych potrzeb?",
  },
  {
    answer:
      "Oczywiście! Nasz zespół specjalistów służy fachowym doradztwem na każdym etapie procesu. Od pierwszego kontaktu aż po zakończenie montażu, jesteśmy tu, aby odpowiedzieć na Twoje pytania, podzielić się wiedzą i zapewnić Ci kompleksową pomoc w wyborze najlepszego rozwiązania dla Twojego domu lub ogrodu.",
    question:
      "Czy mogę liczyć na poradę w wyborze odpowiedniego rozwiązania dla mojej przestrzeni?",
  },
  {
    answer:
      "Tak, kompleksowa obsługa jest naszym standardem. Nasz doświadczony zespół montażowy zadba o profesjonalne i precyzyjne zamontowanie wszystkich elementów konstrukcji. Dzięki temu możesz mieć pewność, że Twoje balustrady, ogrodzenia czy schody zostaną zainstalowane zgodnie z najwyższymi standardami.",
    question: "Czy oferujecie usługi montażu?",
  },
  {
    answer:
      "Wybierając nasze produkty, możesz być pewien, że otrzymujesz nie tylko estetyczne i solidne konstrukcje, ale także gwarancję wysokiej jakości. Nasze balustrady, ogrodzenia i inne elementy są starannie zaprojektowane i wykonane z myślą o trwałości i funkcjonalności, co sprawia, że są one nie tylko atrakcyjnym elementem Twojej przestrzeni, ale także długotrwałym inwestycją.",
    question:
      "Jakie są korzyści korzystania z balustrad i ogrodzeń wykonanych przez waszą firmę?",
  },
  {
    answer:
      "Tak, stawiamy na trwałość i łatwość utrzymania naszych produktów. W zależności od wybranego materiału i wykończenia, większość naszych konstrukcji wymaga minimalnej konserwacji, co pozwala Ci cieszyć się nimi przez wiele lat bez konieczności częstego pielęgnowania.",
    question: "Czy wasze konstrukcje są łatwe w utrzymaniu?",
  },
  {
    answer:
      "Tak, zapewniamy gwarancję na wszystkie nasze produkty oraz wykonane przez nas prace montażowe. Naszym celem jest pełne zadowolenie klienta, dlatego też staramy się zapewnić nie tylko wysoką jakość naszych konstrukcji, ale także kompleksową obsługę posprzedażną. Jeśli pojawią się jakiekolwiek problemy z naszymi produktami lub usługami, jesteśmy gotowi podjąć odpowiednie kroki naprawcze, aby zapewnić Twoją satysfakcję.",
    question: "Czy oferujecie gwarancję na wasze produkty i usługi?",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the answer visibility
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/assets/images/spawacz4.jpg"
        width={100}
        height={50}
        alt="spawacz"
        className="w-full bg-cover transform translate-y-40"
        loading="lazy"
        layout="responsive"
      />
      <div className=" flex flex-col items-center  bg-gradient-to-b from-[#222222] via-[#222222b3] to-[#02010100] z-[1] relative w-[80%] pt-8">
        <h4 className="text-[#EB4036] text-[1rem] font-semibold">FAQS</h4>
        <h2 className="text-[3.5rem] font-semibold uppercase">
          CO POWINIENEŚ WIEDZIEĆ
        </h2>
        <div className="space-y-4 w-full flex flex-col items-center my-[2rem]">
          {faqData.map((item, index) => (
            <div key={index} className="w-[85%]">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left text-lg font-semibold  border-solid border-t-0 border-b-0 border-l-[5px] border-[#EB4036] rounded-none text-white  p-[0.4rem]"
              >
                {item.question}
              </button>
              {openIndex === index && (
                <p className="bg-transparent bg-gradient-to-r from-[#EB4036] to-[#02010100] p-[0.4rem]">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
