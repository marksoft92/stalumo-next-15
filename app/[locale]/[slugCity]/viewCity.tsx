"use client";

import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Award,
  Wrench,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Star,
  Users,
  Calendar,
  ArrowRight,
  Building2,
  Hammer,
  Factory,
  Zap,
  Target,
  Truck,
  Settings,
  Eye,
  Heart,
  MessageSquare,
  Camera,
  PlayCircle,
  Download,
  FileText,
  Calculator,
  ChevronRight,
  Quote,
  ThumbsUp,
  Briefcase,
  Globe,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock3,
  Package,
  Headphones,
  Medal,
  Lightbulb,
  Gauge,
  Home,

  TreePine,
  Building
} from "lucide-react";


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
    slug?: string;
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
  }
};



type Props = {
  params: {
    slugCity: any;
  };
};
const getTypeIcon = (typeName: string) => {
  const name = typeName.toLowerCase();
  if (name.includes('balkon')) return Home;
  if (name.includes('schod')) return Home;
  if (name.includes('zewnętrz')) return TreePine;
  if (name.includes('wewnętrz')) return Building;
  return Shield;
};
// Animacje
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

const slideInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

export default function Page({ entry }: any) {
  const [slug, city] = entry.slugCity.split('~');
  const stepIcons = [MessageSquare, Eye, Calculator, Factory, Truck]


  if (!entry) notFound();

  const businessSchema = entry.seo.local_business_schema;
  const faqSchema = entry.seo.faq_schema;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessSchema?.name || "Stalumo",
    "image": entry.seo.og_image || "https://stalumo.com/assets/images/stalumo.png",
    "@id": "https://stalumo.com#stalumo",
    "url": entry.seo.canonical_url || `https://stalumo.com/pl/${slug}~${city}`,
    "telephone": businessSchema?.telephone || "+48 784-532-549",
    "priceRange": "500–10000 PLN",
    "description": entry.description,
    "sameAs": [
      "https://www.facebook.com/stalumo",
      "https://www.instagram.com/stalumo",
      "https://www.google.com/maps/place/ul.+Kolejowa+6,+73-220+Drawno"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessSchema?.address.streetAddress || "ul. Kolejowa 6",
      "addressLocality": businessSchema?.address.addressLocality || "Drawno",
      "postalCode": businessSchema?.address.postalCode || "73-220",
      "addressCountry": {
        "@type": "Country",
        "name": "Poland"
      }
    },
    "areaServed": [
      {
        "@type": "City",
        "name": entry.city
      },
      {
        "@type": "AdministrativeArea",
        "name": "Zachodniopomorskie"
      }
    ]
  };

  const faqStructuredData = faqSchema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqSchema.map((faq:any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      {/* Floating Action Button */}
      

      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A]">

        {/* Hero Section with Video Background Effect */}
        <motion.section
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EB4036] rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#EB4036] rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 py-24 relative z-10">
            <motion.div className="text-center space-y-8" variants={fadeInUp}>

              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-[#EB4036] bg-opacity-20 backdrop-blur-sm text-[#EB4036] px-6 py-3 rounded-full border border-[#EB4036] border-opacity-30"
                variants={fadeInDown}
              >
                <Building2 className="w-4 h-4" />
                <span className="font-semibold uppercase tracking-wider text-sm">
                  Usługi: {entry.service_name}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="text-white text-[5rem] leading-[0.9] font-oswald font-bold uppercase max-lg:text-[3rem] max-w-4xl mx-auto"
                variants={fadeInUp}
              >
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {entry.seo.h1 || `${entry.service_name}`}
                </span>
                <br />
                <span className="text-[#EB4036] text-[3rem] max-lg:text-[2rem]">
                  w {entry.defCity}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-[#A5A5A5] text-[1.4rem] leading-[2.2rem] max-w-[70ch] mx-auto font-raleway"
                variants={fadeInUp}
              >
                {entry.seo.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
                variants={fadeInUp}
              >
                <Link
                  href="/contact"
                  className="group bg-[#EB4036] hover:bg-[#d63428] text-white px-8 py-4 rounded-xl font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:shadow-[#EB4036]/25"
                >
                  {entry.cta || "Bezpłatna wycena"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link href="/gallery" className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-3">
                  <PlayCircle className="w-5 h-5" />
                  Zobacz realizacje
                </Link>
              </motion.div>

              {/* Stats Bar */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-black bg-opacity-40 backdrop-blur-sm p-8 rounded-2xl border border-white border-opacity-10"
                variants={staggerContainer}
              >
                {[
                  { icon: Users, number: "500+", text: "Zadowolonych klientów", color: "text-blue-400" },
                  { icon: Award, number: "10+", text: "Lat doświadczenia", color: "text-green-400" },
                  { icon: CheckCircle2, number: "98%", text: "Terminowość", color: "text-yellow-400" },
                  { icon: Star, number: "5.0", text: "Średnia ocen", color: "text-purple-400" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                  >
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-[#A5A5A5]">{stat.text}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="max-w-[1280px] mx-auto px-4 pb-24 space-y-24">


          {/* Service Types - Wykorzystanie content.types */}
          <motion.section
            className="relative"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-br from-[#1A1A1A] via-[#222] to-[#2A2A2A] rounded-3xl p-12 border border-[#333] relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EB4036' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                ></div>
              </div>

              <div className="relative z-10">
                <motion.div className="text-center mb-12" variants={fadeInUp}>
                  <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    <Factory className="w-10 h-10 text-[#EB4036]" />
                    Rodzaje barierek stalowych w {entry.defCity}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
                  <p className="text-[#A5A5A5] text-lg max-w-3xl mx-auto">
                    {entry.description}
                  </p>
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-2 gap-8"
                  variants={staggerContainer}
                >
                  {entry.content.types.map((type:any, index:any) => {
                    const IconComponent = getTypeIcon(type.name);
                    return (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] p-8 rounded-2xl border border-[#404040] group hover:border-[#EB4036] transition-all duration-300"
                        variants={slideInUp}
                        whileHover={{ y: -10 }}
                      >
                        <div className="bg-[#EB4036] p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-white text-xl font-bold mb-4">{type.name}</h3>
                        <p className="text-[#A5A5A5] mb-6">{type.description}</p>
                        <div className="flex items-center gap-2 text-[#EB4036] font-medium">
                          <ArrowRight className="w-4 h-4" />
                          <span>Zobacz więcej</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Services Overview */}
          <motion.section
            className="relative"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-br from-[#1A1A1A] via-[#222] to-[#2A2A2A] rounded-3xl p-12 border border-[#333] relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EB4036' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                ></div>
              </div>

              <div className="relative z-10">
                <motion.div className="text-center mb-12" variants={fadeInUp}>
                  <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    <Factory className="w-10 h-10 text-[#EB4036]" />
                    Kompleksowa obsługa w {entry.defCity}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
                  <p className="text-[#A5A5A5] text-lg max-w-3xl mx-auto">
                    Od pomysłu do realizacji - zapewniamy pełen zakres usług spawalniczych
                    i konstrukcyjnych na najwyższym poziomie.
                  </p>
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-3 gap-8"
                  variants={staggerContainer}
                >
                  {[
                    {
                      icon: Lightbulb,
                      title: "Projektowanie",
                      desc: "Indywidualne projekty dopasowane do Twoich potrzeb i wymagań technicznych",
                      features: ["Wizualizacje", "Obliczenia statyczne", "Dokumentacja techniczna"]
                    },
                    {
                      icon: Factory,
                      title: "Produkcja",
                      desc: "Wykonanie w nowoczesnym zakładzie z wykorzystaniem najlepszych materiałów",
                      features: ["Spawanie MIG/MAG/TIG", "Obróbka CNC", "Kontrola jakości"]
                    },
                    {
                      icon: Truck,
                      title: "Montaż",
                      desc: "Profesjonalny montaż przez doświadczony zespół z gwarancją wykonania",
                      features: ["Transport na miejsce", "Montaż specjalistyczny", "Gwarancja"]
                    }
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] p-8 rounded-2xl border border-[#404040] group hover:border-[#EB4036] transition-all duration-300"
                      variants={slideInUp}
                      whileHover={{ y: -10 }}
                    >
                      <div className="bg-[#EB4036] p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-white text-xl font-bold mb-4">{service.title}</h3>
                      <p className="text-[#A5A5A5] mb-6">{service.desc}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-[#A5A5A5] text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#EB4036]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Service Areas */}
          {entry.seo.keywords && (
            <motion.section
              className="space-y-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                  <MapPin className="w-10 h-10 text-[#EB4036]" />
                  Obszar naszego działania
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
                <p className="text-[#A5A5A5] text-lg max-w-3xl mx-auto">
                  Świadczymy usługi spawalnicze i konstrukcyjne na terenie całego województwa
                  zachodniopomorskiego oraz sąsiednich regionów.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-2xl border border-[#404040]"
                  variants={slideInLeft}
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-[#EB4036]" />
                    Obsługujemy również inne miejscowości.
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {entry.content.service_area.nearby?.slice(0, 8).map((area: any, index: any) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#EB4036]/20 transition-colors group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <MapPin className="w-4 h-4 text-[#EB4036] group-hover:scale-110 transition-transform" />
                        <span className="text-[#A5A5A5] group-hover:text-white transition-colors">
                          {area.trim()}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-2xl border border-[#404040]"
                  variants={slideInRight}
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Truck className="w-6 h-6 text-[#EB4036]" />
                    Zasięg działania
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
                      <span className="text-white">Zasięg podstawowy</span>
                      <span className="text-[#EB4036] font-bold">50 km</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
                      <span className="text-white">Zasięg rozszerzony</span>
                      <span className="text-[#EB4036] font-bold">100 km</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
                      <span className="text-white">Realizacje specjalne</span>
                      <span className="text-[#EB4036] font-bold">Cała Polska</span>
                    </div>
                  </div>
                  <p className="text-[#A5A5A5] text-sm mt-4">
                    * Transport i montaż w ramach zasięgu podstawowego bezpłatny
                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* Why Choose Us */}
          <motion.section
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="space-y-8" variants={slideInLeft}>
              <div>
                <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
                  <Shield className="w-10 h-10 text-[#EB4036]" />
                  Dlaczego warto wybrać Stalumo?
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mb-6"></div>
                <p className="text-[#A5A5A5] text-lg mb-8">
                  Jesteśmy liderem w branży spawalniczej w regionie. Nasze doświadczenie,
                  nowoczesne technologie i pasja do perfekcji gwarantują najwyższą jakość.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Medal, text: "Certyfikowane spawanie według norm PN-EN ISO 3834", highlight: true },
                  { icon: Clock3, text: "Terminowość - 98% zleceń w terminie", highlight: false },
                  { icon: ShieldCheck, text: "Gwarancja jakości do 5 lat", highlight: true },
                  { icon: TrendingUp, text: "Ponad 500 zrealizowanych projektów", highlight: false },
                  { icon: Headphones, text: "24/7 wsparcie techniczne", highlight: true }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group cursor-pointer ${benefit.highlight
                      ? 'bg-gradient-to-r from-[#EB4036]/10 to-transparent border border-[#EB4036]/30'
                      : 'hover:bg-[#1A1A1A]'
                      }`}
                    variants={fadeInUp}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <div className={`p-3 rounded-lg ${benefit.highlight ? 'bg-[#EB4036]' : 'bg-[#2A2A2A] group-hover:bg-[#EB4036]'} transition-colors`}>
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              variants={slideInRight}
            >
              {/* Main Card */}
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-2xl border border-[#404040] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EB4036] opacity-10 rounded-full -translate-y-16 translate-x-16"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-[#EB4036]" />
                    <h3 className="text-xl font-bold text-white">Najnowsze technologie</h3>
                  </div>
                  <p className="text-[#A5A5A5] mb-6">
                    Wykorzystujemy najnowocześniejsze metody spawania i obróbki metali,
                    zapewniając trwałość i estetykę każdej konstrukcji.
                  </p>

                  {/* Technology Icons */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: "MIG/MAG", icon: Zap },
                      { name: "TIG", icon: Settings },
                      { name: "Plazma", icon: Factory },
                      { name: "CNC", icon: Gauge },
                      { name: "CAD/CAM", icon: Eye },
                      { name: "3D Print", icon: Package }
                    ].map((tech, index) => (
                      <div key={index} className="text-center p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#EB4036]/20 transition-colors">
                        <tech.icon className="w-6 h-6 text-[#EB4036] mx-auto mb-2" />
                        <span className="text-xs text-[#A5A5A5]">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              
            </motion.div>
          </motion.section>

          {/* Process Timeline */}
          <motion.section
            className="space-y-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Jak przebiega współpraca?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
              <p className="text-[#A5A5A5] text-lg max-w-3xl mx-auto">
                Proces realizacji każdego projektu jest starannie zaplanowany i wykonywany
                z najwyższą precyzją.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#EB4036] via-[#EB4036]/50 to-transparent lg:block hidden"></div>

              <div className="space-y-16">
                {[
                  {
                    step: "01",
                    icon: MessageSquare,
                    title: "Konsultacja",
                    desc: "Omawiamy Twoje potrzeby, analizujemy wymagania techniczne i przedstawiamy możliwe rozwiązania.",
                    time: "1-2 dni",
                    side: "left"
                  },
                  {
                    step: "02",
                    icon: Eye,
                    title: "Pomiar i projekt",
                    desc: "Wykonujemy pomiary na miejscu i przygotowujemy szczegółowy projekt z wizualizacją 3D.",
                    time: "3-7 dni",
                    side: "right"
                  },
                  {
                    step: "03",
                    icon: Calculator,
                    title: "Wycena",
                    desc: "Przedstawiamy szczegółową wycenę z harmonogramem realizacji i warunkami współpracy.",
                    time: "1-2 dni",
                    side: "left"
                  },
                  {
                    step: "04",
                    icon: Factory,
                    title: "Produkcja",
                    desc: "Rozpoczynamy produkcję zgodnie z zatwierdzonym projektem, stosując najwyższej jakości materiały.",
                    time: "1-3 tygodnie",
                    side: "right"
                  },
                  {
                    step: "05",
                    icon: Truck,
                    title: "Montaż",
                    desc: "Dostarczamy i montujemy konstrukcję na miejscu, zapewniając pełną satysfakcję klienta.",
                    time: "1-2 dni",
                    side: "left"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`relative lg:w-1/2 ${item.side === 'right' ? 'lg:ml-auto lg:pl-12' : 'lg:pr-12'}`}
                    variants={item.side === 'left' ? slideInLeft : slideInRight}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:block hidden">
                      <div className="w-4 h-4 bg-[#EB4036] rounded-full border-4 border-[#0A0A0A]"></div>
                    </div>

                    <motion.div
                      className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-2xl border border-[#404040] group hover:border-[#EB4036] transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-[#EB4036] p-4 rounded-xl group-hover:scale-110 transition-transform">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[#EB4036] font-bold text-2xl">{item.step}</span>
                            <span className="text-[#A5A5A5] text-sm bg-[#2A2A2A] px-3 py-1 rounded-full">
                              {item.time}
                            </span>
                          </div>
                          <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
                          <p className="text-[#A5A5A5]">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>



          {/* Portfolio Section - Wykorzystanie content.portfolio */}
          <motion.section
            className="space-y-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <Camera className="w-10 h-10 text-[#EB4036]" />
                Nasze ostatnie realizacje
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
              <p className="text-[#A5A5A5] text-lg max-w-3xl mx-auto">
                Każdy projekt to unikalna historia. Zobacz nasze najnowsze realizacje barierek stalowych.
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
            >
              {entry.content.portfolio.map((project:any, index:any) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#404040] hover:border-[#EB4036] transition-all duration-300"
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#2A2A2A] to-[#404040] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-[#EB4036]/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <Camera className="w-16 h-16 text-white/30" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-3">{project.title}</h3>
                    <p className="text-[#A5A5A5] text-sm mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A5A5A5] text-sm">Zobacz szczegóły</span>
                      <ArrowRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* FAQ Section */}
          {faqSchema && faqSchema.length > 0 && (
            <motion.section
              className="space-y-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Najczęściej zadawane pytania
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
              </div>

              <motion.div
                className="max-w-4xl mx-auto space-y-4"
                variants={staggerContainer}
              >
                {faqSchema.map((faq:any, index:any) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl border border-[#404040] overflow-hidden group hover:border-[#EB4036] transition-all duration-300"
                    variants={fadeInUp}
                  >
                    <div className="p-8">
                      <h3 className="text-white font-bold text-lg mb-4 flex items-start gap-4">
                        <div className="bg-[#EB4036] p-2 rounded-full mt-1 group-hover:scale-110 transition-transform">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        {faq.question}
                      </h3>
                      <p className="text-[#A5A5A5] leading-relaxed pl-12">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* Pricing Guide */}
          <motion.section
            className="space-y-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <Calculator className="w-10 h-10 text-[#EB4036]" />
                Orientacyjne ceny usług
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
              <p className="text-[#A5A5A5] text-lg max-w-3xl mx-auto">
                Przedstawiamy orientacyjne ceny naszych usług. Dokładna wycena zawsze
                przygotowywana jest indywidualnie po analizie projektu.
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  title: "Barierki stalowe",
                  price: "250-400 zł/mb",
                  features: ["Projekt indywidualny", "Montaż", "Transport", "Gwarancja 3 lata"],
                  popular: false
                },
                {
                  title: "Balustrady schodowe",
                  price: "300-500 zł/mb",
                  features: ["Pomiary na miejscu", "Projekt 3D", "Montaż", "Gwarancja 5 lat"],
                  popular: true
                },
                {
                  title: "Bramy wjazdowe",
                  price: "1500-5000 zł/szt",
                  features: ["Projekt", "Automatyka", "Montaż", "Serwis"],
                  popular: false
                },
                {
                  title: "Ogrodzenia",
                  price: "150-300 zł/mb",
                  features: ["Słupki stalowe", "Montaż", "Transport", "Gwarancja 3 lata"],
                  popular: false
                },
                {
                  title: "Konstrukcje stalowe",
                  price: "50-150 zł/kg",
                  features: ["Obliczenia", "Projekt", "Montaż", "Certyfikaty"],
                  popular: true
                },
                {
                  title: "Schody metalowe",
                  price: "2000-8000 zł/szt",
                  features: ["Projekt", "Stopnie drewniane", "Montaż", "Gwarancja 5 lat"],
                  popular: false
                }
              ].map((pricing, index) => (
                <motion.div
                  key={index}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 group hover:scale-105 ${pricing.popular
                    ? 'bg-gradient-to-br from-[#EB4036]/20 to-[#EB4036]/5 border-[#EB4036] shadow-lg shadow-[#EB4036]/25'
                    : 'bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border-[#404040] hover:border-[#EB4036]'
                    }`}
                  variants={scaleIn}
                >
                  {pricing.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#EB4036] text-white px-4 py-2 rounded-full text-sm font-bold">
                      Najpopularniejsze
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-white text-xl font-bold mb-3">{pricing.title}</h3>
                    <div className="text-3xl font-bold text-[#EB4036] mb-2">{pricing.price}</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pricing.features.map((feature, idx) => (
                      <li key={idx} className="text-[#A5A5A5] flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#EB4036] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                <Link href="/contact">
                <button className={`w-full py-3 rounded-xl font-semibold uppercase tracking-wider transition-all duration-300 ${pricing.popular
                                    ? 'bg-[#EB4036] text-white hover:bg-[#d63428]'
                                    : 'bg-transparent border border-[#EB4036] text-[#EB4036] hover:bg-[#EB4036] hover:text-white'
                                    }`}>
                                    Zapytaj o wycenę
                                  </button>
                </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-2xl border border-[#404040]"
              variants={fadeInUp}
            >
              <p className="text-[#A5A5A5] mb-4">
                <strong className="text-white">Uwaga:</strong> Podane ceny są orientacyjne i mogą się różnić
                w zależności od złożoności projektu, rodzaju materiałów i lokalizacji.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#EB4036] hover:bg-[#d63428] text-white px-8 py-4 rounded-xl font-semibold uppercase tracking-wider transition-all duration-300"
              >
                <Calculator className="w-5 h-5" />
                Bezpłatna wycena
              </Link>
            </motion.div>
          </motion.section>

          {/* Downloads & Resources */}
          <motion.section
            className="space-y-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <Download className="w-10 h-10 text-[#EB4036]" />
                Materiały do pobrania
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {[
                {
                  icon: FileText,
                  title: "Katalog produktów",
                  desc: "Pełny katalog naszych usług i realizacji",
                  format: "PDF • 2.4 MB"
                },
                {
                  icon: Calculator,
                  title: "Kalkulator kosztów",
                  desc: "Szybko oszacuj koszt swojego projektu",
                  format: "Excel • 156 KB"
                },
                {
                  icon: FileText,
                  title: "Wzór umowy",
                  desc: "Przykładowa umowa na wykonanie konstrukcji",
                  format: "PDF • 245 KB"
                },
                {
                  icon: Shield,
                  title: "Certyfikaty",
                  desc: "Nasze certyfikaty i uprawnienia",
                  format: "PDF • 1.8 MB"
                }
              ].map((resource, index) => (
                <motion.button
                  key={index}
                  className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-6 rounded-2xl border border-[#404040] hover:border-[#EB4036] transition-all duration-300 group text-left"
                  variants={scaleIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <resource.icon className="w-8 h-8 text-[#EB4036] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold mb-2">{resource.title}</h3>
                  <p className="text-[#A5A5A5] text-sm mb-3">{resource.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A5A5A5] text-xs">{resource.format}</span>
                    <Download className="w-4 h-4 text-[#EB4036] group-hover:translate-y-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.section>
          {/* Testimonials Section - Wykorzystanie content.testimonials */}
          <motion.section
            className="space-y-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <ThumbsUp className="w-10 h-10 text-[#EB4036]" />
                Co mówią nasi klienci
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
            </div>

            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={staggerContainer}
            >
              {entry.content.testimonials.map((testimonial:any, index:any) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-2xl border border-[#404040] relative group hover:border-[#EB4036] transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                >
                  <Quote className="w-8 h-8 text-[#EB4036] mb-4 opacity-50" />
                  <p className="text-[#A5A5A5] mb-6 italic leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <div className="border-t border-[#404040] pt-4">
                    <div className="font-bold text-white">{testimonial.author}</div>
                  </div>

                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Star className="w-16 h-16 text-[#EB4036]" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* FAQ Section - Wykorzystanie content.faq i seo.faq_schema */}
          {entry.content.faq && entry.content.faq.length > 0 && (
            <motion.section
              className="space-y-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Najczęściej zadawane pytania
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent mx-auto mb-6"></div>
                <p className="text-[#A5A5A5] text-lg max-w-3xl mx-auto">
                  Odpowiedzi na najczęściej zadawane pytania dotyczące naszych barierek stalowych.
                </p>
              </div>

              <motion.div
                className="max-w-4xl mx-auto space-y-4"
                variants={staggerContainer}
              >
                {entry.content.faq.map((faq:any, index:any) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl border border-[#404040] overflow-hidden group hover:border-[#EB4036] transition-all duration-300"
                    variants={fadeInUp}
                  >
                    <div className="p-8">
                      <h3 className="text-white font-bold text-lg mb-4 flex items-start gap-4">
                        <div className="bg-[#EB4036] p-2 rounded-full mt-1 group-hover:scale-110 transition-transform">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        {faq.question}
                      </h3>
                      <p className="text-[#A5A5A5] leading-relaxed pl-12">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* Final CTA Section */}
          <motion.section
            className="relative"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-br from-[#EB4036] via-[#EB4036] to-[#d63428] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-48 translate-x-48"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-40 -translate-x-40"></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-32 -translate-y-32"></div>

              <div className="relative z-10">
                <motion.div
                  className="grid lg:grid-cols-2 gap-12 items-center"
                  variants={staggerContainer}
                >
                  <motion.div variants={slideInLeft}>
                    <div className="flex items-center gap-3 mb-6">
                      <Phone className="w-10 h-10" />
                      <span className="text-lg font-medium opacity-90">Skontaktuj się z nami</span>
                    </div>

                    <h2 className="text-5xl font-bold mb-6 leading-tight max-lg:text-3xl">
                      Gotowy na realizację swojego projektu?
                    </h2>

                    <p className="text-xl mb-8 opacity-90 leading-relaxed">
                      {entry.description || "Zrealizujemy Twój projekt od A do Z. Skontaktuj się z nami już dziś i otrzymaj bezpłatną wycenę w 24h!"}
                    </p>

                    {/* Quick Contact Info */}
                    {businessSchema && (
                      <motion.div
                        className="space-y-4 mb-8"
                        variants={staggerContainer}
                      >
                        <motion.div
                          className="flex items-center gap-4"
                          variants={fadeInUp}
                        >
                          <Phone className="w-6 h-6" />
                          <div>
                            <div className="font-bold">{businessSchema.telephone}</div>
                            <div className="text-sm opacity-80">Zadzwoń teraz!</div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-4"
                          variants={fadeInUp}
                        >
                          <MapPin className="w-6 h-6" />
                          <div>
                            <div className="font-bold">
                              {businessSchema.address.streetAddress}
                            </div>
                            <div className="text-sm opacity-80">
                              {businessSchema.address.postalCode} {businessSchema.address.addressLocality}
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-4"
                          variants={fadeInUp}
                        >
                          <Clock className="w-6 h-6" />
                          <div>
                            <div className="font-bold">
                              {businessSchema.openingHours.join(' • ')}
                            </div>
                            <div className="text-sm opacity-80">Godziny otwarcia</div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-6"
                    variants={slideInRight}
                  >
                    {/* Primary CTA */}
                    <motion.div variants={scaleIn}>
                      <Link
                        href="/contact"
                        className="group w-full bg-white text-[#EB4036] px-10 py-6 rounded-2xl font-bold text-xl uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl hover:scale-105"
                      >
                        {entry.cta || "Bezpłatna wycena"}
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </motion.div>

                    {/* Secondary Actions */}
                    <motion.div
                      className="grid grid-cols-2 gap-4"
                      variants={staggerContainer}
                    >
                      <motion.a
                        href={`tel:${businessSchema?.telephone || '+48784532549'}`}
                        className="group p-4 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-3"
                        variants={scaleIn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone className="w-6 h-6" />
                        <span className="font-medium">Zadzwoń</span>
                      </motion.a>

                      <motion.a
                        href="mailto:office@stalumo.com"
                        className="group p-4 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-3"
                        variants={scaleIn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="w-6 h-6" />
                        <span className="font-medium">E-mail</span>
                      </motion.a>
                    </motion.div>

                    {/* Benefits Pills */}
                    <motion.div
                      className="flex flex-wrap gap-3 justify-center"
                      variants={staggerContainer}
                    >
                      {[
                        { icon: Clock3, text: "Wycena w 24h" },
                        { icon: ShieldCheck, text: "Gwarancja jakości" },
                        { icon: Truck, text: "Darmowy transport" },
                        { icon: Headphones, text: "Wsparcie 24/7" }
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium"
                          variants={fadeInUp}
                          whileHover={{ scale: 1.05 }}
                        >
                          <benefit.icon className="w-4 h-4" />
                          <span>{benefit.text}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Urgency Indicator */}
                    <motion.div
                      className="text-center p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm"
                      variants={fadeInUp}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        <span className="font-bold">Oferta specjalna!</span>
                      </div>
                      <p className="text-sm opacity-90">
                        Przy zamówieniu w tym miesiącu - <strong>10% rabatu</strong> na projekt i montaż
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                  className="mt-12 pt-8 border-t border-white border-opacity-20"
                  variants={fadeInUp}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                      { number: "500+", text: "Zadowolonych klientów" },
                      { number: "10+", text: "Lat na rynku" },
                      { number: "98%", text: "Projektów na czas" },
                      { number: "5★", text: "Średnia ocen" }
                    ].map((stat, index) => (
                      <div key={index} className="space-y-2">
                        <div className="text-3xl font-bold">{stat.number}</div>
                        <div className="text-sm opacity-80">{stat.text}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

        </div>

        {/* Trust Indicators Footer */}
        <motion.section
          className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] py-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="max-w-[1280px] mx-auto px-4">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center"
              variants={staggerContainer}
            >
              {[
                { icon: ShieldCheck, text: "Certyfikowany zakład" },
                { icon: Medal, text: "Nagrodzeni jakością" },
                { icon: Users, text: "500+ klientów" },
                { icon: Clock3, text: "Terminowość" },
                { icon: Award, text: "10 lat doświadczenia" },
                { icon: Headphones, text: "Wsparcie 24/7" }
              ].map((trust, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <trust.icon className="w-8 h-8 text-[#EB4036] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-[#A5A5A5] text-sm font-medium group-hover:text-white transition-colors">
                    {trust.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Final Company Info */}
            <motion.div
              className="mt-16 text-center border-t border-[#333] pt-12"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-[#EB4036]" />
                <h3 className="text-2xl font-bold text-white">STALUMO</h3>
              </div>
              <p className="text-[#A5A5A5] max-w-2xl mx-auto mb-6">
                Jesteśmy wiodącą firmą spawalniczą w województwie zachodniopomorskim.
                Specjalizujemy się w projektowaniu, produkcji i montażu konstrukcji stalowych
                najwyższej jakości.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-[#A5A5A5]">
                <span>NIP: 5941613140</span>
                <span>REGON: 525281099</span>
              
              </div>
            </motion.div>
          </div>
        </motion.section>

      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
    </>
  );
}