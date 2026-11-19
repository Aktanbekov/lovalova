import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildAuthUrl, fetchGoogleProfile, newGoogleRequest, sameState } from "@/lib/google";
import { readPreset, safeNext, bookFromPreset } from "@/lib/book/preset";

const cfg = { clientId: "cid.apps.googleusercontent.com", clientSecret: "secret", redirectUri: "http://localhost:3000/api/auth/google/callback" };

describe("google request", () => {
  it("uses PKCE S256 and a fresh state", () => {
    const a = newGoogleRequest();
    const b = newGoogleRequest();
    expect(a.state).not.toBe(b.state);
    expect(a.challenge).toBe(createHash("sha256").update(a.verifier).digest("base64url"));
    expect(a.verifier.length).toBeGreaterThanOrEqual(43);
  });

  it("builds the Google URL with every required parameter", () => {
    const u = new URL(buildAuthUrl(cfg, "st", "ch"));
    expect(u.origin + u.pathname).toBe("https://accounts.google.com/o/oauth2/v2/auth");
    expect(Object.fromEntries(u.searchParams)).toMatchObject({
      client_id: cfg.clientId,
      redirect_uri: cfg.redirectUri,
      response_type: "code",
      scope: "openid email profile",
      state: "st",
      code_challenge: "ch",
      code_challenge_method: "S256",
    });
  });

  it("compares state safely", () => {
    expect(sameState("abc", "abc")).toBe(true);
    expect(sameState("abc", "abd")).toBe(false);
    expect(sameState("abc", "abcd")).toBe(false);
    expect(sameState("", "")).toBe(false);
  });
});

describe("google profile", () => {
  const fakeFetch = (token: object, info: object, ok = true) =>
    (async (url: string | URL | Request, init?: RequestInit) => {
      if (String(url).includes("token")) {
        const body = new URLSearchParams(String(init?.body));
        expect(body.get("code_verifier")).toBe("ver");
        expect(body.get("grant_type")).toBe("authorization_code");
        return new Response(JSON.stringify(token), { status: ok ? 200 : 400 });
      }
      expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer at");
      return new Response(JSON.stringify(info));
    }) as typeof fetch;

  it("returns the verified profile", async () => {
    const p = await fetchGoogleProfile(cfg, "code", "ver", fakeFetch({ access_token: "at" }, { sub: "g1", email: "A@Example.com", email_verified: true, name: " Айпери " }));
    expect(p).toEqual({ sub: "g1", email: "A@Example.com", emailVerified: true, name: "Айпери" });
  });

  it("flags unverified e-mail and rejects failures", async () => {
    const p = await fetchGoogleProfile(cfg, "code", "ver", fakeFetch({ access_token: "at" }, { sub: "g1", email: "a@example.com" }));
    expect(p.emailVerified).toBe(false);
    await expect(fetchGoogleProfile(cfg, "code", "ver", fakeFetch({}, {}, false))).rejects.toThrow(/token exchange/);
    await expect(fetchGoogleProfile(cfg, "code", "ver", fakeFetch({}, {}))).rejects.toThrow(/no access token/);
  });
});

describe("presets and redirects", () => {
  it("keeps valid fields only", () => {
    const q = new URLSearchParams({ occasion: "march8", cover: "nope", title: "Наш Новый год", evil: "x" });
    expect(readPreset((k) => q.get(k))).toEqual({ occasion: "march8", title: "Наш Новый год" });
    const b = bookFromPreset({ occasion: "march8", cover: "snow", title: "Т" });
    expect([b.occasion, b.cover.id, b.cover.title]).toEqual(["march8", "snow", "Т"]);
  });

  it("only redirects within the site", () => {
    expect(safeNext("/account")).toBe("/account");
    expect(safeNext("//evil.com")).toBe("/account");
    expect(safeNext("/\\evil.com")).toBe("/account");
    expect(safeNext("https://evil.com")).toBe("/account");
    expect(safeNext(null)).toBe("/account");
  });
});

describe("google accounts", () => {
  let dir: string;
  let auth: typeof import("@/lib/auth");
  beforeAll(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "lovalova-test-"));
    process.env.DATABASE_PATH = path.join(dir, "test.db");
    auth = await import("@/lib/auth");
  });
  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }));

  it("creates once, then finds by Google id", async () => {
    const a = await auth.googleUser({ sub: "g-100", email: "New@Example.com", name: "Тимур" }, "guest-owner-1");
    expect(a.email).toBe("new@example.com");
    expect(a.owner).toBe("guest-owner-1"); // adopts the guest's books
    const again = await auth.googleUser({ sub: "g-100", email: "changed@example.com", name: null }, null);
    expect(again.id).toBe(a.id);
  });

  it("links to an existing password account with the same e-mail", async () => {
    const pw = await auth.createUser("pair@example.com", "correct horse", null, null);
    const g = await auth.googleUser({ sub: "g-200", email: "PAIR@example.com", name: null }, null);
    expect(g.id).toBe(pw.id);
  });

  it("gives Google-only accounts no usable password", async () => {
    await auth.googleUser({ sub: "g-300", email: "only@example.com", name: null }, null);
    const u = (await auth.findUserByEmail("only@example.com"))!;
    expect(auth.verifyPassword("", u.passwordHash)).toBe(false);
    expect(auth.verifyPassword("!", u.passwordHash)).toBe(false);
  });
});
