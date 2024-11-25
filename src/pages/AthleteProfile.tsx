import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Instagram, 
  Youtube, 
  MapPin, 
  Calendar, 
  Grid, 
  Trophy,
  PlaySquare,
  BookOpen,
  Edit2,
  Share2
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { demoUsers } from '@/data/demoUsers';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileTabs from '@/components/profile/ProfileTabs';
import PostsTab from '@/components/profile/tabs/PostsTab';
import AchievementsTab from '@/components/profile/tabs/AchievementsTab';
import AboutTab from '@/components/profile/tabs/AboutTab';

const tabs = [
  { id: 'posts', label: 'Posts', icon: <Grid className="w-5 h-5" /> },
  { id: 'videos', label: 'Videos', icon: <PlaySquare className="w-5 h-5" /> },
  { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-5 h-5" /> },
  { id: 'about', label: 'About', icon: <BookOpen className="w-5 h-5" /> }
];

export default function AthleteProfile() {
  const { username } = useParams();
  const { getThemeColor } = useTheme();
  const [activeTab, setActiveTab] = useState('posts');

  // Find athlete from demo users
  const athlete = demoUsers.find(user => user.profile.username === username);

  if (!athlete) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Athlete Not Found</h1>
            <p className="text-gray-600 mt-2">The athlete profile you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <PostsTab
            posts={[
              {
                id: '1',
                type: 'image',
                thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                likes: 1234,
                comments: 89
              },
              {
                id: '2',
                type: 'video',
                thumbnail: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                likes: 2341,
                comments: 156
              }
            ]}
          />
        );
      case 'achievements':
        return (
          <AchievementsTab
            achievements={athlete.profile.achievements || []}
          />
        );
      case 'about':
        return (
          <AboutTab 
            bio={athlete.profile.bio || ''}
            specialties={athlete.profile.specialties || []}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader 
          coverImage={athlete.profile.heroImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}
        />

        <ProfileInfo
          username={athlete.profile.username}
          avatar={athlete.profile.avatar}
          name={athlete.profile.name}
          location={athlete.profile.location || ''}
          joinDate={athlete.profile.joinDate}
          stats={athlete.profile.stats || {
            followers: '0',
            following: '0',
            posts: '0'
          }}
        />

        <div className="bg-white rounded-xl shadow-sm mb-8">
          <ProfileTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Active Competitions */}
        {athlete.profile.activeCompetitions && athlete.profile.activeCompetitions.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Active Competitions</h2>
            <div className="grid gap-4">
              {athlete.profile.activeCompetitions.map((competition) => (
                <div
                  key={competition.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{competition.name}</h3>
                    <p className="text-sm text-gray-600">{competition.category}</p>
                  </div>
                  {competition.rank && (
                    <div className="flex items-center gap-2 text-purple-600">
                      <Trophy className="w-5 h-5" />
                      <span className="font-semibold">Rank #{competition.rank}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {athlete.profile.socialLinks && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Connect with {athlete.profile.name}</h2>
            <div className="flex gap-4">
              {athlete.profile.socialLinks.instagram && (
                <a
                  href={`https://instagram.com/${athlete.profile.socialLinks.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#E1306C]"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {athlete.profile.socialLinks.youtube && (
                <a
                  href={athlete.profile.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#FF0000]"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              )}
              {athlete.profile.socialLinks.tiktok && (
                <a
                  href={`https://tiktok.com/@${athlete.profile.socialLinks.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}