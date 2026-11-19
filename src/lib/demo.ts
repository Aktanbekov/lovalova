// Sample couples used for book-cover examples across the shop. Every look is
// built from the same avatar parts buyers choose from.
import type { Traits } from "@/lib/avatar/options";
import { assemblePages } from "@/lib/book/assemble";
import { defaultBook, type BookData } from "@/lib/book/schema";
import type { CoverId, OccasionId, RelationshipId } from "@/lib/book/catalog";

type Couple = { a: string; b: string; A: Traits; B: Traits };

const t = (p: Partial<Traits>): Traits => ({
  skin: "warm", face: "round", eyes: "shine", brows: "soft", hair: "sidepart", hairColor: "darkbrown",
  facialHair: "none", glasses: "none", outfit: "sweater", outfitColor: "denim", blush: true, ...p,
});

export const COUPLES: Couple[] = [
  { a: "Айбек", b: "Айпери", A: t({}), B: t({ skin: "light", hair: "long", hairColor: "auburn", eyes: "lashes", outfit: "dress", outfitColor: "rose" }) },
  { a: "Тимур", b: "Алина", A: t({ skin: "tan", hair: "buzz", hairColor: "black", facialHair: "beard", outfit: "shirt", outfitColor: "sage" }), B: t({ skin: "tan", hair: "curly", hairColor: "black", eyes: "happy", outfit: "dress", outfitColor: "mustard" }) },
  { a: "Арман", b: "Дана", A: t({ skin: "warm", hair: "curly", hairColor: "darkbrown", glasses: "round", outfit: "hoodie", outfitColor: "charcoal" }), B: t({ skin: "light", hair: "ponytail", hairColor: "black", eyes: "lashes", outfit: "blazer", outfitColor: "plum" }) },
  { a: "Мадина", b: "Бекзод", A: t({ skin: "honey", hair: "bob", hairColor: "black", eyes: "lashes", outfit: "stripes", outfitColor: "rose" }), B: t({ skin: "warm", hair: "crop", hairColor: "chestnut", facialHair: "stubble", outfit: "sweater", outfitColor: "rust" }) },
  { a: "Катя", b: "Дима", A: t({ skin: "porcelain", hair: "topknot", hairColor: "lightbrown", outfit: "tee", outfitColor: "mustard" }), B: t({ skin: "light", hair: "pixie", hairColor: "chestnut", eyes: "happy", glasses: "square", outfit: "overalls", outfitColor: "denim" }) },
  { a: "Асель", b: "Нурлан", A: t({ skin: "warm", hair: "wavy", hairColor: "chestnut", eyes: "lashes", outfit: "dress", outfitColor: "plum" }), B: t({ skin: "warm", hair: "sidepart", hairColor: "black", facialHair: "mustache", outfit: "blazer", outfitColor: "charcoal" }) },
];

export function demoBook(opts: { couple?: number; cover?: CoverId; title?: string; occasion?: OccasionId; relationship?: RelationshipId } = {}): BookData {
  const c = COUPLES[(opts.couple ?? 0) % COUPLES.length];
  const b = defaultBook();
  b.characters = [
    { name: c.a, traits: c.A },
    { name: c.b, traits: c.B },
  ];
  b.occasion = opts.occasion ?? "anniversary";
  b.relationship = opts.relationship ?? "partner";
  b.cover = { id: opts.cover ?? "hearts", title: opts.title ?? "Почему я тебя люблю" };
  b.answers = {
    since: 2019,
    features: ["smile", "laugh", "hugs"],
    qualities: ["kind", "funny", "adventurous", "calm"],
    activities: ["cooking", "movies", "beach", "stargazing"],
    dedication: `${c.b}, ты лучшее, что случилось в моей жизни. С любовью, ${c.a}`,
  };
  let n = 0;
  b.pages = assemblePages(b.answers, b.occasion, () => `demo${n++}`);
  return b;
}
