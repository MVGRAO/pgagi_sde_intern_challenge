import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/social/', // Mock API endpoint
  }),
  endpoints: (builder) => ({
    getSocialPosts: builder.query<any, string>({
      query: (hashtag) => `posts?hashtag=${hashtag}`,
    }),
    getTrendingHashtags: builder.query<any, void>({
      query: () => 'trending',
    }),
    searchSocialPosts: builder.query<any, string>({
      query: (query) => `search?q=${encodeURIComponent(query)}`,
    }),
  }),
});

export const { 
  useGetSocialPostsQuery, 
  useGetTrendingHashtagsQuery, 
  useSearchSocialPostsQuery 
} = socialApi;
