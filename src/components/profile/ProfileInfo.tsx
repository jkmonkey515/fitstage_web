import React from 'react';
import { MapPin, Calendar, Link as LinkIcon, Instagram, Youtube, Plus } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfileInfoProps {
  username: string | undefined;
  avatar: string;
  name: string;
  location: string;
  joinDate: string;
  stats: {
    followers: string;
    following: string;
    posts: string;
  };
}

export default function ProfileInfo({
  username,
  avatar,
  name,
  location,
  joinDate,
  stats
}: ProfileInfoProps) {
  const { getThemeColor } = useTheme();

  return (
    <div className="relative bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative -mt-20 md:-mt-24">
          <img
            src={avatar}
            alt={name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white"
          />
          <button className={`absolute bottom-0 right-0 ${getThemeColor('bg')} text-white p-2 rounded-full hover:${getThemeColor('hover')} transition`}>
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <p className="text-gray-500">@{username}</p>
            </div>
            <div className="flex gap-3">
              <button className={`${getThemeColor('bg')} text-white px-6 py-2 rounded-lg hover:${getThemeColor('hover')} transition`}>
                Follow
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition">
                Message
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              {location}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              {joinDate}
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-600 hover:text-[#E1306C]">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#FF0000]">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <LinkIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-6 flex gap-8">
            <div>
              <span className="text-2xl font-bold text-gray-900">{stats.followers}</span>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">{stats.following}</span>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">{stats.posts}</span>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}