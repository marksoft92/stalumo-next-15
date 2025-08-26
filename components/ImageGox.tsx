import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Eye,
  Download,
  Share2
} from "lucide-react";

interface ImageData {
  url: string;
  alt: string;
}

interface BoxImgProps {
  images: ImageData[];
  index: number;
  alt: any;
  url: any;
}

// Animation variants
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const BoxImg: React.FC<BoxImgProps> = ({ images, index, url, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [[page, direction], setPage] = useState([0, 0]);

  const openModal = () => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < images.length) {
      setPage([page + newDirection, newDirection]);
      setCurrentIndex(newIndex);
    } else if (newIndex < 0) {
      setPage([page + newDirection, newDirection]);
      setCurrentIndex(images.length - 1);
    } else {
      setPage([page + newDirection, newDirection]);
      setCurrentIndex(0);
    }
  };

  const currentImage = images[currentIndex];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') paginate(-1);
    if (e.key === 'ArrowRight') paginate(1);
    if (e.key === 'Escape') closeModal();
  };

  return (
    <>
      {/* Gallery Item */}
      <motion.div
        className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#404040] hover:border-[#EB4036] transition-all duration-300"
        onClick={openModal}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            width={400}
            height={400}
            alt={alt}
            src={url}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <motion.div
              className="flex items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-[#EB4036] p-3 rounded-full">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
            {index + 1} / {images.length}
          </div>
        </div>

        {/* Info Bar */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-[#A5A5A5] text-sm font-medium truncate">
              {alt || `Image ${index + 1}`}
            </span>
            <div className="flex items-center gap-2 text-[#EB4036]">
              <Eye className="w-4 h-4" />

            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] shadow-2xl max-w-7xl max-h-[90vh] overflow-hidden"
              // variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#404040] bg-gradient-to-r from-[#EB4036]/10 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="bg-[#EB4036] p-2 rounded-lg">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {currentImage.alt || `Image ${currentIndex + 1}`}
                    </h3>
                    <p className="text-[#A5A5A5] text-sm">
                      {currentIndex + 1} of {images.length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Action Buttons */}
                  <button
                    className="p-2 text-[#A5A5A5] hover:text-white hover:bg-[#404040] rounded-lg transition-all"
                    onClick={() => window.open(currentImage.url, '_blank')}
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>

                  <button
                    className="p-2 text-white bg-[#EB4036] hover:bg-[#d63629] rounded-lg transition-all"
                    onClick={closeModal}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative overflow-hidden bg-black/50 h-full">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="flex items-center justify-center p-8"
                  >
                    <Image
                      width={800}
                      height={600}
                      alt={currentImage.alt}
                      src={currentImage.url}
                      loading="lazy"
                      className="max-h-[40vh] max-w-full object-contain rounded-xl shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <motion.button
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-[#EB4036] text-white rounded-full backdrop-blur-sm transition-all group"
                      onClick={() => paginate(-1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-[#EB4036] text-white rounded-full backdrop-blur-sm transition-all group"
                      onClick={() => paginate(1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="p-6 border-t border-[#404040] bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A]">
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                    {images.map((image, idx) => (
                      <motion.button
                        key={idx}
                        className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex
                          ? 'border-[#EB4036] scale-110'
                          : 'border-[#404040] hover:border-[#A5A5A5]'
                          }`}
                        onClick={() => {
                          setCurrentIndex(idx);
                          setPage([idx, idx > currentIndex ? 1 : -1]);
                        }}
                        whileHover={{ scale: idx === currentIndex ? 1.1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          width={64}
                          height={64}
                          alt={image.alt}
                          src={image.url}
                          className="w-full h-full object-cover"
                        />
                        {idx === currentIndex && (
                          <div className="absolute inset-0 bg-[#EB4036]/30 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BoxImg;