import React, { useState } from 'react';
import { Plus, Calendar, Users, Trophy, DollarSign, Clock, Edit2, Trash2, Info } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import CompetitionEditModal from '@/components/admin/CompetitionEditModal';
import DeleteConfirmationModal from '@/components/admin/DeleteConfirmationModal';

interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  categories: string[];
  totalPrize: number;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'live' | 'ended';
}

export default function CompetitionManager() {
  const { getThemeColor } = useTheme();
  const [competitions, setCompetitions] = useState<Competition[]>([
    {
      id: '1',
      title: 'Summer Shred Championship 2024',
      description: 'The ultimate summer fitness competition featuring multiple categories and substantial prizes.',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      categories: ["Men's Bodybuilding", "Women's Bikini", "Men's Physique"],
      totalPrize: 100000,
      participants: 245,
      maxParticipants: 500,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Spring Classic 2024',
      description: 'Annual spring competition showcasing the best in bodybuilding and fitness.',
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      categories: ["Men's Bodybuilding", "Classic Physique"],
      totalPrize: 75000,
      participants: 180,
      maxParticipants: 300,
      status: 'live'
    }
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const handleEdit = (competition: Competition) => {
    setSelectedCompetition(competition);
    setEditModalOpen(true);
  };

  const handleDelete = (competition: Competition) => {
    setSelectedCompetition(competition);
    setDeleteModalOpen(true);
  };

  const handleSave = (updatedCompetition: Competition) => {
    if (selectedCompetition) {
      // Update existing competition
      setCompetitions(competitions.map(comp =>
        comp.id === selectedCompetition.id ? updatedCompetition : comp
      ));
    } else {
      // Add new competition
      setCompetitions([...competitions, { ...updatedCompetition, id: Date.now().toString() }]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedCompetition) {
      setCompetitions(competitions.filter(comp => comp.id !== selectedCompetition.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Competition Manager</h1>
          <p className="text-gray-600">Create and manage fitness competitions</p>
        </div>
        <button
          onClick={() => {
            setSelectedCompetition(null);
            setEditModalOpen(true);
          }}
          className={`${getThemeColor('bg')} text-white px-4 py-2 rounded-lg flex items-center gap-2 ${getThemeColor('hover')}`}
        >
          <Plus className="w-5 h-5" />
          New Competition
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 bg-blue-50 text-blue-700 p-4 rounded-lg">
            <Info className="w-5 h-5" />
            <p className="text-sm">
              Each competition can include multiple categories. The total prize pool is distributed among category winners.
            </p>
          </div>

          <div className="space-y-6">
            {competitions.map((competition) => (
              <div
                key={competition.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-purple-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {competition.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(competition.status)}`}>
                        {competition.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{competition.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(competition)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit2 className="w-5 h-5 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(competition)}
                      className="p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium text-gray-900">
                        {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Categories</p>
                      <p className="font-medium text-gray-900">
                        {competition.categories.length} divisions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Total Prize</p>
                      <p className="font-medium text-gray-900">
                        ${competition.totalPrize.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Participants</p>
                      <p className="font-medium text-gray-900">
                        {competition.participants}/{competition.maxParticipants}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {competition.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CompetitionEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        competition={selectedCompetition}
        onSave={handleSave}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Competition"
        message="Are you sure you want to delete this competition? This action cannot be undone."
      />
    </div>
  );
}