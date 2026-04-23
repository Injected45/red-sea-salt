'use client';

import { useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { submitTestimonial } from '@/app/actions/submissions';

type Status =
  | { state: 'idle' }
  | { state: 'ok' }
  | { state: 'error'; code: string };

export default function TestimonialForm() {
  const t = useTranslations('home.testimonials.form');
  const tStatus = useTranslations('home.testimonials.status');
  const locale = useLocale();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating < 1) {
      setStatus({ state: 'error', code: 'invalid_rating' });
      return;
    }
    const fd = new FormData(e.currentTarget);
    fd.set('rating', String(rating));
    fd.set('locale', locale);
    const form = e.currentTarget;
    startTransition(async () => {
      const res = await submitTestimonial(fd);
      if (res.ok) {
        setStatus({ state: 'ok' });
        setRating(0);
        form.reset();
      } else {
        setStatus({ state: 'error', code: res.error });
      }
    });
  };

  if (status.state === 'ok') {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-4 font-display text-xl font-semibold text-brand-900">
          {tStatus('okTitle')}
        </p>
        <p className="mt-2 text-sm text-brand-700">{tStatus('okBody')}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm md:p-8"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-brand-800">
          {t('rating')}
          <span className="text-accent-dark"> *</span>
        </label>
        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setHover(0)}
          role="radiogroup"
          aria-label={t('rating')}
        >
          {[1, 2, 3, 4, 5].map((n) => {
            const active = (hover || rating) >= n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onFocus={() => setHover(n)}
                onBlur={() => setHover(0)}
                aria-label={`${n} / 5`}
                aria-pressed={rating === n}
                className={`cursor-pointer rounded-md p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active ? 'text-accent' : 'text-brand-200'
                }`}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2l2.9 6.6 7.1.6-5.4 4.8 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6L12 2z" />
                </svg>
              </button>
            );
          })}
          <span className="ms-2 text-xs text-brand-700">
            {rating > 0 ? `${rating} / 5` : t('selectRating')}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('name')} name="name" required />
        <Field label={t('email')} name="email" type="email" required />
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-brand-800">
          {t('message')}
          <span className="text-accent-dark"> *</span>
        </span>
        <textarea
          name="message"
          rows={4}
          required
          maxLength={2000}
          className="w-full rounded-xl border border-brand-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>

      {status.state === 'error' && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {tStatus(`errors.${status.code}`)}
        </p>
      )}

      <p className="text-xs text-brand-700">{t('disclaimer')}</p>

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
