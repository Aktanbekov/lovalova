import { notFound } from "next/navigation";
import { CollectionPage } from "@/components/shop/CollectionPage";
import { OCCASION_COLLECTIONS, findCollection } from "@/content/collections";

export function generateStaticParams() {
  return OCCASION_COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = findCollection("occasion", (await params).slug);
  return { title: c ? `Книга в подарок: ${c.name}` : "Не найдено", description: c?.blurb };
}

export default async function OccasionPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = findCollection("occasion", (await params).slug);
  if (!c) notFound();
  return <CollectionPage c={c} />;
}
