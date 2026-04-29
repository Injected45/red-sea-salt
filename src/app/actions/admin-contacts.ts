'use server';

import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase/server';

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin(): Promise<ActionResult | null> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Not authenticated.' };
  return null;
}

export async function markContactRead(id: number, read: boolean): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;

  const sb = createSupabaseServiceClient();
  const { error } = await sb.from('contact_submissions').update({ read }).eq('id', id);
  if (error) return { ok: false, error: error.message };

  return { ok: true };
}
