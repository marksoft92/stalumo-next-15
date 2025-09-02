"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Camera,

  Play,
  Download,
  Eye,
  ZoomIn,
  Grid3X3,
  Image as LucideImage,
  List,
  Filter,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Sparkles,
  Award,
  Target,
  Zap,
  Link as LinkLucide
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

const Container = ({ children, className = "" }: any) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
    {children}
  </div>
);

export default function GalleryPage(locale: any) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [images, setImages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("Gallery");



  // Categories will be calculated dynamically based on fetched images
  const categories = [
    { id: 'all', name: t("all"), count: images.length },
    { id: 'othersteel', name: t("constructions"), count: images.filter(img => img.category === 'othersteel').length },
    { id: 'balustrades', name: t("railings"), count: images.filter(img => img.category === 'balustrades').length },
    { id: 'fences', name: t("fences"), count: images.filter(img => img.category === 'fences').length },
    { id: 'gates', name: t("gates"), count: images.filter(img => img.category === 'gates').length }
  ];

  const stats = [
    { number: "500+", label: t("completedProjects"), icon: Target },
    { number: "10+", label: t("yearsExperience"), icon: Award },
    { number: "98%", label: t("satisfiedClients"), icon: Sparkles },
    { number: "24/7", label: t("technicalSupport"), icon: Zap }
  ];

  const filteredImages = images.filter(image => {
    const matchesCategory = filter === 'all' || image.category === filter;
    const matchesSearch = image.translation.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.translation.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function formatToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/gallery");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();


        // Transform the fetched data to match the expected format
        const transformedImages = data.images.map((image: any, index: number) => ({
          id: index + 1,
          url: image.url,
          alt: image.alt,
          category: image.category,
          translation: image.translations.filter((v: any) => v.language === locale?.locale)?.[0],
          featured: image.featured // Mark first 3 as featured
        }));

        setImages(transformedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(t("galleryLoadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);




  const openImageModal = (image: any) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage?.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage?.id);
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[prevIndex]);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A] min-h-screen flex items-center justify-center">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 border-4 border-[#EB4036] border-l-transparent rounded-full animate-spin"></div>
          <span className="text-[#A5A5A5] text-lg">{t("galleryLoading")}</span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A] min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-[#EB4036] text-6xl mb-4">⚠️</div>
          <h2 className="text-[#A5A5A5] text-2xl font-bold mb-2">{t("galleryLoadFailed")}</h2>
          <p className="text-[#707070] mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#EB4036] text-white px-6 py-3 rounded-xl hover:bg-[#d63629] transition-colors"
          >
            {t("tryAgain")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A] min-h-screen">
      {/* Hero Slider */}
      <Container>




        <div className="flex max-lg:flex-col gap-16">
          {/* Main Gallery Section */}
          <motion.div className="lg:w-[75%]" variants={fadeInUp} initial="initial" animate="animate">
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] p-8 shadow-2xl">
              {/* Gallery Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-[#EB4036] p-3 rounded-xl">
                    <Camera className="w-6 h-6 text-[#A5A5A5]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#A5A5A5]">{t("ourProjects")}</h2>
                    <p className="text-[#707070] text-sm">
                      {filteredImages.length} {t("from")} {images.length} {t("projects")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#707070]" />
                    <input
                      type="text"
                      placeholder={t("searchProjects") + "..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-[#2A2A2A] border border-[#404040] rounded-xl pl-10 pr-4 py-2 text-[#A5A5A5] text-sm focus:border-[#EB4036] transition-colors w-48"
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="flex bg-[#2A2A2A] border border-[#404040] rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid'
                        ? 'bg-[#EB4036] text-[#A5A5A5]'
                        : 'text-[#707070] hover:text-[#A5A5A5]'
                        }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list'
                        ? 'bg-[#EB4036] text-[#A5A5A5]'
                        : 'text-[#707070] hover:text-[#A5A5A5]'
                        }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories Filter */}
              <div className="flex flex-wrap gap-3 mb-8">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`px-4 py-2 rounded-xl border transition-all duration-300 ${filter === category.id
                      ? 'bg-[#EB4036] border-[#EB4036] text-[#A5A5A5]'
                      : 'bg-[#2A2A2A] border-[#404040] text-[#707070] hover:border-[#EB4036] hover:text-[#EB4036]'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name} ({category.count})
                  </motion.button>
                ))}
              </div>

              {/* Gallery Grid */}
              <motion.div
                className={`grid gap-6 ${viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
                  }`}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className={`group relative bg-[#2A2A2A] rounded-2xl overflow-hidden border border-[#404040] hover:border-[#EB4036]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(235,64,54,0.2)] cursor-pointer ${viewMode === 'list' ? 'flex gap-6 p-4' : ''
                      }`}
                    variants={scaleIn}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => openImageModal(image)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'aspect-[4/3]'} rounded-xl`}>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Overlay Icons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.button
                          className="bg-[#EB4036] p-3 rounded-full shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ZoomIn className="w-5 h-5 text-white" />
                        </motion.button>

                      </div>

                      {image.featured && (
                        <div className="absolute top-3 left-3 bg-[#EB4036] px-3 py-1 rounded-full">
                          <span className="text-white text-xs font-semibold">{t("featured")}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
                      <div className="mb-2">
                        <span className="text-[#EB4036] text-xs font-semibold uppercase tracking-wider">
                          {categories.find(cat => cat.id === image.category)?.name}
                        </span>
                      </div>
                      <h3 className="text-[#A5A5A5] font-semibold text-lg mb-2 group-hover:text-[#EB4036] transition-colors">
                        {image.translation.title}
                      </h3>
                      <p className="text-[#707070] text-sm mb-4 leading-relaxed">
                        {image.translation.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#606060] text-xs">
                          {formatToYYYYMMDD(image.translation.date)}
                        </span>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-[#EB4036]" />
                          <span className="text-[#EB4036] text-xs">  {t("seeMore")}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {filteredImages.length === 0 && (
                <div className="text-center py-16">
                  <LucideImage className="w-16 h-16 text-[#404040] mx-auto mb-4" />
                  <p className="text-[#707070] text-lg">Nie znaleziono projektów pasujących do wyszukiwania</p>
                </div>
              )}
            </div>

          </motion.div>

          {/* Sidebar */}
          <motion.div className="lg:w-[25%] flex flex-col gap-8" variants={fadeInUp} initial="initial" animate="animate">
            {/* Featured Projects */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] p-6 shadow-2xl">
              <h3 className="text-[#A5A5A5] font-bold text-xl mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#EB4036]" />
                {t("featured")}
              </h3>
              <div className="space-y-4">
                {images.filter(img => img.featured).slice(0, 3).map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="flex gap-3 p-3 bg-[#2A2A2A]/50 rounded-lg border border-[#404040]/50 hover:border-[#EB4036]/40 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openImageModal(image)}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={200}
                      height={200}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-[#A5A5A5] font-semibold text-sm mb-1">
                        {image.translation.title}
                      </h4>
                      <p className="text-[#707070] text-xs line-clamp-2">
                        {image.translation.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-[#EB4036] to-[#d63629] rounded-3xl p-6 shadow-2xl text-center">
              <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                {t("haveProject")}
              </h3>
              <p className="text-white/80 text-sm mb-6">
                {t("contactUsDiscuss")}
              </p>
              <Link href="/contact">
                <motion.button
                  className="w-full bg-white text-[#EB4036] font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("contactUs")}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 py-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl border border-[#404040] p-6 text-center shadow-xl hover:shadow-[0_0_30px_rgba(235,64,54,0.2)] transition-all duration-300 "
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="bg-[#EB4036]/20 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[#EB4036]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#EB4036] mb-2">
                {stat.number}
              </div>
              <div className="text-[#707070] text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeImageModal}
        >
          <motion.div
            className="relative max-w-6xl w-full max-h-[90vh] bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm p-3 rounded-full z-10 hover:bg-black/70 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm p-3 rounded-full z-10 hover:bg-black/70 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-3 rounded-full z-10 hover:bg-black/70 transition-all duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Info */}
            <div className="p-6">

              <div className="flex items-start justify-between gap-4 ">
                <div className="flex flex-row text--bootom align-bootom items-end gap-2">

                  <h2 className="text-2xl font-bold text-[#A5A5A5] ">
                    {selectedImage.translation.title}
                  </h2>
                  <p className="text-[#707070] leading-relaxed ">
                    {selectedImage.translation.description}
                  </p>
                  <div className="text-[#606060] text-sm">
                    Data realizacji:{formatToYYYYMMDD(selectedImage.translation.date)}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}