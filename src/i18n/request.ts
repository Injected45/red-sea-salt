import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { getProductTranslationsByLocale } from '@/lib/db-products';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as 'ar' | 'en')) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  try {
    const dbItems = await getProductTranslationsByLocale(locale);
    if (dbItems && Object.keys(dbItems).length > 0) {
      messages.products = messages.products ?? {};
      messages.products.items = { ...(messages.products.items ?? {}), ...dbItems };
    }
  } catch {}

  return { locale, messages };
});
