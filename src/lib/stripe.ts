import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

/** null when no key is configured (the cart then explains how to set it up). */
export const stripe: Stripe | null = key && !key.endsWith("...") ? new Stripe(key) : null;

export const isTestMode = !key || key.startsWith("sk_test_");

export function siteUrl(): string {
  // On Vercel, fall back to the deployment's own URL when NEXT_PUBLIC_SITE_URL isn't set.
  const vercelHost =
    process.env.VERCEL_ENV === "production" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL;
  const fallback = vercelHost ? `https://${vercelHost}` : "http://localhost:3000";
  return (process.env.NEXT_PUBLIC_SITE_URL || fallback).replace(/\/$/, "");
}
