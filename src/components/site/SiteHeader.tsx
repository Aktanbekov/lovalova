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
    <Link href={href} className={`lift group flex h-full items-center gap-5 rounded-xl p-5 text-white ${tone}`}>
      <BookMockup book={demoBook({ couple, cover, title })} tilt="right" className="w-[52%] shrink-0" />
      <span>
        <span className="block text-sm font-semibold text-gold">{label}</span>
        <span className="mt-1 block font-display text-2xl font-semibold leading-tight">{text}</span>
        <span className="mt-3 inline-block font-semibold underline underline-offset-4">Смотреть</span>
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
      label: "Повод",
      columns: [
        { title: "Праздники", links: OCCASION_COLLECTIONS.slice(0, 5).map((c) => ({ label: c.menuLabel, href: collectionHref(c) })) },
        { title: "Особые моменты", links: OCCASION_COLLECTIONS.slice(5).map((c) => ({ label: c.menuLabel, href: collectionHref(c) })) },
      ],
      feature: <FeatureTile couple={2} cover="snow" title="Наш Новый год" label="Скоро праздник" text="Ваша история под ёлкой" href="/occasions/new-year" tone="bg-[#1f6b47]" />,
    },
    {
      label: "Кому",
      columns: [{ title: "Кому дарим", links: RECIPIENT_COLLECTIONS.map((c) => ({ label: c.menuLabel, href: collectionHref(c) })) }],
      feature: <FeatureTile couple={1} cover="bigheart" title="Почему я тебя люблю" label="Самое популярное" text="Скажите, за что любите, страница за страницей" href="/for/girlfriend" tone="bg-wine" />,
    },
    {
      label: "Обложки",
      columns: [{ title: "Все обложки", links: COVERS.map((c) => ({ label: c.label, href: `/books#${c.id}` })) }],
      feature: <FeatureTile couple={3} cover="sunrise" title="Наша история любви" label="Все обложки" text={`${COVERS.length} обложек с вашими героями`} href="/books" tone="bg-night" />,
    },
    { label: "Как это работает", href: "/#how" },
    { label: "Цены и доставка", href: "/pricing" },
  ];

  return (
    <>
      <PromoBar text={`${FEATURED_PROMO.headline} по коду`} code={FEATURED_PROMO.code} />
      <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="relative">
          <div className="mx-auto flex h-16 max-w-7xl items-stretch justify-between gap-2 px-4 sm:h-[4.5rem] sm:px-6 lg:h-[4.25rem]">
            <div className="flex min-w-0 items-stretch gap-1">
              <MainNav
                menus={menus}
                logo={
                  <Link href="/" aria-label="Lovalova, на главную" className="flex items-center lg:mr-4 xl:mr-8">
                    <Logo className="text-[2.15rem] lg:text-[1.9rem]" />
                  </Link>
                }
                mobileExtra={
                  <div className="space-y-2">
                    <Link href="/account" className="btn btn-secondary w-full">
                      {user ? "Мои книги и заказы" : "Мои книги"}
                    </Link>
                    {!user && (
                      <Link href="/account/sign-in" className="btn btn-primary w-full">
                        Войти
                      </Link>
                    )}
                  </div>
                }
              />
            </div>
            <div className="-mr-2 flex items-center gap-1 lg:mr-0 lg:gap-0">
              <AccountMenu user={user ? { email: user.email, name: user.name } : null} draftHref={draftHref} />
              <Link href="/cart" className="relative grid h-12 w-12 place-items-center rounded-lg text-ink transition hover:bg-blush lg:h-11 lg:w-11" aria-label={`Корзина, книг: ${cartCount}`}>
                <BagIcon className="h-7 w-7 lg:h-6 lg:w-6" />
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
