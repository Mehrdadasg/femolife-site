import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL || "https://web.yekzan.com/api/v1.0",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.yekzan.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trustseal.enamad.ir",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
