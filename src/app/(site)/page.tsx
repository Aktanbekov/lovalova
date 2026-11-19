import Link from "next/link";
import { AvatarSvg } from "@/components/avatar/Avatar";
import { BookMockup } from "@/components/book/BookMockup";
import { FlipBook } from "@/components/book/FlipBook";
import { Couple } from "@/components/book/scenes";
import { CreateButton } from "@/components/site/CreateButton";
import { ProductCard } from "@/components/site/ProductCard";
import { OCCASION_COLLECTIONS, RECIPIENT_COLLECTIONS, collectionHref } from "@/content/collections";
import { COVERS } from "@/lib/book/catalog";
import { COUPLES, demoBook } from "@/lib/demo";
import { FORMATS, FROM_PRICE, SHIPPING, money } from "@/lib/pricing";
import { FEATURED_PROMO } from "@/lib/promos";

const QUIZ_CHIPS = ["Улыбка", "Смех", "Доброта", "Юмор", "Кофе вдвоём", "Горы"];

const FAQ = [
  { q: "Сколько времени занимает?", a: "Обычно около десяти минут с телефона. Всё сохраняется по ходу, можно закрыть и вернуться." },
  { q: "Можно поменять текст?", a: "Да. Любую страницу можно переписать, переставить или убрать, а ещё добавить страницы из библиотеки. Цена не меняется." },
  { q: "Это делает ИИ?", a: "Нет. Все сцены и детали героев нарисованы художниками, а книга собирается из ваших ответов." },
  { q: "Нужны фотографии?", a: "Нет. Героев вы собираете сами в конструкторе: кожа, причёска, глаза, одежда." },
];

const HOME_OCCASIONS = OCCASION_COLLECTIONS.slice(0, 8);

/** A face for each recipient circle that matches who receives the book. */
const RECIPIENT_FACES: Record<string, (typeof COUPLES)[number]["A"]> = {
  girlfriend: COUPLES[0].B,
  boyfriend: COUPLES[1].A,
  wife: COUPLES[2].B,
  husband: COUPLES[5].B,
  partner: COUPLES[2].A,
  fiance: COUPLES[5].A,
};

export default function Home() {
  const inside = demoBook({ couple: 0 });

  return (
    <>
      {/* ───────── Hero: the book leads; on a phone it comes first ───────── */}
      <section className="bg-cream sm:px-6 sm:pt-6">
        <div className="mx-auto grid max-w-7xl overflow-hidden bg-wine sm:rounded-2xl lg:grid-cols-[0.92fr_1.08fr] xl:grid-cols-[0.85fr_1.15fr]">
          <div className="relative z-10 order-2 flex flex-col justify-center px-5 pb-8 pt-6 text-white sm:px-10 lg:order-1 lg:py-14 lg:pl-14">
            <h1 className="enter font-display text-[2.1rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[2.9rem] xl:text-[3.4rem]">Книга о вашей любви, где главные герои вы двое</h1>
            <p className="enter enter-2 mt-3 max-w-md text-[1.05rem] leading-relaxed text-white/90 sm:mt-4 sm:text-lg">
              Соберите себя и свою половинку, ответьте на пять вопросов, и мы напечатаем книгу обо всём, за что вы любите друг друга.
            </p>
            <div className="enter enter-3 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <CreateButton className="btn btn-white btn-lg w-full sm:w-auto" label="Создать книгу" />
              <Link href="#inside" className="inline-flex min-h-11 items-center justify-center font-bold underline decoration-gold decoration-2 underline-offset-[6px] hover:text-gold sm:justify-start">
                Посмотреть пример книги
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/80 sm:text-base">
              от <strong className="text-white">{money(FROM_PRICE)}</strong> · доставка от {SHIPPING[0].minDays} до {SHIPPING[0].maxDays} дней · создать и посмотреть бесплатно
            </p>
          </div>

          <div className="relative order-1 h-[92vw] max-h-[36rem] min-h-[20rem] overflow-hidden bg-brand lg:order-2 lg:h-auto lg:max-h-none lg:min-h-[40rem]">
            <HeartsBackdrop />
            <div className="enter absolute -left-[4%] top-[8%] w-[60%] -rotate-6 sm:w-[56%] lg:left-[2%] lg:top-[8%] lg:w-[44%]">
              <BookMockup book={demoBook({ couple: 1, cover: "stars", title: "Почему я тебя люблю, {B}" })} tilt="left" />
            </div>
            <div className="enter enter-2 absolute -right-[4%] top-[5%] w-[58%] rotate-6 sm:w-[54%] lg:right-[2%] lg:top-[6%] lg:w-[42%]">
              <BookMockup book={demoBook({ couple: 2, cover: "garden", title: "С днём рождения, {B}" })} tilt="right" />
            </div>
            <div className="enter enter-3 absolute bottom-[5%] left-1/2 w-[92%] -translate-x-1/2 sm:w-[80%] lg:bottom-[6%] lg:w-[74%]">
              <BookMockup book={demoBook({ couple: 0, cover: "hearts", title: "Почему я тебя люблю" })} tilt="flat" />
            </div>
            <Stamp className="absolute bottom-[3%] right-[2%] w-[22%] max-w-40" />
          </div>
        </div>
      </section>

      {/* ───────── Occasions ───────── */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">Книги на любой повод</h2>
            <Link href="/books" className="hidden shrink-0 font-bold text-wine underline underline-offset-4 sm:inline">Все обложки</Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:mt-10 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
            {HOME_OCCASIONS.map((c, i) => (
              <li key={c.slug}>
                <ProductCard c={c} couple={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section id="how" className="scroll-mt-20 bg-cream py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-center sm:text-5xl">Три шага и около десяти минут</h2>
          <ol className="mt-6 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
            <Step n={1} title="Соберите вас двоих" body="Кожа, причёска, глаза, очки, одежда. Меняйте, пока герои не станут похожи на вас." tone="bg-sky">
              <svg viewBox="230 190 390 330" className="h-full w-full" role="img" aria-label="Два нарисованных героя держатся за руки">
                <Couple A={COUPLES[3].A} B={COUPLES[3].B} poses={["reachRight", "reachLeft"]} />
              </svg>
            </Step>
            <Step n={2} title="Ответьте на пять вопросов" body="Что вы в нём или в ней обожаете и что любите делать вместе. Тексты страниц пишем мы." tone="bg-peach">
              <div className="flex h-full flex-wrap content-center justify-center gap-1.5 p-3 sm:gap-2 sm:p-4">
                {QUIZ_CHIPS.map((x, i) => (
                  <span key={x} className={`rounded-md px-2 py-1 text-xs font-semibold shadow-sm sm:px-3.5 sm:py-2 sm:text-base ${i > 2 ? "hidden sm:inline" : ""} ${i % 3 === 0 ? "bg-brand text-white" : "bg-white text-ink"}`}>
                    {x}
                  </span>
                ))}
              </div>
            </Step>
            <Step n={3} title="Посмотрите и закажите" body="Пролистайте всю книгу и поправьте любые слова. Мы напечатаем и доставим её." tone="bg-mint">
              <div className="grid h-full place-items-center px-6 pt-4 sm:px-14 sm:pt-10">
                <BookMockup book={demoBook({ couple: 4, cover: "city", title: "{A} и {B}" })} tilt="right" className="w-full" />
              </div>
            </Step>
          </ol>
        </div>
      </section>

      {/* ───────── Inside ───────── */}
      <section id="inside" className="scroll-mt-20 py-12 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">Каждая страница о вас двоих</h2>
            <p className="mt-3 text-lg text-muted">Ваши ответы решают, какие страницы попадут в книгу. А дальше правьте каждое слово.</p>
            <ul className="mt-5 space-y-2.5 sm:text-lg">
              {["Посвящение вашими словами", "Страницы про улыбку, смех, объятия…", "То, что вы любите делать вместе", "Страница к вашему поводу", "Больше 60 страниц, чтобы добавить свои"].map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand text-sm font-bold text-white" aria-hidden="true">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mx-4 bg-blush p-3 sm:mx-0 sm:rounded-2xl sm:p-6">
            <FlipBook book={inside} pages={inside.pages} compact />
          </div>
        </div>
      </section>

      {/* ───────── Recipients ───────── */}
      <section className="bg-blush py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-center sm:text-5xl">Кому дарим?</h2>
          <ul className="mt-7 grid grid-cols-3 gap-x-3 gap-y-6 sm:mt-10 sm:grid-cols-6 sm:gap-x-4">
            {RECIPIENT_COLLECTIONS.map((c) => {
              const face = RECIPIENT_FACES[c.slug] ?? COUPLES[0].B;
              return (
                <li key={c.slug}>
                  <Link href={collectionHref(c)} className="lift group flex flex-col items-center text-center">
                    <span className={`grid aspect-square w-full max-w-36 place-items-center overflow-hidden rounded-full ring-4 ring-white ${c.tone}`}>
                      <AvatarSvg traits={face} crop="head" className="mt-[8%] h-full w-[80%]" />
                    </span>
                    <span className="mt-2 text-sm font-bold leading-tight text-ink group-hover:text-wine sm:text-lg">{c.menuLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────── Covers ───────── */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-5xl">{COVERS.length} обложек с вашими героями</h2>
            <Link href="/books" className="hidden shrink-0 font-bold text-wine underline underline-offset-4 sm:inline">Все обложки</Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
            {COVERS.map((c, i) => (
              <li key={c.id}>
                <Link href={`/books#${c.id}`} className="lift group block">
                  <div className="zoom-frame rounded-xl bg-cream px-[7%] pb-1 pt-[9%] group-hover:bg-blush">
                    <BookMockup book={demoBook({ couple: (i + 1) % COUPLES.length, cover: c.id, title: ["Почему я тебя люблю", "{A} и {B}", "Наша история любви", "Ты и я"][i % 4] })} tilt="flat" />
                  </div>
                  <p className="mt-2.5 font-bold text-ink group-hover:text-wine sm:text-lg">{c.label}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/books" className="btn btn-secondary mt-8 w-full sm:hidden">Все обложки</Link>
        </div>
      </section>

      {/* ───────── Promo band ───────── */}
      <section className="bg-gold">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-9 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-3xl font-semibold text-night sm:text-5xl">Скидка {FEATURED_PROMO.percentOff}% на любую книгу</p>
            <p className="mt-2 text-night/80 sm:text-lg">
              Введите код <strong className="rounded-md bg-night px-2 py-0.5 font-extrabold tracking-wider text-gold">{FEATURED_PROMO.code}</strong> в корзине.
            </p>
          </div>
          <CreateButton className="btn btn-lg w-full bg-night text-white hover:bg-ink sm:w-auto" label="Создать книгу" />
        </div>
      </section>

      {/* ───────── Formats ───────── */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-center sm:text-5xl">Одна цена за любую длину</h2>
          <p className="mt-2 max-w-xl text-muted sm:mx-auto sm:text-center sm:text-lg">От 16 до 60 страниц, 22 × 14 см. Электронную копию, матовые страницы и коробку можно добавить перед оплатой.</p>
          <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-3 sm:mt-10 sm:gap-6">
            {(Object.keys(FORMATS) as (keyof typeof FORMATS)[]).map((f, i) => (
              <div key={f} className={`rounded-xl p-3 ring-1 ring-line sm:p-6 ${f === "hardcover" ? "bg-blush" : "bg-cream"}`}>
                <div className="mx-auto w-[86%] pt-2 sm:w-[70%] sm:pt-4">
                  <BookMockup book={demoBook({ couple: 5 - i, cover: i ? "bigheart" : "beach", title: "Ты и я" })} soft={f === "softcover"} tilt={i ? "right" : "left"} />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-ink sm:mt-4 sm:text-3xl">{FORMATS[f].label}</h3>
                <p className="mt-1 hidden text-muted sm:block">{FORMATS[f].blurb}</p>
                <p className="mt-1 font-display text-xl font-semibold text-wine sm:mt-3 sm:text-4xl">{money(FORMATS[f].cents)}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 sm:text-center">
            <Link href="/pricing" className="inline-flex min-h-11 items-center font-bold text-wine underline underline-offset-4">Все цены и доставка</Link>
          </p>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="bg-cream py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-center sm:text-5xl">Частые вопросы</h2>
          <div className="mt-6 divide-y divide-line rounded-xl bg-white px-4 ring-1 ring-line sm:mt-8 sm:px-6">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink sm:text-lg">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-blush text-xl text-wine transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-1 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-5 sm:text-center">
            <Link href="/pricing#faq" className="inline-flex min-h-11 items-center font-bold text-wine underline underline-offset-4">Все вопросы</Link>
          </p>
        </div>
      </section>

      {/* ───────── Close ───────── */}
      <section className="sm:px-6 sm:py-16">
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 overflow-hidden bg-night px-5 py-10 text-white sm:rounded-2xl sm:px-12 sm:py-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">Подарок, который будут хранить годами</h2>
            <p className="mt-3 max-w-lg text-white/85 sm:text-lg">Около десяти минут с телефона. Всю книгу можно посмотреть до оплаты.</p>
            <div className="mt-6">
              <CreateButton className="btn btn-lg w-full bg-brand text-white hover:bg-brand-dark sm:w-auto" label="Создать книгу" />
            </div>
          </div>
          <div className="relative mx-auto w-[88%] max-w-md">
            <BookMockup book={demoBook({ couple: 5, cover: "city", title: "Наша история любви" })} tilt="right" />
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ n, title, body, tone, children }: { n: number; title: string; body: string; tone: string; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[7.5rem_1fr] overflow-hidden rounded-xl bg-white ring-1 ring-line sm:grid-cols-1">
      <div className={`relative h-full min-h-32 sm:h-56 ${tone}`}>
        <span className="absolute left-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-md bg-brand font-display text-base font-bold text-white shadow sm:left-4 sm:top-4 sm:h-11 sm:w-11 sm:text-xl">{n}</span>
        {children}
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-muted sm:mt-2 sm:text-lg">{body}</p>
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

/** Round badge on the hero. */
function Stamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Сделано с любовью для вас двоих">
      <circle cx="60" cy="60" r="57" fill="#ffc93c" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="#1e1216" strokeWidth="1.5" strokeDasharray="3 3" />
      <defs>
        <path id="stamp-ring" d="M60 60 m-41 0 a41 41 0 1 1 82 0 a41 41 0 1 1 -82 0" />
      </defs>
      <text fontSize="10" fontWeight="800" letterSpacing="1" fill="#1e1216" fontFamily="var(--font-ui), sans-serif">
        <textPath href="#stamp-ring" textLength="252" lengthAdjust="spacing">С ЛЮБОВЬЮ • ДЛЯ ВАС ДВОИХ •</textPath>
      </text>
      <path transform="translate(60 66) scale(19)" d="M0 0.35 C-0.15 0.2 -1 -0.25 -0.55 -0.7 C-0.25 -0.95 0 -0.65 0 -0.45 C0 -0.65 0.25 -0.95 0.55 -0.7 C1 -0.25 0.15 0.2 0 0.35 Z" fill="#e11d58" />
    </svg>
  );
}
