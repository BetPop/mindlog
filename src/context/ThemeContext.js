import React, { createContext, useState, useContext } from 'react';

/**
 * Theme Context for global styling (Light/Dark mode)
 * Satisfies Assignment 6, Завдання 2.
 */
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Define theme colors based on the current state
  const colors = {
    background: theme === 'light' ? '#fcfbfa' : '#1a1a1a',
    card: theme === 'light' ? '#f1f0ee' : '#2c2c2c',
    text: theme === 'light' ? '#2c2926' : '#fcfbfa',
    subtext: theme === 'light' ? '#6d665e' : '#cbc5bf',
    border: theme === 'light' ? '#e0dddb' : '#423d38',
    primary: '#2c2926', // Keep primary consistent or adjust if needed
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easier theme access
export const useTheme = () => useContext(ThemeContext);
