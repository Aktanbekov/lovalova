"use client";

import { useActionState, useState } from "react";
import { subscribeAction, type SubscribeState } from "@/app/actions";

/** Email sign-up that reveals the welcome code. */
export function SubscribeForm({ source, dark = false, onDone }: { source: string; dark?: boolean; onDone?: () => void }) {
  const [state, action, pending] = useActionState<SubscribeState, FormData>(async (prev, form) => {
    const res = await subscribeAction(prev, form);
    if (res?.ok) onDone?.();
    return res;
  }, null);
  const [copied, setCopied] = useState(false);

  if (state?.ok) {
    return (
      <div className={dark ? "text-white" : "text-ink"}>
        <p className="font-semibold">Готово! Ваш код:</p>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(state.code);
              setCopied(true);
            } catch {}
          }}
          className="mt-2 inline-flex items-center gap-3 rounded-lg border-2 border-dashed border-night/30 bg-gold px-4 py-2 font-extrabold tracking-widest text-night"
        >
          {state.code}
          <span className="text-xs font-semibold tracking-normal">{copied ? "Скопировано" : "Нажмите, чтобы скопировать"}</span>
        </button>
        <p className={`mt-2 text-sm ${dark ? "text-white/80" : "text-muted"}`}>Введите его в корзине и получите скидку 10% на книгу.</p>
      </div>
    );
  }

  return (
    <form action={action}>
      <input type="hidden" name="source" value={source} />
      <div className="flex gap-2">
        <label className="sr-only" htmlFor={`sub-${source}`}>
          Электронная почта
        </label>
        <input
          id={`sub-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Ваш e-mail"
          className={`field min-w-0 flex-1 ${dark ? "!border-white/30 !bg-white/10 text-white placeholder:text-white/60" : ""}`}
        />
        <button type="submit" className={`btn shrink-0 !px-5 ${dark ? "bg-gold text-night hover:brightness-105" : "bg-night text-white hover:bg-ink"}`} disabled={pending}>
          {pending ? "…" : "Получить код"}
        </button>
      </div>
      {state && !state.ok && <p className="mt-2 text-sm font-medium text-gold" role="alert">{state.error}</p>}
      <p className={`mt-2 text-xs ${dark ? "text-white/60" : "text-muted"}`}>Иногда пишем о скидках и новых обложках. Отписаться можно в любой момент.</p>
    </form>
  );
}
