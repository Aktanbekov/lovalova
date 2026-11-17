import { describe, expect, it } from "vitest";
import { assemblePages, availableTemplates, fillText, pageText, textContext, yearsText } from "@/lib/book/assemble";
import { defaultBook, BookDataSchema } from "@/lib/book/schema";
import { TEMPLATES, getTemplate } from "@/content/pages";
import { OCCASIONS, FEATURES, QUALITIES, ACTIVITIES } from "@/lib/book/catalog";

const answers = {
  since: 2019,
  features: ["eyes", "smile", "hugs"] as const,
  qualities: ["kind", "funny", "smart", "brave"] as const,
  activities: ["cooking", "movies", "travel", "beach"] as const,
  dedication: "To {B}, love {A}",
};

let n = 0;
const key = () => `k${n++}`;

describe("assemblePages", () => {
  it("builds the full default book in order", () => {
    const pages = assemblePages({ ...answers, features: [...answers.features], qualities: [...answers.qualities], activities: [...answers.activities] }, "anniversary", key);
    const ids = pages.map((p) => p.templateId);
    expect(ids[0]).toBe("core-dedication");
    expect(ids[1]).toBe("core-intro");
    expect(ids).toContain("core-since");
    expect(ids).toContain("feature-eyes");
    expect(ids).toContain("quality-brave");
    expect(ids).toContain("activity-beach");
    expect(ids).toContain("occasion-anniversary");
    expect(ids.at(-1)).toBe("core-closing");
    expect(pages.length).toBe(24);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(pages.map((p) => p.key)).size).toBe(pages.length);
  });

  it("skips the 'since' page when no year is given", () => {
    const pages = assemblePages({ since: null, features: [], qualities: [], activities: [], dedication: "" }, "birthday", key);
    const ids = pages.map((p) => p.templateId);
    expect(ids).not.toContain("core-since");
    expect(ids).not.toContain("core-features");
    expect(ids).toContain("occasion-birthday");
  });

  it("has a template for every occasion, feature, quality and activity", () => {
    for (const o of OCCASIONS) expect(getTemplate(`occasion-${o.id}`), o.id).toBeTruthy();
    for (const f of FEATURES) expect(getTemplate(`feature-${f.id}`), f.id).toBeTruthy();
    for (const q of QUALITIES) expect(getTemplate(`quality-${q.id}`), q.id).toBeTruthy();
    for (const a of ACTIVITIES) expect(getTemplate(`activity-${a.id}`), a.id).toBeTruthy();
  });

  it("offers only unused templates in the library", () => {
    const pages = assemblePages({ ...answers, features: ["eyes"], qualities: [], activities: [] }, "anniversary", key);
    const avail = availableTemplates(pages).map((t) => t.id);
    expect(avail).not.toContain("feature-eyes");
    expect(avail).not.toContain("core-dedication");
    expect(avail).toContain("feature-smile");
  });
});

describe("text", () => {
  const book = { ...defaultBook(), answers: { ...defaultBook().answers, since: 2020, dedication: "For {B} from {A}" } };
  book.characters = [
    { ...book.characters[0], name: "Alex" },
    { ...book.characters[1], name: "Sam" },
  ];

  it("fills every token and leaves none behind", () => {
    const ctx = textContext(book, new Date("2026-06-01"));
    for (const tpl of TEMPLATES) {
      const out = fillText(tpl.text, ctx);
      expect(out, tpl.id).not.toMatch(/\{[A-Za-z]+\}/);
    }
    expect(fillText("{A} loves {B} since {since} ({years})", ctx)).toBe("Alex loves Sam since 2020 (6 years)");
  });

  it("uses overrides and the dedication", () => {
    expect(pageText({ key: "a", templateId: "core-dedication" }, book)).toBe("For Sam from Alex");
    expect(pageText({ key: "b", templateId: "core-intro", text: "Hi {B}" }, book)).toBe("Hi Sam");
  });

  it("formats years", () => {
    const now = new Date("2026-03-01");
    expect(yearsText(2026, now)).toBe("less than a year");
    expect(yearsText(2025, now)).toBe("1 year");
    expect(yearsText(2016, now)).toBe("10 years");
    expect(yearsText(null, now)).toBe("");
  });

  it("keeps template text short enough for a page", () => {
    for (const tpl of TEMPLATES) expect(tpl.text.length, tpl.id).toBeLessThanOrEqual(200);
  });
});

describe("schema", () => {
  it("accepts the default book", () => {
    expect(BookDataSchema.safeParse(defaultBook()).success).toBe(true);
  });
  it("rejects unknown trait values", () => {
    const b = defaultBook();
    (b.characters[0].traits as Record<string, unknown>).hair = "mohawk-xl";
    expect(BookDataSchema.safeParse(b).success).toBe(false);
  });
});
