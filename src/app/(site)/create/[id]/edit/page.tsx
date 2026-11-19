import { redirect } from "next/navigation";
import { EditStep } from "@/components/builder/EditStep";
import { loadOwnedBook } from "@/lib/loadBook";

export const metadata = { title: "Страницы" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await loadOwnedBook(id);
  if (!data.assembled) redirect(`/create/${id}/quiz`);
  return <EditStep bookId={id} book={data} initialPages={data.pages} />;
}
