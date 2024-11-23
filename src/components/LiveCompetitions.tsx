import React from 'react';
import { Link } from 'react-router-dom';
import { Timer, Users, Trophy, ArrowRight } from 'lucide-react';

interface Competition {
  id: string;
  title: string;
  category: string;
  participants: number;
  timeLeft: string;
  prize: string;
  imageUrl: string;
  status: 'live' | 'upcoming';
}

export default function LiveCompetitions() {
  const competitions: Competition[] = [
    {
      id: '1',
      title: "Summer Shred Challenge",
      category: "Weight Loss",
      participants: 1240,
      timeLeft: "2d 14h",
      prize: "$5,000",
      imageUrl: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
      status: 'live'
    },
    {
      id: '2',
      title: "Powerlifting Pro Series",
      category: "Strength",
      participants: 856,
      timeLeft: "5d 8h",
      prize: "$3,500",
      imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
      status: 'live'
    },
    {
      id: '3',
      title: "Endurance Elite",
      category: "Marathon",
      participants: 2130,
      timeLeft: "1d 6h",
      prize: "$7,500",
      imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
      status: 'upcoming'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Competitions</h2>
            <p className="text-gray-600 max-w-2xl">
              Join ongoing competitions or register for upcoming events. Compete with athletes worldwide and win exciting prizes.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-purple-600 hover:text-purple-700 cursor-pointer">
            <Link to="/competitions" className="font-semibold flex items-center gap-2">
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions.map((competition) => (
            <div key={competition.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={competition.imageUrl} 
                  alt={competition.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    competition.status === 'live' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {competition.status === 'live' ? 'Live Now' : 'Upcoming'}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {competition.title}
                  </h3>
                  <p className="text-sm text-gray-600">{competition.category}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Timer className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{competition.timeLeft}</span>
                    <p className="text-xs text-gray-500">Remaining</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{competition.participants}</span>
                    <p className="text-xs text-gray-500">Athletes</p>
                  </div>
                  <div className="text-center">
                    <Trophy className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{competition.prize}</span>
                    <p className="text-xs text-gray-500">Prize Pool</p>
                  </div>
                </div>

                <Link
                  to="/competitions"
                  className="block w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition text-center"
                >
                  {competition.status === 'live' ? 'Join Now' : 'Register'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/competitions"
            className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2 mx-auto justify-center"
          >
            <span>View All Competitions</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}