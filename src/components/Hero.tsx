import React from 'react';
import { Trophy, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] mix-blend-overlay opacity-20 bg-cover bg-center" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Passion into Victory
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Join the ultimate fitness competition platform where athletes compete, connect, and inspire. Start your journey today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/signup" className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Join Competition
            </Link>
            <Link to="/community" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Explore Community
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
            <Trophy className="w-8 h-8 mb-4 text-yellow-400" />
            <h3 className="text-xl font-semibold mb-2">Elite Competitions</h3>
            <p className="text-gray-300">Compete in various categories and prove your worth against the best.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
            <Users className="w-8 h-8 mb-4 text-blue-400" />
            <h3 className="text-xl font-semibold mb-2">Strong Community</h3>
            <p className="text-gray-300">Connect with like-minded athletes and share your fitness journey.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
            <TrendingUp className="w-8 h-8 mb-4 text-green-400" />
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-300">Monitor your performance and celebrate your achievements.</p>
          </div>
        </div>
      </div>
    </div>
  );
}