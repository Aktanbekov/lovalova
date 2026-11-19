import { BookMockup } from "@/components/book/BookMockup";
import { CreateButton } from "@/components/site/CreateButton";
import { COVERS } from "@/lib/book/catalog";
import { demoBook } from "@/lib/demo";
import { FROM_PRICE, money } from "@/lib/pricing";

export const metadata = { title: "Все обложки" };

const TITLES = ["Почему я тебя люблю", "Почему я тебя люблю, {B}", "Наша история любви", "{A} и {B}", "Ты и я", "С годовщиной, {B}", "Наш Новый год", "Скучаю по тебе, {B}"];

export default function BooksPage() {
  return (
    <>
      <section className="bg-night text-white">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6 sm:py-14 sm:text-center">
          <h1 className="font-display text-[2rem] font-semibold leading-tight sm:text-6xl">Выберите обложку</h1>
          <p className="mt-3 max-w-xl text-white/85 sm:mx-auto sm:text-xl">{COVERS.length} обложек, и на каждой ваши герои. Название можно написать любое.</p>
        </div>
      </section>
      <section className="py-10 sm:py-20">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-9 px-4 sm:gap-x-6 sm:gap-y-14 sm:px-6 lg:grid-cols-3">
          {COVERS.map((c, i) => (
            <li key={c.id} id={c.id} className="scroll-mt-24">
              <div className="rounded-xl bg-cream px-[7%] pb-1 pt-[9%]">
                <BookMockup book={demoBook({ couple: i, cover: c.id, title: TITLES[i % TITLES.length] })} tilt="flat" />
              </div>
              <p className="mt-2.5 font-display text-lg font-semibold text-ink sm:text-2xl">{c.label}</p>
              <p className="text-sm text-muted sm:text-base">от {money(FROM_PRICE)} · от 16 до 60 страниц</p>
              <div className="mt-3">
                <CreateButton className="btn btn-primary w-full !px-3 sm:w-auto sm:!px-6" label="Выбрать" preset={{ cover: c.id, title: TITLES[i % TITLES.length] }} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
