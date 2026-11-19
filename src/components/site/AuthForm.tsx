"use client";

import { useActionState, useState } from "react";
import { authAction, type AuthState } from "@/app/actions";
import { GoogleButton } from "./GoogleButton";

export type Preset = { occasion?: string; relationship?: string; cover?: string; title?: string };

/** Sign-in / create-account form. `next="start"` starts a book (with `preset`) afterwards. */
export function AuthForm({ initialMode = "signup", next, preset, autoFocus = true }: { initialMode?: "signin" | "signup"; next: string; preset?: Preset; autoFocus?: boolean }) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  // Controlled so a failed attempt keeps what was typed (form actions reset uncontrolled inputs).
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, action, pending] = useActionState<AuthState, FormData>(authAction, null);

  return (
    <div>
      <GoogleButton next={next} preset={preset} />
      <div className="my-4 flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" />
        или по e-mail
        <span className="h-px flex-1 bg-line" />
      </div>
      <div role="tablist" aria-label="Аккаунт" className="grid grid-cols-2 rounded-lg bg-cream p-1 ring-1 ring-line">
        {(["signup", "signin"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-md py-2.5 text-sm font-bold transition ${mode === m ? "bg-white text-wine shadow" : "text-muted hover:text-wine"}`}
          >
            {m === "signup" ? "Регистрация" : "Вход"}
          </button>
        ))}
      </div>

      <form action={action} className="mt-5 space-y-3">
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="next" value={next} />
        {preset && Object.entries(preset).map(([k, v]) => v && <input key={k} type="hidden" name={k} value={v} />)}
        {mode === "signup" && (
          <label className="block">
            <span className="text-sm font-semibold">Имя <span className="font-normal text-muted">(необязательно)</span></span>
            <input name="name" autoComplete="given-name" maxLength={60} className="field mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        <label className="block">
          <span className="text-sm font-semibold">E-mail</span>
          <input name="email" type="email" required autoComplete="email" autoFocus={autoFocus} className="field mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Пароль</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            className="field mt-1"
          />
          {mode === "signup" && <span className="mt-1 block text-xs text-muted">Не меньше 8 символов.</span>}
        </label>
        {state?.error && (
          <p className="rounded-lg bg-blush px-3 py-2 text-sm font-medium text-wine" role="alert">
            {state.error}
          </p>
        )}
        <button type="submit" className="btn btn-primary w-full" disabled={pending}>
          {pending ? "Секунду…" : mode === "signup" ? (next === "start" ? "Зарегистрироваться и начать" : "Зарегистрироваться") : next === "start" ? "Войти и начать" : "Войти"}
        </button>
      </form>
    </div>
  );
}
