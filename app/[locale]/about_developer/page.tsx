"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, Award, Zap, Shield, Settings, CheckCircle, 
  Users, Globe, Building2, TrendingUp, Quote
} from 'lucide-react';

const AboutPage = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/20 to-emerald-500/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 bg-blue-500/20 border border-blue-400 rounded-full text-blue-400 text-sm font-semibold uppercase tracking-[4px] backdrop-blur-sm"
            >
              Full-Stack Developer
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-7xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                O autorze strony
              </span>
              <br />
              <span className="text-white/90">Bienkowski.dev</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            >
              Ta strona została zaprojektowana i wdrożona przez <a href="https://bienkowski.dev" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300">Bienkowski.dev</a> – full-stack developera specjalizującego się w tworzeniu nowoczesnych <a href="https://bienkowski.dev/strony-internetowe" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">stron internetowych</a>, <a href="https://bienkowski.dev/aplikacje-mobilne" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">aplikacji mobilnych</a>, systemów <a href="https://bienkowski.dev/smart-home-panele" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">smart home</a> i <a href="https://bienkowski.dev/automatyzacje" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">automatyzacji</a>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Profesjonalne tworzenie
              </span>
              <br />
              <span className="text-white/90">stron internetowych i aplikacji</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-8" />
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Od prostych wizytówek po zaawansowane systemy SaaS – każdy projekt realizowany jest w oparciu o nowoczesne technologie, takie jak <strong className="text-blue-400">Next.js, React, TypeScript, Prisma, Tailwind</strong>. Dzięki temu strony działają szybko, są bezpieczne i w pełni dostosowane do SEO.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Globe,
                title: "Tworzenie stron internetowych dla firm i startupów",
                description: "Nowoczesne strony internetowe w technologiach Next.js, React i TypeScript. Pełna responsywność, SEO i optymalizacja wydajności.",
                link: "https://bienkowski.dev/strony-internetowe",
                linkText: "strony internetowe"
              },
              {
                icon: Settings,
                title: "Aplikacje mobilne i webowe",
                description: "Tworzenie aplikacji mobilnych i webowych z wykorzystaniem React Native i Progressive Web Apps (PWA).",
                link: "https://bienkowski.dev/aplikacje-mobilne", 
                linkText: "aplikacje mobilne"
              },
              {
                icon: Building2,
                title: "Panele smart home i automatyzacje",
                description: "Systemy smart home i automatyzacji, które integrują różne urządzenia w prosty i intuicyjny sposób.",
                link: "https://bienkowski.dev/smart-home-panele",
                linkText: "smart home"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 h-full">
                  <div className="w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-500 transition-colors duration-300">
                    <a href={service.link} className="hover:text-blue-400 transition-colors duration-300">
                      {service.title}
                    </a>
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">{service.description}</p>
                  <a 
                    href={service.link}
                    className="inline-block text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
                  >
                    Zobacz więcej →
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-xl text-slate-300 mb-6">
              Tworzę <a href="https://bienkowski.dev/aplikacje-mobilne" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">aplikacje mobilne</a> i webowe, a także panele <a href="https://bienkowski.dev/smart-home-panele" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold">smart home</a> i systemy <a href="https://bienkowski.dev/automatyzacje" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">automatyzacji</a>, które integrują różne urządzenia w prosty i intuicyjny sposób. Dzięki temu klienci otrzymują gotowe, skalowalne rozwiązania.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  SEO i optymalizacja
                </span>
                <br />
                pod Google
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Każda realizacja jest zoptymalizowana pod kątem <strong className="text-blue-400">SEO</strong> – struktura nagłówków, sitemap, linkowanie wewnętrzne i zewnętrzne. Dzięki temu projekty <a href="https://bienkowski.dev" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Bienkowski.dev</a> osiągają wysokie pozycje w Google i przyciągają nowych klientów.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-slate-300"><strong>Pozycjonowanie stron i audyty SEO</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span className="text-slate-300">Optymalizacja Core Web Vitals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-slate-300">Schema markup i rich snippets</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-slate-300"><strong>Wsparcie techniczne i rozwój projektów</strong></span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="text-green-400 font-mono text-sm">
                  <div className="mb-2">$ lighthouse audit --view</div>
                  <div className="text-slate-400">Performance: <span className="text-green-400">98</span></div>
                  <div className="text-slate-400">SEO: <span className="text-green-400">100</span></div>
                  <div className="text-slate-400">Best Practices: <span className="text-green-400">100</span></div>
                  <div className="text-slate-400">Accessibility: <span className="text-green-400">96</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Nowoczesne technologie
              </span>
              <br />
              Next.js, React, TypeScript
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-8" />
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Specjalizuję się w <strong className="text-blue-400">Next.js (v15)</strong>, co pozwala na łączenie SSR, SSG i API routes w jednym projekcie. Tworzę aplikacje webowe, SaaS i panele administracyjne gotowe do dalszego rozwoju i integracji.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {[
              { name: "Next.js", emoji: "⚛️", color: "hover:border-blue-500/50" },
              { name: "React", emoji: "⚛️", color: "hover:border-cyan-500/50" },
              { name: "TypeScript", emoji: "📘", color: "hover:border-blue-500/50" },
              { name: "Tailwind", emoji: "🎨", color: "hover:border-cyan-500/50" },
              { name: "Prisma", emoji: "🔺", color: "hover:border-emerald-500/50" },
              { name: "MySQL/Postgres", emoji: "🗄️", color: "hover:border-blue-500/50" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center ${tech.color} transition-all duration-300`}
              >
                <div className="text-3xl mb-3">{tech.emoji}</div>
                <div className="text-white font-semibold">{tech.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Dlaczego warto
              </span>
              <br />
              współpracować z Bienkowski.dev
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Users,
                title: "Indywidualne podejście do każdego klienta",
                description: "Każdy projekt jest unikalny i dopasowany do specyficznych potrzeb biznesowych."
              },
              {
                icon: CheckCircle,
                title: "Projekty zoptymalizowane pod SEO",
                description: "Każda strona jest przygotowana z myślą o wysokich pozycjach w wynikach wyszukiwania."
              },
              {
                icon: Settings,
                title: "Pełna responsywność i mobile-first",
                description: "Wszystkie projekty są w pełni responsywne i dostosowane do urządzeń mobilnych."
              },
              {
                icon: TrendingUp,
                title: "Możliwość rozbudowy",
                description: "Blog, sklep, panel admina, galeria czy wielojęzyczność - wszystko jest możliwe."
              },
              {
                icon: Shield,
                title: "Wsparcie techniczne po wdrożeniu",
                description: "Ciągła opieka techniczna i wsparcie w rozwoju projektu po jego uruchomieniu."
              },
              {
                icon: Zap,
                title: "Wsparcie techniczne i rozwój projektów",
                description: "Kompleksowa opieka nad projektem od pomysłu po wdrożenie i dalszy rozwój."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-slate-300">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-xl text-blue-400 font-semibold">
              👉 Zobacz portfolio projektów: <a href="https://bienkowski.dev/projekty" className="hover:text-blue-300 transition-colors duration-300 underline">Bienkowski.dev/projekty</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Często zadawane
              </span>
              <br />pytania
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                question: "Jakie strony tworzy Bienkowski.dev?",
                answer: "Tworzę strony internetowe, aplikacje mobilne i webowe, systemy smart home oraz automatyzacje dla biznesu i prywatnych projektów."
              },
              {
                question: "Czy strony są zoptymalizowane pod SEO?",
                answer: "Tak – każda realizacja zawiera pełną optymalizację techniczną i treściową pod Google, wraz z sitemap i linkowaniem."
              },
              {
                question: "W jakich technologiach pracujesz?",
                answer: "Specjalizuję się w Next.js, React, TypeScript, Tailwind, Prisma, MySQL/Postgres oraz integracjach SaaS i smart home."
              },
              {
                question: "Gdzie mogę zobaczyć portfolio Bienkowski.dev?",
                answer: "Wszystkie projekty są dostępne na: <a href='https://bienkowski.dev/projekty' className='text-blue-400 hover:text-blue-300 transition-colors duration-300 underline'>https://bienkowski.dev/projekty</a>"
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-4 hover:text-blue-500 transition-colors duration-300">
                  {faq.question}
                </h3>
                <div 
                  className="text-slate-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-500/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Gotowy na
              </span>
              <br />
              <span className="text-white">współpracę?</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full" />
            <p className="text-2xl text-slate-300 leading-relaxed">
              <a href="https://bienkowski.dev/kontakt" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline font-semibold">Skontaktuj się</a> już dziś i omówmy Twój pomysł!
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-semibold">
                <a href="https://bienkowski.dev/projekty" className="hover:text-blue-300 transition-colors duration-300">Portfolio</a> • <a href="https://bienkowski.dev/kontakt" className="hover:text-blue-300 transition-colors duration-300">Konsultacja</a> • Bezpłatna wycena
              </span>
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
              <motion.a
                href="https://bienkowski.dev/kontakt"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl text-lg transition-all duration-300"
              >
                Skontaktuj się teraz
              </motion.a>
              <motion.a
                href="https://bienkowski.dev/projekty"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-4 border-2 border-blue-500 text-blue-400 font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 text-lg"
              >
                Zobacz Portfolio
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;