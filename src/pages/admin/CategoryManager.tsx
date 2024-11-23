import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Info } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Category {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  prizePool: number;
  maxParticipants: number;
  status: 'active' | 'draft';
}

export default function CategoryManager() {
  const { getThemeColor } = useTheme();
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories: Category[] = [
    {
      id: '1',
      name: "Men's Bodybuilding",
      description: "Open division for male bodybuilders",
      criteria: [
        "Muscularity and muscle tone",
        "Symmetry and proportion",
        "Stage presence and posing",
        "Overall condition"
      ],
      prizePool: 25000,
      maxParticipants: 50,
      status: 'active'
    },
    {
      id: '2',
      name: "Women's Bikini",
      description: "Division for female bikini competitors",
      criteria: [
        "Balance and shape",
        "Overall physical appearance",
        "Presentation",
        "Stage presence"
      ],
      prizePool: 20000,
      maxParticipants: 40,
      status: 'active'
    },
    {
      id: '3',
      name: "Men's Physique",
      description: "Division focusing on athletic and aesthetic physique",
      criteria: [
        "Muscular development",
        "Stage presence",
        "Overall appearance"
      ],
      prizePool: 15000,
      maxParticipants: 45,
      status: 'active'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Competition Categories</h1>
          <p className="text-gray-600">Manage competition divisions and criteria</p>
        </div>
        <button
          onClick={() => setShowNewCategory(true)}
          className={`${getThemeColor('bg')} text-white px-4 py-2 rounded-lg flex items-center gap-2 ${getThemeColor('hover')}`}
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 bg-blue-50 text-blue-700 p-4 rounded-lg">
            <Info className="w-5 h-5" />
            <p className="text-sm">
              Categories determine the structure of competitions. Each category has its own prize pool and judging criteria.
            </p>
          </div>

          <div className="space-y-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-purple-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.status === 'active' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {category.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Judging Criteria</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {category.criteria.map((criterion, index) => (
                        <li key={index}>{criterion}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Prize Pool</h4>
                    <p className="text-2xl font-bold text-gray-900">
                      ${category.prizePool.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Capacity</h4>
                    <p className="text-2xl font-bold text-gray-900">
                      {category.maxParticipants} spots
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}