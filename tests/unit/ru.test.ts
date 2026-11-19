import { describe, expect, it } from "vitest";
import { count, plural } from "@/lib/ru";
import { TEMPLATES } from "@/content/pages";

describe("russian plurals", () => {
  it("picks one / few / many", () => {
    const f: [string, string, string] = ["страница", "страницы", "страниц"];
    expect([1, 2, 4, 5, 11, 12, 14, 21, 22, 25, 101, 111].map((n) => plural(n, f))).toEqual([
      "страница", "страницы", "страницы", "страниц", "страниц", "страниц", "страниц", "страница", "страницы", "страниц", "страница", "страниц",
    ]);
    expect(count(24, f)).toBe("24 страницы");
  });
});

describe("book copy", () => {
  it("is Russian and never genders the reader with (а)/(ая) forms", () => {
    for (const t of TEMPLATES) {
      if (t.id === "core-dedication") continue;
      expect(t.text, t.id).toMatch(/[а-яё]/i);
      expect(t.text, t.id).not.toMatch(/\((а|ая|ый|ой|ла)\)/);
    }
  });
});
