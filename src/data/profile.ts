import React from 'react';
import { Trophy, Award } from 'lucide-react';

interface Post {
  id: string;
  type: 'image' | 'video';
  thumbnail: string;
  likes: number;
  comments: number;
}

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: JSX.Element;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 1234,
    comments: 89
  },
  {
    id: '2',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 2341,
    comments: 156
  },
  {
    id: '3',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 1876,
    comments: 94
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: '1st Place - West Coast Championship',
    date: 'June 2023',
    description: 'Won the overall category in the prestigious West Coast Fitness Championship.',
    icon: React.createElement(Trophy, { size: 24, className: 'text-yellow-500' })
  },
  {
    id: '2',
    title: 'Elite Competitor Status',
    date: 'March 2023',
    description: 'Achieved Elite status after winning multiple regional competitions.',
    icon: React.createElement(Award, { size: 24, className: 'text-purple-500' })
  }
];