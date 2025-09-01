"use client"
import LocaleSwitcher from "./LocaleSwitcher";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import HamburgerMenu from "./ui/hamburgerMenu";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Building2,
  Star,
  Award,
  Shield,
  ChevronDown,
  Fence,
  DoorOpen,
  Home,
  Wrench
} from "lucide-react";

// Animation variants
const slideInDown = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function NavBar() {
  const t = useTranslations("Header");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  type NavLink = {
    href: string | any;
    label: string | any;
    hasSubmenu?: boolean;
    submenu?: {
      href: string;
      label: string;
      icon: JSX.Element;
      description: string;
    }[];
  };

  const offerSubmenu = [
    {
      href: "/offer/barriers",
      label: "Barierki",
      icon: <Fence className="w-4 h-4" />,
      description: "Balustrady i barierki"
    },
    {
      href: "/offer/gates",
      label: "Bramy",
      icon: <DoorOpen className="w-4 h-4" />,
      description: "Bramy wjazdowe"
    },
    {
      href: "/offer/fences",
      label: "Ogrodzenia",
      icon: <Home className="w-4 h-4" />,
      description: "Systemy ogrodzeń"
    },
    {
      href: "/offer/other-steel-structures",
      label: "Konstrukcje stalowe",
      icon: <Building2 className="w-4 h-4" />,
      description: "Elementy stalowe"
    }
  ];

  const navLinks: NavLink[] = [
    { href: "/", label: t("home") },
    { href: "/contact", label: t("contact") },
    { href: "/gallery", label: t("gallery") },
    { href: "/about", label: t("about") },
    { href: "/blog", label: t("blog") },
    {
      href: "/offer",
      label: t("offer"),
      hasSubmenu: false,
      submenu: offerSubmenu
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (linkLabel: string, e: React.MouseEvent) => {
    if (linkLabel === t("offer")) {
      e.preventDefault();
      setOpenDropdown(openDropdown === linkLabel ? null : linkLabel);
    }
  };

  return (
    <>
      {/* Top Info Bar - ukryty na mobilnych */}
      <motion.div
        className="hidden md:block bg-gradient-to-r from-[#EB4036] to-[#d63428] text-white py-2 relative overflow-hidden"
        initial="initial"
        animate="animate"
        variants={slideInDown}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4 text-sm"
            variants={staggerContainer}
          >
            {/* Contact Info */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3 lg:gap-6"
              variants={fadeIn}
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+48784532549" className="hover:text-gray-200 transition-colors font-medium">
                  +48 784-532-549
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:office@stalumo.com" className="hover:text-gray-200 transition-colors font-medium">
                  office@stalumo.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{t("time_range")}</span>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex items-center gap-4"
              variants={fadeIn}
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">5.0</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="font-medium">10+ {t("years")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="font-medium">{t("certified")}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.header
        className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-[#333] shadow-2xl"
        initial="initial"
        animate="animate"
        variants={slideInDown}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#1A1A1A] to-[#121212] opacity-80"></div>

        <div className="max-w-[1280px] mx-auto px-4 py-3 md:py-4 relative z-10">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="relative group flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/" className="block">
                <div className="relative">
                  <Image
                    src="/assets/images/stalumo.png"
                    width={100}
                    height={78}
                    alt="Logo Stalumo"
                    loading="lazy"
                    className="w-auto h-12 md:h-16 lg:h-20 brightness-110 group-hover:brightness-125 transition-all duration-300"
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-[#EB4036] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 rounded-lg"></div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden lg:flex items-center"
              variants={staggerContainer}
            >
              <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        className="group relative uppercase font-bold text-[1rem] font-oswald px-6 py-3 text-white hover:text-[#EB4036] transition-all duration-300 rounded-lg hover:bg-[#1A1A1A] flex items-center gap-2"
                        href={link.hasSubmenu ? "#" : link.href}
                        onClick={(e) => link.hasSubmenu && handleDropdownClick(link.label, e)}
                      >
                        {link.label}
                        {link.hasSubmenu && (
                          <ChevronDown
                            className={`w-4 h-4 transition-all duration-300 ${openDropdown === link.label ? 'rotate-180 text-[#EB4036]' : ''
                              }`}
                          />
                        )}
                        {/* Underline effect */}
                        <div className="absolute bottom-1 w-0 h-0.5 bg-[#EB4036] group-hover:w-full group-hover:left-1/8 transition-all duration-300 left-0"></div>
                      </Link>
                    </motion.div>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {link.hasSubmenu && openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-4 w-80 bg-[#121212]/95 backdrop-blur-xl border border-[#EB4036]/20 rounded-2xl shadow-[0_0_50px_rgba(235,64,54,0.3)] overflow-hidden"
                        >
                          <div className="p-2">
                            {link.submenu?.map((subLink, subIndex) => (
                              <motion.a
                                key={subLink.href}
                                href={subLink.href}
                                className="group flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#EB4036]/10 hover:to-[#d63428]/10 rounded-xl transition-all duration-300 border border-transparent hover:border-[#EB4036]/20"
                                onClick={() => setOpenDropdown(null)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                                whileHover={{ x: 8 }}
                              >
                                <div className="text-[#EB4036] group-hover:scale-110 transition-transform duration-300">
                                  {subLink.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{subLink.label}</div>
                                  <div className="text-xs text-gray-500 group-hover:text-gray-400">
                                    {subLink.description}
                                  </div>
                                </div>
                                <ArrowRight className="w-3 h-3 text-[#EB4036] opacity-0 group-hover:opacity-100 transition-opacity" />
                              </motion.a>
                            ))}
                          </div>

                          {/* Dropdown glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#EB4036]/5 to-[#d63428]/5 pointer-events-none rounded-2xl" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                className="ml-6 pl-6 border-l border-[#333]"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href="/contact"
                  className="group bg-[#EB4036] hover:bg-[#d63428] text-white px-6 py-3 rounded-lg font-semibold uppercase text-sm tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-[#EB4036]/25"
                >
                  Wycena
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.nav>

            {/* Mobile Right Side - Language Switcher & Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-4 lg:hidden">
              {/* Mobile Contact Info */}
              <motion.div
                className="hidden sm:flex items-center gap-2"
                variants={fadeIn}
              >
                <a
                  href="tel:+48784532549"
                  className="flex items-center gap-1 text-white hover:text-[#EB4036] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden md:inline">784-532-549</span>
                </a>
              </motion.div>

              <motion.div
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <LocaleSwitcher />
              </motion.div>

              {/* Mobile CTA */}
              <motion.div
                className="flex-shrink-0"
                variants={fadeIn}
              >
                <Link
                  href="/contact"
                  className="bg-[#EB4036] hover:bg-[#d63428] text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 whitespace-nowrap"
                >
                  Kontakt
                </Link>
              </motion.div>

              {/* Hamburger Menu */}
              <div className="flex-shrink-0">
                <HamburgerMenu navLinks={navLinks} />
              </div>
            </div>

            {/* Desktop Language Switcher (when mobile menu is hidden) */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.div
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <LocaleSwitcher />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Floating Action Buttons - Mobile Only */}
      <motion.div
        className="lg:hidden fixed bottom-6 right-4 z-40 flex flex-col gap-3"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {/* Call Button */}
        <motion.a
          href="tel:+48784532549"
          className="w-12 h-12 md:w-14 md:h-14 bg-[#EB4036] hover:bg-[#d63428] text-white rounded-full shadow-xl flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Phone className="w-5 h-5 md:w-6 md:h-6" />
        </motion.a>

        {/* Email Button */}
        <motion.a
          href="mailto:office@stalumo.com"
          className="w-12 h-12 md:w-14 md:h-14 bg-[#333] hover:bg-[#444] text-white rounded-full shadow-xl flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Mail className="w-5 h-5 md:w-6 md:h-6" />
        </motion.a>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EB4036] to-[#d63428] z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Mobile Quick Contact Bar - tylko na bardzo małych ekranach */}
      <motion.div
        className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-[#333] z-40 p-3"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="flex items-center justify-between gap-2">
          <a
            href="tel:+48784532549"
            className="flex items-center gap-2 text-white hover:text-[#EB4036] transition-colors text-sm bg-[#1A1A1A] px-3 py-2 rounded-lg flex-1 justify-center"
          >
            <Phone className="w-4 h-4" />
            <span>Zadzwoń</span>
          </a>
          <a
            href="mailto:office@stalumo.com"
            className="flex items-center gap-2 text-white hover:text-[#EB4036] transition-colors text-sm bg-[#1A1A1A] px-3 py-2 rounded-lg flex-1 justify-center"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-[#EB4036] hover:bg-[#d63428] text-white px-3 py-2 rounded-lg text-sm transition-colors flex-1 justify-center"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Wycena</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}