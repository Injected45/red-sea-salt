import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Reveal from '../motion/Reveal';

export default function CallToAction() {
  const t = useTranslations('home.cta');

  return (
    <section className="section">
      <div className="container mx-auto">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[32px] bg-brand-900 p-10 text-white shadow-2xl md:p-16">
            <div
              className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-accent/30 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl"
              aria-hidden
            />
            <div className="grain absolute inset-0" aria-hidden />

            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full opacity-[0.12]"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 800 400"
            >
              <defs>
                <pattern id="wave-cta" width="80" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 20 Q 20 0 40 20 T 80 20" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-accent" />
                </pattern>
              </defs>
              <rect width="800" height="400" fill="url(#wave-cta)" />
            </svg>

            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="eyebrow !text-accent-light">{t('eyebrow')}</p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-balance md:text-5xl">
                  {t('title').split(' ').slice(0, -2).join(' ')}{' '}
                  <span className="italic text-accent-light">
                    {t('title').split(' ').slice(-2).join(' ')}
                  </span>
                </h2>
                <p className="mt-5 max-w-md text-brand-100/90">{t('body')}</p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link href="/contact" className="btn-accent group">
                  <span>{t('button')}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/products" className="btn-ghost">
                  {t('secondary')}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
