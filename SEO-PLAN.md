# SEO Implementation Plan — Red Sea Salt

**Goal:** Take the site from 70% SEO-ready to 100% technically ready, in code, in one focused session. Ranking is then a function of authority and content (not addressed here).

**Reference:** see [SEO-AUDIT.md](SEO-AUDIT.md) for the full audit findings this plan resolves.

**Estimated total effort:** 4–6 hours of focused work.

---

## How to use this plan

Each phase is independent and self-contained. You can implement in order, or pick the ones you need. Every step includes:
- **Files to touch**
- **Exact code** to add/change
- **Verification** (how to confirm the fix worked)
- **Commit message** to use

After each phase: build locally → push → wait for Netlify → verify on the live site.

---

# Phase 1 — Critical (do FIRST, before any launch)

These three issues currently block proper Google indexing. Skipping them = the rest is wasted effort.

## 1.1 Wire the real production domain

**Why:** Without this, every canonical, og:url, and sitemap entry points to a fake domain.

**Files:**
- Netlify dashboard (env vars)
- [src/app/sitemap.ts](src/app/sitemap.ts)
- [src/app/robots.ts](src/app/robots.ts)
- [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)

**Steps:**

1. **Decide the production domain** (e.g. `https://redseasalt.com`). If you don't have one yet, use the Netlify-provided URL temporarily (e.g. `https://red-sea-salt.netlify.app`).

2. **On Netlify** → Site settings → Environment variables → Add new variable:
   ```
   Key:   NEXT_PUBLIC_SITE_URL
   Value: https://redseasalt.com
   Scope: All deploy contexts (or at minimum: Production)
   ```

3. **In your local `.env.local`** add the same line for local builds:
   ```
   NEXT_PUBLIC_SITE_URL=https://redseasalt.com
   ```

4. **Update code** to fail loudly if the env var is missing in production (so a misconfigured deploy never silently ships fake URLs):

   `src/lib/site.ts` — new file:
   ```ts
   export function getSiteUrl(): string {
     const url = process.env.NEXT_PUBLIC_SITE_URL;
     if (!url) {
       if (process.env.NODE_ENV === 'production') {
         throw new Error('NEXT_PUBLIC_SITE_URL is required in production');
       }
       return 'http://localhost:3000';
     }
     return url.replace(/\/$/, '');
   }
   ```

5. Replace the inline `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://redseasalt.example'` in:
   - `src/app/sitemap.ts`
   - `src/app/robots.ts`
   - `src/app/[locale]/layout.tsx` (`metadataBase` and `orgJsonLd.url`)
   - `src/app/[locale]/products/[slug]/page.tsx` (anywhere baseUrl is needed)

   …with `getSiteUrl()` from `@/lib/site`.

**Verification:**
- Local: `npm run dev`, then `curl http://localhost:3000/sitemap.xml | head -20` — every URL must contain your real domain.
- Live: `curl https://your-domain.com/sitemap.xml` and `curl https://your-domain.com/robots.txt` — same check.

**Commit message:** `seo: read production URL from NEXT_PUBLIC_SITE_URL with strict validation`

---

## 1.2 Add Open Graph / social share image

**Why:** Every link share on Facebook, LinkedIn, WhatsApp, X (Twitter), Slack, Telegram currently shows blank. CTR drops dramatically.

**Files:**
- `public/og-image.jpg` (new)
- `public/og-image-ar.jpg` (optional — Arabic version)
- [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)

**Steps:**

1. **Create the image** (1200 × 630 px, < 300 KB JPG):
   - Use the existing hero photo as base
   - Overlay the logo + tagline ("ملح مصري نقي للأسواق العالمية" / "Pure Egyptian Salt for Global Markets")
   - Save as `public/og-image.jpg`

2. **Update `generateMetadata` in `src/app/[locale]/layout.tsx`:**
   ```ts
   openGraph: {
     title: t('siteName'),
     description: t('description'),
     type: 'website',
     locale: locale === 'ar' ? 'ar_EG' : 'en_US',
     siteName: t('siteName'),
     url: getSiteUrl(),
     images: [
       {
         url: '/og-image.jpg',
         width: 1200,
         height: 630,
         alt: t('siteName'),
       },
     ],
   },
   twitter: {
     card: 'summary_large_image',
     title: t('siteName'),
     description: t('description'),
     images: ['/og-image.jpg'],
   },
   ```

**Verification:**
- Tools: paste your URL into [opengraph.xyz](https://www.opengraph.xyz/) and [Twitter Card Validator](https://cards-dev.twitter.com/validator) (or just LinkedIn Post Inspector). Image must render correctly.

**Commit message:** `seo: add OG image, Twitter Card, og:locale per language`

---

## 1.3 Rewrite stale meta description

**Why:** Currently mentions "refined salt" and "double-washed salt" — products that don't exist. Hurts topical relevance.

**Files:**
- [messages/en.json](messages/en.json) → `meta.description`
- [messages/ar.json](messages/ar.json) → `meta.description`

**New description (en):**
```
Egyptian producer and exporter of raw salt, de-icing rock salt, tablet salt, water softener salt, pool salt, industrial salt, food-grade iodized salt and marine salt. Bulk and bagged supply since 2011, shipping from every major Egyptian port.
```

**New description (ar):**
```
شركة مصرية لإنتاج وتصدير الملح الخام، ملح إذابة الجليد، ملح الأقراص، ملح معالجة المياه، ملح حمامات السباحة، الملح الصناعي، الملح الغذائي المُيوَّد، والملح البحري. توريد بالجملة وبالأكياس منذ 2011، نشحن من كافة الموانئ المصرية الكبرى.
```

**Length check:** Both under 160 characters when truncated by Google. Both contain the primary commercial keywords.

**Commit message:** `seo: refresh meta description with current 8-product portfolio`

---

# Phase 2 — High-Impact Schema (after Phase 1, before active marketing)

## 2.1 Add LocalBusiness JSON-LD with full NAP

**Why:** Google needs structured data to verify the business as a local entity. Required for knowledge panel, Google Business Profile match, map pack ranking.

**File:** [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)

**Add alongside existing `orgJsonLd`:**

```ts
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Manufacturer',
  '@id': `${getSiteUrl()}/#organization`,
  name: t('siteName'),
  legalName: t('siteName'),
  url: getSiteUrl(),
  logo: `${getSiteUrl()}/logo.png`,
  image: `${getSiteUrl()}/og-image.jpg`,
  description: t('description'),
  foundingDate: '2011',
  telephone: '+201003009156',
  email: 'info@redseasalt.com', // verify this is correct
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Manshiat Malahat',
    addressLocality: 'Ras Gharib',
    addressRegion: 'Red Sea Governorate',
    addressCountry: 'EG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.1605118,
    longitude: 33.2133238,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  founder: {
    '@type': 'Person',
    name: 'Ragab Salem',
  },
  sameAs: [
    'https://www.facebook.com/share/17zFSreD75/',
    'https://www.linkedin.com/in/hossam-salem-695852296',
  ],
  hasMap: 'https://maps.app.goo.gl/eXnhFar8CeLEfFjs8',
};
```

Render it with another `<script type="application/ld+json">` next to the existing one.

**Verification:** Test on [Google Rich Results Test](https://search.google.com/test/rich-results) — must show "Detected: Manufacturer/LocalBusiness" with no errors.

**Commit message:** `seo: add LocalBusiness JSON-LD with NAP, geo, hours, sameAs`

---

## 2.2 Add FAQPage JSON-LD

**Why:** Unlocks FAQ rich snippets in Google SERP — accordions appear directly in search results, dramatically boosting CTR.

**File:** [src/app/[locale]/faq/page.tsx](src/app/[locale]/faq/page.tsx)

**Add at the top of the rendered output:**

```tsx
const faqItems = ['q1', 'q2', 'q3', 'q4', 'q5'].map((key) => ({
  question: t(`items.${key}.q`),
  answer: t(`items.${key}.a`),
}));

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};
```

Render via `<script type="application/ld+json">`.

**Verification:** Google Rich Results Test must report "FAQ" eligible.

**Commit message:** `seo: add FAQPage JSON-LD on /faq`

---

## 2.3 Add BreadcrumbList JSON-LD on product pages

**Why:** Breadcrumbs render in SERP results (above the URL), giving more context and lifting CTR.

**File:** [src/app/[locale]/products/[slug]/page.tsx](src/app/[locale]/products/[slug]/page.tsx)

**Add to the existing JSON-LD block:**

```ts
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: getSiteUrl() },
    { '@type': 'ListItem', position: 2, name: t('nav.products'), item: `${getSiteUrl()}/products` },
    { '@type': 'ListItem', position: 3, name },
  ],
};
```

Render after the existing Product JSON-LD.

**Commit message:** `seo: add BreadcrumbList JSON-LD on product pages`

---

## 2.4 Enrich Product JSON-LD

**File:** [src/app/[locale]/products/[slug]/page.tsx](src/app/[locale]/products/[slug]/page.tsx)

**Current `jsonLd` is minimal. Replace with:**

```ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description,
  image: product.gallery.map((img) => `${getSiteUrl()}${img}`),
  brand: { '@type': 'Brand', name: siteName },
  manufacturer: { '@type': 'Organization', name: siteName, '@id': `${getSiteUrl()}/#organization` },
  category: 'Salt',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Purity', value: product.specs.purity },
    { '@type': 'PropertyValue', name: 'Moisture', value: product.specs.moisture },
    { '@type': 'PropertyValue', name: 'Granule', value: product.specs.granule },
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: siteName },
    businessFunction: 'https://purl.org/goodrelations/v1#Sell',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'USD',
      // No fixed price — request a quote model
    },
  },
};
```

**Commit message:** `seo: enrich Product JSON-LD with full image set, specs, offer`

---

# Phase 3 — Per-Page Metadata Polish

## 3.1 Per-page hreflang alternates

**Why:** Currently only the root layout has `alternates.languages`. Per-page hreflang ensures Google serves the right language to each user.

**Files:** every `generateMetadata` in `src/app/[locale]/**/page.tsx`

**Pattern:** wrap a small helper:

`src/lib/seo.ts` — new file:
```ts
import { getSiteUrl } from './site';
import { routing } from '@/i18n/routing';

export function buildAlternates(pathSuffix: string, currentLocale: string) {
  const site = getSiteUrl();
  const path = pathSuffix.startsWith('/') ? pathSuffix : `/${pathSuffix}`;
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`;
    languages[loc] = `${site}${prefix}${path}`;
  }
  languages['x-default'] = `${site}${path}`;
  const localePrefix = currentLocale === routing.defaultLocale ? '' : `/${currentLocale}`;
  return {
    canonical: `${site}${localePrefix}${path}`,
    languages,
  };
}
```

In every page's `generateMetadata`:
```ts
return {
  title: ...,
  description: ...,
  alternates: buildAlternates('/about', locale),  // change path per page
};
```

**Verification:** view-source on any page → `<link rel="canonical" ...>` and `<link rel="alternate" hreflang="ar" ...>` etc must appear and point to your real domain.

**Commit message:** `seo: per-page hreflang alternates with x-default`

---

## 3.2 Remove duplicate H1/H2 on product detail

**File:** [src/app/[locale]/products/[slug]/page.tsx](src/app/[locale]/products/[slug]/page.tsx)

**Current:** `PageHero` renders `<h1>{name}</h1>`, then a few sections later there's `<h2 className="...">{name}</h2>` with the same text.

**Fix:** delete the second occurrence. The product name should appear only as h1 (in PageHero). The detail column starts with the description paragraph instead.

**Commit message:** `seo: remove duplicate H2 product name on detail page`

---

## 3.3 Improve image alt text

**Files:**
- `src/components/sections/Hero.tsx` — Hero image
- `src/components/sections/AboutPreview.tsx` — both images
- `src/components/ProductGallery.tsx` — already uses `alt={name}` ✓

**Examples:**
- Hero: `"Stacks of harvested salt at our Egyptian salt works"` (instead of `"Red Sea Salt Works"`)
- AboutPreview production image: `"Salt production at Red Sea Salt facilities"`
- AboutPreview bulk-bag image: `"1-ton bulk-bag packaging ready for export"`

**Commit message:** `seo: descriptive alt text on hero and about images`

---

# Phase 4 — Performance (Core Web Vitals)

## 4.1 Migrate hero and above-the-fold images to `next/image`

**Why:** `next/image` auto-generates AVIF/WebP, multiple sizes, blur placeholder, and lazy-loads non-critical images. Improves LCP (Largest Contentful Paint), the most heavily-weighted Core Web Vital.

**Files:**
- `src/components/sections/Hero.tsx`
- `src/components/sections/AboutPreview.tsx`

**Change:**
```tsx
import Image from 'next/image';

<Image
  src="/hero.jpeg"
  alt="..."
  width={1200}
  height={1500}
  priority   // for hero only — preloads the image
  sizes="(max-width: 768px) 100vw, 50vw"
  className="..."
/>
```

For `ProductGrid` thumbnails (background-image divs), this is harder to migrate without a redesign — can be deferred to a later sprint.

**Verification:** Run [PageSpeed Insights](https://pagespeed.web.dev/) on your live URL. Mobile LCP should drop to under 2.5s.

**Commit message:** `perf: migrate hero + about-preview to next/image for LCP boost`

---

# Phase 5 — Search Console + Verification

After Phases 1–3 are live, do these once.

## 5.1 Verify domain in Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add a property → enter your domain (e.g. `redseasalt.com`)
3. Choose **Domain** verification method (preferred) → add the TXT record they give you to your DNS
4. Wait 24h for verification
5. **Submit your sitemap:** `https://redseasalt.com/sitemap.xml`

## 5.2 Verify with Bing Webmaster Tools

[bing.com/webmasters](https://www.bing.com/webmasters) — same process. Bing powers DuckDuckGo, Yahoo, and ChatGPT search. Worth 5 minutes.

## 5.3 Submit business to Google Business Profile

[business.google.com](https://business.google.com)
1. Add your business (uses the LocalBusiness data we set up)
2. Verify by phone or postcard
3. Add photos (use existing product images)
4. Add hours, phone, website, address — must match the LocalBusiness JSON-LD exactly

## 5.4 Optional but recommended

- **GA4 (Google Analytics)** or **Plausible** — for traffic visibility
- **Microsoft Clarity** — free heatmaps and session recordings

---

# Phase 6 — Content Engine (the long game)

Technical SEO is now done. Rankings beyond this depend on **content + backlinks + time**. Out of scope for this plan, but the next 90 days should include:

| Action | Frequency | Channel |
|--------|-----------|---------|
| Publish 1 educational article (e.g. "How de-icing salt works", "Industrial vs food-grade salt") | Every 2 weeks | Blog (build a `/blog` route) |
| List on Egyptian B2B directories (Yellow Pages EG, Egyptian Industries Federation) | One-time | External |
| List on global trade marketplaces (Alibaba, IndexMundi, EUROPAGES, TradeKey) | One-time | External |
| Outreach to industry trade publications for backlinks | Monthly | External |
| Get 3-5 customer testimonials with company names + permission to link | One-time | Internal |
| Publish PDF spec sheets per product, link from product pages | One-time | Internal |
| Track keyword rankings in GSC | Weekly | GSC |

---

# Verification Checklist (post-implementation)

After all phases are deployed live, run through this:

- [ ] `curl https://your-domain.com/sitemap.xml | grep -c "<url>"` returns 32
- [ ] `curl https://your-domain.com/robots.txt` shows your real domain in the sitemap line
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) on home: Organization + LocalBusiness detected, no errors
- [ ] Same on /faq: FAQPage detected
- [ ] Same on /products/[any]: Product + BreadcrumbList detected
- [ ] [opengraph.xyz](https://www.opengraph.xyz/) on home renders OG image + correct title/description
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) mobile score ≥ 85
- [ ] view-source on any page contains `<link rel="alternate" hreflang="ar" ...>` AND `hreflang="en"` AND `hreflang="x-default"`
- [ ] view-source has exactly **one** `<h1>` per page
- [ ] All images have non-empty, descriptive `alt` attributes
- [ ] Sitemap submitted in GSC, indexed without errors after 7 days

When every box is checked → site is **100% technically SEO-ready**.

---

# Estimated Phase Timing

| Phase | Effort | Can run in parallel with |
|-------|--------|--------------------------|
| 1.1 Domain wiring | 30 min | – |
| 1.2 OG image | 45 min (incl. design) | 1.3 |
| 1.3 Meta description | 10 min | 1.2 |
| 2.1 LocalBusiness | 30 min | 2.2, 2.3 |
| 2.2 FAQ JSON-LD | 20 min | 2.1, 2.3 |
| 2.3 Breadcrumb | 15 min | 2.1, 2.2 |
| 2.4 Product JSON-LD | 20 min | – |
| 3.1 hreflang | 45 min | 3.2, 3.3 |
| 3.2 Remove duplicate H | 5 min | – |
| 3.3 Alt text | 15 min | – |
| 4.1 next/image | 60 min | – |
| 5.1–5.4 GSC + GBP | 30 min (+ 24h DNS) | – |
| **Total active work** | **~5 hours** | |

---

# Order of operations (recommended)

```
Day 1 (morning, 2.5 hours):
  Phase 1.1 → 1.2 → 1.3 → build → push → verify on Netlify

Day 1 (afternoon, 1.5 hours):
  Phase 2.1 → 2.2 → 2.3 → 2.4 → build → push → verify with Rich Results Test

Day 2 (morning, 1.5 hours):
  Phase 3.1 → 3.2 → 3.3 → 4.1 → build → push → run PageSpeed Insights

Day 2 (afternoon, 30 min + 24h):
  Phase 5 — Search Console verification, sitemap submission
  Wait for DNS verification

Day 3+:
  Watch GSC for indexing status. Begin Phase 6 content work.
```

---

# Want me to execute this plan?

If you say "execute Phase 1" (or any phase), I will implement every step in that phase, build, commit, and push to GitHub. Netlify will redeploy automatically.

**Phases 1, 2, and 3 can be implemented entirely by me** — no input needed from you besides the production domain name.

**Phases 5 and parts of 1.2** require actions only you can do (DNS records, Netlify env vars, Google account verification, designing the OG image).
