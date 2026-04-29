import { getTranslations } from 'next-intl/server';
import { getFeaturedProducts } from '@/lib/products';
import ProductGrid from './ProductGrid';
import Reveal from '../motion/Reveal';

export default async function FeaturedProducts() {
  const t = await getTranslations('home.featured');
  const featured = await getFeaturedProducts();

  return (
    <section className="section">
      <div className="container mx-auto">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('eyebrow')}</p>
          <h2 className="section-title mt-4 text-balance">
            {t('title').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="italic text-accent-dark">
              {t('title').split(' ').slice(-1)}
            </span>
          </h2>
          <p className="mt-4 text-brand-700 md:text-lg">{t('subtitle')}</p>
          <div className="divider-ornament mt-8">
            <span className="block h-1 w-1 rounded-full bg-accent" />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ProductGrid products={featured} limit={3} />
        </Reveal>
      </div>
    </section>
  );
}
