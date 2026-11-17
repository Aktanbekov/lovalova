import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { OCCASION_COLLECTIONS, RECIPIENT_COLLECTIONS, collectionHref } from "@/content/collections";
import { COVERS } from "@/lib/book/catalog";
import { currentUser } from "@/lib/auth";
import { demoBook } from "@/lib/demo";
import { readOwner } from "@/lib/owner";
import { FEATURED_PROMO } from "@/lib/promos";
import { cartBooks, latestDraft } from "@/lib/store";
import { AccountMenu } from "./AccountMenu";
import { Logo } from "./Logo";
import { MainNav, type NavMenu } from "./MainNav";
import { PromoBar } from "./PromoBar";
import { BagIcon } from "./icons";

function FeatureTile({ couple, cover, title, label, text, href, tone }: { couple: number; cover: (typeof COVERS)[number]["id"]; title: string; label: string; text: string; href: string; tone: string }) {
  return (
    <Link href={href} className={`group flex h-full items-center gap-5 rounded-2xl p-5 text-white ${tone}`}>
      <BookMockup book={demoBook({ couple, cover, title })} tilt="right" className="w-[52%] shrink-0 transition group-hover:-translate-y-1" />
      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-gold">{label}</span>
        <span className="mt-1 block font-display text-2xl font-semibold leading-tight">{text}</span>
        <span className="mt-3 inline-block font-semibold underline underline-offset-4">Shop now</span>
      </span>
    </Link>
  );
}

export async function SiteHeader() {
  const [user, owner] = await Promise.all([currentUser(), readOwner()]);
  const draft = owner ? latestDraft(owner) : null;
  const cartCount = owner ? cartBooks(owner).length : 0;
  const draftHref = draft && draft.status === "draft" ? `/create/${draft.id}/characters` : null;

  const menus: NavMenu[] = [
    {
      label: "Occasions",
      columns: [
        { title: "Shop by occasion", links: OCCASION_COLLECTIONS.slice(0, 4).map((c) => ({ label: c.menuLabel, href: collectionHref(c), note: c.slug === "christmas" ? "Seasonal" : undefined })) },
        { title: "More reasons", links: OCCASION_COLLECTIONS.slice(4).map((c) => ({ label: c.menuLabel, href: collectionHref(c) })) },
      ],
      feature: <FeatureTile couple={2} cover="snow" title="Our Christmas Story" label="Seasonal pick" text="Wrap up your whole love story" href="/occasions/christmas" tone="bg-[#1f6b47]" />,
    },
    {
      label: "Who it's for",
      columns: [{ title: "Shop by recipient", links: RECIPIENT_COLLECTIONS.map((c) => ({ label: c.menuLabel, href: collectionHref(c) })) }],
      feature: <FeatureTile couple={1} cover="bigheart" title="Why I Love My Wife" label="For the one" text="Tell them exactly why — page after page" href="/for/wife" tone="bg-wine" />,
    },
    {
      label: "Book designs",
      columns: [
        { title: "Covers", links: COVERS.map((c) => ({ label: c.label, href: `/books#${c.id}` })) },
      ],
      feature: <FeatureTile couple={3} cover="sunrise" title="Our Love Story" label="All designs" text={`${COVERS.length} covers, each drawn with the two of you`} href="/books" tone="bg-night" />,
    },
    { label: "How it works", href: "/#how" },
    { label: "Pricing & shipping", href: "/pricing" },
  ];

  const messages = [
    { text: `${FEATURED_PROMO.headline} with code`, code: FEATURED_PROMO.code },
    { text: "Free to design and preview — pay only when you love it", href: "/#how", linkLabel: "How it works" },
    { text: "Original illustrations by people, never AI", href: "/books", linkLabel: "See the designs" },
  ];

  return (
    <>
      <PromoBar messages={messages} />
      <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="relative">
          <div className="mx-auto flex h-[4.5rem] max-w-7xl items-stretch justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 items-stretch gap-1">
              <MainNav
                menus={menus}
                logo={
                  <Link href="/" aria-label="lovalova home" className="flex items-center lg:mr-4 xl:mr-8">
                    <Logo />
                  </Link>
                }
                mobileExtra={
                  <div className="space-y-2">
                    <Link href="/account" className="btn btn-secondary w-full">
                      {user ? "My books & orders" : "My books"}
                    </Link>
                    {!user && (
                      <Link href="/account/sign-in" className="btn btn-primary w-full">
                        Sign in
                      </Link>
                    )}
                  </div>
                }
              />
            </div>
            <div className="flex items-center gap-1">
              <AccountMenu user={user ? { email: user.email, name: user.name } : null} draftHref={draftHref} />
              <Link href="/cart" className="relative grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-blush" aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "book" : "books"}`}>
                <BagIcon />
                {cartCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[0.7rem] font-bold text-white">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
