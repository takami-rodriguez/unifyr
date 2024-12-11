import type { NextConfig } from "next";

import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, _context) => {
    config.optimization.moduleIds = "deterministic";
    config.optimization.chunkIds = "deterministic";
    return config;
  },
  experimental: {
    turbo: {
      // ...
    },
  },
};

export default bundleAnalyzer(nextConfig);
