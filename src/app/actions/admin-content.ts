'use server';

import { revalidatePath, updateTag } from 'next/cache';
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from '@/lib/supabase/server';

export type ActionResult = { ok: true } | { ok: false; error: string };

export type ContentRow = {
  key: string;
  value_ar: string;
  value_en: string;
};

async function requireAdmin(): Promise<ActionResult | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Not authenticated.' };
  return null;
}

function bustCache() {
  updateTag('site-content');
  revalidatePath('/', 'layout');
  revalidatePath('/en', 'layout');
}

export async function bulkUpdateContent(rows: ContentRow[]): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;

  if (rows.length === 0) return { ok: true };

  const sb = createSupabaseServiceClient();
  const { error } = await sb
    .from('site_content')
    .upsert(rows, { onConflict: 'key' });

  if (error) return { ok: false, error: error.message };

  bustCache();
  return { ok: true };
}

export async function updateContent(row: ContentRow): Promise<ActionResult> {
  return bulkUpdateContent([row]);
}
