import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Dumbbell, Upload, Heart, Users, ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingStep {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function CompetitorOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form states
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [achievements, setAchievements] = useState('');
  const [socialLinks, setSocialLinks] = useState({ instagram: '', youtube: '', tiktok: '' });

  const steps: OnboardingStep[] = [
    {
      title: "Profile Basics",
      subtitle: "Let's start with your profile picture and bio",
      icon: <Camera className="w-6 h-6" />,
    },
    {
      title: "Fitness Background",
      subtitle: "Share your expertise and achievements",
      icon: <Dumbbell className="w-6 h-6" />,
    },
    {
      title: "Media & Content",
      subtitle: "Add photos and videos of your journey",
      icon: <Upload className="w-6 h-6" />,
    },
    {
      title: "Social & Community",
      subtitle: "Connect your social media accounts",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const specialtyOptions = [
    "Powerlifting", "CrossFit", "Bodybuilding", "Calisthenics",
    "Olympic Weightlifting", "HIIT", "Yoga", "Running"
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative group">
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
                      onChange={(e) => e.target.files && setProfileImage(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Tell us about yourself and your fitness journey..."
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fitness Specialties
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="e.g., 5 years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Achievements
              </label>
              <textarea
                rows={4}
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="List your major fitness achievements..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-purple-600 hover:text-purple-500">
                      Upload photos or videos
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*,video/*"
                    />
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                {coverImage ? (
                  <img 
                    src={URL.createObjectURL(coverImage)} 
                    alt="Cover preview" 
                    className="max-h-48 object-cover rounded"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="cover-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-purple-600 hover:text-purple-500">
                          Upload a cover image
                        </span>
                        <input
                          id="cover-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => e.target.files && setCoverImage(e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index !== steps.length - 1 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index <= currentStep
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep].subtitle}
            </p>
          </div>

          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
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
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}