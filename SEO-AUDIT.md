# SEO Audit — Red Sea Salt

**Date:** 2026-04-28
**Branch audited:** `main` @ `43cfa64`
**Auditor:** automated codebase review
**Verdict:** ❌ **Not ready for launch** — 3 critical blockers and 6 high-impact gaps. Estimated readiness: **~70%**

---

## Executive Summary

The technical foundation is solid (sitemap, robots, metadata API, SSG, multi-locale structure, schema.org Organization, fonts). But three critical issues currently break how Google sees the site, and six high-impact gaps will cap the ranking ceiling well below what's achievable.

After applying the fixes in the **Action Plan** section, the site will be ~95% SEO-ready and competitive in Google search for Egyptian salt supplier queries.

---

## 🔴 Critical Issues (Block proper indexing)

### C1. Placeholder domain wired into every metadata source

**Files:**
- [src/app/sitemap.ts:5](src/app/sitemap.ts)
- [src/app/robots.ts:3](src/app/robots.ts)
- [src/app/[locale]/layout.tsx:49](src/app/[locale]/layout.tsx)

**Current code:**
```ts
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://redseasalt.example';
metadataBase: new URL('https://redseasalt.example')
```

**Impact:** Without `NEXT_PUBLIC_SITE_URL` set on Netlify, every canonical URL, every Open Graph URL, every sitemap entry points to `redseasalt.example` — a domain that does not exist. Google will:
- Mark canonicals as broken
- Refuse to crawl the sitemap
- Index nothing under the real production domain

**Fix:**
1. On Netlify: **Site settings → Environment variables → Add**
   ```
   NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
   ```
2. Update code to read the env var without a fake fallback (fail loudly during build instead of silently shipping broken URLs).

---

### C2. No Open Graph image

**Files:** [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx) — `openGraph` block has no `images`

**Impact:** Every share on Facebook, LinkedIn, WhatsApp, Slack, Telegram, Twitter renders with a blank or generic placeholder. Click-through rates from social drop dramatically.

**Fix:**
1. Create `public/og-image.jpg` (1200 × 630, < 300 KB)
2. Add to `openGraph`:
   ```ts
   openGraph: {
     ...,
     images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('siteName') }],
   }
   ```

---

### C3. Stale meta description references retired products

**File:** [messages/en.json](messages/en.json) and [messages/ar.json](messages/ar.json) — `meta.description`

**Current:**
> "Red Sea Salt — producer and supplier of industrial salt, de-icing salt, pool salt, **refined salt and double-washed salt**..."

**Problem:** "refined salt" and "double-washed salt" are not products on the site anymore. Search engines see a mismatch between the description and the actual content, hurting topical relevance.

**Fix:** Rewrite to mention the actual 8 products: raw salt, de-icing rock salt, tablet salt, water softener salt, pool salt, industrial salt, food-grade salt (iodized, ES 273), marine/sea salt.

---

## 🟠 High-Impact Gaps (Significant ranking and SERP appearance impact)

### H1. No FAQPage JSON-LD on /faq

**Status:** [src/app/[locale]/faq/page.tsx](src/app/[locale]/faq/page.tsx) renders FAQs visually but adds no structured data.
**Impact:** Lost opportunity for FAQ rich snippets in Google SERP — these dramatically increase click-through rate.
**Fix:** Add `@type: FAQPage` JSON-LD with each Q/A pair.

### H2. No LocalBusiness JSON-LD with full NAP

**Status:** [src/app/[locale]/layout.tsx:81](src/app/[locale]/layout.tsx) has only generic `Organization`.
**Impact:** Google does not see the business as a local entity. No knowledge panel, no Google Business sidebar match, weaker map pack ranking.
**Fix:** Add a `LocalBusiness` (or `Manufacturer` subtype) entity with:
- `name`, `image`, `url`, `logo`
- `address` (full PostalAddress)
- `telephone: +201003009156`
- `geo: { latitude: 28.1605118, longitude: 33.2133238 }`
- `openingHoursSpecification`
- `sameAs: [Facebook URL, LinkedIn URL]`

### H3. No BreadcrumbList JSON-LD on product pages

**Impact:** Breadcrumbs do not show in SERP results for product pages, costing CTR.
**Fix:** Add `BreadcrumbList` schema to product detail pages: Home → Products → Product Name.

### H4. Twitter Card meta tags missing

**Impact:** No rich preview when shared on X (Twitter).
**Fix:** Add to `generateMetadata`:
```ts
twitter: {
  card: 'summary_large_image',
  title: '...',
  description: '...',
  images: ['/og-image.jpg'],
}
```

### H5. Duplicate H1 / H2 with identical text on product detail page

**File:** [src/app/[locale]/products/[slug]/page.tsx](src/app/[locale]/products/[slug]/page.tsx)
**Problem:** `PageHero` renders the product name as `<h1>`, then immediately below an `<h2>` with the same text repeats it. Confuses keyword priority signals.
**Fix:** Remove the second `<h2>` (keep just the description paragraph).

### H6. `alternates.languages` only at root layout

**Status:** Languages map defined once in layout, but per-page canonicals don't include hreflang annotations to their localized counterparts.
**Impact:** Google may not understand that `/about` (ar) and `/en/about` (en) are language alternates of each other.
**Fix:** In every `generateMetadata`, set explicit per-page `alternates`:
```ts
alternates: {
  canonical: `/${locale}/about`,
  languages: {
    ar: '/about',
    en: '/en/about',
    'x-default': '/about',
  },
}
```

---

## 🟡 Medium-Impact (Lighthouse / UX / minor SEO)

| # | Issue | File / Fix |
|---|-------|-----------|
| M1 | `<img>` tags everywhere instead of `next/image` | Hero, AboutPreview, Footer, ProductGrid backgrounds — costs LCP and CLS in Core Web Vitals |
| M2 | No `og:locale` (`ar_EG`, `en_US`) | Layout `generateMetadata` |
| M3 | No Google Search Console verification meta tag | Add when you connect GSC |
| M4 | No analytics (GA4 / Plausible / Umami) | Optional but standard |
| M5 | Hero alt text is generic "Red Sea Salt Works" | Make it descriptive of the actual scene |
| M6 | No `robots` directive customization for staging | Optional |

---

## ✅ What's Already Solid

| Strength | Evidence |
|---------|---------|
| Dynamic XML sitemap | [src/app/sitemap.ts](src/app/sitemap.ts) — covers 32 pages |
| robots.txt configured | [src/app/robots.ts](src/app/robots.ts) — references sitemap |
| Per-page metadata | All 7 routes have `generateMetadata` |
| Correct `lang` + `dir="rtl"` | [src/app/[locale]/layout.tsx:97](src/app/[locale]/layout.tsx) |
| Title template | `%s \| Red Sea Salt` |
| Organization JSON-LD | Global layout |
| Product JSON-LD | Per-product page |
| Static Site Generation | All 32 pages pre-rendered as HTML |
| Optimized fonts | `next/font` with `display: swap` |
| Clean URL structure | `/products/<slug>` — no query strings, no IDs |
| Bilingual structure | ar (default) and en, properly nested |

---

## 📊 Scorecard

| Dimension | Score | Notes |
|-----------|-------|-------|
| Technical SEO foundation | 7.5 / 10 | Excellent structure, but the placeholder domain neutralises it |
| On-page SEO | 7 / 10 | Title tags clean, meta descriptions stale |
| Structured Data | 5 / 10 | Organization + Product only; missing FAQ, LocalBusiness, Breadcrumbs |
| Performance (likely) | 6 / 10 | `<img>` not optimized via `next/image` |
| Mobile | 9 / 10 | Responsive design polished |
| Internationalization | 8.5 / 10 | hreflang setup is partial |
| **Overall readiness** | **70 %** | **Not launch-ready** |

---

## 🎯 Action Plan (priority order)

### Immediate (do before launch)

1. ✅ Set `NEXT_PUBLIC_SITE_URL` on Netlify with the real production domain
2. ✅ Update `metadataBase` to read env var without fake fallback (fail-loudly)
3. ✅ Create and wire `public/og-image.jpg` (1200 × 630)
4. ✅ Rewrite meta description (en + ar) to match the 7 actual products
5. ✅ Add Twitter Card to `generateMetadata`
6. ✅ Add `og:locale` per locale
7. ✅ Remove duplicate `<h2>` on product detail page

### High priority (post-launch within 1 week)

8. ✅ Add `LocalBusiness` JSON-LD with full NAP, geo, hours, sameAs
9. ✅ Add `FAQPage` JSON-LD on /faq
10. ✅ Add `BreadcrumbList` JSON-LD on product pages
11. ✅ Add per-page hreflang alternates
12. ✅ Verify domain in Google Search Console + submit sitemap
13. ✅ Submit business to Google Business Profile (uses LocalBusiness data)

### Medium priority (next sprint)

14. ⏳ Migrate `<img>` → `next/image` for LCP-critical images (Hero, AboutPreview)
15. ⏳ Add analytics (GA4 or Plausible)
16. ⏳ Improve Hero alt text
17. ⏳ Add a blog/insights section with 3-5 articles targeting commercial keywords ("egyptian salt supplier", "industrial salt egypt", "ملح صناعي مصر")

### Long-term (organic ranking moat)

18. ⏳ Build backlinks from Egyptian B2B directories, trade publications, salt industry resources
19. ⏳ Publish quarterly product spec sheets (PDF) and link them
20. ⏳ Get listed on Alibaba, IndexMundi, Made-in-China-Egypt sections
21. ⏳ Add testimonials with company names and link to their websites
22. ⏳ Create case studies for major buyers

---

## What I Cannot Promise

A "guaranteed first-page Google ranking" is not something any audit can deliver. Rankings depend on:
- Backlinks (off-page authority)
- Domain age and trust
- Competitor strength in your keyword space
- Content depth and freshness
- User signals (CTR, dwell time, bounce)

What this audit guarantees: after applying the **Immediate + High Priority** lists, the site will be **technically as ready as a site can be** to compete. Ranking is then a function of authority and content, which take 3-12 months of consistent work.

---

## Glossary

- **NAP:** Name, Address, Phone — the three signals Google uses to verify a local business identity
- **JSON-LD:** Linked Data in JSON format embedded in `<script type="application/ld+json">` — Google's preferred structured data format
- **Core Web Vitals:** LCP, FID, CLS — Google's Lighthouse-measured UX metrics that affect rankings
- **hreflang:** HTML annotation telling Google which language version of a page to show for which user
- **SERP:** Search Engine Results Page
- **CTR:** Click-Through Rate — what fraction of people who see a result actually click it
- **Rich snippet:** Enhanced Google result with stars, FAQ accordions, breadcrumbs, etc. — driven by structured data
