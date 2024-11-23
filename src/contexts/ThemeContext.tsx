import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorType = 'bg' | 'text' | 'border' | 'hover';

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  name: string;
  text: string;
  background: string;
  hover: string;
  border: string;
}

interface ThemeContextType {
  currentTheme: string;
  setTheme: (theme: string) => void;
  themes: Record<string, Theme>;
  getThemeColor: (type: ColorType, shade?: number) => string;
}

const themes: Record<string, Theme> = {
  purple: {
    primary: 'purple',
    secondary: 'blue',
    accent: 'purple',
    name: 'Default',
    text: 'gray',
    background: 'white',
    hover: 'purple',
    border: 'gray'
  },
  yellow: {
    primary: 'yellow',
    secondary: 'amber',
    accent: 'yellow',
    name: 'Solar',
    text: 'yellow',
    background: 'white',
    hover: 'yellow',
    border: 'yellow'
  },
  black: {
    primary: 'gray',
    secondary: 'slate',
    accent: 'gray',
    name: 'Dark',
    text: 'gray',
    background: 'gray',
    hover: 'gray',
    border: 'gray'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('purple');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (theme: string): void => {
    if (themes[theme]) {
      setCurrentTheme(theme);
      localStorage.setItem('theme', theme);
    }
  };

  const getThemeColor = (type: ColorType, shade = 600): string => {
    const theme = themes[currentTheme];
    const color = type === 'hover' ? theme.hover : theme.primary;
    
    if (currentTheme === 'yellow') {
      switch (type) {
        case 'bg': return `bg-yellow-${shade}`;
        case 'text': return 'text-yellow-800';
        case 'border': return 'border-yellow-500';
        case 'hover': return 'hover:bg-yellow-700';
        default: return `${type}-yellow-${shade}`;
      }
    }
    
    if (currentTheme === 'black') {
      switch (type) {
        case 'bg': return `bg-gray-${shade}`;
        case 'text': return 'text-gray-900';
        case 'border': return 'border-gray-500';
        case 'hover': return 'hover:bg-gray-800';
        default: return `${type}-gray-${shade}`;
      }
    }
    
    return `${type}-${color}-${shade}`;
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    themes,
    getThemeColor
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}