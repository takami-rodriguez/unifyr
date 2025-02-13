import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const config = () => {
  const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };

  const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  });

  return bundleAnalyzer(nextConfig);
};

export default config;
