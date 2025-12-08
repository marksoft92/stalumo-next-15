"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Building2, MapPin, Package, CheckCircle, AlertCircle, Send, Loader2, Shield, Globe, FileText, Star, ShoppingCart, Truck, Wallet, Tag, X } from "lucide-react";
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
        .map((item: any) => {
            const product = products.find((p) => p.id === item.product_id);
            return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean);

    const subtotalPrice = cartItems.reduce(
        (sum: any, item: any) => sum + Number(item.sale_price) * item.quantity,
        0
    );

    // COUPON CODE STATES
    const [couponCode, setCouponCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState("");
    const [couponLoading, setCouponLoading] = useState(false);
    const [couponMessage, setCouponMessage] = useState("");
    const [couponDetails, setCouponDetails] = useState<any>(null);

    // Oblicz totalPrice PO rabacie
    const totalPrice = subtotalPrice - discountAmount;

    // billing
    const [form, setForm] = useState({
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
    const [shipping, setShipping] = useState({
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        address_1: "",
        city: "",
        postcode: "",
        country: "",
    });

    const [useDifferentShipping, setUseDifferentShipping] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState("");



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChangeShiping = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    // Apply coupon code
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponMessage("❌ " + (t("coupon_empty") || "Wprowadź kod rabatowy"));
            return;
        }

        setCouponLoading(true);
        setCouponMessage("");

        try {
            const response = await fetch("/api/validate-coupon", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: couponCode,
                    subtotal: subtotalPrice
                })
            });

            const data = await response.json();

            if (response.ok && data.valid) {
                const discountValue = Number(data.discount) || 0;
                setDiscountAmount(discountValue);
                setAppliedCoupon(data.code);
                setCouponDetails(data);
                setCouponMessage(
                    `✅ ${t("coupon_applied") || "Kod rabatowy zastosowany!"} ${data.discount_type === "percent" ? `(${data.amount}%)` : ""} Rabat: ${discountValue.toFixed(2)} PLN`
                );
                setCouponCode("");
            } else {
                setDiscountAmount(0);
                setAppliedCoupon("");
                setCouponDetails(null);
                setCouponMessage("❌ " + (data.error || t("coupon_invalid") || "Nieprawidłowy kod rabatowy"));
            }
        } catch (err) {
            console.error(err);
            setDiscountAmount(0);
            setAppliedCoupon("");
            setCouponDetails(null);
            setCouponMessage("❌ " + (t("coupon_error") || "Błąd podczas sprawdzania kodu"));
        }

        setCouponLoading(false);
    };

    // Remove applied coupon
    const handleRemoveCoupon = () => {
        setDiscountAmount(0);
        setAppliedCoupon("");
        setCouponCode("");
        setCouponMessage("");
        setCouponDetails(null);
    };

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
                    shipping: useDifferentShipping ? shipping : form,
                    coupon_code: appliedCoupon || undefined,
                    discount_amount: discountAmount
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
                setDiscountAmount(0);
                setAppliedCoupon("");
                setCouponDetails(null);
                setCouponMessage("");
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
        return <EmptyCart />;
    }

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A] py-12 px-4 sm:px-6 lg:px-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
        >
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                paymentUrl={paymentUrl}
            />

            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <motion.div variants={fadeInUp} className="mb-8 flex items-center gap-2 text-sm text-neutral-400">
                    <Link href="/" className="hover:text-[#EB4036] transition-colors">
                        {t("homePage")}
                    </Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-[#EB4036] transition-colors">
                        {t("products")}
                    </Link>
                    <span>/</span>
                    <Link href="/cart" className="hover:text-[#EB4036] transition-colors">
                        {t("cart")}
                    </Link>
                    <span>/</span>
                    <span className="text-white font-medium">Checkout</span>
                </motion.div>

                {/* Header */}
                <motion.div variants={fadeInUp} className="text-center mb-12">
                    <motion.div className="flex items-center justify-center gap-4 mb-4" variants={scaleIn}>
                        <div className="bg-[#EB4036] p-3 rounded-xl">
                            <ShoppingCart className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            {t("checkout_title")}
                        </h1>
                    </motion.div>
                    <p className="text-[#A5A5A5] text-lg max-w-2xl mx-auto">
                        {t("checkout_subtitle")}
                    </p>
                </motion.div>

                {/* Debug info */}
                <div className="text-center mb-8 text-sm p-3 bg-blue-500/20 rounded-lg text-blue-300">
                    {t("cart_debug1")} {line_items.length} | {t("cart_debug2")} {line_items.reduce((sum: any, item: any) => sum + item.quantity, 0)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <motion.div variants={fadeInUp} className="lg:col-span-2">
                        <motion.div
                            className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl shadow-xl p-8 border border-[#404040]"
                            variants={scaleIn}
                        >
                            {/* Form Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-[#EB4036] p-3 rounded-xl">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{t("form_header")}</h2>
                                        <p className="text-[#A5A5A5]">{t("form_subtitle")}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                            <User className="inline w-4 h-4 text-[#EB4036]" />
                                            {t("first_name")}
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={form.first_name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            {t("last_name")}
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={form.last_name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                            <Mail className="inline w-4 h-4 text-[#EB4036]" />
                                            {t("email")}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                            <Phone className="inline w-4 h-4 text-[#EB4036]" />
                                            {t("phone")}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Company Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                            <Building2 className="inline w-4 h-4 text-[#EB4036]" />
                                            {t("company")}
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={form.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                            <FileText className="inline w-4 h-4 text-[#EB4036]" />
                                            {t("vat_number")}
                                        </label>
                                        <input
                                            type="text"
                                            name="vat_number"
                                            value={form.vat_number}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                        <MapPin className="inline w-4 h-4 text-[#EB4036]" />
                                        {t("address")}
                                    </label>
                                    <input
                                        type="text"
                                        name="address_1"
                                        value={form.address_1}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                    />
                                </div>

                                {/* City & Postal Code & Country */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            {t("city")}
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            {t("postcode")}
                                        </label>
                                        <input
                                            type="text"
                                            name="postcode"
                                            value={form.postcode}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                            <Globe className="inline w-4 h-4 text-[#EB4036]" />
                                            {t("country")}
                                        </label>
                                        <select
                                            name="country"
                                            value={form.country}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                        >
                                            <option value="PL">{t("country_pl")}</option>
                                            <option value="DE">{t("country_de")}</option>
                                            <option value="FR">{t("country_fr")}</option>
                                            <option value="IT">{t("country_it")}</option>
                                            <option value="CZ">{t("country_cz")}</option>
                                            <option value="SK">{t("country_sk")}</option>
                                        </select>
                                    </div>
                                </div>

                                {/* CHECKBOX DIFFERENT ADDRESS */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="differentShipping"
                                        checked={useDifferentShipping}
                                        onChange={(e) => setUseDifferentShipping(e.target.checked)}
                                        className="w-4 h-4 text-[#EB4036] border-[#404040] rounded focus:ring-[#EB4036]"
                                    />
                                    <label htmlFor="differentShipping" className="text-sm text-white font-medium flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-[#EB4036]" />
                                        {t("different_shipping")}
                                    </label>
                                </div>

                                {/* Shipping form */}
                                {useDifferentShipping && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-white mb-2">
                                                    {t("first_name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value={shipping.first_name}
                                                    onChange={handleChangeShiping}
                                                    required
                                                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white mb-2">
                                                    {t("last_name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    value={shipping.last_name}
                                                    onChange={handleChangeShiping}
                                                    required
                                                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                                <Phone className="inline w-4 h-4 text-[#EB4036]" />
                                                {t("phone")}
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={shipping.phone}
                                                onChange={handleChangeShiping}
                                                required
                                                className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                            />
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                {t("address")}
                                            </label>
                                            <input
                                                type="text"
                                                name="address_1"
                                                value={shipping.address_1}
                                                onChange={handleChangeShiping}
                                                required
                                                className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                            />
                                        </div>

                                        {/* City & Postal Code & Country */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-white mb-2">
                                                    {t("city")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={shipping.city}
                                                    onChange={handleChangeShiping}
                                                    required
                                                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white mb-2">
                                                    {t("postcode")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="postcode"
                                                    value={shipping.postcode}
                                                    onChange={handleChangeShiping}
                                                    required
                                                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white mb-2">
                                                    {t("country")}
                                                </label>
                                                <select
                                                    name="country"
                                                    value={shipping.country}
                                                    onChange={handleChangeShiping}
                                                    required
                                                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                                >
                                                    <option value="PL">{t("country_pl")}</option>
                                                    <option value="DE">{t("country_de")}</option>
                                                    <option value="FR">{t("country_fr")}</option>
                                                    <option value="IT">{t("country_it")}</option>
                                                    <option value="CZ">{t("country_cz")}</option>
                                                    <option value="SK">{t("country_sk")}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* COUPON CODE SECTION */}
                                <div className="border-t border-[#404040] pt-6 mt-6">
                                    <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                        <Tag className="inline w-4 h-4 text-[#EB4036]" />
                                        {t("coupon_code") || "Kod rabatowy"}
                                    </label>

                                    {appliedCoupon ? (
                                        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-green-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-green-400">
                                                        {t("coupon_applied_label") || "Zastosowano kod"}: <span className="font-bold">{appliedCoupon}</span>
                                                        {couponDetails?.discount_type === "percent" && (
                                                            <span className="ml-1 text-xs">({couponDetails.amount}%)</span>
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-green-400">
                                                        {t("discount") || "Rabat"}: -{discountAmount.toFixed(2)} PLN
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveCoupon}
                                                className="text-red-400 hover:text-red-300 transition-colors"
                                                aria-label="Usuń kupon"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                placeholder={t("coupon_placeholder") || "Wprowadź kod rabatowy"}
                                                className="flex-1 px-4 py-3 bg-[#2A2A2A] border border-[#404040] text-white placeholder-[#A5A5A5] rounded-lg focus:border-[#EB4036] focus:ring-2 focus:ring-[#EB4036]/20 transition-all"
                                                disabled={couponLoading}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleApplyCoupon}
                                                disabled={couponLoading || !couponCode.trim()}
                                                className="px-6 py-3 bg-gradient-to-r from-[#EB4036] to-[#d63629] text-white rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                            >
                                                {couponLoading ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    t("apply") || "Zastosuj"
                                                )}
                                            </button>
                                        </div>
                                    )}

                                    {couponMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`mt-2 p-3 rounded-lg text-sm ${couponMessage.includes("✅")
                                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                                                }`}
                                        >
                                            {couponMessage}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Messages */}
                                {message && message.includes("✅") && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        <p className="text-green-400">{message}</p>
                                    </motion.div>
                                )}

                                {message && message.includes("❌") && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                        <p className="text-red-400">{message}</p>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-[#EB4036] to-[#d63629] text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            {t("sending")}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t("submit")}
                                        </>
                                    )}
                                </motion.button>

                                {/* Privacy Policy */}
                                <p className="flex items-center gap-2 text-xs text-[#A5A5A5] text-center pt-4 border-t border-[#404040]">
                                    <Shield className="w-4 h-4 text-[#EB4036]" />
                                    <span>
                                        {t("privacy_policy_text")}{" "}
                                        <Link href="/privacy-policy" className="text-[#EB4036] hover:text-white transition-colors">
                                            {t("privacy_policy")}
                                        </Link>
                                        ,{" "}
                                        <Link href="/terms" className="text-[#EB4036] hover:text-white transition-colors">
                                            {tTerms("title")}
                                        </Link>
                                    </span>
                                </p>
                            </form>
                        </motion.div>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div variants={fadeInUp} className="lg:col-span-1 space-y-6">
                        <motion.div
                            className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl shadow-xl p-6 border border-[#404040]"
                            variants={scaleIn}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-[#EB4036] p-3 rounded-xl">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">{t("order_overview")}</h3>
                            </div>
                            <p className="text-[#A5A5A5] text-sm mb-6">{t("order_description")}</p>

                            {/* Koszyk */}
                            {line_items.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                        <ShoppingCart className="w-4 h-4 text-[#EB4036]" />
                                        {t("cart_products")}
                                    </h4>
                                    <div className="space-y-3">
                                        {cartItems.map((item: any) => (
                                            <div
                                                key={item.id}
                                                className="bg-[#2A2A2A] rounded-lg p-3 border border-[#404040] flex gap-3"
                                            >
                                                <img
                                                    src={item.images[0]?.src}
                                                    alt={item?.meta_data_parsed?.locales?.[locale]?.title}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-white">
                                                        {item?.meta_data_parsed?.locales?.[locale]?.title}
                                                    </p>
                                                    <p className="text-xs text-[#A5A5A5] mt-1">
                                                        {t("count")}: {item.quantity} × {Number(item.sale_price).toFixed(2)} PLN
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price Summary */}
                                    <div className="mt-4 pt-4 border-t border-[#404040] space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#A5A5A5]">{t("subtotal") || "Suma częściowa"}:</span>
                                            <span className="font-medium text-white">{subtotalPrice.toFixed(2)} PLN</span>
                                        </div>
                                        {discountAmount > 0 && (
                                            <div className="flex justify-between text-sm text-green-400">
                                                <span>{t("discount") || "Rabat"}:</span>
                                                <span className="font-medium">-{discountAmount.toFixed(2)} PLN</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#404040]">
                                            <span className="text-white">{tCart("total")}:</span>
                                            <span className="text-[#EB4036]">{totalPrice.toFixed(2)} PLN</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Order Features */}
                            <div className="space-y-4">
                                {[
                                    { icon: Wallet, title: totalPrice.toFixed(2) + " PLN", description: tCart("total") },
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
                                        className="flex gap-3 p-3 bg-[#2A2A2A]/50 rounded-lg border border-[#404040]/50"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="bg-[#EB4036]/20 p-2 rounded-lg">
                                            <feature.icon className="w-5 h-5 text-[#EB4036] flex-shrink-0" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                                            <p className="text-sm text-[#A5A5A5]">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl shadow-xl p-6 border border-[#404040]"
                            variants={scaleIn}
                        >
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-[#EB4036]" />
                                {t("trust_customers")}
                            </h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-[#EB4036] mb-1">500+</div>
                                    <div className="text-xs text-[#A5A5A5]">{tFooter("happyClients")}</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#EB4036] mb-1">10+</div>
                                    <div className="text-xs text-[#A5A5A5]">{tFooter("experienceYears")}</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#EB4036] mb-1">5.0★</div>
                                    <div className="text-xs text-[#A5A5A5]">{tFooter("averageRating")}</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}