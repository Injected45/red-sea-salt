'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase/server';

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin(): Promise<ActionResult | null> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Not authenticated.' };
  return null;
}

function revalidateHome() {
  revalidatePath('/', 'layout');
  revalidatePath('/en', 'layout');
}

export async function approveReview(id: number): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;

  const sb = createSupabaseServiceClient();
  const { error } = await sb.from('testimonials').update({ approved: true }).eq('id', id);
  if (error) return { ok: false, error: error.message };

  revalidateHome();
  return { ok: true };
}

export async function unpublishReview(id: number): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;

  const sb = createSupabaseServiceClient();
  const { error } = await sb.from('testimonials').update({ approved: false }).eq('id', id);
  if (error) return { ok: false, error: error.message };

  revalidateHome();
  return { ok: true };
}

export async function rejectReview(id: number): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;

  const sb = createSupabaseServiceClient();
  const { error } = await sb.from('testimonials').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };

  revalidateHome();
  return { ok: true };
}
