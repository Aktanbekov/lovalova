"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { startBookAction } from "@/app/actions";
import { AuthForm, type Preset } from "./AuthForm";
import { CloseIcon } from "./icons";

function PresetFields({ preset }: { preset?: Preset }) {
  return <>{preset && Object.entries(preset).map(([k, v]) => v && <input key={k} type="hidden" name={k} value={v} />)}</>;
}

/**
 * "Создать книгу". Signed-in shoppers go straight to the builder. Guests
 * first see a prompt to save their book to an account, or carry on as a guest.
 */
export function StartBookButton({ signedIn, label, className, preset }: { signedIn: boolean; label: string; className: string; preset?: Preset }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (signedIn) {
    return (
      <form action={startBookAction}>
        <PresetFields preset={preset} />
        <button type="submit" className={className}>
          {label}
        </button>
      </form>
    );
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-night/55 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="start-title" onClick={() => setOpen(false)}>
          <div className="slide-up relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-6 text-left text-ink shadow-2xl sm:rounded-2xl sm:p-8" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Закрыть" onClick={() => setOpen(false)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full hover:bg-blush">
              <CloseIcon />
            </button>
            <h2 id="start-title" className="mt-2 font-display text-3xl font-semibold leading-tight text-wine">
              Сохраняйте книгу по ходу работы
            </h2>
            <p className="mt-2 text-muted">С аккаунтом можно продолжить с любого телефона и всегда найти свои заказы.</p>
            <div className="mt-6">
              <AuthForm next="start" preset={preset} autoFocus={false} />
            </div>
            <div className="my-5 flex items-center gap-3 text-sm text-muted">
              <span className="h-px flex-1 bg-line" />
              или
              <span className="h-px flex-1 bg-line" />
            </div>
            <form action={startBookAction}>
              <PresetFields preset={preset} />
              <button type="submit" className="btn btn-secondary w-full">
                Продолжить без регистрации
              </button>
            </form>
            <p className="mt-3 text-center text-xs text-muted">Без аккаунта книга сохранится в этом браузере. Зарегистрироваться можно позже.</p>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
