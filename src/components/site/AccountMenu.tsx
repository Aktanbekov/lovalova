"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOutAction } from "@/app/actions";
import { UserIcon } from "./icons";

export function AccountMenu({ user, draftHref }: { user: { email: string; name: string | null } | null; draftHref: string | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item = "block rounded-lg px-3 py-2 font-medium text-ink hover:bg-blush hover:text-wine";
  const initial = (user?.name || user?.email || "").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-label={user ? "Your account" : "Sign in or create an account"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-blush"
      >
        {user ? (
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-sm font-bold text-white">{initial}</span>
        ) : (
          <UserIcon />
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-xl">
          {user ? (
            <>
              <p className="px-3 pb-2 pt-1 text-sm text-muted">
                Signed in as
                <span className="block truncate font-semibold text-ink">{user.email}</span>
              </p>
              <Link href="/account" className={item}>My books &amp; orders</Link>
              {draftHref && <Link href={draftHref} className={item}>Continue your book</Link>}
              <form action={signOutAction}>
                <button type="submit" className={`${item} w-full text-left`}>Sign out</button>
              </form>
            </>
          ) : (
            <>
              <Link href={`/account/sign-in?next=${encodeURIComponent(pathname)}`} className="btn btn-primary mb-1 w-full !py-2.5">Sign in</Link>
              <Link href={`/account/sign-in?mode=signup&next=${encodeURIComponent(pathname)}`} className={`${item} text-center`}>Create an account</Link>
              <div className="my-1 border-t border-line" />
              <Link href="/account" className={item}>My books</Link>
              {draftHref && <Link href={draftHref} className={item}>Continue your book</Link>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
