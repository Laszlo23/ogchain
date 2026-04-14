import type { NextConfig } from "next";
import path from "path";

const empty = path.join(process.cwd(), "src/shims/npm-empty.js");

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      porto: empty,
      "porto/internal": empty,
      "@coinbase/wallet-sdk": empty,
      "@metamask/connect-evm": empty,
      "@safe-global/safe-apps-provider": empty,
      "@safe-global/safe-apps-sdk": empty,
      "@base-org/account": empty,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
