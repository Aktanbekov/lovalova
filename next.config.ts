import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages here are per-visitor (drafts, orders), so we use the classic
  // dynamic rendering model rather than Cache Components.
  serverExternalPackages: ["playwright-core", "stripe"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
