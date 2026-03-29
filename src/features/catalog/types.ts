/**
 * Catalog Feature Types
 */

export type CatalogViewMode = 'grid' | 'list';

export type CatalogSortOption =
  | 'recommended'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc';

export interface CatalogCategory {
  id: string;
  name: string;
}

export interface CatalogProduct {
  id: string;
  brand?: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  imageUrl?: string;
  categoryId: string;
  categoryName: string;
  inStock: boolean;
  rating: number;
  ratingCount?: number;
  isFavorite?: boolean;
  tags?: Array<'new' | 'sale' | 'featured'>;
}

export interface CatalogSortOptionItem {
  id: CatalogSortOption;
  label: string;
}
