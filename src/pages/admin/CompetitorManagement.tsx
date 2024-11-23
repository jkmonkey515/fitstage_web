import React, { useState } from 'react';
import { Search, Filter, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  email: string;
  category: string;
  joinDate: string;
  status: 'active' | 'disabled';
  avatar: string;
  completedProfile: boolean;
}

export default function CompetitorManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'disabled'>('all');

  const competitors: Competitor[] = [
    {
      id: '1',
      name: 'Alex Rivera',
      email: 'alex@demo.com',
      category: "Men's Physique",
      joinDate: '2024-03-15',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      completedProfile: true
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@demo.com',
      category: "Women's Bikini",
      joinDate: '2024-03-14',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      completedProfile: true
    }
  ];

  const filteredCompetitors = competitors.filter(competitor => {
    const matchesSearch = competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         competitor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || competitor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (id: string) => {
    // Toggle competitor status logic here
    console.log('Toggling status for competitor:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Competitor Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search competitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'disabled')}
            className="rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Competitor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCompetitors.map((competitor) => (
              <tr key={competitor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={competitor.avatar}
                      alt={competitor.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{competitor.name}</div>
                      <div className="text-sm text-gray-500">{competitor.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    {competitor.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(competitor.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {competitor.completedProfile ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      Complete
                    </span>
                  ) : (
                    <span className="flex items-center text-yellow-600">
                      <AlertCircle className="w-5 h-5 mr-1" />
                      Incomplete
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    competitor.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {competitor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => toggleStatus(competitor.id)}
                    className={`flex items-center gap-1 ${
                      competitor.status === 'active'
                        ? 'text-red-600 hover:text-red-700'
                        : 'text-green-600 hover:text-green-700'
                    }`}
                  >
                    {competitor.status === 'active' ? (
                      <>
                        <XCircle className="w-5 h-5" />
                        Disable
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Enable
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}