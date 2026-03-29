/**
 * Catalog API
 * Uses RTK Query queryFn with local fixture data
 */

import { baseApi } from '../../../services/api/baseApi';
import {
  catalogCategories,
  catalogProducts,
  catalogSortOptions,
} from '../__fixtures__/catalogData';
import type {
  CatalogCategory,
  CatalogProduct,
  CatalogSortOptionItem,
} from '../types';

export const catalogApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCatalogProducts: builder.query<CatalogProduct[], void>({
      queryFn: async () => {
        await new Promise<void>(resolve => setTimeout(() => resolve(), 250));
        return { data: catalogProducts };
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product' as const, id: 'CATALOG_LIST' },
            ]
          : [{ type: 'Product' as const, id: 'CATALOG_LIST' }],
    }),
    getCatalogCategories: builder.query<CatalogCategory[], void>({
      queryFn: async () => {
        return { data: catalogCategories };
      },
    }),
    getCatalogSortOptions: builder.query<CatalogSortOptionItem[], void>({
      queryFn: async () => {
        return { data: catalogSortOptions };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCatalogProductsQuery,
  useGetCatalogCategoriesQuery,
  useGetCatalogSortOptionsQuery,
} = catalogApi;

export default catalogApi;
