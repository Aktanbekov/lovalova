import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { demoBook } from "@/lib/demo";
import { FORMATS, SHIPPING, UPGRADES, money, type UpgradeId } from "@/lib/pricing";
import { FEATURED_PROMO } from "@/lib/promos";

export const metadata = { title: "Цены и доставка" };

const FAQ = [
  { q: "Сколько времени занимает?", a: "Обычно около десяти минут с телефона. Всё сохраняется по ходу; с аккаунтом можно продолжить на любом устройстве." },
  { q: "Можно поменять текст?", a: "Да. Любую страницу можно переписать, переставить или убрать, а ещё добавить страницы из библиотеки, больше 60 вариантов. Цена не меняется." },
  { q: "Это делает ИИ?", a: "Нет. Все сцены и детали героев нарисованы художниками и собираются из ваших ответов. Фотографии не нужны." },
  { q: "Нужны фотографии?", a: "Нет. Героев вы собираете сами в конструкторе." },
  { q: "Какого размера книга?", a: "Горизонтальная, 22 × 14 см, от 16 до 60 страниц: сколько оставите." },
  { q: "Когда привезут?", a: `Печатаем под заказ, потом отправляем. ${SHIPPING.map((s) => `${s.label}: от ${s.minDays} до ${s.maxDays} рабочих дней`).join(". ")}.` },
  { q: "Как работают промокоды?", a: `Введите код в корзине перед оплатой. Скидка действует на книгу и дополнения, но не на доставку. Сейчас код ${FEATURED_PROMO.code} даёт скидку ${FEATURED_PROMO.percentOff}%.` },
  { q: "Нужно регистрироваться?", a: "Нет, книгу можно сделать и купить без аккаунта. Аккаунт нужен, чтобы находить свои книги и заказы с любого телефона." },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-wine text-white">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6 sm:py-14 sm:text-center">
          <h1 className="font-display text-[2rem] font-semibold leading-tight sm:text-6xl">Цены и доставка</h1>
          <p className="mt-3 max-w-xl text-white/85 sm:mx-auto sm:text-xl">Одна цена за любую длину книги. Без подписок и сюрпризов при оплате.</p>
        </div>
      </section>

      <section className="py-10 sm:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-4 sm:gap-6 sm:px-6">
          {(Object.keys(FORMATS) as (keyof typeof FORMATS)[]).map((f, i) => (
            <div key={f} className={`rounded-xl p-3 ring-1 ring-line sm:p-7 ${f === "hardcover" ? "bg-blush" : "bg-cream"}`}>
              <div className="mx-auto w-[86%] sm:w-[66%]">
                <BookMockup book={demoBook({ couple: i + 2, cover: i ? "sunrise" : "garden", title: "Наша история любви" })} soft={f === "softcover"} tilt={i ? "right" : "left"} />
              </div>
              <h2 className="mt-3 font-display text-lg font-semibold leading-tight text-ink sm:mt-5 sm:text-3xl">{FORMATS[f].label}</h2>
              <p className="mt-1 hidden text-lg text-muted sm:block">{FORMATS[f].blurb}</p>
              <p className="mt-1 font-display text-xl font-semibold text-wine sm:mt-3 sm:text-5xl">{money(FORMATS[f].cents)}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">22 × 14 см · от 16 до 60 страниц</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 px-4 sm:mt-12 sm:gap-6 sm:px-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-5 ring-1 ring-line sm:p-7">
            <h2 className="font-display text-2xl font-semibold text-ink">Дополнительно</h2>
            <ul className="mt-3 divide-y divide-line">
              {(Object.keys(UPGRADES) as UpgradeId[]).map((u) => (
                <li key={u} className="flex justify-between gap-4 py-3">
                  <span>
                    <span className="block font-semibold">{UPGRADES[u].label}</span>
                    <span className="text-sm text-muted">{UPGRADES[u].blurb}</span>
                  </span>
                  <span className="shrink-0 font-bold">+{money(UPGRADES[u].cents)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white p-5 ring-1 ring-line sm:p-7">
            <h2 className="font-display text-2xl font-semibold text-ink">Доставка</h2>
            <ul className="mt-3 divide-y divide-line">
              {SHIPPING.map((s) => (
                <li key={s.id} className="flex justify-between gap-4 py-3">
                  <span>
                    <span className="block font-semibold">{s.label}</span>
                    <span className="text-sm text-muted">от {s.minDays} до {s.maxDays} рабочих дней после печати</span>
                  </span>
                  <span className="shrink-0 font-bold">{money(s.cents)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">Доставляем в Кыргызстан, Казахстан, Узбекистан и Россию.</p>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-5xl justify-center px-4 sm:px-6">
          <CreateButton className="btn btn-primary btn-lg w-full sm:w-auto" label="Создать книгу" />
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 bg-cream py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-center sm:text-5xl">Вопросы и ответы</h2>
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
        </div>
      </section>
    </>
  );
}
