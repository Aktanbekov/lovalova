import { describe, expect, it } from "vitest";
import { discountCents, findPromo, normalizeCode, PROMOS } from "@/lib/promos";
import { totals } from "@/lib/pricing";
import { hashPassword, verifyPassword } from "@/lib/password";

describe("promo codes", () => {
  it("finds codes case- and space-insensitively", () => {
    expect(findPromo(" love15 ")?.code).toBe("LOVE15");
    expect(normalizeCode("wel come10")).toBe("WELCOME10");
    expect(findPromo("NOPE")).toBeNull();
    expect(findPromo("")).toBeNull();
    expect(findPromo(null)).toBeNull();
  });

  it("respects end dates", () => {
    PROMOS.push({ code: "OLDCODE", percentOff: 5, label: "old", endsOn: "2020-01-31" });
    try {
      expect(findPromo("OLDCODE", new Date("2020-01-31T12:00:00Z"))?.code).toBe("OLDCODE");
      expect(findPromo("OLDCODE", new Date("2020-02-01T00:00:00Z"))).toBeNull();
    } finally {
      PROMOS.pop();
    }
  });

  it("discounts the book and extras, rounded to the cent", () => {
    const sel = { format: "hardcover" as const, matte: false, digital: true, giftbox: false };
    // 5 490 + 790 = 6 280 сом; 15% off is 942 сом.
    expect(totals(sel, null)).toEqual({ subtotal: 628000, discount: 0, total: 628000 });
    expect(totals(sel, findPromo("LOVE15"))).toEqual({ subtotal: 628000, discount: 94200, total: 533800 });
    expect(discountCents(399000, findPromo("WELCOME10"))).toBe(39900);
  });
});

describe("passwords", () => {
  it("verifies the right password only", () => {
    const h = hashPassword("correct horse");
    expect(h.startsWith("scrypt$")).toBe(true);
    expect(verifyPassword("correct horse", h)).toBe(true);
    expect(verifyPassword("wrong horse", h)).toBe(false);
  });

  it("salts every hash and rejects malformed ones", () => {
    expect(hashPassword("same")).not.toBe(hashPassword("same"));
    expect(verifyPassword("x", "plain$text")).toBe(false);
    expect(verifyPassword("x", "")).toBe(false);
  });
});
