"use client";

import { useState } from "react";
import { OCCASIONS, RELATIONSHIPS } from "@/lib/book/catalog";
import type { BookData } from "@/lib/book/schema";
import { stepHref } from "@/lib/book/steps";
import { useAutosave } from "./useAutosave";
import { StepFooter } from "./StepFooter";

export function OccasionStep({
  bookId,
  initial,
  partnerName,
}: {
  bookId: string;
  initial: Pick<BookData, "occasion" | "relationship">;
  partnerName: string;
}) {
  const [occasion, setOccasion] = useState(initial.occasion);
  const [relationship, setRelationship] = useState(initial.relationship);
  const { status, error, saveNow } = useAutosave(bookId, { occasion, relationship });

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-plum sm:text-4xl">Какой повод?</h1>
        <p className="mt-2 text-muted">Для него в конце книги будет особая страница.</p>

        <div role="radiogroup" aria-label="Повод" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {OCCASIONS.map((o) => (
            <button
              key={o.id}
              role="radio"
              aria-checked={occasion === o.id}
              onClick={() => setOccasion(o.id)}
              className={`rounded-xl border-2 bg-paper px-3 py-5 text-center font-semibold transition ${occasion === o.id ? "border-plum bg-blush/50 text-plum" : "border-line hover:border-plum/50"}`}
            >
              {o.label}
            </button>
          ))}
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold text-plum">Кто для вас {partnerName || "ваша половинка"}?</h2>
        <div role="radiogroup" aria-label="Кем приходится" className="mt-4 flex flex-wrap gap-2">
          {RELATIONSHIPS.map((r) => (
            <button key={r.id} role="radio" aria-checked={relationship === r.id} onClick={() => setRelationship(r.id)} className="chip">
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <StepFooter
        backHref={stepHref(bookId, "characters")}
        nextHref={stepHref(bookId, "cover")}
        status={status}
        error={error}
        beforeNext={saveNow}
      />
    </>
  );
}
