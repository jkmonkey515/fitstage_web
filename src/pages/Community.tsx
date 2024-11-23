import React, { useState } from 'react';
import { Search, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { usePosts } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/posts/PostCard';
import CreatePost from '../components/posts/CreatePost';

export default function Community() {
  const { getThemeColor } = useTheme();
  const { posts, likePost, commentOnPost, sharePost } = usePosts();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    if (!searchQuery.trim()) return true;
    
    const searchLower = searchQuery.toLowerCase();
    const contentMatch = post.content?.toLowerCase().includes(searchLower) || false;
    const authorMatch = post.author?.name?.toLowerCase().includes(searchLower) || false;
    const tagsMatch = post.tags?.some(tag => tag.toLowerCase().includes(searchLower)) || false;
    
    return contentMatch || authorMatch || tagsMatch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeFilter === 'trending') {
      const engagementA = (a.stats?.likes || 0) + (a.stats?.comments || 0) + (a.stats?.shares || 0);
      const engagementB = (b.stats?.likes || 0) + (b.stats?.comments || 0) + (b.stats?.shares || 0);
      return engagementB - engagementA;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setActiveFilter('trending')}
            className={`flex-1 md:flex-none flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeFilter === 'trending'
                ? getThemeColor('bg') + ' text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Trending
          </button>
          <button 
            onClick={() => setActiveFilter('latest')}
            className={`flex-1 md:flex-none flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeFilter === 'latest'
                ? getThemeColor('bg') + ' text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Latest
          </button>
        </div>
      </div>

      {user ? (
        <CreatePost />
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Join the Conversation</h3>
          <p className="text-gray-600 mb-4">Sign in to share your fitness journey and connect with others</p>
          <Link
            to="/signup"
            className={`${getThemeColor('bg')} text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 ${getThemeColor('hover')}`}
          >
            Join Now
          </Link>
        </div>
      )}

      {sortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found. Be the first to share something!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => likePost(post.id)}
              onComment={() => commentOnPost(post.id, '')}
              onShare={() => sharePost(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}