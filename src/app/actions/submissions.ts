'use server';

import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: FormDataEntryValue | null, max = 2000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export async function submitContact(formData: FormData): Promise<ActionResult> {
  const payload = {
    name: str(formData.get('name'), 120),
    email: str(formData.get('email'), 200),
    phone: str(formData.get('phone'), 40) || null,
    company: str(formData.get('company'), 160) || null,
    product: str(formData.get('product'), 80) || null,
    message: str(formData.get('message'), 4000),
    locale: str(formData.get('locale'), 8) || 'en',
    source: 'contact_page',
  };

  if (!payload.name || !payload.email || !payload.message) {
    return { ok: false, error: 'missing_fields' };
  }
  if (!EMAIL_RE.test(payload.email)) {
    return { ok: false, error: 'invalid_email' };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'not_configured' };
  }
  const db = getSupabase();
  if (!db) return { ok: false, error: 'not_configured' };

  const { error } = await db.from('contact_submissions').insert(payload);
  if (error) {
    console.error('[submitContact] insert failed:', error.message);
    return { ok: false, error: 'db_error' };
  }
  return { ok: true };
}

export async function submitTestimonial(formData: FormData): Promise<ActionResult> {
  const ratingRaw = Number(formData.get('rating'));
  const payload = {
    name: str(formData.get('name'), 120),
    email: str(formData.get('email'), 200),
    rating: Number.isFinite(ratingRaw) ? Math.min(5, Math.max(1, Math.round(ratingRaw))) : 0,
    message: str(formData.get('message'), 2000),
    locale: str(formData.get('locale'), 8) || 'en',
  };

  if (!payload.name || !payload.email || !payload.message) {
    return { ok: false, error: 'missing_fields' };
  }
  if (!EMAIL_RE.test(payload.email)) {
    return { ok: false, error: 'invalid_email' };
  }
  if (payload.rating < 1 || payload.rating > 5) {
    return { ok: false, error: 'invalid_rating' };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'not_configured' };
  }
  const db = getSupabase();
  if (!db) return { ok: false, error: 'not_configured' };

  const { error } = await db.from('testimonials').insert(payload);
  if (error) {
    console.error('[submitTestimonial] insert failed:', error.message);
    return { ok: false, error: 'db_error' };
  }
  return { ok: true };
}

export type Testimonial = {
  id: number;
  name: string;
  rating: number;
  message: string;
  created_at: string;
};

export async function listApprovedTestimonials(limit = 12): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return [];
  const db = getSupabase();
  if (!db) return [];
  const { data, error } = await db
    .from('testimonials')
    .select('id, name, rating, message, created_at')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('[listApprovedTestimonials] select failed:', error.message);
    return [];
  }
  return (data ?? []) as Testimonial[];
}
