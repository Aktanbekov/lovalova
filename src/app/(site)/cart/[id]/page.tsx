import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutButton } from "@/components/builder/CheckoutButton";
import { PromoForm } from "@/components/builder/PromoForm";
import { BookMockup } from "@/components/book/BookMockup";
import { findPromo } from "@/lib/promos";
import { count } from "@/lib/ru";
import { loadOwnedBook } from "@/lib/loadBook";
import { SHIPPING, lineItems, money, totals } from "@/lib/pricing";
import { stepHref } from "@/lib/book/steps";

export const metadata = { title: "Корзина" };

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
      <h1 className="font-display text-3xl font-semibold text-wine sm:text-5xl">Корзина</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] [&>*]:min-w-0">
        <div className="card p-5">
          <div className="rounded-2xl bg-cream px-[10%] pb-2 pt-[8%]">
            <BookMockup book={data} tilt="flat" soft={data.selection.format === "softcover"} />
          </div>
          <p className="mt-4 font-display text-xl font-semibold text-plum">
            Для: {data.characters[1].name} · от: {data.characters[0].name}
          </p>
          <p className="text-sm text-muted">{count(data.pages.length, ["страница", "страницы", "страниц"])} · 22 × 14 см</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={stepHref(id, "preview")} className="font-semibold text-plum underline">Посмотреть ещё раз</Link>
            <Link href={stepHref(id, "edit")} className="font-semibold text-plum underline">Изменить страницы</Link>
            <Link href={stepHref(id, "options")} className="font-semibold text-plum underline">Сменить формат</Link>
          </div>
        </div>

        <div className="card h-fit p-5">
          <h2 className="font-display text-xl font-semibold text-plum">Ваш заказ</h2>
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
              <span>Скидка ({promo.code})</span>
              <span>{money(t.discount)}</span>
            </div>
          )}
          <div className="mt-2 flex justify-between border-t border-line pt-3 text-lg font-bold">
            <span>Итого без доставки</span>
            <span>{money(t.total)}</span>
          </div>
          <div className="mt-4">
            <PromoForm bookId={id} applied={promo ? { code: promo.code, label: promo.label } : null} />
          </div>
          <p className="mt-3 text-sm text-muted">
            Доставка выбирается при оплате: {SHIPPING.map((s) => `${s.label.toLowerCase()} ${money(s.cents)} (от ${s.minDays} до ${s.maxDays} раб. дней)`).join(" · ")}.
          </p>
          <div className="mt-5">
            <CheckoutButton bookId={id} />
          </div>
          <p className="mt-3 text-center text-xs text-muted">Оплату принимает Stripe. Данные вашей карты мы не видим.</p>
        </div>
      </div>
    </div>
  );
}
