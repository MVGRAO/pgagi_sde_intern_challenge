import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface iTunesAlbum {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  collectionViewUrl: string;
  releaseDate: string;
  primaryGenreName: string;
}

interface iTunesResponse {
  resultCount: number;
  results: iTunesAlbum[];
}

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://itunes.apple.com/',
  }),
  endpoints: (builder) => ({
    getNewReleases: builder.query<iTunesResponse, void>({
      query: () => 'search?term=new&entity=album&limit=20&country=US',
    }),
    getFeaturedPlaylists: builder.query<iTunesResponse, void>({
      query: () => 'search?term=top&entity=album&limit=20&country=US',
    }),
    getTopTracks: builder.query<iTunesResponse, string>({
      query: (country = 'US') => `search?term=top+songs&entity=song&limit=20&country=${country}`,
    }),
    searchMusic: builder.query<iTunesResponse, string>({
      query: (query) => `search?term=${encodeURIComponent(query)}&entity=album,song&limit=20`,
    }),
  }),
});

export const { 
  useGetNewReleasesQuery, 
  useGetFeaturedPlaylistsQuery, 
  useGetTopTracksQuery,
  useSearchMusicQuery
} = spotifyApi;

