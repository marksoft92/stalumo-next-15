"use client";

import Container from "@/components/ui/container";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  User,
  Calendar,
  Package,
  Settings,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  Shield,
  FileText,
  Building2,
  Star
} from "lucide-react";
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

export default function ContactForm(locale: any) {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [project, setProject] = useState("");
  const [quantity, setQuantity] = useState("");
  const [assembly, setAssembly] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const t = useTranslations("Contact");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!executeRecaptcha) {
      setErrorMessage("Error loading reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const recaptchaToken = await executeRecaptcha("contact_form");
      const generatedString = `
  ${t("form.summary.category")}: ${category}
  ${t("form.summary.project")}: ${project}
  ${t("form.summary.quantity")}: ${quantity}
  ${t("form.summary.assembly")}: ${assembly}
  ${t("form.summary.phone")}: ${phone}
  ${t("form.summary.date")}: ${startDate}
  `.trim();

      const finalContent = content + "\n\n" + generatedString;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, topic, content: finalContent, recaptchaToken }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message || t("success"));
        resetForm();
      } else {
        setErrorMessage(result.error || t("error"));
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while sending the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setTopic("");
    setContent("");
    setCategory("");
    setProject("");
    setQuantity("");
    setAssembly("");
    setPhone("");
    setStartDate("");
  };

  return (
    <div className="bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A] min-h-screen relative">

      <Container>
        <motion.div
          className="relative z-10 py-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="flex max-lg:flex-col w-full gap-16">
            {/* Form Section */}
            <motion.div
              className="lg:w-[60%]"
              variants={fadeInUp}
            >
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] p-8 shadow-2xl">
                {/* Form Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#EB4036] p-3 rounded-xl">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{t("formTitle") || "Send us a message"}</h3>
                      <p className="text-[#A5A5A5]">{t("formSubtitle") || "We'll get back to you within 24 hours"}</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Topic Field */}
                  <motion.div variants={fadeInUp}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                      <MessageCircle className="w-4 h-4 text-[#EB4036]" />
                      {t("topic")}
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                      className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"

                    />
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div variants={fadeInUp}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                      <Phone className="w-4 h-4 text-[#EB4036]" />
                      {t("form.phone")}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"

                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={fadeInUp}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                      <Mail className="w-4 h-4 text-[#EB4036]" />
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"

                    />
                  </motion.div>

                  {/* Content Field */}
                  <motion.div variants={fadeInUp}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                      <FileText className="w-4 h-4 text-[#EB4036]" />
                      {t("content")}
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={4}
                      required
                      className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300 resize-none"

                    />
                  </motion.div>

                  {/* Two Column Layout */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Category */}
                    <motion.div variants={fadeInUp}>
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <Building2 className="w-4 h-4 text-[#EB4036]" />
                        {t("form.category")}
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                      >
                        <option value="">{t("form.select")}</option>
                        <option value={t("form.balustrades")}>{t("form.balustrades")}</option>
                        <option value={t("form.gates")}>{t("form.gates")}</option>
                        <option value={t("form.fences")}>{t("form.fences")}</option>
                        <option value={t("form.wickets")}>{t("form.wickets")}</option>
                        <option value={t("form.structures")}>{t("form.structures")}</option>
                      </select>
                    </motion.div>

                    {/* Project */}
                    <motion.div variants={fadeInUp}>
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <Star className="w-4 h-4 text-[#EB4036]" />
                        {t("form.project")}
                      </label>
                      <select
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        required
                        className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                      >
                        <option value="">{t("form.select")}</option>
                        <option value={t("form.yes")}>{t("form.yes")}</option>
                        <option value={t("form.no")}>{t("form.no")}</option>
                      </select>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Quantity */}
                    <motion.div variants={fadeInUp}>
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <Package className="w-4 h-4 text-[#EB4036]" />
                        {t("form.quantity")}
                      </label>
                      <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"

                      />
                    </motion.div>

                    {/* Assembly */}
                    <motion.div variants={fadeInUp}>
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <Settings className="w-4 h-4 text-[#EB4036]" />
                        {t("form.assembly")}
                      </label>
                      <select
                        value={assembly}
                        onChange={(e) => setAssembly(e.target.value)}
                        required
                        className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                      >
                        <option value="">{t("form.select")}</option>
                        <option value={t("form.withInstallation")}>{t("form.withInstallation")}</option>
                        <option value={t("form.noInstallation")}>{t("form.noInstallation")}</option>
                      </select>
                    </motion.div>
                  </div>

                  {/* Date */}
                  <motion.div variants={fadeInUp}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                      <Calendar className="w-4 h-4 text-[#EB4036]" />
                      {t("form.date")}
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      onClick={(e) => e.currentTarget.showPicker?.()}
                      required
                      className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300 cursor-pointer"
                    />
                  </motion.div>

                  {/* Messages */}
                  {successMessage && (
                    <motion.div
                      className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400"
                      variants={scaleIn}
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>{successMessage}</span>
                    </motion.div>
                  )}

                  {errorMessage && (
                    <motion.div
                      className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400"
                      variants={scaleIn}
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div variants={fadeInUp}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#EB4036] to-[#d63629] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t("loading")}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span>{t("button")}</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Privacy Policy */}
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#A5A5A5] pt-4 border-t border-[#404040]"
                    variants={fadeInUp}
                  >
                    <Shield className="w-4 h-4 text-[#EB4036]" />
                    <span>
                      {t('privacy')}
                      <Link
                        className="text-[#EB4036] hover:text-white transition-colors ml-1"
                        href={`/${locale?.locale}/privacy-policy`}
                      >
                        {t('PrivacyPolicyTitle')}
                      </Link>
                    </span>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              className="lg:w-[40%] flex flex-col gap-8"
              variants={fadeInUp}
            >
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#EB4036] p-3 rounded-xl">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white uppercase">
                    {t("title")}
                  </h2>
                </div>

                <p className="text-[#A5A5A5] text-lg leading-relaxed mb-8">
                  {t("description")}
                </p>

                {/* Contact Features */}
                <div className="space-y-6">
                  {[
                    {
                      icon: CheckCircle,
                      title: t("feature1Title") || "Quick Response",
                      description: t("feature1Desc") || "We respond within 24 hours"
                    },
                    {
                      icon: Shield,
                      title: t("feature2Title") || "Secure & Private",
                      description: t("feature2Desc") || "Your data is protected"
                    },
                    {
                      icon: Star,
                      title: t("feature3Title") || "Expert Consultation",
                      description: t("feature3Desc") || "Professional advice included"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-[#2A2A2A]/50 rounded-xl border border-[#404040]/50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="bg-[#EB4036]/20 p-2 rounded-lg">
                        <feature.icon className="w-5 h-5 text-[#EB4036]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                        <p className="text-[#A5A5A5] text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <motion.div
                className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] p-6 shadow-2xl"
                variants={fadeInUp}
              >
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#EB4036]" />
                  {t("trustTitle") || "Trusted by 500+ Clients"}
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#EB4036]">500+</div>
                    <div className="text-xs text-[#A5A5A5]">{t("clients") || "Clients"}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#EB4036]">10+</div>
                    <div className="text-xs text-[#A5A5A5]">{t("years") || "Years"}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#EB4036]">5.0★</div>
                    <div className="text-xs text-[#A5A5A5]">{t("rating") || "Rating"}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}