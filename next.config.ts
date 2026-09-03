import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Public seed content currently uses an external image CDN. Disable the
    // optimizer route so an unavailable CDN cannot produce 500 responses from
    // /_next/image; SafeImage supplies a local browser fallback as needed.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
