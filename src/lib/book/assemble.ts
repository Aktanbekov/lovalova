import { count } from "@/lib/ru";
import { DEFAULT_EXTRAS, getTemplate, TEMPLATES } from "@/content/pages";
import { RELATIONSHIPS } from "./catalog";
import type { Answers, BookData, PageRef } from "./schema";

let counter = 0;
/** Short unique key for a page instance (stable across reorders). */
export function pageKey(): string {
  counter = (counter + 1) % 1_000_000;
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}${counter.toString(36)}`;
}

/**
 * Turn quiz answers into the ordered page list.
 * Order: dedication, intro, since, features, qualities, activities,
 * extras, occasion, future, closing.
 */
export function assemblePages(answers: Answers, occasion: string, makeKey: () => string = pageKey): PageRef[] {
  const ids: string[] = ["core-dedication", "core-intro"];
  if (answers.since !== null) ids.push("core-since");
  if (answers.features.length) {
    ids.push("core-features", ...answers.features.map((f) => `feature-${f}`));
  }
  if (answers.qualities.length) {
    ids.push("core-qualities", ...answers.qualities.map((q) => `quality-${q}`));
  }
  if (answers.activities.length) {
    ids.push("core-activities", ...answers.activities.map((a) => `activity-${a}`));
  }
  ids.push(...DEFAULT_EXTRAS);
  ids.push(`occasion-${occasion}`, "core-future-1", "core-future-2", "core-closing");

  const seen = new Set<string>();
  return ids
    .filter((id) => {
      if (seen.has(id) || !getTemplate(id)) return false;
      seen.add(id);
      return true;
    })
    .map((templateId) => ({ key: makeKey(), templateId }));
}

/** Templates the buyer could still add from the library. */
export function availableTemplates(pages: PageRef[]) {
  const used = new Set(pages.map((p) => p.templateId));
  return TEMPLATES.filter((tpl) => tpl.id !== "core-dedication" && !used.has(tpl.id));
}

export function yearsText(since: number | null, now = new Date()): string {
  if (since === null) return "";
  const years = now.getFullYear() - since;
  if (years <= 0) return "меньше года";
  return count(years, ["год", "года", "лет"]);
}

export interface TextContext {
  A: string;
  B: string;
  rel: string;
  since: string;
  years: string;
}

export function textContext(book: Pick<BookData, "characters" | "relationship" | "answers">, now = new Date()): TextContext {
  return {
    A: book.characters[0].name.trim() || "Я",
    B: book.characters[1].name.trim() || "Ты",
    rel: RELATIONSHIPS.find((r) => r.id === book.relationship)?.word ?? "моей половинке",
    since: book.answers.since === null ? "" : String(book.answers.since),
    years: yearsText(book.answers.since, now),
  };
}

export function fillText(text: string, ctx: TextContext): string {
  return text.replace(/\{(A|B|rel|since|years)\}/g, (_, k: keyof TextContext) => ctx[k]);
}

/** The text a page will actually print with (override or template). */
export function pageText(page: PageRef, book: Pick<BookData, "characters" | "relationship" | "answers">): string {
  const ctx = textContext(book);
  if (page.templateId === "core-dedication") {
    return fillText(page.text ?? book.answers.dedication, ctx);
  }
  const tpl = getTemplate(page.templateId);
  return fillText(page.text ?? tpl?.text ?? "", ctx);
}
