import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const h = await getTranslations({ locale, namespace: 'about.hero' });
  return { title: t('about'), description: h('subtitle') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const values = t.raw('values.items') as string[];

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="section">
        <div className="container mx-auto grid gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <h2 className="section-title">{t('story.title')}</h2>
            <p className="mt-5 text-base leading-relaxed text-brand-700 md:text-lg">
              {t('story.body')}
            </p>
          </div>
          <aside className="md:col-span-2">
            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-8">
              <div className="text-5xl font-bold text-brand-700">2011</div>
              <p className="mt-2 text-sm text-brand-700">{t('hero.subtitle')}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-brand-50">
        <div className="container mx-auto grid gap-8 md:grid-cols-2">
          <div className="card">
            <h3 className="font-display text-2xl font-bold text-brand-900">{t('mission.title')}</h3>
            <p className="mt-3 text-brand-700">{t('mission.body')}</p>
          </div>
          <div className="card">
            <h3 className="font-display text-2xl font-bold text-brand-900">{t('vision.title')}</h3>
            <p className="mt-3 text-brand-700">{t('vision.body')}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          <h2 className="section-title">{t('values.title')}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <div key={v} className="rounded-2xl border border-brand-100 bg-white p-5 text-center font-semibold text-brand-800">
                {v}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ivory-50">
        <div className="container mx-auto grid gap-12 md:grid-cols-5 md:items-center">
          <div className="md:col-span-2">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-accent/25 via-brand-100 to-transparent blur-2xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm">
                <img
                  src="/about/founder.jpeg"
                  alt={t('founder.imageAlt')}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">{t('founder.eyebrow')}</p>
            <h2 className="section-title mt-4 text-balance">
              {t('founder.name')}
            </h2>
            <p className="mt-3 font-display text-lg text-brand-700">
              {t('founder.role')}
            </p>
            <p className="mt-6 font-display text-xl italic text-accent-dark">
              {t('founder.tagline')}
            </p>
            <p className="mt-6 text-base leading-relaxed text-brand-700 md:text-lg">
              {t('founder.body')}
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-900 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">{t('location.title')}</h2>
          <p className="mt-4 text-brand-100">{t('location.body')}</p>
        </div>
      </section>
    </>
  );
}
