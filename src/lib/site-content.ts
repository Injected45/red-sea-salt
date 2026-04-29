import 'server-only';
import { unstable_cache } from 'next/cache';
import { createSupabaseServiceClient } from './supabase/server';

export type SiteContentRow = {
  key: string;
  value_ar: string | null;
  value_en: string | null;
};

export const getAllSiteContent = unstable_cache(
  async (): Promise<SiteContentRow[]> => {
    const sb = createSupabaseServiceClient();
    const { data } = await sb
      .from('site_content')
      .select('key, value_ar, value_en')
      .order('key', { ascending: true });
    return (data ?? []) as SiteContentRow[];
  },
  ['site-content-all'],
  { tags: ['site-content'], revalidate: 300 },
);

export async function getSiteContentByLocale(
  locale: string,
): Promise<Record<string, string>> {
  if (locale !== 'ar' && locale !== 'en') return {};
  const rows = await getAllSiteContent();
  const out: Record<string, string> = {};
  for (const r of rows) {
    const value = locale === 'ar' ? r.value_ar : r.value_en;
    if (value !== null && value !== undefined) {
      out[r.key] = value;
    }
  }
  return out;
}
