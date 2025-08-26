"use client"
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  Clock,
  Star,
  Shield,
  Award,
  ChevronRight
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
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

export default async function Footer(locale: any) {
  const t = await useTranslations("Footer");
  const itsDe = locale?.locale === "de";
  const emailObfuscation = ['office', 'stalumo.com'].join('@');

  return (
    <footer className="bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EB4036' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EB4036] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.section
          className="max-w-[1280px] mx-auto px-4 py-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Top Section */}
          <motion.div 
            className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16"
            variants={fadeInUp}
          >
            {/* Company Info */}
            <motion.div 
              className="lg:col-span-1 space-y-6"
              variants={fadeInUp}
            >
              <div className="relative">
                <Image
                  src="/assets/images/stalumo.png"
                  width={200}
                  height={145}
                  alt="Logo Stalumo"
                  loading="lazy"
                  className="brightness-110 hover:brightness-125 transition-all duration-300"
                />
              </div>
              
              <p className="text-[#A5A5A5] leading-relaxed">
              {t("description")}
              </p>

              {/* Trust Indicators */}
              <div className="flex items-center gap-4">
                {[
                  { icon: Shield, text: `${t("certified")}` },
                  { icon: Award, text: `10+ ${t("years")}` },
                  { icon: Star, text: "5.0★" }
                ].map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <indicator.icon className="w-4 h-4 text-[#EB4036]" />
                    <span className="text-[#A5A5A5]">{indicator.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Cards */}
            <motion.div 
              className="lg:col-span-3 grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
            >
              {/* Location Card */}
              <motion.div
                className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-6 rounded-2xl border border-[#404040] group hover:border-[#EB4036] transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="bg-[#EB4036] p-4 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-[#A5A5A5] text-sm font-semibold uppercase mb-3 tracking-wider">
                  {t("location")}
                </h4>
                
                <Link 
                  href="https://www.google.com/maps/place/Stalumo/@53.2157609,15.7642279,17z/data=!4m6!3m5!1s0x47012f630a6437c1:0x5c53e80903d8fdc!8m2!3d53.2158315!4d15.7648368!16s%2Fg%2F11gf0pmv9x?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank"
                  className="group/link"
                >
                  <h2 className="text-white text-lg font-bold mb-2 group-hover/link:text-[#EB4036] transition-colors">
                    ul. Kolejowa 6
                  </h2>
                  <p className="text-[#A5A5A5] text-sm">
                    73-220 Drawno, Poland
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-[#EB4036] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t("see_on_map")}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>

              {/* Email Card */}
              <motion.div
                className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-6 rounded-2xl border border-[#404040] group hover:border-[#EB4036] transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="bg-[#EB4036] p-4 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-[#A5A5A5] text-sm font-semibold uppercase mb-3 tracking-wider">
                  {t("email")}
                </h4>
                
                <Link 
                  href={`mailto:${emailObfuscation}`}
                  className="group/link"
                >
                  <h2 className="text-white text-lg font-bold mb-2 group-hover/link:text-[#EB4036] transition-colors">
                    {emailObfuscation}
                  </h2>
                  <p className="text-[#A5A5A5] text-sm mb-3">
                   
                  </p>
                  <div className="flex items-center gap-2 text-[#EB4036] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t("send_message")}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-6 rounded-2xl border border-[#404040] group hover:border-[#EB4036] transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="bg-[#EB4036] p-4 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-[#A5A5A5] text-sm font-semibold uppercase mb-3 tracking-wider">
                  {t("phone")}
                </h4>
                
                <Link 
                  href={itsDe ? "tel:+4915158843944" : "tel:+48784532549"}
                  className="group/link"
                >
                  <h2 className="text-white text-lg font-bold mb-2 group-hover/link:text-[#EB4036] transition-colors">
                    {itsDe ? "+49 151 58843944" : "+48 784-532-549"}
                  </h2>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-[#A5A5A5]" />
                    <p className="text-[#A5A5A5] text-sm">
                    {t("time_range")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[#EB4036] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t("call_now")}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-2xl border border-[#404040]"
            variants={fadeInUp}
          >
            {[
              { number: "500+", text: `${t("happyClients")}` },
              { number: "10+", text: `${t("experienceYears")}` },
              { number: "98%", text: `${t("experienceYears")}` },
              { number: "5.0★", text: `${t("averageRating")}` }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-[#EB4036] mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-sm text-[#A5A5A5] group-hover:text-white transition-colors">
                  {stat.text}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Services Quick Links */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#EB4036]" />
                {t("ourServices")}
              </h3>
              <div className="space-y-3">
       
                  <div  className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                    <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{t("steelRailings")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                    <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{t("stairRailings")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                    <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{t("metalFences")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                    <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{t("steelStructures")}</span>
                  </div>
                
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#EB4036]" />
                {t("serviceArea")}
              </h3>
              <div className="space-y-3">
              <div  className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                    <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{t("poland")}</span>
                  </div>
                  <div  className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                    <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{t("germany")}</span>
                  </div>
                  <div  className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                    <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{t("netherlands")}</span>
                  </div>


              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#EB4036]" />
                {t("certified")}
              </h3>
              <div className="space-y-3">


                  <div className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                    <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">PN-EN ISO 3834</span>
                  </div>
                       <div className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                       <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                       <span className="text-sm">{t("weldingLicenses")}</span>
                     </div>
                          <div className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                          <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                          <span className="text-sm">{t("qualityCertificate")}</span>
                        </div>
                             <div className="flex items-center gap-3 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer group">
                             <ChevronRight className="w-4 h-4 text-[#EB4036] group-hover:translate-x-1 transition-transform" />
                             <span className="text-sm">{t("insurance")}</span>
                           </div>
               
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-[#333] bg-gradient-to-r from-[#111111] to-[#1A1A1A]"
          variants={fadeInUp}
        >
          <div className="max-w-[1280px] mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Company Info */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-[#EB4036]" />
                  <span className="text-white font-bold text-lg">STALUMO</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#A5A5A5]">
                  <span>NIP: 5941613140</span>
                  <span>REGON: 525281099</span>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
                <Link 
                  href="https://bienkowski.dev/" 
                  target="_blank"
                  className="text-[#A5A5A5] hover:text-[#EB4036] transition-colors"
                >
                  {t("copy")}
                </Link>
                <span className="text-[#333] hidden md:inline">•</span>
                <Link 
                  href={`/${locale?.locale}/privacy-policy`}
                  className="text-[#A5A5A5] hover:text-[#EB4036] transition-colors"
                >
                  {t('PrivacyPolicyTitle')}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}