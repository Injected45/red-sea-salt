import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Logo from '../Logo';
import { getProducts } from '@/lib/products';

export default function Footer() {
  const t = useTranslations();
  const products = getProducts();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-brand-900 text-brand-100">
      <div className="container mx-auto grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 [&_span]:text-white">
            <Logo variant="light" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-brand-200">
            {t('footer.tagline')}
          </p>
          <p className="mt-4 text-sm text-brand-200">
            {t('contact.info.address')}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {t('footer.quickLinks')}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">{t('nav.about')}</Link></li>
            <li><Link href="/products" className="hover:text-white">{t('nav.products')}</Link></li>
            <li><Link href="/industries" className="hover:text-white">{t('nav.industries')}</Link></li>
            <li><Link href="/faq" className="hover:text-white">{t('nav.faq')}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {t('footer.products')}
          </h4>
          <ul className="space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="hover:text-white">
                  {t(`products.items.${p.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-300 md:flex-row">
          <p>© {year} {t('meta.siteName')} — {t('footer.rights')}</p>
          <p>Ras Gharib, Red Sea</p>
        </div>
      </div>
    </footer>
  );
}
