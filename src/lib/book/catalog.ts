// Choices offered in the builder. Ids are stored — add, never rename.

export const OCCASIONS = [
  { id: "valentines", label: "14 февраля" },
  { id: "anniversary", label: "Годовщина" },
  { id: "birthday", label: "День рождения" },
  { id: "march8", label: "8 Марта" },
  { id: "christmas", label: "Новый год" },
  { id: "wedding", label: "Свадьба" },
  { id: "engagement", label: "Помолвка" },
  { id: "justbecause", label: "Просто так" },
  { id: "thinking", label: "Скучаю по тебе" },
] as const;

export const RELATIONSHIPS = [
  { id: "partner", label: "Любимый человек", word: "моей половинке" },
  { id: "wife", label: "Жена", word: "моей жене" },
  { id: "husband", label: "Муж", word: "моему мужу" },
  { id: "girlfriend", label: "Девушка", word: "моей девушке" },
  { id: "boyfriend", label: "Парень", word: "моему парню" },
  { id: "fiance", label: "Невеста или жених", word: "моей половинке" },
] as const;

export const COVERS = [
  { id: "hearts", label: "Сердечки" },
  { id: "stars", label: "Звёздная ночь" },
  { id: "bigheart", label: "Большое сердце" },
  { id: "sunrise", label: "Рассвет" },
  { id: "city", label: "Огни города" },
  { id: "garden", label: "В цвету" },
  { id: "beach", label: "У моря" },
  { id: "snow", label: "Снежная ночь" },
] as const;

export type CoverId = (typeof COVERS)[number]["id"];
export type OccasionId = (typeof OCCASIONS)[number]["id"];
export type RelationshipId = (typeof RELATIONSHIPS)[number]["id"];

export const FEATURES = [
  { id: "eyes", label: "Твои глаза" },
  { id: "smile", label: "Твоя улыбка" },
  { id: "laugh", label: "Твой смех" },
  { id: "hair", label: "Твои волосы" },
  { id: "hugs", label: "Твои объятия" },
  { id: "hands", label: "Твои руки" },
  { id: "voice", label: "Твой голос" },
  { id: "style", label: "Твой стиль" },
  { id: "kisses", label: "Твои поцелуи" },
  { id: "sleepy", label: "Твоё сонное лицо" },
] as const;

export const QUALITIES = [
  { id: "kind", label: "Доброта" },
  { id: "funny", label: "Чувство юмора" },
  { id: "smart", label: "Ум" },
  { id: "patient", label: "Терпение" },
  { id: "adventurous", label: "Любовь к приключениям" },
  { id: "caring", label: "Забота" },
  { id: "honest", label: "Честность" },
  { id: "creative", label: "Творческая жилка" },
  { id: "brave", label: "Смелость" },
  { id: "loyal", label: "Верность" },
  { id: "hardworking", label: "Трудолюбие" },
  { id: "calm", label: "Спокойствие" },
] as const;

export const ACTIVITIES = [
  { id: "cooking", label: "Готовить вместе" },
  { id: "movies", label: "Вечера с фильмами" },
  { id: "travel", label: "Путешествия" },
  { id: "hiking", label: "Горы и походы" },
  { id: "dancing", label: "Танцы" },
  { id: "coffee", label: "Кофе вдвоём" },
  { id: "roadtrips", label: "Поездки на машине" },
  { id: "gaming", label: "Игры" },
  { id: "music", label: "Музыка" },
  { id: "beach", label: "Море и пляж" },
  { id: "walks", label: "Долгие прогулки" },
  { id: "reading", label: "Чтение" },
  { id: "pets", label: "Наши питомцы" },
  { id: "stargazing", label: "Смотреть на звёзды" },
] as const;

export const DEDICATION_TEMPLATES = [
  "{B}, ты лучшее, что случилось в моей жизни. С любовью, {A}",
  "{B}, каждая страница этой книги правда. С любовью, {A}",
  "Посвящается {rel}: моему самому близкому человеку, моему лучшему другу, моему дому. {A}",
  "{B}, спасибо за каждый обычный день, который с тобой становится чудом. {A}",
  "{B}, пусть эта книга напоминает, как сильно тебя любят. Всегда твой человек, {A}",
] as const;
