import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { industryIcons, industryKeys } from '@/lib/industries';
import { Link } from '@/i18n/routing';
import { getProducts } from '@/lib/products';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const h = await getTranslations({ locale, namespace: 'industries.hero' });
  return { title: nav('industries'), description: h('subtitle') };
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const products = getProducts();

  return (
    <>
      <PageHero
        title={t('industries.hero.title')}
        subtitle={t('industries.hero.subtitle')}
      />
      <section className="section">
        <div className="container mx-auto grid gap-8 md:grid-cols-2">
          {industryKeys.map((key) => {
            const related = products.filter((p) => p.industries.includes(key));
            return (
              <div key={key} className="card">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-700 text-white">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d={industryIcons[key]}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-900">
                  {t(`industries.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-brand-700">
                  {t(`industries.items.${key}.body`)}
                </p>
                {related.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {related.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50"
                      >
                        {t(`products.items.${p.slug}.name`)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
