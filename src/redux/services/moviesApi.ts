import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<unknown, void>({
      query: () => `trending/movie/week?api_key=http://www.omdbapi.com/?i=tt3896198&apikey=d9d53a53 `,
    }),
    getMovieRecommendations: builder.query<unknown, number>({
      query: (movieId) => `movie/${movieId}/recommendations?api_key=http://www.omdbapi.com/?i=tt3896198&apikey=d9d53a53 `,
    }),
    searchMovies: builder.query<unknown, string>({
      query: (query) => `search/movie?query=${encodeURIComponent(query)}&api_key=http://www.omdbapi.com/?i=tt3896198&apikey=d9d53a53 `,
    }),
    getMovieGenres: builder.query<unknown, void>({
      query: () => `genre/movie/list?api_key=http://www.omdbapi.com/?i=tt3896198&apikey=d9d53a53 `,
    }),
  }),
});

export const { 
  useGetTrendingMoviesQuery, 
  useGetMovieRecommendationsQuery, 
  useSearchMoviesQuery,
  useGetMovieGenresQuery
} = moviesApi;
