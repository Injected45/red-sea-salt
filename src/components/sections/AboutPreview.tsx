import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Reveal from '../motion/Reveal';

export default function AboutPreview() {
  const t = useTranslations('home.about');

  return (
    <section className="section relative overflow-hidden">
      <div className="container mx-auto grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal variant="right">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="section-title mt-4 text-balance">
            {t('title').split(' ').slice(0, -2).join(' ')}{' '}
            <span className="italic text-accent-dark">
              {t('title').split(' ').slice(-2).join(' ')}
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-700 md:text-lg">
            {t('body')}
          </p>
          <div className="mt-10 flex items-center gap-6">
            <Link href="/about" className="btn-primary group">
              <span>{t('cta')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="hidden items-center gap-3 sm:flex">
              <div className="h-10 w-10 rounded-full border border-brand-200 bg-ivory-100" />
              <p className="text-xs leading-tight text-brand-700">
                <span className="block font-semibold text-brand-900">2011 · Est.</span>
                Ras Gharib, EG
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={150}>
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-accent/20 via-brand-100 to-transparent blur-2xl"
              aria-hidden
            />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/placeholder.svg"
                    alt=""
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="rounded-2xl border border-brand-100 bg-white p-5">
                  <div className="font-display text-4xl font-semibold text-brand-900">
                    14<span className="text-accent">+</span>
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-brand-700">
                    Years of expertise
                  </div>
                </div>
              </div>
              <div className="mt-10 space-y-4">
                <div className="rounded-2xl bg-brand-900 p-6 text-white">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-accent-light">
                    Origin
                  </div>
                  <div className="mt-3 font-display text-2xl leading-tight">
                    Ras Gharib · <span className="italic text-accent-light">Red Sea</span>
                  </div>
                  <p className="mt-3 text-xs text-brand-100/80">
                    Strategic location with direct sea & land access for regional export.
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/placeholder.svg"
                    alt=""
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
