import { createSlice } from '@reduxjs/toolkit';

/**
 * Entries Slice for managing journal entries globally.
 * Satisfies Assignment 6, Завдання 3.
 */
const entriesSlice = createSlice({
  name: 'entries',
  initialState: {
    list: [
      {
        id: '1',
        title: 'Morning Reflection',
        body: 'Started the day with a clear mind and a fresh cup of coffee. Ready for the challenges ahead.',
        date: '2025-04-15',
        mood: '😊'
      },
      {
        id: '2',
        title: 'Project Milestone',
        body: 'Finally finished the core navigation structure. Feels good to see the architecture coming together.',
        date: '2025-04-15',
        mood: '😌'
      }
    ],
  },
  reducers: {
    /**
     * Add a new journal entry.
     */
    addEntry: (state, action) => {
      state.list.unshift({
        ...action.payload,
        id: action.payload.id ? action.payload.id.toString() : `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      });
    },
    /**
     * Remove an entry by ID.
     */
    removeEntry: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
    /**
     * Update an existing entry.
     */
    updateEntry: (state, action) => {
      const index = state.list.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
  },
});

export const { addEntry, removeEntry, updateEntry } = entriesSlice.actions;
export default entriesSlice.reducer;
