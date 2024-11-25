import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Users, Trophy, Calendar, Grid, ListFilter } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';

interface VotedAthlete {
  id: string;
  name: string;
  username: string;
  avatar: string;
  category: string;
  competition: string;
  votedAt: string;
}

interface FollowedAthlete {
  id: string;
  name: string;
  username: string;
  avatar: string;
  category: string;
  followedAt: string;
}

export default function SpectatorProfile() {
  const { username } = useParams();
  const { getThemeColor } = useTheme();
  const [activeTab, setActiveTab] = useState<'votes' | 'following'>('votes');

  // Mock data - replace with real data from your backend
  const votedAthletes: VotedAthlete[] = [
    {
      id: '1',
      name: 'Alex Rivera',
      username: 'alexfitpro',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: "Men's Physique",
      competition: 'Summer Shred Championship',
      votedAt: '2024-03-15'
    }
  ];

  const followedAthletes: FollowedAthlete[] = [
    {
      id: '2',
      name: 'Sarah Chen',
      username: 'sarahfit',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: "Women's Bikini",
      followedAt: '2024-03-10'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader 
          coverImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        />

        <ProfileInfo
          username={username}
          avatar="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
          name="Mike Johnson"
          location="Miami, FL"
          joinDate="Joined March 2023"
          stats={{
            followers: '124',
            following: '256',
            posts: '45'
          }}
        />

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('votes')}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'votes'
                  ? `${getThemeColor('border')} ${getThemeColor('text')}`
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Trophy className="w-5 h-5" />
              Votes
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'following'
                  ? `${getThemeColor('border')} ${getThemeColor('text')}`
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              Following
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'votes' ? (
              <div className="space-y-6">
                {votedAthletes.map((athlete) => (
                  <div
                    key={athlete.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={athlete.avatar}
                        alt={athlete.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{athlete.name}</h3>
                        <p className="text-sm text-gray-500">@{athlete.username}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Trophy className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-600">{athlete.competition}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">{athlete.category}</span>
                      <p className="text-sm text-gray-500">
                        Voted {new Date(athlete.votedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {followedAthletes.map((athlete) => (
                  <div
                    key={athlete.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={athlete.avatar}
                        alt={athlete.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{athlete.name}</h3>
                        <p className="text-sm text-gray-500">@{athlete.username}</p>
                        <p className="text-sm text-gray-600 mt-1">{athlete.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className={`${getThemeColor('bg')} text-white px-4 py-2 rounded-lg text-sm ${getThemeColor('hover')}`}>
                        Following
                      </button>
                      <p className="text-sm text-gray-500 mt-1">
                        Since {new Date(athlete.followedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}