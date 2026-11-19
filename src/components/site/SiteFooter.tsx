import Link from "next/link";
import { OCCASION_COLLECTIONS, RECIPIENT_COLLECTIONS, collectionHref } from "@/content/collections";
import { Logo } from "./Logo";
import { SubscribeForm } from "./SubscribeForm";

export function SiteFooter() {
  const col = "text-sm font-semibold text-gold";
  const link = "inline-flex min-h-11 items-center text-white/85 hover:text-white hover:underline underline-offset-4 lg:min-h-0 lg:py-1";
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-white/80">Книги о любви, где главные герои вы двое. Рисуете вы, иллюстрируют художники, печатаем по заказу.</p>
            <div className="mt-6 max-w-md">
              <p className="mb-3 font-display text-2xl font-semibold">Скидка 10% на первую книгу</p>
              <SubscribeForm source="footer" dark />
            </div>
          </div>
          <nav aria-label="Поводы">
            <p className={col}>Повод</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 lg:grid-cols-1">
              {OCCASION_COLLECTIONS.map((c) => (
                <li key={c.slug}><Link href={collectionHref(c)} className={link}>{c.name}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Кому">
            <p className={col}>Кому</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 lg:grid-cols-1">
              {RECIPIENT_COLLECTIONS.map((c) => (
                <li key={c.slug}><Link href={collectionHref(c)} className={link}>{c.menuLabel}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Помощь">
            <p className={col}>Помощь</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 lg:grid-cols-1">
              <li><Link href="/#how" className={link}>Как это работает</Link></li>
              <li><Link href="/books" className={link}>Все обложки</Link></li>
              <li><Link href="/pricing" className={link}>Цены и доставка</Link></li>
              <li><Link href="/pricing#faq" className={link}>Вопросы и ответы</Link></li>
              <li><Link href="/account" className={link}>Мои книги и заказы</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Lovalova. Все иллюстрации нарисованы людьми, без ИИ.</p>
          <p>Безопасная оплата через Stripe</p>
        </div>
      </div>
    </footer>
  );
}
