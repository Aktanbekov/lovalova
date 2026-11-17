import { notFound } from "next/navigation";
import { CollectionPage } from "@/components/shop/CollectionPage";
import { RECIPIENT_COLLECTIONS, findCollection } from "@/content/collections";

export function generateStaticParams() {
  return RECIPIENT_COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = findCollection("recipient", (await params).slug);
  return { title: c ? `Love books ${c.name.toLowerCase()}` : "Not found", description: c?.blurb };
}

export default async function RecipientPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = findCollection("recipient", (await params).slug);
  if (!c) notFound();
  return <CollectionPage c={c} />;
}
