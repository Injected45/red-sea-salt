'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { approveReview, rejectReview, unpublishReview } from '@/app/actions/admin-reviews';

type Action = 'approve' | 'reject' | 'unpublish';

export default function ReviewActions({ id, status }: { id: number; status: 'pending' | 'approved' }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const run = (action: Action) => {
    setError(null);
    startTransition(async () => {
      let res;
      if (action === 'approve') res = await approveReview(id);
      else if (action === 'unpublish') res = await unpublishReview(id);
      else res = await rejectReview(id);

      if (!res.ok) setError(res.error);
      else router.refresh();
    });
  };

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <div className="flex gap-2">
        {status === 'pending' ? (
          <>
            <button
              type="button"
              onClick={() => run('approve')}
              disabled={pending}
              className="rounded-lg bg-emerald-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm('Permanently reject and delete this review?')) run('reject');
              }}
              disabled={pending}
              className="rounded-lg border border-red-200 bg-white px-3 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
            >
              Reject
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => run('unpublish')}
            disabled={pending}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Unpublish
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
