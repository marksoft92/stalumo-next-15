"use client"
import React, { useEffect, useState } from 'react';

interface ScrollAnimationProps {
    children: React.ReactNode;
    direction: 'left' | 'right' | 'top' | 'bottom';
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, direction }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        if(!isMobile) {
            const animateElements = document.querySelectorAll(`.anim-${direction}`);

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (direction === 'left') {
                            entry.target.classList.remove('translate-x-full');
                            entry.target.classList.add('translate-x-0');
                        } else if (direction === 'right') {
                            entry.target.classList.remove('translate-x-full');
                            entry.target.classList.add('translate-x-0');
                        } else if (direction === 'top') {
                            entry.target.classList.remove('translate-y-full');
                            entry.target.classList.add('translate-y-0');
                        } else if (direction === 'bottom') {
                            entry.target.classList.remove('translate-y-full');
                            entry.target.classList.add('translate-y-0');
                        }

                        entry.target.classList.remove('opacity-0');
                        entry.target.classList.add('opacity-100');


                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
            });

            animateElements.forEach((element) => {
                observer.observe(element);
            });
        }

    }, [direction]);

    return (
        <div className={!isMobile ? `anim-${direction} opacity-0 transform transition-all duration-1000 ease-out` : ''}>
            {children}
        </div>
    );
};

export default ScrollAnimation;
