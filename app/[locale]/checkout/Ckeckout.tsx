"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Package,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  Shield,
  Globe,
  FileText,
  Star,
  ShoppingCart,
  Truck,
  Wallet
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import EmptyCart from "@/components/cart/EmptyCart";
import { PaymentModal } from "@/components/cart/PaymentModal";

// Animations
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

interface CheckoutData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company?: string;
  address_1: string;
  city: string;
  postcode: string;
  country: string;
  vat_number?: string;
}


interface ShipingData {
    first_name: string;
    last_name: string;
    phone: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
  }

  interface CartProps {
    products: any[];
    locale: any;
}

export default function CheckoutForm({ products, locale }: CartProps) {
  const { line_items, clearCart } = useCartStore();
  const t = useTranslations("Checkout");
  const tCart = useTranslations("Cart");
  const tTerms = useTranslations("Terms");
  const tFooter = useTranslations("Footer");

  const cartItems = line_items
  .map((item:any) => {
      const product = products.find((p) => p.id === item.product_id);
      return product ? { ...product, quantity: item.quantity } : null;
  })
  .filter(Boolean);

  const totalPrice = cartItems.reduce(
    (sum:any, item: any) => sum + Number(item.sale_price) * item.quantity,
    0
);

  // billing
  const [form, setForm] = useState<CheckoutData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    address_1: "",
    city: "",
    postcode: "",
    country: "PL",
    vat_number: ""
  });

  // shipping
  const [shipping, setShipping] = useState<ShipingData>({
    first_name:form.first_name,
    last_name:form.last_name,
    phone:form.phone,
    address_1:"",
    city:"",
    postcode:"",
    country: "",
  });

  const [useDifferentShipping, setUseDifferentShipping] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setForm({ ...form, [e.target.name]: e.target.value }); };
  const handleChangeShiping = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setShipping({ ...shipping, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (line_items.length === 0) {
        setMessage("Koszyk jest pusty!");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/woo-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          line_items,
          vat_number: form.vat_number || undefined,
          shipping: useDifferentShipping ? shipping : form
        })
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentUrl(data?.payment_url || "");
        setShowPaymentModal(true);
        setMessage(t("order_success"));
        clearCart();
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          company: "",
          address_1: "",
          city: "",
          postcode: "",
          country: "PL",
          vat_number: ""
        });
        setShipping({
          first_name: "",
          last_name: "",
          phone: "",
          address_1: "",
          city: "",
          postcode: "",
          country: "PL",
        });
        setUseDifferentShipping(false);
      } else {
        setMessage(`❌ ${t("order_error")} ${data.error || "Nieznany błąd"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(t("order_error_unknown"));
    }

    setLoading(false);
  };

  if (!line_items.length && !showPaymentModal) {
    return <div className="p-8 text-center text-lg"><EmptyCart /></div>;
  }
    return (
        <div className="bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A]  relative">
                        <PaymentModal
  isOpen={showPaymentModal}
  paymentUrl={paymentUrl}
/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="relative z-10 py-16"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >            
                
                <nav className="mb-8 text-sm text-neutral-400">
                <Link href="/"><span>{t("homePage")}</span></Link> / <Link href="/products"><span>{t("products")}</span></Link> / <Link href="/cart"><span>{t("cart")}</span></Link> / <span className="text-white">Checkout</span>
              </nav>
                    {/* Header */}
                    <motion.div className="text-center mb-12" variants={fadeInUp}>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="bg-[#EB4036] p-3 rounded-xl">
                                <ShoppingCart className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-white">{t("checkout_title")}</h1>
                        </div>
                        <p className="text-[#A5A5A5] text-lg">{t("checkout_subtitle")}</p>

                        {/* Debug info - pokaż ile produktów w koszyku */}
                        <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
                            <p className="text-blue-300">
                                {t("cart_debug1")} {line_items.length} |
                                {t("cart_debug2")} {line_items.reduce((sum:any, item:any) => sum + item.quantity, 0)}
                            </p>
                        </div>
                    </motion.div>

                    <div className="flex max-lg:flex-col w-full gap-16">
                        {/* Form Section */}
                        <motion.div className="lg:w-[60%]" variants={fadeInUp}>
                            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] p-8 shadow-2xl">
                                {/* Form Header */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-[#EB4036] p-3 rounded-xl">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">{t("form_header")}</h3>
                                            <p className="text-[#A5A5A5]">{t("form_subtitle")}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6" onSubmit={handleSubmit}>
                                    {/* Personal Info */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <User className="w-4 h-4 text-[#EB4036]" />
                                                {t("first_name")}
                                            </label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={form.first_name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="Wprowadź imię"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <User className="w-4 h-4 text-[#EB4036]" />
                                                {t("last_name")}
                                            </label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={form.last_name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="Wprowadź nazwisko"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <Mail className="w-4 h-4 text-[#EB4036]" />
                                                {t("email")}
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="przykład@email.com"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <Phone className="w-4 h-4 text-[#EB4036]" />
                                                {t("phone")}
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="+48 123 456 789"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Company Info */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <Building2 className="w-4 h-4 text-[#EB4036]" />
                                                {t("company")}
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={form.company}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="Nazwa firmy"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <FileText className="w-4 h-4 text-[#EB4036]" />
                                                {t("vat_number")}
                                            </label>
                                            <input
                                                type="text"
                                                name="vat_number"
                                                value={form.vat_number}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="1234567890"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Address */}
                                    <motion.div variants={fadeInUp}>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                            <MapPin className="w-4 h-4 text-[#EB4036]" />
                                            {t("address")}
                                        </label>
                                        <input
                                            type="text"
                                            name="address_1"
                                            value={form.address_1}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                            placeholder="Ulica i numer"
                                        />
                                    </motion.div>

                                    {/* City & Postal Code & Country */}
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <Building2 className="w-4 h-4 text-[#EB4036]" />
                                                {t("city")}
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={form.city}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="Warszawa"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <MapPin className="w-4 h-4 text-[#EB4036]" />
                                                {t("postcode")}
                                            </label>
                                            <input
                                                type="text"
                                                name="postcode"
                                                value={form.postcode}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="00-000"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <Globe className="w-4 h-4 text-[#EB4036]" />
                                                {t("country")}
                                            </label>
                                            <select
                                                name="country"
                                                value={form.country}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                            >
                                                <option value="PL">{t("country_pl")}</option>
                                                <option value="DE">{t("country_de")}</option>
                                                <option value="FR">{t("country_fr")}</option>
                                                <option value="IT">{t("country_it")}</option>
                                                <option value="CZ">{t("country_cz")}</option>
                                                <option value="SK">{t("country_sk")}</option>
                                            </select>
                                        </motion.div>
                                    </div>



{/* CHECKBOX DIFFRENT ADDRESS */}
<div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={useDifferentShipping}
                    onChange={(e) => setUseDifferentShipping(e.target.checked)}
                  />
                  <label className="text-white font-medium flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#EB4036]" /> {t("different_shipping")}
                  </label>
                </div>





                {/* Shipping form */}
{useDifferentShipping && (

<>                                    <div className="grid md:grid-cols-2 gap-6">
                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <User className="w-4 h-4 text-[#EB4036]" />
                                                {t("first_name")}
                                            </label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={shipping.first_name}
                                                onChange={handleChangeShiping}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="Wprowadź imię"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <User className="w-4 h-4 text-[#EB4036]" />
                                                {t("last_name")}
                                            </label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={shipping.last_name}
                                                onChange={handleChangeShiping}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="Wprowadź nazwisko"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="grid md:grid-cols-2 gap-6">


                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <Phone className="w-4 h-4 text-[#EB4036]" />
                                                {t("phone")}
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={shipping.phone}
                                                onChange={handleChangeShiping}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="+48 123 456 789"
                                            />
                                        </motion.div>
                                    </div>


                                    {/* Address */}
                                    <motion.div variants={fadeInUp}>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                            <MapPin className="w-4 h-4 text-[#EB4036]" />
                                            {t("address")}
                                        </label>
                                        <input
                                            type="text"
                                            name="address_1"
                                            value={shipping.address_1}
                                            onChange={handleChangeShiping}
                                            required
                                            className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                            placeholder="Ulica i numer"
                                        />
                                    </motion.div>

                                    {/* City & Postal Code & Country */}
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <Building2 className="w-4 h-4 text-[#EB4036]" />
                                                {t("city")}
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={shipping.city}
                                                onChange={handleChangeShiping}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="Warszawa"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <MapPin className="w-4 h-4 text-[#EB4036]" />
                                                {t("postcode")}
                                            </label>
                                            <input
                                                type="text"
                                                name="postcode"
                                                value={shipping.postcode}
                                                onChange={handleChangeShiping}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                                placeholder="00-000"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                                <Globe className="w-4 h-4 text-[#EB4036]" />
                                                {t("country")}
                                            </label>
                                            <select
                                                name="country"
                                                value={shipping.country}
                                                onChange={handleChangeShiping}
                                                required
                                                className="w-full px-4 py-4 bg-[#2A2A2A] border border-[#404040] text-white rounded-xl focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all duration-300"
                                            >
                                                <option value="PL">{t("country_pl")}</option>
                                                <option value="DE">{t("country_de")}</option>
                                                <option value="FR">{t("country_fr")}</option>
                                                <option value="IT">{t("country_it")}</option>
                                                <option value="CZ">{t("country_cz")}</option>
                                                <option value="SK">{t("country_sk")}</option>
                                            </select>
                                        </motion.div>
                                    </div></>


)}

                                    {/* Messages */}
                                    {message && message.includes("✅") && (
                                        <motion.div
                                            className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400"
                                            variants={scaleIn}
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            <span>{message}</span>
                                        </motion.div>
                                    )}

                                    {message && message.includes("❌") && (
                                        <motion.div
                                            className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400"
                                            variants={scaleIn}
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                            <span>{message}</span>
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <motion.div variants={fadeInUp}>
                                        <motion.button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-[#EB4036] to-[#d63629] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>{t("sending")}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    <span>{t("submit")}</span>
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
                                            {t("privacy_policy_text")}
                                            <Link href="/privacy-policy">

                                                <span className="text-[#EB4036] hover:text-white transition-colors ml-1 cursor-pointer">
                                                    {t("privacy_policy")}
                                                </span>,
                                            </Link>
                                            <Link href="/terms">

                                                <span className="text-[#EB4036] hover:text-white transition-colors ml-1 cursor-pointer">
                                                    {tTerms("title")}
                                                </span>,
                                            </Link>
                                        </span>
                                    </motion.div>
                                </div>


                            </div>
                        </motion.div>

                        {/* Info Section */}
                        <motion.div className="lg:w-[40%] flex flex-col gap-8" variants={fadeInUp}>
                            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl border border-[#404040] p-8 shadow-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-[#EB4036] p-3 rounded-xl">
                                        <Package className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white uppercase">
                                        {t("order_overview")}
                                    </h2>
                                </div>

                                <p className="text-[#A5A5A5] text-lg leading-relaxed mb-8">
                                    {t("order_description")}
                                </p>

                                {/* Koszyk - z twoich danych */}
                                {line_items.length > 0 && (
                                    <div className="mb-6 p-4 bg-[#2A2A2A] rounded-xl border border-[#404040]">
                                        <h4 className="text-white font-semibold mb-3">{t("cart_products")}</h4>
                                        {cartItems.map((item:any) => (
                                            <div key={item.product_id} className="flex justify-between text-[#A5A5A5] mb-2 items-center gap-2">                            
                                                <img
                            src={item.images[0]?.src}
                            alt={item?.meta_data_parsed?.locales?.[locale]?.title}
                            className="w-[30%]  object-cover rounded-lg"
                        />
<div className="flex flex-col gap-3">                                                <span>{item?.meta_data_parsed?.locales?.[locale]?.title}</span>
<span>{t("count")}: {item.quantity}</span></div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Order Features */}
                                <div className="space-y-6">
                                    {[                                        {
                                            icon: Wallet,
                                            title: totalPrice + " PLN",
                                            description: tCart("total")
                                        },
                                        {
                                            icon: CheckCircle,
                                            title: t("feature_fast"),
                                            description: t("feature_fast_desc")
                                        },
                                        {
                                            icon: Shield,
                                            title: t("feature_secure"),
                                            description: t("feature_secure_desc")
                                        },
                                        {
                                            icon: Star,
                                            title: t("feature_quality"),
                                            description: t("feature_quality_desc")
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
                                    {t("trust_customers")}
                                </h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-[#EB4036]">500+</div>
                                        <div className="text-xs text-[#A5A5A5]">{tFooter("happyClients")}</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-[#EB4036]">10+</div>
                                        <div className="text-xs text-[#A5A5A5]">{tFooter("experienceYears")}</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-[#EB4036]">5.0★</div>
                                        <div className="text-xs text-[#A5A5A5]">{tFooter("averageRating")}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}