"use client";

import React, { useEffect, useRef, useState } from "react";

interface LazyBackgroundProps {
  imageUrl: string;
  className?: string;
  children?: React.ReactNode;
  styleCustom?: React.CSSProperties;
  forceVisible?: boolean;
}

const LazyBackground: React.FC<LazyBackgroundProps> = ({
  imageUrl,
  className = "",
  children,
  styleCustom = {},
  forceVisible = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(forceVisible);

  useEffect(() => {
    if (forceVisible) return; 
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // wczesne ładowanie
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [forceVisible]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        backgroundImage: isVisible ? `url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        willChange: "transform, opacity",
        ...styleCustom,
      }}
    >
      {children}
    </div>
  );
};

export default LazyBackground;
