# LoveBook (lovebookonline.com): business and product profile

Research date: 2026-11-16. "Observed" means I saw it myself in a browser session on lovebookonline.com that day. I used dummy names "Alex" (giver) and "Sam" (receiver), entered no email, created no account and stopped at the cart, before the shipping and payment steps. Prices are in USD, as the site shows them on that date, during the "Early Access XMAS Sale" (15% off with code EAXMAS26).

## 1. Site structure and customer funnel

### Takeaway
LoveBook uses a guest-first, wizard-style builder: (1) design two "LoveMoji" avatars, (2) an optional email gate, (3) pick an occasion and relationship, (4) pick a cover drawn with your avatars, (5) a 5-question multiple-choice questionnaire that auto-builds a book of about 47 pages, (6) edit, add or arrange pages, (7) a forced preview, (8) a format choice (softcover, hardcover or deluxe bundle), (9) an upgrades screen, (10) a cart with cross-sells and a membership upsell. Sitewide promo codes, countdown timers, limited-stock rush shipping and large review counts carry the conversion work.

### Cited Findings
**Homepage and navigation**
- Top bar: Order Status, Log In, Sign Up. The main menu has four mega-menus: **Occasions**, **Recipients**, **Shop** and **Support**, plus single links for **Pricing & Shipping** and **Membership**. — [Homepage](https://lovebookonline.com/)
  - Occasions: Upcoming (Anniversary, Birthday, Just Because, Christmas), Everyday (about 13 links) and Holiday (6 links).
  - Recipients: For Him, For Her and Other, with links such as LGBTQ, Military and Best Friend.
  - Shop: by product type, occasion, collection (Romantic, After Dark, Kids) and recipient.
- The site has many SEO landing pages, one per occasion and recipient (e.g. /anniversary-gifts/, /gifts-for-boyfriend/, /after-dark-gifts/, /military-gifts/, /lgbt-gifts/, /wedding-proposal-ideas/). — [Homepage link map](https://lovebookonline.com/)
- Homepage sections, in order:
  1. Promo banner: "Early Access XMAS Sale | Save 15% | Code: EAXMAS26".
  2. Hero carousel. Headline: "It's Your Love. Show them exactly why you love them." Feature callouts: "1000's of Pages to Choose From", "Select from 100's of Covers", "Fully Editable Pages". CTA: "Create Your LoveBook".
  3. Trust stats: "Over 2.8 Million" happy customers, "160+" countries, "4.8 Stars".
  4. Reviews.io widget.
  5. A 3-step explainer: design LoveMojis, answer a few quick questions, personalize pages.
  6. "Why is LoveBook the perfect gift?"
  7. "Rated 4.8 from 10,000+ verified reviews", followed by 8 testimonial cards.
  8. Brand story ("since 2007").
  9. Closing CTA: "The most personal gift they'll ever receive."
  10. Upcoming-occasion cards.
  11. FAQ excerpt.
  — [Homepage](https://lovebookonline.com/)
- Footer: About Us, Reviews, Who we are, Blog, ToS & Privacy, How This Works, Compare LoveBook, Affiliate Program, Content Creator Program, Careers, "Share The Love" (customer reaction submissions). Payment logos: Visa, Mastercard, Discover, Amex, PayPal, Apple Pay. — [Homepage](https://lovebookonline.com/)

**Builder flow (observed 2026-11-16)**
- **Step 1, LoveMoji Creator** (/character-stage/). "Welcome To The LoveMoji® Creator" → "Create Giver" modal asks for:
  - Name.
  - Age: Adult or Child.
  - Template: Feminine, Neutral or Masculine.
  - — [character-stage](https://lovebookonline.com/character-stage/)
- **LoveMoji builder.** A full-screen avatar editor with 24 part/color categories: Face Shape (9 options), Skin Tone, Hairstyle, Hair Color, Hair Highlights, Hair Ombré, Eye Shape, Eye Color, Nose, Beard, Goatee, Mustache, Facial Features, Tops, Top Primary Color, Bottoms, Bottom Primary Color, Shoes, three Shoe colors, Eyewear, Body Type, Hats. Saving shows a full-body confirmation screen. — [character-stage](https://lovebookonline.com/character-stage/) (observed)
- The receiver is created the same way. The book gets an ID before any account exists (URL `?bookid=…`), so the flow is guest-first. — [character-stage](https://lovebookonline.com/character-stage/) (observed)
- **Step 2, email gate.** "Save & Continue" opens a "Save Your Progress" modal:
  - Copy: "Enter your email and we'll save your book so you can come back anytime. We'll also email you a 15% OFF welcome code."
  - Options: Apple, Google or Facebook sign-in, or a small "Keep going without saving" link.
  - — (observed on [character-stage](https://lovebookonline.com/character-stage/))
- **Step 3, cover select.** A "Cover Select" modal ("We'll help you find the best cover, but first tell us more about Sam") asks two things:
  - **Occasion Type** (19 options): Our Story, Anniversary, First Anniversary, Just Because, Birthday, Sweetest Day, Proposal, Wedding, Valentine's Day, Long Distance, Graduation, Thank You, Get Well, Apology, Christmas, Mothers Day, Fathers Day, Hanukkah, XXX.
  - **Relationship Type**: Spouse Romantic, Friend Romantic, Adult to Parent, Friend Non-romantic, Relative, Romantic XXX.
  - — (observed on /select-cover/)
- **Cover grid.** Shows a "Popular" set plus "See All Covers". Every cover is rendered live with the user's own two avatars (e.g. "Happy Anniversary – Why Life's Just Better in Two-Player Mode").
  - The cover editor offers Undo/Redo, Swap Characters, Flip, Layer Up/Down, Duplicate and editing of the title text.
  - — (observed on /select-cover/)
- **Step 4, guided questionnaire** (a progress bar runs from START to FINISH; this is the anniversary/spouse path):
  1. "When is your anniversary?" (year dropdown).
  2. "Choose your three favorite physical features about Sam" (16 checkboxes, e.g. Smile, Eyes, Scent, Dimples, Butt, Tongue, Everything).
  3. "Choose four of your favorite qualities about Sam" (15, e.g. Great Cook, Good with Money, Tech Savvy, Loves Animals).
  4. "Choose four activities you and Sam like to do together" (15, e.g. Watching Movies, Stargazing, Playing Video Games).
  5. "Write a dedication… or use one of our pre-written suggestions." A dropdown offers 10 templates (Light of my life, Perfect Fit, All the reasons, I love you more, You are my soulmate…). The textarea is pre-filled with a templated dedication using both names; max 500 characters.
  - — (observed on [/my-book/](https://lovebookonline.com/my-book/))
- **Result.** A "Your Product Is Ready!" modal, then the My Book page: "You have 47 Pages", with Add Pages, Arrange and Preview controls, a page-spread grid and a Checkout button. — (observed)
- **Add Pages library** (/select-pages/). It has a category dropdown and search. Categories: Top Pages, Intros and Endings, Personality Traits, Physical Attributes, Together Time, Activities, Qualities, Sports & Fitness, Entertainment, Intimate, Vacation, Milestones, Symbols of Love, Friends, Mother's Day, Father's Day, Blank & Full Text Pages, Long Distance, Challenging Times, Kids, Holiday, XXX, Premium Color. That is 23 categories, matching LoveBook's claim of "2,714 illustrated pages… across 23 categories". — (observed); [Compare vs Wonderbly](https://lovebookonline.com/compare/lovebook-vs-wonderbly/)
- **Page editing.** LoveBook says users can "Rewrite any text, change fonts, move objects, swap characters and poses, change backgrounds, reorder pages and pick a cover from a catalog of 258 designs". The FAQ cites 26 fonts and unlimited text colors. — [Compare vs Wonderbly](https://lovebookonline.com/compare/lovebook-vs-wonderbly/); [FAQ](https://lovebookonline.com/faq/)
- **Use of the questionnaire.** "94% of recent LoveBooks were built with our questionnaire." — [Compare vs Wonderbly](https://lovebookonline.com/compare/lovebook-vs-wonderbly/)
- **Step 5, checkout path** (observed):
  1. Clicking Checkout opens a mandatory "Book Preview" flip-through (Cover / 47).
  2. "Purchase Options" modal: Soft Cover Print, Hard Cover Print (pre-selected) and Deluxe Print Bundle (badge "SAVE MORE! – Over $120 VALUE").
  3. "Book Upgrades" modal: Matte Finish, Digital LoveBook, Gift Box & Bag Kit.
  4. "Add To Cart".
- **Cart** (/my-cart) shows:
  - A "YOUR PROGRESS IS NOT SAVED YET" email nag.
  - The line item "LoveBook – 47 Pages | Hard Cover $54.99 + Hard Cover Upgrade $15.00".
  - A "Don't forget the card" cross-sell: 10 greeting cards at $8.99 each, "printed with the same characters as your book".
  - A membership upsell: "Unlimited Digital Books & Up To 50% On All Future Purchases. Join".
  - An "Add-On Gift Ideas" carousel.
  - A "Checkout with Credit Card" button.
  - I stopped here. — (observed)
- **Approval rules at checkout.** "At check-out, you will be required to approve printing… We do not review, proofread, or spell check orders." — [FAQ](https://lovebookonline.com/faq/)
- **Urgency and discount tactics** (observed):
  - A sitewide promo-code banner.
  - On Pricing & Shipping, an "ORDER WITHIN THE NEXT 15H 7M" countdown.
  - A Super Rush option labeled "(ONLY 38 REMAINING)".
  - Strike-through list prices in the purchase modals.
  - A 15% welcome code offered for email capture.
  - — [Pricing & Shipping](https://lovebookonline.com/pricing-shipping/)
- **Comparison marketing.** Public "LoveBook vs" pages exist for Wonderbly, Hooray Heroes, myComics.ai and Mixbook. Each is dated ("as described on their public website on November 1, 2026, and we will re-check them by February 1, 2027"). The app bundle also contains routes for lovebook-vs-chapter-for-us and lovebook-vs-lovetales, which are not linked from the hub. — [Compare hub](https://lovebookonline.com/compare/); app bundle (assets.lovebookonline.com/assets/app-*.js)

### Inferences
- The funnel defers commitment (no account, no email required) and makes a "finished" 47-page book within minutes. This reduces the blank-page problem: the questionnaire picks pre-written illustrated pages, so most buyers never write reasons themselves.
- Most cross-sell and personalization value comes from reusing the avatar assets across products (covers, greeting cards, activity books).

### Gaps
- I did not open the per-page editor, so I cannot document its exact UI. The editing claims come from LoveBook's comparison page.
- I did not observe the shipping, billing or payment steps (deliberately).
- Questionnaire questions probably differ by occasion and relationship. I tested only Anniversary + Spouse Romantic.

## 2. Product: book types, format, illustration, extras

### Takeaway
LoveBook has one core product: a small A5-ish (8.5" x 5.5") illustrated "reasons why I love you" book of 40–200 pages at one flat price. It is built from a library of about 2,714 pre-drawn cartoon pages featuring user-built LoveMoji avatars, in softcover or hardcover, with digital PDF/EPUB/web-link versions. Around it sit cheaper accessories (cards, coupon books, activity books, wrapping paper, journals) and a fixed-story Kids line.

### Cited Findings
**Core book**
- Size: "approximately 8.5 inches tall by 5.5 inches wide (Standard A5 European size)". — [FAQ](https://lovebookonline.com/faq/)
- Pages: "We charge a single flat price for all books, regardless of page count. Each book must have at least 40 pages… with a maximum of 200 pages." New books print on both sides of the spread. — [FAQ](https://lovebookonline.com/faq/)
- Covers: "over 100 themes", professionally bound and laminated, glossy cover. A catalog of 258 cover designs is claimed elsewhere. — [How This Works](https://lovebookonline.com/how-this-works/); [Compare vs Wonderbly](https://lovebookonline.com/compare/lovebook-vs-wonderbly/)
- Finish: Glossy or Matte. Matte is an upgrade. — [Pricing & Shipping](https://lovebookonline.com/pricing-shipping/); (observed upgrades modal)
- Photos: none. "At this time we do not offer a photo upload option as we are unable to control the print quality of foreign images… We also do not offer the ability to upload bitmojis." Customers add blank pages and paste photos in later. — [FAQ](https://lovebookonline.com/faq/)
- Characters:
  - Proprietary "LoveMoji®" avatars, which replaced older black-and-white stick figures; old stick-figure books are no longer orderable.
  - The builder claims "10,985,738,400 (face and body)" combinations.
  - Up to 6 people per book: one adult plus up to five child LoveMojis as givers.
  - — [FAQ](https://lovebookonline.com/faq/); [Compare vs Hooray Heroes](https://lovebookonline.com/compare/lovebook-vs-hooray-heroes/)
- Languages: any left-to-right language in Latin, Extended Latin or Cyrillic script. RTL is not supported. — [FAQ](https://lovebookonline.com/faq/)
- Pre-titled SKUs: "10/50/100 Reasons I Love You" and "Best Dad In The World" are sold as $54.99 product pages but feed into the same builder. The 100 Reasons product lists "Format: Hard Cover, Dimensions 8.5 x 5.5". — [100 Reasons product](https://lovebookonline.com/shop/lovebook/personalized-love-book-100-reasons-i-love-you)
- Occasions and collections include romantic, family, friendship, apology, get-well, military, LGBTQ and an adult "After Dark/XXX" collection. — [Homepage](https://lovebookonline.com/); (observed occasion dropdown)

**Digital**
- Formats: PDF, EPUB, or a private web link (invite-only or anyone-with-link). — [FAQ](https://lovebookonline.com/faq/)

**Other products**
- Catalog counts: 143 gifts in total. LoveBooks 55, Greeting Cards 62, LoveBook Kids 3, LoveCoups Romantic 2, LoveCoups Family 8, Activity Books 5, Journals 3, Wrapping Paper 5. Two items are tagged 18+. — [Shop](https://lovebookonline.com/shop/all?type=lovebook)
- LoveBook Kids: 25 leaves printed on both sides (50 printed pages), 11" x 8.5". Only one child. Users can add the child avatar and a dedication but cannot edit pages. — [FAQ](https://lovebookonline.com/faq/)
- Gift packaging: "Gift Box & Bag Kit: Gift box with beautiful matte finish + gift bag with tissue paper". Shipping is in "discreet packaging" with return address "LB, LLC" and no pricing included. — (observed upgrades modal); [FAQ](https://lovebookonline.com/faq/)

### Inferences
- Illustration style: flat vector cartoon with thick outlines and big heads. It is "cute-comic", not painterly like Wonderbly (observed screenshots).
- The book is small and page-count-heavy (40–200). That fits the "list of reasons" concept, one reason per page, rather than a narrative storybook.

### Gaps
- Paper stock and weight, and the printer/binding spec: not published.
- LoveBook Kids prices: not captured.

## 3. Pricing

### Takeaway
The list prices are $54.99 softcover and $69.99 hardcover, for any page count from 40 to 200. Prices are permanently framed by promos (15% sitewide codes) and by a $19.95/yr auto-renewing membership that halves printed-book prices. A deluxe bundle anchors at $110. US shipping runs $10.95–$30.95 depending on speed. All transactions are in USD.

### Cited Findings
**Book prices**
- Paperback Color: $54.99 base, "Promo Code Price $46.74". Hardcover Color: $69.99 base, $59.49 promo. Both "Up to 200 Pages with NO Extra Costs; Glossy or Matte Finish". — [Pricing & Shipping](https://lovebookonline.com/pricing-shipping/)
- The cart prices hardcover as "LoveBook $54.99 + Hard Cover Upgrade $15.00 = $69.99". — (observed /my-cart)
- Purchase Options modal (with code):

| Option | List price | With code | Includes |
|---|---|---|---|
| Soft Cover | $54.99 | $46.74 | |
| Hard Cover | $69.99 | $59.49 | |
| Deluxe Print Bundle | $110.00 | $93.50 | Hard cover, Matte Finish Cover, Instant Digital Download, Gift Box & Bag Combo, FREE Activity Book Gift |

  — (observed)

**Upgrades** (list → promo, as displayed)
- Matte Finish: $4.95 → $4.21.
- Digital LoveBook ("Instant printable PDF + private dedicated webpage"): $9.95 → $4.21. This display looks inconsistent with a 15% discount; it may be a bundle price.
- Gift Box & Bag Kit: $23.49 → $19.97.
- — (observed upgrades modal)
- **Standalone digital book value.** The cancellation policy says LoveBook will "retain $29.71 USD as the value of the digital book". — [FAQ](https://lovebookonline.com/faq/)

**Accessories**
- Greeting cards: $8.99.
- Activity books ("The Big Activity Book For Couples", "Let's Get Naked", "The Quiz Book For Couples"): $12.99.
- LoveCoups coupon books: $11.95.
- Personalized wrapping paper: $25.95.
- — [Shop](https://lovebookonline.com/shop/all?type=lovebook)

**Membership (LoveBook+)**
- Price: $19.95/year. It auto-renews, must be paid by credit or debit card (no PayPal or Apple Pay), and members cannot stack promo codes. — [FAQ](https://lovebookonline.com/faq/); [Membership](https://lovebookonline.com/membership/)
- Benefits: "50% off all printed LoveBooks, unlimited free digital books, and additional discounts on… personalized activity books and gift boxes". — [FAQ](https://lovebookonline.com/faq/)
- Before April 10, 2023, memberships also included one free print book per year. — [ToS](https://lovebookonline.com/tos-privacy/)

**Promotions**
- Promo codes appear "periodically… at the top of any main page". Only one discount applies per order, and discounts do not apply to shipping or taxes. Current code: EAXMAS26 (15%). — [FAQ](https://lovebookonline.com/faq/); [Homepage](https://lovebookonline.com/)
- The email-capture modal offers a 15% welcome code. — (observed)
- The app bundle contains an A/B-test flag named "auth/split/bundle-price-110" and "bundle_price_arm" events. — app bundle (assets.lovebookonline.com/assets/app-*.js)

**Shipping** (live calculator, queried 2026-11-16 for orders that day)

| Destination | Option | Price | Estimated arrival |
|---|---|---|---|
| US | Cards Only (no tracking) | $4.95 | Nov 23 |
| US | Standard | $10.95 | Nov 27–30 |
| US | Express | $15.95 | Nov 25 |
| US | Premium | $20.95 | Nov 24 |
| US | Super Rush ("Priority printing + premium shipping", "ONLY 38 REMAINING") | $30.95 | Nov 23 |
| UK | Standard | $10.95 | Nov 26–27 |
| UK | Premium | $15.95 | Nov 24 |
| Australia | Premium | $13.95 | Nov 25 |
| Germany | Premium | $10.95 | Nov 25 |
| Canada | Cards Only | $5.95 | |
| Canada | Standard | $11.95 | Nov 26–27 |
| Canada | Express | $14.95 | Nov 25 |

  — [Pricing & Shipping](https://lovebookonline.com/pricing-shipping/) (observed)
- Orders placed after 5PM EST slip a day. — [Shipping calendar](https://lovebookonline.com/shipping-calendar/)
- "You only pay to ship the first item — everything else sent to the same address is shipped FREE." — [FAQ](https://lovebookonline.com/faq/)
- Currency: "All transactions will be conducted in USD; any currency conversion information is provided for convenience only." The UI has a currency selector modal. — [FAQ](https://lovebookonline.com/faq/)

**Fees and refunds**
- Cancellation fee: $10 for cancellable print orders.
- No returns. Print defects are reprinted free if reported within 90 days, according to the FAQ. The product page says 30 days instead (a conflict).
- — [FAQ](https://lovebookonline.com/faq/); contradicted by [100 Reasons product](https://lovebookonline.com/shop/lovebook/personalized-love-book-100-reasons-i-love-you)

### Inferences
- With a member's 50% discount, a hardcover would cost about $35, so a member buying even one book saves more than the $19.95 fee. The membership works as a gated discount plus a recurring-revenue and retention device.
- The "list price" ($54.99/$69.99) appears to be seldom paid, because a 15% code is almost always displayed.

### Gaps
- Exact member-price checkout totals.
- Tax handling.
- Express prices for non-US countries beyond those sampled.

## 4. AI and technology

### Takeaway
LoveBook does **not** use generative AI in the product. Books are assembled from a fixed library of hand-drawn page templates, with avatar parts layered in (templated illustration layering), driven by a rule-based multiple-choice questionnaire and pre-written dedications. The company now positions itself explicitly *against* AI-generated competitors.

### Cited Findings
- No mention of AI on the homepage, About, FAQ, or ToS. The ToS describes "a proprietary authoring system… to choose and assemble text and graphics", combining "proprietary images, LoveMojis®, formatting, fonts, drawings, page layouts". — [ToS](https://lovebookonline.com/tos-privacy/); [About](https://lovebookonline.com/about-us/)
- The myComics.ai comparison page frames AI as the contrast: "myComics.ai generates a comic for you with AI. LoveBook puts you in charge". It also stresses "No photos needed / Keep the surprise". — [Compare vs myComics.ai](https://lovebookonline.com/compare/lovebook-vs-mycomics/)
- Questionnaire automation: "Answer a short guided questionnaire… LoveBook lays out the pages for you", and 94% of recent books are built this way. In my test, 5 questions produced 47 pages. — [Compare vs Mixbook](https://lovebookonline.com/compare/lovebook-vs-mixbook/); (observed)
- Covers and pages are composed client-side. Cover thumbnails rendered as blob images carrying the user's avatars, and there is a "lovebookcanvas-assets.lovebookonline.com" asset host. — (observed DOM); [Homepage scripts](https://lovebookonline.com/)
- Front end:
  - A Vue server-side-rendered single-page app (`data-server-rendered`, `*.vue_vue_type*` chunks) built with Vite-style hashed assets on assets.lovebookonline.com.
  - Routes include character-stage, select-cover, select-pages, my-book, upgrades, my-cart, checkout/shipping, shipping-method and billing.
  - Login via Apple, Google, Facebook and passkeys.
  - English and Spanish locale bundles.
  - — app bundle (assets.lovebookonline.com/assets/app-*.js)
- ToS IP clause: "Users agree to assign ownership to LoveBook of any portion of the Content they have generated using the Services". LoveBook may reuse user content in "illustrations, graphic elements, text suggestions, marketing materials" (personal info excluded). — [ToS](https://lovebookonline.com/tos-privacy/)

### Inferences
- The ToS content-assignment clause may let LoveBook mine user-written text for future "text suggestions". This is speculative; there is no evidence that it is used for AI training.
- Using no photos and no AI is a deliberate differentiator: no privacy concerns about uploading a partner's face, and the gift stays a surprise.

### Gaps
- No public statement or interview about AI plans was found.

## 5. Business: ownership, scale, operations, marketing

### Takeaway
LoveBook LLC is a privately held, apparently bootstrapped Michigan company, founded around 2007–2008 by four friends (Rob Patterson, Chris Sonjeow, John Baranowski, Kevin Zalewski). It started in the Ann Arbor area and is now in downtown Rochester, MI. It claims 2.8–3M+ customers or books and has about 87K Trustpilot reviews. It prints through a distributed print-on-demand network (US plus local partners in CA, UK, AU, DE, IN), and markets through paid social and search, CJ/Awin affiliates, and a tiered creator program, with heavy seasonal promotion.

### Cited Findings
**Founding and ownership**
- "In 2007, four friends and colleagues set out to create the most meaningful gift…". Founders are named by first name: Rob, Chris, John, Kevin. — [About](https://lovebookonline.com/about-us/)
- Careers page: the product started as "a humble notepad filled with doodles… from one man to his wife". The team works in "Downtown Rochester". — [Careers](https://lovebookonline.com/careers/)
- Full founder names, Kevin Zalewski as CTO and co-founder, and the 11–50 employee / under $5M revenue estimates come from search-result snippets citing ZoomInfo, Crunchbase and Hour Detroit. These are aggregator estimates, unverified (the Hour Detroit page returned 403 to me). — [ZoomInfo](https://www.zoominfo.com/c/lovebook/347451209); [Hour Detroit](https://www.hourdetroit.com/community/growing-together/)
- The same Hour Detroit snippet says LoveBook "sold its one millionth product over the 2017 holiday season". Unverified. — [Hour Detroit](https://www.hourdetroit.com/community/growing-together/)
- A 2009 article, "Love Book turns gift for wife into Ann Arbor start-up" (May 27, 2009), quotes Rob Patterson. It says the company was created "last year" (about 2008) and the site had been live "a few weeks". This partly contradicts the 2007 founding date. — [Concentrate Media](https://concentratemedia.com/concentrate/innovationnews/lovebookonlineannarbor0058.aspx)
- Legal entity: "LoveBook LLC, a Michigan Limited Liability Company doing business as LoveBook Online® or LoveCoups®". Michigan law governs disputes, with mediation first. — [ToS](https://lovebookonline.com/tos-privacy/)
- Address: 321 East 2nd St., 3rd Floor, Rochester MI 48307. — [FAQ footer](https://lovebookonline.com/faq/); [Trustpilot](https://www.trustpilot.com/review/www.lovebookonline.com)
- No evidence of acquisition or outside funding was found.
  - A CB Insights search snippet listed Penguin Random House, Graphite Capital and Asi Sharabi. Those are Wonderbly's investors and CEO, so this is likely a data mix-up; disregard. — [CB Insights](https://www.cbinsights.com/company/lovebook)

**Scale (self-reported figures conflict)**
- "Over 2.8 Million Happy Customers", "160+ countries". — [Homepage](https://lovebookonline.com/)
- "Over 3 million books… customers in over 100 countries". — [Affiliate](https://lovebookonline.com/affiliate/)
- "Prints and ships to 239 countries and territories". The shipping country dropdown has 239 entries. — [Compare vs myComics.ai](https://lovebookonline.com/compare/lovebook-vs-mycomics/); (observed)
- Trustpilot:
  - TrustScore 4.6, with 86,917 reviews (88% 5-star, 2% 1-star). Only 217 reviews came in the last 12 months.
  - The profile was claimed Nov 2017, and LoveBook invites reviews.
  - It replies to 18% of negative reviews, typically after more than a month.
  - — [Trustpilot](https://www.trustpilot.com/review/www.lovebookonline.com)
- Reviews.io: "4.8 from 10,000+ verified reviews". — [Homepage](https://lovebookonline.com/)
- Recent complaint themes on Trustpilot (2026): late or non-delivery around Valentine's Day, print errors (duplicate pages), slow support, "too expensive for its size", and no photo upload. Praise focuses on personalization, quality and ease. — [Trustpilot](https://www.trustpilot.com/review/www.lovebookonline.com)

**Production and fulfillment**
- "Printed by our professional printing partners". Partners in "Canada, UK, Australia, Germany, and India" print and ship domestically there. — [How This Works](https://lovebookonline.com/how-this-works/); [FAQ](https://lovebookonline.com/faq/)
- Personal data is shared with "print manufacturers… printing, shipping, shipment tracking" providers. — [ToS](https://lovebookonline.com/tos-privacy/)
- US military (APO/FPO) and prison shipping are supported; prisons require USPS and softcover only. — [FAQ](https://lovebookonline.com/faq/)
- US standard delivery is about 9–12 days from order. Super Rush gets there in about 7 days (Nov 16 → Nov 23). — [Pricing & Shipping](https://lovebookonline.com/pricing-shipping/) (observed)

**Marketing channels**
- Ad and tracking scripts on the homepage: Meta (connect.facebook.net), TikTok (analytics.tiktok.com), Google Ads/GTM/DoubleClick, AppLovin/Axon (s.axon.ai, res4.applovin.com), Awin (dwin1.com), Reviews.io, Cloudflare Insights, plus a script from bzrcdn.openai.com. — [Homepage](https://lovebookonline.com/) (observed script hosts)
- Affiliate program via Commission Junction: commission "starting at 10%", 30-day cookie. — [Affiliate](https://lovebookonline.com/affiliate/)
- Content Creator program via CJ. Commission tiers:

| Followers | Commission | Free books |
|---|---|---|
| 5k–50k | 20% | 1 |
| 50k–250k | 25% | 2 |
| 250k–1M | 28% | 3 |
| 1M+ | 30% | custom |

  - Suggested content: unboxings, reaction videos, and seasonal pushes (Valentine's, Mother's Day, Father's Day, Christmas).
  - — [Creators](https://lovebookonline.com/creators/)
- Seasonal and SEO landing pages exist for each holiday, including Sweetest Day and a UK "Mum's Day". Comparison pages target competitor-brand searches. — [Homepage](https://lovebookonline.com/); [Compare](https://lovebookonline.com/compare/)

### Inferences
- Only 217 Trustpilot reviews in the last 12 months, against 86.9K in total. That suggests either much lower current volume than at the peak, or that LoveBook shifted review invitations to Reviews.io. I cannot tell which.
- The AppLovin/Axon pixel indicates performance advertising beyond Meta and Google, probably app-network or CTV-style retargeting. The openai.com-hosted script may be a ChatGPT ads conversion pixel; its purpose is unverified.
- Book IDs around 65.7M (seen in the guest URL) probably count all started projects, not orders, so they are not a usable volume metric.

### Gaps
- Revenue, order volume and headcount from primary sources.
- Meta and TikTok Ad Library creatives: not accessed (they need login or interactive search).
- Social follower counts.
- The named print partners.

## 6. Design: brand, tone, mobile

### Takeaway
The brand is warm and casual: deep red (#B61F24) on white, Montserrat throughout, a heart-book logo, cartoon avatars, and photographic lifestyle mockups in the hero. The copy is sentimental with a cheeky streak ("Nice Butt" cards, an "After Dark/XXX" collection, a self-description as "creative weirdos"). The site is fully responsive, and the editor works on mobile.

### Cited Findings
- Primary CTA color rgb(182,31,36) (#B61F24, a crimson red) with white. The body and headings use Montserrat. The seasonal promo bar was green (Christmas). — [Homepage](https://lovebookonline.com/) (observed computed styles)
- Logo: a red open-book/heart mark plus the "LoveBook" wordmark. The hero is a carousel of photo-realistic book mockups (e.g. a pink "50 Reasons Why" cover with cartoon couple). — (observed screenshots)
- Tone examples:
  - "It's Your Love. Show them exactly why you love them."
  - "Those little reasons why are the foundation to every relationship."
  - The careers page: "four dudes to a whole team of creative weirdos".
  - Products: "Let's Get Naked: The Sexy Activity Book For Couples".
  - — [Homepage](https://lovebookonline.com/); [How This Works](https://lovebookonline.com/how-this-works/); [Careers](https://lovebookonline.com/careers/); [Shop](https://lovebookonline.com/shop/all?type=lovebook)
- Mobile: at a 375px viewport the page has no horizontal overflow. The mobile header has a hamburger menu, centered logo and cart, a full-width promo bar, a hero carousel with a white CTA, and a stacked trust-stat block. — (observed, mobile emulation)
- FAQ: "you can edit your LoveBook via any mobile device". It also says the page editor's Save/Cancel issue "is only available for Desktop books" (contradictory phrasing). — [FAQ](https://lovebookonline.com/faq/)

### Inferences
- The builder UI is functional rather than premium: modal-heavy, with dropdowns and checkbox grids. Its polish lags behind Wonderbly-style storybook sites.

### Gaps
- I did not test the full builder on mobile.
- The cover and page editors on small screens were not evaluated.
