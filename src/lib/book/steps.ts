export const STEPS = [
  { slug: "characters", label: "Герои" },
  { slug: "occasion", label: "Повод" },
  { slug: "cover", label: "Обложка" },
  { slug: "quiz", label: "Вопросы" },
  { slug: "edit", label: "Страницы" },
  { slug: "preview", label: "Просмотр" },
  { slug: "options", label: "Формат" },
] as const;

export type StepSlug = (typeof STEPS)[number]["slug"];

export function stepHref(bookId: string, slug: StepSlug) {
  return `/create/${bookId}/${slug}`;
}
