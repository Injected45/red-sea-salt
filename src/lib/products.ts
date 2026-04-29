import { getAllProducts, type DbProduct } from './db-products';

export type ProductSlug = string;

export type ProductIndustry =
  | 'road-deicing'
  | 'industrial'
  | 'food'
  | 'pools'
  | 'commercial';

export type Product = {
  slug: ProductSlug;
  featured: boolean;
  industries: ProductIndustry[];
  specs: {
    purity: string;
    moisture: string;
    granule: string;
    packaging: string[];
  };
  image: string;
  gallery: string[];
  videos: string[];
  analysisImage?: string;
};

function toProduct(p: DbProduct): Product {
  return {
    slug: p.slug,
    featured: p.featured,
    industries: p.industries as ProductIndustry[],
    specs: p.specs,
    image: p.image,
    gallery: p.gallery,
    videos: p.videos,
    analysisImage: p.analysisImage ?? undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const all = await getAllProducts();
  const found = all.find((p) => p.slug === slug);
  return found ? toProduct(found) : undefined;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.featured).map(toProduct);
}

export async function getProductSlugs(): Promise<string[]> {
  const all = await getAllProducts();
  return all.map((p) => p.slug);
}
