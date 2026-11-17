"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { checkoutAction, simulatePaymentAction } from "@/app/actions";

export function CheckoutButton({ bookId }: { bookId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [simulate, setSimulate] = useState<string | null>(null);

  async function checkout() {
    setBusy(true);
    setError(null);
    const res = await checkoutAction(bookId);
    if (!res.ok) {
      setError(res.error);
      setBusy(false);
    } else if (res.url) {
      window.location.assign(res.url);
    } else if (res.simulate) {
      setSimulate(res.simulate);
      setBusy(false);
    }
  }

  async function fakePay() {
    if (!simulate) return;
    setBusy(true);
    const res = await simulatePaymentAction(simulate);
    if (res.ok) router.push(`/checkout/success?order=${simulate}`);
    else {
      setError(res.error);
      setBusy(false);
    }
  }

  return (
    <div>
      {!simulate ? (
        <button type="button" className="btn btn-primary w-full !py-3.5 text-base" onClick={checkout} disabled={busy}>
          {busy ? "Opening secure checkout…" : "Checkout securely"}
        </button>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-gold bg-gold/10 p-4 text-sm">
          <p className="font-semibold text-plum">Stripe isn&apos;t configured yet (development mode)</p>
          <p className="mt-1 text-muted">
            Add your Stripe <strong>test</strong> keys to <code>.env.local</code> to use real test checkout. For now you can simulate a paid order to
            test fulfilment and the PDF.
          </p>
          <button type="button" className="btn btn-primary mt-3 w-full" onClick={fakePay} disabled={busy}>
            {busy ? "Placing test order…" : "Simulate test payment"}
          </button>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-rose-dark" role="alert">{error}</p>}
    </div>
  );
}
