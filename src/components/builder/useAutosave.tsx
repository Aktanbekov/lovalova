"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { saveBookAction } from "@/app/actions";
import type { BookPatch } from "@/lib/book/schema";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

/** Debounced autosave of a patch. `saveNow` flushes before navigating. */
export function useAutosave(bookId: string, patch: BookPatch, delay = 600) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const serialized = JSON.stringify(patch);
  const last = useRef(serialized);
  const latest = useRef(patch);
  useLayoutEffect(() => {
    latest.current = patch;
  });

  const run = useCallback(async () => {
    const body = JSON.stringify(latest.current);
    if (body === last.current) return true;
    setStatus("saving");
    const res = await saveBookAction(bookId, latest.current);
    if (res.ok) {
      last.current = body;
      setStatus("saved");
      setError(null);
      return true;
    }
    setStatus("error");
    setError(res.error);
    return false;
  }, [bookId]);

  useEffect(() => {
    if (serialized === last.current) return;
    const t = setTimeout(run, delay);
    return () => clearTimeout(t);
  }, [serialized, run, delay]);

  return { status, error, saveNow: run };
}

export function SaveIndicator({ status }: { status: SaveStatus }) {
  const text = status === "saving" ? "Сохраняем…" : status === "saved" ? "Сохранено" : status === "error" ? "Не сохранено" : "";
  return (
    <span aria-live="polite" className={`text-xs ${status === "error" ? "text-rose-dark" : "text-muted"}`}>
      {text}
    </span>
  );
}
