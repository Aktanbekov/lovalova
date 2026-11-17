import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutButton } from "@/components/builder/CheckoutButton";
import { PromoForm } from "@/components/builder/PromoForm";
import { BookMockup } from "@/components/book/BookMockup";
import { findPromo } from "@/lib/promos";
import { loadOwnedBook } from "@/lib/loadBook";
import { SHIPPING, lineItems, money, totals } from "@/lib/pricing";
import { stepHref } from "@/lib/book/steps";

export const metadata = { title: "Your cart" };

export default async function CartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await loadOwnedBook(id);
  if (!data.assembled) redirect(stepHref(id, "quiz"));
  if (!data.previewed) redirect(stepHref(id, "preview"));
  const items = lineItems(data.selection);
  const promo = findPromo(data.promo);
  const t = totals(data.selection, promo);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-wine sm:text-5xl">Your cart</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] [&>*]:min-w-0">
        <div className="card p-5">
          <div className="rounded-2xl bg-cream px-[10%] pb-2 pt-[8%]">
            <BookMockup book={data} tilt="flat" soft={data.selection.format === "softcover"} />
          </div>
          <p className="mt-4 font-display text-xl font-semibold text-plum">
            A book for {data.characters[1].name}, from {data.characters[0].name}
          </p>
          <p className="text-sm text-muted">{data.pages.length} pages · 8.5 × 5.5 in</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={stepHref(id, "preview")} className="font-semibold text-plum underline">Preview again</Link>
            <Link href={stepHref(id, "edit")} className="font-semibold text-plum underline">Edit pages</Link>
            <Link href={stepHref(id, "options")} className="font-semibold text-plum underline">Change format</Link>
          </div>
        </div>

        <div className="card h-fit p-5">
          <h2 className="font-display text-xl font-semibold text-plum">Order summary</h2>
          <ul className="mt-4 divide-y divide-line text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between py-2.5">
                <span>{i.label}</span>
                <span className="font-medium">{money(i.cents)}</span>
              </li>
            ))}
          </ul>
          {promo && (
            <div className="flex justify-between py-2.5 text-sm font-semibold text-sage">
              <span>Discount ({promo.code})</span>
              <span>−{money(t.discount)}</span>
            </div>
          )}
          <div className="mt-2 flex justify-between border-t border-line pt-3 text-lg font-bold">
            <span>Total before shipping</span>
            <span>{money(t.total)}</span>
          </div>
          <div className="mt-4">
            <PromoForm bookId={id} applied={promo ? { code: promo.code, label: promo.label } : null} />
          </div>
          <p className="mt-3 text-sm text-muted">
            Shipping at checkout: {SHIPPING.map((s) => `${s.label.replace(" shipping", "")} ${money(s.cents)} (${s.minDays}–${s.maxDays} business days)`).join(" · ")}.
          </p>
          <div className="mt-5">
            <CheckoutButton bookId={id} />
          </div>
          <p className="mt-3 text-center text-xs text-muted">Payments are handled by Stripe. We never see your card details.</p>
        </div>
      </div>
    </div>
  );
}
