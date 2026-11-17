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
  { a: "Alex", b: "Sam", A: t({}), B: t({ skin: "light", hair: "long", hairColor: "auburn", eyes: "lashes", outfit: "dress", outfitColor: "rose" }) },
  { a: "Jordan", b: "Maya", A: t({ skin: "brown", hair: "buzz", hairColor: "black", facialHair: "beard", outfit: "shirt", outfitColor: "sage" }), B: t({ skin: "brown", hair: "curly", hairColor: "black", eyes: "happy", outfit: "dress", outfitColor: "mustard" }) },
  { a: "Leo", b: "Priya", A: t({ skin: "light", hair: "curly", hairColor: "blonde", glasses: "round", outfit: "hoodie", outfitColor: "charcoal" }), B: t({ skin: "honey", hair: "ponytail", hairColor: "black", eyes: "lashes", outfit: "blazer", outfitColor: "plum" }) },
  { a: "Nora", b: "Ben", A: t({ skin: "porcelain", hair: "bob", hairColor: "blonde", eyes: "lashes", outfit: "stripes", outfitColor: "rose" }), B: t({ skin: "tan", hair: "crop", hairColor: "chestnut", facialHair: "stubble", outfit: "sweater", outfitColor: "rust" }) },
  { a: "Chris", b: "Taylor", A: t({ skin: "deep", hair: "topknot", hairColor: "black", outfit: "tee", outfitColor: "mustard" }), B: t({ skin: "bronze", hair: "pixie", hairColor: "darkbrown", eyes: "happy", glasses: "square", outfit: "overalls", outfitColor: "denim" }) },
  { a: "Elena", b: "Marco", A: t({ skin: "warm", hair: "wavy", hairColor: "chestnut", eyes: "lashes", outfit: "dress", outfitColor: "plum" }), B: t({ skin: "warm", hair: "sidepart", hairColor: "black", facialHair: "mustache", outfit: "blazer", outfitColor: "charcoal" }) },
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
  b.cover = { id: opts.cover ?? "hearts", title: opts.title ?? "Why I Love You" };
  b.answers = {
    since: 2019,
    features: ["smile", "laugh", "hugs"],
    qualities: ["kind", "funny", "adventurous", "calm"],
    activities: ["cooking", "movies", "beach", "stargazing"],
    dedication: `To ${c.b}, the best thing that ever happened to me. All my love, ${c.a}`,
  };
  let n = 0;
  b.pages = assemblePages(b.answers, b.occasion, () => `demo${n++}`);
  return b;
}
