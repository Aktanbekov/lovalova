// Tiny persistence layer on libSQL (SQLite-compatible). Server-only.
//
// - TURSO_DATABASE_URL set (e.g. libsql://lovalova-you.turso.io) → hosted Turso database.
//   Use this in production: Vercel functions have no durable disk.
// - Otherwise a local SQLite file: DATABASE_PATH, else data/lovalova.db
//   (on Vercel without Turso: /tmp, which is per-instance and wiped on cold start).
import { createClient, type Client, type InStatement, type InValue } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    owner TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    data TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL REFERENCES books(id),
    owner TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    selection TEXT NOT NULL,
    book_snapshot TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    stripe_session_id TEXT,
    email TEXT,
    shipping TEXT,
    pdf_path TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    password_hash TEXT NOT NULL,
    owner TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS subscribers (
    email TEXT PRIMARY KEY,
    source TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS books_owner ON books(owner);
  CREATE INDEX IF NOT EXISTS orders_session ON orders(stripe_session_id);
`;

function connect(): Client {
  const remote = process.env.TURSO_DATABASE_URL?.trim();
  if (remote) return createClient({ url: remote, authToken: process.env.TURSO_AUTH_TOKEN?.trim() || undefined });
  const fallback = process.env.VERCEL ? "/tmp/lovalova/lovalova.db" : "data/lovalova.db";
  const file = path.resolve(/* turbopackIgnore: true */ process.cwd(), process.env.DATABASE_PATH || fallback);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  return createClient({ url: `file:${file}` });
}

/** Later schema additions. Idempotent. */
async function migrate(c: Client) {
  const cols = await c.execute("PRAGMA table_info(users)");
  if (!cols.rows.some((r) => r.name === "google_sub")) await c.execute("ALTER TABLE users ADD COLUMN google_sub TEXT");
  await c.execute("CREATE UNIQUE INDEX IF NOT EXISTS users_google ON users(google_sub)");
}

async function open(): Promise<Client> {
  const c = connect();
  if (!process.env.TURSO_DATABASE_URL?.trim()) await c.execute("PRAGMA journal_mode = WAL");
  await c.executeMultiple(SCHEMA);
  await migrate(c);
  return c;
}

const g = globalThis as unknown as { __lovalovaDb?: Promise<Client> };

function client(): Promise<Client> {
  if (!g.__lovalovaDb) {
    g.__lovalovaDb = open();
    g.__lovalovaDb.catch(() => (g.__lovalovaDb = undefined)); // retry on the next call
  }
  return g.__lovalovaDb;
}

type Args = InValue[];

/** Run a write. Returns the number of rows changed. */
export async function run(sql: string, ...args: Args): Promise<number> {
  return (await (await client()).execute({ sql, args })).rowsAffected;
}

export async function get<T>(sql: string, ...args: Args): Promise<T | undefined> {
  return (await (await client()).execute({ sql, args })).rows[0] as T | undefined;
}

export async function all<T>(sql: string, ...args: Args): Promise<T[]> {
  return (await (await client()).execute({ sql, args })).rows as unknown as T[];
}

/** Several writes in one transaction. Returns rows changed per statement. */
export async function batch(statements: InStatement[]): Promise<number[]> {
  return (await (await client()).batch(statements, "write")).map((r) => r.rowsAffected);
}
