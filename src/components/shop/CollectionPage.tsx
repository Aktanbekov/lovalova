import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { ProductCard } from "@/components/site/ProductCard";
import { Shelf } from "@/components/site/Shelf";
import { ALL_COLLECTIONS, type Collection } from "@/content/collections";
import { COVERS } from "@/lib/book/catalog";
import { demoBook } from "@/lib/demo";
import { FROM_PRICE, money } from "@/lib/pricing";

const coverLabel = (id: string) => COVERS.find((c) => c.id === id)?.label ?? id;

/** Landing page for one occasion or recipient: banner, cover choices, related shelf. */
export function CollectionPage({ c }: { c: Collection }) {
  const preset = (cover: string) => ({ occasion: c.occasion, relationship: c.relationship, cover, title: c.title });
  const related = ALL_COLLECTIONS.filter((x) => x.kind === c.kind && x.slug !== c.slug);

  return (
    <>
      <section className={`${c.tone} text-white`}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm font-semibold text-white/75">
              <Link href="/" className="hover:text-white">Home</Link> <span aria-hidden="true">/</span>{" "}
              <span>{c.kind === "occasion" ? "Occasions" : "Who it's for"}</span> <span aria-hidden="true">/</span> <span className="text-white">{c.name}</span>
            </nav>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.04] sm:text-6xl">{c.headline}</h1>
            <p className="mt-5 max-w-lg text-xl text-white/90">{c.blurb}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <CreateButton className="btn btn-white btn-lg" label="Personalize this book" preset={preset(c.covers[0])} />
              <span className="text-lg">From <strong>{money(FROM_PRICE)}</strong></span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-2 top-6 w-[58%] -rotate-6 opacity-95">
              <BookMockup book={demoBook({ couple: 2, cover: c.covers[1], title: c.title, occasion: c.occasion })} tilt="left" />
            </div>
            <div className="relative ml-auto w-[72%] pt-16">
              <BookMockup book={demoBook({ couple: 0, cover: c.covers[0], title: c.title, occasion: c.occasion })} tilt="right" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-4xl font-semibold text-ink sm:text-5xl">Choose your cover</h2>
          <p className="mt-2 text-lg text-muted">Every design is drawn with the two of you. You can change the title, characters and every page.</p>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {c.covers.map((cover, i) => (
              <li key={cover} className="flex flex-col">
                <div className="rounded-3xl bg-cream px-[9%] pb-3 pt-[9%]">
                  <BookMockup book={demoBook({ couple: i, cover, title: c.title, occasion: c.occasion })} tilt="flat" />
                </div>
                <p className="mt-4 font-display text-2xl font-semibold text-ink">{coverLabel(cover)}</p>
                <p className="text-muted">Hardcover or softcover · 16–60 pages · from {money(FROM_PRICE)}</p>
                <div className="mt-4">
                  <CreateButton className="btn btn-primary w-full sm:w-auto" label="Personalize" preset={preset(cover)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Shelf eyebrow="Keep browsing" title={c.kind === "occasion" ? "More occasions" : "Gifts for someone else"}>
            {related.map((x, i) => (
              <ProductCard key={x.slug} c={x} couple={i + 1} />
            ))}
          </Shelf>
        </div>
      </section>
    </>
  );
}
