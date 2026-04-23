import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ProductGrid from './ProductGrid';
import Reveal from '../motion/Reveal';

export default function ProductCategories() {
  const t = useTranslations('home.categories');
  const common = useTranslations('common');

  return (
    <section className="section relative bg-gradient-to-b from-ivory-50 to-ivory-100">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="section-title mt-4 text-balance">
              {t('title').split(' ').slice(0, -2).join(' ')}{' '}
              <span className="italic text-accent-dark">
                {t('title').split(' ').slice(-2).join(' ')}
              </span>
            </h2>
            <p className="mt-4 text-brand-700 md:text-lg">{t('subtitle')}</p>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <Link href="/products" className="btn-secondary">
              {common('viewAll')}
            </Link>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <ProductGrid />
        </Reveal>
      </div>
    </section>
  );
}
