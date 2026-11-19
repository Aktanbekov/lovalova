import { OccasionStep } from "@/components/builder/OccasionStep";
import { loadOwnedBook } from "@/lib/loadBook";

export const metadata = { title: "Повод" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await loadOwnedBook(id);
  return <OccasionStep bookId={id} initial={data} partnerName={data.characters[1].name} />;
}
