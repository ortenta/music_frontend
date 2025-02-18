import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, ThemeMode, ThemeContextType } from '../types/theme';

const lightTheme: Theme = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  background: '#ffffff',
  text: '#1f2937',
  accent: '#3b82f6',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  surface: '#f3f4f6',
  surfaceHover: '#e5e7eb'
};

const darkTheme: Theme = {
  primary: '#818cf8',
  secondary: '#a78bfa',
  background: '#111827',
  text: '#f9fafb',
  accent: '#60a5fa',
  error: '#f87171',
  success: '#4ade80',
  warning: '#fbbf24',
  surface: '#1f2937',
  surfaceHover: '#374151'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    if (savedMode) return savedMode;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const theme = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};