import Link from 'next/link';
import ReviewActions from '@/components/admin/ReviewActions';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Review = {
  id: number;
  name: string;
  email: string;
  rating: number;
  message: string;
  approved: boolean;
  locale: string;
  created_at: string;
};

async function loadReviews(approved: boolean): Promise<Review[]> {
  const sb = createSupabaseServiceClient();
  const { data } = await sb
    .from('testimonials')
    .select('id, name, email, rating, message, approved, locale, created_at')
    .eq('approved', approved)
    .order('created_at', { ascending: false });
  return (data ?? []) as Review[];
}

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = 'pending' } = await searchParams;
  const isPending = tab !== 'approved';
  const items = await loadReviews(!isPending);
  const pendingCount = (await loadReviews(false)).length;
  const approvedCount = isPending ? (await loadReviews(true)).length : items.length;
  const pCount = isPending ? items.length : pendingCount;

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900">Reviews</h1>
        <p className="mt-1 text-sm text-slate-600">
          Approve or reject incoming testimonials. Approved reviews appear on the home page.
        </p>
      </header>

      <div className="mb-6 inline-flex rounded-xl border border-slate-200 bg-white p-1">
        <TabLink href="/admin/reviews?tab=pending" active={isPending} count={pCount}>
          Pending
        </TabLink>
        <TabLink href="/admin/reviews?tab=approved" active={!isPending} count={approvedCount}>
          Approved
        </TabLink>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-medium text-slate-700">
            {isPending ? 'No reviews waiting for moderation.' : 'No approved reviews yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Stars rating={r.rating} />
                    <span className="font-semibold text-slate-900">{r.name}</span>
                    <span className="text-xs text-slate-500">·</span>
                    <span className="text-xs text-slate-500">{r.email}</span>
                    <span className="text-xs text-slate-500">·</span>
                    <span className="text-xs text-slate-500">{formatDate(r.created_at)}</span>
                    <span className="text-xs text-slate-500">·</span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-600">
                      {r.locale}
                    </span>
                  </div>
                  <blockquote className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                    {r.message}
                  </blockquote>
                </div>
                <ReviewActions id={r.id} status={isPending ? 'pending' : 'approved'} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function TabLink({
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
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
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

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={n <= rating ? 'text-amber-500' : 'text-slate-300'}
        >
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.8 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function formatDate(s: string) {
  const d = new Date(s);
  return d.toISOString().slice(0, 10);
}
