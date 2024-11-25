import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Dumbbell, Trophy, Users, Settings } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

interface OnboardingStepsProps {
  currentStep: number;
}

export default function OnboardingSteps({ currentStep }: OnboardingStepsProps) {
  const steps: OnboardingStep[] = [
    {
      title: 'Profile Setup',
      description: 'Add your photo and basic info',
      icon: <Camera className="w-6 h-6" />,
      completed: currentStep > 0
    },
    {
      title: 'Competition Details',
      description: 'Select your categories and specialties',
      icon: <Trophy className="w-6 h-6" />,
      completed: currentStep > 1
    },
    {
      title: 'Experience',
      description: 'Share your fitness journey',
      icon: <Dumbbell className="w-6 h-6" />,
      completed: currentStep > 2
    },
    {
      title: 'Social Connections',
      description: 'Connect your social media',
      icon: <Users className="w-6 h-6" />,
      completed: currentStep > 3
    },
    {
      title: 'Preferences',
      description: 'Customize your experience',
      icon: <Settings className="w-6 h-6" />,
      completed: currentStep > 4
    }
  ];

  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className={`flex flex-col items-center ${
            index === currentStep ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: index === currentStep ? 1 : 0.8 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
              step.completed
                ? 'bg-green-100 text-green-600'
                : index === currentStep
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {step.icon}
          </motion.div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">{step.title}</div>
            <div className="text-xs text-gray-500">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}