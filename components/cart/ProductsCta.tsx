import React from 'react';
import { Phone, Mail, MessageCircle, Flame, ArrowRight, Clock, Shield, Award, Zap } from 'lucide-react';
import { getTranslations } from "next-intl/server";


const  ProductsCTASection =  async () => {
    const t = await getTranslations("Products_cta");
  return (
    <section className="relative my-20 overflow-hidden">
      <div className="relative z-10  mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-1 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#EB4036]/10 backdrop-blur-sm rounded-full border border-[#EB4036]/30">
              <Flame className="w-4 h-4 text-[#EB4036]" />
              <span className="text-sm font-semibold uppercase tracking-[3px] text-[#EB4036]">
                {t("badge")}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t("title")} &nbsp;
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#EB4036]">
              {t("title2")}
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-[#EB4036] to-transparent rounded-full"></div>

            <p className="text-lg md:text-xl text-[#A5A5A5] leading-relaxed">
            {t("description")}
            </p>

            {/* Features list with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: Zap, text: t("custom_design") },
                { icon: Phone, text: t("free_consultation") },
                { icon: Shield, text: t("quality_guarantee") },
                { icon: Clock, text: t("fast_delivery") }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-[#EB4036]/10 rounded-lg flex items-center justify-center group-hover:bg-[#EB4036]/20 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-[#EB4036]" />
                  </div>
                  <span className="text-[#A5A5A5] font-medium group-hover:text-white transition-colors duration-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-4 pt-4">
  {[
    { icon: Shield, text: t("certified") },
    { icon: Award, text: t("experience") },
    { text: "★★★★★", plain: true }
  ].map((indicator, index) => (
    <div key={index} className="flex items-center gap-2 text-sm">
      {indicator.plain ? (
        <span className="text-[#EB4036] font-bold">{indicator.text}</span>
      ) : (
        <>
          {indicator.icon && (
            <indicator.icon className="w-4 h-4 text-[#EB4036]" />
          )}
          <span className="text-[#A5A5A5]">{indicator.text}</span>
        </>
      )}
    </div>
  ))}
</div>

          </div>

          {/* Right side - Contact cards */}
     
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EB4036]/50 to-transparent"></div>
    </section>
  );
};

export default ProductsCTASection;