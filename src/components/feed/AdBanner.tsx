import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AdBannerProps {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
}

export default function AdBanner({ title, description, imageUrl, ctaText, ctaUrl }: AdBannerProps) {
  const { getThemeColor } = useTheme();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="text-xs font-medium uppercase tracking-wider mb-2 inline-block">
              Sponsored
            </span>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-200 text-sm mb-4">{description}</p>
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${getThemeColor('bg')} px-4 py-2 rounded-lg text-sm font-medium ${getThemeColor('hover')}`}
            >
              {ctaText}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}