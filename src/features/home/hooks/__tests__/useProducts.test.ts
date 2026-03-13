/**
 * useProducts Hook Tests
 *
 * Tests all state scenarios returned by the hook:
 * loading, success, error, refreshing.
 */

import { renderHook } from '@testing-library/react-native';
import { mockProductList } from '../../__fixtures__/products';
import { useGetProductsQuery } from '../../services/homeApi';
import { useProducts } from '../useProducts';

// Mock the RTK Query hook at module boundary
jest.mock('../../services/homeApi', () => ({
  useGetProductsQuery: jest.fn(),
}));

const mockUseGetProductsQuery = useGetProductsQuery as jest.MockedFunction<
  typeof useGetProductsQuery
>;

const baseQueryResult = {
  data: undefined,
  isLoading: false,
  isFetching: false,
  isError: false,
  error: undefined,
  refetch: jest.fn(),
  // RTK Query includes many more fields; we cast to satisfy the type
} as unknown as ReturnType<typeof useGetProductsQuery>;

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading state', () => {
    it('returns loading=true when RTK Query is loading', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        isLoading: true,
        isFetching: true,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.loading).toBe(true);
    });

    it('returns empty products array while loading', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        isLoading: true,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.products).toEqual([]);
    });

    it('returns isRefreshing=false during initial load', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        isLoading: true,
        isFetching: true,
      });
      const { result } = renderHook(() => useProducts());
      // isRefreshing = isFetching && !isLoading → false
      expect(result.current.isRefreshing).toBe(false);
    });
  });

  describe('Success state', () => {
    it('returns products array from RTK Query data', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        data: mockProductList,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.products).toEqual(mockProductList);
    });

    it('returns loading=false when data is available', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        data: mockProductList,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.loading).toBe(false);
    });

    it('returns isError=false on success', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        data: mockProductList,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.isError).toBe(false);
    });

    it('returns empty errorMessage on success', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        data: mockProductList,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.errorMessage).toBe('');
    });

    it('defaults products to [] when data is undefined', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        data: undefined,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.products).toEqual([]);
    });
  });

  describe('Refresh state', () => {
    it('returns isRefreshing=true when isFetching=true and isLoading=false', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        data: mockProductList,
        isLoading: false,
        isFetching: true,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.isRefreshing).toBe(true);
    });

    it('returns isRefreshing=false when not fetching', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        data: mockProductList,
        isLoading: false,
        isFetching: false,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.isRefreshing).toBe(false);
    });
  });

  describe('Error state', () => {
    it('returns isError=true on query error', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        isError: true,
        error: { status: 500, error: 'Internal Server Error' },
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.isError).toBe(true);
    });

    it('returns network error message for errors with status field', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        isError: true,
        error: {
          status: 'FETCH_ERROR',
          error: 'TypeError: Network request failed',
        },
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.errorMessage).toBe(
        'Sunucuya ulaşılamadı. Lütfen bağlantınızı kontrol edin.',
      );
    });

    it('returns generic error message for errors without status field', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        isError: true,
        error: { error: 'Unknown error' },
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.errorMessage).toBe(
        'Ürünler yüklenirken bir hata oluştu.',
      );
    });

    it('returns empty errorMessage when isError=false even if error object exists', () => {
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        isError: false,
        error: undefined,
      });
      const { result } = renderHook(() => useProducts());
      expect(result.current.errorMessage).toBe('');
    });
  });

  describe('refetch', () => {
    it('calls RTK Query refetch when refetch is invoked', () => {
      const refetchMock = jest.fn();
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        refetch: refetchMock,
      });
      const { result } = renderHook(() => useProducts());
      result.current.refetch();
      expect(refetchMock).toHaveBeenCalledTimes(1);
    });

    it('returns a stable refetch function reference', () => {
      const refetchMock = jest.fn();
      mockUseGetProductsQuery.mockReturnValue({
        ...baseQueryResult,
        refetch: refetchMock,
      });
      const { result, rerender } = renderHook(() => useProducts());
      const first = result.current.refetch;
      rerender({});
      const second = result.current.refetch;
      expect(first).toBe(second);
    });
  });
});
