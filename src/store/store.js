// sprint 10 - global redux store
// using redux toolkit because instructor said no legacy redux

import { configureStore, createSlice } from "@reduxjs/toolkit";

// ---- favorites slice ----
// migrated from localStorage to redux global state
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const alreadyThere = state.items.find((m) => m.id === action.payload.id);
      if (alreadyThere) {
        state.items = state.items.filter((m) => m.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

// ---- filters slice ----
// sidebar filter state - global so any component can read it
const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    genre: "All",
    minRating: 0,
    year: "All",
    sortBy: "popularity",
  },
  reducers: {
    setGenre(state, action) {
      state.genre = action.payload;
    },
    setMinRating(state, action) {
      state.minRating = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    resetFilters(state) {
      state.genre = "All";
      state.minRating = 0;
      state.year = "All";
      state.sortBy = "popularity";
    },
  },
});

// ---- theme slice ----
// dark/light mode controlled by redux (phase 3)
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "dark",
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

// exporting all actions
export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const { setGenre, setMinRating, setYear, setSortBy, resetFilters } = filtersSlice.actions;
export const { toggleTheme } = themeSlice.actions;

// global store - combines all slices
const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    filters: filtersSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
