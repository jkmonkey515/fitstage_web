import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogIn, AlertCircle, User, Shield, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DemoAccount {
  role: string;
  email: string;
  password: string;
  icon: React.ReactNode;
  color: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const demoAccounts: DemoAccount[] = [
    {
      role: 'Competitor',
      email: 'alex@demo.com',
      password: 'competitor123',
      icon: <User className="w-5 h-5" />,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      role: 'Admin',
      email: 'admin@demo.com',
      password: 'admin789',
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      role: 'Spectator',
      email: 'mike@demo.com',
      password: 'spectator123',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  const handleDemoLogin = (demoAccount: DemoAccount) => {
    setEmail(demoAccount.email);
    setPassword(demoAccount.password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Link 
        to="/" 
        className="p-4 text-gray-600 hover:text-gray-900 flex items-center gap-2 w-fit"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
          <div>
            <div className="flex justify-center">
              <img 
                src="/fitstage-logo.png" 
                alt="FitStage.io" 
                className="h-12 w-auto"
              />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 text-center">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Account Quick Login */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Quick Login with Demo Accounts:</h3>
            <div className="grid grid-cols-3 gap-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  onClick={() => handleDemoLogin(account)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg text-white transition-colors ${account.color}`}
                >
                  {account.icon}
                  <span className="text-sm mt-1">{account.role}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <button type="button" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5" />
              </span>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}