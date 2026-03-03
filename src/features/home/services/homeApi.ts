/**
 * Home Feature API
 * RTK Query endpoints for home feature
 */

import { baseApi } from '../../../services/api/baseApi';
import { HomeData } from '../types';

export const homeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHomeData: builder.query<HomeData[], void>({
      query: () => '/home',
    }),
    // Add more endpoints here
  }),
  overrideExisting: false,
});

export const {
  useGetHomeDataQuery,
  // Export more hooks here
} = homeApi;

export default homeApi;
