import Link from 'next/link';
import ContactRow from '@/components/admin/ContactRow';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Filter = 'all' | 'unread' | 'recent';

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  product: string | null;
  message: string;
  locale: string;
  read: boolean;
  created_at: string;
};

async function loadContacts(filter: Filter): Promise<Contact[]> {
  const sb = createSupabaseServiceClient();
  let q = sb
    .from('contact_submissions')
    .select('id, name, email, phone, company, product, message, locale, read, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  if (filter === 'unread') q = q.eq('read', false);
  if (filter === 'recent') {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    q = q.gte('created_at', sevenDaysAgo);
  }

  const { data } = await q;
  return (data ?? []) as Contact[];
}

async function loadCounts() {
  const sb = createSupabaseServiceClient();
  const [all, unread, recent] = await Promise.all([
    sb.from('contact_submissions').select('id', { count: 'exact', head: true }),
    sb.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('read', false),
    sb.from('contact_submissions').select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ]);
  return {
    all: all.count ?? 0,
    unread: unread.count ?? 0,
    recent: recent.count ?? 0,
  };
}

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter: filterParam } = await searchParams;
  const filter: Filter = filterParam === 'unread' || filterParam === 'recent' ? filterParam : 'all';
  const [contacts, counts] = await Promise.all([loadContacts(filter), loadCounts()]);

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900">Contacts</h1>
        <p className="mt-1 text-sm text-slate-600">
          Customer enquiries from the website contact form. Showing the latest 100.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1">
        <FilterChip href="/admin/contacts?filter=all" active={filter === 'all'} count={counts.all}>
          All
        </FilterChip>
        <FilterChip href="/admin/contacts?filter=unread" active={filter === 'unread'} count={counts.unread}>
          Unread
        </FilterChip>
        <FilterChip href="/admin/contacts?filter=recent" active={filter === 'recent'} count={counts.recent}>
          Last 7 days
        </FilterChip>
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-medium text-slate-700">
            {filter === 'unread'
              ? 'Inbox is clear — no unread messages.'
              : filter === 'recent'
              ? 'No contacts in the last 7 days.'
              : 'No contact submissions yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c) => (
            <ContactRow key={c.id} contact={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  href,
  active,
  count,
  children,
}: {
  href: string;
  active: boolean;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex min-h-[40px] items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
        active ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'
      }`}
    >
      <span>{children}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
          active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
        }`}
      >
        {count}
      </span>
    </Link>
  );
}
