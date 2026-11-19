import Link from "next/link";
import { BookMockup } from "@/components/book/BookMockup";
import { demoBook } from "@/lib/demo";
import { FROM_PRICE, money } from "@/lib/pricing";
import type { Collection } from "@/content/collections";
import { collectionHref } from "@/content/collections";

/** Shop tile: the book big on a coloured stage, then the name and the price. */
export function ProductCard({ c, couple }: { c: Collection; couple: number }) {
  return (
    <Link href={collectionHref(c)} className="lift group flex flex-col">
      <div className={`zoom-frame grid aspect-[4/3.3] place-items-center rounded-xl px-[8%] pt-[6%] ${c.tone}`}>
        <BookMockup
          book={demoBook({ couple, cover: c.covers[0], title: c.title, occasion: c.occasion, relationship: c.relationship })}
          tilt="right"
          className="w-full"
        />
      </div>
      <p className="mt-2.5 font-display text-lg font-semibold leading-snug text-ink group-hover:text-wine sm:mt-3 sm:text-2xl">{c.name}</p>
      <p className="mt-0.5 text-sm text-muted sm:text-base">
        от <span className="font-semibold text-ink">{money(FROM_PRICE)}</span>
      </p>
    </Link>
  );
}
