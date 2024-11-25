import React from 'react';

interface CharacterCounterProps {
  current: number;
  limit: number;
  className?: string;
}

export default function CharacterCounter({ current, limit, className = '' }: CharacterCounterProps) {
  const percentage = (current / limit) * 100;
  const getColor = () => {
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 90) return 'text-yellow-500';
    return 'text-gray-400';
  };

  return (
    <span className={`text-xs ${getColor()} ${className}`}>
      {current}/{limit}
    </span>
  );
}