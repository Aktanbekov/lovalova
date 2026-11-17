import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { currentUser } from "@/lib/auth";
import { stepHref } from "@/lib/book/steps";
import { readOwner } from "@/lib/owner";
import { FORMATS, money } from "@/lib/pricing";
import { listBooks, listOrders, type BookRow } from "@/lib/store";

export const metadata = { title: "My books & orders" };

function nextStep(b: BookRow) {
  if (b.status === "ordered") return { label: "Ordered", href: null };
  if (b.data.previewed) return { label: "Ready to order", href: `/cart/${b.id}` };
  if (b.data.assembled) return { label: "Ready to preview", href: stepHref(b.id, "edit") };
  return { label: "In progress", href: stepHref(b.id, "characters") };
}

export default async function AccountPage() {
  const [user, owner] = await Promise.all([currentUser(), readOwner()]);
  const books = owner ? listBooks(owner) : [];
  const orders = owner ? listOrders(owner) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold text-wine sm:text-5xl">{user ? `Hi${user.name ? `, ${user.name}` : ""}!` : "My books"}</h1>
          <p className="mt-2 text-lg text-muted">{user ? `Signed in as ${user.email}` : "These books are saved in this browser."}</p>
        </div>
        <CreateButton className="btn btn-primary" label="Start a new book" />
      </div>

      {!user && (
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl bg-blush p-6 sm:flex-row sm:items-center">
          <p className="text-lg"><strong>Save your books to an account</strong> so you can open them on any device and find your orders later.</p>
          <Link href="/account/sign-in?mode=signup&next=/account" className="btn btn-primary shrink-0">Create account</Link>
        </div>
      )}

      <h2 className="mt-12 font-display text-3xl font-semibold text-ink">Books</h2>
      {books.length === 0 ? (
        <p className="mt-3 text-muted">No books yet. Start one — it only takes about ten minutes.</p>
      ) : (
        <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((b) => {
            const s = nextStep(b);
            const [A, B] = b.data.characters;
            return (
              <li key={b.id}>
                <div className="rounded-3xl bg-cream px-[9%] pb-2 pt-[9%]">
                  <BookMockup book={b.data} tilt="flat" />
                </div>
                <p className="mt-3 text-lg font-bold text-ink">{B.name && A.name ? `For ${B.name}, from ${A.name}` : "Untitled book"}</p>
                <p className="text-sm text-muted">{s.label} · {b.data.pages.length || "—"} pages</p>
                {s.href && (
                  <Link href={s.href} className="mt-2 inline-block font-bold text-brand underline underline-offset-4">
                    {b.data.previewed ? "Go to checkout" : "Continue"} →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <h2 className="mt-14 font-display text-3xl font-semibold text-ink">Orders</h2>
      {orders.length === 0 ? (
        <p className="mt-3 text-muted">No orders yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
              <span>
                <span className="block font-bold">For {o.book.characters[1].name} · {FORMATS[o.selection.format].label}</span>
                <span className="text-sm text-muted">Order {o.id} · {o.createdAt.slice(0, 10)}</span>
              </span>
              <span className="flex items-center gap-4">
                <span className="font-bold">{money(o.amountCents)}</span>
                <Link href={`/checkout/success?order=${o.id}`} className="font-bold text-brand underline underline-offset-4">View</Link>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
