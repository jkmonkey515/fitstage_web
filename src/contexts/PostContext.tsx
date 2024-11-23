import React, { createContext, useContext, useState, useEffect } from 'react';
import { createPost, getPosts, initDB } from '../lib/db';
import { useAuth } from './AuthContext';

interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    isVerified: boolean;
  };
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
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'stats' | 'createdAt' | 'timestamp'>) => void;
  likePost: (postId: string) => void;
  commentOnPost: (postId: string, comment: string) => void;
  sharePost: (postId: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

const samplePosts: Omit<Post, 'timestamp'>[] = [
  {
    id: '1',
    content: "Just finished an intense CrossFit session! 💪 New personal best on clean and jerks. Remember: progress is progress, no matter how small. #fitness #crossfit #motivation",
    author: {
      name: "Alex Rivera",
      username: "alexfitpro",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      isVerified: true
    },
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    tags: ['fitness', 'crossfit', 'motivation'],
    stats: {
      likes: 234,
      comments: 45,
      shares: 12
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: '2',
    content: "Morning yoga session with a view 🧘‍♀️ Finding peace in the chaos. Join me for my next live session! #yoga #mindfulness #wellness",
    author: {
      name: "Sarah Chen",
      username: "sarahfit",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      isVerified: true
    },
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    tags: ['yoga', 'mindfulness', 'wellness'],
    stats: {
      likes: 567,
      comments: 89,
      shares: 23
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
  }
];

const formatTimestamp = (date: Date): string => {
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
};

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadPosts = async () => {
      await initDB();
      try {
        const loadedPosts = await getPosts();
        const initialPosts = [...samplePosts, ...loadedPosts].map(post => ({
          ...post,
          timestamp: formatTimestamp(new Date(post.createdAt))
        }));
        setPosts(initialPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        // Fall back to sample posts if database fails
        setPosts(samplePosts.map(post => ({
          ...post,
          timestamp: formatTimestamp(new Date(post.createdAt))
        })));
      }
    };
    loadPosts();
  }, []);

  const addPost = async (newPost: Omit<Post, 'id' | 'stats' | 'createdAt' | 'timestamp'>) => {
    if (!user) return;

    const postId = Date.now().toString();
    const now = new Date();

    const post: Post = {
      ...newPost,
      id: postId,
      stats: {
        likes: 0,
        comments: 0,
        shares: 0
      },
      createdAt: now.toISOString(),
      timestamp: formatTimestamp(now)
    };

    try {
      await createPost({
        id: postId,
        userId: user.id,
        content: post.content,
        mediaUrls: post.media?.map(m => m.url),
        tags: post.tags
      });

      setPosts(prevPosts => [post, ...prevPosts]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const updateTimestamps = () => {
    setPosts(prevPosts =>
      prevPosts.map(post => ({
        ...post,
        timestamp: formatTimestamp(new Date(post.createdAt))
      }))
    );
  };

  useEffect(() => {
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

  return (
    <PostContext.Provider value={{ 
      posts, 
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