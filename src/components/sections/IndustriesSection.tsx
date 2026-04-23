import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { industryIcons, industryKeys } from '@/lib/industries';
import Reveal from '../motion/Reveal';

export default function IndustriesSection() {
  const t = useTranslations();

  return (
    <section className="section relative overflow-hidden bg-brand-900 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,164,65,0.15),transparent_60%)]"
        aria-hidden
      />
      <div className="grain absolute inset-0 opacity-50" aria-hidden />

      <div className="container relative mx-auto">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-accent-light">{t('home.industries.eyebrow')}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-balance md:text-5xl">
              {t('home.industries.title').split(' ').slice(0, -2).join(' ')}{' '}
              <span className="italic text-accent-light">
                {t('home.industries.title').split(' ').slice(-2).join(' ')}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-brand-100/80">
              {t('home.industries.subtitle')}
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          {industryKeys.map((key, i) => (
            <Reveal key={key} delay={i * 90}>
              <Link
                href="/industries"
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:bg-white/[0.08]"
              >
                <div
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand-900 transition-transform duration-500 group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d={industryIcons[key]}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {t(`industries.items.${key}.title`)}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-accent-light opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Explore
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
