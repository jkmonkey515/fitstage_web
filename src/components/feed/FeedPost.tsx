import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface FeedPostProps {
  post: {
    id: string;
    author: {
      id: string;
      name: string;
      username: string;
      avatar: string;
      isVerified: boolean;
    };
    content: string;
    media?: {
      type: 'image' | 'video';
      url: string;
      thumbnail?: string;
    }[];
    type: 'workouts' | 'nutrition' | 'photos';
    stats: {
      likes: number;
      comments: number;
      shares: number;
    };
    timestamp: string;
  };
  onLike: () => void;
  onComment: (comment: string) => void;
  onShare: () => void;
}

export default function FeedPost({ post, onLike, onComment, onShare }: FeedPostProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getThemeColor } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(commentText);
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  const handleVoteClick = () => {
    if (!user) {
      navigate('/signup');
    } else {
      navigate(`/voting?competitor=${post.author.id}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
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
        <button
          onClick={handleVoteClick}
          className={`${getThemeColor('bg')} text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${getThemeColor('hover')}`}
        >
          <Trophy className="w-4 h-4" />
          Vote
        </button>
      </div>

      {/* Media Content */}
      {post.media && post.media.length > 0 && (
        <div className="relative">
          {post.media[0].type === 'video' ? (
            <video
              src={post.media[0].url}
              poster={post.media[0].thumbnail}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={post.media[0].url}
              alt=""
              className="w-full object-cover"
            />
          )}
        </div>
      )}

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 whitespace-pre-wrap mb-2">{post.content}</p>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4">
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
              onClick={() => setShowCommentInput(!showCommentInput)}
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
            className={isSaved ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500'}
          >
            <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Comment Input */}
        {showCommentInput && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleComment}
              disabled={!commentText.trim()}
              className={`${getThemeColor('bg')} text-white px-4 py-2 rounded-lg ${getThemeColor('hover')} disabled:opacity-50`}
            >
              Post
            </button>
          </div>
        )}

        {/* Timestamp */}
        <p className="text-sm text-gray-500 mt-2">{post.timestamp}</p>
      </div>
    </div>
  );
}