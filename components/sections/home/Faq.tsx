"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    answer: "answer1",
    question: "question1",
  },
  {
    answer: "answer2",
    question: "question2",
  },
  {
    answer: "answer3",
    question: "question3",
  },
  {
    answer: "answer4",
    question: "question4",
  },
  {
    answer: "answer5",
    question: "question5",
  },
  {
    answer: "answer6",
    question: "question6",
  },
  {
    answer: "answer7",
    question: "question7",
  },
  {
    answer: "answer8",
    question: "question8",
  },
  {
    answer: "answer9",
    question: "question9",
  },
  {
    answer: "answer10",
    question: "question10",
  },
  {
    answer: "answer11",
    question: "question11",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the answer visibility
  };

  const t = useTranslations("HomePage.Faq");

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/assets/images/spawacz4.jpg"
        width={100}
        height={50}
        alt="spawacz"
        className="w-full bg-cover transform lg:translate-y-40"
        loading="lazy"
        layout="responsive"
      />
      <div className=" flex flex-col items-center  bg-gradient-to-b from-[#222222] via-[#222222b3] to-[#02010100] z-[1] relative w-[80%] pt-8 max-lg:w-full max-lg: text-center">
        <h4 className="text-[#EB4036] text-[1rem] font-semibold">FAQS</h4>
        <h2 className="text-[3.5rem] font-semibold uppercase max-lg:text-[2.5rem]">
          {t("title")}
        </h2>
        <div className="space-y-4 w-full flex flex-col items-center my-[2rem]">
          {faqData.map((item, index) => (
            <div key={index} className="w-[85%]">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left text-lg font-semibold  border-solid border-t-0 border-b-0 border-l-[5px] border-[#EB4036] rounded-none text-white  p-[0.4rem]"
              >
                {t(item.question)}
              </button>
              {openIndex === index && (
                <p className="bg-transparent bg-gradient-to-r from-[#EB4036] to-[#02010100] p-[0.4rem]">
                  {t(item.answer)}
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
