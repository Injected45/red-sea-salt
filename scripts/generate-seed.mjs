// One-shot generator: produces supabase/seed.sql from current static content.
// Run with: node scripts/generate-seed.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const en = JSON.parse(readFileSync(join(root, 'messages/en.json'), 'utf-8'));
const ar = JSON.parse(readFileSync(join(root, 'messages/ar.json'), 'utf-8'));

// products.ts is a TS file — we can't import it directly here. Hard-code the
// 8 products' non-translated fields (mirrors src/lib/products.ts exactly).
const products = [
  {
    slug: 'raw-salt',
    featured: true,
    industries: ['industrial', 'commercial'],
    specs: { purity: '95–97%', moisture: '≤ 4%', granule: '2–15 mm', packaging: ['Bulk', '50 kg bags', '1 ton big bags'] },
    image: '/products/raw-salt/1.jpg',
    gallery: ['/products/raw-salt/1.jpg', '/products/raw-salt/2.jpg', '/products/raw-salt/3.jpg'],
    videos: ['/products/raw-salt/video-1.mp4', '/products/raw-salt/video-2.mp4'],
  },
  {
    slug: 'de-icing-rock-salt',
    featured: true,
    industries: ['road-deicing'],
    specs: { purity: '97 - 99%+', moisture: '≤ 1.5%', granule: '0–12 mm (coarse)', packaging: ['Bulk', '25 kg bags', '1 ton big bags'] },
    image: '/products/de-icing-rock-salt/a1.jpg',
    gallery: ['/products/de-icing-rock-salt/a1.jpg', '/products/de-icing-rock-salt/b1.jpeg', '/products/de-icing-rock-salt/b2.jpeg'],
    videos: ['/products/de-icing-rock-salt/video.mp4', '/products/de-icing-rock-salt/video-2.mp4', '/products/de-icing-rock-salt/video-3.mp4'],
  },
  {
    slug: 'tablet-salt',
    featured: true,
    industries: ['industrial', 'commercial'],
    specs: { purity: '99.8%+', moisture: '≤ 0.1%', granule: 'Pillow / round tablet — 25 mm', packaging: ['10 kg bags', '25 kg bags', '1 ton big bags'] },
    image: '/products/tablet-salt/a1.jpg',
    gallery: ['/products/tablet-salt/a1.jpg', '/products/tablet-salt/a2.jpeg', '/products/tablet-salt/a3.jpg', '/products/tablet-salt/a4.jpg'],
    videos: ['/products/tablet-salt/video-3.mp4', '/products/tablet-salt/video-2.mp4'],
  },
  {
    slug: 'water-softener-salt',
    featured: true,
    industries: ['industrial', 'commercial'],
    specs: { purity: '99.5%+', moisture: '≤ 0.2%', granule: 'Tablets / coarse granules', packaging: ['25 kg bags', '50 kg bags', 'Bulk'] },
    image: '/products/water-softener-salt/ext-1.webp',
    gallery: ['/products/water-softener-salt/ext-1.webp'],
    videos: ['/products/water-softener-salt/video-1.mp4', '/products/water-softener-salt/video-2.mp4', '/products/water-softener-salt/video-3.mp4'],
  },
  {
    slug: 'pool-salt',
    featured: true,
    industries: ['pools', 'commercial'],
    specs: { purity: '99.5%+', moisture: '≤ 0.2%', granule: '1–3 mm', packaging: ['25 kg bags', '50 kg bags', 'Bulk'] },
    image: '/products/pool-salt/1.jpg',
    gallery: ['/products/pool-salt/1.jpg'],
    videos: ['/products/pool-salt/video-2.mp4'],
  },
  {
    slug: 'industrial-salt',
    featured: false,
    industries: ['industrial', 'commercial'],
    specs: { purity: '97–98%', moisture: '≤ 3%', granule: '1–5 mm', packaging: ['Bulk', '50 kg bags'] },
    image: '/products/industrial-salt/1.webp',
    gallery: ['/products/industrial-salt/1.webp', '/products/industrial-salt/2.webp', '/products/industrial-salt/3.jpeg'],
    videos: ['/products/industrial-salt/video.mp4'],
  },
  {
    slug: 'food-grade-salt',
    featured: true,
    industries: ['food', 'commercial'],
    specs: { purity: '99.5%+', moisture: '≤ 0.2%', granule: '0.2–0.8 mm', packaging: ['25 kg bags', '50 kg bags', 'Retail packaging'] },
    image: '/products/food-grade-salt/1.jpg',
    gallery: ['/products/food-grade-salt/1.jpg', '/products/food-grade-salt/2.jpg', '/products/food-grade-salt/3.jpg', '/products/food-grade-salt/4.jpeg'],
    videos: [],
  },
  {
    slug: 'marine-salt',
    featured: false,
    industries: ['food', 'industrial', 'commercial'],
    specs: { purity: '97–99%', moisture: '≤ 2.5%', granule: '0.5–5 mm', packaging: ['Bulk', '25 kg bags', '50 kg bags', '1 ton big bags'] },
    image: '/products/marine-salt/1.jpeg',
    gallery: ['/products/marine-salt/1.jpeg', '/products/marine-salt/2.jpeg', '/products/marine-salt/3.jpeg'],
    videos: ['/products/marine-salt/video-1.mp4', '/products/marine-salt/video-2.mp4'],
  },
];

// Site content keys to seed
const siteKeys = [
  'meta.siteName', 'meta.tagline', 'meta.description',
  'home.hero.eyebrow', 'home.hero.title', 'home.hero.subtitle',
  'home.about.body', 'home.about.shippingTitle', 'home.about.shippingBody',
  'about.story.body', 'about.mission.body', 'about.vision.body', 'about.location.body',
  'about.founder.name', 'about.founder.role', 'about.founder.tagline', 'about.founder.body',
  'contact.info.address', 'contact.info.hoursValue',
  'faq.items.q1.q', 'faq.items.q1.a', 'faq.items.q2.q', 'faq.items.q2.a',
  'faq.items.q3.q', 'faq.items.q3.a', 'faq.items.q4.q', 'faq.items.q4.a',
  'faq.items.q5.q', 'faq.items.q5.a',
  'footer.tagline',
];

function get(obj, key) { return key.split('.').reduce((o, p) => o?.[p], obj); }
function pgQuote(value) { if (value === null || value === undefined) return 'NULL'; return `'${String(value).replace(/'/g, "''")}'`; }
function pgArray(arr) { if (!arr || arr.length === 0) return `ARRAY[]::text[]`; return `ARRAY[${arr.map(pgQuote).join(', ')}]::text[]`; }
function pgJson(obj) { return `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`; }

let sql = `-- =========================================================
-- Red Sea Salt — Seed data
-- =========================================================
-- Run AFTER admin-schema.sql.
-- Idempotent — uses ON CONFLICT to upsert.
-- =========================================================

begin;

-- 1. Site content =========================================
`;

for (const key of siteKeys) {
  const val_en = get(en, key);
  const val_ar = get(ar, key);
  if (val_en === undefined || val_ar === undefined) {
    throw new Error(`Missing translation for key: ${key} (en=${val_en}, ar=${val_ar})`);
  }
  sql += `insert into public.site_content (key, value_ar, value_en) values (${pgQuote(key)}, ${pgQuote(val_ar)}, ${pgQuote(val_en)})\n`;
  sql += `  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;\n`;
}

sql += `\n-- 2. Products =============================================\n`;
products.forEach((p, i) => {
  const order = i * 10;
  sql += `insert into public.products_db (slug, featured, industries, specs, image, gallery, videos, display_order) values (\n`;
  sql += `  ${pgQuote(p.slug)}, ${p.featured}, ${pgArray(p.industries)}, ${pgJson(p.specs)},\n`;
  sql += `  ${pgQuote(p.image)}, ${pgArray(p.gallery)}, ${pgArray(p.videos)}, ${order}\n`;
  sql += `) on conflict (slug) do update set\n`;
  sql += `  featured = excluded.featured, industries = excluded.industries, specs = excluded.specs,\n`;
  sql += `  image = excluded.image, gallery = excluded.gallery, videos = excluded.videos,\n`;
  sql += `  display_order = excluded.display_order;\n`;
});

sql += `\n-- 3. Product translations ================================\n`;
for (const p of products) {
  const enT = en.products.items[p.slug];
  const arT = ar.products.items[p.slug];
  if (!enT || !arT) throw new Error(`Missing product translation for ${p.slug}`);
  for (const [locale, t] of [['ar', arT], ['en', enT]]) {
    sql += `insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (\n`;
    sql += `  ${pgQuote(p.slug)}, ${pgQuote(locale)}, ${pgQuote(t.name)}, ${pgQuote(t.short)}, ${pgQuote(t.description)},\n`;
    sql += `  ${pgArray(t.keyFeatures)}, ${pgArray(t.applications)}\n`;
    sql += `) on conflict (product_slug, locale) do update set\n`;
    sql += `  name = excluded.name, short = excluded.short, description = excluded.description,\n`;
    sql += `  key_features = excluded.key_features, applications = excluded.applications;\n`;
  }
}

sql += `
commit;

-- =========================================================
-- Verify after running:
--   select count(*) from public.site_content;     -- expects ${siteKeys.length}
--   select count(*) from public.products_db;       -- expects ${products.length}
--   select count(*) from public.product_translations;  -- expects ${products.length * 2}
-- =========================================================
`;

writeFileSync(join(root, 'supabase/seed.sql'), sql, 'utf-8');
console.log(`✓ Wrote supabase/seed.sql (${sql.length} bytes)`);
console.log(`  - ${siteKeys.length} site_content rows`);
console.log(`  - ${products.length} products_db rows`);
console.log(`  - ${products.length * 2} product_translations rows`);
