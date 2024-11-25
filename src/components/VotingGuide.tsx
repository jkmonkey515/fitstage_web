import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Trophy, Star, Users, ArrowRight } from 'lucide-react';

export default function VotingGuide() {
  const steps = [
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Browse Athletes",
      description: "Explore profiles of talented competitors across different categories"
    },
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      title: "Choose Favorites",
      description: "Follow and support athletes whose journey inspires you"
    },
    {
      icon: <Vote className="w-8 h-8 text-purple-600" />,
      title: "Cast Your Vote",
      description: "Vote for your favorite athletes in active competitions"
    },
    {
      icon: <Trophy className="w-8 h-8 text-purple-600" />,
      title: "Impact Results",
      description: "Help determine winners and celebrate their success"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Vote</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make your voice heard! Follow these simple steps to support your favorite athletes and influence competition outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/voting"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Start Voting Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}