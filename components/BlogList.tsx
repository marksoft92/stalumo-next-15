"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Clock,
  User,
  Wrench,
  Building2,
  Shield,
  Zap,
  Star,
  ChevronRight
} from "lucide-react";

interface BlogContent {
  slug: string;
  title: string;
  content: string;
  lang: string;
  date?: string;
  author?: string;
  readTime?: string;
  category?: string;
  featured?: boolean;
}

interface BlogPost {
  id: number;
  imgUrl: string;
  alt: string;
  pl: BlogContent;
  en: BlogContent;
  de: BlogContent;
}

const BlogList = ({ posts }: { posts: BlogPost[] }) => {
  const params = useParams();
  const locale = params?.locale as keyof BlogPost;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'konstrukcje':
      case 'constructions':
        return <Building2 className="w-4 h-4" />;
      case 'spawanie':
      case 'welding':
        return <Zap className="w-4 h-4" />;
      case 'balustrady':
      case 'railings':
        return <Shield className="w-4 h-4" />;
      case 'narzędzia':
      case 'tools':
        return <Wrench className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className="my-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post, index) => {
        const postContent = post[locale] as BlogContent;
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="mb-8"
          >
            <Link href={`/${locale}/blog/${postContent.slug}`}>
              <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-black to-gray-900 shadow-xl hover:shadow-[rgb(235,64,54)]/30 transition-all duration-500 border border-gray-700 hover:border-[rgb(235,64,54)]">
                {/* Featured Badge */}
                {postContent.featured && (
                  <motion.div
                    className="absolute top-4 left-4 z-10 bg-[rgb(235,64,54)] text-white px-3 py-1 rounded-full text-sm font-semibold"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Star className="w-3 h-3 inline mr-1" />
                    Wyróżnione
                  </motion.div>
                )}

                <div className={`flex gap-6 p-6 ${isEven ? 'flex-row' : 'flex-row-reverse'} max-lg:flex-col`}>
                  {/* Image Section */}
                  <motion.div
                    className="relative flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden rounded-lg w-80 h-64 max-lg:w-full max-lg:h-48">
                      <Image
                        src={post.imgUrl}
                        fill
                        alt={post.alt}
                        loading="lazy"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Glass Overlay Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-between flex-1 min-h-[240px]">
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-300">
                      {postContent.category && (
                        <motion.div
                          className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-md backdrop-blur-sm border border-slate-600"
                          whileHover={{ scale: 1.05 }}
                        >
                          {getCategoryIcon(postContent.category)}
                          <span>{postContent.category}</span>
                        </motion.div>
                      )}

                      {postContent.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{postContent.date}</span>
                        </div>
                      )}

                      {postContent.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{postContent.readTime}</span>
                        </div>
                      )}

                      {postContent.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{postContent.author}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <motion.h2
                      className="text-2xl font-bold text-[rgb(235,64,54)] mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2"
                      whileHover={{ x: isEven ? 5 : -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {postContent.title}
                    </motion.h2>

                    {/* Content Preview */}
                    <div
                      className="text-slate-300 leading-relaxed mb-6 flex-1"
                      dangerouslySetInnerHTML={{
                        __html: postContent?.content?.slice(0, 200) + "...",
                      }}
                    />

                    {/* Call to Action */}
                    <motion.div
                      className="flex items-center justify-between pt-4 border-t border-slate-600"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="flex items-center gap-2 text-[rgb(235,64,54)] font-semibold group-hover:gap-3 transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >

                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.div>

                      <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-5 h-5 text-slate-500" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[rgb(235,64,54)] via-orange-500 to-yellow-400"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default BlogList;