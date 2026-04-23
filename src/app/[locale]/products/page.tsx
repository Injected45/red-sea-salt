import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ProductGrid from '@/components/sections/ProductGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.listing' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products.listing');

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} />
      <section className="section">
        <div className="container mx-auto">
          <ProductGrid />
        </div>
      </section>
    </>
  );
}
