// The page library. Every book is assembled from these templates.
// Text is written from the giver ({A}) to the recipient ({B}).
// Tokens: {A} {B} {rel} {since} {years}. Keep each text under ~200 chars.

import type { Pose } from "@/components/avatar/Avatar";

export type SceneId =
  | "letter"
  | "hearts"
  | "park"
  | "stars"
  | "kitchen"
  | "couch"
  | "beach"
  | "mountains"
  | "dance"
  | "cafe"
  | "car"
  | "rain"
  | "home"
  | "spotlight"
  | "bigheart"
  | "garden"
  | "city"
  | "games"
  | "music"
  | "sunrise"
  | "pets"
  | "books"
  | "snow"
  | "cake"
  | "arch"
  | "plane";

export type Category = "core" | "feature" | "quality" | "activity" | "occasion" | "extra";

export interface PageTemplate {
  id: string;
  category: Category;
  scene: SceneId;
  text: string;
  /** Poses for [A, B]. Scenes pick sensible defaults if omitted. */
  poses?: [Pose, Pose];
  /** Short name shown in the page library. */
  label: string;
}

const t = (
  id: string,
  category: Category,
  scene: SceneId,
  label: string,
  text: string,
  poses?: [Pose, Pose],
): PageTemplate => ({ id, category, scene, label, text, poses });

export const TEMPLATES: PageTemplate[] = [
  // Core pages, always included. Russian copy avoids gendered past tense and
  // adjectives about either person, so every page reads right for any couple.
  t("core-dedication", "core", "letter", "Посвящение", ""),
  t("core-intro", "core", "hearts", "Эта книга о тебе", "{B}, эта маленькая книга о тебе и обо всём, за что я тебя люблю.", ["reachRight", "reachLeft"]),
  t("core-since", "core", "park", "С тех пор как мы вместе", "Мы вместе с {since} года. Это {years} рядом с тобой, и мне не жаль ни одного дня.", ["reachRight", "reachLeft"]),
  t("core-features", "core", "spotlight", "Что я обожаю", "Сначала о том, что я обожаю в тебе больше всего…", ["stand", "wave"]),
  t("core-qualities", "core", "sunrise", "Твой характер", "Но больше всего я люблю не то, что вижу. А то, какое у тебя сердце.", ["stand", "stand"]),
  t("core-activities", "core", "city", "Мы вместе", "А ещё есть мы. Самые счастливые моменты самые простые: те, что вдвоём.", ["reachRight", "reachLeft"]),
  t("core-future-1", "core", "plane", "Впереди приключения", "Столько приключений ещё ждёт нас, {B}. Не терпится прожить каждое.", ["cheer", "cheer"]),
  t("core-future-2", "core", "home", "Вместе до седых волос", "Даже когда мы совсем поседеем, я буду держать тебя за руку и смеяться над твоими шутками.", ["reachRight", "reachLeft"]),
  t("core-closing", "core", "bigheart", "Я тебя люблю", "Я люблю тебя, {B}. Сегодня, завтра и на каждой следующей странице.\nС любовью, {A}", ["hugRight", "hugLeft"]),

  // Features (one page per chosen feature)
  t("feature-eyes", "feature", "stars", "Твои глаза", "Я люблю твои глаза. Один твой взгляд, и весь мир затихает.", ["stand", "stand"]),
  t("feature-smile", "feature", "spotlight", "Твоя улыбка", "Я люблю твою улыбку. Просыпаться и видеть её: вот моё любимое утро.", ["stand", "wave"]),
  t("feature-laugh", "feature", "park", "Твой смех", "Я люблю твой смех, особенно когда ты не можешь остановиться, и я смеюсь вместе с тобой.", ["cheer", "cheer"]),
  t("feature-hair", "feature", "garden", "Твои волосы", "Я люблю твои волосы, даже по утрам, когда у них свои планы.", ["stand", "wave"]),
  t("feature-hugs", "feature", "bigheart", "Твои объятия", "Я люблю твои объятия. Они чинят почти всё.", ["hugRight", "hugLeft"]),
  t("feature-hands", "feature", "park", "Твои руки", "Я люблю твои руки и то, как идеально в них ложится моя ладонь.", ["reachRight", "reachLeft"]),
  t("feature-voice", "feature", "music", "Твой голос", "Я люблю твой голос. Могу слушать тебя часами о чём угодно.", ["stand", "wave"]),
  t("feature-style", "feature", "city", "Твой стиль", "Я люблю твой стиль. Ты всегда выглядишь собой и всегда прекрасно.", ["stand", "wave"]),
  t("feature-kisses", "feature", "hearts", "Твои поцелуи", "Я люблю твои поцелуи: долгие, быстрые и те, что украдкой.", ["hugRight", "hugLeft"]),
  t("feature-sleepy", "feature", "stars", "Твоё сонное лицо", "Я люблю твоё сонное лицо по утрам. Его не видит никто, кроме меня.", ["sit", "sit"]),

  // Qualities
  t("quality-kind", "quality", "garden", "Доброта", "Твоя доброта, {B}, согревает всех вокруг. А меня особенно.", ["stand", "wave"]),
  t("quality-funny", "quality", "spotlight", "Чувство юмора", "С тобой я смеюсь так, как не смеюсь больше ни с кем.", ["cheer", "cheer"]),
  t("quality-smart", "quality", "books", "Ум", "Ты умеешь удивлять. Рядом с тобой я каждый день узнаю что-то новое.", ["sit", "sit"]),
  t("quality-patient", "quality", "rain", "Терпение", "Спасибо за твоё терпение, даже в те дни, когда со мной непросто.", ["reachRight", "reachLeft"]),
  t("quality-adventurous", "quality", "mountains", "Любовь к приключениям", "С тобой жизнь никогда не бывает скучной. Каждый день как маленькое приключение.", ["cheer", "wave"]),
  t("quality-caring", "quality", "home", "Забота", "Твоя забота видна в мелочах. Ты замечаешь всё и всегда приходишь на помощь.", ["hugRight", "hugLeft"]),
  t("quality-honest", "quality", "cafe", "Честность", "Твоя честность моя опора. С тобой всё по-настоящему.", ["sit", "sit"]),
  t("quality-creative", "quality", "music", "Творческая жилка", "Меня восхищает, как устроена твоя голова. Столько идей и столько красоты.", ["stand", "cheer"]),
  t("quality-brave", "quality", "mountains", "Смелость", "В тебе больше смелости, чем ты думаешь. Я тобой горжусь.", ["stand", "cheer"]),
  t("quality-loyal", "quality", "rain", "Верность", "В дождь и в солнце ты всегда на моей стороне.", ["reachRight", "reachLeft"]),
  t("quality-hardworking", "quality", "city", "Трудолюбие", "Ты так много работаешь и никогда не сдаёшься. Ты вдохновляешь меня каждый день.", ["stand", "wave"]),
  t("quality-calm", "quality", "sunrise", "Спокойствие", "Ты моё спокойствие. Когда вокруг шумно, ты моя тишина.", ["sit", "sit"]),

  // Activities
  t("activity-cooking", "activity", "kitchen", "Готовить вместе", "Я люблю готовить с тобой, даже когда всё идёт не по рецепту и мы заказываем пиццу.", ["wave", "cheer"]),
  t("activity-movies", "activity", "couch", "Вечера с фильмами", "Я люблю наши вечера с фильмами: плед, вкусняшки и твоя голова у меня на плече.", ["sit", "sit"]),
  t("activity-travel", "activity", "plane", "Путешествия", "Я люблю открывать мир вместе с тобой. С тобой любое место становится лучше.", ["wave", "cheer"]),
  t("activity-hiking", "activity", "mountains", "Горы и походы", "Я люблю наши походы в горы. Виды прекрасны, но лучший вид это ты.", ["reachRight", "reachLeft"]),
  t("activity-dancing", "activity", "dance", "Танцы", "Я люблю танцевать с тобой на кухне, на свадьбах, где угодно.", ["cheer", "cheer"]),
  t("activity-coffee", "activity", "cafe", "Кофе вдвоём", "Я люблю наш кофе вдвоём и долгие разговоры за ним.", ["sit", "sit"]),
  t("activity-roadtrips", "activity", "car", "Поездки на машине", "Я люблю наши поездки: твой плейлист, мои перекусы и никуда не надо спешить.", ["wave", "cheer"]),
  t("activity-gaming", "activity", "games", "Игры", "Я люблю играть с тобой, даже когда ты выигрываешь. Особенно когда ты выигрываешь.", ["sit", "sit"]),
  t("activity-music", "activity", "music", "Музыка", "Я люблю делиться с тобой музыкой. Столько наших песен про тебя.", ["stand", "cheer"]),
  t("activity-beach", "activity", "beach", "Море и пляж", "Я люблю наши дни у воды: солнце, тёплый песок и ты.", ["cheer", "wave"]),
  t("activity-walks", "activity", "park", "Долгие прогулки", "Я люблю наши долгие прогулки, когда мы говорим обо всём и ни о чём.", ["reachRight", "reachLeft"]),
  t("activity-reading", "activity", "books", "Чтение", "Я люблю читать рядом с тобой в тихие вечера.", ["sit", "sit"]),
  t("activity-pets", "activity", "pets", "Наши питомцы", "Я люблю нашу маленькую семью, пушистых её членов тоже.", ["stand", "wave"]),
  t("activity-stargazing", "activity", "stars", "Смотреть на звёзды", "Я люблю смотреть с тобой на звёзды и чувствовать себя самым счастливым человеком на свете.", ["reachRight", "reachLeft"]),

  // Occasion page (one, matched to the chosen occasion)
  t("occasion-anniversary", "occasion", "hearts", "С годовщиной", "С годовщиной, {B}! За каждый год, что уже был, и за все, что ещё впереди.", ["cheer", "cheer"]),
  t("occasion-valentines", "occasion", "bigheart", "С Днём влюблённых", "С Днём всех влюблённых, {B}. Мой самый любимый человек это ты.", ["hugRight", "hugLeft"]),
  t("occasion-birthday", "occasion", "cake", "С днём рождения", "С днём рождения, {B}! Мир стал намного лучше с тех пор, как в нём есть ты.", ["cheer", "cheer"]),
  t("occasion-wedding", "occasion", "arch", "Наша свадьба", "Сегодня начинается наше «навсегда». Не верится, что теперь мы семья, {B}.", ["reachRight", "reachLeft"]),
  t("occasion-engagement", "occasion", "stars", "Мы помолвлены", "Это «да» лучшее слово на свете. Хочу прожить с тобой всю жизнь.", ["cheer", "cheer"]),
  t("occasion-christmas", "occasion", "snow", "С Новым годом", "С Новым годом, {B}! Ты лучший подарок, который у меня когда-либо был.", ["wave", "cheer"]),
  t("occasion-justbecause", "occasion", "garden", "Просто так", "Без особого повода. Просто напоминаю: тебя очень любят.", ["wave", "stand"]),
  t("occasion-thinking", "occasion", "rain", "Скучаю по тебе", "Когда ты читаешь эти строки, знай: я думаю о тебе.", ["stand", "stand"]),
  t("occasion-march8", "occasion", "garden", "С 8 Марта", "С 8 Марта, {B}! Пусть в твоей жизни будет столько же цветов и любви, сколько ты даришь мне.", ["wave", "cheer"]),

  // Extras — the default book uses three of these; the rest are in the library
  t("extra-little-things", "extra", "home", "Мелочи", "Всё дело в мелочах: твои сообщения, чай, который ты мне делаешь, то, как ты произносишь моё имя.", ["stand", "wave"]),
  t("extra-support", "extra", "rain", "Ты рядом", "Спасибо, что ты всегда на моей стороне. С тобой мне всё по силам.", ["reachRight", "reachLeft"]),
  t("extra-home", "extra", "home", "Ты мой дом", "Дом это не место. Дом там, где ты.", ["hugRight", "hugLeft"]),
  t("extra-first-date", "extra", "cafe", "Первое свидание", "Я до сих пор помню наше первое свидание. Уже тогда было ясно: ты особенный человек.", ["sit", "sit"]),
  t("extra-lazy-sundays", "extra", "couch", "Ленивые выходные", "Мой любимый план: никаких планов. Главное, чтобы с тобой.", ["sit", "sit"]),
  t("extra-inside-jokes", "extra", "spotlight", "Наши шутки", "У нас сотня шуток, понятных только нам. И я люблю каждую.", ["cheer", "cheer"]),
  t("extra-mornings", "extra", "sunrise", "Утро с тобой", "Доброе утро бывает, когда просыпаешься рядом с тобой.", ["stand", "wave"]),
  t("extra-favorite-person", "extra", "hearts", "Мой любимый человек", "Из всех людей на свете ты мой самый любимый человек.", ["reachRight", "reachLeft"]),
  t("extra-team", "extra", "mountains", "Лучшая команда", "Ты и я против всего мира. Мы лучшая команда.", ["cheer", "cheer"]),
  t("extra-dreams", "extra", "stars", "Наши мечты", "Я люблю мечтать о нашем будущем. Оно такое светлое.", ["reachRight", "reachLeft"]),
  t("extra-rainy-days", "extra", "rain", "Дождливые дни", "Даже дождливые дни с тобой хорошие.", ["reachRight", "reachLeft"]),
  t("extra-city-nights", "extra", "city", "Ночной город", "Поздний вечер, огни города и ты рядом.", ["reachRight", "reachLeft"]),
];

export const TEMPLATE_MAP = new Map(TEMPLATES.map((tpl) => [tpl.id, tpl]));

export function getTemplate(id: string): PageTemplate | undefined {
  return TEMPLATE_MAP.get(id);
}

export const DEFAULT_EXTRAS = ["extra-little-things", "extra-support", "extra-home"];

export const CATEGORY_LABELS: Record<Category, string> = {
  core: "Основные страницы",
  feature: "Что я обожаю",
  quality: "Твой характер",
  activity: "Что мы любим делать",
  occasion: "Поводы",
  extra: "Дополнительно",
};
