# Wonderbly (formerly Lost My Name): business and product profile

Research date: 16 Nov 2026. "Observed live" means the researcher saw it on wonderbly.com (US storefront unless noted) on 16 Nov 2026 in the built-in browser. The personalization flow was run with the dummy name "Alex" and the creator name "Sam" and stopped at the cart. No account was created and checkout was not started. Older sources are flagged with their year.

## Site structure & funnel

### Takeaway
Wonderbly runs a gift-commerce funnel: browse by kids/adults × age/occasion/recipient/theme, a one-screen intake (name + gender + 3 skin tones), a live full-book preview, then a series of upsell steps (paid cover colour, giver name, dedication, format with hardcover preselected, gift wrap) and a cross-sell interstitial that offers 50% off a second book. The trust message leans on a "never AI" claim, Penguin Random House ownership, Trustpilot and a large reader count.

### Cited Findings
**Homepage & navigation (observed live 16 Nov 2026)**
- A sitewide top banner reads "Buy one book, get a second half price with code BOGO50." — [wonderbly.com](https://www.wonderbly.com)
- Top nav: Our books, Kids, Adults, Occasion, Christmas (seasonal), Account, Help & FAQs, country selector, cart. — [wonderbly.com](https://www.wonderbly.com)
- Shop shortcuts: New in, Bestsellers, Shop all books, Newspaper, Wonderbly classics, Family stories. — [wonderbly.com](https://www.wonderbly.com)
- Kids by age: 0–3, 3–6, 6–9, 9–12, teens, all ages, plus "For newborns". Kids by occasion: Christmas, Hanukkah, New baby, First year, Birthday, Mother's/Father's Day, Easter, Baptism, Graduation. Kids by recipient: siblings, grandparents, aunties/uncles, nieces/nephews, whole family. Kids by theme: Christmas, Bedtime, Search-and-find, Sports, Pets, Love, Dinosaurs, Early learning, Imaginative, Empowering. — [wonderbly.com](https://www.wonderbly.com)
- Adults by occasion: Christmas, Birthday, New baby, Mother's/Father's Day, Anniversary, Weddings, Baby shower, Milestone birthday, Valentine's. Adults by recipient: grandparents, new parents, moms, dads, aunties/uncles, friends, partner. Adults by theme: Christmas, Newspaper, Sports, Food & drink, Pets, Humor, Love, Astrology, Poetry. — [wonderbly.com](https://www.wonderbly.com)
- Hero: "Make them the star of the story", with the subline "Personalized tales by bestselling authors and illustrators, never AI." In November the hero image is Christmas-themed and the CTA is "Shop Christmas". — [wonderbly.com](https://www.wonderbly.com)
- Trust bar under the hero: "Part of the #1 global publisher", "Trustpilot: Over 75k five-star reviews", "13 Million Readers – Loved globally since 2013". Lower on the same page the copy says "We've helped 10 million people make someone's day", so the reader count is inconsistent within the page. — [wonderbly.com](https://www.wonderbly.com)
- Homepage modules: "Personalize a bestseller" carousel (The Search for Santa, I Spy You!, When You Were Born, Our Family Saves Christmas, each "From $39.99 USD"), Bestselling stories, a 4-step "How it works" (find a book → personalize → add a message → give a gift), Trustpilot, newsletter ($5 off first order) and an FAQ. — [wonderbly.com](https://www.wonderbly.com)
- Footer: Help & FAQs, Delivery info, Coupon codes & book discounts, Our story, Book experts, Careers, Affiliate program, Refer a friend, Ambassador program, Press, Blog, and a "Penguin Random House" corporate link. Payment methods: Visa, Mastercard, PayPal, Klarna, Amex, Apple Pay. Entity: Lostmy.name Ltd (trading as Wonderbly, Reg. Co. No. 08305498), 20 Vauxhall Bridge Road, London SW1V 2SA. — [wonderbly.com](https://www.wonderbly.com)
- The sitemap also lists /offers/group-buying and /pages/kids-representation-research. — [wonderbly.com/sitemap.xml](https://www.wonderbly.com/sitemap.xml)

**Product page (Lost My Name, observed live)**
- The page says: "The Wonderbly book that started it all in 2013". It recommends the book for ages 0–8, offers "Preview all 22 pages before buying", says the book is "Printed and dispatched in 2-4 working days", and says the books are "created by artists, never AI". The FAQ notes that many customers buy it as a newborn gift. Optional photo personalization is mentioned. — [Lost My Name product page](https://www.wonderbly.com/personalized-products/lost-my-name-v2-book)

**Personalization flow (observed live, Lost My Name, US)**
1. **Intake (/create/start, "Step 1 of 1")**: "Who are you making this book for?" asks for a first name and a character choice: Boy/Girl plus 3 skin-tone variants. In the HTML the skin-tone field is named `phototype` with values type-ii, type-iii and type-vi, which suggests Fitzpatrick-scale naming (inference). The preview screen labels the character "Adventurer". There are no hair or glasses options on this title. — [create/start](https://www.wonderbly.com/personalized-products/lost-my-name-v2-book/create/start?locale=en-US)
2. **Live preview (/create/preview)**: the full personalized book renders in-browser with one-page and two-page views. A bottom bar of chips leads to Adventurer (name), Cover color, Created by, Dedication and Book language (English US). The preview also offers "Personalize with a photo". A "Quick check… making sure you're a real person before we build your preview" bot check runs (Google reCAPTCHA is loaded). It was invisible during this session. — observed live
   - **Cover color**: "choose from four delightful covers". One is FREE and the other three cost +$3.00 USD each. — observed live
   - **Created by**: "Who made this book? Add your name and we'll give it pride of place". The giver's name prints on the title page, which credits "Written by David Cadji-Newby, Illustrated by Pedro Serapicos, Created by [giver]". — observed live
   - **Dedication**: a prefilled editable message with a 10-line limit including blank lines. The counter showed about 257 characters left with the default text. — observed live
3. **Format (/create/formats)**: "Choose a format for your book". Layflat ("Lifetime keepsake", "Premium Hardcover") costs $69.99. Hardcover ("Most popular", **preselected by default**) costs $49.99. Softcover costs $39.99. — observed live
4. **Gift wrap (/create/giftwraps)**: "Add a final flourish… recyclable gift boxes and wraps". Deluxe Giftbox (gold foil) +$12.99, Premium giftbox +$6.99, Giftwrap (envelope style) +$4.99, or no gift wrap. A running subtotal is shown. — observed live
5. **Extras**: the cart has an "Edit other extras" link to an add-ons step ("Wrap it up in magic: Add one or more of these delightful extras"). No extras were listed for this title on the US store at the time. — observed live
6. **Post-add interstitial (/continue-shopping/kids)**: "Magic! Your book is added to cart!" is followed by "Every child needs another adventure – 50% off your second book with BOGO50". The cross-sell carousel offers "Preview for Alex" buttons, so other titles open already personalized with the same child's name. — observed live
7. **Cart**: line item "The Little Boy or Girl Who Lost Their Name for Alex – Hardcover $49.99", with edit links for book, format/gift wrap and extras. It has a BOGO50 reminder, a coupon field, "Been referred by a friend?", and Express checkout (wallets) or Checkout. Shipping is not shown in the cart. — observed live

**Social proof**
- Trustpilot: TrustScore 4.5 ("Excellent") from 91,879 reviews (17,139 in the last 12 months). The split is 81% 5-star, 7% 4-star, 3% 3-star, 2% 2-star and 7% 1-star. The company replies to 99% of negative reviews, typically within 24 hours. — [Trustpilot](https://www.trustpilot.com/review/www.wonderbly.com)
- Common complaints: delivery delays and lost parcels, high price and shipping costs, print issues on some pages, and limited hair or skin options. — [Trustpilot](https://www.trustpilot.com/review/www.wonderbly.com)

### Inferences
- The funnel is built to raise average order value (AOV) at every step. Hardcover is preselected over softcover (a $10 uplift), and paid cover colours, three gift-wrap tiers, BOGO50 and a pre-personalized cross-sell all add to the basket. This matches Graphite's statement that AOV rose by more than 25% through premium formats and upsells (see Business).
- The intake is very light (two fields and a skin tone), so the preview arrives within seconds of landing. The preview is the main conversion device.
- The "never AI" message is now a headline positioning claim against AI-generated competitors.

### Gaps
- The mobile layout was not tested at phone width. The browser pane was shared with other sessions, so it was not resized.
- The photo-upload path ("Personalize with a photo") was not exercised: no photo was uploaded.
- Countdown timers or exit-intent popups were not observed. The only urgency cues seen were Christmas delivery messaging and BOGO.

## Product: catalog, personalization mechanics, formats

### Takeaway
Wonderbly sells human-written and human-illustrated picture books whose structure is driven by personalization data (name letters, birthdate, address, family members). Each is rendered from pre-drawn variant artwork and printed on demand in softcover, hardcover or layflat. PRH puts the catalogue at "over 150" kids and adult titles, but the public sitemap lists about 54 product pages.

### Cited Findings
- Founding title: *The Little Boy/Girl Who Lost His/Her Name*. The child "loses" their name and recovers one letter per character met, so each name produces a different sequence of mini-stories, and the name is revealed at the end. — [Lost My Name product page](https://www.wonderbly.com/personalized-products/lost-my-name-v2-book); [Wikipedia](https://en.wikipedia.org/wiki/Wonderbly)
- The book is 22 pages long and recommended for ages 0–8 (current page). Wikipedia gives ages 2–6 for the original edition. — [product page](https://www.wonderbly.com/personalized-products/lost-my-name-v2-book); [Wikipedia](https://en.wikipedia.org/wiki/Wonderbly)
- Credits printed in the book: written by David Cadji-Newby, illustrated by Pedro Serapicos (both co-founders). — observed live in the preview title page; founders per [Startups.co.uk / search results](https://startups.co.uk/dragons-den/success-stories/dragons-den-success-stories-wonderbly)
- *Lost My Name* has sold 4 million copies, which Graphite calls the "best-selling premium personalised children's book worldwide" (2025). It had sold over 2.7 million by July 2017. — [Graphite Capital](https://www.graphitecapital.com/portfolio/wonderbly/); [TechCrunch 2017](https://techcrunch.com/2017/07/31/wonderbly)
- Other data-driven titles: *The Incredible Intergalactic Journey Home* (built around the child's address, with a satellite image of their home), *Kingdom of You* (favourite things) and *The Birthday Thief* (birthdate drives the narrative). — [Wikipedia](https://en.wikipedia.org/wiki/Wonderbly)
- Catalogue size: "over 150 personalized children's and adult titles" (PRH, June 2025). — [PRH announcement](https://global.penguinrandomhouse.com/announcements/prh-acquires-wonderbly-one-of-the-uks-fastest-growing-independent-publishers-and-leader-in-personalized-gift-books/)
- The public sitemap lists 54 `/personalized-products/` URLs. Examples include I Spy You (search-and-find), Where Are You? (several editions: Christmas, Graduation, Epic Puzzle Quest, Dad, Teachers), Kingdom of You, The Birthday Thief, When You Were Born, Our Family Saves Christmas, Santa search-and-find, 12 Days of Christmas, Elf Who Saved Christmas, Dinosaur (Name-O-Saurus), Treasury of Nursery Rhymes, My Big Sibling, New Sibling for You, Ten Reasons, Best Mum/Dad/Husband/Wife Ever, Our Mum/Our Dad, Super Epic Love Quest, Poetry (graduation edition), Words of Wisdom, The Book of Everyone (birthday edition), This Month's Child and others. Lost My Name v2 itself is not in the sitemap, so the sitemap is incomplete. — [sitemap.xml](https://www.wonderbly.com/sitemap.xml)
- The post-cart cross-sell showed further kids titles at "From $39.99": I Spy You!, Princess You The Great, I'm a Name-O-Saurus, Bedtime for You, ABC For You, The Search for Santa, It's Super-You!, Dig, You, Dig! — observed live
- Adult/grown-up books: these make up 25% of sales by exit (2025), helped by acquiring The Book of Everyone (2022) and Historic Newspapers (2023). Newspaper books are personalized with original British and American newspaper archives, drawn from a collection of 2m+ original British newspapers. — [Graphite Capital](https://www.graphitecapital.com/portfolio/wonderbly/); [search summary of mergerlinks/Bookseller](https://thebookseller.com/news/wonderbly-acquires-historic-newspapers-in-move-to-grow-adult-gift-book-offering)
- Character options are limited per title. For Lost My Name: boy/girl × 3 skin tones (observed live). Some titles customize appearance shown as a caricature on the cover. Trustpilot reviewers call the hair and skin options limited. — observed live; [wetried.it](https://wetried.it/wonderbly-review/); [Trustpilot](https://www.trustpilot.com/review/www.wonderbly.com)
- Languages: 11 languages per Wikipedia; "over 40 titles published in 12 languages" (older aggregator figure). The current US creator offers a "Book language" selector. — [Wikipedia](https://en.wikipedia.org/wiki/Wonderbly); observed live
- Formats: Softcover ("lightweight… printed on thick, durable paper"), Hardcover ("premium hardcover with a quality matte finish") and Layflat/Premium Hardcover ("pages that lay perfectly flat"). — observed live
- Creative investment per book: the company says each one takes "six months of scribbling, 400 hours of illustrating and days of debating book covers". — [Our story](https://www.wonderbly.com/pages/our-story)
- IP partnerships: the Roald Dahl Estate (2017) and Wizarding World's "Keys and Curios" journal via Wonderbly Studios (2019). — [TechCrunch 2017](https://techcrunch.com/2017/07/31/wonderbly); [TechCrunch 2019](https://techcrunch.com/2019/11/21/wonderbly-studio/)

### Inferences
- The personalization is combinatorial templating: pre-illustrated letter/character spreads, text slots, and character variants of gender × skin tone (× hair on some titles) composited by a rendering engine. Each title therefore needs a finite matrix of hand-drawn variants. For Lost My Name that means at least one story spread per letter of the alphabet, with alternates for repeated letters.
- The ~150 titles figure probably counts editions, variants and Historic Newspapers products. The core Wonderbly kids catalogue looks closer to 40–60 distinct books.

### Gaps
- Physical trim sizes (inches/cm) and paper weight were not found. The product page's "Size & quality" section was empty when fetched.
- Page counts were not collected for titles other than Lost My Name (22).

## Pricing

### Takeaway
In the US, kids books cost $39.99 softcover, $49.99 hardcover and $69.99 layflat, with +$3 for an alternate cover colour and gift wrap at $4.99, $6.99 or $12.99. BOGO50 (second book half price) is the always-on promotion. Shipping is charged separately, is calculated at checkout and is not published as a flat rate.

### Cited Findings
- US (Lost My Name, observed live 16 Nov 2026): Softcover $39.99; Hardcover $49.99 (default, "Most popular"); Layflat $69.99. Alternate cover colours +$3.00 each (one free). Gift wrap +$4.99, Premium giftbox +$6.99, Deluxe Giftbox +$12.99. — observed live in the creator
- "From" prices by storefront for Lost My Name (observed live via the regional pages): US $39.99 USD; UK £24.99; Ireland €34.99; Canada $59.99 CAD; Australia $64.99 AUD. — [UK](https://www.wonderbly.com/uk/personalized-products/lost-my-name-v2-book), [IE](https://www.wonderbly.com/ie/personalized-products/lost-my-name-v2-book), [CA](https://www.wonderbly.com/ca/personalized-products/lost-my-name-v2-book), [AU](https://www.wonderbly.com/au/personalized-products/lost-my-name-v2-book)
- Most homepage and kids titles are listed at "From $39.99 USD". — [wonderbly.com](https://www.wonderbly.com)
- Standing promotions: BOGO50 (second book 50% off) in the banner, on product pages, in the cart and on the interstitial; $5 off the first order for newsletter sign-up; refer-a-friend; affiliate and ambassador programs; an /offers coupon page; group buying. — observed live; [wonderbly.com](https://www.wonderbly.com)
- Promotions seen in email tracking include a Labor Day 20% off campaign. — [ShopVision](https://www.shopvision.ai/brands/wonderbly)
- Shipping costs are calculated at checkout from the address and speed. Promo codes usually cover books, not postage. Canada ships duty-paid via UPS. — [Gremmy Tales review, Sept 2026](https://www.gremmytales.com/blog/wonderbly-review)
- Older UK shipping figures (about 2022, may be stale): £3.99 standard and £6.99 express. UK prices then were £24.99 softcover and £29.99 hardcover. — [search summary of whatsgoodtoread.co.uk](https://www.whatsgoodtoread.co.uk/wonderbly-best-mum-ever-personalised-book-review/)
- A Wonderbly reply on Trustpilot says it "had to adjust our shipping costs in certain countries" because of delivery costs, exchange rates and tax. — [UK Trustpilot](https://uk.trustpilot.com/review/wonderbly.com)
- A third-party 2026 comparison estimates US standard shipping at about $5–$7 (not verified on-site). — [lovetales.ai comparison](https://lovetales.ai/blog/love-book-online-vs-wonderbly)

### Inferences
- The UK price for softcover (£24.99) is much lower than the US price ($39.99, about £31). US and AU/CA prices appear to include more margin or landed-cost headroom.
- With BOGO50, two hardcovers cost about $75 before shipping, an effective $37.50 per book.

### Gaps
- Current shipping rates for US, UK, EU and AU were not verified. They appear only at checkout after an address is entered, and the researcher stopped before checkout.
- UK, EU and AU per-format prices (hardcover, layflat) were not captured. Only "From" prices were.

## AI & technology

### Takeaway
Wonderbly states that it uses no generative AI in its books ("created by artists, never AI") and makes this a headline claim. Its technology is a proprietary rendering/personalization engine and API that composites pre-illustrated artwork in real time and routes orders by webhook to a print-on-demand network on four continents. The web stack observed is Astro + Prismic CMS, with a heavy experimentation and analytics layer.

### Cited Findings
- "Personalized tales by bestselling authors and illustrators, never AI" (homepage hero). The product page says the books are created "by artists, never AI". — [wonderbly.com](https://www.wonderbly.com); [product page](https://www.wonderbly.com/personalized-products/lost-my-name-v2-book)
- PRH describes the model as direct-to-consumer, blending "proprietary technology" with creative, marketing and print-on-demand capabilities. The release does not mention AI. — [PRH](https://global.penguinrandomhouse.com/announcements/prh-acquires-wonderbly-one-of-the-uks-fastest-growing-independent-publishers-and-leader-in-personalized-gift-books/)
- Graphite describes "proprietary rendering software, on-demand printers, no inventory and high margins". After its investment it focused on data science, marketing personalization and pricing optimization, and hired a Head of Data & Insight and channel-attribution specialists. — [Graphite Capital](https://www.graphitecapital.com/portfolio/wonderbly/)
- Wonderbly Studios (Nov 2019) licensed the personalization API to brands. Items render in real time while shopping, and after checkout a webhook triggers rendering, printing and shipping. Sharabi: "You need a rendering stack, integration with a local print house, couriers, customer support and more." — [TechCrunch 2019](https://techcrunch.com/2019/11/21/wonderbly-studio/)
- The print-on-demand network spans four continents, according to a Wonderbly job listing and later citations. UK print partners named in secondary sources: Charlesworth Press and Pureprint Group. — [search summary incl. doodletale.ai](https://doodletale.ai/blog/are-wonderbly-books-ai) (secondary, unverified); [Bookseller (network of printers)](https://www.thebookseller.com/editors-letter/start-ups-once-all-the-rage-never-really-got-publishing)
- Wonderbly's Trustpilot replies appear to use Trustpilot's AI-assist reply tool. This is customer service, not product. — [Trustpilot](https://www.trustpilot.com/review/www.wonderbly.com)
- Web stack observed in page source (16 Nov 2026): Astro front end (`/_astro/` bundles), Prismic headless CMS (images.prismic.io), Optimizely (A/B testing, geo), Google reCAPTCHA (the "Quick check" before preview builds), Gladly help center, Snowplow analytics, Contentsquare and Microsoft Clarity (session analytics), server-side GTM (gtm.wonderbly.com), Meta, TikTok and Bing pixels, MNTN (dx.mountain.com, CTV ads), Impact (affiliate tracking) and CookieYes consent. It is not Shopify. 23 hreflang regional storefronts were seen (US default, /uk, /au, /ca, /ie, /nz, /za, /in, /sg, /hk, /my, /ph, /id, /ae, /kr, /br, /pt, /dk, /se, /fi, /ee, /mt). — observed live in page source

### Inferences
- The reCAPTCHA gate before preview generation suggests that rendering a preview is compute-costly and has been scraped or abused.
- Wonderbly's moat is the illustrated variant library, the rendering pipeline and global print routing, not generative technology. The "never AI" claim is a deliberate differentiator against AI-native entrants such as Gremmy Tales and Lovetales.

### Gaps
- No public statement was found from Sharabi or PRH on internal AI use (for example in marketing, copy or tooling) beyond the "never AI" product claim.
- The full printer list, countries and print technology (such as HP Indigo) are not confirmed. The Printweek article returned 403.

## Business: history, funding, ownership, scale

### Takeaway
Wonderbly was founded in London in 2012 as Lost My Name by four "dadpreneurs". It went from a Dragons' Den deal (2014) through VC rounds (GV, Ravensburger and others) to a £46m Graphite Capital buyout (2021). Penguin Random House/DK acquired it on 4 June 2025. At that point it had revenue above £60m, EBITDA above £10m, 11m+ books sold, ~75% international sales, and adult books at 25% of sales.

### Cited Findings
- Founders (2012, London): Asi Sharabi (ex-advertising; CEO), Tal Oron (creative technologist), David Cadji-Newby (TV writer/novelist, author) and Pedro Serapicos (illustrator). It started as a side project. — [Wikipedia](https://en.wikipedia.org/wiki/Wonderbly); [Startups.co.uk](https://startups.co.uk/dragons-den/success-stories/dragons-den-success-stories-wonderbly)
- Dragons' Den, Series 12 (aired 27 July 2014): Piers Linney invested £100,000. The stake is reported as 5% (Wikipedia offers list) or 4% (Startups.co.uk), so sources conflict. — [Wikipedia DD offers list](https://Www.Wikipedia.org/wiki/List_of_Dragons%27_Den_(British_TV_programme)_offers_Series_11-20); [Startups.co.uk](https://startups.co.uk/dragons-den/success-stories/dragons-den-success-stories-wonderbly)
- June 2015: $9m Series A led by Google Ventures. — [Wikipedia](https://en.wikipedia.org/wiki/Wonderbly)
- July/Aug 2017: $8.5m (about £6m) Series B led by Ravensburger, with GV, Project A Ventures, Greycroft, The Chernin Group and Allen & Co. participating. Part of it reportedly came as Silicon Valley Bank venture debt. The company rebranded to Wonderbly at the same time. — [TechCrunch 2017](https://techcrunch.com/2017/07/31/wonderbly); [The Bookseller](https://www.thebookseller.com/news/newly-rebranded-wonderbly-wins-85m-605881)
- FY to 31 May 2020: revenue £26.1m, up 23% from £21.2m (secondary source, older). — [search summary](https://flashesandflames.com/2021/07/29/wonderbly-is-sold)
- July 2021: Graphite Capital led a £46m buyout. Reports put the valuation above £60m (unconfirmed). BDO advised on the sale. — [Graphite Capital](https://www.graphitecapital.com/portfolio/wonderbly/); [BDO](https://www.bdo.co.uk/en-gb/deals/sale-of-lostmy-name-ltd-(-wonderbly-)-to-graphite-capital)
- Under Graphite: The Book of Everyone was acquired in 2022 and Historic Newspapers in October 2023 (terms undisclosed). Sales and EBITDA more than doubled to over £60m and over £10m. AOV rose by more than 25%. Adult books reached 25% of sales. International sales are about 75% of revenue, across 140+ countries. Wonderbly earned B Corp certification. Graphite reports a 30% IRR. — [Graphite Capital](https://www.graphitecapital.com/portfolio/wonderbly/)
- 4 June 2025: Penguin Random House acquired Wonderbly (terms undisclosed; LionTree advised Wonderbly). The deal was driven by DK CEO Paul Kelly. Wonderbly operates independently with Asi Sharabi remaining CEO, from London HQ. At that point it had 11m+ books sold, 140+ countries and 150+ titles. — [PRH](https://global.penguinrandomhouse.com/announcements/prh-acquires-wonderbly-one-of-the-uks-fastest-growing-independent-publishers-and-leader-in-personalized-gift-books/); [Bertelsmann](https://www.bertelsmann.com/en/media/news/penguin-random-house-acquires-wonderbly.html)
- The Bookseller (6 June 2025) called it a "£50m business". The last accounts showed operating profit of about £4m and EBITDA of £8m. This differs from Graphite's figures of over £60m sales and over £10m EBITDA, probably because of different periods or pro-forma treatment. — [The Bookseller](https://www.thebookseller.com/editors-letter/start-ups-once-all-the-rage-never-really-got-publishing)
- Third-party estimate: about US$28m in 2025 e-commerce sales (model-based, likely only covers part of the business; low reliability). — [ECDB](https://ecdb.com/resources/sample-data/retailer/wonderbly)
- No reports of administration or insolvency were found. As of Nov 2026 the site footer links to Penguin Random House under "Corporate information", and the hero trust bar says "Part of the #1 global publisher". — observed live
- Location: the Our story page says the studio is in Bloomsbury, London. The registered address is 20 Vauxhall Bridge Road (PRH UK's address). — [Our story](https://www.wonderbly.com/pages/our-story)
- Awards include FutureBook Best Start-Up (2014), Fast Company Top 10 Most Innovative in Media (2016), Tech City Future Fifty (2016) and #1 in the Sunday Times Tech Track 100 (2017). — [Wikipedia](https://en.wikipedia.org/wiki/Wonderbly)
- Shipping and fulfilment: "Printed and dispatched in 2-4 working days" (product page). The delivery-info estimator on 16 Nov 2026 showed US standard delivery 30 Nov and express 24 Nov, about 14 and 8 days out. Reviews cite 7–10 days (FAQ) and up to 2–3 weeks. Orders can be cancelled only if not delivered within 40 days or if faulty; personalized goods are otherwise non-returnable. — [product page](https://www.wonderbly.com/personalized-products/lost-my-name-v2-book); [delivery info](https://www.wonderbly.com/pages/delivery-info); [wetried.it](https://wetried.it/wonderbly-review/); [Terms](https://www.wonderbly.com/pages/terms)
- Marketing channels evidenced: Meta, TikTok and Bing ads pixels, CTV (MNTN), affiliates (Impact), ambassador and referral programs, email (newsletter $5 off; Labor Day campaigns), social (Pinterest, Facebook, X, Instagram, TikTok) and brand IP collabs (for example a personalized Guinness World Records book promoted on social). — observed live in page source; [ShopVision](https://www.shopvision.ai/brands/wonderbly)

### Inferences
- Under PRH/DK, expect expansion into licensed IP and DK non-fiction-style personalized formats. PRH explicitly cited "new genres and publishing models", but no 2026 launches confirming this were found.
- At over £60m revenue and about 11m books, the average is roughly £5–6 per book across lifetime volume. This is not meaningful as unit economics; current AOV is likely about $50–60 including upsells.

### Gaps
- Headcount was not found. Companies House filings (No. 08305498) were not retrieved directly.
- No post-acquisition (2025–2026) financials or product announcements were found.
- Printing countries beyond the UK are not specified. Secondary sources say "four continents".

## Design: visual brand & tone

### Takeaway
The brand is warm and storybook-premium: a cream background, deep teal-green and burgundy blocks, a yellow promo highlight, a serif display face (Rza) over a sans body (Atak), a crown logomark, and a whimsical voice ("Magic!", "Helpdesk Angels", "delightful covers").

### Cited Findings
- Computed fonts: headings use "Rza, Georgia, serif" and body text uses "Atak, Arial, sans-serif". — observed live on the homepage
- Palette (observed visually): dark teal-green header and banner with a crown "WONDERBLY" logo, a yellow code chip for BOGO50, burgundy/maroon hero caption band with a scalloped edge, cream page background, and lifestyle photography of children reading. — observed live screenshot
- Voice examples: "Magic! Your book is added to cart!", "Add a final flourish", "Wrap it up in magic", "Which color would they love?", "wonderful things take more time", and support staff called "Helpdesk Angels". — observed live; [delivery info](https://www.wonderbly.com/pages/delivery-info)
- Company values: "curiosity, kindness, courage". Mission: "Making the world's most thoughtfully personalized books." — [Our story](https://www.wonderbly.com/pages/our-story)
- Accessibility: an accessibility menu ("Enable accessibility for low vision") and an accessibility statement page. — observed live
- The illustration style in Lost My Name is hand-drawn with a painterly, textured look; characters are wide-eyed and have dot-patterned clothing. — observed live in the preview

### Inferences
- The creator UI is minimal and editorial (white cards, dark-green primary buttons, a step-chip bar) so the book preview stays the focal point.

### Gaps
- The mobile experience was not directly evaluated (see the first section). Exact hex colour tokens were not extractable because the CSS variables are scoped and not on :root.
