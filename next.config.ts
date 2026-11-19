import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages here are per-visitor (drafts, orders), so we use the classic
  // dynamic rendering model rather than Cache Components.
  serverExternalPackages: ["playwright-core", "@sparticuz/chromium", "stripe", "@libsql/client", "libsql"],
  // @sparticuz/chromium loads its compressed browser from bin/ at runtime, which file tracing
  // can't see; ship it with the routes that render PDFs (see queuePdf callers).
  outputFileTracingIncludes: {
    "/api/stripe/webhook": ["./node_modules/@sparticuz/chromium/bin/**"],
    "/checkout/success": ["./node_modules/@sparticuz/chromium/bin/**"],
  },
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
