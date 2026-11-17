// Discount codes. Every code shown anywhere on the site lives here and really
// works: the cart applies it, the order amount includes it, and Stripe
// Checkout receives a matching coupon. Discounts apply to the book and
// extras, not to shipping.

export interface Promo {
  code: string;
  percentOff: number;
  label: string;
  /** Shown in the announcement bar. */
  headline?: string;
  /** ISO date (inclusive) after which the code stops working. */
  endsOn?: string;
}

export const PROMOS: Promo[] = [
  { code: "LOVE15", percentOff: 15, label: "15% off your book", headline: "Holiday gifting: 15% off every book" },
  { code: "WELCOME10", percentOff: 10, label: "10% off for joining our list" },
];

/** The code advertised in the announcement bar. */
export const FEATURED_PROMO = PROMOS[0];

export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function findPromo(raw: string | null | undefined, today = new Date()): Promo | null {
  if (!raw) return null;
  const code = normalizeCode(raw);
  const p = PROMOS.find((x) => x.code === code);
  if (!p) return null;
  if (p.endsOn && today.toISOString().slice(0, 10) > p.endsOn) return null;
  return p;
}

/** Discount in cents for a given subtotal (rounded to the nearest cent). */
export function discountCents(subtotalCents: number, promo: Promo | null): number {
  if (!promo) return 0;
  return Math.round((subtotalCents * promo.percentOff) / 100);
}
