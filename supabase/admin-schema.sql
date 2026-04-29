-- =========================================================
-- Red Sea Salt — Admin schema migration
-- =========================================================
-- Run AFTER the existing supabase/schema.sql.
-- Adds: site_content, products_db, product_translations,
--       contact_submissions.read column, updated_at trigger.
-- Idempotent — safe to re-run.
-- =========================================================

-- 1. contact_submissions: add 'read' column for admin inbox
alter table public.contact_submissions
  add column if not exists read boolean not null default false;

create index if not exists contact_submissions_read_created_idx
  on public.contact_submissions (read, created_at desc);

-- 2. Site content (key/value with ar + en) ================
create table if not exists public.site_content (
  key         text primary key,
  value_ar    text,
  value_en    text,
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "site_content: anon select" on public.site_content;
create policy "site_content: anon select"
  on public.site_content
  for select to anon, authenticated
  using (true);

drop policy if exists "site_content: authenticated write" on public.site_content;
create policy "site_content: authenticated write"
  on public.site_content
  for all to authenticated
  using (true)
  with check (true);

-- 3. Products (non-translated fields) ======================
create table if not exists public.products_db (
  slug            text primary key,
  featured        boolean not null default false,
  industries      text[]  not null default '{}',
  specs           jsonb   not null default '{}',
  image           text    not null,
  gallery         text[]  not null default '{}',
  videos          text[]  not null default '{}',
  analysis_image  text,
  display_order   integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_db_display_order_idx
  on public.products_db (display_order);

create index if not exists products_db_featured_idx
  on public.products_db (featured) where featured = true;

alter table public.products_db enable row level security;

drop policy if exists "products_db: anon select" on public.products_db;
create policy "products_db: anon select"
  on public.products_db
  for select to anon, authenticated
  using (true);

drop policy if exists "products_db: authenticated write" on public.products_db;
create policy "products_db: authenticated write"
  on public.products_db
  for all to authenticated
  using (true)
  with check (true);

-- 4. Product translations =================================
create table if not exists public.product_translations (
  product_slug    text not null references public.products_db(slug) on delete cascade,
  locale          text not null check (locale in ('ar', 'en')),
  name            text not null,
  short           text not null,
  description     text not null,
  key_features    text[] not null default '{}',
  applications    text[] not null default '{}',
  updated_at      timestamptz not null default now(),
  primary key (product_slug, locale)
);

create index if not exists product_translations_locale_idx
  on public.product_translations (locale);

alter table public.product_translations enable row level security;

drop policy if exists "product_translations: anon select" on public.product_translations;
create policy "product_translations: anon select"
  on public.product_translations
  for select to anon, authenticated
  using (true);

drop policy if exists "product_translations: authenticated write" on public.product_translations;
create policy "product_translations: authenticated write"
  on public.product_translations
  for all to authenticated
  using (true)
  with check (true);

-- 5. updated_at auto-touch trigger ========================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_site_content on public.site_content;
create trigger touch_site_content
  before update on public.site_content
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_products_db on public.products_db;
create trigger touch_products_db
  before update on public.products_db
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_product_translations on public.product_translations;
create trigger touch_product_translations
  before update on public.product_translations
  for each row execute function public.touch_updated_at();

-- =========================================================
-- Verify after running:
--   select column_name from information_schema.columns
--     where table_name = 'contact_submissions' and column_name = 'read';
--   -- expects 1 row
--
--   select tablename from pg_tables
--     where schemaname = 'public'
--       and tablename in ('site_content','products_db','product_translations');
--   -- expects 3 rows
-- =========================================================
