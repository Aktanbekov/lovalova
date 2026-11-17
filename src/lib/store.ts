// Book and order persistence. Server-only.
import { randomBytes } from "node:crypto";
import { db } from "./db";
import { defaultBook, parseBook, type BookData, type Selection } from "./book/schema";

export const newId = (bytes = 12) => randomBytes(bytes).toString("base64url");

export interface BookRow {
  id: string;
  owner: string;
  status: "draft" | "ordered";
  data: BookData;
  updatedAt: string;
}

type RawBook = { id: string; owner: string; status: string; data: string; updated_at: string };

function toBook(r: RawBook): BookRow {
  return { id: r.id, owner: r.owner, status: r.status as BookRow["status"], data: parseBook(r.data), updatedAt: r.updated_at };
}

export function createBook(owner: string): BookRow {
  const id = newId();
  const data = defaultBook();
  db.prepare("INSERT INTO books (id, owner, data) VALUES (?, ?, ?)").run(id, owner, JSON.stringify(data));
  return getBook(id)!;
}

export function getBook(id: string): BookRow | null {
  const r = db.prepare("SELECT * FROM books WHERE id = ?").get(id) as RawBook | undefined;
  return r ? toBook(r) : null;
}

export function latestDraft(owner: string): BookRow | null {
  const r = db.prepare("SELECT * FROM books WHERE owner = ? ORDER BY updated_at DESC LIMIT 1").get(owner) as RawBook | undefined;
  return r ? toBook(r) : null;
}

export function listBooks(owner: string): BookRow[] {
  return (db.prepare("SELECT * FROM books WHERE owner = ? ORDER BY updated_at DESC").all(owner) as RawBook[]).map(toBook);
}

/** Books that have been previewed and not yet ordered: what the cart holds. */
export function cartBooks(owner: string): BookRow[] {
  return listBooks(owner).filter((b) => b.status === "draft" && b.data.previewed);
}

export function listOrders(owner: string): OrderRow[] {
  return (db.prepare("SELECT * FROM orders WHERE owner = ? AND status = 'paid' ORDER BY created_at DESC").all(owner) as RawOrder[]).map(toOrder);
}

export function createBookWith(owner: string, data: BookData): BookRow {
  const id = newId();
  db.prepare("INSERT INTO books (id, owner, data) VALUES (?, ?, ?)").run(id, owner, JSON.stringify(data));
  return getBook(id)!;
}

export function saveBookData(id: string, data: BookData) {
  db.prepare("UPDATE books SET data = ?, updated_at = datetime('now') WHERE id = ?").run(JSON.stringify(data), id);
}

export interface OrderRow {
  id: string;
  bookId: string;
  owner: string;
  status: "pending" | "paid" | "failed";
  selection: Selection;
  book: BookData;
  amountCents: number;
  stripeSessionId: string | null;
  email: string | null;
  shipping: unknown;
  pdfPath: string | null;
  createdAt: string;
}

type RawOrder = {
  id: string; book_id: string; owner: string; status: string; selection: string; book_snapshot: string;
  amount_cents: number; stripe_session_id: string | null; email: string | null; shipping: string | null;
  pdf_path: string | null; created_at: string;
};

function toOrder(r: RawOrder): OrderRow {
  return {
    id: r.id,
    bookId: r.book_id,
    owner: r.owner,
    status: r.status as OrderRow["status"],
    selection: JSON.parse(r.selection),
    book: parseBook(r.book_snapshot),
    amountCents: r.amount_cents,
    stripeSessionId: r.stripe_session_id,
    email: r.email,
    shipping: r.shipping ? JSON.parse(r.shipping) : null,
    pdfPath: r.pdf_path,
    createdAt: r.created_at,
  };
}

export function createOrder(book: BookRow, selection: Selection, amountCents: number): OrderRow {
  const id = `ord_${newId(9)}`;
  db.prepare(
    "INSERT INTO orders (id, book_id, owner, selection, book_snapshot, amount_cents) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(id, book.id, book.owner, JSON.stringify(selection), JSON.stringify(book.data), amountCents);
  return getOrder(id)!;
}

export function getOrder(id: string): OrderRow | null {
  const r = db.prepare("SELECT * FROM orders WHERE id = ?").get(id) as RawOrder | undefined;
  return r ? toOrder(r) : null;
}

export function setOrderSession(id: string, sessionId: string) {
  db.prepare("UPDATE orders SET stripe_session_id = ?, updated_at = datetime('now') WHERE id = ?").run(sessionId, id);
}

/** Mark paid. Returns true only for the call that actually flipped it. */
export function markOrderPaid(id: string, info: { email: string | null; shipping: unknown; amountCents?: number | null }): boolean {
  const res = db
    .prepare(
      "UPDATE orders SET status = 'paid', email = ?, shipping = ?, amount_cents = COALESCE(?, amount_cents), updated_at = datetime('now') WHERE id = ? AND status != 'paid'",
    )
    .run(info.email, JSON.stringify(info.shipping ?? null), info.amountCents ?? null, id);
  if (res.changes > 0) {
    db.prepare("UPDATE books SET status = 'ordered' WHERE id = (SELECT book_id FROM orders WHERE id = ?)").run(id);
    return true;
  }
  return false;
}

export function setOrderPdf(id: string, pdfPath: string) {
  db.prepare("UPDATE orders SET pdf_path = ?, updated_at = datetime('now') WHERE id = ?").run(pdfPath, id);
}
