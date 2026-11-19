"use client";

import { useState } from "react";

/** One fixed announcement line; tap the code to copy it. */
export function PromoBar({ text, code }: { text: string; code?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the code is still visible */
    }
  };

  return (
    <div className="bg-night text-white">
      <p className="mx-auto flex min-h-10 max-w-7xl items-center justify-center gap-2.5 px-4 py-1.5 text-center text-sm sm:px-6 sm:text-[0.95rem]">
        <span className="font-medium">{text}</span>
        {code && (
          <button
            type="button"
            onClick={copy}
            className="min-h-8 rounded-md bg-gold px-2.5 font-extrabold tracking-wider text-night transition hover:brightness-105"
            aria-label={`Скопировать код ${code}`}
          >
            {copied ? "Скопировано" : code}
          </button>
        )}
      </p>
    </div>
  );
}
