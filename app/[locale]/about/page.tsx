"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Target,
  Sparkles,
  Zap,
  Users,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Quote,
  Play,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Wrench,
  Building,
  Heart,
  TrendingUp,

} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";




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

export default function AboutPage() {
  const t = useTranslations("AboutStalumo")
  const [activeTab, setActiveTab] = useState<any>('mission');
  const [countUp, setCountUp] = useState<any>({
    projects: 500,
    years: 10,
    clients: 500,
    satisfaction: 99
  });

  // Counter animation


  const stats = [
    { number: `${countUp.projects}+`, label: t("stats_projects"), icon: Target, color: "from-[#EB4036] to-[#d63629]" },
    { number: `${countUp.years}+`, label: t("stats_years"), icon: Award, color: "from-[#EB4036] to-[#d63629]" },
    { number: `${countUp.clients}+`, label: t("stats_clients"), icon: Users, color: "from-[#EB4036] to-[#d63629]" },
    { number: `${countUp.satisfaction}%`, label: t("stats_satisfaction"), icon: Sparkles, color: "from-[#EB4036] to-[#d63629]" }
  ];

  const values = [
    {
      icon: Shield,
      title: t("value_quality"),
      description: t("value_quality_desc"),
      color: "from-[#EB4036]/20 to-[#d63629]/20"
    },
    {
      icon: Clock,
      title: t("value_time"),
      description: t("value_time_desc"),
      color: "from-[#EB4036]/20 to-[#d63629]/20"
    },
    {
      icon: Heart,
      title: t("value_passion"),
      description: t("value_passion_desc"),
      color: "from-[#EB4036]/20 to-[#d63629]/20"
    },
    {
      icon: TrendingUp,
      title: t("value_growth"),
      description: t("value_growth_desc"),
      color: "from-[#EB4036]/20 to-[#d63629]/20"
    }
  ];

  const services = [
    { name: t("service_balustrades"), description: t("service_balustrades_desc"), icon: Building },
    { name: t("service_gates"), description: t("service_gates_desc"), icon: Shield },
    { name: t("service_constructions"), description: t("service_constructions_desc"), icon: Wrench },
    { name: t("service_custom"), description: t("service_custom_desc"), icon: Star }
  ];

  const teamMembers = [
    {
      name: "Konrad Lewandowski",
      role: t("founder"),
      experience: t("experience_label"),
      image: "/assets/images/person_center.png",

    },
    {
      name: "Hubert Dzierbuń",
      role: t("projectMenager"),
      experience: t("experience_label"),
      image: "/assets/images/spawacz10years.png",

    },

  ];



  const tabContent: any = {
    mission: {
      title: t("tab_mission"),
      content: t("tab_mission_content")
    },
    vision: {
      title: t("tab_vision"),
      content: t("tab_vision_content")
    },
    history: {
      title: t("tab_history"),
      content: t("tab_history_content")
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A] min-h-screen">
      {/* Hero Section */}
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] border border-[#404040] mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  className="inline-flex items-center gap-2 bg-[#EB4036]/20 px-4 py-2 rounded-full mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles className="w-4 h-4 text-[#EB4036]" />
                  <span className="text-[#EB4036] text-sm font-semibold">{t("experience_label")}</span>
                </motion.div>

                <motion.h1
                  className="text-4xl lg:text-6xl font-bold text-[#A5A5A5] mb-6 leading-tight"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {t("hero_title").split(' ')[0]} <span className="text-[#EB4036]">{t("hero_title").split(' ')[1]}</span>
                </motion.h1>

                <motion.p
                  className="text-xl text-[#707070] mb-8 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {t("hero_description")}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/gallery">
                    <button className="bg-[#EB4036] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#d63629] transition-all duration-300 flex items-center gap-2 justify-center">
                      <Play className="w-5 h-5" />
                      {t("btn_projects")}
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="border border-[#404040] text-[#A5A5A5] px-8 py-4 rounded-xl font-semibold hover:border-[#EB4036] hover:text-[#EB4036] transition-all duration-300 flex items-center gap-2 justify-center">
                      <Phone className="w-5 h-5" />
                      {t("btn_contact")}
                    </button>
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="flex-1 relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="relative">

                  <Image
                    src="/assets/images/spawacz3.jpg"
                    alt="STALUMO Team at Work"
                    width={500}
                    height={500}

                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-[#EB4036] p-6 rounded-2xl shadow-xl">
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-sm">{t("stats_projects")}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EB4036' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl border border-[#404040] p-6 text-center shadow-xl hover:shadow-[0_0_30px_rgba(235,64,54,0.2)] transition-all duration-300 group"
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-[#A5A5A5] mb-2">
                {stat.number}
              </div>
              <div className="text-[#707070] text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission, Vision, History Tabs */}
        <motion.div
          className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] p-8 shadow-2xl mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#A5A5A5] mb-4">
              {t("section_about_title").split(' ')[0]} <span className="text-[#EB4036]">{t("section_about_title").split(' ')[1]}</span>
            </h2>
            <p className="text-[#707070] text-lg max-w-3xl mx-auto">
              {t("section_about_subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(tabContent).map(([key, content]:any) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === key
                  ? 'bg-[#EB4036] text-white shadow-lg'
                  : 'bg-[#2A2A2A] text-[#707070] hover:text-[#EB4036] hover:bg-[#2A2A2A]/80'
                  }`}
              >
                {content?.title}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-[#A5A5A5] mb-4">
              {tabContent[activeTab].title}
            </h3>
            <p className="text-[#707070] text-lg leading-relaxed max-w-4xl mx-auto">
              {tabContent[activeTab].content}
            </p>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#A5A5A5] mb-4">
              {t("values_title").split(' ')[0]} <span className="text-[#EB4036]">{t("values_title").split(' ')[1]}</span>
            </h2>
            <p className="text-[#707070] text-lg max-w-3xl mx-auto">
              {t("values_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl border border-[#404040] p-6 shadow-xl hover:shadow-[0_0_30px_rgba(235,64,54,0.2)] transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`bg-gradient-to-r ${value.color} p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-[#EB4036]" />
                </div>
                <h3 className="text-xl font-bold text-[#A5A5A5] mb-3 text-center group-hover:text-[#EB4036] transition-colors">
                  {value.title}
                </h3>
                <p className="text-[#707070] text-center leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] p-8 shadow-2xl mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#A5A5A5] mb-4">
              {t("services_title").split(' ')[0]} <span className="text-[#EB4036]">{t("services_title").split(' ')[1]}</span>
            </h2>
            <p className="text-[#707070] text-lg max-w-3xl mx-auto">
              {t("services_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link href="/offer">
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-[#2A2A2A]/50 rounded-xl border border-[#404040]/50 hover:border-[#EB4036]/40 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-[#EB4036]/20 p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-[#EB4036]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#A5A5A5] mb-2 group-hover:text-[#EB4036] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-[#707070] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#707070] group-hover:text-[#EB4036] transition-colors" />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#A5A5A5] mb-4">
              {t("team_title").split(' ')[0]} <span className="text-[#EB4036]">{t("team_title").split(' ')[1]}</span>
            </h2>
            <p className="text-[#707070] text-lg max-w-3xl mx-auto">
              {t("team_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl border border-[#404040] p-6 text-center shadow-xl hover:shadow-[0_0_30px_rgba(235,64,54,0.2)] transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative inline-block mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#404040] group-hover:border-[#EB4036] transition-colors duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#EB4036] p-2 rounded-full">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#A5A5A5] mb-1 group-hover:text-[#EB4036] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#EB4036] font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-[#707070] text-sm mb-2">
                  {member.experience}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-[#EB4036] to-[#d63629] rounded-3xl p-8 lg:p-12 text-center shadow-2xl"
          variants={scaleIn}
          initial="initial"
          animate="animate"
        >
          <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Phone className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("cta_title")}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            {t("cta_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">

              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#EB4036] transition-all duration-300 flex items-center gap-2 justify-center">
                <Mail className="w-5 h-5" />
                {t("cta_btn_mail")}
              </button>
            </Link>

          </div>
        </motion.div>
      </Container>
    </div>
  );
}