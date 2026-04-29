import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { getProductTranslationsByLocale } from '@/lib/db-products';
import { getSiteContentByLocale } from '@/lib/site-content';

function setDeep(target: Record<string, unknown>, path: string, value: string) {
  const segments = path.split('.');
  let cursor: Record<string, unknown> = target;
  for (let i = 0; i < segments.length - 1; i++) {
    const seg = segments[i];
    const next = cursor[seg];
    if (typeof next !== 'object' || next === null || Array.isArray(next)) {
      cursor[seg] = {};
    }
    cursor = cursor[seg] as Record<string, unknown>;
  }
  cursor[segments[segments.length - 1]] = value;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as 'ar' | 'en')) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  try {
    const dbProducts = await getProductTranslationsByLocale(locale);
    if (dbProducts && Object.keys(dbProducts).length > 0) {
      messages.products = messages.products ?? {};
      messages.products.items = { ...(messages.products.items ?? {}), ...dbProducts };
    }
  } catch {}

  try {
    const dbContent = await getSiteContentByLocale(locale);
    for (const [key, value] of Object.entries(dbContent)) {
      setDeep(messages, key, value);
    }
  } catch {}

  return { locale, messages };
});
