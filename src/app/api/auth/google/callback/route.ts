// Step 2 of Google sign-in: check the state, swap the code for the profile,
// find or create the account, start a session, then continue where the
// visitor was going (or start their book).
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OWNER_COOKIE, adoptGuestBooks, googleUser, startSession } from "@/lib/auth";
import { bookFromPreset, readPreset, safeNext } from "@/lib/book/preset";
import { GOOGLE_COOKIE, fetchGoogleProfile, googleConfig, sameState } from "@/lib/google";
import { createBookWith } from "@/lib/store";

type Pending = { state: string; verifier: string; next: string; preset: Record<string, string> };

const fail = (code: string): never => redirect(`/account/sign-in?error=${code}`);

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const jar = await cookies();
  const raw = jar.get(GOOGLE_COOKIE)?.value;
  jar.delete({ name: GOOGLE_COOKIE, path: "/api/auth/google" }); // one use only

  let pending: Pending | null = null;
  try {
    pending = raw ? (JSON.parse(Buffer.from(raw, "base64url").toString()) as Pending) : null;
  } catch {
    pending = null;
  }
  if (q.get("error")) fail("google_cancelled");
  const code = q.get("code");
  const state = q.get("state");
  if (!pending || !code || !state || !sameState(state, pending.state)) fail("google_failed");

  const cfg = googleConfig();
  if (!cfg) fail("google_off");

  let profile;
  try {
    profile = await fetchGoogleProfile(cfg!, code!, pending!.verifier);
  } catch (err) {
    console.error("[lovalova] Google sign-in failed", err);
    fail("google_failed");
  }
  if (!profile!.emailVerified) fail("google_unverified");

  const guestOwner = jar.get(OWNER_COOKIE)?.value ?? null;
  const user = googleUser(profile!, guestOwner);
  adoptGuestBooks(user, guestOwner);
  await startSession(user);

  if (pending!.next === "start") {
    const book = createBookWith(user.owner, bookFromPreset(readPreset((k) => pending!.preset?.[k])));
    redirect(`/create/${book.id}/characters`);
  }
  redirect(safeNext(pending!.next));
}
