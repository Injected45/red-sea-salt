import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getProductSlugs } from '@/lib/products';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://redseasalt.example';

const staticPaths = ['', '/about', '/products', '/industries', '/contact', '/faq'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const slugs = await getProductSlugs();

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}${prefix}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: path === '' ? 1.0 : 0.7,
      });
    }
    for (const slug of slugs) {
      entries.push({
        url: `${baseUrl}${prefix}/products/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
