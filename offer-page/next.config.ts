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
  // Enable JavaScript minification
  swcMinify: true,
  
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: true,

  // Optimize fonts
  optimizeFonts: true,

  // Enable React strict mode for better development practices
  reactStrictMode: true,

  // Configure compression
  compress: true,

  // Experimental features for better performance
  experimental: {
    // Enable optimizations for third party scripts
    optimizePackageImports: ['framer-motion', '@radix-ui/react-dialog', 'sonner'],
    
    // Enable modern JavaScript features
    serverActions: true,
    
    // Optimize CSS
    optimizeCss: true,
  },
};

export default nextConfig;