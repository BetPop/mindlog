import { configureStore } from '@reduxjs/toolkit';
import entriesReducer from './slices/entriesSlice';
import settingsReducer from './slices/settingsSlice';


export const store = configureStore({
  reducer: {
    entries: entriesReducer,
    settings: settingsReducer,
  },
});
