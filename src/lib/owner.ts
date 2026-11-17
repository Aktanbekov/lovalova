// Who owns the books in this browser. A signed-in account wins; otherwise the
// anonymous ll_owner cookie. Server actions and routes check this before
// reading or changing a book or order.
import { cookies } from "next/headers";
import { OWNER_COOKIE, currentUser } from "./auth";
import { newId } from "./store";

export { OWNER_COOKIE };

export async function readOwner(): Promise<string | null> {
  const user = await currentUser();
  if (user) return user.owner;
  return (await cookies()).get(OWNER_COOKIE)?.value ?? null;
}

/** Only call from a Server Action or Route Handler (it may set a cookie). */
export async function ensureOwner(): Promise<string> {
  const existing = await readOwner();
  if (existing) return existing;
  const id = newId(18);
  (await cookies()).set(OWNER_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return id;
}
