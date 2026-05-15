import { createSlice } from '@reduxjs/toolkit';

/**
 * Settings Slice for managing global application preferences.
 */
const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    language: 'en',
    languageName: 'English',
    pushNotifications: true,
    dailyReminders: false,
    pinLock: false,
    biometrics: false,
  },
  reducers: {
    /**
     * Update the application language.
     */
    setLanguage: (state, action) => {
      state.language = action.payload.code;
      state.languageName = action.payload.name;
    },
    /**
     * Toggle a boolean setting.
     */
    toggleSetting: (state, action) => {
      const setting = action.payload;
      if (setting in state && typeof state[setting] === 'boolean') {
        state[setting] = !state[setting];
      }
    },
  },
});

export const { setLanguage, toggleSetting } = settingsSlice.actions;
export default settingsSlice.reducer;
