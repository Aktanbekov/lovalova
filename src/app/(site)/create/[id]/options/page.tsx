import { redirect } from "next/navigation";
import { OptionsStep } from "@/components/builder/PreviewOptionsSteps";
import { loadOwnedBook } from "@/lib/loadBook";

export const metadata = { title: "Format" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await loadOwnedBook(id);
  if (!data.assembled) redirect(`/create/${id}/quiz`);
  if (!data.previewed) redirect(`/create/${id}/preview`);
  return <OptionsStep bookId={id} initial={data.selection} />;
}
