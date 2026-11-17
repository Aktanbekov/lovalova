# Weeloom Tales (weeloomtales.com): business and product profile

Researched 16 Nov 2026. Sources: the live site (WebFetch plus a built-in browser walk through the creation flow up to the account and photo-upload gates; no photo uploaded, no account created, nothing paid), the legal pages, DNS and WHOIS lookups, and web searches.

**Headline finding:** Weeloom Tales is **not a children's book company**. Today it is an AI-native, adults-only **couples love-story book** product ("Personalized Love Story Book & Anniversary Gift"). It is very new: the domain was registered 20 Jul 2026, the Terms date from 1 Oct 2026, and the Privacy Policy was updated 15 Nov 2026. Search-index remnants suggest it began as, or also tested, a **personalized weekly bedtime-stories-for-kids** product before pivoting. Its closest comparator in the set is Lovebook (couples), not Wonderbly or Hooray Heroes (kids).

## 1. Site structure and customer funnel

### Takeaway
The site is a single-page marketing homepage feeding an 8-step wizard: Look → You two → Photos → Chapters → Questions → Portraits → Payment → Write. The first three or four steps work without an account. An email and password account is forced before the guided questions. A free preview (the couple's drawn portraits and most of chapter 1) comes before payment, and the book is generated in 2–4 hours after the 15–30 minute questionnaire. Persuasion is light: struck-through "was" prices, an email capture offering 15% off, and no reviews or testimonials anywhere.

### Cited Findings
**Homepage and navigation**
- Header navigation: How it works, Occasions, Pricing, FAQ, Sign in, and a "Start your book" CTA. — [Homepage](https://www.weeloomtales.com/)
- Hero: "Your story, drawn the way you lived it." H1 / eyebrow label: "A personalized love story book". Subhead: "The anniversary gift only you could give." Below it are book-type chips (Our Love Story, Reasons I Love You, Our Year, The Proposal) and the bullets "No writing skills needed." and "You review and approve every page." (seen in the browser, mobile and desktop) — [Homepage](https://www.weeloomtales.com/)
- Homepage sections in order: hero → "Made from your photos" (3 art styles) → "How it works" (3 steps) → email signup (15% off first book, code valid 30 days) → Occasions (six-month, anniversary, wedding, with suggested chapters) → "A look inside" interactive sample book → Pricing teaser → FAQ (10 Qs) → closing CTA → footer. — [Homepage](https://www.weeloomtales.com/)
- The pricing teaser on the homepage rendered the literal string "Books starting from {startPrice}", an unfilled template variable (a live bug at the time of fetch). — [Homepage](https://www.weeloomtales.com/)
- Sample book "It's the Unicorn, Obviously" (Our Love Story · Brian & Jessica): 11 pages in an open-book spread viewer with a "Listen to the whole book" audio button. Chapter chips read How we met / The first trip / The proposal / The wedding. — [Homepage](https://www.weeloomtales.com/)
- Footer: Facebook, Instagram and TikTok (@weeloomtales); 7 blog categories; Terms, Privacy, Refund Policy, Contact; "Your Privacy Choices"; Cookie settings. — [Homepage](https://www.weeloomtales.com/)
- A cookie banner offers "Accept all / Reject all / Preferences". — observed in the browser on [/start/our_love_story](https://www.weeloomtales.com/start/our_love_story)

**Funnel (walked in the browser with dummy names "Alex" and "Sam")**
- /start: "What kind of book are you making?… You can start without an account, and we'll save your answers as you go." The 4 book types are described there (see section 2). — [/start](https://www.weeloomtales.com/start)
- Step 1 "Look" (8-step progress bar: Look, You two, Photos, Chapters, Questions, Portraits, Payment, Write). The user picks an art style (2D Comic Cartoon / 3D Cartoon / Anime) and a format: "Digital, with narration" (read on any screen, audio read-aloud, keep as PDF) or "Digital + printed copy" (adds a printed softcover). — [/start/our_love_story](https://www.weeloomtales.com/start/our_love_story)
- After step 1, the book gets a UUID URL (/book/{uuid}/you). Step 2 "Tell us about the two of you" asks:
  - your first name and partner's first name (required: "We need this to title your book")
  - pronouns for each (she/her, he/him, they/them; required)
  - optional birthdays (month and day only)
  - relationship status (Dating / Engaged / Married)
  - "What's the book for?", a 9-way occasion picker: Anniversary, Wedding, Engagement, Six months, Proposal ("Nothing is ever sent to your partner"), Valentine's Day, Birthday, The holidays, Just because
  - For Anniversary, a follow-up asks "Which anniversary is this?", which goes on the first page, e.g. "Happy 5th anniversary, Sam."
  - Reassurance under the CTA: "Nothing to pay yet. You'll see the two of you drawn before you decide." plus an "Email me a link to my book" save link. — browser walk, weeloomtales.com/book/{uuid}/you
- Step 3 "Photos of the two of you" asks for one **full-length** photo of each person: "we draw them exactly as they appear, outfit and shoes included". It accepts a couples photo ("you'll pick who's who"), JPEG or PNG, up to 50 MB, at least 800 px tall. Privacy line: "Your photos stay private. We delete your originals once you approve your book." (I did not upload anything.) — browser walk, /book/{uuid}/photos
- Step 4 "Choose your chapters" (reachable by URL without uploading) shows 24 pre-selected "Suggested for this book" chapters plus 6 more to add, each with a one-line prompt. The plan is auto-fitted to the chapter count: "Signature Edition: 10 chapters included, up to 40 with extras at $4 each · $55". The full chapter list is in section 2. — browser walk, /book/{uuid}/chapters
- Step 5 "Questions" is **gated behind account creation**: "Save your book. Create an account so your book, your portraits and your chapters are safe…" The form asks for email and password (at least 8 characters) and has a marketing opt-in checkbox. I stopped here. — browser walk, /book/{uuid}/save?next=questions
- Before an account exists, a draft is stored only in the browser it was started in. The error page says: "Started it from Instagram or Facebook? It's in that app's browser. Open the app, tap the ad or link again…" — browser walk, /book/{uuid}/payment (404 page)
- Timing (FAQ): "About 15–30 minutes to answer the questions"; the book is "ready for review within 2–4 hours". — [Homepage FAQ](https://www.weeloomtales.com/#faq)
- Preview before paying (FAQ): "You can preview your drawings and most of the first chapter. The last page is revealed after you purchase." The refund policy also says you can see "your cover and most of chapter one before paying". — [Homepage FAQ](https://www.weeloomtales.com/#faq); [Refund policy](https://www.weeloomtales.com/pages/refund-policy)
- Editing: "You can change any page before approving it". Each plan includes "40 changes". Pricing page: "Not right? We'll redraw or rewrite it." — [Pricing](https://www.weeloomtales.com/pricing)
- Checkout is Stripe, "Pay once", "No subscription, nothing to cancel". — [Pricing](https://www.weeloomtales.com/pricing). A Stripe domain-verification TXT record is present on weeloomtales.com (DNS lookup, 16 Nov 2026).

**Urgency, discounts, social proof**
- Every price is shown against a struck-through anchor price ($25 vs $35; $55 vs $80; extra chapters $3 vs $5 and $4 vs $6). — [Pricing](https://www.weeloomtales.com/pricing)
- Email capture: 15% off the first book, valid 30 days. — [Homepage](https://www.weeloomtales.com/); [Pricing](https://www.weeloomtales.com/pricing)
- No countdown timers or scarcity claims were seen. — [Homepage](https://www.weeloomtales.com/)
- **No reviews, star ratings, testimonials, press logos or customer counts** appear on the homepage or pricing page. — [Homepage](https://www.weeloomtales.com/); [Pricing](https://www.weeloomtales.com/pricing)
- Occasion-aware delivery: occasions are "timed for the day", and "A digital book can arrive any day you choose". — browser walk step 2; [Pricing](https://www.weeloomtales.com/pricing)

### Inferences
- The funnel is built for paid-social traffic. The explicit Instagram/Facebook in-app-browser recovery message, plus Meta/TikTok domain-verification records and Meta/TikTok/Google/Microsoft ad partners named in the privacy policy, all point to paid social as the primary acquisition channel.
- The design defers commitment: no account until after style, names, occasion, photos and chapters are chosen; a free AI preview before payment; generation after payment ("Write" is step 8, after "Payment"). This implies the AI portraits are generated before payment, at the company's cost, and the full text and illustrations after payment.
- The account wall is placed before the long questionnaire. That captures the email for abandonment remarketing before the highest-effort step.

### Gaps
- I did not observe the Portraits preview, the Payment screen, upsells at checkout, shipping-address and shipping-cost screens, or the reader UI. All are behind the account wall or photo upload, which I was instructed not to cross.
- I could not determine whether there is an order-bump or hardcover price at checkout.

## 2. Product: book types, story creation, illustration, format

### Takeaway
The product is a fully AI-generated, illustrated, **narrated** relationship book written in the giver's first-person voice to their partner. There are 4 templates (Our Love Story, Reasons I Love You, Our Year, The Proposal), 9 occasions, and a library of about 30 chapter types. The giver answers guided per-chapter questions. AI writes the prose, draws both partners from one full-length photo each in 1 of 3 styles, and voices an audio narration. Print is an 8×8 in softcover (hardcover upgrade) on the top tier only.

### Cited Findings
- Book types: **Our Love Story** ("from the day you met to today, told by you to them"); **Reasons I Love You** ("each one shown through a moment you shared"); **Our Year** ("the last twelve months… A new volume every year"); **The Proposal** ("ending on the page that asks the question"). — [/start](https://www.weeloomtales.com/start)
- Audience is adults and couples only. The Terms say books are "written for adults" and users must be 18 or older. No kids, pet or family book products are offered at present. — [Terms](https://www.weeloomtales.com/pages/terms)
- Occasions (9): Anniversary, Wedding, Engagement, Six months, Proposal, Valentine's Day, Birthday, The holidays, Just because. — browser walk, /book/{uuid}/you
- Chapter library for Our Love Story / Anniversary / Married. **24 suggested:** How we met; Our first date; Our first kiss; When I knew; The first "I love you"; Family and friends; An adventure together; Our favorite place; Making a home; Our pets ("drawn from your description"); The proposal; Our wedding day; The celebration; Our family ("The children and people who fill your home, drawn from your description"); Moments along the way; How we celebrate; Our favorite meal; Our song; How you make me laugh; What I love about you; Being myself with you; How you look after me; The little things; What comes next. **6 more:** Where we started; Our firsts this year; Your smile; Proud of you; What you taught me; The question. — browser walk, /book/{uuid}/chapters
- Story creation is generative from the user's answers, not fill-in templates. FAQ: "You don't fill in any pages… Weeloom writes, illustrates, and narrates the book." Terms 9.4: stories, illustrations and audio are AI-produced from user input. — [Homepage FAQ](https://www.weeloomtales.com/#faq); [Terms](https://www.weeloomtales.com/pages/terms)
- The structure is a template scaffold (occasion → suggested chapters → per-chapter guided questions such as "What do you remember about that moment?") with free-form LLM prose. — [Homepage](https://www.weeloomtales.com/)
- Sample text style: literary first-person prose addressed to the partner ("you"), roughly 100–130 words per text page. Example opening: "Dev's birthday, a Tuesday, and our neighborhood bar was packed to the walls…". The first page reads "Happy 1st anniversary, Jessica". Layout is a full-bleed illustration on the left with a framed text panel on the right. — homepage sample book, viewed in the browser ([Homepage](https://www.weeloomtales.com/))
- Illustration styles: 2D Comic Cartoon, 3D Cartoon (Pixar-like in the sample), Anime. "Both of you, and every page, are drawn in the style you choose." — [/start/our_love_story](https://www.weeloomtales.com/start/our_love_story)
- Likeness: "Each of you is drawn from one photo, and your faces stay consistent throughout." The photo step asks for a full-length photo so outfits and shoes are reproduced. — [Homepage FAQ](https://www.weeloomtales.com/#faq); browser walk, photos step
- Signature Edition lets users attach their own real photos to chapters, "illustrated in your book's style" (pricing), or appearing "with that chapter's pages" (FAQ). — [Pricing](https://www.weeloomtales.com/pricing); [Homepage FAQ](https://www.weeloomtales.com/#faq)
- Length: First Edition has 5 chapters and Signature has 10; up to 40 chapters with paid extras. Reasons I Love You is 10 chapters on First and 20 on Signature. The sample book is 11 pages. — [Pricing](https://www.weeloomtales.com/pricing); browser chapters step; [Homepage](https://www.weeloomtales.com/)
- Formats: a digital book read online with narration, plus a downloadable PDF; print is an **8 × 8 in softcover**, with a hardcover upgrade (price not stated). — [Pricing](https://www.weeloomtales.com/pricing)
- Dedication: "Add your own message to the dedication page" (both tiers). — [Pricing](https://www.weeloomtales.com/pricing)

### Inferences
- With about 3–4 pages per chapter, as the sample suggests (11 pages for about 3–4 chapters), a 5-chapter First Edition is probably around 15–20 pages and a 10-chapter Signature around 30–40 pages. This is an estimate, not a stated figure.
- No paper stock, binding, or print-quality claims are made anywhere I checked. Print is a secondary add-on to a digital-first product.

### Gaps
- Page counts, paper or finish specs, and hardcover dimensions and price are not published.
- The narration voice (gender options, whether a voice clone is used) is not disclosed.
- I did not see the per-chapter question wording beyond the homepage example.

## 3. Pricing

### Takeaway
There are two one-time tiers in USD: **First Edition $25** (digital and PDF, narrated, 5 chapters) and **Signature Edition $55** (10 chapters, own photos, plus a printed 8×8 softcover with free shipping). Extra chapters cost $3 or $4. Both tiers show inflated "was" prices. Prices appear to have risen from earlier indexed figures of $19.89 and $49.89.

### Cited Findings
- **First Edition: $25** (struck-through $35). Includes the digital book plus PDF, 5 narrated chapters, a dedication message, and 40 changes. Extra chapters cost $3 (struck-through $5). No print, no own photos. — [Pricing](https://www.weeloomtales.com/pricing)
- **Signature Edition: $55** (struck-through $80). Includes 10 narrated chapters, your own photos, a dedication, 40 changes, and a printed 8×8 in softcover with **free shipping**. Extra chapters cost $4 (struck-through $6). A hardcover upgrade is offered but its price is not shown. — [Pricing](https://www.weeloomtales.com/pricing)
- In-flow pricing confirms "Signature Edition: 10 chapters included, up to 40 with extras at $4 each · $55" and "we'll put your book on the plan that fits, and you can change plans before you pay." — browser walk, chapters step
- A printed copy arrives "15–17 days after you approve your book". No shipping regions or costs are listed for other cases. — [Pricing](https://www.weeloomtales.com/pricing)
- Promotion: 15% off the first book via email signup (30-day code). — [Pricing](https://www.weeloomtales.com/pricing)
- Earlier pricing: a web-search index snippet of the pricing page showed First Edition at **$19.89** (5 chapters) and Signature Edition at **$49.89** (10 chapters, printed softcover, **free US shipping**). That snapshot is undated and superseded by the live $25/$55. — [Pricing (search-index snippet)](https://www.weeloomtales.com/pricing)

### Inferences
- The "free US shipping" wording in the older snippet suggests print fulfilment is US-only or US-focused. The live page dropped "US" but lists no other regions.
- The struck-through anchor prices ($35, $80) look like permanent "sale" framing, not a time-limited promotion, since no end date is shown.
- Max order value: Signature with 30 extra chapters is $55 + 30 × $4 = $175, plus an unknown hardcover upgrade (computed from the published prices).

### Gaps
- Hardcover upgrade price; non-US shipping availability and costs; tax handling; whether currencies other than USD are offered (only USD seen); whether a print-only add-on exists for First Edition.

## 4. AI and technology

### Takeaway
The product is explicitly and openly AI-generated: AI writes the text, makes the illustrations from photos, and produces the narration. The site discloses no model or vendor names. Privacy terms: photos are deleted within 45 days of approval, there is "no training" on submissions, and no facial-recognition templates are made. The stack is a Next.js app on Netlify behind Cloudflare DNS, with Stripe payments and Zoho Mail.

### Cited Findings
- FAQ: "An AI creates illustrations from your photos in your chosen style and keeps your faces consistent." — [Homepage FAQ](https://www.weeloomtales.com/#faq)
- Terms §9.4: stories, illustrations and audio are produced by AI. "AI may get names, dates, or other details about you, your partner, or your relationship wrong." Users must review before sharing. §9.5: entertainment only. — [Terms](https://www.weeloomtales.com/pages/terms)
- AI providers are referenced only generically ("AI providers that help generate Books", Terms §15.3). No model names (e.g. OpenAI, Gemini, Flux, ElevenLabs) are disclosed. — [Terms](https://www.weeloomtales.com/pages/terms); [Privacy](https://www.weeloomtales.com/pages/privacy)
- OpenAI is named in the privacy policy, but only in the list of **advertising/analytics/cookie partners** (alongside Google, Meta, TikTok, Microsoft Advertising, Google Ads), not as a content-generation vendor. — [Privacy](https://www.weeloomtales.com/pages/privacy)
- Photos are used "as a reference for your Book's illustrations". They are not used to identify anyone automatically or to build facial-recognition templates. — [Privacy](https://www.weeloomtales.com/pages/privacy)
- "We don't use what you submit to train or develop any AI model." — [Privacy](https://www.weeloomtales.com/pages/privacy)
- Retention:
  - Uploaded photos are deleted within 45 calendar days after the book is approved. The pricing and flow copy simplifies this to "Your photos are deleted after you approve your book."
  - Book content is kept at least 6 months after purchase, and deleted within 45 days of account closure or a deletion request (backups may persist briefly).
  — [Privacy](https://www.weeloomtales.com/pages/privacy); [Pricing](https://www.weeloomtales.com/pricing)
- Children: the service is for adults. It does not knowingly collect data from under-13s. Adults may mention their children in a book (e.g. the "Our family" chapter), and that information is used only for that book. Users must have permission from every real person they name or show, and must be the parent or guardian, or have their permission, for minors. — [Privacy](https://www.weeloomtales.com/pages/privacy); [Terms §7.3–7.4](https://www.weeloomtales.com/pages/terms)
- US-centric privacy coverage: California (CCPA-style rights, Shine the Light) and Nevada. **GDPR is not mentioned.** Data may be transferred to the US. Contacts: privacy@weeloomtales.com and support@weeloomtales.com. — [Privacy](https://www.weeloomtales.com/pages/privacy)
- IP: Weeloom owns the generated books (Terms §4.1). Buyers get a revocable, non-exclusive, personal, non-commercial license to view, print for personal use, and share. Commercial use and AI training on the output are prohibited (§16). — [Terms](https://www.weeloomtales.com/pages/terms)
- The Terms reference a future "Messaging Service" via WhatsApp and Telegram (§6), and the privacy policy lists WhatsApp and Telegram messaging as "currently unavailable". — [Terms](https://www.weeloomtales.com/pages/terms); [Privacy](https://www.weeloomtales.com/pages/privacy)
- Tech stack:
  - Response headers `server: Netlify`, `x-powered-by: Next.js`; www CNAME → `weloom-tales.netlify.app`; Next.js App Router chunks with `(marketing)` and `(book)` route groups.
  - DNS on Cloudflare (kanye/rose.ns.cloudflare.com) with Cloudflare email routing MX, an SPF record including zohomail.com, and TXT verifications for Google, Stripe, TikTok Developers and Facebook.
  — curl, dig and browser JS inspection, 16 Nov 2026

### Inferences
- The "Portraits" step (6) before "Payment" (7) and "Write" (8) suggests a pipeline of (a) generating stylised reference portraits of each partner from the photo (identity and outfit lock) before payment, then (b) after payment, LLM-writing all chapter text and rendering per-page illustrations conditioned on those portraits, then (c) TTS narration. This is consistent with the 2–4 hour turnaround. It is an inference from the step names, not a disclosed architecture.
- The pre-launch WhatsApp/Telegram "messaging service" clauses, plus legacy bedtime-story pages (section 5), suggest the legal templates were carried over from an earlier chat-delivered product concept.
- A "TikTok Developers" verification hints at plans for TikTok API integration (e.g. content posting or login), beyond ads alone.

### Gaps
- No disclosure of the LLM, image model, TTS vendor, or character-consistency method. No AI or safety statement beyond the Terms disclaimer and the privacy no-training claim.

## 5. Business: who, when, where, scale, fulfilment, marketing

### Takeaway
Weeloom Tales is a DBA of **Zaher Group, LLC**, governed by Virginia law with Fairfax County venue. It is a brand-new micro-operation: the domain was registered Jul 2026 and the legal pages date from Oct–Nov 2026. There are no founders named, no address, no reviews, and no third-party footprint (Trustpilot, Reddit, Product Hunt and press returned nothing). The print partner is undisclosed. Marketing is paid social (Meta, TikTok) plus an SEO blog of 22 gift-idea posts.

### Cited Findings
- Legal entity: "Zaher Group, LLC, doing business as Weeloom Tales". Virginia law; courts in Fairfax County, VA; individual arbitration (AAA) with a 30-day opt-out. Terms last updated 1 Oct 2026. — [Terms](https://www.weeloomtales.com/pages/terms)
- No physical address, phone or named people on the Terms, Privacy or Contact pages. Contact is hello@weeloomtales.com plus a form with a "What is five plus three?" human check. — [Contact](https://www.weeloomtales.com/contact); [Privacy](https://www.weeloomtales.com/pages/privacy)
- Domain weeloomtales.com was **created 2026-07-20** via NameSilo and expires 2027-07-20. — WHOIS lookup, 16 Nov 2026
- Privacy Policy last updated **15 Nov 2026**; Refund Policy "as of October 1, 2026". — [Privacy](https://www.weeloomtales.com/pages/privacy); [Refund](https://www.weeloomtales.com/pages/refund-policy)
- Registry searches found no "Zaher Group" LLC in general web results. It is also absent from Loudoun County, VA's new-business list for Jul–Sep 2026 (I extracted and searched the text). — [Web search](https://www.loudoun.gov/DocumentCenter/View/169595/Loudoun-County-New-Business-List-within-Date-Range-07-01-2026---09-30-2026-PDF); OpenCorporates returned HTTP 403.
- Scale and social proof:
  - Trustpilot (trustpilot.com/review/weeloomtales.com) returned HTTP 403 to automated fetch.
  - Web searches found no Trustpilot, Reddit, Product Hunt or press mentions of Weeloom Tales.
  - No on-site reviews.
  — [Search results](https://pl.trustpilot.com/review/welomall.com) (only an unrelated "welomall.com" surfaced)
- Wayback Machine has **no snapshots** of weeloomtales.com (archive.org availability API returned empty, 16 Nov 2026).
- **Pivot evidence:** search-engine results still index weeloomtales.com URLs under /great-bedtime-stories-library (topics: quiet-and-sleepy, magic-and-wonder, being-brave; ages: 1-2-year-olds), titled "Weeloom Tales — a week of personalized bedtime stories from one short update". Those URLs now render the love-story site's sign-in page with no bedtime content. — [Search result URL](https://www.weeloomtales.com/great-bedtime-stories-library); [Being Brave page, now a sign-in page](https://www.weeloomtales.com/great-bedtime-stories-library/topics/being-brave)
- Fulfilment: no print partner is named in the Terms, Privacy or Refund pages. Print orders are final once sent to print, except damage or defects reported within 30 days of delivery (reprint or refund). Digital defects get up to 3 regenerations, then a full refund. — [Refund](https://www.weeloomtales.com/pages/refund-policy); [Terms §19](https://www.weeloomtales.com/pages/terms)
- Shipping time: printed copy "15–17 days after you approve your book". — [Pricing](https://www.weeloomtales.com/pricing)
- Marketing channels:
  - Ad and analytics partners named: Google, Google Ads, Meta, TikTok, Microsoft Advertising, OpenAI. — [Privacy](https://www.weeloomtales.com/pages/privacy)
  - Instagram/Facebook in-app-browser messaging in the funnel. — browser walk
  - Socials: facebook.com/weeloomtales, instagram.com/weeloomtales, tiktok.com/@weeloomtales. — [Homepage](https://www.weeloomtales.com/)
  - SEO blog: 22 undated, unauthored gift and relationship posts (e.g. "Paper Anniversary Gifts for Your Husband", "Christmas Proposal Ideas", "Anniversary Quotes: 110 Original Lines…") across 7 categories. — [Blog](https://www.weeloomtales.com/blog)

### Inferences
- Probably a solo or very small founder team (the "Zaher" name suggests a founder surname) that launched publicly around Oct 2026, targeting the Q4 holiday and Valentine's gifting season. The blog's Christmas and Valentine's content timing supports this.
- The 15–17 day print lead time and the 8×8 softcover are consistent with a print-on-demand API (Lulu, Gelato, Peecho and Printful all offer 8×8 photo-book or softcover SKUs). This is unconfirmed: no partner is named.
- The business model is high-margin digital ($25 for a fully AI-made, narrated book) with print as a premium bundle. Unit economics depend on AI generation cost (portrait preview before payment is a cost-of-acquisition item) and paid-social CAC.

### Gaps
- Founders, funding, location beyond the Virginia legal venue, order volume, and the Virginia SCC registration date of Zaher Group, LLC (the SCC database was not accessible here).
- Social follower counts. Instagram and TikTok were not fetched because they require login or block scrapers.
- Trustpilot status could not be confirmed (403); none was found via search.

## 6. Design: visual brand and mobile experience

### Takeaway
The brand is warm, soft and "storybook". It uses a serif display face (DM Serif Display) for headlines and Figtree sans for body text, on white and cream with a deep navy, a forest-green accent and a marigold-yellow pill CTA. Copy is plain and reassuring, aimed at the giver. The mobile layout is clean, single-column and CTA-first.

### Cited Findings
- Fonts loaded: **Figtree** (300–900, body and UI) and **DM Serif Display** (400, headlines such as "Your story, drawn the way you lived it."). — browser JS inspection of [Homepage](https://www.weeloomtales.com/)
- Colours (computed):
  - body text rgb(51,38,42) (warm near-black) on a white background
  - H1 eyebrow green rgb(6,95,70) (shown as a pale-green pill label "A personalized love story book")
  - primary CTA background rgb(255,194,77) (marigold) with navy text rgb(30,52,80), fully rounded pill buttons
  - the sample-book viewer sits on a deep navy panel with cream pages
  — browser JS inspection and screenshots, [Homepage](https://www.weeloomtales.com/)
- The logo is an illustrated couple-reading-a-book icon in a navy circle next to the wordmark "Weeloom Tales". — screenshot, [Homepage](https://www.weeloomtales.com/)
- Mobile (375 px):
  - hamburger "Menu" button
  - a hero image of a photo card becoming the illustrated "Our Love Story" cover (Maya & Sam)
  - the big serif headline, then book-type chips, then a full-width yellow "Start your book" button, then check-mark bullets
  — browser mobile emulation, [Homepage](https://www.weeloomtales.com/)
- Tone of voice: second-person, intimate, low-pressure ("No writing skills needed.", "Nothing to pay yet.", "Nothing is ever sent to your partner."). Forms explain why each field is asked ("So the story talks about each of you the right way."). — browser walk; [Homepage](https://www.weeloomtales.com/)
- Accessibility touches: a "Skip to main content" link, per-field required markers, and an error summary with anchor links at the top of the form. — browser walk, [/start/our_love_story](https://www.weeloomtales.com/start/our_love_story) and the /you step

### Inferences
- The polish (field-level rationale copy, error summaries, autosave, draft recovery) is unusually mature for a site a few months old. That suggests an experienced product or engineering founder and likely heavy AI-assisted development.
- The visual identity (serif plus warm yellow, cream pages) borrows the "premium gift" cues of Wonderbly and Lovebook, but the 3D-cartoon and anime styles position it closer to AI-photo-to-cartoon apps.

### Gaps
- I did not inspect the reader or app experience after purchase, the PDF output quality, or a physical print sample.
