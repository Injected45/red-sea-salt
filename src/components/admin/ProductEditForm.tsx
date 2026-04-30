'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateProduct, type ProductUpdate } from '@/app/actions/admin-products';
import type { DbProduct } from '@/lib/db-products';

const INDUSTRY_OPTIONS = [
  { value: 'road-deicing', label: 'Road de-icing' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'food', label: 'Food' },
  { value: 'pools', label: 'Pools' },
  { value: 'commercial', label: 'Commercial' },
];

type FormState = ProductUpdate;
type SourceKind = 'local' | 'remote' | 'empty';

function classify(value: string): SourceKind {
  if (!value) return 'empty';
  if (/^https?:\/\//i.test(value)) return 'remote';
  if (value.startsWith('/')) return 'local';
  return 'empty';
}

function fromProduct(p: DbProduct): FormState {
  return {
    featured: p.featured,
    industries: [...p.industries],
    specs: { ...p.specs, packaging: [...p.specs.packaging] },
    image: p.image,
    gallery: [...p.gallery],
    videos: [...p.videos],
    analysisImage: p.analysisImage,
    displayOrder: p.displayOrder,
    translations: {
      ar: {
        name: p.translations.ar.name,
        short: p.translations.ar.short,
        description: p.translations.ar.description,
        keyFeatures: [...p.translations.ar.keyFeatures],
        applications: [...p.translations.ar.applications],
      },
      en: {
        name: p.translations.en.name,
        short: p.translations.en.short,
        description: p.translations.en.description,
        keyFeatures: [...p.translations.en.keyFeatures],
        applications: [...p.translations.en.applications],
      },
    },
  };
}

export default function ProductEditForm({ product }: { product: DbProduct }) {
  const [state, setState] = useState<FormState>(() => fromProduct(product));
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const router = useRouter();

  const onSave = () => {
    setMessage(null);
    startTransition(async () => {
      const res = await updateProduct(product.slug, state);
      if (res.ok) {
        setMessage({ kind: 'ok', text: 'Saved. Changes will appear on the public site within ~60s.' });
        router.refresh();
      } else {
        setMessage({ kind: 'err', text: res.error });
      }
    });
  };

  const toggleIndustry = (value: string) => {
    setState((s) => ({
      ...s,
      industries: s.industries.includes(value)
        ? s.industries.filter((i) => i !== value)
        : [...s.industries, value],
    }));
  };

  return (
    <div className="space-y-8 pb-28 md:pb-24">
      {/* Basics */}
      <Section title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Display order">
            <input
              type="number"
              value={state.displayOrder}
              onChange={(e) => setState((s) => ({ ...s, displayOrder: Number(e.target.value) }))}
              className="input"
            />
          </Field>
          <Field label="Featured on home page">
            <label className="mt-2 inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.featured}
                onChange={(e) => setState((s) => ({ ...s, featured: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">Show on home page featured grid</span>
            </label>
          </Field>
        </div>
        <Field label="Industries">
          <div className="mt-2 flex flex-wrap gap-2">
            {INDUSTRY_OPTIONS.map((opt) => {
              const active = state.industries.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleIndustry(opt.value)}
                  className={`min-h-[40px] rounded-full border px-3 py-2 text-xs font-medium transition ${
                    active
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </Field>
      </Section>

      {/* Specs */}
      <Section title="Specifications">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Purity">
            <input
              value={state.specs.purity}
              onChange={(e) =>
                setState((s) => ({ ...s, specs: { ...s.specs, purity: e.target.value } }))
              }
              className="input"
            />
          </Field>
          <Field label="Moisture">
            <input
              value={state.specs.moisture}
              onChange={(e) =>
                setState((s) => ({ ...s, specs: { ...s.specs, moisture: e.target.value } }))
              }
              className="input"
            />
          </Field>
          <Field label="Granule">
            <input
              value={state.specs.granule}
              onChange={(e) =>
                setState((s) => ({ ...s, specs: { ...s.specs, granule: e.target.value } }))
              }
              className="input"
            />
          </Field>
        </div>
        <Field label="Packaging (one option per line)">
          <TextareaList
            value={state.specs.packaging}
            onChange={(arr) =>
              setState((s) => ({ ...s, specs: { ...s.specs, packaging: arr } }))
            }
            rows={4}
          />
        </Field>
      </Section>

      {/* Media */}
      <Section title="Media">
        <Field label="Main image">
          <ImageSourceField
            value={state.image}
            originalValue={product.image}
            onChange={(v) => setState((s) => ({ ...s, image: v }))}
            kind="image"
          />
        </Field>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Gallery (first item is the cover)
          </span>
          <div className="mt-2 space-y-3">
            {state.gallery.map((item, idx) => (
              <ImageSourceField
                key={idx}
                value={item}
                originalValue={product.gallery[idx] ?? ''}
                onChange={(v) =>
                  setState((s) => {
                    const next = [...s.gallery];
                    next[idx] = v;
                    return { ...s, gallery: next };
                  })
                }
                onRemove={() =>
                  setState((s) => ({
                    ...s,
                    gallery: s.gallery.filter((_, i) => i !== idx),
                  }))
                }
                kind="image"
              />
            ))}
            <button
              type="button"
              onClick={() => setState((s) => ({ ...s, gallery: [...s.gallery, ''] }))}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              + Add image
            </button>
          </div>
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Videos
          </span>
          <div className="mt-2 space-y-3">
            {state.videos.map((item, idx) => (
              <ImageSourceField
                key={idx}
                value={item}
                originalValue={product.videos[idx] ?? ''}
                onChange={(v) =>
                  setState((s) => {
                    const next = [...s.videos];
                    next[idx] = v;
                    return { ...s, videos: next };
                  })
                }
                onRemove={() =>
                  setState((s) => ({
                    ...s,
                    videos: s.videos.filter((_, i) => i !== idx),
                  }))
                }
                kind="video"
              />
            ))}
            <button
              type="button"
              onClick={() => setState((s) => ({ ...s, videos: [...s.videos, ''] }))}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              + Add video
            </button>
          </div>
        </div>

        <Field label="Analysis image (optional)">
          <ImageSourceField
            value={state.analysisImage ?? ''}
            originalValue={product.analysisImage ?? ''}
            onChange={(v) =>
              setState((s) => ({ ...s, analysisImage: v.trim() ? v : null }))
            }
            kind="image"
          />
        </Field>
      </Section>

      {/* Translations */}
      <Section title="Arabic translation">
        <TranslationFields
          value={state.translations.ar}
          onChange={(v) =>
            setState((s) => ({
              ...s,
              translations: { ...s.translations, ar: v },
            }))
          }
          rtl
        />
      </Section>

      <Section title="English translation">
        <TranslationFields
          value={state.translations.en}
          onChange={(v) =>
            setState((s) => ({
              ...s,
              translations: { ...s.translations, en: v },
            }))
          }
        />
      </Section>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur-sm md:ml-60">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-8 md:py-4">
          <div className="min-w-0 flex-1">
            {message && (
              <p
                className={`truncate text-sm font-medium ${
                  message.kind === 'ok' ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {message.text}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onSave}
            disabled={pending}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {pending ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(203 213 225);
          background: white;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: rgb(15 23 42);
        }
        :global(.input:focus) {
          outline: 2px solid rgb(15 23 42);
          outline-offset: -1px;
          border-color: transparent;
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="font-display text-lg font-bold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function TextareaList({
  value,
  onChange,
  rows = 4,
}: {
  value: string[];
  onChange: (arr: string[]) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value.join('\n')}
      onChange={(e) =>
        onChange(
          e.target.value
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0),
        )
      }
      rows={rows}
      className="input"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '0.8125rem' }}
    />
  );
}

function SourceBadge({ kind }: { kind: SourceKind }) {
  const styles: Record<SourceKind, string> = {
    local: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    remote: 'bg-sky-50 text-sky-700 border-sky-200',
    empty: 'bg-slate-50 text-slate-500 border-slate-200',
  };
  const labels: Record<SourceKind, string> = {
    local: 'Local file',
    remote: 'External URL',
    empty: '—',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles[kind]}`}
    >
      {labels[kind]}
    </span>
  );
}

function ImagePreview({ value, kind }: { value: string; kind: 'image' | 'video' }) {
  const [errored, setErrored] = useState(false);

  if (kind === 'video') {
    const filename = value ? value.split('/').pop() ?? value : '';
    return (
      <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2 text-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
          <polygon points="5,3 19,12 5,21" />
        </svg>
        <span className="mt-1 line-clamp-2 break-all text-[10px] text-slate-600">
          {filename || 'No video'}
        </span>
      </div>
    );
  }

  if (!value || errored) {
    return (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={value}
      alt=""
      onError={() => setErrored(true)}
      onLoad={() => setErrored(false)}
      className="h-24 w-24 shrink-0 rounded-lg border border-slate-200 bg-slate-50 object-cover"
    />
  );
}

function ImageSourceField({
  value,
  originalValue,
  onChange,
  onRemove,
  kind,
}: {
  value: string;
  originalValue: string;
  onChange: (v: string) => void;
  onRemove?: () => void;
  kind: 'image' | 'video';
}) {
  const sourceKind = classify(value);
  const isDirty = value !== originalValue;
  const helperText =
    kind === 'video'
      ? 'Paste an https:// URL for a hosted video, or keep the local path to serve from /public.'
      : 'Paste an https:// URL to use a public image, or keep the local path to serve from /public.';

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <ImagePreview value={value} kind={kind} />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <SourceBadge kind={sourceKind} />
            {isDirty && originalValue && (
              <button
                type="button"
                onClick={() => onChange(originalValue)}
                className="text-[11px] font-semibold text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
              >
                Reset to original
              </button>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                aria-label="Remove this item"
                className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-red-50 hover:text-red-700"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            )}
          </div>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={kind === 'video' ? '/products/.../video.mp4 or https://...' : '/products/.../image.jpg or https://...'}
            className="input"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '0.8125rem' }}
          />
          <p className="text-[11px] text-slate-500">{helperText}</p>
        </div>
      </div>
    </div>
  );
}

function TranslationFields({
  value,
  onChange,
  rtl = false,
}: {
  value: ProductUpdate['translations']['ar'];
  onChange: (v: ProductUpdate['translations']['ar']) => void;
  rtl?: boolean;
}) {
  const dir = rtl ? 'rtl' : 'ltr';
  return (
    <div className="space-y-4" dir={dir}>
      <Field label="Name">
        <input
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          className="input"
        />
      </Field>
      <Field label="Short description">
        <textarea
          value={value.short}
          onChange={(e) => onChange({ ...value, short: e.target.value })}
          rows={2}
          className="input"
        />
      </Field>
      <Field label="Full description">
        <textarea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          rows={5}
          className="input"
        />
      </Field>
      <Field label="Key features (one per line)">
        <TextareaList
          value={value.keyFeatures}
          onChange={(arr) => onChange({ ...value, keyFeatures: arr })}
          rows={6}
        />
      </Field>
      <Field label="Applications (one per line)">
        <TextareaList
          value={value.applications}
          onChange={(arr) => onChange({ ...value, applications: arr })}
          rows={4}
        />
      </Field>
    </div>
  );
}
