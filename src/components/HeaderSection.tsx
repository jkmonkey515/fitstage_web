import React from 'react';

interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function HeaderSection({ title, subtitle, className = '' }: HeaderSectionProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}