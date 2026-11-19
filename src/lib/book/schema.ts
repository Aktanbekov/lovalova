import { z } from "zod";
import {
  BROW_STYLES,
  EYE_STYLES,
  FACE_SHAPES,
  FACIAL_HAIR,
  GLASSES,
  HAIR_COLORS,
  HAIR_STYLES,
  OUTFITS,
  OUTFIT_COLORS,
  SKIN_TONES,
  DEFAULT_TRAITS_A,
  DEFAULT_TRAITS_B,
  ids,
} from "@/lib/avatar/options";
import { ACTIVITIES, FEATURES, OCCASIONS, QUALITIES, RELATIONSHIPS, COVERS } from "./catalog";

export const LIMITS = {
  name: 24,
  title: 42,
  pageText: 240,
  dedication: 400,
  minPages: 16,
  maxPages: 60,
  features: 3,
  qualities: 4,
  activities: 4,
} as const;

export const TraitsSchema = z.object({
  skin: z.enum(ids(SKIN_TONES)),
  face: z.enum(ids(FACE_SHAPES)),
  eyes: z.enum(ids(EYE_STYLES)),
  brows: z.enum(ids(BROW_STYLES)),
  hair: z.enum(ids(HAIR_STYLES)),
  hairColor: z.enum(ids(HAIR_COLORS)),
  facialHair: z.enum(ids(FACIAL_HAIR)),
  glasses: z.enum(ids(GLASSES)),
  outfit: z.enum(ids(OUTFITS)),
  outfitColor: z.enum(ids(OUTFIT_COLORS)),
  blush: z.boolean(),
});

export const CharacterSchema = z.object({
  name: z.string().trim().max(LIMITS.name),
  traits: TraitsSchema,
});

export const AnswersSchema = z.object({
  since: z.number().int().min(1940).max(2100).nullable(),
  features: z.array(z.enum(ids(FEATURES))).max(LIMITS.features),
  qualities: z.array(z.enum(ids(QUALITIES))).max(LIMITS.qualities),
  activities: z.array(z.enum(ids(ACTIVITIES))).max(LIMITS.activities),
  dedication: z.string().max(LIMITS.dedication),
});

export const PageRefSchema = z.object({
  key: z.string().min(1).max(32),
  templateId: z.string().min(1).max(64),
  text: z.string().max(LIMITS.pageText).optional(),
});

export const SelectionSchema = z.object({
  format: z.enum(["softcover", "hardcover"]),
  matte: z.boolean(),
  digital: z.boolean(),
  giftbox: z.boolean(),
});

export const BookDataSchema = z.object({
  characters: z.tuple([CharacterSchema, CharacterSchema]),
  occasion: z.enum(ids(OCCASIONS)),
  relationship: z.enum(ids(RELATIONSHIPS)),
  cover: z.object({ id: z.enum(ids(COVERS)), title: z.string().max(LIMITS.title) }),
  answers: AnswersSchema,
  pages: z.array(PageRefSchema).max(LIMITS.maxPages),
  assembled: z.boolean(),
  previewed: z.boolean(),
  selection: SelectionSchema,
  promo: z.string().max(24).nullable(),
});

export const BookPatchSchema = BookDataSchema.partial();

export type BookData = z.infer<typeof BookDataSchema>;
export type BookPatch = z.infer<typeof BookPatchSchema>;
export type Answers = z.infer<typeof AnswersSchema>;
export type PageRef = z.infer<typeof PageRefSchema>;
export type Selection = z.infer<typeof SelectionSchema>;
export type Character = z.infer<typeof CharacterSchema>;

export function defaultBook(): BookData {
  return {
    characters: [
      { name: "", traits: { ...DEFAULT_TRAITS_A } },
      { name: "", traits: { ...DEFAULT_TRAITS_B } },
    ],
    occasion: "anniversary",
    relationship: "partner",
    cover: { id: "hearts", title: "Почему я тебя люблю" },
    answers: { since: null, features: [], qualities: [], activities: [], dedication: "" },
    pages: [],
    assembled: false,
    previewed: false,
    selection: { format: "hardcover", matte: false, digital: false, giftbox: false },
    promo: null,
  };
}

/** Parse stored JSON, filling anything missing from defaults. */
export function parseBook(json: string): BookData {
  const raw = JSON.parse(json);
  const merged = { ...defaultBook(), ...raw };
  const res = BookDataSchema.safeParse(merged);
  return res.success ? res.data : defaultBook();
}
