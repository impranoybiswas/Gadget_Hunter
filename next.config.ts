import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ If you just want to deploy and ignore ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    domains: [
      "lh3.googleusercontent.com", // Google profile images
      "res.cloudinary.com",        // Cloudinary uploads
      "cdn-icons-png.flaticon.com" // Default avatars/icons
    ],
  },
};

export default nextConfig;
