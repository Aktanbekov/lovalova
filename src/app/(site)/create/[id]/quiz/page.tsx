import { QuizStep } from "@/components/builder/QuizStep";
import { loadOwnedBook } from "@/lib/loadBook";
import { textContext } from "@/lib/book/assemble";

export const metadata = { title: "Вопросы" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await loadOwnedBook(id);
  return <QuizStep bookId={id} initial={data.answers} ctx={textContext(data)} assembled={data.assembled} />;
}
