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
                src="https://maps.google.com/maps?q=28.1605118,33.2133238&z=16&output=embed"
                className="h-full w-full"
                loading="lazy"
                title="Map"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/eXnhFar8CeLEfFjs8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-accent-dark"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{t('info.openMap')}</span>
            </a>

            <div className="mt-8 border-t border-brand-100 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-500">
                {t('info.followUs')}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/share/17zFSreD75/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white transition hover:bg-accent-dark"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2V11H7.5v3.1h2.6V22h3.4z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/hossam-salem-695852296"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white transition hover:bg-accent-dark"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 18H6V10h2.5v8zM7.2 8.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM18 18h-2.5v-4c0-1-.4-1.6-1.3-1.6-.7 0-1.1.5-1.3 1-.1.2-.1.5-.1.7V18H10.3v-8h2.5v1.1c.3-.5 1-1.3 2.4-1.3 1.7 0 3 1.1 3 3.5V18z" />
                  </svg>
                </a>
              </div>
            </div>
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
