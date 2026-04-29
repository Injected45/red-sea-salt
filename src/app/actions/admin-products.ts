'use server';

import { revalidatePath, updateTag } from 'next/cache';
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from '@/lib/supabase/server';

export type ActionResult = { ok: true } | { ok: false; error: string };

export type ProductUpdate = {
  featured: boolean;
  industries: string[];
  specs: {
    purity: string;
    moisture: string;
    granule: string;
    packaging: string[];
  };
  image: string;
  gallery: string[];
  videos: string[];
  analysisImage: string | null;
  displayOrder: number;
  translations: {
    ar: {
      name: string;
      short: string;
      description: string;
      keyFeatures: string[];
      applications: string[];
    };
    en: {
      name: string;
      short: string;
      description: string;
      keyFeatures: string[];
      applications: string[];
    };
  };
};

async function requireAdmin(): Promise<ActionResult | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Not authenticated.' };
  return null;
}

export async function updateProduct(
  slug: string,
  data: ProductUpdate,
): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;

  const sb = createSupabaseServiceClient();

  const { error: pErr } = await sb
    .from('products_db')
    .update({
      featured: data.featured,
      industries: data.industries,
      specs: data.specs,
      image: data.image,
      gallery: data.gallery,
      videos: data.videos,
      analysis_image: data.analysisImage,
      display_order: data.displayOrder,
    })
    .eq('slug', slug);

  if (pErr) return { ok: false, error: pErr.message };

  const rows = (['ar', 'en'] as const).map((locale) => ({
    product_slug: slug,
    locale,
    name: data.translations[locale].name,
    short: data.translations[locale].short,
    description: data.translations[locale].description,
    key_features: data.translations[locale].keyFeatures,
    applications: data.translations[locale].applications,
  }));

  const { error: tErr } = await sb
    .from('product_translations')
    .upsert(rows, { onConflict: 'product_slug,locale' });

  if (tErr) return { ok: false, error: tErr.message };

  updateTag('products');
  revalidatePath('/', 'layout');
  revalidatePath('/en', 'layout');
  revalidatePath(`/products/${slug}`);
  revalidatePath(`/en/products/${slug}`);
  revalidatePath('/products');
  revalidatePath('/en/products');

  return { ok: true };
}
