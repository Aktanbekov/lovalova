import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { currentUser } from "@/lib/auth";
import { stepHref } from "@/lib/book/steps";
import { readOwner } from "@/lib/owner";
import { FORMATS, money } from "@/lib/pricing";
import { listBooks, listOrders, type BookRow } from "@/lib/store";
import { count } from "@/lib/ru";

export const metadata = { title: "Мои книги и заказы" };

function nextStep(b: BookRow) {
  if (b.status === "ordered") return { label: "Заказана", href: null };
  if (b.data.previewed) return { label: "Готова к заказу", href: `/cart/${b.id}` };
  if (b.data.assembled) return { label: "Можно смотреть", href: stepHref(b.id, "edit") };
  return { label: "В работе", href: stepHref(b.id, "characters") };
}

export default async function AccountPage() {
  const [user, owner] = await Promise.all([currentUser(), readOwner()]);
  const books = owner ? listBooks(owner) : [];
  const orders = owner ? listOrders(owner) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-wine sm:text-5xl">{user ? `Привет${user.name ? `, ${user.name}` : ""}!` : "Мои книги"}</h1>
          <p className="mt-2 text-lg text-muted">{user ? `Вы вошли как ${user.email}` : "Эти книги сохранены в этом браузере."}</p>
        </div>
        <CreateButton className="btn btn-primary w-full sm:w-auto" label="Создать новую книгу" />
      </div>

      {!user && (
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-blush p-5 sm:flex-row sm:items-center">
          <p className="sm:text-lg"><strong>Сохраните книги в аккаунте</strong>, чтобы открывать их с любого телефона и всегда находить заказы.</p>
          <Link href="/account/sign-in?mode=signup&next=/account" className="btn btn-primary w-full shrink-0 sm:w-auto">Создать аккаунт</Link>
        </div>
      )}

      <h2 className="mt-12 font-display text-3xl font-semibold text-ink">Книги</h2>
      {books.length === 0 ? (
        <p className="mt-3 text-muted">Книг пока нет. Начните, это около десяти минут.</p>
      ) : (
        <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((b) => {
            const s = nextStep(b);
            const [A, B] = b.data.characters;
            return (
              <li key={b.id}>
                <div className="rounded-xl bg-cream px-[9%] pb-2 pt-[9%]">
                  <BookMockup book={b.data} tilt="flat" />
                </div>
                <p className="mt-3 text-lg font-bold text-ink">{B.name && A.name ? `Для: ${B.name} · от: ${A.name}` : "Книга без названия"}</p>
                <p className="text-sm text-muted">{s.label} · {b.data.pages.length ? count(b.data.pages.length, ["страница", "страницы", "страниц"]) : "страниц пока нет"}</p>
                {s.href && (
                  <Link href={s.href} className="mt-2 inline-block font-bold text-brand underline underline-offset-4">
                    {b.data.previewed ? "К оплате" : "Продолжить"} →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <h2 className="mt-14 font-display text-3xl font-semibold text-ink">Заказы</h2>
      {orders.length === 0 ? (
        <p className="mt-3 text-muted">Заказов пока нет.</p>
      ) : (
        <ul className="mt-6 divide-y divide-line rounded-xl bg-white ring-1 ring-line">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
              <span>
                <span className="block font-bold">Для: {o.book.characters[1].name} · {FORMATS[o.selection.format].label}</span>
                <span className="text-sm text-muted">Заказ {o.id} · {o.createdAt.slice(0, 10)}</span>
              </span>
              <span className="flex items-center gap-4">
                <span className="font-bold">{money(o.amountCents)}</span>
                <Link href={`/checkout/success?order=${o.id}`} className="font-bold text-brand underline underline-offset-4">Открыть</Link>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
