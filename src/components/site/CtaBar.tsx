"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { StartBookButton } from "./StartBookButton";

const SHOP_PATHS = ["/", "/books", "/pricing", "/occasions", "/for"];

/**
 * Phone-only action bar pinned to the bottom of the screen on shop pages.
 * It appears once the hero's own button has scrolled out of view.
 */
export function CtaBar({ signedIn, priceLabel }: { signedIn: boolean; priceLabel: string }) {
  const pathname = usePathname();
  const onShop = SHOP_PATHS.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)));
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!onShop) return;
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onShop, pathname]);

  if (!onShop) return null;

  return (
    <div
      className={`cta-bar fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 backdrop-blur transition-transform duration-300 lg:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex items-center gap-3">
        <p className="shrink-0 text-sm leading-tight text-muted">
          от
          <span className="block text-base font-bold text-ink">{priceLabel}</span>
        </p>
        <div className="flex-1 [&>form]:w-full">
          <StartBookButton signedIn={signedIn} label="Создать книгу" className="btn btn-primary w-full" />
        </div>
      </div>
    </div>
  );
}
