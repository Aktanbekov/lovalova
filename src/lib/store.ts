// Book and order persistence. Server-only.
import { randomBytes } from "node:crypto";
import { all, batch, get, run } from "./db";
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

export async function createBook(owner: string): Promise<BookRow> {
  return await createBookWith(owner, defaultBook());
}

export async function getBook(id: string): Promise<BookRow | null> {
  const r = await get<RawBook>("SELECT * FROM books WHERE id = ?", id);
  return r ? toBook(r) : null;
}

export async function latestDraft(owner: string): Promise<BookRow | null> {
  const r = await get<RawBook>("SELECT * FROM books WHERE owner = ? ORDER BY updated_at DESC LIMIT 1", owner);
  return r ? toBook(r) : null;
}

export async function listBooks(owner: string): Promise<BookRow[]> {
  return (await all<RawBook>("SELECT * FROM books WHERE owner = ? ORDER BY updated_at DESC", owner)).map(toBook);
}

/** Books that have been previewed and not yet ordered: what the cart holds. */
export async function cartBooks(owner: string): Promise<BookRow[]> {
  return (await listBooks(owner)).filter((b) => b.status === "draft" && b.data.previewed);
}

export async function listOrders(owner: string): Promise<OrderRow[]> {
  return (await all<RawOrder>("SELECT * FROM orders WHERE owner = ? AND status = 'paid' ORDER BY created_at DESC", owner)).map(toOrder);
}

export async function createBookWith(owner: string, data: BookData): Promise<BookRow> {
  const id = newId();
  await run("INSERT INTO books (id, owner, data) VALUES (?, ?, ?)", id, owner, JSON.stringify(data));
  return (await getBook(id))!;
}

export async function saveBookData(id: string, data: BookData) {
  await run("UPDATE books SET data = ?, updated_at = datetime('now') WHERE id = ?", JSON.stringify(data), id);
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

export async function createOrder(book: BookRow, selection: Selection, amountCents: number): Promise<OrderRow> {
  const id = `ord_${newId(9)}`;
  await run(
    "INSERT INTO orders (id, book_id, owner, selection, book_snapshot, amount_cents) VALUES (?, ?, ?, ?, ?, ?)",
    id, book.id, book.owner, JSON.stringify(selection), JSON.stringify(book.data), amountCents,
  );
  return (await getOrder(id))!;
}

export async function getOrder(id: string): Promise<OrderRow | null> {
  const r = await get<RawOrder>("SELECT * FROM orders WHERE id = ?", id);
  return r ? toOrder(r) : null;
}

export async function setOrderSession(id: string, sessionId: string) {
  await run("UPDATE orders SET stripe_session_id = ?, updated_at = datetime('now') WHERE id = ?", sessionId, id);
}

/** Mark paid. Returns true only for the call that actually flipped it. */
export async function markOrderPaid(
  id: string,
  info: { email: string | null; shipping: unknown; amountCents?: number | null },
): Promise<boolean> {
  // One transaction; the book update runs first, while the order is still unpaid.
  const [, flipped] = await batch([
    {
      sql: "UPDATE books SET status = 'ordered' WHERE id = (SELECT book_id FROM orders WHERE id = ? AND status != 'paid')",
      args: [id],
    },
    {
      sql: "UPDATE orders SET status = 'paid', email = ?, shipping = ?, amount_cents = COALESCE(?, amount_cents), updated_at = datetime('now') WHERE id = ? AND status != 'paid'",
      args: [info.email, JSON.stringify(info.shipping ?? null), info.amountCents ?? null, id],
    },
  ]);
  return flipped > 0;
}

export async function setOrderPdf(id: string, pdfPath: string) {
  await run("UPDATE orders SET pdf_path = ?, updated_at = datetime('now') WHERE id = ?", pdfPath, id);
}
