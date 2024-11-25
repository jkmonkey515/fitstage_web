import React from 'react';
import { Calendar, MapPin, Users, Timer } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface CompetitionListProps {
  showAll: boolean;
  onViewDetails: (competitionId: string) => void;
}

interface Competition {
  id: string;
  title: string;
  category: string;
  startDate: string;
  location: string;
  participants: number;
  maxParticipants: number;
  registrationDeadline: string;
  prizePool: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function CompetitionList({ showAll, onViewDetails }: CompetitionListProps) {
  const { getThemeColor } = useTheme();

  const competitions: Competition[] = [
    {
      id: '1',
      title: 'Summer Shred Championship',
      category: 'Bodybuilding',
      startDate: '2024-05-31',
      location: 'Los Angeles, CA',
      participants: 245,
      maxParticipants: 300,
      registrationDeadline: '2024-05-14',
      prizePool: '$50,000',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'CrossFit Elite Series',
      category: 'CrossFit',
      startDate: '2024-07-15',
      location: 'Miami, FL',
      participants: 180,
      maxParticipants: 200,
      registrationDeadline: '2024-06-29',
      prizePool: '$75,000',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
      status: 'upcoming'
    }
  ];

  const displayedCompetitions = showAll ? competitions : competitions.slice(0, 2);

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
    <div className="space-y-6">
      {displayedCompetitions.map((competition) => (
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
                <button
                  onClick={() => onViewDetails(competition.id)}
                  className="flex items-center gap-2"
                >
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="text-sm font-medium">
                      {competition.participants}/{competition.maxParticipants}
                    </p>
                  </div>
                </button>
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
                <button
                  onClick={() => onViewDetails(competition.id)}
                  className={`${getThemeColor('bg')} text-white px-6 py-2 rounded-lg flex items-center gap-2 ${getThemeColor('hover')}`}
                >
                  Learn More
                </button>
                <button
                  className="text-purple-600 hover:text-purple-700 font-medium"
                  onClick={() => onViewDetails(competition.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}