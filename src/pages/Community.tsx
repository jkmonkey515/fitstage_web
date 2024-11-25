import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Filter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePosts } from '../contexts/PostContext';
import PostCard from '../components/posts/PostCard';

export default function Community() {
  const { getThemeColor } = useTheme();
  const { posts, likePost, commentOnPost, sharePost } = usePosts();
  const [activeFilter, setActiveFilter] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeFilter === 'trending') {
      // Sort by engagement (likes + comments + shares)
      const engagementA = a.stats.likes + a.stats.comments + a.stats.shares;
      const engagementB = b.stats.likes + b.stats.comments + b.stats.shares;
      return engagementB - engagementA;
    } else {
      // Sort by timestamp (latest first)
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
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
    </div>
  );
}