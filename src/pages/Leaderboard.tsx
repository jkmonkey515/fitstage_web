import React, { useState } from 'react';
import { Search, Trophy, Medal, Award, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Competitor {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  username: string;
  avatar: string;
  category: string;
  points: number;
  wins: number;
  competitions: number;
  trend: 'up' | 'down' | 'stable';
}

export default function Leaderboard() {
  const { getThemeColor } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeRange, setTimeRange] = useState('all');

  const competitors: Competitor[] = [
    {
      id: '1',
      rank: 1,
      previousRank: 1,
      name: 'Alex Rivera',
      username: 'alexfitpro',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: "Men's Physique",
      points: 2850,
      wins: 12,
      competitions: 15,
      trend: 'stable'
    },
    {
      id: '2',
      rank: 2,
      previousRank: 3,
      name: 'Sarah Chen',
      username: 'sarahfit',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: "Women's Bikini",
      points: 2720,
      wins: 10,
      competitions: 14,
      trend: 'up'
    },
    {
      id: '3',
      rank: 3,
      previousRank: 2,
      name: 'Marcus Johnson',
      username: 'marcusfitness',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: 'Bodybuilding',
      points: 2680,
      wins: 9,
      competitions: 13,
      trend: 'down'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      default:
        return <span className="w-4 h-4 block" />;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-500">{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Global Leaderboard</h1>
          <p className="text-gray-600 max-w-2xl">
            Track the performance of top athletes across different categories and competitions.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {competitors.slice(0, 3).map((competitor) => (
            <div
              key={competitor.id}
              className={`bg-white rounded-xl shadow-sm p-6 ${
                competitor.rank === 1 ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={competitor.avatar}
                  alt={competitor.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    {getRankIcon(competitor.rank)}
                    <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">@{competitor.username}</p>
                  <p className="text-sm font-medium text-purple-600 mt-1">
                    {competitor.points.toLocaleString()} points
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search competitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="bodybuilding">Bodybuilding</option>
                <option value="mens-physique">Men's Physique</option>
                <option value="womens-bikini">Women's Bikini</option>
              </select>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="year">This Year</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Competitor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wins
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Competitions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {competitors.map((competitor) => (
                  <tr key={competitor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRankIcon(competitor.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={competitor.avatar}
                          alt={competitor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {competitor.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{competitor.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {competitor.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {competitor.points.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {competitor.wins}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {competitor.competitions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTrendIcon(competitor.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}