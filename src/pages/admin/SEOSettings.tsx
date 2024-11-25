import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, Code, FileText, Globe, Settings } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CharacterCounter from '@/components/ui/CharacterCounter';

// Rest of the imports and interfaces remain the same...

export default function SEOSettings() {
  // ... previous state and hooks remain the same ...

  return (
    <div className="max-w-4xl mx-auto">
      {/* ... other sections remain the same ... */}

      {/* Robots.txt - Updated icon */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Robots.txt</h2>
        </div>

        <textarea
          value={settings.robots_txt}
          onChange={(e) => setSettings({ ...settings, robots_txt: e.target.value })}
          rows={6}
          className="w-full font-mono text-sm rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* ... rest of the component remains the same ... */}
    </div>
  );
}