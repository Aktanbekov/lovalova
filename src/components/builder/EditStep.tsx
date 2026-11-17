"use client";

import { useMemo, useState } from "react";
import { BookPage, type BookView } from "@/components/book/BookPage";
import { CATEGORY_LABELS, getTemplate, type Category } from "@/content/pages";
import { availableTemplates, pageKey, pageText } from "@/lib/book/assemble";
import { LIMITS, type PageRef } from "@/lib/book/schema";
import { stepHref } from "@/lib/book/steps";
import { useAutosave } from "./useAutosave";
import { StepFooter } from "./StepFooter";

export function EditStep({ bookId, book, initialPages }: { bookId: string; book: BookView; initialPages: PageRef[] }) {
  const [pages, setPages] = useState<PageRef[]>(initialPages);
  const [sel, setSel] = useState(0);
  const [library, setLibrary] = useState(false);
  const { status, error, saveNow } = useAutosave(bookId, { pages });

  const page = pages[sel];
  const tpl = page ? getTemplate(page.templateId) : undefined;
  const currentText = page ? pageText(page, book) : "";
  const available = useMemo(() => availableTemplates(pages), [pages]);
  const grouped = useMemo(() => {
    const m = new Map<Category, typeof available>();
    for (const t of available) m.set(t.category, [...(m.get(t.category) ?? []), t]);
    return [...m.entries()];
  }, [available]);

  const move = (dir: -1 | 1) => {
    const to = sel + dir;
    if (to < 1 || to >= pages.length || sel === 0) return; // dedication stays first
    const next = [...pages];
    [next[sel], next[to]] = [next[to], next[sel]];
    setPages(next);
    setSel(to);
  };
  const remove = () => {
    if (pages.length <= LIMITS.minPages || sel === 0) return;
    setPages(pages.filter((_, i) => i !== sel));
    setSel(Math.max(0, sel - 1));
  };
  const add = (templateId: string) => {
    if (pages.length >= LIMITS.maxPages) return;
    const at = Math.max(1, sel + 1);
    const next = [...pages];
    next.splice(at, 0, { key: pageKey(), templateId });
    setPages(next);
    setSel(at);
    setLibrary(false);
  };
  const setText = (text: string | undefined) => setPages(pages.map((p, i) => (i === sel ? { ...p, text } : p)));

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold text-plum sm:text-4xl">Your book is ready to edit</h1>
            <p className="mt-2 text-muted">
              {pages.length} pages. Change any words, reorder pages, or add more from the library ({LIMITS.minPages}–{LIMITS.maxPages} pages, same price).
            </p>
          </div>
          <button type="button" className="btn btn-secondary text-sm" onClick={() => setLibrary(true)} disabled={pages.length >= LIMITS.maxPages}>
            + Add a page
          </button>
        </div>

        {page && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr] [&>*]:min-w-0">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-line">
              <BookPage book={book} page={page} />
            </div>
            <div className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-dark">
                Page {sel + 1} · {tpl?.label}
              </p>
              <label className="mt-3 block">
                <span className="text-sm font-medium">Words on this page</span>
                <textarea
                  className="field mt-1 min-h-36"
                  maxLength={LIMITS.pageText}
                  value={page.text ?? currentText}
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
              <div className="mt-1 flex justify-between text-xs text-muted">
                <button type="button" className="underline disabled:opacity-40" disabled={page.text === undefined} onClick={() => setText(undefined)}>
                  Reset to original
                </button>
                <span>
                  {(page.text ?? currentText).length}/{LIMITS.pageText}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" className="btn btn-secondary !px-3 !py-2 text-sm" onClick={() => move(-1)} disabled={sel <= 1}>
                  ← Move earlier
                </button>
                <button type="button" className="btn btn-secondary !px-3 !py-2 text-sm" onClick={() => move(1)} disabled={sel === 0 || sel >= pages.length - 1}>
                  Move later →
                </button>
                <button
                  type="button"
                  className="btn btn-secondary !px-3 !py-2 text-sm text-rose-dark"
                  onClick={remove}
                  disabled={sel === 0 || pages.length <= LIMITS.minPages}
                >
                  Remove page
                </button>
              </div>
            </div>
          </div>
        )}

        <ol className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {pages.map((p, i) => (
            <li key={p.key}>
              <button
                type="button"
                onClick={() => setSel(i)}
                aria-current={i === sel}
                aria-label={`Page ${i + 1}: ${getTemplate(p.templateId)?.label}`}
                className={`block w-full overflow-hidden rounded-lg border-2 transition ${i === sel ? "border-plum shadow-md" : "border-transparent ring-1 ring-line hover:ring-plum/40"}`}
              >
                <BookPage book={book} page={p} />
              </button>
              <span className="mt-1 block text-center text-xs text-muted">{i + 1}</span>
            </li>
          ))}
        </ol>
      </div>

      {library && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Page library" onClick={() => setLibrary(false)}>
          <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-cream p-5 sm:rounded-3xl sm:p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-plum">Add a page</h2>
              <button type="button" className="btn btn-secondary !px-3 !py-1.5 text-sm" onClick={() => setLibrary(false)}>
                Close
              </button>
            </div>
            <p className="mt-1 text-sm text-muted">It&apos;s added after page {sel + 1}.</p>
            {grouped.map(([cat, list]) => (
              <section key={cat} className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-dark">{CATEGORY_LABELS[cat]}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {list.map((t) => (
                    <button key={t.id} type="button" onClick={() => add(t.id)} className="overflow-hidden rounded-xl bg-paper text-left ring-1 ring-line hover:ring-plum">
                      <BookPage book={book} page={{ key: t.id, templateId: t.id }} />
                      <span className="block px-2 py-1.5 text-xs font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      <StepFooter
        backHref={stepHref(bookId, "quiz")}
        nextHref={stepHref(bookId, "preview")}
        nextLabel="Preview my book"
        status={status}
        error={error}
        beforeNext={saveNow}
      />
    </>
  );
}
