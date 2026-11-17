"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface PromoMessage {
  text: string;
  code?: string;
  href?: string;
  linkLabel?: string;
}

/** Announcement bar: rotates messages; tap the code chip to copy it. */
export function PromoBar({ messages }: { messages: PromoMessage[] }) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (messages.length < 2 || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % messages.length), 5500);
    return () => clearInterval(t);
  }, [messages.length, paused]);

  const m = messages[i];
  const copy = async () => {
    if (!m.code) return;
    try {
      await navigator.clipboard.writeText(m.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the code is still visible */
    }
  };

  return (
    <div
      className="bg-night text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-center gap-3 px-4 py-1.5 text-center text-[0.95rem] sm:px-6" aria-live="polite">
        <p key={i} className="promo-in flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="font-medium">{m.text}</span>
          {m.code && (
            <button
              type="button"
              onClick={copy}
              className="rounded-md bg-gold px-2.5 py-0.5 font-extrabold tracking-wider text-night shadow-sm transition hover:brightness-105"
              aria-label={`Copy code ${m.code}`}
            >
              {copied ? "Copied!" : m.code}
            </button>
          )}
          {m.href && (
            <Link href={m.href} className="font-semibold underline underline-offset-4">
              {m.linkLabel ?? "Learn more"}
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}
