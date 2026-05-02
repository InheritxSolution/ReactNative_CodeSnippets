/**
 * @file ThemeManager.js
 * @description A scalable Light/Dark mode theme manager using React Context.
 * @company Inheritx Solutions
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// 1. Define Theme Tokens
export const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
    card: '#F2F2F7',
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
    card: '#1C1C1E',
  },
};

// 2. Create Theme Context
const ThemeContext = createContext();

/**
 * ThemeProvider Component
 * Wrap your root component with this to enable theme switching.
 */
export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Synchronize with system changes
  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 * Custom hook to easily access theme and toggle function.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
