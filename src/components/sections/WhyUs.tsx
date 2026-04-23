import { useTranslations } from 'next-intl';
import Reveal from '../motion/Reveal';

const items = [
  { key: 'experience', icon: 'M12 6v6l4 2' },
  { key: 'capacity', icon: 'M3 12h4l3-7 4 14 3-7h4' },
  { key: 'quality', icon: 'M5 13l4 4L19 7' },
  { key: 'reliability', icon: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z' },
] as const;

export default function WhyUs() {
  const t = useTranslations('home.whyUs');

  return (
    <section className="section relative bg-ivory-100">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />
      <div className="container mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('eyebrow')}</p>
          <h2 className="section-title mt-4 text-balance">
            {t('title').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="italic text-accent-dark">
              {t('title').split(' ').slice(-1)}
            </span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon }, i) => (
            <Reveal key={key} delay={i * 120}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-brand-100 bg-white p-7 transition-all duration-500 hover:border-accent/40 hover:shadow-xl">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 transition-all duration-500 group-hover:from-accent/5 group-hover:to-transparent" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-accent-light transition-transform duration-500 group-hover:-rotate-6">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d={icon}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="absolute right-6 top-6 font-display text-sm italic text-brand-200 rtl:right-auto rtl:left-6">
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-900">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-700">
                  {t(`items.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
