import { redirect } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="min-h-screen md:ml-60">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
