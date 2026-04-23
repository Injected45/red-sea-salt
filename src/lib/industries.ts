import type { ProductIndustry } from './products';

export const industryKeys: ProductIndustry[] = [
  'road-deicing',
  'industrial',
  'food',
  'pools',
  'commercial',
];

export const industryIcons: Record<ProductIndustry, string> = {
  'road-deicing': 'M3 18h18M6 14l4-8 4 8M12 18V9',
  industrial: 'M4 20V10l6-4 6 4v10M10 20v-5h4v5',
  food: 'M4 10a8 8 0 1 1 16 0M8 10v4a4 4 0 0 0 8 0v-4',
  pools: 'M3 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0',
  commercial: 'M4 7h16l-2 11H6L4 7zM9 7V5a3 3 0 1 1 6 0v2',
};
