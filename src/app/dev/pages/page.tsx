import { notFound } from "next/navigation";
import { BookPage, CoverPage } from "@/components/book/BookPage";
import { AvatarSvg } from "@/components/avatar/Avatar";
import { TEMPLATES } from "@/content/pages";
import { defaultBook } from "@/lib/book/schema";
import { HAIR_STYLES, OUTFITS, DEFAULT_TRAITS_A, DEFAULT_TRAITS_B } from "@/lib/avatar/options";

/** Development-only gallery of every page template and avatar part. */
export default function DevPages() {
  if (process.env.NODE_ENV === "production") notFound();
  const book = defaultBook();
  book.characters = [
    { name: "Alex", traits: { ...DEFAULT_TRAITS_A } },
    { name: "Sam", traits: { ...DEFAULT_TRAITS_B } },
  ];
  book.answers = { ...book.answers, since: 2019, dedication: "To Sam, the best thing that ever happened to me. All my love, Alex" };
  return (
    <div className="space-y-10 p-6">
      <section className="grid grid-cols-6 gap-3 bg-white p-4">
        {HAIR_STYLES.map((h) => (
          <div key={h.id} className="text-center text-xs">
            <AvatarSvg traits={{ ...DEFAULT_TRAITS_B, hair: h.id }} className="h-40 w-full" />
            {h.id}
          </div>
        ))}
        {OUTFITS.map((o) => (
          <div key={o.id} className="text-center text-xs">
            <AvatarSvg traits={{ ...DEFAULT_TRAITS_A, outfit: o.id, facialHair: "beard", glasses: "round" }} className="h-40 w-full" />
            {o.id}
          </div>
        ))}
      </section>
      <section className="grid grid-cols-3 gap-4">
        {(["hearts", "stars", "bigheart"] as const).map((c) => (
          <CoverPage key={c} book={book} coverId={c} />
        ))}
        {TEMPLATES.map((t) => (
          <div key={t.id}>
            <BookPage book={book} page={{ key: t.id, templateId: t.id }} />
            <p className="text-xs text-muted">{t.id}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
