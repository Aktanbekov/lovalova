import { CoverStep } from "@/components/builder/CoverStep";
import { loadOwnedBook } from "@/lib/loadBook";

export const metadata = { title: "Cover" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await loadOwnedBook(id);
  return <CoverStep bookId={id} book={data} />;
}
