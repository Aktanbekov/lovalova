// Every price lives here. Amounts are in tyiyn (1/100 of a Kyrgyz som), the
// minor unit Stripe expects for KGS. The server computes totals; Stripe only
// charges what we send it. Prices are starting values to tune.

import type { Selection } from "@/lib/book/schema";

export const CURRENCY = "kgs";

export const FORMATS = {
  softcover: { label: "Мягкая обложка", cents: 399000, blurb: "Гибкая глянцевая обложка, лёгкая книга." },
  hardcover: { label: "Твёрдая обложка", cents: 549000, blurb: "Плотный переплёт, прослужит годы." },
} as const;

export const UPGRADES = {
  matte: { label: "Матовые страницы", cents: 39000, blurb: "Бархатистая матовая бумага вместо глянца." },
  digital: { label: "Электронная копия", cents: 79000, blurb: "PDF книги, чтобы сохранить и отправить." },
  giftbox: { label: "Подарочная коробка", cents: 129000, blurb: "Коробка с лентой, сразу можно дарить." },
} as const;

export type UpgradeId = keyof typeof UPGRADES;

export const SHIPPING = [
  { id: "standard", label: "Обычная доставка", cents: 59000, minDays: 5, maxDays: 8 },
  { id: "express", label: "Срочная доставка", cents: 119000, minDays: 2, maxDays: 4 },
] as const;

export interface LineItem {
  id: string;
  label: string;
  cents: number;
}

export function lineItems(sel: Selection): LineItem[] {
  const items: LineItem[] = [{ id: sel.format, label: `Именная книга, ${FORMATS[sel.format].label.toLowerCase()}`, cents: FORMATS[sel.format].cents }];
  for (const id of Object.keys(UPGRADES) as UpgradeId[]) {
    if (sel[id]) items.push({ id, label: UPGRADES[id].label, cents: UPGRADES[id].cents });
  }
  return items;
}

export function subtotal(sel: Selection): number {
  return lineItems(sel).reduce((sum, i) => sum + i.cents, 0);
}

/** "3 990 сом" — whole som, thin no-break space between thousands. */
export function money(cents: number): string {
  const som = cents / 100;
  const digits = Number.isInteger(som) ? 0 : 2;
  return `${new Intl.NumberFormat("ru-RU", { minimumFractionDigits: digits, maximumFractionDigits: 2 }).format(som)}\u00a0сом`;
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
