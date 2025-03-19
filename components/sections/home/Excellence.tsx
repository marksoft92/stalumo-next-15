// Excellence.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import BackgroundSlider from "@/components/BackgroundSilder";

const Excellence: React.FC = () => {
  const images: string[] = [
    "/assets/images/spawanie1.jpg",
    "/assets/images/spawanie2.jpg",
    "/assets/images/spawanie3.jpg",
    "/assets/images/spawanie4.jpg",
    "/assets/images/spawanie5.jpg",
  ];
  return (
    <>
      <BackgroundSlider images={images} />
      <section className="min-h-[80vh] excellence py-20 flex flex-row relative mx-auto max-w-[1280px] p-4">
        <div className="w-[97%] ">
          <div className="text-left w-[52%] max-w-[52%] flex-grow-0 flex flex-col">
            <h4 className="text-[#EB4036] font-oswald text-base font-semibold uppercase leading-[0.9em] tracking-[3.8px] relative">
              Doskonałe wykonanie
              <div className="w-[15%] max-w-[15%] flex-grow-0 absolute top-[-30px] left-[450px] h-[50px] bg-transparent bg-gradient-to-r from-[#EB4036] to-[#02010100] opacity-[0.8]"></div>
            </h4>
            <h1 className="mt-10 mb-10  --font-oswald text-[#FFFFFF] font-oswald text-[6.7rem] font-semibold uppercase leading-[1em] tracking-[3.8px]">
              Wypalone iskry rodzą doskonałość
            </h1>
            <p className="pt-[10px] pl-0 pr-0 pb-0 text-[#A5A5A5] font-raleway text-[1.2rem] font-normal leading-[1.6em] tracking-[1.6px] word-spacing-[normal] flex-grow-0">
              Nasza praca to nie tylko doskonałe wykonanie, to również pasja i
              zaangażowanie, które zawsze doprowadzają do doskonałości.
            </p>
            <Button href="/contact" title={"Rozpalcie swoje projekty"} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[20px]">
          <div className="h-[200px] m-0 p-0 border-solid border-[0px] border-r-[1px] border-t-0 border-b-0 border-l-0 border-[#A5A5A5]"></div>
          <a
            href="#"
            className="box-content hover:bg-[#EB4036] transition-all duration-300 ease-in-out
bg-[#02010100]  border-solid border-[1px] border-[#EB4036] text-[25px] leading-[25px] rounded-full"
          >
            <Image
              src="/assets/images/facebook.svg"
              width={33}
              height={33}
              className="p-[0.3em]"
              alt="Logo Facebook"
              loading="lazy"
            />
          </a>
          <a
            href="#"
            className="box-content hover:bg-[#EB4036] transition-all duration-300 ease-in-out
bg-[#02010100]  border-solid border-[1px] border-[#EB4036] text-[25px] leading-[25px] rounded-full"
          >
            <Image
              src="/assets/images/tiktok.svg"
              width={33}
              height={33}
              className="p-[0.3em]"
              alt="Logo Facebook"
              loading="lazy"
            />
          </a>
          <a
            href="#"
            className="box-content hover:bg-[#EB4036] transition-all duration-300 ease-in-out
bg-[#02010100]  border-solid border-[1px] border-[#EB4036] text-[25px] leading-[25px] rounded-full"
          >
            <Image
              src="/assets/images/instagram.svg"
              width={33}
              height={33}
              className="p-[0.3em]"
              alt="Logo Facebook"
              loading="lazy"
            />
          </a>
          <div className="h-[200px] m-0 p-0 border-solid border-[0px] border-r-[1px] border-t-0 border-b-0 border-l-0 border-[#A5A5A5]"></div>
        </div>
      </section>
    </>
  );
};

export default Excellence;
