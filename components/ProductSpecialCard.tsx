"use client";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { Eye, ShoppingCart, Star, ArrowRight, Heart, TrendingUp, Sparkles } from "lucide-react";
import { use, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

type ProductCardProps = {
    title: string;
    imageUrl: string;
    price: number;
    slug: string;
    regular_price?: any;
    features?: any;
    currency?: any;
};

// Snowflake component
function Snowflake({ delay }: { delay: number }) {
    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{
                y: 400,
                opacity: [0, 1, 1, 0],
                x: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
            }}
            className="absolute text-white/40 text-xs"
            style={{ left: `${Math.random() * 100}%` }}
        >
            ❄
        </motion.div>
    );
}

// Server component wrapper
export default function ProductCard({
    title,
    imageUrl,
    price,
    slug,
    regular_price,
    features,
    currency
}: ProductCardProps) {
    return <ProductCardClient title={title} imageUrl={imageUrl} price={price} slug={slug} regular_price={regular_price} features={features} currency={currency} />;
}

// Client component with animations
function ProductCardClient({
    title,
    imageUrl,
    price,
    slug,
    regular_price,
    features,
    currency
}: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    const difference = Math.round(((regular_price - price) / regular_price) * 100);
    const t = useTranslations("Products")

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group"
        >
            <Link href={slug} className="block" onClick={() => setLoading(true)}>
                <div className="relative bg-gradient-to-br from-neutral-900 via-zinc-900 to-stone-900 rounded-2xl overflow-hidden shadow-xl border border-yellow-600/30 hover:border-yellow-500/50 transition-all duration-500">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"
                            />
                        </div>
                    )}

                    {/* Snowflakes */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                        {[...Array(8)].map((_, i) => (
                            <Snowflake key={i} delay={i * 0.4} />
                        ))}
                    </div>

                    {/* Christmas lights effect */}
                    <div className="absolute top-0 left-0 right-0 h-1 z-10">
                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(90deg, #ca8a04 0%, #eab308 25%, #fbbf24 50%, #facc15 75%, #ca8a04 100%)",
                                    "linear-gradient(90deg, #facc15 0%, #ca8a04 25%, #eab308 50%, #fbbf24 75%, #facc15 100%)",
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-full h-full"
                        />
                    </div>

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-yellow-50 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg border border-yellow-500/50"
                        >
                            <Sparkles className="w-3 h-3" />
                            ŚWIĄTECZNA
                        </motion.div>
                    </div>

                    {/* Favorite button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLiked(!isLiked);
                        }}
                        className="absolute top-4 right-4 z-20 w-10 h-10 bg-stone-900/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-yellow-900/50 transition-colors border border-yellow-600/40"
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${isLiked ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-200'
                                }`}
                        />
                        {isLiked && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [1, 1.5, 0] }}
                                transition={{ duration: 0.6 }}
                                className="absolute"
                            >
                                <Sparkles className="w-6 h-6 text-yellow-300" />
                            </motion.div>
                        )}
                    </motion.button>

                    {/* Image container with overlay */}
                    <div className="relative overflow-hidden">
                        <motion.div
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Image
                                src={imageUrl}
                                alt={title}
                                width={300}
                                height={300}
                                className="w-full h-[27rem] object-cover"
                            />
                        </motion.div>

                        {/* Christmas gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-yellow-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Sparkle effects on hover */}
                        {isHovered && (
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{
                                            scale: [0, 1, 0],
                                            opacity: [0, 1, 0],
                                            x: Math.random() * 300,
                                            y: Math.random() * 400,
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            delay: i * 0.2,
                                            repeat: Infinity,
                                        }}
                                        className="absolute top-0 left-0"
                                    >
                                        <Sparkles className="w-4 h-4 text-yellow-300" />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Quick action buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-4 left-4 right-4 flex gap-2"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => e.preventDefault()}
                                className="flex-1 bg-gradient-to-r from-yellow-700/80 to-yellow-800/80 backdrop-blur-sm text-yellow-50 py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:from-yellow-600/90 hover:to-yellow-700/90 transition-colors border border-yellow-600/40"
                            >
                                <Eye className="w-4 h-4" />
                                Podgląd
                            </motion.button>

                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 + 0.3 }}
                                >
                                    <Star className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'
                                        }`} />
                                </motion.div>
                            ))}
                            <span className="text-neutral-300 text-sm ml-2">(5.0)</span>
                        </div>

                        {/* Title */}
                        <motion.h3
                            animate={{ color: isHovered ? '#d97706' : '#ffffff' }}
                            transition={{ duration: 0.3 }}
                            className="font-bold text-lg leading-tight line-clamp-2 min-h-[3.5rem] flex items-center"
                        >
                            {title}
                        </motion.h3>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                            <div>
                                <motion.p
                                    animate={{ scale: isHovered ? 1.05 : 1 }}
                                    className="text-amber-600 font-bold text-xl"
                                >
                                    {price} {currency}
                                </motion.p>
                                <p className="text-neutral-400 text-sm line-through">
                                    {regular_price > price ? regular_price + " " + currency : ''}
                                </p>
                            </div>

                            {/* Discount badge */}
                            {difference > 0 && <motion.div
                                animate={{ rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-gradient-to-r from-green-800 to-emerald-900 text-green-100 px-2 py-1 rounded-full text-xs font-semibold border border-green-700/40"
                            >
                                - {difference}%
                            </motion.div>}

                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-amber-800 via-orange-800 to-amber-800 bg-[length:200%_100%] hover:bg-right text-amber-50 px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-500 group/btn border border-amber-700/40"
                            animate={{
                                backgroundPosition: isHovered ? '100% 0' : '0% 0',
                            }}
                        >
                            {t('checkProduct')}
                            <motion.div
                                animate={{ x: isHovered ? 4 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </motion.div>
                        </motion.button>

                        {/* Features */}
                        <div className="flex gap-2 text-xs">
                            {features.map((feature: any, index: number) => (
                                <span key={index} className="bg-gradient-to-r from-stone-800 to-zinc-800 text-amber-100 px-2 py-1 rounded-full text-center uppercase border border-amber-800/30">
                                    {feature}
                                </span>
                            ))}

                        </div>
                    </div>

                    {/* Golden shine effect */}
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{
                            x: isHovered ? "100%" : "-100%",
                            opacity: isHovered ? 0.4 : 0
                        }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600 to-transparent transform -skew-x-12 pointer-events-none"
                    />

                    {/* Christmas glow effect */}
                    <motion.div
                        animate={{
                            boxShadow: isHovered
                                ? "0 0 30px rgba(146, 64, 14, 0.4), 0 0 60px rgba(120, 53, 15, 0.2)"
                                : "0 0 0px rgba(146, 64, 14, 0)",
                        }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                    />

                </div>
            </Link>
        </motion.div>
    );
}