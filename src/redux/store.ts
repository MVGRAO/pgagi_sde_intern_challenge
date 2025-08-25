import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import preferencesReducer from './slices/preferencesSlice';
import feedReducer from './slices/feedSlice';
import userReducer from './slices/userSlice';
import { newsApi } from './services/newsApi';
import { moviesApi } from './services/moviesApi';
import { socialApi } from './services/socialApi';
import { spotifyApi } from './services/spotifyApi';
import { youtubeApi } from './services/youtubeApi';
import { redditApi } from './services/redditApi';
import { cryptoApi } from './services/cryptoApi';
import { hackerNewsApi } from './services/hackerNewsApi';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    feed: feedReducer,
    user: userReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [socialApi.reducerPath]: socialApi.reducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    [redditApi.reducerPath]: redditApi.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      moviesApi.middleware,
      socialApi.middleware,
      spotifyApi.middleware,
      youtubeApi.middleware,
      redditApi.middleware,
      cryptoApi.middleware,
      hackerNewsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;