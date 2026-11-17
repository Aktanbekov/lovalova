"use client";

import { useState } from "react";
import { CoverPage, type BookView } from "@/components/book/BookPage";
import { COVERS } from "@/lib/book/catalog";
import { LIMITS, type BookData } from "@/lib/book/schema";
import { stepHref } from "@/lib/book/steps";
import { useAutosave } from "./useAutosave";
import { StepFooter } from "./StepFooter";

const TITLE_IDEAS = ["Why I Love You", "Reasons I Love You, {B}", "{A} & {B}", "Our Love Story", "You & Me"];

export function CoverStep({ bookId, book }: { bookId: string; book: BookView }) {
  const [cover, setCover] = useState<BookData["cover"]>(book.cover);
  const { status, error, saveNow } = useAutosave(bookId, { cover });
  const view = { ...book, cover };

  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="min-w-0">
          <h1 className="font-display text-3xl font-semibold text-plum sm:text-4xl">Choose your cover</h1>
          <p className="mt-2 text-muted">Drawn with your characters. You can change the title, too.</p>
          <div className="mt-6 overflow-hidden rounded-2xl shadow-xl ring-1 ring-line">
            <CoverPage book={view} />
          </div>
        </section>
        <section className="min-w-0 lg:pt-16">
          <div role="radiogroup" aria-label="Cover design" className="grid grid-cols-3 gap-3">
            {COVERS.map((c) => (
              <button
                key={c.id}
                role="radio"
                aria-checked={cover.id === c.id}
                onClick={() => setCover((v) => ({ ...v, id: c.id }))}
                className={`overflow-hidden rounded-xl border-2 text-left transition ${cover.id === c.id ? "border-plum" : "border-transparent ring-1 ring-line hover:ring-plum/40"}`}
              >
                <CoverPage book={view} coverId={c.id} />
                <span className="block bg-paper px-2 py-1.5 text-xs font-medium">{c.label}</span>
              </button>
            ))}
          </div>

          <label className="mt-8 block">
            <span className="text-sm font-medium">Cover title</span>
            <input
              className="field mt-1"
              value={cover.title}
              maxLength={LIMITS.title}
              onChange={(e) => setCover((v) => ({ ...v, title: e.target.value }))}
            />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {TITLE_IDEAS.map((t) => (
              <button key={t} type="button" className="chip !px-3 !py-1 text-sm" aria-pressed={cover.title === t} onClick={() => setCover((v) => ({ ...v, title: t }))}>
                {t.replace("{A}", book.characters[0].name || "You").replace("{B}", book.characters[1].name || "Them")}
              </button>
            ))}
          </div>
        </section>
      </div>
      <StepFooter
        backHref={stepHref(bookId, "occasion")}
        nextHref={stepHref(bookId, "quiz")}
        canContinue={cover.title.trim().length > 0}
        hint="Add a cover title"
        status={status}
        error={error}
        beforeNext={saveNow}
      />
    </>
  );
}
