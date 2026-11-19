"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SubscribeForm } from "./SubscribeForm";
import { CloseIcon } from "./icons";

const KEY = "ll_offer_v2";
const HIDDEN_ON = ["/create", "/cart", "/checkout", "/account"];

/**
 * "10% off for your e-mail" card. Never on the first screen: it waits until the
 * visitor has scrolled through most of a page, shows once per browser, and on
 * phones sits above the sticky action bar.
 */
export function OfferPopup() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const blocked = HIDDEN_ON.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (blocked) return;
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {}
    const onScroll = () => {
      const depth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (depth > 0.6) {
        setShow(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [blocked]);

  const close = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setShow(false);
  };

  if (!show || blocked) return null;

  return (
    <div
      className="slide-up fixed inset-x-3 z-40 rounded-xl bg-gold p-5 shadow-2xl sm:inset-x-auto sm:left-5 sm:w-[24rem] lg:bottom-5"
      style={{ bottom: "calc(5.5rem + env(safe-area-inset-bottom))" }}
      role="dialog"
      aria-label="Скидка 10% за подписку"
    >
      <button type="button" aria-label="Закрыть" className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-lg text-night hover:bg-white/50" onClick={close}>
        <CloseIcon />
      </button>
      <p className="pr-10 font-display text-2xl font-semibold leading-tight text-night">Скидка 10% на первую книгу</p>
      <p className="mt-1 text-night/80">Оставьте e-mail, и код появится сразу.</p>
      <div className="mt-3">
        <SubscribeForm source="popup" onDone={close} />
      </div>
    </div>
  );
}
