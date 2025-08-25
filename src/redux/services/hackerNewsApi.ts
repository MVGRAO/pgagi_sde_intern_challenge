import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hackerNewsApi = createApi({
  reducerPath: 'hackerNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hacker-news.firebaseio.com/v0/',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopStories: builder.query<any, void>({
      query: () => 'topstories.json?print=pretty',
    }),
    getNewStories: builder.query<any, void>({
      query: () => 'newstories.json?print=pretty',
    }),
    getBestStories: builder.query<any, void>({
      query: () => 'beststories.json?print=pretty',
    }),
    getJobStories: builder.query<any, void>({
      query: () => 'jobstories.json?print=pretty',
    }),
    getStoryItem: builder.query<any, number>({
      query: (itemId) => `item/${itemId}.json?print=pretty`,
    }),
    getUserInfo: builder.query<any, string>({
      query: (userId) => `user/${userId}.json?print=pretty`,
    }),
    getMaxItem: builder.query<any, void>({
      query: () => 'maxitem.json?print=pretty',
    }),
  }),
});

export const { 
  useGetTopStoriesQuery, 
  useGetNewStoriesQuery, 
  useGetBestStoriesQuery,
  useGetJobStoriesQuery,
  useGetStoryItemQuery,
  useGetUserInfoQuery,
  useGetMaxItemQuery
} = hackerNewsApi;

