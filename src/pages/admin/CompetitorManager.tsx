import React, { useState } from 'react';
import { Search, Filter, Shield, AlertTriangle, CheckCircle, XCircle, Eye, Ban } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { demoUsers } from '@/data/demoUsers';

interface CompetitorFilters {
  status: 'all' | 'active' | 'disabled';
  category: string;
  verified: boolean;
}

export default function CompetitorManager() {
  const { getThemeColor } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CompetitorFilters>({
    status: 'all',
    category: 'all',
    verified: false
  });

  // Filter only competitor accounts
  const competitors = demoUsers.filter(user => user.role === 'competitor');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Competitor Management</h1>
        <p className="text-gray-600">Monitor and manage competitor profiles and activity</p>
      </div>

      {/* Filters and Search */}
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
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as 'all' | 'active' | 'disabled' })}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="bodybuilding">Bodybuilding</option>
              <option value="bikini">Bikini</option>
              <option value="physique">Physique</option>
            </select>
          </div>
        </div>
      </div>

      {/* Competitor List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competitor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reports
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {competitors.map((competitor) => (
                <tr key={competitor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={competitor.profile.avatar}
                        alt={competitor.profile.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-900">
                            {competitor.profile.name}
                          </div>
                          {competitor.profile.achievements && competitor.profile.achievements.length > 0 && (
                            <Shield className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{competitor.profile.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      {competitor.profile.specialties?.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {competitor.profile.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      2 Reports
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/profile/${competitor.profile.username}`}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button className="text-red-400 hover:text-red-500">
                        <Ban className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Violation Reports Modal would go here */}
    </div>
  );
}