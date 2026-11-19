"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SaveIndicator, type SaveStatus } from "./useAutosave";

export function StepFooter({
  backHref,
  nextHref,
  nextLabel = "Дальше",
  canContinue = true,
  hint,
  status,
  error,
  beforeNext,
}: {
  backHref?: string;
  nextHref?: string;
  nextLabel?: string;
  canContinue?: boolean;
  hint?: string;
  status?: SaveStatus;
  error?: string | null;
  /** Runs before navigating; return false to stay. */
  beforeNext?: () => Promise<boolean>;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function go() {
    setBusy(true);
    const ok = beforeNext ? await beforeNext() : true;
    if (ok && nextHref) router.push(nextHref);
    else setBusy(false);
  }
  return (
    <div className="sticky bottom-0 z-20 mt-10 border-t border-line bg-white/95 backdrop-blur" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {backHref && (
            <Link href={backHref} className="btn btn-secondary !px-4 !py-2.5 text-sm" aria-label="Назад">
              ←<span className="hidden sm:inline"> Назад</span>
            </Link>
          )}
          {status && <SaveIndicator status={status} />}
        </div>
        <div className="flex flex-1 items-center justify-end gap-3 text-right sm:flex-none">
          {(error || (!canContinue && hint)) && <span className="hidden text-sm text-muted sm:inline">{error ?? hint}</span>}
          <button type="button" className="btn btn-primary w-full !py-3 sm:w-auto sm:!py-2.5" disabled={!canContinue || busy} onClick={go}>
            {busy ? "Секунду…" : nextLabel}
          </button>
        </div>
      </div>
      {(error || (!canContinue && hint)) && <p className="px-4 pb-2 text-center text-sm text-muted sm:hidden">{error ?? hint}</p>}
    </div>
  );
}
