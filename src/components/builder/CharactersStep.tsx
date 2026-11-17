"use client";

import { useState } from "react";
import { AvatarSvg } from "@/components/avatar/Avatar";
import { Couple } from "@/components/book/scenes";
import { TRAIT_GROUPS, randomTraits, type Traits } from "@/lib/avatar/options";
import { LIMITS, type Character } from "@/lib/book/schema";
import { stepHref } from "@/lib/book/steps";
import { useAutosave } from "./useAutosave";
import { StepFooter } from "./StepFooter";

const WHO = ["You", "Your partner"] as const;

export function CharactersStep({ bookId, initial }: { bookId: string; initial: [Character, Character] }) {
  const [chars, setChars] = useState<[Character, Character]>(initial);
  const [who, setWho] = useState<0 | 1>(0);
  const [group, setGroup] = useState<(typeof TRAIT_GROUPS)[number]["key"]>("skin");
  const { status, error, saveNow } = useAutosave(bookId, { characters: chars });

  const c = chars[who];
  const update = (next: Partial<Character>) =>
    setChars((prev) => {
      const copy = [...prev] as [Character, Character];
      copy[who] = { ...copy[who], ...next };
      return copy;
    });
  const setTrait = <K extends keyof Traits>(k: K, v: Traits[K]) => update({ traits: { ...c.traits, [k]: v } });

  const active = TRAIT_GROUPS.find((g) => g.key === group)!;
  const bothNamed = chars[0].name.trim() && chars[1].name.trim();

  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <section className="min-w-0">
          <h1 className="font-display text-3xl font-semibold text-plum sm:text-4xl">Create the two of you</h1>
          <p className="mt-2 text-muted">Design a cartoon version of yourself and your partner. They&apos;ll star on every page.</p>

          <div className="card mt-6 overflow-hidden">
            <svg viewBox="230 190 390 330" className="block max-h-[34vh] w-full bg-blush/60 lg:max-h-none" role="img" aria-label="Preview of both characters">
              <Couple A={chars[0].traits} B={chars[1].traits} poses={["reachRight", "reachLeft"]} />
            </svg>
            <div className="grid grid-cols-2 border-t border-line text-center text-sm">
              {chars.map((ch, i) => (
                <div key={i} className={`py-2 ${i === 0 ? "border-r border-line" : ""}`}>
                  <span className="text-muted">{WHO[i]}: </span>
                  <span className="font-semibold text-plum">{ch.name.trim() || "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="min-w-0 lg:pt-2">
          <div role="tablist" aria-label="Choose character" className="grid grid-cols-2 gap-2 rounded-full bg-paper p-1 ring-1 ring-line">
            {WHO.map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={who === i}
                onClick={() => setWho(i as 0 | 1)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${who === i ? "bg-plum text-white" : "text-muted hover:text-plum"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-end gap-3">
            <label className="flex-1">
              <span className="text-sm font-medium">{who === 0 ? "Your name" : "Their name"}</span>
              <input
                className="field mt-1"
                value={c.name}
                maxLength={LIMITS.name}
                placeholder={who === 0 ? "e.g. Alex" : "e.g. Sam"}
                onChange={(e) => update({ name: e.target.value })}
              />
            </label>
            <button type="button" className="btn btn-secondary !px-4 !py-[0.7rem] text-sm" onClick={() => update({ traits: randomTraits() })}>
              Shuffle look
            </button>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Appearance">
            {TRAIT_GROUPS.map((g) => (
              <button
                key={g.key}
                role="tab"
                aria-selected={group === g.key}
                onClick={() => setGroup(g.key)}
                className="chip shrink-0 !px-3.5 !py-1.5 text-sm"
              >
                {g.label}
              </button>
            ))}
          </div>

          <div className="card mt-3 p-4">
            {active.kind === "swatch" ? (
              <div className="flex flex-wrap gap-3">
                {(active.options as readonly { id: string; hex: string }[]).map((o) => {
                  const selected = c.traits[active.key as keyof Traits] === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-label={o.id}
                      aria-pressed={selected}
                      onClick={() => setTrait(active.key as keyof Traits, o.id as never)}
                      className={`h-11 w-11 rounded-full border-2 transition ${selected ? "scale-110 border-plum ring-4 ring-plum/15" : "border-white shadow ring-1 ring-line"}`}
                      style={{ background: o.hex }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {(active.options as readonly { id: string; label: string }[]).map((o) => {
                  const selected = c.traits[active.key as keyof Traits] === o.id;
                  const t = { ...c.traits, [active.key]: o.id } as Traits;
                  const body = active.key === "outfit";
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setTrait(active.key as keyof Traits, o.id as never)}
                      className={`rounded-xl border-2 bg-white p-1.5 text-xs font-medium transition ${selected ? "border-plum" : "border-transparent ring-1 ring-line hover:ring-plum/40"}`}
                    >
                      <AvatarSvg traits={t} crop={body ? "full" : "head"} className={`mx-auto ${body ? "h-24" : "h-16"} w-full`} title={o.label} />
                      <span className="mt-1 block truncate">{o.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {active.key === "skin" && (
              <label className="mt-4 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={c.traits.blush} onChange={(e) => setTrait("blush", e.target.checked)} className="h-4 w-4 accent-plum" />
                Rosy cheeks
              </label>
            )}
          </div>
        </section>
      </div>

      <StepFooter
        nextHref={stepHref(bookId, "occasion")}
        canContinue={Boolean(bothNamed)}
        hint="Add both names to continue"
        status={status}
        error={error}
        beforeNext={saveNow}
      />
    </>
  );
}
