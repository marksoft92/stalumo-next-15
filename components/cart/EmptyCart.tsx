import { useState } from "react";
import { motion } from "framer-motion";
import {
    ShoppingCart,
    ArrowLeft,
    Search,
    Sparkles,
    Gift,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

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



const floatingAnimation = {
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};


export default function EmptyCart() {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
    const t = useTranslations("Cart")
    return (
        <div className="relative">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#EB4036]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#EB4036]/3 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="relative z-10 py-16"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    {/* Main Empty Cart Section */}
                    <motion.div className="text-center mb-16" variants={fadeInUp}>
                        <div className="flex flex-col items-center">
                            {/* Animated Cart Icon */}
                            <motion.div
                                className="relative mb-8"
                                animate={floatingAnimation}
                            >
                                <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border-2 border-[#404040] rounded-3xl p-8 shadow-2xl">
                                    <ShoppingCart className="w-24 h-24 text-[#A5A5A5]" strokeWidth={1.5} />

                                    {/* Floating sparkles */}
                                    <motion.div
                                        className="absolute -top-2 -right-2"
                                        animate={{
                                            rotate: [0, 360],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <Sparkles className="w-8 h-8 text-[#EB4036]" />
                                    </motion.div>

                                    <motion.div
                                        className="absolute -bottom-2 -left-2"
                                        animate={{
                                            rotate: [360, 0],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1
                                        }}
                                    >
                                        <Gift className="w-6 h-6 text-[#EB4036]/70" />
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Header Text */}
                            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-[#A5A5A5] bg-clip-text text-transparent">
                                {t("emptyCartTitle")}
                            </h1>

                            <p className="text-[#A5A5A5] text-xl mb-8 max-w-2xl leading-relaxed">
                                {t("emptyCartDescription")}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">


                                <Link href="/products">
                                    <motion.button
                                        className="bg-gradient-to-r from-[#2A2A2A] to-[#3A3A3A] text-white font-semibold py-4 px-8 rounded-xl border border-[#404040] hover:border-[#EB4036] transition-all duration-300 flex items-center justify-center gap-3 group"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                        <span>{t("backToShop")}</span>
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>




                </motion.div>
            </div>
        </div>
    );
}