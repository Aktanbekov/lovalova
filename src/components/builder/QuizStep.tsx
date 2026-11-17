"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { finishQuizAction, saveBookAction } from "@/app/actions";
import { ACTIVITIES, DEDICATION_TEMPLATES, FEATURES, QUALITIES } from "@/lib/book/catalog";
import { fillText, type TextContext } from "@/lib/book/assemble";
import { LIMITS, type Answers } from "@/lib/book/schema";
import { stepHref } from "@/lib/book/steps";

type Multi = "features" | "qualities" | "activities";

const QUESTIONS: { key: Multi; title: (b: string) => string; help: string; options: readonly { id: string; label: string }[]; max: number }[] = [
  { key: "features", title: (b) => `Pick 3 things you adore about ${b}`, help: "Each one gets its own page.", options: FEATURES, max: LIMITS.features },
  { key: "qualities", title: (b) => `Pick 4 words that describe ${b}`, help: "The qualities you love most.", options: QUALITIES, max: LIMITS.qualities },
  { key: "activities", title: () => "Pick 4 things you love doing together", help: "Your favourite ways to spend time.", options: ACTIVITIES, max: LIMITS.activities },
];

export function QuizStep({
  bookId,
  initial,
  ctx,
  assembled,
}: {
  bookId: string;
  initial: Answers;
  ctx: TextContext;
  assembled: boolean;
}) {
  const router = useRouter();
  const [a, setA] = useState<Answers>(initial);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const year = new Date().getFullYear();
  const years = Array.from({ length: year - 1949 }, (_, i) => year - i);
  const total = 5;

  const toggle = (key: Multi, id: string, max: number) =>
    setA((prev) => {
      const list = prev[key] as string[];
      const has = list.includes(id);
      if (!has && list.length >= max) return prev;
      return { ...prev, [key]: has ? list.filter((x) => x !== id) : [...list, id] } as Answers;
    });

  const valid = [
    true,
    a.features.length === LIMITS.features,
    a.qualities.length === LIMITS.qualities,
    a.activities.length === LIMITS.activities,
    a.dedication.trim().length > 0,
  ];

  async function next() {
    setError(null);
    if (step < total - 1) {
      void saveBookAction(bookId, { answers: a });
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setBusy(true);
    const res = await finishQuizAction(bookId, a);
    if (res.ok) router.push(stepHref(bookId, "edit"));
    else {
      setError(res.error);
      setBusy(false);
    }
  }

  const q = step >= 1 && step <= 3 ? QUESTIONS[step - 1] : null;

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
          Question {step + 1} of {total}
        </p>

        {step === 0 && (
          <section>
            <h1 className="mt-2 font-display text-3xl font-semibold text-plum sm:text-4xl">When did you two get together?</h1>
            <p className="mt-2 text-muted">We&apos;ll count the years for you. You can skip this one.</p>
            <select
              className="field mt-6 max-w-xs"
              value={a.since ?? ""}
              onChange={(e) => setA({ ...a, since: e.target.value ? Number(e.target.value) : null })}
              aria-label="Year you got together"
            >
              <option value="">Prefer not to say</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </section>
        )}

        {q && (
          <section>
            <h1 className="mt-2 font-display text-3xl font-semibold text-plum sm:text-4xl">{q.title(ctx.B)}</h1>
            <p className="mt-2 text-muted">
              {q.help} <span className="font-medium text-plum">{(a[q.key] as string[]).length} of {q.max} chosen.</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {q.options.map((o) => {
                const chosen = (a[q.key] as string[]).includes(o.id);
                const full = !chosen && (a[q.key] as string[]).length >= q.max;
                return (
                  <button key={o.id} type="button" aria-pressed={chosen} disabled={full} onClick={() => toggle(q.key, o.id, q.max)} className="chip disabled:opacity-40">
                    {o.label}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h1 className="mt-2 font-display text-3xl font-semibold text-plum sm:text-4xl">Write a dedication</h1>
            <p className="mt-2 text-muted">It goes on the first page. Start from an idea below or write your own.</p>
            <div className="mt-5 flex flex-col gap-2">
              {DEDICATION_TEMPLATES.map((t) => {
                const text = fillText(t, ctx);
                return (
                  <button key={t} type="button" onClick={() => setA({ ...a, dedication: text })} className="rounded-xl border border-line bg-paper px-4 py-3 text-left text-sm hover:border-plum">
                    {text}
                  </button>
                );
              })}
            </div>
            <textarea
              className="field mt-5 min-h-32"
              value={a.dedication}
              maxLength={LIMITS.dedication}
              onChange={(e) => setA({ ...a, dedication: e.target.value })}
              aria-label="Dedication"
              placeholder={`To ${ctx.B}…`}
            />
            <p className="mt-1 text-right text-xs text-muted">
              {a.dedication.length}/{LIMITS.dedication}
            </p>
            {assembled && (
              <p className="mt-4 rounded-xl bg-blush/50 px-4 py-3 text-sm text-plum">
                Finishing the questions again rebuilds your pages, so any page edits you made will be replaced.{" "}
                <Link href={stepHref(bookId, "edit")} className="font-semibold underline">
                  Keep my current pages instead
                </Link>
              </p>
            )}
          </section>
        )}
      </div>

      <div className="sticky bottom-0 z-20 mt-10 border-t border-line bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {step === 0 ? (
            <Link href={stepHref(bookId, "cover")} className="btn btn-secondary !px-4 !py-2.5 text-sm">
              Back
            </Link>
          ) : (
            <button type="button" className="btn btn-secondary !px-4 !py-2.5 text-sm" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          <div className="flex items-center gap-3">
            {error && <span className="text-sm text-rose-dark">{error}</span>}
            <button type="button" className="btn btn-primary !py-2.5" disabled={!valid[step] || busy} onClick={next}>
              {busy ? "Building your book…" : step === total - 1 ? "Build my book" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
