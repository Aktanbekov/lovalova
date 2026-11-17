import { redirect } from "next/navigation";
import { PreviewStep } from "@/components/builder/PreviewOptionsSteps";
import { loadOwnedBook } from "@/lib/loadBook";

export const metadata = { title: "Preview" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await loadOwnedBook(id);
  if (!data.assembled) redirect(`/create/${id}/quiz`);
  return <PreviewStep bookId={id} book={data} pages={data.pages} />;
}
