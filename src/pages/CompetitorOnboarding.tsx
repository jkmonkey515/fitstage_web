import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Dumbbell, Upload, Heart, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import OnboardingSteps from '@/components/onboarding/OnboardingSteps';

export default function CompetitorOnboarding() {
  const navigate = useNavigate();
  const { getThemeColor } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form states
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [achievements, setAchievements] = useState('');
  const [socialLinks, setSocialLinks] = useState({ instagram: '', youtube: '', tiktok: '' });

  const stepTitles = [
    'Welcome to FitStage',
    'Competition Categories',
    'Your Experience',
    'Social Media',
    'Final Steps'
  ];

  const stepSubtitles = [
    'Let\'s get your profile set up',
    'Choose your competition categories',
    'Share your fitness journey',
    'Connect your social media accounts',
    'Almost there! Set your preferences'
  ];

  const specialtyOptions = [
    "Powerlifting", "CrossFit", "Bodybuilding", "Calisthenics",
    "Olympic Weightlifting", "HIIT", "Yoga", "Running"
  ];

  const handleNext = () => {
    if (currentStep < stepTitles.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle completion
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setProfileImage(files[0]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img 
                      src={URL.createObjectURL(profileImage)} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700">
                  <Upload className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleMediaUpload}
                  />
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-500">Upload your profile photo</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Tell us about yourself and your fitness journey..."
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Specialties
              </label>
              <div className="grid grid-cols-2 gap-2">
                {specialtyOptions.map((specialty) => (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() => {
                      setSpecialties(prev => 
                        prev.includes(specialty)
                          ? prev.filter(s => s !== specialty)
                          : [...prev, specialty]
                      );
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      specialties.includes(specialty)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., 5 years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Achievements
              </label>
              <textarea
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List your major fitness achievements..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">@</span>
                </div>
                <input
                  type="text"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-8 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Channel
              </label>
              <input
                type="text"
                value={socialLinks.youtube}
                onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                className="focus:ring-purple-500 focus:border-purple-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Channel URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                TikTok Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">@</span>
                </div>
                <input
                  type="text"
                  value={socialLinks.tiktok}
                  onChange={(e) => setSocialLinks({ ...socialLinks, tiktok: e.target.value })}
                  className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-8 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="username"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Almost Done!</h3>
              <p className="text-gray-600">
                Review your profile information and make any final adjustments before completing the setup.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Profile Summary</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Specialties: {specialties.join(', ')}</li>
                <li>Experience: {experience}</li>
                <li>Social Media: {Object.values(socialLinks).filter(Boolean).length} connected</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={stepTitles.length}
      title={stepTitles[currentStep]}
      subtitle={stepSubtitles[currentStep]}
    >
      <OnboardingSteps currentStep={currentStep} />

      <div className="mb-8">
        {renderStep()}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className={`flex items-center px-6 py-3 rounded-lg text-gray-700 ${
            currentStep === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
        >
          {currentStep === stepTitles.length - 1 ? 'Complete' : 'Next'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </OnboardingLayout>
  );
}