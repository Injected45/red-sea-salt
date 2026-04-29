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
      <main className="ml-60 min-h-screen">
        <div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
