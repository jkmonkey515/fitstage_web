import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Trophy } from 'lucide-react';

interface CompetitorCard {
  name: string;
  username: string;
  category: string;
  imageUrl: string;
  rank: number;
  likes: string;
  comments: number;
  activeCompetitions?: Array<{
    id: string;
    name: string;
    category: string;
    rank?: number;
  }>;
}

export default function CompetitorCard({ 
  name, 
  username,
  category, 
  imageUrl, 
  rank, 
  likes, 
  comments,
  activeCompetitions = []
}: CompetitorCard) {
  return (
    <Link 
      to={`/athlete/${username}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-64 object-cover rounded-t-xl"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Rank #{rank}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{category}</p>
        </div>

        {activeCompetitions.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Active Competitions</h4>
            <div className="space-y-2">
              {activeCompetitions.map((competition) => (
                <div 
                  key={competition.id}
                  className="flex items-center justify-between bg-purple-50 rounded-lg p-2"
                >
                  <div>
                    <p className="text-sm font-medium text-purple-900">{competition.name}</p>
                    <p className="text-xs text-purple-600">{competition.category}</p>
                  </div>
                  {competition.rank && (
                    <div className="flex items-center gap-1 text-purple-700">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">#{competition.rank}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </span>
          </div>
          <span className="text-purple-600 font-medium">View Profile</span>
        </div>
      </div>
    </Link>
  );
}