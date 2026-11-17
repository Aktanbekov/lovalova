import Link from "next/link";
import { AvatarSvg } from "@/components/avatar/Avatar";
import { BookMockup } from "@/components/book/BookMockup";
import { FlipBook } from "@/components/book/FlipBook";
import { Couple } from "@/components/book/scenes";
import { CreateButton } from "@/components/site/CreateButton";
import { ProductCard } from "@/components/site/ProductCard";
import { Shelf } from "@/components/site/Shelf";
import { BrushIcon, EyeIcon, LockIcon, TruckIcon } from "@/components/site/icons";
import { OCCASION_COLLECTIONS, RECIPIENT_COLLECTIONS, collectionHref } from "@/content/collections";
import { COVERS } from "@/lib/book/catalog";
import { COUPLES, demoBook } from "@/lib/demo";
import { FORMATS, FROM_PRICE, SHIPPING, money } from "@/lib/pricing";
import { FEATURED_PROMO } from "@/lib/promos";

const TRUST = [
  { icon: BrushIcon, title: "Designed by you", body: "Two characters that look like you both" },
  { icon: EyeIcon, title: "Free full preview", body: "See every page before you pay" },
  { icon: TruckIcon, title: `Ships in ${SHIPPING[0].minDays}–${SHIPPING[0].maxDays} days`, body: `Or ${SHIPPING[1].minDays}–${SHIPPING[1].maxDays} days with express` },
  { icon: LockIcon, title: "Secure checkout", body: "Payments handled by Stripe" },
];

const QUIZ_CHIPS = ["Your smile", "Your laugh", "Kind", "Funny", "Movie nights", "Stargazing"];

const FAQ = [
  { q: "How long does it take to make?", a: "Most people finish in about ten minutes. Your progress saves as you go." },
  { q: "Can I change the words?", a: "Yes — every page can be edited, reordered or removed, and you can add more from a library of 60+ pages, all for the same price." },
  { q: "Is this made with AI?", a: "No. Every scene and character part is original illustration, put together from your choices." },
  { q: "Do I need photos?", a: "No photos needed. You design both characters in the builder." },
];

export default function Home() {
  const hero = demoBook({ couple: 0, cover: "hearts", title: "Why I Love You" });
  const inside = demoBook({ couple: 0 });

  return (
    <>
      {/* ───────── Hero banner ───────── */}
      <section className="bg-cream sm:px-6 sm:pt-6">
        <div className="mx-auto grid max-w-7xl overflow-hidden bg-wine sm:rounded-[2rem] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-12 text-white sm:px-12 lg:py-20 lg:pl-16">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.16em]">
              <span className="h-2 w-2 rounded-full bg-gold" /> Personalized love books
            </p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] sm:text-6xl xl:text-7xl">
              Every reason you love them, in one book.
            </h1>
            <p className="mt-6 max-w-lg text-xl leading-relaxed text-white/90">
              Design cartoon versions of you both, answer five questions, and we&apos;ll turn your love story into an illustrated keepsake.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CreateButton className="btn btn-white btn-lg" />
              <Link href="#inside" className="text-lg font-bold underline decoration-gold decoration-2 underline-offset-[6px] hover:text-gold">
                Look inside
              </Link>
            </div>
            <p className="mt-6 text-white/80">
              From <strong className="text-white">{money(FROM_PRICE)}</strong> · Free to design &amp; preview · 16–60 pages
            </p>
          </div>

          <div className="relative min-h-[22rem] overflow-hidden bg-brand sm:min-h-[30rem]">
            <HeartsBackdrop />
            <div className="absolute left-[2%] top-[14%] w-[52%] -rotate-6">
              <BookMockup book={demoBook({ couple: 1, cover: "stars", title: "Reasons I Love You, {B}" })} tilt="left" />
            </div>
            <div className="absolute right-[1%] top-[10%] w-[50%] rotate-6">
              <BookMockup book={demoBook({ couple: 2, cover: "garden", title: "Happy Birthday, {B}" })} tilt="right" />
            </div>
            <div className="absolute bottom-[6%] left-1/2 w-[68%] -translate-x-1/2">
              <BookMockup book={hero} tilt="flat" />
            </div>
            <Stamp className="absolute bottom-[4%] right-[3%] w-[24%] max-w-36 sm:right-[5%]" />
          </div>
        </div>
      </section>

      {/* ───────── Trust strip ───────── */}
      <section className="bg-cream">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4">
          {TRUST.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-brand shadow-sm ring-1 ring-line">
                <Icon className="h-7 w-7" />
              </span>
              <span className="mt-3 sm:mt-0">
                <span className="block text-lg font-bold leading-tight text-ink">{title}</span>
                <span className="block text-muted">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Occasions shelf ───────── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Shelf eyebrow="Shop by occasion" title="What are you celebrating?">
            {OCCASION_COLLECTIONS.map((c, i) => (
              <ProductCard key={c.slug} c={c} couple={i} />
            ))}
          </Shelf>
        </div>
      </section>

      {/* ───────── Recipients ───────── */}
      <section className="bg-blush py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-brand">Shop by recipient</p>
          <h2 className="mt-1 text-center font-display text-4xl font-semibold text-ink sm:text-5xl">Who&apos;s the lucky one?</h2>
          <ul className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6">
            {RECIPIENT_COLLECTIONS.map((c, i) => {
              const couple = COUPLES[i % COUPLES.length];
              return (
                <li key={c.slug}>
                  <Link href={collectionHref(c)} className="group flex flex-col items-center text-center">
                    <span className={`grid aspect-square w-full max-w-36 place-items-center overflow-hidden rounded-full ring-4 ring-white transition group-hover:scale-105 ${c.tone}`}>
                      <AvatarSvg traits={i % 2 ? couple.A : couple.B} crop="head" className="mt-[8%] h-full w-[80%]" />
                    </span>
                    <span className="mt-3 text-lg font-bold text-ink group-hover:text-wine">{c.menuLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section id="how" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-brand">How it works</p>
          <h2 className="mt-1 text-center font-display text-4xl font-semibold text-ink sm:text-5xl">Ready in about ten minutes</h2>
          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            <Step n={1} title="Create the two of you" body="Skin tone, hair, eyes, glasses, outfits — until the cartoons look just like you." tone="bg-sky">
              <svg viewBox="230 190 390 330" className="h-full w-full" role="img" aria-label="Two illustrated characters holding hands">
                <Couple A={COUPLES[3].A} B={COUPLES[3].B} poses={["reachRight", "reachLeft"]} />
              </svg>
            </Step>
            <Step n={2} title="Answer five questions" body="What you adore about them, what you love doing together. We write the pages." tone="bg-peach">
              <div className="flex h-full flex-wrap content-center justify-center gap-2 p-4">
                {QUIZ_CHIPS.map((x, i) => (
                  <span key={x} className={`rounded-full px-4 py-2 font-semibold shadow-sm ${i % 3 === 0 ? "bg-brand text-white" : "bg-white text-ink"}`}>
                    {x}
                  </span>
                ))}
              </div>
            </Step>
            <Step n={3} title="Preview, tweak & order" body="Flip through every page, change any words, then we print and ship it." tone="bg-mint">
              <div className="grid h-full place-items-center px-16 pb-2 pt-12">
                <BookMockup book={demoBook({ couple: 4, cover: "city", title: "{A} & {B}" })} tilt="right" className="w-full" />
              </div>
            </Step>
          </ol>
          <div className="mt-12 flex justify-center">
            <CreateButton className="btn btn-primary btn-lg" label="Start your book" />
          </div>
        </div>
      </section>

      {/* ───────── Inside ───────── */}
      <section id="inside" className="scroll-mt-24 bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Look inside</p>
            <h2 className="mt-1 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">Every page is about the two of you</h2>
            <p className="mt-5 text-lg text-muted">Your answers decide which pages go in. Then it&apos;s yours to edit, word for word.</p>
            <ul className="mt-6 space-y-3 text-lg">
              {["A dedication in your own words", "Pages for their smile, their laugh, their hugs…", "Your favourite things to do together", "A page for the occasion", "60+ extra pages to add"].map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white" aria-hidden="true">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-white p-4 shadow-xl ring-1 ring-line sm:p-6">
            <FlipBook book={inside} pages={inside.pages} compact />
            <p className="mt-1 text-center text-sm text-muted">A sample book for Sam, from Alex. Use the arrows to turn the pages.</p>
          </div>
        </div>
      </section>

      {/* ───────── Cover gallery ───────── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Book designs</p>
              <h2 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">Pick a cover you love</h2>
            </div>
            <Link href="/books" className="btn btn-secondary">See all designs</Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {COVERS.map((c, i) => (
              <li key={c.id}>
                <Link href={`/books#${c.id}`} className="group block">
                  <div className="rounded-3xl bg-cream px-[8%] pb-2 pt-[10%] transition group-hover:bg-blush">
                    <BookMockup book={demoBook({ couple: i + 1, cover: c.id, title: ["Why I Love You", "{A} & {B}", "Our Love Story", "You & Me"][i % 4] })} tilt="flat" />
                  </div>
                  <p className="mt-3 text-lg font-bold text-ink group-hover:text-wine">{c.label}</p>
                  <p className="text-muted">From {money(FROM_PRICE)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Promo band ───────── */}
      <section className="bg-gold">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 text-center sm:px-6 lg:flex-row lg:text-left">
          <div>
            <p className="font-display text-4xl font-semibold text-night sm:text-5xl">{FEATURED_PROMO.percentOff}% off every book</p>
            <p className="mt-2 text-lg text-night/80">
              Use code <strong className="rounded-md bg-night px-2 py-0.5 font-extrabold tracking-wider text-gold">{FEATURED_PROMO.code}</strong> in your cart.
            </p>
          </div>
          <CreateButton className="btn btn-lg bg-night text-white hover:bg-ink" label="Create yours now" />
        </div>
      </section>

      {/* ───────── Formats ───────── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-brand">Formats</p>
          <h2 className="mt-1 text-center font-display text-4xl font-semibold text-ink sm:text-5xl">One price for any length</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-lg text-muted">16 to 60 pages, 8.5 × 5.5 in landscape. Add a digital copy, matte finish or gift box at checkout.</p>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {(Object.keys(FORMATS) as (keyof typeof FORMATS)[]).map((f, i) => (
              <div key={f} className={`relative rounded-3xl p-6 ring-1 ring-line ${f === "hardcover" ? "bg-blush" : "bg-cream"}`}>
                {f === "hardcover" && <span className="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Keepsake</span>}
                <div className="mx-auto w-[70%] pt-4">
                  <BookMockup book={demoBook({ couple: 5 - i, cover: i ? "bigheart" : "beach", title: "You & Me" })} soft={f === "softcover"} tilt={i ? "right" : "left"} />
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold text-ink">{FORMATS[f].label}</h3>
                <p className="mt-1 text-muted">{FORMATS[f].blurb}</p>
                <p className="mt-3 font-display text-4xl font-semibold text-wine">{money(FORMATS[f].cents)}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/pricing" className="font-bold text-wine underline underline-offset-4">Full pricing &amp; shipping →</Link>
          </p>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-display text-4xl font-semibold text-ink sm:text-5xl">Questions?</h2>
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
          <p className="mt-6 text-center">
            <Link href="/pricing#faq" className="font-bold text-wine underline underline-offset-4">More answers →</Link>
          </p>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="sm:px-6 sm:py-16">
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 overflow-hidden bg-night px-6 py-14 text-white sm:rounded-[2rem] sm:px-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative z-10">
            <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">Make something they&apos;ll keep forever.</h2>
            <p className="mt-4 max-w-lg text-lg text-white/85">It takes about ten minutes, and you can preview every page before you pay.</p>
            <div className="mt-8">
              <CreateButton className="btn btn-lg bg-brand text-white hover:bg-brand-dark" />
            </div>
          </div>
          <div className="relative mx-auto w-[85%] max-w-md">
            <BookMockup book={demoBook({ couple: 5, cover: "city", title: "Our Love Story" })} tilt="right" />
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ n, title, body, tone, children }: { n: number; title: string; body: string; tone: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line">
      <div className={`relative h-56 ${tone}`}>
        <span className="absolute left-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-brand font-display text-xl font-bold text-white shadow">{n}</span>
        {children}
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-lg text-muted">{body}</p>
      </div>
    </li>
  );
}

function HeartsBackdrop() {
  const hearts = [
    [8, 12, 0.9, -15], [30, 6, 0.5, 10], [55, 16, 0.7, 20], [86, 8, 1.1, -10], [92, 46, 0.6, 15],
    [4, 56, 0.6, 12], [22, 88, 1, -8], [70, 90, 0.7, 18], [48, 54, 0.45, -20], [78, 64, 0.5, 6],
  ] as const;
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="hero-glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#ff6f91" />
          <stop offset="100%" stopColor="#e11d58" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#hero-glow)" />
      {hearts.map(([x, y, s, r], i) => (
        <path
          key={i}
          transform={`translate(${x} ${y}) rotate(${r}) scale(${s * 7})`}
          d="M0 0.35 C-0.15 0.2 -1 -0.25 -0.55 -0.7 C-0.25 -0.95 0 -0.65 0 -0.45 C0 -0.65 0.25 -0.95 0.55 -0.7 C1 -0.25 0.15 0.2 0 0.35 Z"
          fill={i % 3 === 0 ? "#ffc93c" : "#ffffff"}
          opacity={i % 3 === 0 ? 0.55 : 0.18}
        />
      ))}
    </svg>
  );
}

/** Round badge: "designed by you · printed for them". */
function Stamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Designed by you, printed for them">
      <circle cx="60" cy="60" r="57" fill="#ffc93c" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="#2a1240" strokeWidth="1.5" strokeDasharray="3 3" />
      <defs>
        <path id="stamp-ring" d="M60 60 m-41 0 a41 41 0 1 1 82 0 a41 41 0 1 1 -82 0" />
      </defs>
      <text fontSize="9.6" fontWeight="800" letterSpacing="1.5" fill="#2a1240" fontFamily="var(--font-dm-sans), sans-serif">
        <textPath href="#stamp-ring" textLength="252" lengthAdjust="spacing">DESIGNED BY YOU • MADE FOR THEM •</textPath>
      </text>
      <path transform="translate(60 66) scale(19)" d="M0 0.35 C-0.15 0.2 -1 -0.25 -0.55 -0.7 C-0.25 -0.95 0 -0.65 0 -0.45 C0 -0.65 0.25 -0.95 0.55 -0.7 C1 -0.25 0.15 0.2 0 0.35 Z" fill="#e11d58" />
    </svg>
  );
}
