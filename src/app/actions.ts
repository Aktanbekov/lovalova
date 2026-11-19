"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/** The shared header (cart badge, account menu) lives in the layout; refresh it after changes. */
const refreshHeader = () => revalidatePath("/", "layout");
import { ensureOwner, readOwner } from "@/lib/owner";
import { z } from "zod";
import { cookies } from "next/headers";
import { createBookWith, createOrder, getBook, getOrder, saveBookData, setOrderSession, markOrderPaid, type BookRow } from "@/lib/store";
import { AnswersSchema, BookDataSchema, BookPatchSchema, LIMITS } from "@/lib/book/schema";
import { bookFromPreset, readPreset, safeNext } from "@/lib/book/preset";
import { assemblePages } from "@/lib/book/assemble";
import { getTemplate } from "@/content/pages";
import { CURRENCY, SHIPPING, lineItems, totals } from "@/lib/pricing";
import { findPromo, normalizeCode, type Promo } from "@/lib/promos";
import {
  OWNER_COOKIE,
  addSubscriber,
  adoptGuestBooks,
  createUser,
  endSession,
  findUserByEmail,
  normalizeEmail,
  startSession,
  verifyPassword,
} from "@/lib/auth";
import { siteUrl, stripe } from "@/lib/stripe";
import { queuePdf } from "@/lib/fulfill";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

async function ownedBook(id: string): Promise<BookRow> {
  const owner = await readOwner();
  const book = typeof id === "string" ? await getBook(id) : null;
  if (!book || !owner || book.owner !== owner) throw new Error("Книга не найдена");
  return book;
}

// ---------- starting a book ----------

async function startBook(owner: string, form: FormData): Promise<never> {
  const book = await createBookWith(owner, bookFromPreset(readPreset((k) => form.get(k))));
  refreshHeader();
  redirect(`/create/${book.id}/characters`);
}

/** "Create your book" (as a guest). Optional preset fields come from the form. */
export async function startBookAction(form: FormData) {
  await startBook(await ensureOwner(), form);
}

// ---------- accounts ----------

export type AuthState = { error?: string } | null;

const AuthSchema = z.object({
  mode: z.enum(["signin", "signup"]),
  email: z.email("Введите корректный e-mail.").max(200),
  password: z.string().min(8, "Пароль должен быть не короче 8 символов.").max(200),
  name: z.string().trim().max(60).optional(),
});


/**
 * Sign in or create an account. With next=start it then starts a new book
 * (using the preset fields in the same form); otherwise it goes to `next`.
 */
export async function authAction(_prev: AuthState, form: FormData): Promise<AuthState> {
  const parsed = AuthSchema.safeParse({
    mode: form.get("mode"),
    email: form.get("email"),
    password: form.get("password"),
    name: form.get("name") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Проверьте данные." };
  const { mode, email, password, name } = parsed.data;
  const guestOwner = (await cookies()).get(OWNER_COOKIE)?.value ?? null;

  let user;
  if (mode === "signup") {
    if (await findUserByEmail(email)) return { error: "Аккаунт с таким e-mail уже есть. Попробуйте войти." };
    user = await createUser(normalizeEmail(email), password, name || null, guestOwner);
  } else {
    const found = await findUserByEmail(email);
    if (!found || !verifyPassword(password, found.passwordHash)) return { error: "Неверный e-mail или пароль." };
    user = found;
    await adoptGuestBooks(user, guestOwner);
  }
  await startSession(user);
  refreshHeader();

  if (form.get("next") === "start") await startBook(user.owner, form);
  redirect(safeNext(form.get("next")));
}

export async function signOutAction() {
  await endSession();
  refreshHeader();
  redirect("/");
}

// ---------- newsletter offer ----------

export type SubscribeState = { ok: true; code: string } | { ok: false; error: string } | null;

export async function subscribeAction(_prev: SubscribeState, form: FormData): Promise<SubscribeState> {
  const email = z.email().max(200).safeParse(form.get("email"));
  if (!email.success) return { ok: false, error: "Введите корректный e-mail." };
  await addSubscriber(email.data, String(form.get("source") ?? "site").slice(0, 40));
  return { ok: true, code: "WELCOME10" };
}

// ---------- promo codes ----------

export async function applyPromoAction(id: string, code: string | null): Promise<Result<{ promo?: Promo }>> {
  const book = await ownedBook(id);
  if (code === null || !code.trim()) {
    await saveBookData(id, { ...book.data, promo: null });
    return { ok: true };
  }
  const promo = findPromo(code);
  if (!promo) return { ok: false, error: `Промокод «${normalizeCode(code)}» не найден.` };
  await saveBookData(id, { ...book.data, promo: promo.code });
  return { ok: true, promo };
}

export async function saveBookAction(id: string, patch: unknown): Promise<Result> {
  const book = await ownedBook(id);
  const parsed = BookPatchSchema.safeParse(patch);
  if (!parsed.success) return { ok: false, error: "Часть данных заполнена неверно." };
  const p = parsed.data;
  if (p.pages) {
    if (p.pages.some((pg) => !getTemplate(pg.templateId))) return { ok: false, error: "Неизвестная страница." };
    if (new Set(p.pages.map((pg) => pg.key)).size !== p.pages.length) return { ok: false, error: "Страница повторяется." };
    if (book.data.assembled && p.pages.length < LIMITS.minPages) {
      return { ok: false, error: `В книге должно быть не меньше ${LIMITS.minPages} страниц.` };
    }
  }
  const next = BookDataSchema.safeParse({ ...book.data, ...p });
  if (!next.success) return { ok: false, error: "Не получилось сохранить изменения." };
  await saveBookData(id, next.data);
  return { ok: true };
}

/** Last quiz step: store answers and (re)build the page list. */
export async function finishQuizAction(id: string, answers: unknown): Promise<Result> {
  const book = await ownedBook(id);
  const parsed = AnswersSchema.safeParse(answers);
  if (!parsed.success) return { ok: false, error: "Проверьте ответы." };
  const a = parsed.data;
  if (a.features.length !== LIMITS.features || a.qualities.length !== LIMITS.qualities || a.activities.length !== LIMITS.activities) {
    return { ok: false, error: "Ответьте на все вопросы." };
  }
  const pages = assemblePages(a, book.data.occasion);
  await saveBookData(id, { ...book.data, answers: a, pages, assembled: true, previewed: false });
  return { ok: true };
}

export async function markPreviewedAction(id: string): Promise<Result> {
  const book = await ownedBook(id);
  if (!book.data.assembled) return { ok: false, error: "Сначала ответьте на вопросы." };
  await saveBookData(id, { ...book.data, previewed: true });
  refreshHeader();
  return { ok: true };
}

/**
 * Creates the order and a Stripe Checkout session.
 * Without Stripe keys in development, returns `simulate` so the cart can
 * offer a fake payment for local testing.
 */
export async function checkoutAction(id: string): Promise<Result<{ url?: string; simulate?: string }>> {
  const book = await ownedBook(id);
  const d = book.data;
  if (!d.assembled || !d.previewed) return { ok: false, error: "Перед оплатой посмотрите книгу целиком." };
  if (d.pages.length < LIMITS.minPages) return { ok: false, error: `В книге должно быть не меньше ${LIMITS.minPages} страниц.` };
  if (!d.characters[0].name.trim() || !d.characters[1].name.trim()) return { ok: false, error: "Укажите имена обоих героев." };

  const promo = findPromo(d.promo);
  const order = await createOrder(book, d.selection, totals(d.selection, promo).total);

  if (!stripe) {
    if (process.env.NODE_ENV === "production") return { ok: false, error: "Оплата пока не подключена." };
    return { ok: true, simulate: order.id };
  }

  const site = siteUrl();
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: order.id,
      metadata: { orderId: order.id, bookId: book.id },
      line_items: lineItems(d.selection).map((li) => ({
        quantity: 1,
        price_data: { currency: CURRENCY, unit_amount: li.cents, product_data: { name: li.label } },
      })),
      shipping_address_collection: { allowed_countries: ["KG", "KZ", "UZ", "RU"] },
      shipping_options: SHIPPING.map((s) => ({
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: s.label,
          fixed_amount: { amount: s.cents, currency: CURRENCY },
          delivery_estimate: {
            minimum: { unit: "business_day", value: s.minDays },
            maximum: { unit: "business_day", value: s.maxDays },
          },
        },
      })),
      ...(promo ? { discounts: [{ coupon: await stripeCoupon(promo) }] } : { allow_promotion_codes: true }),
      locale: "ru",
      success_url: `${site}/checkout/success?order=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/checkout/cancel?order=${order.id}`,
    });
    await setOrderSession(order.id, session.id);
    return { ok: true, url: session.url ?? undefined };
  } catch (err) {
    console.error("[lovalova] Stripe checkout failed", err);
    return { ok: false, error: "Не получилось открыть оплату. Попробуйте ещё раз." };
  }
}

/** Our promo codes mirrored as Stripe coupons (created on first use). */
async function stripeCoupon(promo: Promo): Promise<string> {
  const id = `lovalova_${promo.code}`;
  try {
    await stripe!.coupons.retrieve(id);
  } catch {
    await stripe!.coupons.create({ id, percent_off: promo.percentOff, duration: "once", name: `${promo.code}: ${promo.label}` });
  }
  return id;
}

/** Development-only stand-in for a Stripe payment. */
export async function simulatePaymentAction(orderId: string): Promise<Result> {
  if (process.env.NODE_ENV === "production" || stripe) return { ok: false, error: "Недоступно." };
  const owner = await readOwner();
  const order = await getOrder(orderId);
  if (!order || order.owner !== owner) return { ok: false, error: "Заказ не найден." };
  await markOrderPaid(orderId, {
    email: "test@example.com",
    shipping: { address: { name: "Test Customer", address: { line1: "1 Test Street", city: "Testville", country: "US" } }, rate: "simulated" },
  });
  queuePdf(orderId);
  refreshHeader();
  return { ok: true };
}
