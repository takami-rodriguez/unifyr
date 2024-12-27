import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import withBundleAnalyzer from "@next/bundle-analyzer";

export default (phase: string) => {
  // const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    experimental: {
      webpackMemoryOptimizations: true,
      turbo: {
        // ...
      },
    },
  };
  
  const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  });

  return bundleAnalyzer(nextConfig);
}
