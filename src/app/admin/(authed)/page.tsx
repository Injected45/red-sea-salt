import { createSupabaseServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function loadStats() {
  const sb = createSupabaseServiceClient();

  const [pending, unread, products] = await Promise.all([
    sb.from('testimonials').select('id', { count: 'exact', head: true }).eq('approved', false),
    sb.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('read', false),
    sb.from('products_db').select('slug', { count: 'exact', head: true }),
  ]);

  return {
    pendingReviews: pending.count ?? 0,
    unreadContacts: unread.count ?? 0,
    products: products.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const stats = await loadStats();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Welcome back. Here&apos;s what needs your attention today.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Pending reviews"
          value={stats.pendingReviews}
          href="/admin/reviews"
          accent="amber"
          hint={stats.pendingReviews === 0 ? 'No reviews waiting' : 'Awaiting moderation'}
        />
        <StatCard
          label="Unread contacts"
          value={stats.unreadContacts}
          href="/admin/contacts"
          accent="sky"
          hint={stats.unreadContacts === 0 ? 'Inbox is clear' : 'New messages received'}
        />
        <StatCard
          label="Products"
          value={stats.products}
          href="/admin/products"
          accent="emerald"
          hint="Total in catalogue"
        />
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-slate-900">
          Quick actions
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <QuickLink
            href="/admin/reviews"
            title="Moderate reviews"
            desc="Approve, unpublish, or reject incoming testimonials."
          />
          <QuickLink
            href="/admin/contacts"
            title="Read contacts"
            desc="Inbox of customer enquiries from the website form."
          />
          <QuickLink
            href="/admin/products"
            title="Edit a product"
            desc="Update names, descriptions, specs, and translations."
          />
          <QuickLink
            href="/admin/content"
            title="Edit site copy"
            desc="Hero, About, FAQs, footer, and meta descriptions."
          />
        </ul>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  accent,
  hint,
}: {
  label: string;
  value: number;
  href: string;
  accent: 'amber' | 'sky' | 'emerald';
  hint: string;
}) {
  const accentMap = {
    amber: 'bg-amber-100 text-amber-900',
    sky: 'bg-sky-100 text-sky-900',
    emerald: 'bg-emerald-100 text-emerald-900',
  };
  return (
    <a
      href={href}
      className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${accentMap[accent]}`}>
          {hint}
        </span>
      </div>
      <div className="mt-3 font-display text-4xl font-bold text-slate-900">
        {value}
      </div>
    </a>
  );
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <li>
      <a
        href={href}
        className="block rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-slate-100"
      >
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-600">{desc}</div>
      </a>
    </li>
  );
}
