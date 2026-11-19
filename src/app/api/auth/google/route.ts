// Step 1 of Google sign-in: remember where to go afterwards, then send the
// visitor to Google with a one-time state and a PKCE challenge.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GOOGLE_COOKIE, buildAuthUrl, googleConfig, newGoogleRequest } from "@/lib/google";
import { readPreset, safeNext } from "@/lib/book/preset";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const next = q.get("next") === "start" ? "start" : safeNext(q.get("next"));
  const preset = readPreset((k) => q.get(k));

  const cfg = googleConfig();
  if (!cfg) {
    const back = new URLSearchParams({ error: "google_off", next: next === "start" ? "/" : next });
    redirect(`/account/sign-in?${back}`);
  }

  const { state, verifier, challenge } = newGoogleRequest();
  (await cookies()).set(GOOGLE_COOKIE, Buffer.from(JSON.stringify({ state, verifier, next, preset })).toString("base64url"), {
    httpOnly: true,
    sameSite: "lax", // sent on Google's top-level redirect back to us
    secure: process.env.NODE_ENV === "production",
    path: "/api/auth/google",
    maxAge: 600,
  });
  redirect(buildAuthUrl(cfg, state, challenge));
}
