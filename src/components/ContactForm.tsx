'use client';

import { useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { submitContact } from '@/app/actions/submissions';

type ProductOption = { slug: string; name: string };

type Status =
  | { state: 'idle' }
  | { state: 'ok' }
  | { state: 'error'; code: string };

export default function ContactForm({
  productOptions,
}: {
  productOptions: ProductOption[];
}) {
  const t = useTranslations('contact.form');
  const tStatus = useTranslations('contact.status');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set('locale', locale);
    const form = e.currentTarget;
    startTransition(async () => {
      const res = await submitContact(fd);
      if (res.ok) {
        setStatus({ state: 'ok' });
        form.reset();
      } else {
        setStatus({ state: 'error', code: res.error });
      }
    });
  };

  if (status.state === 'ok') {
    return (
      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-brand-900">
              {tStatus('okTitle')}
            </p>
            <p className="text-sm text-brand-700">{tStatus('okBody')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('name')} name="name" required />
        <Field label={t('email')} name="email" type="email" required />
        <Field label={t('phone')} name="phone" type="tel" />
        <Field label={t('company')} name="company" />
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-brand-800">{t('product')}</span>
        <select
          name="product"
          className="w-full rounded-xl border border-brand-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        >
          <option value="">{t('selectProduct')}</option>
          {productOptions.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-brand-800">{t('message')}</span>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full rounded-xl border border-brand-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>
      {status.state === 'error' && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {tStatus(`errors.${status.code}`)}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary mt-2 self-start disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? tStatus('sending') : t('submit')}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-brand-800">
        {label}
        {required && <span className="text-accent-dark"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-brand-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
      />
    </label>
  );
}
