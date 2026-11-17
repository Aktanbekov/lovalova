import Link from "next/link";
import { loadOwnedOrder } from "@/lib/loadBook";

export const metadata = { title: "Checkout cancelled" };

export default async function CancelPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderId } = await searchParams;
  const order = await loadOwnedOrder(orderId);
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-plum">No problem — nothing was charged.</h1>
      <p className="mt-3 text-muted">Your book is saved exactly as you left it.</p>
      <Link href={`/cart/${order.bookId}`} className="btn btn-primary mt-8">
        Back to my cart
      </Link>
    </div>
  );
}
