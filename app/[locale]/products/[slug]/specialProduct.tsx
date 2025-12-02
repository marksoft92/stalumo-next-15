"use client";
import { useState, useEffect, useTransition } from "react";
import VariantSelector from "./variants";
import { useCartStore } from "@/store/cartStore";
import {
    Star,
    Truck,
    Shield,
    Clock,
    ChevronLeft,
    ChevronRight,
    Heart,
    Share2,
    ShoppingCart,
    Plus,
    Minus,
    Flame,
    Award,
    CheckCircle,
    Users,
    Package,
    ArrowRight,
    Zap,
    ThermometerSun,
    Wind,
    Repeat,
    Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Video from "@/components/Video";

// Snowflake component
const Snowflake = ({ delay, left }: { delay: number; left: string }) => {
    return (
        <div
            className="absolute text-white/20 text-sm animate-fall pointer-events-none"
            style={{
                left,
                animationDelay: `${delay}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
            }}
        >
            ❄
        </div>
    );
};


const getVariantFromSlug = (slug: string) => {
    // Przykład slug: stalumo-stojak-choinkowy-choinka-zloty-duzy
    const parts = slug.split('-');

    // Znajdź typ produktu
    let type = 'tree';
    if (parts.includes('sniezynka') || parts.includes('snowflake') || parts.includes('schneeflocke')) {
        type = 'snowflake';
    } else if (parts.includes('gwiazda') || parts.includes('star') || parts.includes('stern')) {
        type = 'star';
    }

    // Znajdź kolor (ostatni przed rozmiarem)
    const colorMap: any = {
        'zloty': 'gold', 'gold': 'gold',
        'srebrny': 'silver', 'silver': 'silver', 'silber': 'silver',
        'czarny': 'black', 'black': 'black', 'schwarz': 'black',
        'miedziany': 'copper', 'copper': 'copper', 'kupfer': 'copper',
        'szampanski': 'champagne', 'champagne': 'champagne', 'champagner': 'champagne'
    };

    // Znajdź rozmiar (ostatni element)
    const sizeMap: any = {
        'duzy': 'large', 'large': 'large', 'gross': 'large',
        'sredni': 'medium', 'medium': 'medium', 'mittel': 'medium',
        'maly': 'small', 'small': 'small', 'klein': 'small'
    };

    let color = 'gold';
    let size = 'large';

    for (const part of parts) {
        if (colorMap[part]) color = colorMap[part];
        if (sizeMap[part]) size = sizeMap[part];
    }

    return { type, color, size };
};

const ProductBox = ({ productData, locale }: any) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<any>(0);
    const [quantity, setQuantity] = useState<any>(1);
    const [activeTab, setActiveTab] = useState<any>('description');
    const [isWishlisted, setIsWishlisted] = useState<any>(false);
    const [currentReview, setCurrentReview] = useState<any>(0);
    const addItem = useCartStore((state: any) => state.addItem);
    const { type, color, size } = getVariantFromSlug(productData.slug);
    const iconsMap: Record<string, any> = {
        Star,
        Truck,
        Shield,
        Clock,
        ChevronLeft,
        ChevronRight,
        Heart,
        Share2,
        ShoppingCart,
        Plus,
        Minus,
        Flame,
        Award,
        CheckCircle,
        Users,
        Package,
        ArrowRight,
        Zap,
        ThermometerSun,
        Wind, Repeat
    }

    const nextImage = () => {
        setSelectedImageIndex((prev: any) => (prev + 1) % productData.images.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prev: any) => (prev - 1 + productData.images.length) % productData.images.length);
    };

    const difference = Math.round(((productData.regular_price * 1 - productData.sale_price * 1) / productData.regular_price) * 100);

    const t = useTranslations("Products")
    const tHeader = useTranslations("Header")

    const lineItems = useCartStore((state: any) => state.line_items);
    const currency = locale === 'pl' ? 'zł' : 'PLN'

    return (
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 min-h-screen text-white relative overflow-hidden">

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 opacity-50"></div>

                {/* Sparkle decorations */}
                <div className="absolute top-20 left-10 text-yellow-400 animate-pulse">
                    <Sparkles className="w-8 h-8" />
                </div>
                <div className="absolute top-40 right-20 text-yellow-300 animate-pulse delay-100">
                    <Sparkles className="w-6 h-6" />
                </div>

                <div className="container mx-auto px-4 sm:px-8 lg:px-24 py-12 relative z-10">

                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm text-neutral-300">
                        <Link href="/"><span className="hover:text-yellow-400 transition-colors">{tHeader("home")}</span></Link> / <Link href="/products"><span className="hover:text-yellow-400 transition-colors">{t("title")}</span></Link> / <span className="text-yellow-400">{productData.title}</span>
                    </nav>

                    {/* Product Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent py-4">
                                {productData.title}
                            </h1>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(productData.reviews?.rating) ? 'text-yellow-400 fill-current' : 'text-neutral-600'}`}
                                    />
                                ))}
                                <span className="ml-2 text-lg font-semibold">{productData.reviews?.rating}</span>
                                <span className="text-neutral-300">({productData.reviews?.reviewCount} {t("opinions")})</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm bg-yellow-600/20 px-3 py-1 rounded-full border border-yellow-600/30">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                <span className="text-yellow-400">Bestseller</span>
                            </div>
                        </div>
                    </div>
                    <VariantSelector
                        productType={type}
                        currentColor={color}
                        currentSize={size}
                        locale={locale}
                    />
                    {/* Main Product Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                        {/* Image Gallery */}
                        <div className="space-y-6">
                            {/* Main Image */}
                            <div className="relative group">
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 border border-yellow-600/30 shadow-lg shadow-yellow-600/10">
                                    <img
                                        src={productData.images?.[selectedImageIndex]?.src}
                                        alt="Zdjęcie produktu"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-600/80 hover:bg-yellow-700 backdrop-blur-sm rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 border border-yellow-500/40"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-600/80 hover:bg-yellow-700 backdrop-blur-sm rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 border border-yellow-500/40"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="grid grid-cols-4 gap-4">
                                {([...productData?.images])?.map((img: any, index: any) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(img?.type === 'video' ? 0 : index)}
                                        className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 border-2 ${selectedImageIndex === index
                                            ? "border-yellow-500 opacity-100 scale-105 shadow-lg shadow-yellow-500/30"
                                            : "border-neutral-700 opacity-70 hover:opacity-100 hover:border-yellow-600/50"
                                            }`}
                                    >
                                        {img?.type === 'video' ? (
                                            <Video
                                                src={img.src}
                                                poster={productData.images[0]?.src}
                                            />
                                        ) : (
                                            img?.src && <img
                                                src={img?.src}
                                                alt={`Miniatura ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">

                            {/* Price Section */}
                            <div className="space-y-4 bg-gradient-to-br from-yellow-600/10 to-yellow-700/10 p-6 rounded-2xl border border-yellow-600/30">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl text-neutral-400 line-through">{productData?.regular_price}&nbsp;{currency}</span>
                                    <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold border border-green-500/40">
                                        -{difference}%
                                    </span>
                                </div>
                                <div className="text-4xl lg:text-5xl font-bold text-yellow-400">{productData?.sale_price}&nbsp;{currency}</div>
                                <div className="flex items-center gap-2 text-yellow-200">
                                    <Truck className="w-5 h-5" />
                                    <span>{t("freeShiping")}</span>
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="grid grid-cols-2 gap-4">
                                {(productData?.features || []).map((feature: any, index: number) => {
                                    const IconComponent = iconsMap[feature.icon];
                                    return (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm p-4 rounded-xl border border-yellow-700/30 hover:border-yellow-600/50 transition-colors"
                                        >
                                            {IconComponent && <IconComponent className="w-8 h-8 text-yellow-400 mb-2" />}
                                            <div className="font-semibold text-white">{feature.title}</div>
                                            <div className="text-sm text-neutral-300">{feature.subtitle}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-neutral-300">{t("productQuantity")}:</span>
                                    <div className="flex items-center bg-neutral-800 rounded-lg border border-yellow-700/30">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-3 hover:bg-yellow-900/30 rounded-l-lg transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 py-3 min-w-[60px] text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-3 hover:bg-yellow-900/30 rounded-r-lg transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => addItem(productData.id, quantity)}
                                    className="w-full bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-600 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/40 flex items-center justify-center gap-3 border border-yellow-500/40 bg-[length:200%_100%] hover:bg-right">
                                    <ShoppingCart className="w-6 h-6" />
                                    {t("productAddToCart")}
                                </button>
                            </div>

                            {/* Availability */}
                            <div className="space-y-3">
                                {(productData.availability || []).map((line: any, i: any) => (
                                    <div key={i} className="flex items-center gap-3 text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>{line}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-24 py-16">
                <div className="mb-8">
                    <div className="flex flex-wrap gap-1 bg-neutral-800/50 p-1 rounded-xl backdrop-blur-sm justify-center md:justify-start border border-yellow-700/20">
                        {[
                            { id: 'description', label: t("productDescription"), icon: Package },
                            { id: 'specs', label: t("productSpecification"), icon: Award },
                            { id: 'advantages', label: t("productAdvantages"), icon: Flame },
                            { id: 'included', label: t("productIncluded"), icon: CheckCircle }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg border border-yellow-500/40'
                                    : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 border border-yellow-700/30">
                    {activeTab === 'description' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6 text-yellow-300">{t("productFullDescription")}</h2>
                            {(productData.description || [])?.map((desc: any, i: any) => (
                                <p key={i} className="text-neutral-300 text-lg leading-relaxed">
                                    {desc}
                                </p>
                            ))}
                        </div>
                    )}

                    {activeTab === 'specs' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6 text-yellow-300">{t("productTechnicalSpecification")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {productData.specifications.map((spec: any, i: any) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-lg border border-yellow-700/20">
                                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-300">{spec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'advantages' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6 text-yellow-300">{t("productKeyAdvantages")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {productData.advantages.map((advantage: any, i: any) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 rounded-lg border border-yellow-500/30">
                                        <Flame className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-300">{advantage}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'included' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6 text-yellow-300">{t("productIncluded")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {productData.included.map((item: any, i: any) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-lg border border-yellow-700/20">
                                        <Package className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-24 py-16">
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-yellow-300">{t("review")}</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-yellow-400" />
                                <span className="text-neutral-300">{productData.reviews?.reviewCount} {t("opinions")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Rating Summary */}
                    <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-yellow-700/30">
                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2 text-yellow-400">{productData.reviews?.rating}</div>
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-6 h-6 ${i < Math.floor(productData.reviews?.rating) ? 'text-yellow-400 fill-current' : 'text-neutral-600'}`}
                                        />
                                    ))}
                                </div>
                                <div className="text-neutral-300">{t("reviewLabel")} {productData.reviews?.reviewCount} {t("opinions")}</div>
                            </div>

                            <div className="flex-1 space-y-2">
                                {[5, 4, 3, 2, 1].map(stars => (
                                    <div key={stars} className="flex items-center gap-3">
                                        <span className="text-sm w-8">{stars}★</span>
                                        <div className="flex-1 bg-neutral-800 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full"
                                                style={{ width: `${stars === 5 ? '100' : stars === 4 ? '0' : '0'}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-neutral-400 w-8">{stars === 5 ? productData.reviews?.reviewCount : 0}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {(productData?.reviews?.reviewsList || [])?.map((review: any, i: any) => (
                            <div key={i} className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-700/20">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">{review.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <Star
                                                        key={starIndex}
                                                        className={`w-4 h-4 ${starIndex < review?.rating ? 'text-yellow-400 fill-current' : 'text-neutral-600'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-neutral-400">{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-neutral-300 leading-relaxed">{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Products */}


            {/* Guarantee Section */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-24 py-16">
                <div className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 rounded-2xl p-8 border border-yellow-500/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-4">
                            <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-yellow-600/30">
                                <Truck className="w-8 h-8 text-yellow-400" />
                            </div>
                            <h3 className="font-semibold text-xl text-yellow-300">{t("productFreeShipping")}</h3>
                            <p className="text-neutral-300">{t("productFreeShippingInfo")}ł</p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-yellow-600/30">
                                <Shield className="w-8 h-8 text-yellow-400" />
                            </div>
                            <h3 className="font-semibold text-xl text-yellow-300">{t("productWarranty")}</h3>
                            <p className="text-neutral-300">{t("productFullProtection")}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-yellow-600/30">
                                <Clock className="w-8 h-8 text-yellow-400" />
                            </div>
                            <h3 className="font-semibold text-xl text-yellow-300">{t("productFastShipping")}</h3>
                            <p className="text-neutral-300">{t("productFastShippingInfo")}</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(20px);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
        </div>
    );
};

export default ProductBox;