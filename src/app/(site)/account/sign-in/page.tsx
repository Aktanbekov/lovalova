import { redirect } from "next/navigation";
import { BookMockup } from "@/components/book/BookMockup";
import { AuthForm } from "@/components/site/AuthForm";
import { currentUser } from "@/lib/auth";
import { demoBook } from "@/lib/demo";

export const metadata = { title: "Sign in" };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ mode?: string; next?: string }> }) {
  const { mode, next } = await searchParams;
  const dest = next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/account/sign-in") ? next : "/account";
  if (await currentUser()) redirect(dest);
  return (
    <section className="bg-cream py-12 sm:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-9">
          <h1 className="font-display text-4xl font-semibold text-wine">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-2 text-muted">Your books and orders, saved on every device. Books you made as a guest in this browser move into your account.</p>
          <div className="mt-6">
            <AuthForm initialMode={mode === "signup" ? "signup" : "signin"} next={dest} />
          </div>
        </div>
        <div className="hidden lg:block">
          <BookMockup book={demoBook({ couple: 1, cover: "bigheart", title: "Why I Love You" })} tilt="right" />
        </div>
      </div>
    </section>
  );
}
