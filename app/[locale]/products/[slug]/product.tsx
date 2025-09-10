"use client";
import { useState, useEffect, useTransition } from "react";
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

} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";


const ProductBox = ({ productData, locale }: any) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

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
    setSelectedImageIndex((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length);
  };

  const difference = Math.round(((productData.regular_price * 1 - productData.sale_price * 1) / productData.regular_price) * 100);

  const t = useTranslations("Products")
  const tHeader = useTranslations("Header")



  const lineItems = useCartStore((state) => state.line_items);
  const currency = locale === 'pl' ? 'zł' : 'PLN'


  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-8 lg:px-24 py-12 relative z-10">

          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-neutral-400">
            <Link href="/"><span>{tHeader("home")}</span></Link> / <Link href="/products"><span>{t("title")}</span></Link> / <span className="text-white">{productData.title}</span>
          </nav>

          {/* Product Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent py-4">
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
                <span className="text-neutral-400">({productData.reviews?.reviewCount} {t("opinions")})</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400">Bestseller</span>
              </div>
            </div>
          </div>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

            {/* Image Gallery */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative group">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
                  <img
                    src={productData.images?.[selectedImageIndex]?.src}
                    alt="Zdjęcie produktu"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">

                {(productData?.images || [])?.map((img: any, index: any) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${selectedImageIndex === index
                      ? "ring-2 ring-red-500 opacity-100 scale-105"
                      : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img?.src}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">

              {/* Price Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-neutral-400 line-through">{productData?.regular_price}&nbsp;{currency}</span>
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{difference}%
                  </span>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-red-500">{productData?.sale_price}&nbsp;{currency}</div>
                <div className="flex items-center gap-2 text-neutral-300">
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
                      className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm p-4 rounded-xl border border-neutral-700/50"
                    >
                      {IconComponent && <IconComponent className="w-8 h-8 text-red-400 mb-2" />}
                      <div className="font-semibold text-white">{feature.title}</div>
                      <div className="text-sm text-neutral-400">{feature.subtitle}</div>
                    </div>
                  );
                })}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-neutral-300">{t("productQuantity")}:</span>
                  <div className="flex items-center bg-neutral-800 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-neutral-700 rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-3 min-w-[60px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-neutral-700 rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => addItem(productData.id, quantity)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-3">
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
          <div className="flex flex-wrap gap-1 bg-neutral-800/50 p-1 rounded-xl backdrop-blur-sm">
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
                  ? 'bg-white text-black shadow-lg'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50">
          {activeTab === 'description' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{t("productFullDescription")}</h2>
              {(productData.description || [])?.map((desc: any, i: any) => (
                <p key={i} className="text-neutral-300 text-lg leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{t("productTechnicalSpecification")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productData.specifications.map((spec: any, i: any) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-300">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'advantages' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{t("productKeyAdvantages")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productData.advantages.map((advantage: any, i: any) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20">
                    <Flame className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-300">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'included' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{t("productIncluded")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productData.included.map((item: any, i: any) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-lg">
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
            <h2 className="text-3xl font-bold">{t("review")}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-neutral-300">{productData.reviews?.reviewCount} {t("opinions")}</span>
              </div>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-neutral-700/50">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{productData.reviews?.rating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(productData.reviews?.rating) ? 'text-yellow-400 fill-current' : 'text-neutral-600'}`}
                    />
                  ))}
                </div>
                <div className="text-neutral-400">na podstawie {productData.reviews?.reviewCount} {t("opinions")}</div>
              </div>

              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm w-8">{stars}★</span>
                    <div className="flex-1 bg-neutral-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full"
                        style={{ width: `${stars === 5 ? '85' : stars === 4 ? '12' : '2'}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-neutral-400 w-8">{stars === 5 ? '108' : stars === 4 ? '15' : '4'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {(productData?.reviews?.reviewsList || [])?.map((review: any, i: any) => (
              <div key={i} className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50">
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
      <div className="container mx-auto px-4 sm:px-8 lg:px-24 py-16">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">{t("productRelatedProducts")}</h2>
            <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
              {t("productViewAll")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(productData.relatedProducts || []).map((product: any, i: any) => (
              <div key={i} className="group bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                <div className="aspect-square bg-neutral-800 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-white group-hover:text-red-300 transition-colors">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${starIndex < Math.floor(product?.rating) ? 'text-yellow-400 fill-current' : 'text-neutral-600'}`}
                      />
                    ))}
                    <span className="text-sm text-neutral-400 ml-1">({product?.rating})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">{productData.sale_price}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-neutral-500 line-through">{productData.regular_price}</span>
                    )}
                  </div>

                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-red-500/25">
                    <ShoppingCart className="w-4 h-4" />
                    Zobacz produkt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantee Section */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-24 py-16">
        <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-2xl p-8 border border-red-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="font-semibold text-xl">{t("productFreeShipping")}</h3>
              <p className="text-neutral-400">{t("productFreeShippingInfo")}ł</p>
            </div>

            <div className="space-y-4">
              <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="font-semibold text-xl">{t("productWarranty")}</h3>
              <p className="text-neutral-400">{t("productFullProtection")}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="font-semibold text-xl">{t("productFastShipping")}</h3>
              <p className="text-neutral-400">{t("productFastShippingInfo")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;