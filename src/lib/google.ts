// Google sign-in: OAuth 2.0 authorization-code flow with PKCE. Server-only.
// Needs GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (a "Web application" OAuth
// client whose authorized redirect URI is <site>/api/auth/google/callback).

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { siteUrl } from "./stripe";

export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";
export const GOOGLE_COOKIE = "ll_google";

export interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface GoogleProfile {
  sub: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
}

export function googleConfig(): GoogleConfig | null {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret || clientId.endsWith("...")) return null;
  return { clientId, clientSecret, redirectUri: `${siteUrl()}/api/auth/google/callback` };
}

const b64url = (buf: Buffer) => buf.toString("base64url");

/** A random state and a PKCE verifier with its S256 challenge. */
export function newGoogleRequest() {
  const verifier = b64url(randomBytes(32));
  return {
    state: b64url(randomBytes(24)),
    verifier,
    challenge: b64url(createHash("sha256").update(verifier).digest()),
  };
}

export function buildAuthUrl(cfg: GoogleConfig, state: string, challenge: string): string {
  const u = new URL(GOOGLE_AUTH_URL);
  u.search = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: cfg.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  }).toString();
  return u.toString();
}

export function sameState(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && x.length > 0 && timingSafeEqual(x, y);
}

type FetchFn = typeof fetch;

/** Swap the one-time code for tokens, then read the signed-in Google profile. */
export async function fetchGoogleProfile(cfg: GoogleConfig, code: string, verifier: string, fetchFn: FetchFn = fetch): Promise<GoogleProfile> {
  const tokenRes = await fetchFn(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      redirect_uri: cfg.redirectUri,
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
  });
  if (!tokenRes.ok) throw new Error(`Google token exchange failed (${tokenRes.status})`);
  const token = (await tokenRes.json()) as { access_token?: string };
  if (!token.access_token) throw new Error("Google returned no access token");

  const infoRes = await fetchFn(GOOGLE_USERINFO_URL, { headers: { Authorization: `Bearer ${token.access_token}` } });
  if (!infoRes.ok) throw new Error(`Google userinfo failed (${infoRes.status})`);
  const info = (await infoRes.json()) as { sub?: string; email?: string; email_verified?: boolean; name?: string };
  if (!info.sub || !info.email) throw new Error("Google profile is missing sub or email");
  return { sub: info.sub, email: info.email, emailVerified: info.email_verified === true, name: info.name?.trim() || null };
}
