import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Tajawal, Playfair_Display } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-arabic',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: {
      default: t('siteName'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('description'),
    metadataBase: new URL('https://redseasalt.example'),
    alternates: {
      canonical: '/',
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      title: t('siteName'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'ar' | 'en')) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const t = await getTranslations({ locale, namespace: 'meta' });
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: t('siteName'),
    description: t('description'),
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://redseasalt.example',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ras Gharib',
      addressRegion: 'Red Sea',
      addressCountry: 'EG',
    },
    foundingDate: '2011',
  };

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${tajawal.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
