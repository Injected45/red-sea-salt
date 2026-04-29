import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProducts } from '@/lib/db-products';
import ProductEditForm from '@/components/admin/ProductEditForm';

export const dynamic = 'force-dynamic';

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = await getAllProducts();
  const product = all.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div>
      <header className="mb-8">
        <Link
          href="/admin/products"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back to products
        </Link>
        <h1 className="mt-2 font-display text-3xl font-bold text-slate-900">
          {product.translations.en.name || product.slug}
        </h1>
        <p className="mt-1 font-mono text-xs text-slate-500">{product.slug}</p>
      </header>

      <ProductEditForm product={product} />
    </div>
  );
}
