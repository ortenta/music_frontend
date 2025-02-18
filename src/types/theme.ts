export interface Theme {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
    surface: string;
    surfaceHover: string;
  }
  
  export type ThemeMode = 'light' | 'dark';
  
  export interface ThemeContextType {
    theme: Theme;
    mode: ThemeMode;
    toggleTheme: () => void;
  }