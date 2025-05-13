import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Zmieniono na http, ponieważ używasz HTTP dla panel.stalumo.pl
        hostname: "panel.stalumo.pl",
        port: "",
        pathname: "/image-public-uploads/**",
        search: "",
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       // applies to all routes
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Strict-Transport-Security",
  //           value: "max-age=31536000; includeSubDomains",
  //         },
  //         {
  //           key: "Content-Security-Policy",
  //           value: "default-src 'self'; script-src 'self' 'nonce-<random-nonce>'",
  //         },
  //         {
  //           key: "X-Frame-Options",
  //           value: "SAMEORIGIN",
  //         },
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "no-referrer-when-downgrade",
  //         },
  //         {
  //           key: "Permissions-Policy",
  //           value: "geolocation=(self), microphone=()",
  //         },
  //       ],
  //     },
  //   ];
  // },

};

export default withNextIntl(nextConfig);
