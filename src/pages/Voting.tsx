import React, { useState } from 'react';
import { Search, Filter, Trophy, Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import VotingCard from '@/components/VotingCard';
import VotingFloatingPanel from '@/components/VotingFloatingPanel';

interface VotingFilters {
  category: string;
  sortBy: 'rank' | 'votes' | 'recent';
}

export default function Voting() {
  const { getThemeColor } = useTheme();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<VotingFilters>({
    category: 'all',
    sortBy: 'rank'
  });
  const [votedCompetitors, setVotedCompetitors] = useState<string[]>([]);
  const [showVotingPanel, setShowVotingPanel] = useState(true);

  const competitors = [
    {
      id: '1',
      name: 'Alex Rivera',
      username: 'alexfitpro',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: "Men's Physique",
      votes: 1234,
      rank: 1,
      media: [
        {
          type: 'video' as const,
          url: 'https://example.com/video1.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      stats: {
        likes: 2345,
        comments: 123,
        shares: 45
      }
    },
    {
      id: '2',
      name: 'Sarah Chen',
      username: 'sarahfit',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      category: "Women's Bikini",
      votes: 982,
      rank: 2,
      media: [
        {
          type: 'image' as const,
          url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      stats: {
        likes: 1876,
        comments: 98,
        shares: 34
      }
    }
  ];

  // Mock voting progress data
  const votingProgress = [
    {
      categoryId: '1',
      categoryName: "Men's Physique",
      votesUsed: 3,
      maxVotes: 5
    },
    {
      categoryId: '2',
      categoryName: "Women's Bikini",
      votesUsed: 2,
      maxVotes: 5
    }
  ];

  const handleVote = (competitorId: string) => {
    setVotedCompetitors(prev => [...prev, competitorId]);
  };

  const filteredCompetitors = competitors.filter(competitor => {
    const matchesSearch = competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         competitor.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.category === 'all' || competitor.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Vote for Competitors</h1>
        <p className="text-gray-600">Support your favorite athletes and help them win</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search competitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="mens-physique">Men's Physique</option>
              <option value="womens-bikini">Women's Bikini</option>
              <option value="bodybuilding">Bodybuilding</option>
            </select>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as VotingFilters['sortBy'] }))}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="rank">Top Ranked</option>
              <option value="votes">Most Votes</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">Top Male</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">Alex Rivera</p>
          <p className="text-sm text-gray-500">1,234 votes</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">Top Female</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">Sarah Chen</p>
          <p className="text-sm text-gray-500">982 votes</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">Your Votes</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{votedCompetitors.length}</p>
          <p className="text-sm text-gray-500">Categories voted in</p>
        </div>
      </div>

      {/* Competitor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitors.map((competitor) => (
          <VotingCard
            key={competitor.id}
            competitor={competitor}
            onVote={() => handleVote(competitor.id)}
            hasVoted={votedCompetitors.includes(competitor.id)}
          />
        ))}
      </div>

      {/* Voting Panel for logged-in spectators */}
      {user && user.role === 'spectator' && showVotingPanel && (
        <VotingFloatingPanel
          votingProgress={votingProgress}
          onClose={() => setShowVotingPanel(false)}
          onNavigateToCategory={(categoryId) => {
            setFilters(prev => ({
              ...prev,
              category: categoryId === '1' ? "Men's Physique" : "Women's Bikini"
            }));
          }}
        />
      )}
    </div>
  );
}