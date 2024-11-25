import React, { createContext, useContext, useState } from 'react';

interface Post {
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
  createdAt: string; // ISO string
  timestamp: string; // Formatted string
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'stats' | 'createdAt' | 'timestamp'>) => void;
  likePost: (postId: string) => void;
  commentOnPost: (postId: string, comment: string) => void;
  sharePost: (postId: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return 'Just now';
  }
}

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Chen',
        username: 'sarahfit',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        isVerified: true
      },
      content: '🎯 Just finished my competition prep workout! Feeling stronger than ever. 6 weeks out from the national championships!\n\nMorning routine:\n- Heavy squats 5x5\n- Romanian deadlifts 4x8\n- Hip thrusts 4x12\n- Walking lunges 3x20\n\nWho else is competing this season? 💪',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80'
        }
      ],
      tags: ['CompetitionPrep', 'FitStage', 'WomenInFitness', 'Powerlifting'],
      stats: {
        likes: 2103,
        comments: 156,
        shares: 78
      },
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      timestamp: '1h ago'
    },
    {
      id: '2',
      author: {
        name: 'Alex Rivera',
        username: 'alexfitpro',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        isVerified: true
      },
      content: '🎯 Just hit a new PR in today\'s powerlifting session! 405lbs deadlift feeling lighter than ever. The grind never stops!\n\nBig thanks to my coach @mikefitness for the programming. Next stop: 450lbs! 🎯\n\nShare your recent PRs below! 💪',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80'
        }
      ],
      tags: ['PowerliftingLife', 'FitStage', 'Strength', 'PR'],
      stats: {
        likes: 1542,
        comments: 89,
        shares: 34
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      timestamp: '2h ago'
    },
    {
      id: '3',
      author: {
        name: 'Mike Johnson',
        username: 'mikefitness',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        isVerified: false
      },
      content: 'Incredible coaching session with @alexfitpro today! Watching athletes progress and break through plateaus is why I love what I do. 🙌\n\nKey takeaways from today:\n1. Form over ego\n2. Progressive overload is key\n3. Recovery is as important as training\n\nWho needs help with their training? Drop a comment below! 👇',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80'
        }
      ],
      tags: ['FitnessCoach', 'PersonalTrainer', 'FitStage', 'Motivation'],
      stats: {
        likes: 342,
        comments: 28,
        shares: 12
      },
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      timestamp: '3h ago'
    },
    {
      id: '4',
      author: {
        name: 'Sarah Chen',
        username: 'sarahfit',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        isVerified: true
      },
      content: 'Quick nutrition tip! 🥗\n\nPre-workout meal timing is crucial for performance. My go-to meal 2 hours before training:\n\n- 1 cup oatmeal\n- 1 banana\n- 1 scoop protein powder\n- 1 tbsp almond butter\n\nWhat\'s your favorite pre-workout meal? Share below! 👇',
      tags: ['NutritionTips', 'FitStage', 'HealthyEating', 'Performance'],
      stats: {
        likes: 876,
        comments: 92,
        shares: 45
      },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      timestamp: '5h ago'
    },
    {
      id: '5',
      author: {
        name: 'Alex Rivera',
        username: 'alexfitpro',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        isVerified: true
      },
      content: 'Recovery day essentials 🧘‍♂️\n\nDon\'t skip these:\n- 10 min mobility work\n- 20 min light cardio\n- 15 min stretching\n- 10 min meditation\n\nRemember: Growth happens during recovery! 💪\n\nTag someone who needs this reminder! 🙌',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80'
        }
      ],
      tags: ['Recovery', 'Wellness', 'FitStage', 'MentalHealth'],
      stats: {
        likes: 923,
        comments: 67,
        shares: 38
      },
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      timestamp: '8h ago'
    }
  ]);

  const addPost = (newPost: Omit<Post, 'id' | 'stats' | 'createdAt' | 'timestamp'>) => {
    const now = new Date();
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      stats: {
        likes: 0,
        comments: 0,
        shares: 0
      },
      createdAt: now.toISOString(),
      timestamp: formatTimestamp(now)
    };

    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const updateTimestamps = () => {
    setPosts(prevPosts =>
      prevPosts.map(post => ({
        ...post,
        timestamp: formatTimestamp(new Date(post.createdAt))
      }))
    );
  };

  // Update timestamps every minute
  React.useEffect(() => {
    const interval = setInterval(updateTimestamps, 60000);
    return () => clearInterval(interval);
  }, []);

  const likePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, stats: { ...post.stats, likes: post.stats.likes + 1 } }
          : post
      )
    );
  };

  const commentOnPost = (postId: string, comment: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, stats: { ...post.stats, comments: post.stats.comments + 1 } }
          : post
      )
    );
  };

  const sharePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, stats: { ...post.stats, shares: post.stats.shares + 1 } }
          : post
      )
    );
  };

  // Sort posts by creation date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <PostContext.Provider value={{ 
      posts: sortedPosts, 
      addPost, 
      likePost, 
      commentOnPost, 
      sharePost 
    }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}