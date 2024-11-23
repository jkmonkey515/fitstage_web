import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, User, LogOut, Trophy } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useBranding } from '../contexts/BrandingContext';

export default function Header() {
  const location = useLocation();
  const { getThemeColor } = useTheme();
  const { user, logout } = useAuth();
  const { logo } = useBranding();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? getThemeColor('text') : `text-gray-700 hover:${getThemeColor('text')}`;
  };

  return (
    <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center">
                <img 
                  src="/logo.jpg"
                  alt="FitStage.io" 
                  className="w-auto hidden lg:block"
                />
              {/* {logo ? (
                <img 
                  src={logo} 
                  alt="FitStage.io" 
                  className="h-16 w-auto"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  FitStage.io
                </span>
              )} */}
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex gap-4">
              <Link to="/" className={isActive('/')}>
                Home
              </Link>
              <Link to="/community" className={isActive('/community')}>
                Community
              </Link>
              <Link to="/voting" className={isActive('/voting')}>
                Vote
              </Link>
              <Link to="/competitions" className={isActive('/competitions')}>
                Competitions
              </Link>
              <Link to="/leaderboard" className={isActive('/leaderboard')}>
                Leaderboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSelector />
            {user ? (
              <>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2"
                  >
                    <img
                      src={user.profile.avatar}
                      alt={user.profile.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden md:block font-medium">{user.profile.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      <Link
                        to={`/profile/${user.profile.username}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      {user.role === 'competitor' && (
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Trophy className="w-4 h-4" />
                          Dashboard
                        </Link>
                      )}
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Trophy className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className={`hidden md:block text-gray-700 hover:${getThemeColor('text')}`}>
                  Sign in
                </Link>
                <Link 
                  to="/signup"
                  className={`hidden md:block ${getThemeColor('bg')} text-white px-4 py-2 rounded-lg ${getThemeColor('hover')} transition`}
                >
                  Sign up
                </Link>
                <Link to="/login" className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                  <User className="w-5 h-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden border-t border-gray-100">
        <nav className="flex overflow-x-auto whitespace-nowrap px-4 py-2 gap-6">
          <Link to="/" className={`${isActive('/')} whitespace-nowrap`}>
            Home
          </Link>
          <Link to="/community" className={`${isActive('/community')} whitespace-nowrap`}>
            Community
          </Link>
          <Link to="/voting" className={`${isActive('/voting')} whitespace-nowrap`}>
            Vote
          </Link>
          <Link to="/competitions" className={`${isActive('/competitions')} whitespace-nowrap`}>
            Competitions
          </Link>
          <Link to="/leaderboard" className={`${isActive('/leaderboard')} whitespace-nowrap`}>
            Leaderboard
          </Link>
        </nav>
      </div>
    </header>
  );
}