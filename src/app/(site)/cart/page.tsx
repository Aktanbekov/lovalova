import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { readOwner } from "@/lib/owner";
import { FORMATS, money, subtotal } from "@/lib/pricing";
import { cartBooks } from "@/lib/store";

export const metadata = { title: "Your cart" };

export default async function CartIndex() {
  const owner = await readOwner();
  const books = owner ? cartBooks(owner) : [];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-4xl font-semibold text-wine sm:text-5xl">Your cart</h1>
      {books.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-cream p-8 text-center">
          <p className="text-lg">Your cart is empty. Books appear here once you&apos;ve previewed them.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CreateButton />
            <Link href="/account" className="btn btn-secondary">My books</Link>
          </div>
        </div>
      ) : (
        <ul className="mt-8 space-y-5">
          {books.map((b) => (
            <li key={b.id} className="grid items-center gap-5 rounded-3xl bg-white p-5 ring-1 ring-line sm:grid-cols-[12rem_1fr_auto]">
              <BookMockup book={b.data} tilt="flat" className="w-48 max-w-full" />
              <div>
                <p className="font-display text-2xl font-semibold text-ink">For {b.data.characters[1].name}, from {b.data.characters[0].name}</p>
                <p className="text-muted">{FORMATS[b.data.selection.format].label} · {b.data.pages.length} pages</p>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <span className="text-xl font-bold">{money(subtotal(b.data.selection))}</span>
                <Link href={`/cart/${b.id}`} className="btn btn-primary">Checkout</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
