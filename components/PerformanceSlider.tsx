"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";

const BackgroundSlider = dynamic(() => import("./BackgroundSilder"), {
  ssr: false,
  loading: () => null,
});

const altText = {
  pl: 'Proces spawania w nowoczesnej fabryce',
  de: 'Schweißprozess in einer modernen Fabrik',
  en: 'Welding process in a modern factory',
};

export default function DelayedSlider({ images, maxHeight, ...props }: any) {
  const [showSlider, setShowSlider] = useState(false);
  const params = useParams();
console.log(params.locale)
  useEffect(() => {
    const timer = setTimeout(() => setShowSlider(true), 3033300);
    return () => clearTimeout(timer);
  }, []);

  console.log(props)

  if (!showSlider) {
    return (

        <Image
          src={images[images?.length-1]}
          alt={altText[params.locale as keyof typeof altText]}
          fill
          style={{ objectFit: "cover" ,maxHeight: maxHeight, opacity: '0.1'}}
          priority
          className="w-full h-screen bg-cover bg-center absolute z-[-1] transition-transform duration-[1000ms] ease-linear left-0 !top-[10rem]"
          sizes="100vw"
        />
      
    );
  }

  return <BackgroundSlider images={images} maxHeight={maxHeight} {...props} />;
}
