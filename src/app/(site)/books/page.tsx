import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { COVERS } from "@/lib/book/catalog";
import { demoBook } from "@/lib/demo";
import { FROM_PRICE, money } from "@/lib/pricing";

export const metadata = { title: "All book designs" };

const TITLES = ["Why I Love You", "Reasons I Love You, {B}", "Our Love Story", "{A} & {B}", "You & Me", "Happy Anniversary, {B}", "Our Christmas Story", "Thinking of You, {B}"];

export default function BooksPage() {
  return (
    <>
      <section className="bg-night text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">All designs</p>
          <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">Pick a cover, make it yours</h1>
          <p className="mx-auto mt-4 max-w-xl text-xl text-white/85">{COVERS.length} illustrated covers, each drawn with your two characters. Change the title to anything you like.</p>
        </div>
      </section>
      <section className="py-14 sm:py-20">
        <ul className="mx-auto grid max-w-7xl gap-x-6 gap-y-14 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {COVERS.map((c, i) => (
            <li key={c.id} id={c.id} className="scroll-mt-28">
              <div className="rounded-3xl bg-cream px-[9%] pb-3 pt-[9%]">
                <BookMockup book={demoBook({ couple: i, cover: c.id, title: TITLES[i % TITLES.length] })} tilt="flat" />
              </div>
              <p className="mt-4 font-display text-2xl font-semibold text-ink">{c.label}</p>
              <p className="text-muted">From {money(FROM_PRICE)} · 16–60 pages</p>
              <div className="mt-4">
                <CreateButton className="btn btn-primary" label="Personalize" preset={{ cover: c.id, title: TITLES[i % TITLES.length] }} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
