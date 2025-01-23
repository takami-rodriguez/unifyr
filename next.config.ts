import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const config = (_: string) => {
  // const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    experimental: {
      turbo: {
        // ...
      },
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
