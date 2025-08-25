import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  category: string;
  source: string;
  publishedAt: string;
  type: 'news' | 'movie' | 'social';
}

interface FeedState {
  favorites: string[];
  content: ContentItem[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

const initialState: FeedState = {
  favorites: [],
  content: [],
  searchQuery: '',
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    setContent: (state, action: PayloadAction<ContentItem[]>) => {
      state.content = action.payload;
    },
    addContent: (state, action: PayloadAction<ContentItem[]>) => {
      state.content.push(...action.payload);
    },
    reorderContent: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.content.splice(fromIndex, 1);
      state.content.splice(toIndex, 0, removed);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    clearContent: (state) => {
      state.content = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
});

export const { 
  addFavorite, 
  removeFavorite, 
  setContent, 
  addContent, 
  reorderContent,
  setSearchQuery,
  setLoading,
  setError,
  setCurrentPage,
  setHasMore,
  clearContent
} = feedSlice.actions;
export default feedSlice.reducer;
