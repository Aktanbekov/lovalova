// Every price lives here. Amounts are US cents. The server computes totals;
// Stripe only charges what we send it.

import type { Selection } from "@/lib/book/schema";

export const CURRENCY = "usd";

export const FORMATS = {
  softcover: { label: "Softcover", cents: 4900, blurb: "Flexible glossy cover, lay-flat friendly." },
  hardcover: { label: "Hardcover", cents: 6400, blurb: "Sturdy case-bound cover. Made to last for years." },
} as const;

export const UPGRADES = {
  matte: { label: "Matte finish", cents: 500, blurb: "Soft-touch matte pages instead of gloss." },
  digital: { label: "Digital copy", cents: 900, blurb: "A PDF of the book to keep and share." },
  giftbox: { label: "Gift box", cents: 1500, blurb: "Ready-to-give keepsake box with ribbon." },
} as const;

export type UpgradeId = keyof typeof UPGRADES;

export const SHIPPING = [
  { id: "standard", label: "Standard shipping", cents: 795, minDays: 5, maxDays: 8 },
  { id: "express", label: "Express shipping", cents: 1495, minDays: 2, maxDays: 4 },
] as const;

export interface LineItem {
  id: string;
  label: string;
  cents: number;
}

export function lineItems(sel: Selection): LineItem[] {
  const items: LineItem[] = [{ id: sel.format, label: `Personalized book — ${FORMATS[sel.format].label}`, cents: FORMATS[sel.format].cents }];
  for (const id of Object.keys(UPGRADES) as UpgradeId[]) {
    if (sel[id]) items.push({ id, label: UPGRADES[id].label, cents: UPGRADES[id].cents });
  }
  return items;
}

export function subtotal(sel: Selection): number {
  return lineItems(sel).reduce((sum, i) => sum + i.cents, 0);
}

export function money(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export interface Totals {
  subtotal: number;
  discount: number;
  total: number;
}

/** Book + extras minus any promo discount. Shipping is added at checkout. */
export function totals(sel: Selection, promo: { percentOff: number } | null): Totals {
  const sub = subtotal(sel);
  const discount = promo ? Math.round((sub * promo.percentOff) / 100) : 0;
  return { subtotal: sub, discount, total: sub - discount };
}

export const FROM_PRICE = Math.min(...Object.values(FORMATS).map((f) => f.cents));
