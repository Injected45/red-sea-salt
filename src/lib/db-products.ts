import 'server-only';
import { unstable_cache } from 'next/cache';
import { createSupabaseServiceClient } from './supabase/server';

export type ProductSpecs = {
  purity: string;
  moisture: string;
  granule: string;
  packaging: string[];
};

export type ProductTranslation = {
  name: string;
  short: string;
  description: string;
  keyFeatures: string[];
  applications: string[];
};

export type DbProduct = {
  slug: string;
  featured: boolean;
  industries: string[];
  specs: ProductSpecs;
  image: string;
  gallery: string[];
  videos: string[];
  analysisImage: string | null;
  displayOrder: number;
  translations: {
    ar: ProductTranslation;
    en: ProductTranslation;
  };
};

const emptyTranslation: ProductTranslation = {
  name: '',
  short: '',
  description: '',
  keyFeatures: [],
  applications: [],
};

type ProductRow = {
  slug: string;
  featured: boolean;
  industries: string[] | null;
  specs: Partial<ProductSpecs> | null;
  image: string;
  gallery: string[] | null;
  videos: string[] | null;
  analysis_image: string | null;
  display_order: number;
};

type TranslationRow = {
  product_slug: string;
  locale: 'ar' | 'en';
  name: string;
  short: string;
  description: string;
  key_features: string[] | null;
  applications: string[] | null;
};

function rowToTranslation(r: TranslationRow | undefined): ProductTranslation {
  if (!r) return emptyTranslation;
  return {
    name: r.name,
    short: r.short,
    description: r.description,
    keyFeatures: r.key_features ?? [],
    applications: r.applications ?? [],
  };
}

export const getAllProducts = unstable_cache(
  async (): Promise<DbProduct[]> => {
    const sb = createSupabaseServiceClient();
    const [productsRes, translationsRes] = await Promise.all([
      sb
        .from('products_db')
        .select('slug, featured, industries, specs, image, gallery, videos, analysis_image, display_order')
        .order('display_order', { ascending: true }),
      sb
        .from('product_translations')
        .select('product_slug, locale, name, short, description, key_features, applications'),
    ]);

    const products = (productsRes.data ?? []) as ProductRow[];
    const translations = (translationsRes.data ?? []) as TranslationRow[];

    return products.map((p) => {
      const ts = translations.filter((t) => t.product_slug === p.slug);
      return {
        slug: p.slug,
        featured: p.featured,
        industries: p.industries ?? [],
        specs: {
          purity: p.specs?.purity ?? '',
          moisture: p.specs?.moisture ?? '',
          granule: p.specs?.granule ?? '',
          packaging: p.specs?.packaging ?? [],
        },
        image: p.image,
        gallery: p.gallery ?? [],
        videos: p.videos ?? [],
        analysisImage: p.analysis_image,
        displayOrder: p.display_order,
        translations: {
          ar: rowToTranslation(ts.find((t) => t.locale === 'ar')),
          en: rowToTranslation(ts.find((t) => t.locale === 'en')),
        },
      };
    });
  },
  ['db-products-all'],
  { tags: ['products'], revalidate: 300 },
);

export async function getProductTranslationsByLocale(
  locale: string,
): Promise<Record<string, ProductTranslation>> {
  if (locale !== 'ar' && locale !== 'en') return {};
  const all = await getAllProducts();
  const out: Record<string, ProductTranslation> = {};
  for (const p of all) {
    out[p.slug] = p.translations[locale];
  }
  return out;
}
