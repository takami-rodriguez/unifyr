import type { NextConfig } from "next";

import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  assetPrefix: process.env.URL!,
  images: {
    unoptimized: true,
  },
  experimental: {
    turbo: {
      // ...
    },
  },
};

export default bundleAnalyzer(nextConfig);
