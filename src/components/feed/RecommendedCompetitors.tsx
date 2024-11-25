import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Competitor {
  id: string;
  name: string;
  username: string;
  avatar: string;
  category: string;
  followers: string;
}

export default function RecommendedCompetitors() {
  const navigate = useNavigate();
  const { getThemeColor } = useTheme();

  const competitors: Competitor[] = [
    {
      id: '1',
      name: 'Alex Rivera',
      username: 'alexfitpro',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: "Men's Physique",
      followers: '12.5k'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      username: 'sarahfit',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: "Women's Bikini",
      followers: '8.3k'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      username: 'mikefitness',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: 'Bodybuilding',
      followers: '15.2k'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recommended Competitors</h3>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          See All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {competitors.map((competitor) => (
          <button
            key={competitor.id}
            onClick={() => navigate(`/profile/${competitor.username}`)}
            className="text-center group"
          >
            <div className="relative mb-2">
              <img
                src={competitor.avatar}
                alt={competitor.name}
                className="w-20 h-20 rounded-full mx-auto"
              />
              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${getThemeColor('bg')} bg-opacity-20`} />
            </div>
            <h4 className="font-medium text-gray-900 text-sm">{competitor.name}</h4>
            <p className="text-gray-500 text-xs">@{competitor.username}</p>
            <p className="text-gray-600 text-xs mt-1">{competitor.followers} followers</p>
          </button>
        ))}
      </div>
    </div>
  );
}