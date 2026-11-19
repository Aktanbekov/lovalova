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
        aria-label={user ? "Мой аккаунт" : "Войти или создать аккаунт"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-12 w-12 place-items-center rounded-lg text-ink transition hover:bg-blush lg:h-11 lg:w-11"
      >
        {user ? (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-bold text-white lg:h-8 lg:w-8 lg:text-sm">{initial}</span>
        ) : (
          <UserIcon className="h-7 w-7 lg:h-6 lg:w-6" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-line bg-white p-2 shadow-xl">
          {user ? (
            <>
              <p className="px-3 pb-2 pt-1 text-sm text-muted">
                Вы вошли как
                <span className="block truncate font-semibold text-ink">{user.email}</span>
              </p>
              <Link href="/account" className={item}>Мои книги и заказы</Link>
              {draftHref && <Link href={draftHref} className={item}>Продолжить книгу</Link>}
              <form action={signOutAction}>
                <button type="submit" className={`${item} w-full text-left`}>Выйти</button>
              </form>
            </>
          ) : (
            <>
              <Link href={`/account/sign-in?next=${encodeURIComponent(pathname)}`} className="btn btn-primary mb-1 w-full !py-2.5">Войти</Link>
              <Link href={`/account/sign-in?mode=signup&next=${encodeURIComponent(pathname)}`} className={`${item} text-center`}>Создать аккаунт</Link>
              <div className="my-1 border-t border-line" />
              <Link href="/account" className={item}>Мои книги</Link>
              {draftHref && <Link href={draftHref} className={item}>Продолжить книгу</Link>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
