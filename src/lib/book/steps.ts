export const STEPS = [
  { slug: "characters", label: "Characters" },
  { slug: "occasion", label: "Occasion" },
  { slug: "cover", label: "Cover" },
  { slug: "quiz", label: "Questions" },
  { slug: "edit", label: "Pages" },
  { slug: "preview", label: "Preview" },
  { slug: "options", label: "Format" },
] as const;

export type StepSlug = (typeof STEPS)[number]["slug"];

export function stepHref(bookId: string, slug: StepSlug) {
  return `/create/${bookId}/${slug}`;
}
