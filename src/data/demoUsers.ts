import { Trophy, Award, Medal, Star } from 'lucide-react';

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  role: 'competitor' | 'admin' | 'spectator';
  profile: {
    name: string;
    username: string;
    avatar: string;
    bio?: string;
    location?: string;
    joinDate: string;
    stats?: {
      followers: string;
      following: string;
      posts: string;
    };
    achievements?: Array<{
      id: string;
      title: string;
      date: string;
      description: string;
      icon: any;
    }>;
    specialties?: string[];
    socialLinks?: {
      instagram?: string;
      youtube?: string;
      tiktok?: string;
    };
  };
}

export const demoUsers: DemoUser[] = [
  {
    id: '1',
    email: 'alex@demo.com',
    password: 'competitor123',
    role: 'competitor',
    profile: {
      name: 'Alex Rivera',
      username: 'alexfitpro',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'Professional athlete specializing in CrossFit and functional fitness. 3x Regional Champion.',
      location: 'Los Angeles, CA',
      joinDate: 'March 2023',
      stats: {
        followers: '1.2M',
        following: '824',
        posts: '2.1K'
      },
      achievements: [
        {
          id: '1',
          title: '1st Place - West Coast Championship',
          date: 'June 2023',
          description: 'Won the overall category in the prestigious West Coast Fitness Championship.',
          icon: Trophy
        },
        {
          id: '2',
          title: 'Elite Competitor Status',
          date: 'March 2023',
          description: 'Achieved Elite status after winning multiple regional competitions.',
          icon: Award
        }
      ],
      specialties: ['CrossFit', 'Olympic Weightlifting', 'HIIT'],
      socialLinks: {
        instagram: 'alexfitpro',
        youtube: 'AlexRiveraFitness',
        tiktok: 'alexfitpro'
      }
    }
  },
  {
    id: '2',
    email: 'sarah@demo.com',
    password: 'competitor456',
    role: 'competitor',
    profile: {
      name: 'Sarah Chen',
      username: 'sarahfit',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'Fitness enthusiast and powerlifting specialist. Passionate about strength training.',
      location: 'New York, NY',
      joinDate: 'January 2023',
      stats: {
        followers: '856K',
        following: '435',
        posts: '1.8K'
      },
      achievements: [
        {
          id: '1',
          title: 'National Powerlifting Record',
          date: 'May 2023',
          description: 'Set new national record in 63kg weight class.',
          icon: Medal
        }
      ],
      specialties: ['Powerlifting', 'Strength Training', 'Nutrition'],
      socialLinks: {
        instagram: 'sarahfitness',
        youtube: 'SarahChenFit'
      }
    }
  },
  {
    id: '3',
    email: 'admin@demo.com',
    password: 'admin789',
    role: 'admin',
    profile: {
      name: 'Admin User',
      username: 'admin',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      joinDate: 'January 2023'
    }
  },
  {
    id: '4',
    email: 'mike@demo.com',
    password: 'spectator123',
    role: 'spectator',
    profile: {
      name: 'Mike Johnson',
      username: 'mikefitness',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'Fitness enthusiast and community supporter',
      location: 'Chicago, IL',
      joinDate: 'April 2023',
      stats: {
        followers: '2.5K',
        following: '1.2K',
        posts: '156'
      }
    }
  }
];