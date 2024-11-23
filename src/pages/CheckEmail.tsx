import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CheckEmail() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Link 
        to="/" 
        className="p-4 text-gray-600 hover:text-gray-900 flex items-center gap-2 w-fit"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Check your email
          </h1>
          
          <p className="text-gray-600 mb-6">
            We sent a verification link to{' '}
            <span className="font-medium text-gray-900">{user?.email}</span>
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-medium text-gray-900 mb-2">What's next?</h2>
            <ol className="text-sm text-gray-600 text-left space-y-2">
              <li>1. Check your email inbox</li>
              <li>2. Click the verification link in the email</li>
              <li>3. Complete your competitor profile</li>
            </ol>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Didn't receive the email? Check your spam folder or{' '}
            <button className="text-purple-600 hover:text-purple-700">
              click here to resend
            </button>
          </p>

          <Link
            to="/signup"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Use a different email address
          </Link>
        </div>
      </div>
    </div>
  );
}