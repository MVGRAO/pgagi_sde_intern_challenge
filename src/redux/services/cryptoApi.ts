import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrendingCoins: builder.query<any, void>({
      query: () => 'search/trending',
    }),
    getTopCoins: builder.query<any, void>({
      query: () => 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false',
    }),
    getCoinDetails: builder.query<any, string>({
      query: (coinId) => `coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    }),
    getCoinHistory: builder.query<any, { coinId: string; days: number }>({
      query: ({ coinId, days }) => `coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
    }),
    searchCoins: builder.query<any, string>({
      query: (query) => `search?query=${encodeURIComponent(query)}`,
    }),
    getGlobalData: builder.query<any, void>({
      query: () => 'global',
    }),
    getCoinCategories: builder.query<any, void>({
      query: () => 'coins/categories',
    }),
  }),
});

export const { 
  useGetTrendingCoinsQuery, 
  useGetTopCoinsQuery, 
  useGetCoinDetailsQuery,
  useGetCoinHistoryQuery,
  useSearchCoinsQuery,
  useGetGlobalDataQuery,
  useGetCoinCategoriesQuery
} = cryptoApi;

