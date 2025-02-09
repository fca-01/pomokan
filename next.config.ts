import type { NextConfig } from "next";

/**
 * Next.js configuration with unrestricted image domains
 * Note: This configuration allows images from any domain - use with caution
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all domains
      },
    ],
  },
};

export default nextConfig;
