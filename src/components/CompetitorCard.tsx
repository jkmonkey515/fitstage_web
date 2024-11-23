import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

interface CompetitorCardProps {
  name: string;
  category: string;
  imageUrl: string;
  rank: number;
  likes: string;
  comments: number;
}

export default function CompetitorCard({ 
  name, 
  category, 
  imageUrl, 
  rank, 
  likes, 
  comments 
}: CompetitorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
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
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{category}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <button className="flex items-center gap-1 hover:text-purple-600">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-purple-600">
            <MessageCircle className="w-4 h-4" />
            <span>{comments}</span>
          </button>
          <button className="flex items-center gap-1 text-purple-600 font-medium hover:text-purple-700">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}