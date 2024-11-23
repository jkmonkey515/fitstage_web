import React from 'react';

interface AboutTabProps {
  bio: string;
  specialties: string[];
}

export default function AboutTab({ bio, specialties }: AboutTabProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
        <p className="text-gray-600">{bio}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <span 
              key={specialty}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}