import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, PlaySquare, Trophy, BookOpen } from 'lucide-react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileTabs from '@/components/profile/ProfileTabs';
import PostsTab from '@/components/profile/tabs/PostsTab';
import AchievementsTab from '@/components/profile/tabs/AchievementsTab';
import AboutTab from '@/components/profile/tabs/AboutTab';
import { mockPosts, mockAchievements } from '@/data/profile';

const tabs = [
  { id: 'posts', label: 'Posts', icon: <Grid className="w-5 h-5" /> },
  { id: 'videos', label: 'Videos', icon: <PlaySquare className="w-5 h-5" /> },
  { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-5 h-5" /> },
  { id: 'about', label: 'About', icon: <BookOpen className="w-5 h-5" /> }
];

export default function Profile() {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('posts');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsTab posts={mockPosts} />;
      case 'achievements':
        return <AchievementsTab achievements={mockAchievements} />;
      case 'about':
        return (
          <AboutTab 
            bio="Professional athlete specializing in CrossFit and functional fitness. Passionate about helping others achieve their fitness goals through dedicated training and proper nutrition."
            specialties={['CrossFit', 'Olympic Weightlifting', 'Nutrition Coaching', 'HIIT']}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProfileHeader 
        coverImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
      />

      <ProfileInfo
        username={username}
        avatar="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
        name="Alex Rivera"
        location="Los Angeles, CA"
        joinDate="Joined March 2023"
        stats={{
          followers: '1.2M',
          following: '824',
          posts: '2.1K'
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
    </div>
  );
}