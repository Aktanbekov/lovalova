import Link from "next/link";
import { OCCASION_COLLECTIONS, RECIPIENT_COLLECTIONS, collectionHref } from "@/content/collections";
import { Logo } from "./Logo";
import { SubscribeForm } from "./SubscribeForm";

export function SiteFooter() {
  const col = "text-xs font-bold uppercase tracking-[0.18em] text-gold";
  const link = "text-white/85 hover:text-white hover:underline underline-offset-4";
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-white/80">Personalized love books starring the two of you. Designed by you, illustrated by people, printed on demand.</p>
            <div className="mt-6 max-w-md">
              <p className="mb-3 font-display text-2xl font-semibold">Get 10% off your first book</p>
              <SubscribeForm source="footer" dark />
            </div>
          </div>
          <nav aria-label="Occasions">
            <p className={col}>Occasions</p>
            <ul className="mt-4 space-y-2">
              {OCCASION_COLLECTIONS.map((c) => (
                <li key={c.slug}><Link href={collectionHref(c)} className={link}>{c.name}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Recipients">
            <p className={col}>Who it&apos;s for</p>
            <ul className="mt-4 space-y-2">
              {RECIPIENT_COLLECTIONS.map((c) => (
                <li key={c.slug}><Link href={collectionHref(c)} className={link}>{c.menuLabel}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Help">
            <p className={col}>Help</p>
            <ul className="mt-4 space-y-2">
              <li><Link href="/#how" className={link}>How it works</Link></li>
              <li><Link href="/books" className={link}>All book designs</Link></li>
              <li><Link href="/pricing" className={link}>Pricing &amp; shipping</Link></li>
              <li><Link href="/pricing#faq" className={link}>FAQ</Link></li>
              <li><Link href="/account" className={link}>My books &amp; orders</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} lovalova. All illustrations are original — no AI.</p>
          <p>Secure payments by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
