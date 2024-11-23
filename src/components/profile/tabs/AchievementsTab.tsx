import React from 'react';

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

interface AchievementsTabProps {
  achievements: Achievement[];
}

export default function AchievementsTab({ achievements }: AchievementsTabProps) {
  return (
    <div className="space-y-6">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              {achievement.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{achievement.date}</p>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}