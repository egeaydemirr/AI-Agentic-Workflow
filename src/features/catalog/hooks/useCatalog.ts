/**
 * Catalog state and business logic
 */

import { useRoute, type RouteProp } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import type { RootStackParamList } from '../../../navigation/types';
import {
  useGetCatalogCategoriesQuery,
  useGetCatalogProductsQuery,
  useGetCatalogSortOptionsQuery,
} from '../services/catalogApi';
import type {
  CatalogProduct,
  CatalogSortOption,
  CatalogViewMode,
} from '../types';

const DEFAULT_CATEGORY_ID = 'all';
const DEFAULT_SORT_OPTION: CatalogSortOption = 'recommended';

const compareBySortOption = (
  left: CatalogProduct,
  right: CatalogProduct,
  sortOption: CatalogSortOption,
): number => {
  if (sortOption === 'price-asc') {
    return left.price - right.price;
  }
  if (sortOption === 'price-desc') {
    return right.price - left.price;
  }
  if (sortOption === 'name-asc') {
    return left.name.localeCompare(right.name, 'tr');
  }
  return right.rating - left.rating;
};

export const getVisibleCatalogProducts = (
  products: CatalogProduct[],
  selectedCategoryId: string,
  selectedSortOption: CatalogSortOption,
): CatalogProduct[] => {
  const filteredProducts =
    selectedCategoryId === DEFAULT_CATEGORY_ID
      ? products
      : products.filter(product => product.categoryId === selectedCategoryId);

  return [...filteredProducts].sort((left, right) =>
    compareBySortOption(left, right, selectedSortOption),
  );
};

type CatalogRoute = RouteProp<RootStackParamList, 'Catalog'>;

export interface UseCatalogReturn {
  products: CatalogProduct[];
  categories: { id: string; name: string }[];
  sortOptions: { id: CatalogSortOption; label: string }[];
  selectedCategoryId: string;
  selectedSortOption: CatalogSortOption;
  viewMode: CatalogViewMode;
  loading: boolean;
  isRefreshing: boolean;
  refetch: () => void;
  toggleViewMode: () => void;
  setGridMode: () => void;
  setListMode: () => void;
}

export const useCatalog = (): UseCatalogReturn => {
  const route = useRoute<CatalogRoute>();
  const [viewMode, setViewMode] = useState<CatalogViewMode>('grid');

  const selectedCategoryId =
    route.params?.selectedCategoryId ?? DEFAULT_CATEGORY_ID;
  const selectedSortOption =
    route.params?.selectedSortOption ?? DEFAULT_SORT_OPTION;

  const {
    data: products = [],
    isLoading: productsLoading,
    isFetching: productsFetching,
    refetch,
  } = useGetCatalogProductsQuery();

  const { data: categories = [] } = useGetCatalogCategoriesQuery();
  const { data: sortOptions = [] } = useGetCatalogSortOptionsQuery();

  const visibleProducts = useMemo(
    () =>
      getVisibleCatalogProducts(
        products,
        selectedCategoryId,
        selectedSortOption,
      ),
    [products, selectedCategoryId, selectedSortOption],
  );

  const toggleViewMode = useCallback(() => {
    setViewMode(previous => (previous === 'grid' ? 'list' : 'grid'));
  }, []);

  const setGridMode = useCallback(() => {
    setViewMode('grid');
  }, []);

  const setListMode = useCallback(() => {
    setViewMode('list');
  }, []);

  return {
    products: visibleProducts,
    categories,
    sortOptions,
    selectedCategoryId,
    selectedSortOption,
    viewMode,
    loading: productsLoading,
    isRefreshing: productsFetching && !productsLoading,
    refetch,
    toggleViewMode,
    setGridMode,
    setListMode,
  };
};

export default useCatalog;
