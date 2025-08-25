import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.reddit.com/',
    prepareHeaders: (headers) => {
      headers.set('User-Agent', 'PersonalizedDashboard/1.0');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHotPosts: builder.query<any, string>({
      query: (subreddit = 'popular') => `r/${subreddit}/hot.json?limit=20`,
    }),
    getTopPosts: builder.query<any, { subreddit?: string; timeframe?: string }>({
      query: ({ subreddit = 'popular', timeframe = 'day' }) => 
        `r/${subreddit}/top.json?t=${timeframe}&limit=20`,
    }),
    getNewPosts: builder.query<any, string>({
      query: (subreddit = 'popular') => `r/${subreddit}/new.json?limit=20`,
    }),
    searchPosts: builder.query<any, { query: string; subreddit?: string }>({
      query: ({ query, subreddit = 'all' }) => 
        `r/${subreddit}/search.json?q=${encodeURIComponent(query)}&limit=20&sort=relevance`,
    }),
    getSubredditInfo: builder.query<any, string>({
      query: (subreddit) => `r/${subreddit}/about.json`,
    }),
    getTrendingSubreddits: builder.query<any, void>({
      query: () => 'subreddits/popular.json?limit=20',
    }),
  }),
});

export const { 
  useGetHotPostsQuery, 
  useGetTopPostsQuery, 
  useGetNewPostsQuery,
  useSearchPostsQuery,
  useGetSubredditInfoQuery,
  useGetTrendingSubredditsQuery
} = redditApi;

