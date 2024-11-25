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
    heroImage?: string;
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
    activeCompetitions?: Array<{
      id: string;
      name: string;
      category: string;
      startDate: string;
      endDate: string;
      rank?: number;
    }>;
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
      heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
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
      activeCompetitions: [
        {
          id: '1',
          name: 'Summer Shred Championship',
          category: "Men's Bodybuilding",
          startDate: '2024-05-31',
          endDate: '2024-06-30',
          rank: 1
        }
      ],
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
      heroImage: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
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
      activeCompetitions: [
        {
          id: '2',
          name: 'Spring Classic',
          category: "Women's Bikini",
          startDate: '2024-03-15',
          endDate: '2024-04-15',
          rank: 2
        }
      ],
      socialLinks: {
        instagram: 'sarahfitness',
        youtube: 'SarahChenFit'
      }
    }
  },
  {
    id: '3',
    email: 'mike@demo.com',
    password: 'competitor789',
    role: 'competitor',
    profile: {
      name: 'Mike Johnson',
      username: 'mikefitness',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      heroImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
      bio: 'CrossFit athlete and coach. Helping others achieve their fitness goals.',
      location: 'Miami, FL',
      joinDate: 'February 2023',
      stats: {
        followers: '567K',
        following: '312',
        posts: '987'
      },
      achievements: [
        {
          id: '1',
          title: 'CrossFit Games Qualifier',
          date: 'April 2023',
          description: 'Qualified for the CrossFit Games Regional Competition.',
          icon: Star
        }
      ],
      specialties: ['CrossFit', 'Functional Training', 'Coaching'],
      activeCompetitions: [
        {
          id: '3',
          name: 'CrossFit Elite Series',
          category: 'CrossFit',
          startDate: '2024-07-15',
          endDate: '2024-08-15',
          rank: 3
        }
      ],
      socialLinks: {
        instagram: 'mikefitness',
        youtube: 'MikeJohnsonFit',
        tiktok: 'mikefitness'
      }
    }
  }
];