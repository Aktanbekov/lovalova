// What happens when an order is paid. Safe to call more than once.
import type Stripe from "stripe";
import { after } from "next/server";
import { getOrder, markOrderPaid } from "./store";
import { generateOrderPdf } from "./pdf";

const inFlight = new Set<string>();

/**
 * Make the order's PDF after the response is sent. `after` keeps a serverless function alive
 * until the work finishes (up to the route's max duration). Call only during a request.
 */
export function queuePdf(orderId: string) {
  if (inFlight.has(orderId)) return;
  inFlight.add(orderId);
  after(() =>
    generateOrderPdf(orderId)
      .then((p) => console.log(`[lovalova] PDF ready for ${orderId}: ${p}`))
      .catch((err) => console.error(`[lovalova] PDF failed for ${orderId}:`, err))
      .finally(() => inFlight.delete(orderId)),
  );
}

export async function fulfillFromSession(session: Stripe.Checkout.Session): Promise<boolean> {
  const orderId = session.metadata?.orderId ?? session.client_reference_id;
  if (!orderId || session.payment_status !== "paid") return false;
  const order = await getOrder(orderId);
  if (!order) return false;
  const shipping =
    (session as unknown as { collected_information?: { shipping_details?: unknown } }).collected_information?.shipping_details ??
    (session as unknown as { shipping_details?: unknown }).shipping_details ??
    null;
  const flipped = await markOrderPaid(orderId, {
    email: session.customer_details?.email ?? null,
    shipping: { address: shipping, rate: session.shipping_cost?.shipping_rate ?? null },
    amountCents: session.amount_total,
  });
  if (flipped || !(await getOrder(orderId))?.pdfPath) queuePdf(orderId);
  return true;
}
