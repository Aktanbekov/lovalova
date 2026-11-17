import { notFound } from "next/navigation";
import { readOwner } from "./owner";
import { getBook, getOrder } from "./store";

export async function loadOwnedBook(id: string) {
  const owner = await readOwner();
  const book = getBook(id);
  if (!book || !owner || book.owner !== owner) notFound();
  return book;
}

export async function loadOwnedOrder(id: string | undefined) {
  const owner = await readOwner();
  const order = id ? getOrder(id) : null;
  if (!order || !owner || order.owner !== owner) notFound();
  return order;
}
