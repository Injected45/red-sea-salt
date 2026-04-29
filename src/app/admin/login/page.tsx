import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/admin/LoginForm';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Admin Login — Red Sea Salt',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/admin');

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Red Sea Salt
          </h1>
          <p className="mt-1 text-sm text-slate-600">Admin Dashboard</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Authorised personnel only.
        </p>
      </div>
    </div>
  );
}
