import React from 'react';
import CompetitorCard from './CompetitorCard';

interface Competitor {
  name: string;
  category: string;
  imageUrl: string;
  rank: number;
  likes: string;
  comments: number;
}

export default function FeaturedCompetitors() {
  const competitors: Competitor[] = [
    {
      name: "Sarah Chen",
      category: "CrossFit Elite",
      imageUrl: "https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
      rank: 1,
      likes: "2.4k",
      comments: 184
    },
    {
      name: "Marcus Rodriguez",
      category: "Powerlifting Pro",
      imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
      rank: 2,
      likes: "1.8k",
      comments: 156
    },
    {
      name: "Emma Thompson",
      category: "Calisthenics Master",
      imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
      rank: 3,
      likes: "2.1k",
      comments: 167
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Athletes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our top-performing competitors who are pushing the boundaries and inspiring the community with their dedication and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitors.map((competitor) => (
            <CompetitorCard key={competitor.name} {...competitor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
            View All Athletes
          </button>
        </div>
      </div>
    </section>
  );
}