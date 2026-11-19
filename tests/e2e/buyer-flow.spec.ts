import { expect, test, type Page } from "@playwright/test";

async function expectNoSideScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, `horizontal overflow on ${page.url()}`).toBeLessThanOrEqual(1);
}

// Walks the whole buyer journey. Without Stripe keys (local dev) it uses the
// simulated payment; with keys it stops at the Stripe redirect.
test("design, preview and order a book", async ({ page }) => {
  await page.goto("/");
  await expectNoSideScroll(page);
  await page.getByRole("button", { name: "Создать книгу" }).first().click();
  // Guests are offered an account first; carry on as a guest.
  await page.getByRole("dialog", { name: /Сохраняйте книгу/ }).getByRole("button", { name: "Продолжить без регистрации" }).click();
  await expect(page).toHaveURL(/\/create\/.+\/characters/);
  await expectNoSideScroll(page);

  await page.getByPlaceholder("Например, Айбек").fill("Alex");
  await page.getByRole("tab", { name: "Ваша половинка" }).click();
  await page.getByPlaceholder("Например, Айпери").fill("Sam");
  await page.getByRole("tab", { name: "Причёска", exact: true }).click();
  await page.getByRole("button", { name: "Каре" }).click();
  await page.getByRole("button", { name: "Дальше", exact: true }).click();

  await expect(page).toHaveURL(/\/occasion$/);
  await expectNoSideScroll(page);
  await page.getByRole("radio", { name: "День рождения" }).click();
  await page.getByRole("radio", { name: "Жена" }).click();
  await page.getByRole("button", { name: "Дальше", exact: true }).click();

  await expect(page).toHaveURL(/\/cover$/);
  await expectNoSideScroll(page);
  await page.getByRole("radio", { name: /Звёздная ночь/ }).click();
  await page.getByRole("button", { name: "Дальше", exact: true }).click();

  await expect(page).toHaveURL(/\/quiz$/);
  await expectNoSideScroll(page);
  await page.getByLabel("Год, когда вы начали встречаться").selectOption("2018");
  await page.getByRole("button", { name: "Дальше", exact: true }).click();
  for (const f of ["Твои глаза", "Твоя улыбка", "Твой смех"]) await page.getByRole("button", { name: f }).click();
  await page.getByRole("button", { name: "Дальше", exact: true }).click();
  for (const q of ["Доброта", "Чувство юмора", "Ум", "Смелость"]) await page.getByRole("button", { name: q, exact: true }).click();
  await page.getByRole("button", { name: "Дальше", exact: true }).click();
  for (const a of ["Готовить вместе", "Вечера с фильмами", "Море и пляж", "Смотреть на звёзды"]) await page.getByRole("button", { name: a }).click();
  await page.getByRole("button", { name: "Дальше", exact: true }).click();
  await page.getByRole("button", { name: /^Sam, ты лучшее/ }).click();
  await page.getByRole("button", { name: "Собрать книгу" }).click();

  await expect(page).toHaveURL(/\/edit$/);
  await expectNoSideScroll(page);
  await expect(page.getByText("24 страницы.")).toBeVisible();
  await page.getByRole("button", { name: "Страница 2: Эта книга о тебе" }).click();
  await page.getByLabel("Текст страницы").fill("Sam, эта книга — о тебе.");
  await page.getByRole("button", { name: "Посмотреть книгу" }).click();

  await expect(page).toHaveURL(/\/preview$/);
  await expectNoSideScroll(page);
  await page.getByRole("button", { name: "Следующая страница" }).click();
  await page.getByRole("button", { name: "Следующая страница" }).click();
  await expect(page.getByText("Sam, эта книга — о тебе.").first()).toBeVisible();
  await page.getByRole("button", { name: "Всё отлично, дальше" }).click();

  await expect(page).toHaveURL(/\/options$/);
  await expectNoSideScroll(page);
  await page.getByText("Электронная копия").click();
  await page.getByRole("button", { name: "В корзину" }).click();

  await expect(page).toHaveURL(/\/cart\//);
  await expectNoSideScroll(page);
  await expect(page.getByText("Электронная копия")).toBeVisible();
  // 5 490 + 790 = 6 280 сом (Russian grouping uses no-break spaces)
  await expect(page.getByText(/^6\s280\sсом$/).last()).toBeVisible();
  // The header cart badge counts previewed books.
  await expect(page.getByRole("link", { name: /^Корзина, книг: [1-9]/ })).toBeVisible();
  await page.getByLabel("Промокод").fill("nope");
  await page.getByRole("button", { name: "Применить" }).click();
  await expect(page.getByText("не найден")).toBeVisible();
  await page.getByLabel("Промокод").fill("love15");
  await page.getByRole("button", { name: "Применить" }).click();
  await expect(page.getByText("LOVE15 применён")).toBeVisible();
  await expect(page.getByText(/^942\sсом$/)).toBeVisible();
  await expect(page.getByText(/^5\s338\sсом$/)).toBeVisible();
  await page.getByRole("button", { name: "Перейти к оплате" }).click();

  const simulate = page.getByRole("button", { name: "Тестовая оплата" });
  const redirected = page.waitForURL(/checkout\.stripe\.com/, { timeout: 15_000 }).then(() => "stripe").catch(() => null);
  const which = await Promise.race([simulate.waitFor({ timeout: 15_000 }).then(() => "simulate"), redirected]);
  if (which === "stripe") return; // real test-mode checkout reached; card entry is manual

  await simulate.click();
  await expect(page).toHaveURL(/\/checkout\/success/);
  await expectNoSideScroll(page);
  await expect(page.getByRole("heading", { name: /Спасибо/ })).toBeVisible();
  const download = page.getByRole("link", { name: "Скачать PDF" });
  await expect(download).toBeVisible({ timeout: 60_000 });
  const res = await page.request.get(await download.getAttribute("href") as string);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("application/pdf");
  expect((await res.body()).subarray(0, 4).toString()).toBe("%PDF");
});

test("shop pages, menus and accounts", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle"); // menus need the page's script loaded
  if (isMobile) {
    await page.getByRole("button", { name: "Открыть меню" }).click();
    const menu = page.getByRole("dialog", { name: "Меню" });
    await menu.getByRole("link", { name: "На Новый год" }).click();
  } else {
    await page.getByRole("button", { name: "Повод" }).hover();
    await page.getByRole("link", { name: "На Новый год" }).first().click();
  }
  await expect(page).toHaveURL(/\/occasions\/new-year$/);
  await expectNoSideScroll(page);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ёлкой");

  // Start from a cover preset and create an account in the prompt.
  const email = `e2e+${Date.now()}-${isMobile ? "m" : "d"}@example.com`;
  await page.getByRole("button", { name: "Выбрать", exact: true }).first().click();
  const dlg = page.getByRole("dialog", { name: /Сохраняйте книгу/ });
  await dlg.getByLabel("E-mail", { exact: true }).fill(email);
  await dlg.getByLabel("Пароль").fill("correct horse battery");
  await dlg.getByRole("button", { name: "Зарегистрироваться и начать" }).click();
  await expect(page).toHaveURL(/\/create\/.+\/characters/);
  const bookUrl = page.url();

  // The preset carried through to the cover step.
  await page.goto(bookUrl.replace(/characters$/, "cover"));
  await expect(page.getByLabel("Название на обложке")).toHaveValue("Наш Новый год");
  await expect(page.getByRole("radio", { name: /Снежная ночь/ })).toHaveAttribute("aria-checked", "true");

  // Sign out: the book is no longer reachable from this browser.
  await page.goto("/account");
  await expect(page.getByText(`Вы вошли как ${email}`)).toBeVisible();
  await page.getByRole("button", { name: "Мой аккаунт" }).click();
  await page.getByRole("button", { name: "Выйти" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");
  const gone = await page.request.get(bookUrl);
  expect(gone.status()).toBe(404);

  // Sign back in (wrong password first): the book is still there.
  await page.goto("/account/sign-in?next=/account");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Пароль").fill("wrong password");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await expect(page.getByText("Неверный e-mail или пароль.")).toBeVisible();
  await page.getByLabel("Пароль").fill("correct horse battery");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await expect(page).toHaveURL("http://localhost:3000/account");
  await expect(page.getByText(/В работе/)).toBeVisible();
  await expectNoSideScroll(page);
});

test("Google sign-in button", async ({ page }) => {
  await page.goto("/occasions/march-8");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Выбрать", exact: true }).first().click();
  const google = page.getByRole("dialog", { name: /Сохраняйте книгу/ }).getByRole("link", { name: "Продолжить с Google" });
  await expect(google).toBeVisible();
  const href = new URL((await google.getAttribute("href")) as string, "http://localhost:3000");
  expect(href.pathname).toBe("/api/auth/google");
  expect(href.searchParams.get("next")).toBe("start");
  expect(href.searchParams.get("occasion")).toBe("march8");

  // Without GOOGLE_CLIENT_ID the route explains instead of failing; with it, it goes to Google.
  await google.click();
  await page.waitForURL(/accounts\.google\.com|\/account\/sign-in/);
  if (page.url().includes("/account/sign-in")) {
    await expect(page.getByText("Вход через Google пока не настроен")).toBeVisible();
    await expectNoSideScroll(page);
  } else {
    expect(new URL(page.url()).searchParams.get("code_challenge_method")).toBe("S256");
  }

  // A forged return from "Google" is refused.
  await page.goto("/api/auth/google/callback?code=x&state=forged");
  await expect(page).toHaveURL(/\/account\/sign-in\?error=google_failed/);
  await expect(page.getByText("Не получилось войти через Google")).toBeVisible();
});
