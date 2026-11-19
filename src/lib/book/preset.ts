// A starting point for a new book (occasion, recipient, cover, title), chosen
// on a shop page and carried through sign-in. Every field is validated.
import { z } from "zod";
import { ids } from "@/lib/avatar/options";
import { COVERS, OCCASIONS, RELATIONSHIPS } from "./catalog";
import { LIMITS, defaultBook, type BookData } from "./schema";

export const PRESET_KEYS = ["occasion", "relationship", "cover", "title"] as const;

const PresetSchema = z.object({
  occasion: z.enum(ids(OCCASIONS)).optional(),
  relationship: z.enum(ids(RELATIONSHIPS)).optional(),
  cover: z.enum(ids(COVERS)).optional(),
  title: z.string().trim().min(1).max(LIMITS.title).optional(),
});

export type BookPreset = z.infer<typeof PresetSchema>;

/** Reads preset fields from a form or URL query; anything invalid is dropped. */
export function readPreset(get: (key: string) => unknown): BookPreset {
  const out: Record<string, string> = {};
  for (const k of PRESET_KEYS) {
    const v = get(k);
    if (typeof v !== "string" || !v) continue;
    const field = PresetSchema.shape[k].safeParse(v); // one bad field never drops the rest
    if (field.success && field.data) out[k] = field.data;
  }
  return out as BookPreset;
}

export function bookFromPreset(p: BookPreset): BookData {
  const data = defaultBook();
  if (p.occasion) data.occasion = p.occasion;
  if (p.relationship) data.relationship = p.relationship;
  if (p.cover) data.cover.id = p.cover;
  if (p.title) data.cover.title = p.title;
  return data;
}

/** Only same-site paths; everything else goes to the account page. */
export function safeNext(v: unknown): string {
  return typeof v === "string" && v.startsWith("/") && !v.startsWith("//") && !v.startsWith("/\\") ? v : "/account";
}
