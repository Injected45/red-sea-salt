import { getTranslations } from 'next-intl/server';
import Reveal from '../motion/Reveal';
import TestimonialForm from './TestimonialForm';
import { listApprovedTestimonials, type Testimonial } from '@/app/actions/submissions';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className={n <= rating ? 'text-accent' : 'text-brand-200'}
        >
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.8 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default async function Testimonials() {
  const t = await getTranslations('home.testimonials');
  const items: Testimonial[] = await listApprovedTestimonials(9);

  return (
    <section className="section relative overflow-hidden bg-ivory-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,164,65,0.08),transparent_55%)]"
        aria-hidden
      />
      <div className="container relative mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('eyebrow')}</p>
          <h2 className="section-title mt-4 text-balance">
            {t('title')}{' '}
            <span className="italic text-accent-dark">{t('titleItalic')}</span>
          </h2>
          <p className="mt-4 text-brand-700 md:text-lg">{t('subtitle')}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {items.length === 0 ? (
              <Reveal>
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-brand-200 bg-white/60 p-10 text-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
                    <path d="M7 8h10M7 12h7M5 20l3-3h11a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12l2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-4 font-display text-xl text-brand-900">{t('emptyTitle')}</p>
                  <p className="mt-2 max-w-sm text-sm text-brand-700">{t('emptyBody')}</p>
                </div>
              </Reveal>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((item, i) => (
                  <Reveal key={item.id} delay={i * 80}>
                    <figure className="group relative h-full overflow-hidden rounded-2xl border border-brand-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                      <svg
                        aria-hidden
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mb-4 text-accent/40"
                      >
                        <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.34C5.76 9.53 6.76 8.2 8.17 7.17L7.17 6zm10 0A5.17 5.17 0 0012 11.17V18h6.83v-6.83h-3.49c.42-1.64 1.42-2.97 2.83-4L17.17 6z" />
                      </svg>
                      <Stars rating={item.rating} />
                      <blockquote className="mt-4 font-display text-lg italic leading-snug text-brand-900">
                        “{item.message}”
                      </blockquote>
                      <figcaption className="mt-4 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 font-display text-sm text-accent-light">
                          {item.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="text-sm font-semibold text-brand-900">
                          {item.name}
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          <Reveal variant="right" className="lg:col-span-2">
            <div className="sticky top-28">
              <p className="eyebrow">{t('form.eyebrow')}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-brand-900 md:text-3xl">
                {t('form.title')}
              </h3>
              <p className="mt-3 text-sm text-brand-700">{t('form.subtitle')}</p>
              <div className="mt-6">
                <TestimonialForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
