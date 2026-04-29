import { getAllSiteContent } from '@/lib/site-content';
import ContentEditor from '@/components/admin/ContentEditor';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const rows = await getAllSiteContent();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900">Site content</h1>
        <p className="mt-1 text-sm text-slate-600">
          Edit the copy that appears on the public site. Each key has Arabic and English versions.
          Changes go live within ~60 seconds.
        </p>
      </header>

      <ContentEditor rows={rows.map((r) => ({
        key: r.key,
        value_ar: r.value_ar ?? '',
        value_en: r.value_en ?? '',
      }))} />
    </div>
  );
}
