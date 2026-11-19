import Link from "next/link";
import { loadOwnedOrder } from "@/lib/loadBook";

export const metadata = { title: "Оплата отменена" };

export default async function CancelPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderId } = await searchParams;
  const order = await loadOwnedOrder(orderId);
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-plum sm:text-4xl">Ничего страшного, деньги не списаны.</h1>
      <p className="mt-3 text-muted">Ваша книга сохранена такой, какой вы её оставили.</p>
      <Link href={`/cart/${order.bookId}`} className="btn btn-primary mt-8">
        Вернуться в корзину
      </Link>
    </div>
  );
}
