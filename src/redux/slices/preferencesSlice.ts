import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  categories: string[];
  darkMode: boolean;
  language: string;
  autoRefresh: boolean;
  refreshInterval: number;
}

const initialState: PreferencesState = {
  categories: ['technology', 'business', 'entertainment', 'music', 'gaming', 'crypto'],
  darkMode: false,
  language: 'en',
  autoRefresh: true,
  refreshInterval: 300000, // 5 minutes
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat !== action.payload);
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setAutoRefresh: (state, action: PayloadAction<boolean>) => {
      state.autoRefresh = action.payload;
    },
    setRefreshInterval: (state, action: PayloadAction<number>) => {
      state.refreshInterval = action.payload;
    },
  },
});

export const { 
  toggleDarkMode, 
  setDarkMode, 
  setCategories, 
  addCategory, 
  removeCategory,
  setLanguage,
  setAutoRefresh,
  setRefreshInterval
} = preferencesSlice.actions;
export default preferencesSlice.reducer;
