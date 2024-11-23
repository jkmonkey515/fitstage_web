import React from 'react';
import { Heart, MessageCircle, PlaySquare } from 'lucide-react';

interface Post {
  id: string;
  type: 'image' | 'video';
  thumbnail: string;
  likes: number;
  comments: number;
}

interface PostsTabProps {
  posts: Post[];
}

export default function PostsTab({ posts }: PostsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="relative group">
          <img 
            src={post.thumbnail} 
            alt="" 
            className="w-full aspect-square object-cover rounded-lg"
          />
          {post.type === 'video' && (
            <PlaySquare className="absolute top-4 right-4 w-6 h-6 text-white" />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <div className="flex gap-4 text-white">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}