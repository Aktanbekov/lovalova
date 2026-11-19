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
    slug: "valentines", kind: "occasion", occasion: "valentines", name: "14 февраля", menuLabel: "14 февраля",
    headline: "Книга на 14 февраля о вас двоих",
    blurb: "Вместо открытки целая книга о том, за что вы любите друг друга.",
    title: "Почему я тебя люблю, {B}", covers: ["bigheart", "hearts", "stars", "city", "garden", "sunrise"], tone: "bg-brand", tag: "14 февраля",
  },
  {
    slug: "anniversary", kind: "occasion", occasion: "anniversary", name: "Годовщина", menuLabel: "На годовщину",
    headline: "Подарок на годовщину, который помнит всё",
    blurb: "Все ваши годы вместе и все причины выбрать друг друга снова, с вашими героями.",
    title: "С годовщиной, {B}", covers: ["hearts", "sunrise", "city", "bigheart", "garden", "stars"], tone: "bg-wine", tag: "Годовщина",
  },
  {
    slug: "birthday", kind: "occasion", occasion: "birthday", name: "День рождения", menuLabel: "На день рождения",
    headline: "Подарок на день рождения, который перечитывают",
    blurb: "Книга о человеке, которого вы любите, и о вас рядом с ним.",
    title: "С днём рождения, {B}", covers: ["garden", "hearts", "beach", "sunrise", "bigheart", "city"], tone: "bg-[#d4572a]", tag: "День рождения",
  },
  {
    slug: "march-8", kind: "occasion", occasion: "march8", name: "8 Марта", menuLabel: "На 8 Марта",
    headline: "Цветы завянут, а книга останется",
    blurb: "Подарок на 8 Марта, где каждая страница о ней.",
    title: "С 8 Марта, {B}", covers: ["garden", "hearts", "bigheart", "sunrise", "beach", "stars"], tone: "bg-[#c2185b]", tag: "8 Марта",
  },
  {
    slug: "new-year", kind: "occasion", occasion: "christmas", name: "Новый год", menuLabel: "На Новый год",
    headline: "Ваша история под ёлкой",
    blurb: "Тёплый новогодний подарок, где главные герои вы двое.",
    title: "Наш Новый год", covers: ["snow", "stars", "city", "hearts", "bigheart", "sunrise"], tone: "bg-[#1f6b47]", tag: "Новый год",
  },
  {
    slug: "wedding", kind: "occasion", occasion: "wedding", name: "Свадьба", menuLabel: "На свадьбу",
    headline: "Клятвы в картинках",
    blurb: "На утро свадьбы, медовый месяц или первую годовщину брака.",
    title: "{A} и {B}", covers: ["bigheart", "garden", "sunrise", "hearts", "beach", "stars"], tone: "bg-night", tag: "Свадьба",
  },
  {
    slug: "engagement", kind: "occasion", occasion: "engagement", name: "Помолвка", menuLabel: "На помолвку",
    headline: "«Да» это только начало",
    blurb: "История о том, как вы пришли к этому моменту.",
    title: "Наша история любви", covers: ["sunrise", "bigheart", "city", "garden", "hearts", "beach"], tone: "bg-[#b5462f]", tag: "Помолвка",
  },
  {
    slug: "just-because", kind: "occasion", occasion: "justbecause", name: "Просто так", menuLabel: "Просто так",
    headline: "Без повода тоже повод",
    blurb: "Иногда лучшие подарки дарят в самый обычный вторник.",
    title: "Ты и я", covers: ["beach", "hearts", "garden", "stars", "sunrise", "bigheart"], tone: "bg-[#0f7c8c]", tag: "Просто так",
  },
  {
    slug: "thinking-of-you", kind: "occasion", occasion: "thinking", name: "Скучаю по тебе", menuLabel: "На расстоянии",
    headline: "Книга, которая сокращает расстояние",
    blurb: "Для отношений на расстоянии и трудных недель.",
    title: "Скучаю по тебе, {B}", covers: ["stars", "city", "sunrise", "hearts", "snow", "garden"], tone: "bg-[#2f5f8f]", tag: "Скучаю",
  },
];

export const RECIPIENT_COLLECTIONS: Collection[] = [
  { slug: "girlfriend", kind: "recipient", relationship: "girlfriend", name: "Для девушки", menuLabel: "Девушке", headline: "Пусть она улыбается на каждой странице", blurb: "Самый нежный способ сказать, что она для вас значит.", title: "Почему я тебя люблю, {B}", covers: ["hearts", "garden", "bigheart", "beach", "sunrise", "stars"], tone: "bg-brand", tag: "Девушке" },
  { slug: "boyfriend", kind: "recipient", relationship: "boyfriend", name: "Для парня", menuLabel: "Парню", headline: "Он сделает вид, что не плачет", blurb: "Все мелочи, которые вы в нём любите, в картинках.", title: "Почему я тебя люблю, {B}", covers: ["stars", "city", "beach", "bigheart", "hearts", "sunrise"], tone: "bg-[#0f7c8c]", tag: "Парню" },
  { slug: "wife", kind: "recipient", relationship: "wife", name: "Для жены", menuLabel: "Жене", headline: "Для той, кто однажды сказала «да»", blurb: "Напомните ей, почему вы снова сделали бы тот же выбор.", title: "За что я люблю свою жену", covers: ["bigheart", "garden", "hearts", "sunrise", "city", "stars"], tone: "bg-wine", tag: "Жене" },
  { slug: "husband", kind: "recipient", relationship: "husband", name: "Для мужа", menuLabel: "Мужу", headline: "Подарок, который он не купит себе сам", blurb: "Ваши причины, вашими словами.", title: "За что я люблю своего мужа", covers: ["city", "stars", "beach", "hearts", "sunrise", "bigheart"], tone: "bg-night", tag: "Мужу" },
  { slug: "partner", kind: "recipient", relationship: "partner", name: "Для любимого человека", menuLabel: "Любимому человеку", headline: "Для вашего человека", blurb: "Как бы вы ни называли друг друга, это ваша история.", title: "{A} и {B}", covers: ["sunrise", "hearts", "garden", "city", "bigheart", "beach"], tone: "bg-[#2f5f8f]", tag: "Любимым" },
  { slug: "fiance", kind: "recipient", relationship: "fiance", name: "Для невесты или жениха", menuLabel: "Невесте или жениху", headline: "Пока ждёте большой день", blurb: "Память о времени, когда вы готовились к «навсегда».", title: "Наша история любви", covers: ["bigheart", "sunrise", "garden", "hearts", "city", "stars"], tone: "bg-[#d4572a]", tag: "Невесте, жениху" },
];

export const ALL_COLLECTIONS = [...OCCASION_COLLECTIONS, ...RECIPIENT_COLLECTIONS];

export function findCollection(kind: Collection["kind"], slug: string): Collection | undefined {
  return ALL_COLLECTIONS.find((c) => c.kind === kind && c.slug === slug);
}

export function collectionHref(c: Collection): string {
  return c.kind === "occasion" ? `/occasions/${c.slug}` : `/for/${c.slug}`;
}
