import React from 'react';
import { Trophy, Star, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

interface VotingCardProps {
  competitor: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    category: string;
    votes: number;
    rank: number;
    media: {
      type: 'image' | 'video';
      url: string;
      thumbnail?: string;
    }[];
    stats: {
      likes: number;
      comments: number;
      shares: number;
    };
  };
  onVote: () => void;
  hasVoted: boolean;
}

export default function VotingCard({ competitor, onVote, hasVoted }: VotingCardProps) {
  const { getThemeColor } = useTheme();
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={competitor.avatar}
            alt={competitor.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
            <p className="text-sm text-gray-500">{competitor.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">Rank #{competitor.rank}</span>
        </div>
      </div>

      {/* Media Carousel */}
      <div className="relative aspect-video bg-gray-100">
        {competitor.media[0].type === 'video' ? (
          <video
            src={competitor.media[0].url}
            poster={competitor.media[0].thumbnail}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={competitor.media[0].url}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
              <Heart className="w-5 h-5" />
              <span>{competitor.stats.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
              <MessageCircle className="w-5 h-5" />
              <span>{competitor.stats.comments}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-purple-500">
              <Share2 className="w-5 h-5" />
              <span>{competitor.stats.shares}</span>
            </button>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-semibold">{competitor.votes}</span>
          </div>
        </div>

        {/* Vote Button */}
        <button
          onClick={onVote}
          disabled={!user || user.role === 'competitor' || hasVoted}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
            hasVoted
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : user && user.role !== 'competitor'
              ? `${getThemeColor('bg')} text-white ${getThemeColor('hover')}`
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Trophy className="w-5 h-5" />
          {hasVoted ? 'Voted' : 'Vote for Competitor'}
        </button>

        {!user && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Sign in to vote for your favorite competitor
          </p>
        )}
        {user && user.role === 'competitor' && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Competitors cannot vote in the competition
          </p>
        )}
      </div>
    </div>
  );
}