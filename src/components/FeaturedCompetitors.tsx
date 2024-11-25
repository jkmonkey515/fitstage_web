import React from 'react';
import { Link } from 'react-router-dom';
import CompetitorCard from './CompetitorCard';
import { demoUsers } from '../data/demoUsers';

export default function FeaturedCompetitors() {
  const competitors = demoUsers
    .filter(user => user.role === 'competitor')
    .map(user => ({
      name: user.profile.name,
      username: user.profile.username,
      category: user.profile.specialties?.[0] || 'Athlete',
      imageUrl: user.profile.avatar,
      rank: 1,
      likes: user.profile.stats?.followers || '0',
      comments: 184,
      activeCompetitions: user.profile.activeCompetitions?.map(comp => ({
        id: comp.id,
        name: comp.name,
        category: comp.category,
        rank: comp.rank
      }))
    }));

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
            <CompetitorCard key={competitor.username} {...competitor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/voting"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition inline-flex items-center gap-2"
          >
            Vote for Athletes
          </Link>
        </div>
      </div>
    </section>
  );
}