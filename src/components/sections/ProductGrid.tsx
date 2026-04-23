import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getProducts, type Product } from '@/lib/products';

type Props = {
  products?: Product[];
  limit?: number;
};

export default function ProductGrid({ products, limit }: Props) {
  const t = useTranslations();
  const items = (products ?? getProducts()).slice(0, limit);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <Link
          key={p.slug}
          href={`/products/${p.slug}`}
          className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-100">
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url(${p.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-900 backdrop-blur-sm rtl:left-auto rtl:right-4">
              0{i + 1}
            </span>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-brand-900 transition-colors group-hover:text-accent-dark">
              {t(`products.items.${p.slug}.name`)}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-700">
              {t(`products.items.${p.slug}.short`)}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-900 transition-colors group-hover:text-accent-dark">
              <span>{t('common.viewDetails')}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
