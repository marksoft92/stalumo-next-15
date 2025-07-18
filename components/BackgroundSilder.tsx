"use client";

import React, { useState, useEffect } from "react";
import LazyBackground from "./lazyBackground";

interface BackgroundSliderProps {
  images: string[];
  interval?: number;
  maxZoom?: number;
  maxHeight?: string;
}

const BackgroundSlider: React.FC<BackgroundSliderProps> = ({
  images,
  interval = 6000,
  maxZoom = 1.05,
  maxHeight,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [opacity, setOpacity] = useState(1); // Opacity dla fade effect




  useEffect(() => {
    let zoomValue = 1;
    setZoom(1); // Reset zoomu na start
    setOpacity(1); // Reset opacity

    const zoomInterval = setInterval(() => {
      zoomValue += (maxZoom - 1) / (interval / 50); // Stopniowy wzrost zoomu
      if (zoomValue >= maxZoom) {
        clearInterval(zoomInterval);
        zoomValue = maxZoom;
      }
      setZoom(zoomValue);
    }, 50);

    const imageInterval = setTimeout(() => {
      setOpacity(0); // Fade out current image

      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setOpacity(1); // Fade in next image
      }, 500); // Czas na fade-out (500ms)
    }, interval - 500); // Długość wyświetlania obrazu (z uwzględnieniem fade-out)

    return () => {
      clearInterval(zoomInterval);
      clearTimeout(imageInterval);
    };
  }, [currentImageIndex, interval, maxZoom, images.length]);


  
  return (
    <>
      <div
        style={{ maxHeight: maxHeight }}
        className={` w-full h-screen absolute left-0 bg-[#121212]/90 `}
      ></div>

<LazyBackground
        imageUrl={images[currentImageIndex]}
        className="w-full h-screen bg-cover bg-center absolute z-[-1] transition-transform duration-5000 ease-linear left-0"
        styleCustom={{
          maxHeight: maxHeight,
          transform: `scaleX(${zoom})`,
          opacity: opacity,
          transition: "opacity 0.5s ease-out", // Płynne wyblaknięcie
        }}
      ></LazyBackground>

      {/* <div
        className={`w-full h-screen bg-cover bg-center absolute z-[-1] transition-transform duration-5000 ease-linear left-0`}
        style={}
      ></div> */}
    </>
  );
};

export default BackgroundSlider;