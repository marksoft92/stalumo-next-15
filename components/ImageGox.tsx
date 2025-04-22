import React, { useState } from "react";
import Image from "next/image";

interface BoxImgProps {
  url: string; // Przyjmujemy tylko src dla pojedynczego obrazu
  alt: string; // Dodajemy alt dla dostępności
}

const BoxImg: React.FC<BoxImgProps> = ({ url, alt }) => {
  const [isOpen, setIsOpen] = useState(false); // Stan kontrolujący widoczność popupu

  // Funkcja do otwierania popupu
  const openModal = () => setIsOpen(true);

  // Funkcja do zamykania popupu
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Obrazek */}
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
          // layout="responsive"
        />
      </div>

      {/* Popup (modale) */}
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
              alt={alt}
              src={url}
              loading="lazy"
              className="max-h-[90vh] max-w-[90vw] rounded-[6px]"
              //   layout="responsive"
            />
            <button
              className="absolute top-0 right-0 p-2 text-white bg-red-600 rounded-full w-[40px] my-1 mx-1"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxImg;
