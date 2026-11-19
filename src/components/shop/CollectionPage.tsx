import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { ProductCard } from "@/components/site/ProductCard";
import { ALL_COLLECTIONS, type Collection } from "@/content/collections";
import { COVERS } from "@/lib/book/catalog";
import { demoBook } from "@/lib/demo";
import { FROM_PRICE, SHIPPING, money } from "@/lib/pricing";

const coverLabel = (id: string) => COVERS.find((c) => c.id === id)?.label ?? id;

/** One occasion or recipient: the book big, cover choices, then more gifts. */
export function CollectionPage({ c }: { c: Collection }) {
  const preset = (cover: string) => ({ occasion: c.occasion, relationship: c.relationship, cover, title: c.title });
  const related = ALL_COLLECTIONS.filter((x) => x.kind === c.kind && x.slug !== c.slug).slice(0, 4);

  return (
    <>
      <section className={`${c.tone} text-white`}>
        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-[0.8fr_1.2fr]">
          <div className="order-2 px-5 pb-8 pt-5 sm:px-6 lg:order-1 lg:py-16">
            <nav aria-label="Навигация" className="text-sm font-semibold text-white/75">
              <Link href="/" className="hover:text-white">Главная</Link> <span aria-hidden="true">/</span> <span className="text-white">{c.name}</span>
            </nav>
            <h1 className="enter mt-3 font-display text-[2rem] font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">{c.headline}</h1>
            <p className="enter enter-2 mt-3 max-w-lg text-[1.05rem] text-white/90 sm:text-xl">{c.blurb}</p>
            <div className="enter enter-3 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <CreateButton className="btn btn-white btn-lg w-full sm:w-auto" label="Создать эту книгу" preset={preset(c.covers[0])} />
              <span className="text-sm text-white/85 sm:text-base">
                от <strong className="text-white">{money(FROM_PRICE)}</strong> · доставка от {SHIPPING[0].minDays} до {SHIPPING[0].maxDays} дней
              </span>
            </div>
          </div>
          <div className="order-1 px-6 pb-2 pt-8 sm:px-10 lg:order-2 lg:py-12">
            <div className="enter mx-auto w-full max-w-2xl">
              <BookMockup book={demoBook({ couple: 0, cover: c.covers[0], title: c.title, occasion: c.occasion })} tilt="right" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-5xl">Выберите обложку</h2>
          <p className="mt-2 text-muted sm:text-lg">Каждую рисуем с вашими героями. Название, героев и любую страницу можно поменять.</p>
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
            {c.covers.map((cover, i) => (
              <li key={cover} className="flex flex-col">
                <div className="rounded-xl bg-cream px-[7%] pb-1 pt-[9%]">
                  <BookMockup book={demoBook({ couple: i, cover, title: c.title, occasion: c.occasion })} tilt="flat" />
                </div>
                <p className="mt-2.5 font-display text-lg font-semibold text-ink sm:text-2xl">{coverLabel(cover)}</p>
                <p className="text-sm text-muted sm:text-base">от {money(FROM_PRICE)}</p>
                <div className="mt-3">
                  <CreateButton className="btn btn-primary w-full !px-3 sm:w-auto sm:!px-6" label="Выбрать" preset={preset(cover)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-5xl">{c.kind === "occasion" ? "Другие поводы" : "Подарок для другого человека"}</h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:mt-10 sm:gap-x-5 lg:grid-cols-4">
            {related.map((x, i) => (
              <li key={x.slug}>
                <ProductCard c={x} couple={i + 1} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
