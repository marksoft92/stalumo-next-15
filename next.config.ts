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
};

export default withNextIntl(nextConfig);
