import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Trophy, Users, Calendar, MapPin, ArrowRight, Timer } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import HeaderSection from '@/components/HeaderSection';
import CategoryTileCarousel from '@/components/CategoryTileCarousel';
import CompetitionFeed from '@/components/feed/CompetitionFeed';
import CompetitionList from '@/components/competitions/CompetitionList';

const competitionCategories = [
  {
    id: '1',
    name: "Men's Bodybuilding",
    description: "Elite bodybuilding competition showcasing peak physique development",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    participants: 156
  },
  {
    id: '2',
    name: "Women's Bikini",
    description: "Premier bikini division highlighting aesthetics and presentation",
    imageUrl: "https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    participants: 124
  },
  {
    id: '3',
    name: "Men's Physique",
    description: "Athletic physique competition focusing on overall aesthetics",
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    participants: 198
  },
  {
    id: '4',
    name: "Women's Figure",
    description: "Figure competition showcasing symmetry and muscle tone",
    imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    participants: 142
  }
];

export default function Competitions() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAllCompetitions, setShowAllCompetitions] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    if (!user) {
      navigate('/signup');
    } else {
      navigate(`/competitions/${categoryId}`);
    }
  };

  const handleViewDetails = (competitionId: string) => {
    navigate(`/competitions/${competitionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeaderSection 
          title="Active Competitions"
          subtitle="Vote for your favorite athletes across different categories and help them win prestigious titles and prizes."
        />

        {/* Category Carousel */}
        <div className="mb-12">
          <CategoryTileCarousel 
            categories={competitionCategories}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        {/* Competition List */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Competitions</h2>
            <button
              onClick={() => setShowAllCompetitions(!showAllCompetitions)}
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
            >
              {showAllCompetitions ? 'Show Less' : 'View All'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <CompetitionList
            showAll={showAllCompetitions}
            onViewDetails={handleViewDetails}
          />
        </div>

        {/* Competition Feed */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Competition Updates</h2>
          <CompetitionFeed />
        </div>
      </div>
    </div>
  );
}