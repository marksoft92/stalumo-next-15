import React, { useState } from "react";
import Image from "next/image";

interface ImageData {
  url: string;
  alt: string;
}

interface BoxImgProps {
  images: ImageData[]; // Wszystkie obrazy
  index: number; // Index aktualnego obrazu
  alt: any;
  url: any;
}

const BoxImg: React.FC<BoxImgProps> = ({ images, index, url, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);

  const openModal = () => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  const currentImage = images[currentIndex];

  return (
    <div>
      <div
        className="box-img w-full h-full max-h-[300px] min-w-[300px] max-lg:max-h-[100%] flex justify-center"
        onClick={openModal}
      >
        <Image
          width={300}
          height={300}
          alt={alt}
          src={url}
          className="object-cover cursor-pointer h-full rounded-[6px]"
          loading="lazy"
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              width={600}
              height={600}
              alt={currentImage.alt}
              src={currentImage.url}
              loading="lazy"
              className="max-h-[90vh] max-w-[90vw] rounded-[6px]"
            />

            <button
              className="absolute top-0 right-0 p-2 text-white bg-red-600 rounded-full w-[40px] my-1 mx-1"
              onClick={closeModal}
            >
              X
            </button>

            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white bg-black bg-opacity-70 rounded-full mx-2"
              onClick={prevImage}
            >
              ◀
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white bg-black bg-opacity-70 rounded-full mx-2"
              onClick={nextImage}
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxImg;
