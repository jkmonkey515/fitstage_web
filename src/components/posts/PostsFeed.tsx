import React from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { usePosts } from '@/contexts/PostContext';
import { useAuth } from '@/contexts/AuthContext';

interface CreatePostData {
  type: 'status' | 'media' | 'article';
  content: string;
  media?: File[];
  tags: string[];
}

export default function PostsFeed() {
  const { posts, addPost, likePost, commentOnPost, sharePost } = usePosts();
  const { user } = useAuth();

  const handleNewPost = async (postData: CreatePostData) => {
    if (!user) return;

    // Convert File objects to URLs (in a real app, you'd upload these to a server)
    const mediaUrls = postData.media?.map(file => ({
      type: file.type.startsWith('image/') ? 'image' as const : 'video' as const,
      url: URL.createObjectURL(file)
    }));

    addPost({
      author: {
        name: user.profile.name,
        username: user.profile.username,
        avatar: user.profile.avatar,
        isVerified: user.role === 'competitor'
      },
      content: postData.content,
      media: mediaUrls,
      tags: postData.tags
    });
  };

  return (
    <div className="space-y-6">
      <CreatePost onPost={handleNewPost} />
      
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={() => likePost(post.id)}
          onComment={() => commentOnPost(post.id, '')}
          onShare={() => sharePost(post.id)}
        />
      ))}
    </div>
  );
}