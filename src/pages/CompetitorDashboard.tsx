import React, { useState } from 'react';
import { Search, MapPin, Calendar, Filter, Heart, MessageCircle, Share2, Bookmark, Grid, ListFilter } from 'lucide-react';
import PostsFeed from '../components/posts/PostsFeed';

interface Competition {
  id: string;
  title: string;
  location: string;
  date: string;
  category: string;
  imageUrl: string;
  entryFee: string;
  spotsLeft: number;
}

export default function CompetitorDashboard() {
  const [activeTab, setActiveTab] = useState<'feed' | 'competitions'>('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const competitions: Competition[] = [
    {
      id: '1',
      title: 'West Coast Fitness Championship',
      location: 'Los Angeles, CA',
      date: '2024-04-15',
      category: 'CrossFit',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      entryFee: '$75',
      spotsLeft: 45
    },
    {
      id: '2',
      title: 'Strength Summit 2024',
      location: 'Miami, FL',
      date: '2024-05-01',
      category: 'Powerlifting',
      imageUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
      entryFee: '$90',
      spotsLeft: 30
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Competitor Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'feed'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Grid className="w-5 h-5" />
            Feed
          </button>
          <button
            onClick={() => setActiveTab('competitions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'competitions'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ListFilter className="w-5 h-5" />
            Competitions
          </button>
        </div>
      </div>

      {activeTab === 'feed' ? (
        <PostsFeed />
      ) : (
        <div className="space-y-6">
          {/* Competition search and filters */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search competitions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                  <Filter className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Competition cards */}
          <div className="space-y-6">
            {competitions.map((competition) => (
              <div key={competition.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full md:w-48 object-cover"
                      src={competition.imageUrl}
                      alt={competition.title}
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{competition.title}</h3>
                        <p className="text-sm text-gray-500">{competition.category}</p>
                      </div>
                      <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                        {competition.entryFee}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {competition.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(competition.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {competition.spotsLeft} spots remaining
                      </span>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}