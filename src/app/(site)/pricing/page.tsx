import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { demoBook } from "@/lib/demo";
import { FORMATS, SHIPPING, UPGRADES, money, type UpgradeId } from "@/lib/pricing";
import { FEATURED_PROMO } from "@/lib/promos";

export const metadata = { title: "Pricing & shipping" };

const FAQ = [
  { q: "How long does it take to make?", a: "Most people finish in about ten minutes. Your progress saves as you go — sign in to pick it up on any device." },
  { q: "Can I change the words?", a: "Yes. Every page can be edited, reordered or removed, and you can add extra pages from our library of 60+ — all for the same price." },
  { q: "Is this made with AI?", a: "No. Every scene and character part is original illustration, assembled from your choices. Nothing is generated from photos." },
  { q: "Do you need a photo?", a: "No photos needed. You design both characters yourself in the builder." },
  { q: "How big is the book?", a: "A cosy 8.5 × 5.5 inch landscape book, between 16 and 60 pages depending on how many you keep." },
  { q: "When will it arrive?", a: `We print on demand, then ship. ${SHIPPING.map((s) => `${s.label}: ${s.minDays}–${s.maxDays} business days`).join(". ")}.` },
  { q: "How do discount codes work?", a: `Enter the code in your cart before checkout. Codes take a percentage off the book and extras; shipping isn't discounted. Right now ${FEATURED_PROMO.code} takes ${FEATURED_PROMO.percentOff}% off.` },
  { q: "Do I need an account?", a: "No — you can make and buy a book as a guest. An account lets you find your books and orders again on any device." },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-wine text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <h1 className="font-display text-5xl font-semibold sm:text-6xl">Pricing &amp; shipping</h1>
          <p className="mx-auto mt-4 max-w-xl text-xl text-white/85">One price for any length. No subscriptions, no surprises at checkout.</p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6">
          {(Object.keys(FORMATS) as (keyof typeof FORMATS)[]).map((f, i) => (
            <div key={f} className={`rounded-3xl p-7 ring-1 ring-line ${f === "hardcover" ? "bg-blush" : "bg-cream"}`}>
              <div className="mx-auto w-[66%]">
                <BookMockup book={demoBook({ couple: i + 2, cover: i ? "sunrise" : "garden", title: "Our Love Story" })} soft={f === "softcover"} tilt={i ? "right" : "left"} />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold text-ink">{FORMATS[f].label}</h2>
              <p className="mt-1 text-lg text-muted">{FORMATS[f].blurb}</p>
              <p className="mt-3 font-display text-5xl font-semibold text-wine">{money(FORMATS[f].cents)}</p>
              <p className="mt-1 text-sm text-muted">8.5 × 5.5 in · 16–60 pages</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 ring-1 ring-line">
            <h2 className="font-display text-2xl font-semibold text-ink">Extras</h2>
            <ul className="mt-4 divide-y divide-line">
              {(Object.keys(UPGRADES) as UpgradeId[]).map((u) => (
                <li key={u} className="flex justify-between gap-4 py-3">
                  <span>
                    <span className="block font-semibold">{UPGRADES[u].label}</span>
                    <span className="text-sm text-muted">{UPGRADES[u].blurb}</span>
                  </span>
                  <span className="font-bold">+{money(UPGRADES[u].cents)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-7 ring-1 ring-line">
            <h2 className="font-display text-2xl font-semibold text-ink">Shipping</h2>
            <ul className="mt-4 divide-y divide-line">
              {SHIPPING.map((s) => (
                <li key={s.id} className="flex justify-between gap-4 py-3">
                  <span>
                    <span className="block font-semibold">{s.label}</span>
                    <span className="text-sm text-muted">{s.minDays}–{s.maxDays} business days after printing</span>
                  </span>
                  <span className="font-bold">{money(s.cents)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">We ship to the US, Canada, UK, Ireland, Australia, New Zealand, Germany, France and the Netherlands.</p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <CreateButton className="btn btn-primary btn-lg" />
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-display text-4xl font-semibold text-ink sm:text-5xl">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-line rounded-3xl bg-white px-6 ring-1 ring-line">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ink">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blush text-xl text-wine transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-2 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
