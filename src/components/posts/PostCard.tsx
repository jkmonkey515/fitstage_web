import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Clock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      username: string;
      avatar: string;
      isVerified: boolean;
    };
    content: string;
    media?: {
      type: 'image' | 'video';
      url: string;
    }[];
    tags: string[];
    stats: {
      likes: number;
      comments: number;
      shares: number;
    };
    createdAt: string;
    timestamp: string;
  };
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export default function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const { getThemeColor } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showFullDate, setShowFullDate] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  const toggleDateFormat = () => {
    setShowFullDate(!showFullDate);
  };

  const getFormattedDate = () => {
    if (showFullDate) {
      return new Date(post.createdAt).toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
    return post.timestamp;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                {post.author.isVerified && (
                  <span className="text-blue-500">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-500">@{post.author.username}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-800 whitespace-pre-wrap mb-2">{post.content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`${getThemeColor('text')} text-sm hover:underline cursor-pointer`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className={`grid ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
          {post.media.map((media, index) => (
            <div key={index} className="aspect-square">
              {media.type === 'image' ? (
                <img
                  src={media.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              <span>{post.stats.likes}</span>
            </button>
            <button
              onClick={onComment}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.stats.comments}</span>
            </button>
            <button
              onClick={onShare}
              className="flex items-center gap-2 text-gray-600 hover:text-green-500"
            >
              <Share2 className="w-5 h-5" />
              <span>{post.stats.shares}</span>
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`${isSaved ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500'}`}
          >
            <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Timestamp */}
      <div className="px-4 pb-4">
        <button 
          onClick={toggleDateFormat}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <Clock className="w-4 h-4" />
          {getFormattedDate()}
        </button>
      </div>
    </div>
  );
}