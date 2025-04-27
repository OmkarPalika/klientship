import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "klientship.online",
      },
    ],
  },
};

export default nextConfig;
