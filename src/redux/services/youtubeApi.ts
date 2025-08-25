import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/youtube/v3/',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrendingVideos: builder.query<any, void>({
      query: () => `videos?part=snippet,statistics&chart=mostPopular&maxResults=20&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    }),
    searchVideos: builder.query<any, string>({
      query: (query) => `search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=20&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    }),
    getVideosByCategory: builder.query<any, string>({
      query: (categoryId) => `videos?part=snippet,statistics&chart=mostPopular&videoCategoryId=${categoryId}&maxResults=20&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    }),
    getVideoCategories: builder.query<any, void>({
      query: () => `videoCategories?part=snippet&regionCode=US&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    }),
    getChannelVideos: builder.query<any, string>({
      query: (channelId) => `search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=20&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    }),
  }),
});

export const { 
  useGetTrendingVideosQuery, 
  useSearchVideosQuery, 
  useGetVideosByCategoryQuery,
  useGetVideoCategoriesQuery,
  useGetChannelVideosQuery
} = youtubeApi;

