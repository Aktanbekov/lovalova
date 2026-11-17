"use client";

import { useState } from "react";
import { FlipBook } from "@/components/book/FlipBook";
import type { BookView } from "@/components/book/BookPage";
import { markPreviewedAction } from "@/app/actions";
import type { PageRef, Selection } from "@/lib/book/schema";
import { stepHref } from "@/lib/book/steps";
import { FORMATS, UPGRADES, money, subtotal, type UpgradeId } from "@/lib/pricing";
import { useAutosave } from "./useAutosave";
import { StepFooter } from "./StepFooter";

export function PreviewStep({ bookId, book, pages }: { bookId: string; book: BookView; pages: PageRef[] }) {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-plum sm:text-4xl">Flip through your book</h1>
        <p className="mt-2 text-muted">This is exactly how it will print. Use the arrows or your keyboard to turn pages.</p>
        <div className="mt-6">
          <FlipBook book={book} pages={pages} />
        </div>
      </div>
      <StepFooter
        backHref={stepHref(bookId, "edit")}
        nextHref={stepHref(bookId, "options")}
        nextLabel="Looks perfect — continue"
        beforeNext={async () => (await markPreviewedAction(bookId)).ok}
      />
    </>
  );
}

export function OptionsStep({ bookId, initial }: { bookId: string; initial: Selection }) {
  const [sel, setSel] = useState<Selection>(initial);
  const { status, error, saveNow } = useAutosave(bookId, { selection: sel });

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-plum sm:text-4xl">Choose your format</h1>
        <p className="mt-2 text-muted">One price for any length. Printed on demand and shipped to your door.</p>

        <div role="radiogroup" aria-label="Format" className="mt-6 grid gap-3 sm:grid-cols-2">
          {(Object.keys(FORMATS) as (keyof typeof FORMATS)[]).map((f) => (
            <button
              key={f}
              role="radio"
              aria-checked={sel.format === f}
              onClick={() => setSel({ ...sel, format: f })}
              className={`rounded-2xl border-2 bg-paper p-5 text-left transition ${sel.format === f ? "border-plum bg-blush/40" : "border-line hover:border-plum/50"}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xl font-semibold text-plum">{FORMATS[f].label}</span>
                <span className="font-semibold">{money(FORMATS[f].cents)}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{FORMATS[f].blurb}</p>
              {f === "hardcover" && <span className="mt-3 inline-block rounded-full bg-gold/30 px-2.5 py-0.5 text-xs font-semibold text-plum">Our pick for gifts</span>}
            </button>
          ))}
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold text-plum">Add a little extra</h2>
        <div className="mt-4 flex flex-col gap-3">
          {(Object.keys(UPGRADES) as UpgradeId[]).map((u) => (
            <label key={u} className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 bg-paper p-4 transition ${sel[u] ? "border-plum" : "border-line hover:border-plum/50"}`}>
              <input type="checkbox" className="h-5 w-5 accent-plum" checked={sel[u]} onChange={(e) => setSel({ ...sel, [u]: e.target.checked })} />
              <span className="flex-1">
                <span className="block font-semibold">{UPGRADES[u].label}</span>
                <span className="block text-sm text-muted">{UPGRADES[u].blurb}</span>
              </span>
              <span className="font-semibold">+{money(UPGRADES[u].cents)}</span>
            </label>
          ))}
        </div>

        <div className="mt-8 flex items-baseline justify-between rounded-2xl bg-plum px-5 py-4 text-white">
          <span>Book total</span>
          <span className="font-display text-2xl font-semibold">{money(subtotal(sel))}</span>
        </div>
        <p className="mt-2 text-sm text-muted">Shipping is chosen at checkout.</p>
      </div>
      <StepFooter
        backHref={stepHref(bookId, "preview")}
        nextHref={`/cart/${bookId}`}
        nextLabel="Go to cart"
        status={status}
        error={error}
        beforeNext={saveNow}
      />
    </>
  );
}
