/**
 * Base API Configuration
 * RTK Query base setup with automatic authentication
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import CONFIG from '../../config';

// Base query with automatic headers
const baseQuery = fetchBaseQuery({
  baseUrl: CONFIG.API_BASE_URL,
  timeout: CONFIG.API_TIMEOUT,
  prepareHeaders: headers => {
    // Add authentication token here when available
    // const token = getState().auth?.token;
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`);
    // }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Base query with error logging
const baseQueryWithLogging: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

// Create base API
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithLogging,
  tagTypes: ['Product'], // Cache invalidation tag types
  endpoints: () => ({}),
});

export default baseApi;
