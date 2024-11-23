import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfileTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ProfileTabsProps {
  tabs: ProfileTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ProfileTabs({ tabs, activeTab, onTabChange }: ProfileTabsProps) {
  const { getThemeColor } = useTheme();

  return (
    <div className="border-b border-gray-100">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? `${getThemeColor('border')} ${getThemeColor('text')}`
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}