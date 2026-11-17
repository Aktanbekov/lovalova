"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SubscribeForm } from "./SubscribeForm";
import { CloseIcon } from "./icons";

const KEY = "ll_offer_v1";
const HIDDEN_ON = ["/create", "/cart", "/checkout", "/account"];

/** Slide-in "10% off" card, shown once per browser after a short delay. */
export function OfferPopup() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const blocked = HIDDEN_ON.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (blocked) return;
    let state: string | null = null;
    try {
      state = localStorage.getItem(KEY);
    } catch {}
    if (state === "done") return;
    const t = setTimeout(() => {
      setShow(true);
      setMinimized(state === "min");
    }, 7000);
    return () => clearTimeout(t);
  }, [blocked]);

  const remember = (v: "min" | "done") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
  };

  if (!show || blocked) return null;

  if (minimized) {
    return (
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-1 rounded-full bg-white py-1 pl-4 pr-1 shadow-xl ring-1 ring-line">
        <button type="button" className="py-2 font-bold text-wine" onClick={() => setMinimized(false)}>
          Get 10% off
        </button>
        <button
          type="button"
          aria-label="Dismiss offer"
          className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-blush"
          onClick={() => {
            remember("done");
            setShow(false);
          }}
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="slide-up fixed inset-x-3 bottom-3 z-40 rounded-3xl bg-gold p-6 shadow-2xl sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[25rem]" role="dialog" aria-label="10% off offer">
      <button
        type="button"
        aria-label="Close offer"
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-night hover:bg-white/50"
        onClick={() => {
          remember("min");
          setMinimized(true);
        }}
      >
        <CloseIcon />
      </button>
      <p className="font-display text-3xl font-semibold leading-tight text-night">Get 10% off your first book</p>
      <p className="mt-1.5 text-night/80">Join our list and we&apos;ll give you a code right now.</p>
      <div className="mt-4">
        <SubscribeForm source="popup" onDone={() => remember("done")} />
      </div>
    </div>
  );
}
