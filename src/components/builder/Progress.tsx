"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STEPS, stepHref } from "@/lib/book/steps";

export function Progress({ bookId, assembled, previewed }: { bookId: string; assembled: boolean; previewed: boolean }) {
  const path = usePathname();
  const current = STEPS.findIndex((s) => path.endsWith(`/${s.slug}`));
  const reachable = (i: number) => i <= 3 || (assembled && (i <= 5 || previewed));
  return (
    <nav aria-label="Шаги создания книги" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <ol className="flex gap-1.5">
        {STEPS.map((s, i) => {
          const state = i === current ? "current" : i < current ? "done" : "todo";
          const inner = (
            <>
              <span className={`block h-1.5 rounded-full ${state === "todo" ? "bg-line" : "bg-plum"} ${state === "current" ? "opacity-100" : state === "done" ? "opacity-60" : ""}`} />
              <span className={`mt-2 hidden text-xs font-medium sm:block ${state === "current" ? "text-plum" : "text-muted"}`}>
                {i + 1}. {s.label}
              </span>
            </>
          );
          return (
            <li key={s.slug} className="flex-1" aria-current={state === "current" ? "step" : undefined}>
              {reachable(i) && i !== current ? (
                <Link href={stepHref(bookId, s.slug)} aria-label={`Шаг ${i + 1}: ${s.label}`} className="block hover:opacity-80">{inner}</Link>
              ) : (
                <div>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-sm text-muted sm:hidden">
        Шаг {current + 1} из {STEPS.length}: <span className="font-medium text-plum">{STEPS[current]?.label}</span>
      </p>
    </nav>
  );
}
