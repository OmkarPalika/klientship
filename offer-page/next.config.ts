import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "klientship.online"
      },
    ],
  },
};

export default nextConfig;
