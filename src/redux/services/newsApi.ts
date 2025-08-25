import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsdata.io/api/v1/',
  }),
  endpoints: (builder) => ({
    getNewsByCategory: builder.query<GNewsResponse, string>({
      query: (category) => `top-headlines?category=${category}&lang=en&apiKey=pub_b4a7d94084d34bf391418fd5c8c19563`,
    }),
    searchNews: builder.query<GNewsResponse, string>({
      query: (query) => `everything?q=${encodeURIComponent(query)}&lang=en&apiKey=pub_b4a7d94084d34bf391418fd5c8c19563`,
    }),
  }),
});

export const { useGetNewsByCategoryQuery, useSearchNewsQuery } = newsApi;
