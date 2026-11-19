import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { AutoRefresh } from "@/components/site/AutoRefresh";
import { loadOwnedOrder } from "@/lib/loadBook";
import { stripe } from "@/lib/stripe";
import { fulfillFromSession } from "@/lib/fulfill";
import { getOrder } from "@/lib/store";
import { pdfReady as isPdfReady } from "@/lib/pdf";
import { money } from "@/lib/pricing";

export const metadata = { title: "Спасибо за заказ" };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string; session_id?: string }> }) {
  const { order: orderId, session_id } = await searchParams;
  let order = await loadOwnedOrder(orderId);

  // If the webhook hasn't arrived yet, confirm with Stripe directly.
  if (order.status !== "paid" && stripe && session_id && session_id === order.stripeSessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (await fulfillFromSession(session)) order = (await getOrder(order.id))!;
    } catch (err) {
      console.error("[lovalova] could not verify session", err);
    }
  }

  const paid = order.status === "paid";
  const pdfReady = isPdfReady(order.pdfPath);
  const b = order.book;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
      {(!paid || (order.selection.digital && !pdfReady)) && <AutoRefresh />}
      {paid ? (
        <>
          <p className="text-sm font-semibold text-muted">Заказ {order.id}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-plum sm:text-4xl">Спасибо! Книга отправляется в печать.</h1>
          <p className="mt-3 text-muted">
            {order.email ? <>Подтверждение придёт на <strong>{order.email}</strong>. </> : null}
            Оплачено: {money(order.amountCents)}.
          </p>
        </>
      ) : (
        <>
          <h1 className="font-display text-3xl font-semibold text-plum sm:text-4xl">Проверяем оплату…</h1>
          <p className="mt-3 text-muted">Обычно это несколько секунд. Страница обновится сама.</p>
        </>
      )}

      <div className="mx-auto mt-8 max-w-xl px-2">
        <BookMockup book={b} tilt="flat" soft={order.selection.format === "softcover"} />
      </div>

      {paid && order.selection.digital && (
        <div className="card mx-auto mt-8 max-w-md p-5">
          <p className="font-semibold text-plum">Электронная копия</p>
          {pdfReady ? (
            <a href={`/api/orders/${order.id}/download`} className="btn btn-primary mt-3">
              Скачать PDF
            </a>
          ) : (
            <p className="mt-2 text-sm text-muted">Готовим PDF… страница обновится, когда он будет готов.</p>
          )}
        </div>
      )}

      <Link href="/" className="btn btn-secondary mt-10 w-full sm:w-auto">
        На главную
      </Link>
    </div>
  );
}
