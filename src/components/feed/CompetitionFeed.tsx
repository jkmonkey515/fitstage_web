import React, { useState } from 'react';
import { Filter, Grid, Dumbbell, Utensils, Camera } from 'lucide-react';
import FeedPost from './FeedPost';
import AdBanner from './AdBanner';
import RecommendedCompetitors from './RecommendedCompetitors';
import { useInView } from 'react-intersection-observer';

type ContentFilter = 'all' | 'workouts' | 'nutrition' | 'photos';

const mockPosts = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Sarah Chen',
      username: 'sarahfit',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      isVerified: true
    },
    content: '🎯 Just finished my competition prep workout! Feeling stronger than ever.\n\nMorning routine:\n- Heavy squats 5x5\n- Romanian deadlifts 4x8\n- Hip thrusts 4x12\n- Walking lunges 3x20\n\nWho else is competing this season? 💪',
    media: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80'
      }
    ],
    type: 'workouts' as const,
    stats: {
      likes: 2103,
      comments: 156,
      shares: 78
    },
    timestamp: '2h ago'
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'Alex Rivera',
      username: 'alexfitpro',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      isVerified: true
    },
    content: 'Quick nutrition tip! 🥗\n\nPre-workout meal timing is crucial for performance. My go-to meal 2 hours before training:\n\n- 1 cup oatmeal\n- 1 banana\n- 1 scoop protein powder\n- 1 tbsp almond butter\n\nWhat\'s your favorite pre-workout meal? Share below! 👇',
    type: 'nutrition' as const,
    stats: {
      likes: 1542,
      comments: 89,
      shares: 34
    },
    timestamp: '4h ago'
  }
];

export default function CompetitionFeed() {
  const [selectedFilter, setSelectedFilter] = useState<ContentFilter>('all');
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const filters = [
    { id: 'all', label: 'All Posts', icon: <Grid className="w-4 h-4" /> },
    { id: 'workouts', label: 'Workouts', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'nutrition', label: 'Nutrition', icon: <Utensils className="w-4 h-4" /> },
    { id: 'photos', label: 'Photos', icon: <Camera className="w-4 h-4" /> }
  ];

  const filteredPosts = mockPosts.filter(post => {
    if (selectedFilter === 'all') return true;
    return post.type === selectedFilter;
  });

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string, comment: string) => {
    console.log('Comment on post:', postId, comment);
  };

  const handleShare = (postId: string) => {
    console.log('Shared post:', postId);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Content Filters */}
      <div className="bg-white sticky top-20 z-10 border-b border-gray-100 mb-6">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 p-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id as ContentFilter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Content */}
      <div className="space-y-6">
        {filteredPosts.map((post, index) => (
          <React.Fragment key={post.id}>
            <FeedPost
              post={post}
              onLike={() => handleLike(post.id)}
              onComment={(comment) => handleComment(post.id, comment)}
              onShare={() => handleShare(post.id)}
            />
            
            {/* Insert ad banner every 5 posts */}
            {(index + 1) % 5 === 0 && (
              <AdBanner
                title="Premium Supplements"
                description="Fuel your competition prep with our premium supplements"
                imageUrl="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                ctaText="Shop Now"
                ctaUrl="#"
              />
            )}

            {/* Show recommended competitors every 10 posts */}
            {(index + 1) % 10 === 0 && (
              <RecommendedCompetitors />
            )}
          </React.Fragment>
        ))}

        {/* Infinite scroll trigger */}
        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
}