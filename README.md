# Lovalova

A personalized couples book shop. Buyers design cartoon versions of themselves and their partner, answer five questions, edit and preview a ~24-page illustrated book, then pay through Stripe. A print-ready PDF is generated for every paid order.

All artwork is original layered SVG drawn in code — no AI and no photos.

## Run it

```bash
npm install
npx playwright install chromium   # headless browser used to make PDFs
cp .env.example .env.local        # then fill in Stripe test keys (optional)
npm run dev
```

Open http://localhost:3000.

Or use the one-step script. It stops whatever is on ports 3000/3001, runs the type check, lint and unit tests, starts the dev server, runs the end-to-end tests against it and keeps serving (Ctrl+C to stop):

```bash
./start.sh              # everything
./start.sh --skip-e2e   # skip the browser tests
./start.sh --no-tests   # just free the ports and start
```

**Without Stripe keys**, the cart offers a "Simulate test payment" button (development only), so you can test the whole flow including the PDF.

**With Stripe test keys**, checkout goes to Stripe's hosted test page. To receive the payment webhook locally:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the `whsec_…` it prints into `STRIPE_WEBHOOK_SECRET`. The success page also confirms payment directly with Stripe, so orders are marked paid even if the webhook is late.

## Checks

```bash
npm test            # unit tests: page assembly, text tokens, pricing, schema
npm run e2e         # full buyer flow on desktop + phone viewports (uses the dev server)
npm run typecheck
npm run lint
```

`/dev/pages` (development only) shows every page template and avatar part on one screen.

## How it fits together

| Area | Where |
|---|---|
| Avatar options (ids are stored — add, never rename) | `src/lib/avatar/options.ts` |
| Avatar renderer (layered SVG, poses) | `src/components/avatar/Avatar.tsx` |
| Page scenes (850×550 canvas) | `src/components/book/scenes.tsx` |
| Page template library and copy | `src/content/pages.ts` |
| Quiz choices, occasions, dedications | `src/lib/book/catalog.ts` |
| Quiz answers → ordered pages, text tokens | `src/lib/book/assemble.ts` |
| Book data schema and limits | `src/lib/book/schema.ts` |
| Prices, upgrades, shipping | `src/lib/pricing.ts` |
| Server actions (drafts, autosave, checkout) | `src/app/actions.ts` |
| Builder steps | `src/app/(site)/create/[id]/*`, `src/components/builder/*` |
| Stripe webhook | `src/app/api/stripe/webhook/route.ts` |
| Print layout + PDF | `src/app/print/[id]/page.tsx`, `src/lib/pdf.ts` |
| Storage (Node's built-in SQLite) | `src/lib/db.ts`, `src/lib/store.ts` → `data/lovalova.db` |
| Header, dropdown menus, promo bar, footer | `src/components/site/*` |
| Occasion / recipient shop pages | `src/content/collections.ts`, `src/components/shop/CollectionPage.tsx` |
| Sample couples for cover examples | `src/lib/demo.ts` |
| Discount codes (every advertised code lives here and works) | `src/lib/promos.ts` |
| Accounts and sessions | `src/lib/auth.ts`, `src/lib/password.ts` |

PDFs are written to `storage/pdfs/<orderId>.pdf` (8.5 × 5.5 in, cover + pages).

Books belong to an "owner" id. Guests get one in an anonymous cookie (`ll_owner`); an account has its own. Signing up adopts the guest's books, and signing in moves any guest books in that browser into the account. Every action and route checks the owner before reading or changing a book or order. Each order stores a snapshot of the book, so later edits never change a paid order.

Clicking "Create your book" as a guest offers to create an account or sign in first, or to carry on as a guest.

Discount codes are entered in the cart and taken off the book and extras (not shipping). With Stripe configured, the code is sent to Checkout as a matching coupon (`lovalova_<CODE>`, created on first use). The email offer stores addresses in the `subscribers` table and shows the `WELCOME10` code; no emails are sent.

## Not built yet

- Sending PDFs to a print-on-demand provider (Lulu, Gelato, …)
- Password reset, email verification and sign-in rate limiting
- An admin order dashboard, order and marketing emails
- Other currencies/languages
- Professionally illustrated replacement art (scenes and avatar parts are isolated so a designer can swap them)
