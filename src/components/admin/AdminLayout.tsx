import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Settings, Users, Trophy, LayoutDashboard, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '../Header';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export default function AdminLayout() {
  const location = useLocation();
  const { getThemeColor } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      label: 'Platform Settings',
      path: '/admin/settings',
      icon: <Settings className="w-5 h-5" />
    },
    {
      label: 'Competitors',
      path: '/admin/competitors',
      icon: <Users className="w-5 h-5" />
    },
    {
      label: 'Competitions',
      path: '/admin/competitions',
      icon: <Trophy className="w-5 h-5" />
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-purple-600 text-white p-4 rounded-full shadow-lg"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      />

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-20 flex items-center px-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive(item.path)
                  ? `${getThemeColor('bg')} text-white`
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow pt-20 bg-white overflow-y-auto border-r border-gray-100">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive(item.path)
                    ? `${getThemeColor('bg')} text-white`
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-20">
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}