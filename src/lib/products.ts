export type ProductSlug =
  | 'raw-salt'
  | 'de-icing-rock-salt'
  | 'tablet-salt'
  | 'water-softener-salt'
  | 'industrial-salt'
  | 'food-grade-salt'
  | 'marine-salt';

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

const products: Product[] = [
  {
    slug: 'raw-salt',
    featured: true,
    industries: ['industrial', 'commercial'],
    specs: {
      purity: '95–97%',
      moisture: '≤ 4%',
      granule: '2–15 mm',
      packaging: ['Bulk', '50 kg bags', '1 ton big bags'],
    },
    image: '/products/raw-salt/1.jpg',
    gallery: [
      '/products/raw-salt/1.jpg',
      '/products/raw-salt/2.jpg',
      '/products/raw-salt/3.jpg',
    ],
    videos: [
      '/products/raw-salt/video-1.mp4',
      '/products/raw-salt/video-2.mp4',
    ],
  },
  {
    slug: 'de-icing-rock-salt',
    featured: true,
    industries: ['road-deicing'],
    specs: {
      purity: '95%+',
      moisture: '≤ 3%',
      granule: '2–10 mm (coarse)',
      packaging: ['Bulk', '25 kg bags', '1 ton big bags'],
    },
    image: '/products/de-icing-rock-salt/a1.jpg',
    gallery: [
      '/products/de-icing-rock-salt/a1.jpg',
      '/products/de-icing-rock-salt/a2.jpg',
      '/products/de-icing-rock-salt/a3.png',
    ],
    videos: ['/products/de-icing-rock-salt/video.mp4'],
    analysisImage: '/products/de-icing-rock-salt/analysis.jpeg',
  },
  {
    slug: 'tablet-salt',
    featured: true,
    industries: ['industrial', 'commercial'],
    specs: {
      purity: '99.8%+',
      moisture: '≤ 0.1%',
      granule: 'Pillow / round tablet — 25 mm',
      packaging: ['10 kg bags', '25 kg bags'],
    },
    image: '/products/tablet-salt/a1.jpg',
    gallery: [
      '/products/tablet-salt/a1.jpg',
      '/products/tablet-salt/a2.jpeg',
      '/products/tablet-salt/a3.jpg',
      '/products/tablet-salt/a4.jpg',
    ],
    videos: ['/products/tablet-salt/video.mp4'],
  },
  {
    slug: 'water-softener-salt',
    featured: true,
    industries: ['industrial', 'commercial'],
    specs: {
      purity: '99.5%+',
      moisture: '≤ 0.2%',
      granule: 'Tablets / coarse granules',
      packaging: ['25 kg bags', '50 kg bags', 'Bulk'],
    },
    image: '/products/water-softener-salt/ext-1.jpg',
    gallery: ['/products/water-softener-salt/ext-1.jpg'],
    videos: [
      '/products/water-softener-salt/video-1.mp4',
      '/products/water-softener-salt/video-2.mp4',
      '/products/water-softener-salt/video-3.mp4',
    ],
  },
  {
    slug: 'industrial-salt',
    featured: false,
    industries: ['industrial', 'commercial'],
    specs: {
      purity: '97–98%',
      moisture: '≤ 3%',
      granule: '1–5 mm',
      packaging: ['Bulk', '50 kg bags', '1 ton big bags'],
    },
    image: '/products/industrial-salt/1.webp',
    gallery: [
      '/products/industrial-salt/1.webp',
      '/products/industrial-salt/2.webp',
      '/products/industrial-salt/3.jpeg',
    ],
    videos: ['/products/industrial-salt/video.mp4'],
  },
  {
    slug: 'food-grade-salt',
    featured: true,
    industries: ['food', 'commercial'],
    specs: {
      purity: '99.5%+',
      moisture: '≤ 0.2%',
      granule: '0.2–0.8 mm',
      packaging: ['25 kg bags', '50 kg bags', 'Retail packaging'],
    },
    image: '/products/food-grade-salt/1.jpg',
    gallery: ['/products/food-grade-salt/1.jpg'],
    videos: ['/products/food-grade-salt/video.mp4'],
  },
  {
    slug: 'marine-salt',
    featured: false,
    industries: ['food', 'industrial', 'commercial'],
    specs: {
      purity: '97–99%',
      moisture: '≤ 2.5%',
      granule: '0.5–5 mm',
      packaging: ['Bulk', '25 kg bags', '50 kg bags', '1 ton big bags'],
    },
    image: '/products/marine-salt/1.jpeg',
    gallery: [
      '/products/marine-salt/1.jpeg',
      '/products/marine-salt/2.jpeg',
      '/products/marine-salt/3.jpeg',
    ],
    videos: [
      '/products/marine-salt/video-1.mp4',
      '/products/marine-salt/video-2.mp4',
    ],
    analysisImage: '/products/marine-salt/analysis.jpeg',
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductSlugs(): ProductSlug[] {
  return products.map((p) => p.slug);
}
