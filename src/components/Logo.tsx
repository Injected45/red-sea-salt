import { useLocale, useTranslations } from 'next-intl';

export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const t = useTranslations('meta');
  const locale = useLocale();
  const color = variant === 'light' ? 'text-white' : 'text-brand-900';

  return (
    <span className={`flex items-center gap-2.5 font-display font-bold ${color}`}>
      <span
        className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ${
          variant === 'light' ? 'bg-white/10 ring-1 ring-white/20' : 'bg-white ring-1 ring-brand-100'
        }`}
      >
        <img
          src="/logo.png"
          alt={t('siteName')}
          width={40}
          height={40}
          className="h-full w-full object-contain"
        />
      </span>
      <span className={locale === 'ar' ? 'text-lg leading-tight' : 'text-base leading-tight'}>
        {t('siteName')}
      </span>
    </span>
  );
}
