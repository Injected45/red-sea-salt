'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { bulkUpdateContent, type ContentRow } from '@/app/actions/admin-content';

const SECTION_LABELS: Record<string, string> = {
  meta: 'Meta (site name, tagline, description)',
  home: 'Home page',
  about: 'About page',
  contact: 'Contact page',
  faq: 'FAQ',
  footer: 'Footer',
};

function sectionFor(key: string): string {
  return key.split('.')[0];
}

function fieldLabel(key: string): string {
  return key
    .split('.')
    .slice(1)
    .join(' › ')
    .replace(/([A-Z])/g, ' $1')
    .trim();
}

export default function ContentEditor({ rows: initialRows }: { rows: ContentRow[] }) {
  const [rows, setRows] = useState<ContentRow[]>(initialRows);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const router = useRouter();

  const grouped = useMemo(() => {
    const map = new Map<string, ContentRow[]>();
    for (const r of rows) {
      const sec = sectionFor(r.key);
      if (!map.has(sec)) map.set(sec, []);
      map.get(sec)!.push(r);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [rows]);

  const dirtyKeys = useMemo(() => {
    const set = new Set<string>();
    const initialMap = new Map(initialRows.map((r) => [r.key, r]));
    for (const r of rows) {
      const init = initialMap.get(r.key);
      if (!init) {
        set.add(r.key);
        continue;
      }
      if (init.value_ar !== r.value_ar || init.value_en !== r.value_en) {
        set.add(r.key);
      }
    }
    return set;
  }, [rows, initialRows]);

  const updateField = (key: string, locale: 'ar' | 'en', value: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.key === key
          ? { ...r, [locale === 'ar' ? 'value_ar' : 'value_en']: value }
          : r,
      ),
    );
  };

  const onSave = () => {
    setMessage(null);
    const dirtyRows = rows.filter((r) => dirtyKeys.has(r.key));
    if (dirtyRows.length === 0) {
      setMessage({ kind: 'ok', text: 'Nothing to save.' });
      return;
    }
    startTransition(async () => {
      const res = await bulkUpdateContent(dirtyRows);
      if (res.ok) {
        setMessage({
          kind: 'ok',
          text: `Saved ${dirtyRows.length} field${dirtyRows.length === 1 ? '' : 's'}. Changes will appear on the public site within ~60s.`,
        });
        router.refresh();
      } else {
        setMessage({ kind: 'err', text: res.error });
      }
    });
  };

  return (
    <div className="space-y-8 pb-24">
      {grouped.map(([section, sectionRows]) => (
        <section key={section} className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-slate-900">
            {SECTION_LABELS[section] ?? section}
          </h2>
          <div className="mt-5 space-y-6">
            {sectionRows.map((row) => {
              const dirty = dirtyKeys.has(row.key);
              return (
                <div key={row.key} className={dirty ? 'rounded-lg border-l-2 border-amber-400 pl-4' : ''}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-500">{row.key}</span>
                    <span className="text-xs text-slate-400">{fieldLabel(row.key)}</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Arabic
                      </span>
                      <textarea
                        value={row.value_ar}
                        onChange={(e) => updateField(row.key, 'ar', e.target.value)}
                        rows={Math.max(2, Math.ceil(row.value_ar.length / 80))}
                        dir="rtl"
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </label>
                    <label className="block">
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        English
                      </span>
                      <textarea
                        value={row.value_en}
                        onChange={(e) => updateField(row.key, 'en', e.target.value)}
                        rows={Math.max(2, Math.ceil(row.value_en.length / 80))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <div className="fixed inset-x-0 bottom-0 z-20 ml-60 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 px-8 py-4">
          <div className="min-w-0 flex-1">
            {message ? (
              <p
                className={`truncate text-sm font-medium ${
                  message.kind === 'ok' ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {message.text}
              </p>
            ) : (
              <p className="text-sm text-slate-500">
                {dirtyKeys.size === 0
                  ? 'No unsaved changes.'
                  : `${dirtyKeys.size} field${dirtyKeys.size === 1 ? '' : 's'} pending`}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onSave}
            disabled={pending || dirtyKeys.size === 0}
            className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {pending ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
