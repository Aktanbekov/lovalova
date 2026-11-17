"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { applyPromoAction } from "@/app/actions";

export function PromoForm({ bookId, applied }: { bookId: string; applied: { code: string; label: string } | null }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(next: string | null) {
    setBusy(true);
    setError(null);
    const res = await applyPromoAction(bookId, next);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setCode("");
    router.refresh();
  }

  if (applied) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl bg-mint px-3 py-2.5 text-sm">
        <span>
          <strong className="tracking-wider">{applied.code}</strong> applied — {applied.label}
        </span>
        <button type="button" className="font-semibold text-wine underline" onClick={() => submit(null)} disabled={busy}>
          Remove
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (code.trim()) submit(code);
      }}
    >
      <label htmlFor="promo" className="text-sm font-semibold">
        Discount code
      </label>
      <div className="mt-1 flex gap-2">
        <input id="promo" value={code} onChange={(e) => setCode(e.target.value)} className="field min-w-0 flex-1 uppercase" placeholder="e.g. LOVE15" autoComplete="off" />
        <button type="submit" className="btn btn-secondary shrink-0 !px-4" disabled={busy || !code.trim()}>
          {busy ? "…" : "Apply"}
        </button>
      </div>
      {error && <p className="mt-1.5 text-sm font-medium text-rose-dark" role="alert">{error}</p>}
    </form>
  );
}
