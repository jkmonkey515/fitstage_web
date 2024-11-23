import React, { useState } from 'react';
import { Search, Filter, Trophy, Users, Calendar, MapPin, ArrowRight, Timer } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Competition {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  prizePool: string;
  participants: number;
  maxParticipants: number;
  registrationDeadline: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function Competitions() {
  const { getThemeColor } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const competitions: Competition[] = [
    {
      id: '1',
      title: 'Summer Shred Championship',
      category: 'Bodybuilding',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      location: 'Los Angeles, CA',
      prizePool: '$50,000',
      participants: 245,
      maxParticipants: 300,
      registrationDeadline: '2024-05-15',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'CrossFit Elite Series',
      category: 'CrossFit',
      startDate: '2024-07-15',
      endDate: '2024-07-20',
      location: 'Miami, FL',
      prizePool: '$75,000',
      participants: 180,
      maxParticipants: 200,
      registrationDeadline: '2024-06-30',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Powerlifting Pro Championship',
      category: 'Powerlifting',
      startDate: '2024-05-01',
      endDate: '2024-05-03',
      location: 'Chicago, IL',
      prizePool: '$30,000',
      participants: 150,
      maxParticipants: 150,
      registrationDeadline: '2024-04-15',
      image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
      status: 'ongoing'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Fitness Competitions</h1>
          <p className="text-gray-600 max-w-2xl">
            Join elite fitness competitions, showcase your skills, and compete for prestigious titles and prizes.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
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
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="bodybuilding">Bodybuilding</option>
                <option value="crossfit">CrossFit</option>
                <option value="powerlifting">Powerlifting</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Competition Cards */}
        <div className="grid grid-cols-1 gap-8">
          {competitions.map((competition) => (
            <div 
              key={competition.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0 h-48 md:h-auto md:w-72">
                  <img
                    src={competition.image}
                    alt={competition.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          {competition.title}
                        </h2>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(competition.status)}`}>
                          {competition.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{competition.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {competition.prizePool}
                      </div>
                      <p className="text-sm text-gray-500">Prize Pool</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-sm font-medium">
                          {new Date(competition.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-sm font-medium">{competition.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Participants</p>
                        <p className="text-sm font-medium">
                          {competition.participants}/{competition.maxParticipants}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Registration Ends</p>
                        <p className="text-sm font-medium">
                          {new Date(competition.registrationDeadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <button className={`${getThemeColor('bg')} text-white px-6 py-2 rounded-lg flex items-center gap-2 ${getThemeColor('hover')}`}>
                      Register Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-700 font-medium">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}