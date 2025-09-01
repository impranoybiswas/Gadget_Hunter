import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],

    domains: ["lh3.googleusercontent.com", "res.cloudinary.com", "cdn-icons-png.flaticon.com"], 
  },
};

export default nextConfig;
