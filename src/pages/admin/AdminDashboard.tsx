import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Trophy, DollarSign, TrendingUp, Settings, UserCog, LayoutGrid } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  bgColor: string;
  iconColor: string;
}

export default function AdminDashboard() {
  const stats: StatCard[] = [
    {
      title: 'Total Competitors',
      value: '1,234',
      change: '+12.5%',
      icon: <Users className="w-6 h-6" />,
      trend: 'up'
    },
    {
      title: 'Active Competitions',
      value: '8',
      change: '+2',
      icon: <Trophy className="w-6 h-6" />,
      trend: 'up'
    },
    {
      title: 'Prize Pool',
      value: '$100,000',
      change: '+$25,000',
      icon: <DollarSign className="w-6 h-6" />,
      trend: 'up'
    },
    {
      title: 'Platform Growth',
      value: '25.4%',
      change: '+4.2%',
      icon: <TrendingUp className="w-6 h-6" />,
      trend: 'up'
    }
  ];

  const quickActions: QuickAction[] = [
    {
      title: 'Platform Settings',
      description: 'Configure competition categories and rules',
      icon: <Settings className="w-6 h-6" />,
      link: '/admin/settings',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Manage Competitors',
      description: 'Review and moderate competitors',
      icon: <UserCog className="w-6 h-6" />,
      link: '/admin/competitors',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Competition Setup',
      description: 'Create and manage competitions',
      icon: <Trophy className="w-6 h-6" />,
      link: '/admin/competitions',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Dashboard Overview',
      description: 'View platform analytics',
      icon: <LayoutGrid className="w-6 h-6" />,
      link: '/admin/analytics',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg bg-purple-100 text-purple-600`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className={`${action.bgColor} p-4 rounded-lg hover:opacity-90 transition-opacity`}
              >
                <div className={`${action.iconColor} mb-2`}>
                  {action.icon}
                </div>
                <h4 className="font-medium text-gray-900">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm text-gray-900">New competitor registration</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm text-gray-900">Competition phase updated</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div>
                <p className="text-sm text-gray-900">Prize pool increased</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}