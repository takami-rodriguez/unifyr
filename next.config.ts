import type { NextConfig } from "next";

import withBundleAnalyzer from "@next/bundle-analyzer";
import { readFileSync } from "fs";
import { glob } from "glob";

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
  generateBuildId: async () => {
    const files = await glob([
      "app/**/*.(html|md|mdx|ts|tsx)",
      "components/**/*.(html|md|mdx|ts|tsx)"
    ]);
    const contents = files.map(file => readFileSync(file, "utf-8")).join("");
    const arr = new TextEncoder().encode(contents);
    const hashbuf = await crypto.subtle.digest("SHA-256", arr);
    const hasharr = Array.from(new Uint8Array(hashbuf));
    return hasharr.map(b => b.toString(16).padStart(2, '0')).join("").slice(0, 8);
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
