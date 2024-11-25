import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ChevronRight, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface VotingProgress {
  categoryId: string;
  categoryName: string;
  votesUsed: number;
  maxVotes: number;
}

interface VotingFloatingPanelProps {
  votingProgress: VotingProgress[];
  onClose: () => void;
  onNavigateToCategory: (categoryId: string) => void;
}

export default function VotingFloatingPanel({
  votingProgress,
  onClose,
  onNavigateToCategory
}: VotingFloatingPanelProps) {
  const { getThemeColor } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Your Voting Progress</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {votingProgress.map((category) => (
          <div key={category.categoryId}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">{category.categoryName}</span>
              <span className="text-sm font-medium text-gray-900">
                {category.maxVotes - category.votesUsed} votes remaining
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${getThemeColor('bg')}`}
                      style={{ width: `${(category.votesUsed / category.maxVotes) * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToCategory(category.categoryId)}
                  className="ml-4 text-purple-600 hover:text-purple-700"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {votingProgress.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No active voting categories</p>
        </div>
      )}
    </div>
  );
}