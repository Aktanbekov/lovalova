import { describe, expect, it } from "vitest";
import { lineItems, money, subtotal, FORMATS, UPGRADES } from "@/lib/pricing";

describe("pricing", () => {
  it("prices a plain softcover", () => {
    expect(subtotal({ format: "softcover", matte: false, digital: false, giftbox: false })).toBe(FORMATS.softcover.cents);
  });
  it("adds every upgrade", () => {
    const sel = { format: "hardcover", matte: true, digital: true, giftbox: true } as const;
    expect(subtotal(sel)).toBe(6400 + 500 + 900 + 1500);
    expect(lineItems(sel).map((i) => i.id)).toEqual(["hardcover", "matte", "digital", "giftbox"]);
  });
  it("formats money", () => {
    expect(money(6400)).toBe("$64.00");
    expect(money(UPGRADES.matte.cents)).toBe("$5.00");
  });
});
