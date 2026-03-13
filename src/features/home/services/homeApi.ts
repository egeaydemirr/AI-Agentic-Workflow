/**
 * Home Feature API
 * RTK Query endpoints for home feature
 */

import { baseApi } from '../../../services/api/baseApi';
import { HomeData, Product } from '../types';

export const homeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHomeData: builder.query<HomeData[], void>({
      query: () => '/home',
    }),
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        // Mock data - gerçek API entegrasyonu için query() kullanın
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'iPhone 15 Pro',
            description: 'En yeni iPhone modeli, A17 Pro çip ile',
            price: 54999,
            imageUrl:
              'https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPhone+15+Pro',
            category: 'Telefon',
            inStock: true,
          },
          {
            id: '2',
            name: 'Samsung Galaxy S24',
            description: 'Galaxy AI ile güçlendirilmiş akıllı telefon',
            price: 42999,
            imageUrl:
              'https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Galaxy+S24',
            category: 'Telefon',
            inStock: true,
          },
          {
            id: '3',
            name: 'MacBook Pro 14"',
            description: 'M3 çip ile profesyonel performans',
            price: 89999,
            imageUrl:
              'https://via.placeholder.com/300x300/8E8E93/FFFFFF?text=MacBook+Pro',
            category: 'Bilgisayar',
            inStock: true,
          },
          {
            id: '4',
            name: 'iPad Air',
            description: 'M2 çip ve Apple Pencil desteği',
            price: 27999,
            imageUrl:
              'https://via.placeholder.com/300x300/5AC8FA/FFFFFF?text=iPad+Air',
            category: 'Tablet',
            inStock: true,
          },
        ];

        // Simüle edilmiş network gecikmesi
        await new Promise<void>(resolve => setTimeout(() => resolve(), 800));

        return { data: mockProducts };
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product' as const, id: 'LIST' },
            ]
          : [{ type: 'Product' as const, id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetHomeDataQuery, useGetProductsQuery } = homeApi;

export default homeApi;
