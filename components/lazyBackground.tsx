'use client';
import { useEffect, useRef, useState } from 'react';

type LazyBackgroundProps = {
  imageUrl: string;
  className?: string;
  children?: React.ReactNode;
};

export default function LazyBackground({
  imageUrl,
  className = '',
  children,
}: LazyBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className}`}
      style={{
        backgroundImage: isVisible ? `url(${imageUrl})` : 'none',
      }}
    >
      {children}
    </div>
  );
}
