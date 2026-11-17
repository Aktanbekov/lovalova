"use client";

import { useCallback, useEffect, useState } from "react";
import { BookPage, CoverPage, type BookView } from "./BookPage";
import type { PageRef } from "@/lib/book/schema";

/** Page-by-page preview with a turn animation. Index 0 is the cover. */
export function FlipBook({ book, pages, compact = false }: { book: BookView; pages: PageRef[]; compact?: boolean }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const total = pages.length + 1;

  const go = useCallback(
    (to: number) => {
      if (to < 0 || to >= total) return;
      setDir(to > i ? "next" : "prev");
      setI(to);
    },
    [i, total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input, textarea, select")) return;
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i]);

  return (
    <div>
      <div className="relative">
        <div key={i} className={`overflow-hidden rounded-2xl shadow-2xl ring-1 ring-line ${dir === "next" ? "turn-next" : "turn-prev"}`}>
          {i === 0 ? <CoverPage book={book} /> : <BookPage book={book} page={pages[i - 1]} />}
        </div>
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => go(i - 1)}
          disabled={i === 0}
          className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl text-plum shadow ring-1 ring-line transition hover:bg-white disabled:opacity-0 sm:-left-5"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => go(i + 1)}
          disabled={i === total - 1}
          className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl text-plum shadow ring-1 ring-line transition hover:bg-white disabled:opacity-0 sm:-right-5"
        >
          ›
        </button>
      </div>
      <p className="mt-3 text-center text-sm text-muted" aria-live="polite">
        {i === 0 ? "Cover" : `Page ${i} of ${pages.length}`}
      </p>
      {!compact && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {[null, ...pages].map((p, idx) => (
            <button
              key={p?.key ?? "cover"}
              type="button"
              onClick={() => go(idx)}
              aria-label={idx === 0 ? "Cover" : `Page ${idx}`}
              className={`w-24 shrink-0 overflow-hidden rounded-md border-2 transition ${idx === i ? "border-plum" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              {p ? <BookPage book={book} page={p} /> : <CoverPage book={book} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
