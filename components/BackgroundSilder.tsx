"use client";

import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import LazyBackground from "./lazyBackground";

const BackgroundSlider = ({
  images,
  interval = 6000,
  maxZoom = 1.05,
  maxHeight,
}: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [opacity, setOpacity] = useState(0.1);

  const fadeRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    let zoomValue = 1;
    const zoomStep = (maxZoom - 1) / (interval / 50);

    setZoom(1);
    setOpacity(1);

    function animateZoom() {
      zoomValue += zoomStep;
      if (zoomValue >= maxZoom) {
        zoomValue = maxZoom;
        setZoom(zoomValue);
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        return;
      }
      setZoom(zoomValue);
      animationFrameId.current = requestAnimationFrame(animateZoom);
    }

    animationFrameId.current = requestAnimationFrame(animateZoom);

    fadeRef.current = setTimeout(() => {
      setOpacity(0);

      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 500);
    }, interval - 500);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (fadeRef.current) clearTimeout(fadeRef.current);
    };
  }, [currentImageIndex, interval, maxZoom, images.length]);

  return (
    <>
      <Head>
        {images[0] && (
          <link
            rel="preload"
            as="image"
            href={images[0]}
          />
        )}
      </Head>

      <div
        style={{ maxHeight }}
        className="w-full h-screen absolute left-0 bg-[#121212]/90 z-[-2]"
      ></div>

      <LazyBackground
        imageUrl={images[currentImageIndex]}
        className="w-full h-screen bg-cover bg-center absolute z-[-1] transition-transform duration-[1000ms] ease-linear left-0"
        forceVisible={currentImageIndex === 0}
        styleCustom={{
          maxHeight,
          transform: `scale(${zoom})`,
          opacity: 0.1,
          transition: "transform 1s ease-out, opacity 0.5s ease-in-out",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
};

export default BackgroundSlider;
