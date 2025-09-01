"use client";

import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
  Phone, MapPin, Clock, Star, Award, Zap, ShieldCheck, Wrench,
  Hammer, Factory, Truck, Settings, Camera, FileText, ThumbsUp,
  MessageSquare, Calendar, Globe, ChevronRight, Quote, Building2,
  Sparkles, TrendingUp, CheckCircle, ArrowRight, Heart, Users, Trophy
} from "lucide-react";
import Image from "next/image";

type ServiceEntry = {
  slugCity: string;
  city: string;
  defCity: string;
  service_slug: string;
  service_name: string;
  description: string;
  cta: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    postalCode: string;
    street: string;
    canonical_url?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
    twitter_card?: string;
    h1?: string;
    faq_schema?: Array<{
      question: string;
      answer: string;
    }>;
    local_business_schema?: {
      name: string;
      address: {
        streetAddress: string;
        postalCode: string;
        addressLocality: string;
        addressCountry: string;
      };
      telephone: string;
      openingHours: string[];
    };
  };
  content: {
    benefits: string[];
    portfolio: {
      title: string;
      image: string;
      description: string;
    }[];
    types: {
      name: string;
      description: string;
    }[];
    service_area: {
      main_city: string;
      nearby: string[];
      map_embed: string;
    };
    testimonials: {
      author: string;
      review: string;
    }[];
    faq: {
      question: string;
      answer: string;
    }[];
  };
};

type Props = {
  params: {
    slugCity: any;
  };
};

const getTypeIcon = (typeName: string) => {
  const name = typeName.toLowerCase();
  if (name.includes("balkon")) return Building2;
  if (name.includes("schod")) return Building2;
  if (name.includes("zewnętrz")) return Hammer;
  if (name.includes("wewnętrz")) return Wrench;
  return ShieldCheck;
};

// Animacje
const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Page({ entry }: any) {
  const [slug, city] = entry.slugCity.split("~");

  if (!entry) notFound();

  const businessSchema = entry.seo.local_business_schema;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessSchema?.name || "Stalumo",
    image: entry.seo.og_image || "https://stalumo.com/assets/images/stalumo.png",
    "@id": "https://stalumo.com#stalumo",
    url: entry.seo.canonical_url || `https://stalumo.com/pl/${slug}~${city}`,
    telephone: businessSchema?.telephone || "+48 784-532-549",
    priceRange: "500–10000 PLN",
    description: entry.description,
    sameAs: [
      "https://www.facebook.com/stalumo",
      "https://www.instagram.com/stalumo",
      "https://www.google.com/maps/place/ul.+Kolejowa+6,+73-220+Drawno",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: businessSchema?.address.streetAddress || "ul. Kolejowa 6",
      addressLocality: businessSchema?.address.addressLocality || "Drawno",
      postalCode: businessSchema?.address.postalCode || "73-220",
      addressCountry: { "@type": "Country", name: "Poland" },
    },
    areaServed: [
      { "@type": "City", name: entry.city },
      { "@type": "AdministrativeArea", name: "Zachodniopomorskie" },
    ],
  };

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${entry.service_name} ${entry.city}`,
    description: entry.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Stalumo",
      address: {
        "@type": "PostalAddress",
        streetAddress: businessSchema?.address.streetAddress || "ul. Kolejowa 6",
        addressLocality: businessSchema?.address.addressLocality || "Drawno",
        postalCode: businessSchema?.address.postalCode || "73-220",
        addressCountry: "Poland",
      },
    },
    areaServed: { "@type": "City", name: entry.city },
  };

  const faqStructuredData = entry.seo.faq_schema
    ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: entry.seo.faq_schema.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    }
    : null;

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black to-gray-900/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(235,64,54,0.1),transparent_70%)]"></div>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-block px-6 py-2 bg-red-500/20 border border-red-500 rounded-full text-red-500 text-sm font-semibold uppercase tracking-[4px] backdrop-blur-sm">
                {entry.service_name} • {entry.city}
              </div>
              <h1 className="text-[2rem] sm:text-[6rem] font-oswald font-black uppercase leading-[0.9] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-gray-300">
                  {entry.seo.h1 || entry.service_name} <span className="text-white/60">w {entry.defCity}</span>
                </span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full"></div>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-raleway">
                {entry.description}
              </p>
              <div className="flex flex-col lg:flex-row gap-6 justify-center items-center pt-8">
                <Link
                  href="/contact"
                  className="group relative px-12 py-4 bg-gradient-to-r from-red-500 to-gray-300 text-black font-bold rounded-full shadow-[0_0_30px_rgba(235,64,54,0.5)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(235,64,54,0.8)] hover:scale-105 uppercase tracking-wide"
                >
                  <span className="relative z-10">{entry.cta || "Bezpłatna wycena"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <div className="flex items-center gap-4 text-red-500">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold">Dostępny 24/7</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-red-500 rounded-full animate-bounce mt-2"></div>
            </div>
          </div>
        </section>

        {/* Sekcja statystyk */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-gray-500/5"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Lider Spawalnictwa w {entry.defCity}
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Zadowolonych klientów", suffix: "w regionie", icon: Users },
                { number: "10+", label: "Lat doświadczenia", suffix: "w spawalnictwie", icon: Award },
                { number: "98%", label: "Terminowość", suffix: "projektów na czas", icon: Clock },
                { number: "5.0", label: "Średnia ocen", suffix: "od klientów", icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl p-8 text-center hover:border-red-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(235,64,54,0.2)] hover:scale-105">
                    <div className="flex justify-center mb-4">
                      <stat.icon className="w-12 h-12 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300 mb-4">
                      {stat.number}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
                    <p className="text-red-500 font-semibold">{stat.suffix}</p>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full group-hover:w-3 group-hover:h-3 transition-all duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sekcja "Dlaczego my?" */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(235,64,54,0.1)_0%,transparent_70%)]"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Dlaczego Stalumo w {entry.defCity}?
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full"></div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "Lokalny Ekspert",
                  description: `Znamy potrzeby ${entry.city}. Tworzymy konstrukcje stalowe idealnie dopasowane do lokalnych wymagań.`,
                  highlight: "10+ lat w regionie",
                },
                {
                  icon: Zap,
                  title: "Szybka Realizacja",
                  description: `Dzięki lokalnemu zespołowi w ${entry.defCity} realizujemy projekty w krótkim czasie.`,
                  highlight: "Gotowe w 7-14 dni",
                },
                {
                  icon: Award,
                  title: "Najwyższa Jakość",
                  description: "Wykorzystujemy certyfikowane materiały i nowoczesne technologie spawania.",
                  highlight: "Gwarancja 5 lat",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 hover:border-red-500/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(235,64,54,0.3)] hover:scale-105 h-full flex flex-col justify-between">
                    <div className="flex justify-center mb-6">
                      <feature.icon className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{feature.description}</p>
                    <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500 rounded-full text-red-500 text-sm font-semibold">
                      {feature.highlight}
                    </div>
                    <div className="absolute top-4 right-4 w-3 h-3 bg-red-500/50 rounded-full group-hover:bg-red-500 group-hover:shadow-[0_0_20px_rgba(235,64,54,0.8)] transition-all duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sekcja procesu pracy */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Jak Pracujemy
                </span>
                <br />w {entry.defCity}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Nasz proces zapewnia precyzyjne i terminowe wykonanie każdego projektu.
              </p>
            </motion.div>
            <div className="relative">
              <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-gray-300 rounded-full"></div>
              {[
                {
                  step: "01",
                  title: "Konsultacja",
                  description: `Omawiamy Twoje potrzeby w ${entry.defCity}, analizujemy wymagania techniczne i przedstawiamy rozwiązania.`,
                  time: "1-2 dni",
                  icon: MessageSquare,
                },
                {
                  step: "02",
                  title: "Pomiar i Projekt",
                  description: "Wykonujemy pomiary na miejscu i przygotowujemy projekt z wizualizacją 3D.",
                  time: "3-7 dni",
                  icon: Settings,
                },
                {
                  step: "03",
                  title: "Wycena",
                  description: "Przedstawiamy szczegółową wycenę z harmonogramem realizacji.",
                  time: "1-2 dni",
                  icon: FileText,
                },
                {
                  step: "04",
                  title: "Produkcja",
                  description: "Realizujemy konstrukcję w nowoczesnym zakładzie z użyciem certyfikowanych materiałów.",
                  time: "1-3 tygodnie",
                  icon: Factory,
                },
                {
                  step: "05",
                  title: "Montaż",
                  description: "Dostarczamy i montujemy konstrukcję, zapewniając pełną satysfakcję.",
                  time: "1-2 dni",
                  icon: Truck,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center mb-16 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? "sm:pl-16" : "sm:pr-16"}`}>
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl p-8 hover:border-red-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(235,64,54,0.2)]">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl font-oswald font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                          {item.step}
                        </div>
                        <div className="px-3 py-1 bg-red-500/20 border border-red-500 rounded-full text-red-500 text-sm font-semibold">
                          {item.time}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:items-center sm:justify-center absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-[0_0_20px_rgba(235,64,54,0.8)] z-10"><item.icon className="w-3 h-3 text-white-500 group-hover:scale-110 group-hover:text-gray-300 transition-all duration-300" /></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sekcja opinii klientów */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-gray-500/5"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                Co Mówią Klienci z <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">{entry.city}</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
              <div className="flex justify-center items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-2xl font-bold text-red-500 ml-4">5.0/5</span>
                <span className="text-gray-400">(500+ opinii)</span>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {entry?.review?.map((review: any, index: any) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 hover:border-red-500/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(235,64,54,0.3)] hover:scale-105">
                    <Quote className="w-8 h-8 text-red-500 mb-4 opacity-50" />
                    <p className="text-gray-300 leading-relaxed mb-6 italic text-lg">"{review.comment}"</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <div className="border-t border-red-500/30 pt-4">
                      <div className="text-white font-bold">{review.author}</div>
                      <div className="text-red-500 text-sm">{review.data}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link
                href="/opinions"
                className="inline-block px-8 py-4 border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-500 hover:text-black transition-all duration-300 uppercase tracking-wide"
              >
                Zobacz wszystkie opinie
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Sekcja lokalizacji */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Obszar Działania
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Obsługujemy {entry.city} i cały region zachodniopomorski z szybkim wsparciem na miejscu.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl p-8 hover:shadow-[0_0_40px_rgba(235,64,54,0.3)] transition-all duration-300">
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">Miasta, które obsługujemy</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      'Szczecin', 'Koszalin', 'Kołobrzeg', 'Stargard',
                      'Świnoujście', 'Police', 'Goleniów', 'Wałcz',
                      'Gryfino', 'Szczecinek', 'Białogard', 'Gryfice',
                      'Myślibórz', 'Nowogard', 'Złocieniec', 'Łobez'
                    ].map((area: string, index: number) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg text-center font-semibold transition-all duration-300 ${area.toLowerCase() === city ? "bg-red-500 text-black" : "bg-gray-800 text-gray-300 hover:bg-red-500/20 hover:text-red-500"
                          }`}
                      >
                        {area}
                      </div>
                    ))}
                  </div>
                  <br />
                  <div className="text-gray-400 text-sm">
                    Nie ma Twojego miasta na liście? Skontaktuj się z nami – działamy również w mniejszych miejscowościach!
                  </div>
                  <br />
                  <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-500 font-bold text-lg">Aktualnie w {entry.defCity}</span>
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-center text-gray-300 mt-3">Wsparcie 24/7 • Konsultacje gratis</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl p-8">
                  <h3 className="text-3xl font-bold text-white mb-6">Skontaktuj się z nami</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Telefon</div>
                        <div className="text-white font-bold text-lg">{businessSchema?.telephone || "+48 784 532 549"}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Adres</div>
                        <div className="text-white font-bold">{businessSchema?.address.streetAddress || "ul. Kolejowa 6"}</div>
                        <div className="text-red-500">{businessSchema?.address.postalCode || "73-220"} {businessSchema?.address.addressLocality || "Drawno"}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Godziny pracy</div>
                        <div className="text-white font-bold">{businessSchema?.openingHours.join(" • ") || "Pn-Pt: 08:00-16:00"}</div>
                        <div className="text-red-500">Weekend: na umówienie</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-500/10 to-gray-500/10 border border-red-500/30 rounded-2xl p-8">
                  <h4 className="text-2xl font-bold text-white mb-4">Szybki kontakt w {entry.defCity}</h4>
                  <p className="text-gray-300 mb-6">Zadzwoń lub napisz - odpowiadamy w 15 minut!</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`tel:${businessSchema?.telephone || "+48784532549"}`}
                      className="flex-1 bg-red-500 text-black font-bold py-3 px-6 rounded-full text-center hover:bg-red-400 transition-all duration-300 hover:scale-105"
                    >
                      Zadzwoń teraz
                    </a>
                    <Link
                      href="/contact"
                      className="flex-1 border-2 border-red-500 text-red-500 font-bold py-3 px-6 rounded-full text-center hover:bg-red-500 hover:text-black transition-all duration-300"
                    >
                      Formularz
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sekcja FAQ */}

        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(235,64,54,0.1)_0%,transparent_70%)]"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Często Zadawane
                </span>
                <br />Pytania
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300">
                Odpowiadamy na pytania dotyczące "{entry.service_name}" w {entry.defCity}
              </p>
            </motion.div>
            <div className="space-y-6">
              {entry?.faq?.map((faq: any, index: any) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 hover:border-red-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(235,64,54,0.2)]">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Sekcja portfolio */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-black"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Nasze Ostatnie Realizacje
                </span>

              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Zobacz nasze projekty barierek stalowych i konstrukcji..
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {entry.image.map((project: any, index: any) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-red-500/30 hover:border-red-500/60 transition-all duration-500"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-red-500/20 via-gray-800 to-gray-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image fill src={project.url} alt={project.title} className="w-16 h-16 text-red-500/60 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300 object-cover" />

                      {/* <Camera className="w-16 h-16 text-red-500/60 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" /> */}
                    </div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                        <div className="flex items-center gap-2 text-red-500 text-sm mb-1">
                          <MapPin className="w-4 h-4" />
                          {entry.city}
                        </div>
                        <div className="text-gray-300 text-sm">{project.description}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-gray-300 text-black font-bold rounded-full hover:from-gray-300 hover:to-red-500 transition-all duration-300 hover:scale-105"
              >
                <Camera className="w-5 h-5" />
                Zobacz pełne portfolio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Sekcja technologii */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Technologie
                </span>
                <br />& Narzędzia
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Wykorzystujemy nowoczesne technologie spawalnicze i obróbki metali.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Zap, name: "MIG/MAG", description: "Spawanie łukowe" },
                { icon: Settings, name: "TIG", description: "Precyzyjne spawanie" },
                { icon: Factory, name: "Plazma", description: "Cięcie plazmowe" },
                { icon: Wrench, name: "CNC", description: "Obróbka precyzyjna" },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-red-500/30 rounded-2xl p-6 text-center hover:border-red-500/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(235,64,54,0.3)] hover:scale-105 h-full">
                    <div className="flex justify-center mb-4">
                      <tech.icon className="w-12 h-12 text-red-500 group-hover:scale-110 group-hover:text-gray-300 transition-all duration-300" />
                    </div>
                    <h3 className="text-white font-bold mb-2">{tech.name}</h3>
                    <p className="text-red-500 text-sm">{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sekcja kalkulatora kosztów */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(235,64,54,0.1)_0%,transparent_70%)]"></div>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Cennik Usług
                </span>
                <br />w {entry.defCity}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Sprawdź orientacyjny koszt {entry.service_name} w {entry.city}.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-red-500/30 rounded-3xl p-8 lg:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-red-500/20 border border-red-500 rounded-2xl flex items-center justify-center">
                      <FileText className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Cennik {entry.service_name}</h3>
                      <p className="text-red-500">Przejrzyste ceny w {entry.defCity}</p>
                    </div>
                  </div>
                  {[
                    { size: "Barierki stalowe", price: "250-400 zł/mb", description: "Projekt indywidualny + montaż" },
                    { size: "Balustrady schodowe", price: "300-500 zł/mb", description: "Projekt 3D + gwarancja 5 lat" },
                    { size: "Konstrukcje stalowe", price: "50-150 zł/kg", description: "Obliczenia + certyfikaty" },
                    { size: "Bramy wjazdowe", price: "1500-5000 zł/szt", description: "Automatyka + serwis" },
                  ].map((tier, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-xl hover:border-red-500/50 transition-all duration-300">
                      <div>
                        <div className="text-white font-bold">{tier.size}</div>
                        <div className="text-gray-400 text-sm">{tier.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-red-500 font-bold text-lg">{tier.price}</div>
                        <div className="text-gray-400 text-sm">projekt + wdrożenie</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-red-500/10 to-gray-500/10 border border-red-500/40 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-10 h-10 text-red-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Bezpłatna Wycena</h4>
                    <p className="text-gray-300">Dokładny kosztorys w 24h</p>
                  </div>
                  <div className="space-y-4 mb-8">
                    {["Konsultacja na miejscu", "Projekt 3D gratis", "Bez zobowiązań", "Gwarancja najlepszej ceny"].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-red-500" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="w-full bg-gradient-to-r from-red-500 to-gray-300 text-black font-bold py-4 px-6 rounded-full text-center hover:from-gray-300 hover:to-red-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
                  >
                    Zamów bezpłatną wycenę
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sekcja certyfikatów */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Certyfikaty
                </span>
                <br />& Nagrody
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Nasze kompetencje w spawalnictwie potwierdzone certyfikatami branżowymi.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Award, title: "PN-EN ISO 3834", description: "Certyfikat spawania", year: "2023" },
                { icon: ShieldCheck, title: "ISO 9001", description: "Zarządzanie jakością", year: "Ważny" },
                { icon: Trophy, title: "Lider Regionu", description: "Nagroda Zachodniopomorskie 2023", year: "2023" },
                { icon: Star, title: "Certyfikat Jakości", description: "Branża metalowa", year: "2024" },
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-red-500/30 rounded-2xl p-6 text-center hover:border-red-500/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(235,64,54,0.3)] hover:scale-105 h-full flex flex-col justify-between">
                    <div className="flex justify-center mb-4">
                      <cert.icon className="w-16 h-16 text-red-500 group-hover:scale-110 group-hover:text-yellow-400 transition-all duration-300" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{cert.title}</h3>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">{cert.description}</p>
                    <div className="inline-block px-3 py-1 bg-red-500/20 border border-red-500 rounded-full text-red-500 text-xs font-semibold">
                      {cert.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-red-500/10 to-gray-500/10 border border-red-500/30 rounded-3xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">Zaufali Nam w {entry.defCity}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Setki zadowolonych klientów potwierdza jakość naszych usług spawalniczych.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-oswald font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300 mb-2">
                      500+
                    </div>
                    <div className="text-white font-semibold">Projektów</div>
                    <div className="text-red-500 text-sm">w regionie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-oswald font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300 mb-2">
                      98%
                    </div>
                    <div className="text-white font-semibold">Rekomendacji</div>
                    <div className="text-red-500 text-sm">od klientów</div>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Link
                    href="/certificates"
                    className="inline-flex items-center gap-3 px-8 py-4 border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-500 hover:text-black transition-all duration-300 hover:scale-105"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Zobacz certyfikaty
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sekcja blog/porady */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-gray-500/5"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-300">
                  Porady & Inspiracje
                </span>
                <br />w {entry.defCity}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Wskazówki i trendy w {entry.service_name} dla mieszkańców {entry.city}.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {entry.blogPost?.map((article: any, index: any) => (
                <Link href={article.url}>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group h-full"
                  >
                    <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-red-500/30 rounded-2xl overflow-hidden hover:border-red-500/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(235,64,54,0.3)] hover:scale-105 h-full">
                      <div className="aspect-[16/9] bg-gradient-to-br from-red-500/20 via-gray-800 to-gray-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image fill src={article.imgUrl} alt={article.title} className="w-16 h-16 text-red-500/60 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300 object-cover" />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-red-500/80 text-black text-sm font-semibold rounded-full">
                            {article.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300 leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-red-500 font-semibold text-sm">Czytaj więcej</div>
                          <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-500 hover:text-black transition-all duration-300 hover:scale-105"
              >
                <MessageSquare className="w-5 h-5" />
                Więcej artykułów
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 bg-gradient-to-r from-red-500/10 via-gray-500/10 to-red-500/10 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(235,64,54,0.2),transparent_70%)]"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-[2rem] sm:text-5xl lg:text-7xl font-oswald font-black uppercase leading-[0.9]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-300 to-red-500">
                  Gotowy na Start?
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-gray-300 mx-auto rounded-full"></div>
              <p className="text-2xl text-gray-300 leading-relaxed">
                Zacznij w {entry.defCity} już dziś!<br />
                <span className="text-red-500 font-semibold">Bezpłatna wycena • Wsparcie 24/7 • Gwarancja jakości</span>
              </p>
              <div className="flex flex-col lg:flex-row gap-6 justify-center items-center pt-8">
                <a
                  href={`tel:${businessSchema?.telephone || "+48784532549"}`}
                  className="group relative px-16 py-6 bg-gradient-to-r from-red-500 to-gray-300 text-black font-black text-xl rounded-full shadow-[0_0_40px_rgba(235,64,54,0.6)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(235,64,54,0.9)] hover:scale-110 uppercase tracking-wide"
                >
                  <span className="relative z-10">📞 Zadzwoń Teraz</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <Link
                  href="/contact"
                  className="group px-12 py-6 border-3 border-red-500 text-red-500 font-bold text-xl rounded-full hover:bg-red-500 hover:text-black transition-all duration-300 hover:scale-105 uppercase tracking-wide"
                >
                  ✉️ Napisz do Nas
                </Link>
              </div>
              <div className="pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
                {[
                  { icon: Zap, text: "Odpowiedź w 15 min" },
                  { icon: Truck, text: "Szybki montaż" },
                  { icon: ShieldCheck, text: "Gwarancja jakości" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <item.icon className="w-12 h-12 text-red-500" />
                    <div className="text-red-500 font-semibold text-lg">{item.text}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }} />
      {faqStructuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      )}
    </>
  );
}