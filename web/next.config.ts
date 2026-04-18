import type { NextConfig } from "next";
import path from "path";

const empty = path.join(process.cwd(), "src/shims/npm-empty.js");

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      /** Optional peer of @privy-io/react-auth; not used in this app. */
      "@farcaster/mini-app-solana": empty,
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
