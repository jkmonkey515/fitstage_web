import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { verifyToken } from '../lib/email';
import { useAuth } from '../contexts/AuthContext';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      return;
    }

    const verify = async () => {
      try {
        const decoded = verifyToken(token);
        if (!decoded) {
          setStatus('error');
          return;
        }

        await verifyEmail(decoded.email);
        setStatus('success');
        setTimeout(() => {
          navigate('/onboarding');
        }, 3000);
      } catch (error) {
        setStatus('error');
      }
    };

    verify();
  }, [searchParams, navigate, verifyEmail]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
        {status === 'verifying' && (
          <div className="animate-pulse">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying your email...</h2>
            <p className="text-gray-600">Please wait while we verify your email address.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h2>
            <p className="text-gray-600 mb-4">
              Your email has been successfully verified. You'll be redirected to complete your profile setup.
            </p>
            <div className="animate-pulse text-sm text-gray-500">
              Redirecting in a few seconds...
            </div>
          </div>
        )}

        {status === 'error' && (
          <div>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              The verification link is invalid or has expired. Please try signing up again.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Back to Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}