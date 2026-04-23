import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { getProducts } from '@/lib/products';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const h = await getTranslations({ locale, namespace: 'contact.hero' });
  return { title: nav('contact'), description: h('subtitle') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const products = getProducts();
  const productOptions = await Promise.all(
    products.map(async (p) => {
      const items = await getTranslations('products.items');
      return { slug: p.slug, name: items(`${p.slug}.name`) };
    })
  );

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="section">
        <div className="container mx-auto grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <InfoBlock label={t('info.phone')} value="+20 100 300 9156" href="tel:+201003009156" icon="M2 5a2 2 0 0 1 2-2h2l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v2a2 2 0 0 1-2 2A17 17 0 0 1 2 5z" />
              <InfoBlock label={t('info.whatsapp')} value="+20 100 300 9156" href="https://wa.me/201003009156" icon="M21 12a9 9 0 1 1-3.5-7.1L21 3l-1.9 3.5A9 9 0 0 1 21 12zM8 10s1 3 4 4l1.5-1.5 2 1-1 2s-4 1-7-3-3-7-3-7l2-1 1 2L8 10z" />
              <InfoBlock label={t('info.email')} value="info@redseasalt.com" href="mailto:info@redseasalt.com" icon="M3 6h18v12H3z M3 6l9 7 9-7" />
              <InfoBlock label="" value={t('info.address')} icon="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              <InfoBlock label={t('info.hours')} value={t('info.hoursValue')} icon="M12 6v6l4 2 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
            </div>
            <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-brand-100 bg-brand-50">
              <iframe
                src="https://maps.google.com/maps?q=5667%2B684+Ras+Gharib+Red+Sea+Governorate+Egypt&output=embed"
                className="h-full w-full"
                loading="lazy"
                title="Map"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/o6E3WWcYMaLw3AED6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-accent-dark"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{t('info.openMap')}</span>
            </a>
          </div>
          <div className="lg:col-span-3">
            <div className="card">
              <h2 className="font-display text-2xl font-bold text-brand-900">
                {t('form.title')}
              </h2>
              <ContactForm productOptions={productOptions} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoBlock({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <div className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d={icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        {label && <div className="text-xs font-semibold uppercase tracking-wider text-brand-500">{label}</div>}
        <div className="text-brand-900">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:text-brand-600">
      {inner}
    </a>
  ) : (
    inner
  );
}
