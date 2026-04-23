import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FaqAccordion from '@/components/FaqAccordion';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const h = await getTranslations({ locale, namespace: 'faq.hero' });
  return { title: nav('faq'), description: h('subtitle') };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');

  const items = faqKeys.map((k) => ({
    q: t(`items.${k}.q`),
    a: t(`items.${k}.a`),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="section">
        <div className="container mx-auto max-w-3xl">
          <FaqAccordion items={items} />
        </div>
      </section>
    </>
  );
}
