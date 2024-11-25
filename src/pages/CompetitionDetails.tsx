import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Trophy, Timer, DollarSign, Share2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function CompetitionDetails() {
  const { id } = useParams();
  const { getThemeColor } = useTheme();

  // Mock competition data - in a real app, fetch this based on the ID
  const competition = {
    id: '1',
    title: 'Summer Shred Championship',
    category: 'Bodybuilding',
    description: 'Join the ultimate summer fitness competition featuring multiple categories and substantial prizes. This event brings together elite athletes from across the country to compete in various divisions.',
    startDate: '2024-05-31',
    endDate: '2024-06-30',
    location: 'Los Angeles Convention Center, CA',
    participants: 245,
    maxParticipants: 300,
    registrationDeadline: '2024-05-14',
    prizePool: '$50,000',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    status: 'upcoming',
    rules: [
      'Must be 18 years or older to participate',
      'Previous competition experience required',
      'Drug testing will be conducted',
      'Must complete registration and pay fees by deadline'
    ],
    schedule: [
      { time: '8:00 AM', event: 'Check-in and Registration' },
      { time: '10:00 AM', event: 'Preliminary Judging' },
      { time: '2:00 PM', event: 'Finals' },
      { time: '6:00 PM', event: 'Awards Ceremony' }
    ],
    categories: [
      { name: "Men's Open", prizePool: '$20,000' },
      { name: "Women's Figure", prizePool: '$15,000' },
      { name: "Men's Physique", prizePool: '$15,000' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <img
            src={competition.image}
            alt={competition.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{competition.title}</h1>
                  <p className="text-gray-200 text-lg">{competition.category}</p>
                </div>
                <button className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/20 transition">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 mb-6">{competition.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{new Date(competition.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{competition.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="font-medium">{competition.participants}/{competition.maxParticipants}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Timer className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Registration Ends</p>
                    <p className="font-medium">{new Date(competition.registrationDeadline).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Schedule</h2>
              <div className="space-y-4">
                {competition.schedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 font-medium text-purple-600">{item.time}</div>
                    <div className="flex-1 text-gray-600">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Competition Rules</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {competition.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prize Pool */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Prize Pool</h2>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-4">{competition.prizePool}</div>
              <div className="space-y-3">
                {competition.categories.map((category, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{category.name}</span>
                    <span className="font-medium text-gray-900">{category.prizePool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Registration</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Entry Fee</span>
                  <span className="font-medium text-gray-900">$150</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spots Remaining</span>
                  <span className="font-medium text-gray-900">
                    {competition.maxParticipants - competition.participants}
                  </span>
                </div>
              </div>
              <button
                className={`w-full ${getThemeColor('bg')} text-white py-3 rounded-lg font-semibold ${getThemeColor('hover')}`}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}