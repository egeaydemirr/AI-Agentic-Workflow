/**
 * Navigation Route Types
 * Strongly typed navigation parameters
 */

import type { CatalogSortOption } from '../features/catalog/types';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string; productName: string };
  Cart: undefined;
  Catalog2: undefined;
  Catalog:
    | {
        selectedCategoryId?: string;
        selectedSortOption?: CatalogSortOption;
      }
    | undefined;
  Categories: { selectedCategoryId?: string } | undefined;
  SortBy: { selectedSortOption?: CatalogSortOption } | undefined;
  CategorySelection: { selectedCategoryId?: string } | undefined;
};

export type ScreenNames = keyof RootStackParamList;

export default RootStackParamList;
