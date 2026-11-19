import { redirect } from "next/navigation";
import { BookMockup } from "@/components/book/BookMockup";
import { AuthForm } from "@/components/site/AuthForm";
import { currentUser } from "@/lib/auth";
import { demoBook } from "@/lib/demo";

export const metadata = { title: "Вход" };

const GOOGLE_ERRORS: Record<string, string> = {
  google_off: "Вход через Google пока не настроен. Войдите по e-mail.",
  google_cancelled: "Вход через Google отменён.",
  google_failed: "Не получилось войти через Google. Попробуйте ещё раз.",
  google_unverified: "Google не подтвердил этот e-mail. Войдите по e-mail или выберите другой аккаунт.",
};

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ mode?: string; next?: string; error?: string }> }) {
  const { mode, next, error } = await searchParams;
  const dest = next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/account/sign-in") ? next : "/account";
  if (await currentUser()) redirect(dest);
  return (
    <section className="bg-cream py-12 sm:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-9">
          <h1 className="font-display text-3xl font-semibold text-wine sm:text-4xl">{mode === "signup" ? "Регистрация" : "С возвращением"}</h1>
          <p className="mt-2 text-muted">Книги и заказы доступны на любом устройстве. Книги, созданные в этом браузере без аккаунта, перенесутся в ваш аккаунт.</p>
          {error && GOOGLE_ERRORS[error] && (
            <p className="mt-4 rounded-lg bg-blush px-3 py-2 text-sm font-medium text-wine" role="alert">
              {GOOGLE_ERRORS[error]}
            </p>
          )}
          <div className="mt-6">
            <AuthForm initialMode={mode === "signup" ? "signup" : "signin"} next={dest} />
          </div>
        </div>
        <div className="hidden lg:block">
          <BookMockup book={demoBook({ couple: 1, cover: "bigheart", title: "Почему я тебя люблю" })} tilt="right" />
        </div>
      </div>
    </section>
  );
}
