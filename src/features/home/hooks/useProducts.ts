/**
 * useProducts Hook
 * Business logic for fetching and managing product list state
 */

import { useCallback } from 'react';
import { useGetProductsQuery } from '../services/homeApi';
import type { Product } from '../types';

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  isRefreshing: boolean;
  isError: boolean;
  errorMessage: string;
  refetch: () => void;
}

export const useProducts = (): UseProductsReturn => {
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  const resolveErrorMessage = (): string => {
    if (!isError || !error) {
      return '';
    }
    // RTK Query error shape: { status, data, ... }
    if (typeof error === 'object' && error !== null) {
      // Network error: status is 'FETCH_ERROR' or 'TIMEOUT_ERROR'
      if (error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR') {
        return 'Sunucuya ulaşılamadı. Lütfen bağlantınızı kontrol edin.';
      }
      // Server error: status is a number (HTTP status)
      if (typeof error.status === 'number') {
        return `Sunucu hatası (${error.status}). Lütfen daha sonra tekrar deneyin.`;
      }
    }
    return 'Ürünler yüklenirken bir hata oluştu.';
  };

  const errorMessage = resolveErrorMessage();

  return {
    products,
    loading: isLoading,
    isRefreshing: isFetching && !isLoading,
    isError,
    errorMessage,
    refetch: handleRefetch,
  };
};

export default useProducts;
