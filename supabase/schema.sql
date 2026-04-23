-- Red Sea Salt — DB schema for contact_submissions + testimonials
-- Apply in the Supabase SQL editor (or via `supabase db push`).

-- =========================================================
-- contact_submissions
-- =========================================================
create table if not exists public.contact_submissions (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  product     text,
  message     text not null,
  locale      text not null default 'en',
  source      text
);

alter table public.contact_submissions enable row level security;

drop policy if exists "contact_submissions: anon insert" on public.contact_submissions;
create policy "contact_submissions: anon insert"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- No public select policy — submissions are private.

-- =========================================================
-- testimonials
-- =========================================================
create table if not exists public.testimonials (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  rating      smallint not null check (rating between 1 and 5),
  message     text not null,
  approved    boolean not null default false,
  locale      text not null default 'en'
);

create index if not exists testimonials_approved_created_idx
  on public.testimonials (approved, created_at desc);

alter table public.testimonials enable row level security;

drop policy if exists "testimonials: anon insert" on public.testimonials;
create policy "testimonials: anon insert"
  on public.testimonials
  for insert
  to anon
  with check (true);

drop policy if exists "testimonials: anon read approved" on public.testimonials;
create policy "testimonials: anon read approved"
  on public.testimonials
  for select
  to anon
  using (approved = true);
