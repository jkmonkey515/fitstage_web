import React from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeSelector() {
  const { currentTheme, setTheme, themes, getThemeColor } = useTheme();

  return (
    <div className="relative group">
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Palette className="w-5 h-5" />
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          <div className="text-sm font-medium text-gray-900 px-3 py-2">
            Select Theme
          </div>
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
                currentTheme === key
                  ? `${getThemeColor('bg', 50)} ${getThemeColor('text')}`
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className={`w-4 h-4 rounded-full ${getThemeColor('bg')}`} />
              {theme.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}