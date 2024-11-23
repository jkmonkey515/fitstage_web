import React from 'react';
import { Share2 } from 'lucide-react';

interface ProfileHeaderProps {
  coverImage: string;
}

export default function ProfileHeader({ coverImage }: ProfileHeaderProps) {
  return (
    <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
      <img
        src={coverImage}
        alt="Cover"
        className="w-full h-full object-cover"
      />
      <button className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/20 transition">
        <Share2 className="w-5 h-5" />
        Share Profile
      </button>
    </div>
  );
}