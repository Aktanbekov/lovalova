// Every choice in the avatar builder. Ids are stored in the database, so
// never rename an id — only add new ones.

export const SKIN_TONES = [
  { id: "porcelain", hex: "#FCE3D0" },
  { id: "light", hex: "#F6CFB3" },
  { id: "warm", hex: "#EAB894" },
  { id: "tan", hex: "#D49A72" },
  { id: "honey", hex: "#B97B54" },
  { id: "bronze", hex: "#9A5E3C" },
  { id: "brown", hex: "#7A4529" },
  { id: "deep", hex: "#5A3220" },
] as const;

export const HAIR_COLORS = [
  { id: "black", hex: "#1F1A17" },
  { id: "darkbrown", hex: "#3B2A20" },
  { id: "brown", hex: "#5C3B28" },
  { id: "chestnut", hex: "#8A5A36" },
  { id: "lightbrown", hex: "#B7793F" },
  { id: "honey", hex: "#D9A75A" },
  { id: "blonde", hex: "#ECCF8E" },
  { id: "auburn", hex: "#B5462F" },
  { id: "gray", hex: "#A3A7AE" },
  { id: "white", hex: "#F1EEE8" },
] as const;

export const OUTFIT_COLORS = [
  { id: "rose", hex: "#E07A7F" },
  { id: "plum", hex: "#6B2F5B" },
  { id: "denim", hex: "#4C7A9E" },
  { id: "sage", hex: "#6E9E6A" },
  { id: "mustard", hex: "#E3A93B" },
  { id: "charcoal", hex: "#34313B" },
  { id: "cream", hex: "#F3ECE2" },
  { id: "rust", hex: "#C9663A" },
] as const;

export const FACE_SHAPES = [
  { id: "round", label: "Круглое" },
  { id: "oval", label: "Овальное" },
  { id: "soft", label: "Квадратное" },
] as const;

export const EYE_STYLES = [
  { id: "dot", label: "Точки" },
  { id: "shine", label: "Блестящие" },
  { id: "happy", label: "Улыбчивые" },
  { id: "lashes", label: "С ресницами" },
  { id: "sleepy", label: "Мечтательные" },
  { id: "wide", label: "Широкие" },
] as const;

export const BROW_STYLES = [
  { id: "soft", label: "Мягкие" },
  { id: "bold", label: "Густые" },
  { id: "arched", label: "Дугой" },
] as const;

export const HAIR_STYLES = [
  { id: "crop", label: "Короткая" },
  { id: "buzz", label: "Под машинку" },
  { id: "sidepart", label: "С пробором" },
  { id: "curly", label: "Кудри" },
  { id: "long", label: "Длинные" },
  { id: "wavy", label: "Длинные волнистые" },
  { id: "bob", label: "Каре" },
  { id: "ponytail", label: "Хвост" },
  { id: "bun", label: "Пучок" },
  { id: "pixie", label: "Пикси" },
  { id: "topknot", label: "Пучок сверху" },
  { id: "bald", label: "Без волос" },
] as const;

export const FACIAL_HAIR = [
  { id: "none", label: "Нет" },
  { id: "stubble", label: "Щетина" },
  { id: "mustache", label: "Усы" },
  { id: "beard", label: "Борода" },
] as const;

export const GLASSES = [
  { id: "none", label: "Нет" },
  { id: "round", label: "Круглые" },
  { id: "square", label: "Квадратные" },
] as const;

export const OUTFITS = [
  { id: "tee", label: "Футболка" },
  { id: "stripes", label: "В полоску" },
  { id: "sweater", label: "Свитер" },
  { id: "hoodie", label: "Худи" },
  { id: "shirt", label: "Рубашка" },
  { id: "blazer", label: "Пиджак" },
  { id: "dress", label: "Платье" },
  { id: "overalls", label: "Комбинезон" },
] as const;

type Ids<T extends readonly { id: string }[]> = T[number]["id"];

export type SkinId = Ids<typeof SKIN_TONES>;
export type HairColorId = Ids<typeof HAIR_COLORS>;
export type OutfitColorId = Ids<typeof OUTFIT_COLORS>;
export type FaceId = Ids<typeof FACE_SHAPES>;
export type EyeId = Ids<typeof EYE_STYLES>;
export type BrowId = Ids<typeof BROW_STYLES>;
export type HairId = Ids<typeof HAIR_STYLES>;
export type FacialHairId = Ids<typeof FACIAL_HAIR>;
export type GlassesId = Ids<typeof GLASSES>;
export type OutfitId = Ids<typeof OUTFITS>;

export interface Traits {
  skin: SkinId;
  face: FaceId;
  eyes: EyeId;
  brows: BrowId;
  hair: HairId;
  hairColor: HairColorId;
  facialHair: FacialHairId;
  glasses: GlassesId;
  outfit: OutfitId;
  outfitColor: OutfitColorId;
  blush: boolean;
}

export const ids = <T extends readonly { id: string }[]>(list: T) =>
  list.map((o) => o.id) as [Ids<T>, ...Ids<T>[]];

export function hexOf(list: readonly { id: string; hex: string }[], id: string) {
  return list.find((o) => o.id === id)?.hex ?? list[0].hex;
}

export const DEFAULT_TRAITS_A: Traits = {
  skin: "warm",
  face: "round",
  eyes: "shine",
  brows: "soft",
  hair: "sidepart",
  hairColor: "darkbrown",
  facialHair: "none",
  glasses: "none",
  outfit: "sweater",
  outfitColor: "denim",
  blush: true,
};

export const DEFAULT_TRAITS_B: Traits = {
  skin: "light",
  face: "oval",
  eyes: "lashes",
  brows: "arched",
  hair: "wavy",
  hairColor: "chestnut",
  facialHair: "none",
  glasses: "none",
  outfit: "dress",
  outfitColor: "rose",
  blush: true,
};

/** Trait categories in the order the builder shows them. */
export const TRAIT_GROUPS = [
  { key: "skin", label: "Кожа", kind: "swatch", options: SKIN_TONES },
  { key: "hair", label: "Причёска", kind: "shape", options: HAIR_STYLES },
  { key: "hairColor", label: "Цвет волос", kind: "swatch", options: HAIR_COLORS },
  { key: "face", label: "Лицо", kind: "shape", options: FACE_SHAPES },
  { key: "eyes", label: "Глаза", kind: "shape", options: EYE_STYLES },
  { key: "brows", label: "Брови", kind: "shape", options: BROW_STYLES },
  { key: "facialHair", label: "Борода", kind: "shape", options: FACIAL_HAIR },
  { key: "glasses", label: "Очки", kind: "shape", options: GLASSES },
  { key: "outfit", label: "Одежда", kind: "shape", options: OUTFITS },
  { key: "outfitColor", label: "Цвет одежды", kind: "swatch", options: OUTFIT_COLORS },
] as const;

export function randomTraits(rand: () => number = Math.random): Traits {
  const pick = <T extends readonly { id: string }[]>(l: T) =>
    l[Math.floor(rand() * l.length)].id as Ids<T>;
  return {
    skin: pick(SKIN_TONES),
    face: pick(FACE_SHAPES),
    eyes: pick(EYE_STYLES),
    brows: pick(BROW_STYLES),
    hair: pick(HAIR_STYLES),
    hairColor: pick(HAIR_COLORS.slice(0, 8)),
    facialHair: rand() < 0.75 ? "none" : pick(FACIAL_HAIR),
    glasses: rand() < 0.7 ? "none" : pick(GLASSES),
    outfit: pick(OUTFITS),
    outfitColor: pick(OUTFIT_COLORS),
    blush: true,
  };
}

/** Russian names for colour swatches (screen readers and tooltips). Keyed by stored id. */
export const SWATCH_NAMES: Record<string, string> = {
  porcelain: "Фарфоровый", light: "Светлый", warm: "Тёплый", tan: "Загорелый", honey: "Медовый",
  bronze: "Бронзовый", brown: "Коричневый", deep: "Тёмный", black: "Чёрный", darkbrown: "Тёмно-каштановый",
  chestnut: "Каштановый", lightbrown: "Светло-каштановый", blonde: "Блонд", auburn: "Рыжий", gray: "Седой",
  white: "Белый", rose: "Розовый", plum: "Сливовый", denim: "Джинсовый", sage: "Шалфейный",
  mustard: "Горчичный", charcoal: "Графитовый", cream: "Кремовый", rust: "Терракотовый",
};
