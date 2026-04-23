import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import PageHero from '@/components/PageHero';
import ProductGallery from '@/components/ProductGallery';
import { getProduct, getProductSlugs, getProducts } from '@/lib/products';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  const slugs = getProductSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: `products.items.${slug}` });
  return {
    title: t('name'),
    description: t('short'),
    alternates: {
      canonical: `/${locale === 'ar' ? '' : locale + '/'}products/${slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations();
  const name = t(`products.items.${slug}.name`);
  const description = t(`products.items.${slug}.description`);
  const applications = t.raw(`products.items.${slug}.applications`) as string[];
  const keyFeatures = t.raw(`products.items.${slug}.keyFeatures`) as string[];
  const siteName = t('meta.siteName');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: product.image,
    brand: { '@type': 'Brand', name: siteName },
    manufacturer: { '@type': 'Organization', name: siteName },
  };

  const related = getProducts().filter((p) => p.slug !== slug).slice(0, 3);
  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero title={name} subtitle={t(`products.items.${slug}.short`)} />

      <section className="section">
        <div className="container mx-auto grid gap-10 lg:grid-cols-2">
          <ProductGallery images={gallery} alt={name} />

          <div>
            <Link
              href="/products"
              className="text-sm font-semibold text-brand-700 hover:text-accent"
            >
              ← {t('common.backToProducts')}
            </Link>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-900">{name}</h2>
            <p className="mt-5 text-brand-700 md:text-lg">{description}</p>

            {Array.isArray(keyFeatures) && keyFeatures.length > 0 && (
              <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-6">
                <h3 className="font-display text-lg font-bold text-brand-900">
                  {t('products.detail.keyFeatures')}
                </h3>
                <ul className="mt-4 space-y-3">
                  {keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-brand-800">
                      <span
                        aria-hidden
                        className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark"
                      >
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8.5l3 3 7-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6">
              <h3 className="font-display text-lg font-bold text-brand-900">
                {t('products.detail.specifications')}
              </h3>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <SpecRow label={t('products.specsLabels.purity')} value={product.specs.purity} />
                <SpecRow label={t('products.specsLabels.moisture')} value={product.specs.moisture} />
                <SpecRow label={t('products.specsLabels.granule')} value={product.specs.granule} />
              </dl>
            </div>

            <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6">
              <h3 className="font-display text-lg font-bold text-brand-900">
                {t('products.detail.packaging')}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.specs.packaging.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm text-brand-800"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/contact" className="btn-primary mt-8">
              {t('products.detail.cta')}
            </Link>
          </div>
        </div>
      </section>

      {product.videos.length > 0 && (
        <section className="section bg-brand-50">
          <div className="container mx-auto">
            <h3 className="font-display text-2xl font-bold text-brand-900">
              {t('products.detail.videoTour')}
            </h3>
            <div
              className={`mt-6 grid gap-6 ${
                product.videos.length === 1
                  ? 'md:grid-cols-1'
                  : product.videos.length === 2
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {product.videos.map((src) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-2xl border border-brand-100 bg-black shadow-sm"
                >
                  <video
                    src={src}
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-video h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.analysisImage && (
        <section className="section">
          <div className="container mx-auto">
            <h3 className="font-display text-2xl font-bold text-brand-900">
              {t('products.detail.analysis')}
            </h3>
            <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white p-4">
              <img
                src={product.analysisImage}
                alt={`${name} — ${t('products.detail.analysis')}`}
                loading="lazy"
                className="mx-auto h-auto w-full max-w-3xl rounded-xl object-contain"
              />
            </div>
          </div>
        </section>
      )}

      <section className="section bg-brand-50">
        <div className="container mx-auto">
          <h3 className="font-display text-2xl font-bold text-brand-900">
            {t('products.detail.applications')}
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((a) => (
              <div
                key={a}
                className="rounded-2xl border border-brand-100 bg-white p-5 text-center font-medium text-brand-800"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          <h3 className="font-display text-2xl font-bold text-brand-900">
            {t('common.viewAll')}
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-brand-100 bg-white transition hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-brand-100">
                  <div
                    className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-lg font-bold text-brand-900">
                    {t(`products.items.${p.slug}.name`)}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-brand-50 p-3">
      <dt className="text-xs font-semibold uppercase tracking-wider text-brand-500">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-brand-900">{value}</dd>
    </div>
  );
}
