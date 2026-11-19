// Email + password accounts. Server-only.
//
// Ownership stays as before: every book and order belongs to an "owner" id.
// A guest's owner id lives in the ll_owner cookie; an account has its own
// owner id. Signing up adopts the guest's books; signing in moves any guest
// books into the account. readOwner() prefers the signed-in account.

import { cookies } from "next/headers";
import { createHash, randomBytes } from "node:crypto";
import { hashPassword, verifyPassword } from "./password";

export { verifyPassword };
import { db } from "./db";
import { newId } from "./store";

export const SESSION_COOKIE = "ll_session";
export const OWNER_COOKIE = "ll_owner";
const SESSION_DAYS = 30;

export interface User {
  id: string;
  email: string;
  name: string | null;
  owner: string;
}

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// ---------- users ----------

type RawUser = { id: string; email: string; name: string | null; owner: string; password_hash: string };
const toUser = (r: RawUser): User => ({ id: r.id, email: r.email, name: r.name, owner: r.owner });

export function findUserByEmail(email: string): (User & { passwordHash: string }) | null {
  const r = db.prepare("SELECT * FROM users WHERE email = ?").get(normalizeEmail(email)) as RawUser | undefined;
  return r ? { ...toUser(r), passwordHash: r.password_hash } : null;
}

function isAccountOwner(owner: string): boolean {
  return Boolean(db.prepare("SELECT 1 FROM users WHERE owner = ?").get(owner));
}

export function createUser(email: string, password: string, name: string | null, guestOwner: string | null): User {
  // Adopt the guest's owner id (and so their books) unless it already belongs to an account.
  const owner = guestOwner && !isAccountOwner(guestOwner) ? guestOwner : newId(18);
  const id = `usr_${newId(9)}`;
  db.prepare("INSERT INTO users (id, email, name, password_hash, owner) VALUES (?, ?, ?, ?, ?)").run(
    id,
    normalizeEmail(email),
    name,
    hashPassword(password),
    owner,
  );
  return { id, email: normalizeEmail(email), name, owner };
}

/** Move a guest's books and orders into an account. */
export function adoptGuestBooks(user: User, guestOwner: string | null) {
  if (!guestOwner || guestOwner === user.owner || isAccountOwner(guestOwner)) return;
  db.prepare("UPDATE books SET owner = ? WHERE owner = ?").run(user.owner, guestOwner);
  db.prepare("UPDATE orders SET owner = ? WHERE owner = ?").run(user.owner, guestOwner);
}

/**
 * Sign in with Google: find the account by its Google id, else link a
 * password account with the same verified e-mail, else create one (adopting
 * this browser's guest books). Google-only accounts have no usable password.
 */
export function googleUser(profile: { sub: string; email: string; name: string | null }, guestOwner: string | null): User {
  const bySub = db.prepare("SELECT * FROM users WHERE google_sub = ?").get(profile.sub) as RawUser | undefined;
  if (bySub) return toUser(bySub);
  const email = normalizeEmail(profile.email);
  const byEmail = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as RawUser | undefined;
  if (byEmail) {
    db.prepare("UPDATE users SET google_sub = ? WHERE id = ?").run(profile.sub, byEmail.id);
    return toUser(byEmail);
  }
  const owner = guestOwner && !isAccountOwner(guestOwner) ? guestOwner : newId(18);
  const id = `usr_${newId(9)}`;
  db.prepare("INSERT INTO users (id, email, name, password_hash, owner, google_sub) VALUES (?, ?, ?, '!', ?, ?)").run(id, email, profile.name, owner, profile.sub);
  return { id, email, name: profile.name, owner };
}

// ---------- sessions ----------

const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");

/** Only call from a Server Action or Route Handler (sets cookies). */
export async function startSession(user: User) {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5);
  db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)").run(tokenHash(token), user.id, expires.toISOString());
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, { ...cookieBase, expires });
  jar.set(OWNER_COOKIE, user.owner, { ...cookieBase, maxAge: 60 * 60 * 24 * 365 });
}

export async function currentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const r = db
    .prepare("SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?")
    .get(tokenHash(token), new Date().toISOString()) as RawUser | undefined;
  return r ? toUser(r) : null;
}

/** Only call from a Server Action or Route Handler (clears cookies). */
export async function endSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash(token));
  jar.delete(SESSION_COOKIE);
  jar.delete(OWNER_COOKIE); // the next visit starts a fresh guest
}

// ---------- newsletter ----------

export function addSubscriber(email: string, source: string) {
  db.prepare("INSERT INTO subscribers (email, source) VALUES (?, ?) ON CONFLICT(email) DO NOTHING").run(normalizeEmail(email), source);
}
