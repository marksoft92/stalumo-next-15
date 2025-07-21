"use client";

import Container from "@/components/ui/container";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {Alert} from "@mui/material";
import Link from "next/link";
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
  
    // 🚫 zapobiega podwójnemu kliknięciu
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
    <>

    <Container>
      <div className="flex max-lg:flex-col w-full gap-10 ">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-[#000] lg:w-[50%] "
        >
          
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium  text-[#fff]"
            >
              {t("topic")}
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div>
  <label className="block text-sm font-medium text-[#fff]">{t("form.phone")}</label>
  <input
    type="number"
    onChange={(e) => setPhone(e.target.value)}
    value={phone}
    required
    className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm sm:text-sm rounded-md"
  />
</div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium  text-[#fff]"
            >
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium  text-[#fff]"
            >
              {t("content")}
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            ></textarea>
          </div>




          <div>
  <label className="block text-sm font-medium text-[#fff]">{t("form.category")}</label>
  <select
    onChange={(e) => setCategory(e.target.value)}
    value={category}
    required
    className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm sm:text-sm rounded-md"
  >
    <option value="">{t("form.select")}</option>
    <option value={t("form.balustrades")}>{t("form.balustrades")}</option>
    <option value={t("form.gates")}>{t("form.gates")}</option>
    <option value={t("form.fences")}>{t("form.fences")}</option>
    <option value={t("form.wickets")}>{t("form.wickets")}</option>
    <option value={t("form.structures")}>{t("form.structures")}</option>
  </select>
</div>

<div>
  <label className="block text-sm font-medium text-[#fff]">{t("form.project")}</label>
  <select
    onChange={(e) => setProject(e.target.value)}
    value={project}
    required
    className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm sm:text-sm rounded-md"
  >
    <option value="">{t("form.select")}</option>
    <option value={t("form.yes")}>{t("form.yes")}</option>
    <option value={t("form.no")}>{t("form.no")}</option>
  </select>
</div>

<div>
  <label className="block text-sm font-medium text-[#fff]">{t("form.quantity")}</label>
  <input
    type="text"
    onChange={(e) => setQuantity(e.target.value)}
    value={quantity}
    required
    className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm sm:text-sm rounded-md"
  />
</div>

<div>
  <label className="block text-sm font-medium text-[#fff]">{t("form.assembly")}</label>
  <select
    onChange={(e) => setAssembly(e.target.value)}
    value={assembly}
    required
    className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm sm:text-sm rounded-md"
  >
    <option value="">{t("form.select")}</option>
    <option value={t("form.withInstallation")}>{t("form.withInstallation")}</option>
    <option value={t("form.noInstallation")}>{t("form.noInstallation")}</option>
  </select>
</div>



<div>
  <label className="block text-sm font-medium text-[#fff]">{t("form.date")}</label>
  <input
  type="date"
  onChange={(e) => setStartDate(e.target.value)}
  onClick={(e) => e.currentTarget.showPicker?.()} // pokazuje picker jeśli dostępny
  value={startDate}
  required
  className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm sm:text-sm rounded-md cursor-pointer"
/>

</div>





          <div>
          {successMessage && <div className="z-1 top-[50%] left-[50%] w-full"><Alert severity="success">{successMessage}</Alert></div>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <button
              type="submit"
              disabled={isSubmitting}
              className=" text-[#fff] 
      bg-[#EB4036] 
      border-[1px] 
      border-[#EB4036] 
      mt-6
      w-max
      text-[1rem] 
      font-[500] 
      uppercase 
      leading-[1em] 
      tracking-[1.6px] 
      px-[25px] 
      py-[15px] 
      rounded-[0px] 
      transition-all 
      duration-300 
      hover:bg-[#02010100] 
      hover:skew-[-10] transform
      rounded-[5px]
      "
            >
              {isSubmitting ? t("loading") : t("button")}
            </button>
        
          </div>
          <div className="text-white">{t('privacy')}<Link className="hover:text-[#EB4036]" href={`/${locale?.locale}/privacy-policy`}>{" "+t('PrivacyPolicyTitle')}</Link></div>
        </form>
        <div className="lg:w-[50%] flex flex-col gap-5">
          <h2 className="text-[2.5rem] font-semibold uppercase">
            {t("title")}
          </h2>
          <p className="text-[#A5A5A5]">{t("description")}</p>
        </div>
      </div>
    </Container>
    </>
  );
}
