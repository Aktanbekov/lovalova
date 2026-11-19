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
          {busy ? "Открываем оплату…" : "Перейти к оплате"}
        </button>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-gold bg-gold/10 p-4 text-sm">
          <p className="font-semibold text-plum">Stripe ещё не подключён (режим разработки)</p>
          <p className="mt-1 text-muted">
            Добавьте <strong>тестовые</strong> ключи Stripe в <code>.env.local</code>, чтобы проверить настоящую оплату. А пока можно
            изобразить оплаченный заказ и проверить PDF.
          </p>
          <button type="button" className="btn btn-primary mt-3 w-full" onClick={fakePay} disabled={busy}>
            {busy ? "Оформляем тестовый заказ…" : "Тестовая оплата"}
          </button>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-rose-dark" role="alert">{error}</p>}
    </div>
  );
}
