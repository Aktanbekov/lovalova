import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { readOwner } from "@/lib/owner";
import { FORMATS, money, subtotal } from "@/lib/pricing";
import { cartBooks } from "@/lib/store";
import { count } from "@/lib/ru";

export const metadata = { title: "Корзина" };

export default async function CartIndex() {
  const owner = await readOwner();
  const books = owner ? await cartBooks(owner) : [];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-semibold text-wine sm:text-5xl">Корзина</h1>
      {books.length === 0 ? (
        <div className="mt-8 rounded-xl bg-cream p-6 sm:p-8 text-center">
          <p className="sm:text-lg">Корзина пуста. Книга появится здесь, когда вы её посмотрите целиком.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CreateButton label="Создать книгу" className="btn btn-primary w-full sm:w-auto" />
            <Link href="/account" className="btn btn-secondary w-full sm:w-auto">Мои книги</Link>
          </div>
        </div>
      ) : (
        <ul className="mt-8 space-y-5">
          {books.map((b) => (
            <li key={b.id} className="grid items-center gap-5 rounded-xl bg-white p-4 sm:p-5 ring-1 ring-line sm:grid-cols-[12rem_1fr_auto]">
              <BookMockup book={b.data} tilt="flat" className="w-48 max-w-full" />
              <div>
                <p className="font-display text-2xl font-semibold text-ink">Для: {b.data.characters[1].name} · от: {b.data.characters[0].name}</p>
                <p className="text-muted">{FORMATS[b.data.selection.format].label} · {count(b.data.pages.length, ["страница", "страницы", "страниц"])}</p>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <span className="text-xl font-bold">{money(subtotal(b.data.selection))}</span>
                <Link href={`/cart/${b.id}`} className="btn btn-primary w-full sm:w-auto">К оплате</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
