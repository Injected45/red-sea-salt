import Link from 'next/link';
import { getAllProducts } from '@/lib/db-products';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900">Products</h1>
        <p className="mt-1 text-sm text-slate-600">
          Edit specs, gallery, and translations. Changes go live within ~60 seconds.
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Name (EN)</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Industries</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.slug} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-500">{p.displayOrder}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-700">{p.slug}</td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {p.translations.en.name || <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  {p.featured ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      Featured
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  {p.industries.join(', ') || '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.slug}/edit`}
                    className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
