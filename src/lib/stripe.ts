import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

/** null when no key is configured (the cart then explains how to set it up). */
export const stripe: Stripe | null = key && !key.endsWith("...") ? new Stripe(key) : null;

export const isTestMode = !key || key.startsWith("sk_test_");

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}
