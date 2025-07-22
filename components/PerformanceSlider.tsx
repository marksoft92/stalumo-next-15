"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const BackgroundSlider = dynamic(() => import("./BackgroundSilder"), {
  ssr: false,
  loading: () => null,
});

export default function DelayedSlider({ images, maxHeight, ...props }: any) {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSlider(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  console.log(props)

  if (!showSlider) {
    return (

        <Image
          src={images[images?.length-1]}
          alt="Proces spawania / Schweißprozess / Welding process w nowoczesnej fabryce"
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
