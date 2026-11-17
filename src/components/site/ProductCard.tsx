import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { demoBook } from "@/lib/demo";
import { FROM_PRICE, money } from "@/lib/pricing";
import type { Collection } from "@/content/collections";
import { collectionHref } from "@/content/collections";
import { StarBadge } from "./icons";

/** Shop tile: coloured stage with a book mockup, a tag pill, name and price. */
export function ProductCard({ c, couple }: { c: Collection; couple: number }) {
  return (
    <Link href={collectionHref(c)} className="group flex flex-col">
      <div className={`relative grid aspect-[4/3.4] place-items-center overflow-hidden rounded-3xl px-[9%] pt-8 ${c.tone}`}>
        <span className="absolute left-1/2 top-3 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-wider text-ink shadow">
          <StarBadge className="h-3 w-3 text-brand" />
          {c.tag}
          <StarBadge className="h-3 w-3 text-brand" />
        </span>
        <BookMockup
          book={demoBook({ couple, cover: c.covers[0], title: c.title, occasion: c.occasion, relationship: c.relationship })}
          tilt="right"
          className="w-full transition duration-300 group-hover:-translate-y-1.5 group-hover:rotate-[-1deg]"
        />
      </div>
      <p className="mt-4 font-display text-2xl font-semibold leading-tight text-ink group-hover:text-wine">{c.menuLabel}</p>
      <p className="mt-1 text-muted">{c.blurb}</p>
      <p className="mt-2 font-semibold text-ink">
        From {money(FROM_PRICE)} <span className="ml-2 text-brand">Personalize →</span>
      </p>
    </Link>
  );
}
