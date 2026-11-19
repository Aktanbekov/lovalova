// Tiny persistence layer on Node's built-in SQLite. Server-only.
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

function open(): DatabaseSync {
  // Vercel's filesystem is read-only except /tmp, and /tmp is per-instance and wiped on cold start.
  // That keeps a preview deploy running, but real data needs a hosted database (see README → Deploy).
  const fallback = process.env.VERCEL ? "/tmp/lovalova/lovalova.db" : "data/lovalova.db";
  const file = path.resolve(/* turbopackIgnore: true */ process.cwd(), process.env.DATABASE_PATH || fallback);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
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
  `);
  return db;
}

/** Later schema additions. Idempotent; runs on every module load (also after a dev reload). */
function migrate(db: DatabaseSync) {
  const userCols = db.prepare("PRAGMA table_info(users)").all() as { name: string }[];
  if (!userCols.some((c) => c.name === "google_sub")) db.exec("ALTER TABLE users ADD COLUMN google_sub TEXT");
  db.exec("CREATE UNIQUE INDEX IF NOT EXISTS users_google ON users(google_sub)");
}

const g = globalThis as unknown as { __lovalovaDb?: DatabaseSync };
export const db: DatabaseSync = g.__lovalovaDb ?? (g.__lovalovaDb = open());
migrate(db);
