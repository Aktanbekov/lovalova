// Shop collections: one landing page per occasion and per recipient.
// Each preset starts the builder with that occasion/relationship/cover/title.
import type { CoverId, OccasionId, RelationshipId } from "@/lib/book/catalog";

export interface Collection {
  slug: string;
  kind: "occasion" | "recipient";
  name: string;
  menuLabel: string;
  headline: string;
  blurb: string;
  /** Cover title for the examples; {A}/{B} are filled with names. */
  title: string;
  covers: CoverId[];
  /** Banner background (Tailwind classes). */
  tone: string;
  tag: string;
  occasion?: OccasionId;
  relationship?: RelationshipId;
}

export const OCCASION_COLLECTIONS: Collection[] = [
  {
    slug: "anniversary", kind: "occasion", occasion: "anniversary", name: "Anniversary", menuLabel: "Anniversary gifts",
    headline: "An anniversary gift that remembers everything",
    blurb: "Every year together, every reason you'd choose them again — illustrated with the two of you.",
    title: "Happy Anniversary, {B}", covers: ["hearts", "sunrise", "city", "bigheart", "garden", "stars"], tone: "bg-wine", tag: "Anniversary",
  },
  {
    slug: "valentines", kind: "occasion", occasion: "valentines", name: "Valentine's Day", menuLabel: "Valentine's Day",
    headline: "Say “be mine” in a whole book",
    blurb: "Skip the card. Give them page after page of exactly why you love them.",
    title: "Reasons I Love You, {B}", covers: ["bigheart", "hearts", "stars", "city", "garden", "sunrise"], tone: "bg-brand", tag: "Valentine's",
  },
  {
    slug: "birthday", kind: "occasion", occasion: "birthday", name: "Birthday", menuLabel: "Birthday gifts",
    headline: "The birthday present they'll read again and again",
    blurb: "Celebrate the person they are, with a book that's all about them — and you.",
    title: "Happy Birthday, {B}", covers: ["garden", "hearts", "beach", "sunrise", "bigheart", "city"], tone: "bg-[#e0662f]", tag: "Birthday",
  },
  {
    slug: "christmas", kind: "occasion", occasion: "christmas", name: "Christmas", menuLabel: "Christmas gifts",
    headline: "Wrap up your whole love story this Christmas",
    blurb: "A cosy keepsake for under the tree, starring the two of you.",
    title: "Our Christmas Story", covers: ["snow", "stars", "city", "hearts", "bigheart", "sunrise"], tone: "bg-[#1f6b47]", tag: "Christmas",
  },
  {
    slug: "wedding", kind: "occasion", occasion: "wedding", name: "Wedding", menuLabel: "Wedding & vows",
    headline: "Vows, in pictures",
    blurb: "For the wedding morning, the honeymoon, or your first anniversary of marriage.",
    title: "{A} & {B}", covers: ["bigheart", "garden", "sunrise", "hearts", "beach", "stars"], tone: "bg-night", tag: "Wedding",
  },
  {
    slug: "engagement", kind: "occasion", occasion: "engagement", name: "Engagement", menuLabel: "Engagement",
    headline: "The yes was just the beginning",
    blurb: "Mark the moment with the story of how you got here.",
    title: "Our Love Story", covers: ["sunrise", "bigheart", "city", "garden", "hearts", "beach"], tone: "bg-[#6b3fa0]", tag: "Engagement",
  },
  {
    slug: "just-because", kind: "occasion", occasion: "justbecause", name: "Just because", menuLabel: "Just because",
    headline: "No occasion needed",
    blurb: "Sometimes the best gifts come on an ordinary Tuesday.",
    title: "You & Me", covers: ["beach", "hearts", "garden", "stars", "sunrise", "bigheart"], tone: "bg-[#0f7c8c]", tag: "Just because",
  },
  {
    slug: "thinking-of-you", kind: "occasion", occasion: "thinking", name: "Thinking of you", menuLabel: "Long distance & thinking of you",
    headline: "Close the distance with a book",
    blurb: "For long-distance love, tough weeks, or whenever they need reminding.",
    title: "Thinking of You, {B}", covers: ["stars", "city", "sunrise", "hearts", "snow", "garden"], tone: "bg-[#3b4aa0]", tag: "Thinking of you",
  },
];

export const RECIPIENT_COLLECTIONS: Collection[] = [
  { slug: "wife", kind: "recipient", relationship: "wife", name: "For your wife", menuLabel: "Wife", headline: "For the woman who said yes", blurb: "Remind her why you'd marry her all over again.", title: "Why I Love My Wife", covers: ["bigheart", "garden", "hearts", "sunrise", "city", "stars"], tone: "bg-wine", tag: "Wife" },
  { slug: "husband", kind: "recipient", relationship: "husband", name: "For your husband", menuLabel: "Husband", headline: "For the man who has everything — except this", blurb: "A gift he can't buy for himself: your reasons, in your words.", title: "Why I Love My Husband", covers: ["city", "stars", "beach", "hearts", "sunrise", "bigheart"], tone: "bg-night", tag: "Husband" },
  { slug: "girlfriend", kind: "recipient", relationship: "girlfriend", name: "For your girlfriend", menuLabel: "Girlfriend", headline: "Make her smile on every page", blurb: "The sweetest way to tell her exactly what she means to you.", title: "Reasons I Love You, {B}", covers: ["hearts", "garden", "bigheart", "beach", "sunrise", "stars"], tone: "bg-brand", tag: "Girlfriend" },
  { slug: "boyfriend", kind: "recipient", relationship: "boyfriend", name: "For your boyfriend", menuLabel: "Boyfriend", headline: "He'll pretend he isn't crying", blurb: "All the little things you love about him, illustrated.", title: "Why I Love You, {B}", covers: ["stars", "city", "beach", "bigheart", "hearts", "sunrise"], tone: "bg-[#0f7c8c]", tag: "Boyfriend" },
  { slug: "partner", kind: "recipient", relationship: "partner", name: "For your partner", menuLabel: "Partner", headline: "For your person", blurb: "Whatever you call each other, this is your story.", title: "{A} & {B}", covers: ["sunrise", "hearts", "garden", "city", "bigheart", "beach"], tone: "bg-[#6b3fa0]", tag: "Partner" },
  { slug: "fiance", kind: "recipient", relationship: "fiance", name: "For your fiancé(e)", menuLabel: "Fiancé(e)", headline: "Before the big day", blurb: "A keepsake for the countdown to forever.", title: "Our Love Story", covers: ["bigheart", "sunrise", "garden", "hearts", "city", "stars"], tone: "bg-[#e0662f]", tag: "Fiancé(e)" },
];

export const ALL_COLLECTIONS = [...OCCASION_COLLECTIONS, ...RECIPIENT_COLLECTIONS];

export function findCollection(kind: Collection["kind"], slug: string): Collection | undefined {
  return ALL_COLLECTIONS.find((c) => c.kind === kind && c.slug === slug);
}

export function collectionHref(c: Collection): string {
  return c.kind === "occasion" ? `/occasions/${c.slug}` : `/for/${c.slug}`;
}
