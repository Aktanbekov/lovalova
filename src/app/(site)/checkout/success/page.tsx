import Link from "next/link";
import fs from "node:fs";
import { CoverPage } from "@/components/book/BookPage";
import { AutoRefresh } from "@/components/site/AutoRefresh";
import { loadOwnedOrder } from "@/lib/loadBook";
import { stripe } from "@/lib/stripe";
import { fulfillFromSession } from "@/lib/fulfill";
import { getOrder } from "@/lib/store";
import { money } from "@/lib/pricing";

export const metadata = { title: "Thank you" };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string; session_id?: string }> }) {
  const { order: orderId, session_id } = await searchParams;
  let order = await loadOwnedOrder(orderId);

  // If the webhook hasn't arrived yet, confirm with Stripe directly.
  if (order.status !== "paid" && stripe && session_id && session_id === order.stripeSessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (fulfillFromSession(session)) order = getOrder(order.id)!;
    } catch (err) {
      console.error("[lovalova] could not verify session", err);
    }
  }

  const paid = order.status === "paid";
  const pdfReady = Boolean(order.pdfPath && fs.existsSync(order.pdfPath));
  const b = order.book;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
      {(!paid || (order.selection.digital && !pdfReady)) && <AutoRefresh />}
      {paid ? (
        <>
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">Order {order.id}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-plum">Thank you! Your book is on its way to the printer.</h1>
          <p className="mt-3 text-muted">
            {order.email ? <>A confirmation will go to <strong>{order.email}</strong>. </> : null}
            Total paid: {money(order.amountCents)}.
          </p>
        </>
      ) : (
        <>
          <h1 className="font-display text-4xl font-semibold text-plum">Confirming your payment…</h1>
          <p className="mt-3 text-muted">This usually takes a few seconds. This page will update by itself.</p>
        </>
      )}

      <div className="mx-auto mt-8 max-w-xl overflow-hidden rounded-2xl shadow-xl ring-1 ring-line">
        <CoverPage book={b} />
      </div>

      {paid && order.selection.digital && (
        <div className="card mx-auto mt-8 max-w-md p-5">
          <p className="font-semibold text-plum">Your digital copy</p>
          {pdfReady ? (
            <a href={`/api/orders/${order.id}/download`} className="btn btn-primary mt-3">
              Download PDF
            </a>
          ) : (
            <p className="mt-2 text-sm text-muted">Preparing your PDF… this page will update when it&apos;s ready.</p>
          )}
        </div>
      )}

      <Link href="/" className="btn btn-secondary mt-10">
        Back to Lovalova
      </Link>
    </div>
  );
}
