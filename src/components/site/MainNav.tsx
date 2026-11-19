"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, CloseIcon, MenuIcon } from "./icons";

export interface NavLink {
  label: string;
  href: string;
  note?: string;
}
export interface NavMenu {
  label: string;
  href?: string;
  columns?: { title: string; links: NavLink[] }[];
  /** Server-rendered promo tile shown on the right of the panel. */
  feature?: ReactNode;
}

/** Desktop mega-menu (hover or click) + mobile slide-in drawer. */
export function MainNav({ menus, logo, mobileExtra }: { menus: NavMenu[]; logo: ReactNode; mobileExtra?: ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [section, setSection] = useState<number | null>(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close everything after navigating.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setDrawer(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const enter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <>
      {/* Mobile trigger */}
      <button type="button" className="-ml-2 mr-1 grid h-12 w-12 self-center place-items-center rounded-lg text-ink hover:bg-blush lg:hidden" aria-label="Открыть меню" onClick={() => setDrawer(true)}>
        <MenuIcon className="h-7 w-7" />
      </button>
      {logo}
      {/* Desktop */}
      <nav aria-label="Каталог" className="hidden h-full items-stretch lg:flex" onMouseLeave={leave}>
        {menus.map((m, i) =>
          m.columns ? (
            <div key={m.label} className="flex items-stretch" onMouseEnter={() => enter(i)}>
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className={`flex items-center gap-1 whitespace-nowrap border-b-[3px] px-2.5 text-[1.02rem] font-semibold transition xl:px-4 ${open === i ? "border-brand text-brand" : "border-transparent text-ink hover:text-brand"}`}
              >
                {m.label}
                <ChevronDown className={`h-4 w-4 transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="absolute inset-x-0 top-full z-40 border-t border-line bg-white shadow-[0_24px_40px_-24px_rgb(40_10_30_/_0.35)]" onMouseEnter={() => enter(i)}>
                  <div className="mx-auto grid max-w-7xl gap-10 px-6 py-8" style={{ gridTemplateColumns: `repeat(${m.columns.length}, minmax(0, 1fr)) ${m.feature ? "minmax(0, 1.25fr)" : ""}` }}>
                    {m.columns.map((col) => (
                      <div key={col.title}>
                        <p className="text-sm font-semibold text-muted">{col.title}</p>
                        <ul className="mt-3 space-y-1">
                          {col.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="-mx-2 block rounded-lg px-2 py-1.5 font-medium text-ink hover:bg-blush hover:text-wine">
                                {l.label}
                                {l.note && <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-[0.7rem] font-bold uppercase text-night">{l.note}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {m.feature && <div>{m.feature}</div>}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={m.label}
              href={m.href!}
              onMouseEnter={() => setOpen(null)}
              className="flex items-center whitespace-nowrap border-b-[3px] border-transparent px-2.5 text-[1.02rem] font-semibold text-ink transition hover:text-brand xl:px-4"
            >
              {m.label}
            </Link>
          ),
        )}
      </nav>


      {drawer && createPortal(
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Меню">
          <div className="absolute inset-0 bg-night/50" onClick={() => setDrawer(false)} />
          <div className="slide-up absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-display text-xl font-semibold text-wine">Меню</span>
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-blush" aria-label="Закрыть меню" onClick={() => setDrawer(false)}>
                <CloseIcon />
              </button>
            </div>
            <ul className="divide-y divide-line">
              {menus.map((m, i) =>
                m.columns ? (
                  <li key={m.label}>
                    <button
                      type="button"
                      aria-expanded={section === i}
                      onClick={() => setSection(section === i ? null : i)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left text-lg font-semibold"
                    >
                      {m.label}
                      <ChevronDown className={`h-5 w-5 transition ${section === i ? "rotate-180" : ""}`} />
                    </button>
                    {section === i && (
                      <div className="space-y-4 px-5 pb-5">
                        {m.columns.map((col) => (
                          <div key={col.title}>
                            <p className="text-sm font-semibold text-muted">{col.title}</p>
                            <ul className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1">
                              {col.links.map((l) => (
                                <li key={l.href}>
                                  <Link href={l.href} className="flex min-h-11 items-center rounded-md font-medium text-ink">
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={m.label}>
                    <Link href={m.href!} className="block px-5 py-4 text-lg font-semibold">
                      {m.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            {mobileExtra && <div className="mt-auto border-t border-line p-5">{mobileExtra}</div>}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
