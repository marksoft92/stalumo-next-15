
"use client";
import Image from "next/image";
import Link from "next/link";



import { motion } from "framer-motion";
import { Eye, ShoppingCart, Star, ArrowRight, Heart, TrendingUp } from "lucide-react";
import { useState } from "react";

type ProductCardProps = {
  title: string;
  imageUrl: string;
  price: number;
  slug: string;
};

// Server component wrapper
export default function ProductCard({
  title,
  imageUrl,
  price,
  slug,
}: ProductCardProps) {
  return <ProductCardClient title={title} imageUrl={imageUrl} price={price} slug={slug} />;
}

// Client component with animations
function ProductCardClient({
  title,
  imageUrl,
  price,
  slug,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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
      <Link href={slug} className="block">
        <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl overflow-hidden shadow-xl border border-neutral-700/50 hover:border-red-500/30 transition-all duration-500">
          
          {/* Top badges */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
            >
              <TrendingUp className="w-3 h-3" />
              HOT
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
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isLiked ? 'text-red-500 fill-red-500' : 'text-white'
              }`} 
            />
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
                className="w-full h-52 object-cover"
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
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
                className="flex-1 bg-white/20 backdrop-blur-sm text-white py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Podgląd
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.preventDefault()}
                className="bg-red-600/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
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
                  <Star className={`w-4 h-4 ${
                    i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'
                  }`} />
                </motion.div>
              ))}
              <span className="text-neutral-400 text-sm ml-2">(4.0)</span>
            </div>

            {/* Title */}
            <motion.h3
              animate={{ color: isHovered ? '#ef4444' : '#ffffff' }}
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
                  className="text-red-500 font-bold text-xl"
                >
                  {price} zł
                </motion.p>
                <p className="text-neutral-500 text-sm line-through">
                  {Math.round(price * 1.2)} zł
                </p>
              </div>
              
              {/* Discount badge */}
              <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                -17%
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
            >
              Zobacz produkt
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>

            {/* Features */}
            <div className="flex gap-2 text-xs">
              <span className="bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full">
                Darmowa dostawa
              </span>
              <span className="bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full">
                24h
              </span>
            </div>
          </div>

          {/* Shine effect */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ 
              x: isHovered ? "100%" : "-100%", 
              opacity: isHovered ? 0.3 : 0 
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 pointer-events-none"
          />

          {/* Glow effect */}
          <motion.div
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-red-500/10 rounded-2xl -z-10 blur-xl"
          />
        </div>
      </Link>
    </motion.div>
  );
}