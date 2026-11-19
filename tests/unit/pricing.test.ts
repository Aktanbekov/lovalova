import { describe, expect, it } from "vitest";
import { lineItems, money, subtotal, FORMATS, UPGRADES } from "@/lib/pricing";

describe("pricing", () => {
  it("prices a plain softcover", () => {
    expect(subtotal({ format: "softcover", matte: false, digital: false, giftbox: false })).toBe(FORMATS.softcover.cents);
  });
  it("adds every upgrade", () => {
    const sel = { format: "hardcover", matte: true, digital: true, giftbox: true } as const;
    expect(subtotal(sel)).toBe(FORMATS.hardcover.cents + UPGRADES.matte.cents + UPGRADES.digital.cents + UPGRADES.giftbox.cents);
    expect(lineItems(sel).map((i) => i.id)).toEqual(["hardcover", "matte", "digital", "giftbox"]);
  });
  it("formats money", () => {
    // Whole som, Russian digit grouping (no-break spaces), no kopecks.
    expect(money(549000)).toBe("5\u00a0490\u00a0сом");
    expect(money(39000)).toBe("390\u00a0сом");
    expect(money(12345)).toBe("123,45\u00a0сом");
  });
});
