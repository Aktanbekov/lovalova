"use client";

import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "./icons";

/** Horizontal, swipeable row of cards with prev/next arrows. */
export function Shelf({ title, eyebrow, children, cols = "auto-cols-[80%] sm:auto-cols-[46%] lg:auto-cols-[calc((100%-3*1.25rem)/4)]" }: { title: string; eyebrow?: string; children: ReactNode; cols?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.9, behavior: "smooth" });
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>}
          <h2 className="mt-1 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{title}</h2>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button type="button" aria-label="Scroll back" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink/15 text-ink transition hover:border-brand hover:text-brand">
            <ArrowLeft />
          </button>
          <button type="button" aria-label="Scroll forward" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink/15 text-ink transition hover:border-brand hover:text-brand">
            <ArrowRight />
          </button>
        </div>
      </div>
      <div ref={ref} className={`shelf mt-8 gap-5 pb-2 ${cols}`}>
        {children}
      </div>
    </div>
  );
}
