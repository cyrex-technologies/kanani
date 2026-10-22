import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cPanel serves the generated files directly; PHP handles enquiries separately.
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    // There is no Next.js image optimisation server on shared hosting.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
