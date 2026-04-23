'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      className="rounded-full border border-brand-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 hover:bg-brand-50 disabled:opacity-50"
      aria-label="Switch language"
    >
      {locale === 'ar' ? 'EN' : 'AR'}
    </button>
  );
}
