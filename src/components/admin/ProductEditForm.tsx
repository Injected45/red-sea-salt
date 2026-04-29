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
    <div className="space-y-8 pb-24">
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
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
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
        <Field label="Main image (relative path or URL)">
          <input
            value={state.image}
            onChange={(e) => setState((s) => ({ ...s, image: e.target.value }))}
            className="input"
          />
        </Field>
        <Field label="Gallery (one path per line — first is the cover)">
          <TextareaList
            value={state.gallery}
            onChange={(arr) => setState((s) => ({ ...s, gallery: arr }))}
            rows={6}
          />
        </Field>
        <Field label="Videos (one path per line)">
          <TextareaList
            value={state.videos}
            onChange={(arr) => setState((s) => ({ ...s, videos: arr }))}
            rows={4}
          />
        </Field>
        <Field label="Analysis image (optional)">
          <input
            value={state.analysisImage ?? ''}
            onChange={(e) =>
              setState((s) => ({ ...s, analysisImage: e.target.value.trim() || null }))
            }
            className="input"
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
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur-sm ml-60">
        <div className="flex items-center justify-between gap-4 px-8 py-4">
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
            className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
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
          padding: 0.5rem 0.75rem;
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
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
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
