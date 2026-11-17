import { CharactersStep } from "@/components/builder/CharactersStep";
import { loadOwnedBook } from "@/lib/loadBook";

export const metadata = { title: "Create your characters" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await loadOwnedBook(id);
  return <CharactersStep bookId={id} initial={book.data.characters} />;
}
