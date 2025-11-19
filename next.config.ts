import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "seeklogo.com" },
    ],
  },
};

export default nextConfig;
