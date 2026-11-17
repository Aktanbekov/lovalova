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
  await page.getByRole("button", { name: "Create your book" }).first().click();
  // Guests are offered an account first; carry on as a guest.
  await page.getByRole("dialog", { name: /Save your book/ }).getByRole("button", { name: "Continue as guest" }).click();
  await expect(page).toHaveURL(/\/create\/.+\/characters/);
  await expectNoSideScroll(page);

  await page.getByPlaceholder("e.g. Alex").fill("Alex");
  await page.getByRole("tab", { name: "Your partner" }).click();
  await page.getByPlaceholder("e.g. Sam").fill("Sam");
  await page.getByRole("tab", { name: "Hair", exact: true }).click();
  await page.getByRole("button", { name: "Bob" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/occasion$/);
  await expectNoSideScroll(page);
  await page.getByRole("radio", { name: "Birthday" }).click();
  await page.getByRole("radio", { name: "Wife" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/cover$/);
  await expectNoSideScroll(page);
  await page.getByRole("radio", { name: /Starry night/ }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/quiz$/);
  await expectNoSideScroll(page);
  await page.getByLabel("Year you got together").selectOption("2018");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  for (const f of ["Your eyes", "Your smile", "Your laugh"]) await page.getByRole("button", { name: f }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  for (const q of ["Kind", "Funny", "Smart", "Brave"]) await page.getByRole("button", { name: q, exact: true }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  for (const a of ["Cooking together", "Movie nights", "Beach days", "Stargazing"]) await page.getByRole("button", { name: a }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: /^To Sam, the best thing/ }).click();
  await page.getByRole("button", { name: "Build my book" }).click();

  await expect(page).toHaveURL(/\/edit$/);
  await expectNoSideScroll(page);
  await expect(page.getByText("24 pages.")).toBeVisible();
  await page.getByRole("button", { name: "Page 2: This book is about you" }).click();
  await page.getByLabel("Words on this page").fill("Sam, this book is all about you.");
  await page.getByRole("button", { name: "Preview my book" }).click();

  await expect(page).toHaveURL(/\/preview$/);
  await expectNoSideScroll(page);
  await page.getByRole("button", { name: "Next page" }).click();
  await page.getByRole("button", { name: "Next page" }).click();
  await expect(page.getByText("Sam, this book is all about you.").first()).toBeVisible();
  await page.getByRole("button", { name: "Looks perfect — continue" }).click();

  await expect(page).toHaveURL(/\/options$/);
  await expectNoSideScroll(page);
  await page.getByText("Digital copy").click();
  await page.getByRole("button", { name: "Go to cart" }).click();

  await expect(page).toHaveURL(/\/cart\//);
  await expectNoSideScroll(page);
  await expect(page.getByText("Digital copy")).toBeVisible();
  await expect(page.getByText("$73.00").last()).toBeVisible();
  // The header cart badge counts previewed books.
  await expect(page.getByRole("link", { name: /^Cart, [1-9]/ })).toBeVisible();
  await page.getByLabel("Discount code").fill("nope");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("isn't a valid code")).toBeVisible();
  await page.getByLabel("Discount code").fill("love15");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("LOVE15 applied")).toBeVisible();
  await expect(page.getByText("−$10.95")).toBeVisible();
  await expect(page.getByText("$62.05")).toBeVisible();
  await page.getByRole("button", { name: "Checkout securely" }).click();

  const simulate = page.getByRole("button", { name: "Simulate test payment" });
  const redirected = page.waitForURL(/checkout\.stripe\.com/, { timeout: 15_000 }).then(() => "stripe").catch(() => null);
  const which = await Promise.race([simulate.waitFor({ timeout: 15_000 }).then(() => "simulate"), redirected]);
  if (which === "stripe") return; // real test-mode checkout reached; card entry is manual

  await simulate.click();
  await expect(page).toHaveURL(/\/checkout\/success/);
  await expectNoSideScroll(page);
  await expect(page.getByRole("heading", { name: /Thank you/ })).toBeVisible();
  const download = page.getByRole("link", { name: "Download PDF" });
  await expect(download).toBeVisible({ timeout: 60_000 });
  const res = await page.request.get(await download.getAttribute("href") as string);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("application/pdf");
  expect((await res.body()).subarray(0, 4).toString()).toBe("%PDF");
});

test("shop pages, menus and accounts", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await menu.getByRole("link", { name: "Christmas gifts" }).click();
  } else {
    await page.getByRole("button", { name: "Occasions" }).hover();
    await page.getByRole("link", { name: "Christmas gifts" }).first().click();
  }
  await expect(page).toHaveURL(/\/occasions\/christmas$/);
  await expectNoSideScroll(page);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Christmas");

  // Start from a cover preset and create an account in the prompt.
  const email = `e2e+${Date.now()}-${isMobile ? "m" : "d"}@example.com`;
  await page.getByRole("button", { name: "Personalize", exact: true }).first().click();
  const dlg = page.getByRole("dialog", { name: /Save your book/ });
  await dlg.getByLabel("Email", { exact: true }).fill(email);
  await dlg.getByLabel("Password").fill("correct horse battery");
  await dlg.getByRole("button", { name: "Create account & start" }).click();
  await expect(page).toHaveURL(/\/create\/.+\/characters/);
  const bookUrl = page.url();

  // The preset carried through to the cover step.
  await page.goto(bookUrl.replace(/characters$/, "cover"));
  await expect(page.getByLabel("Cover title")).toHaveValue("Our Christmas Story");
  await expect(page.getByRole("radio", { name: /Snowy night/ })).toHaveAttribute("aria-checked", "true");

  // Sign out: the book is no longer reachable from this browser.
  await page.goto("/account");
  await expect(page.getByText(`Signed in as ${email}`)).toBeVisible();
  await page.getByRole("button", { name: "Your account" }).click();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");
  const gone = await page.request.get(bookUrl);
  expect(gone.status()).toBe(404);

  // Sign back in (wrong password first): the book is still there.
  await page.goto("/account/sign-in?next=/account");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Password").fill("wrong password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByText("That email and password don't match.")).toBeVisible();
  await page.getByLabel("Password").fill("correct horse battery");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page).toHaveURL("http://localhost:3000/account");
  await expect(page.getByText(/In progress/)).toBeVisible();
  await expectNoSideScroll(page);
});
