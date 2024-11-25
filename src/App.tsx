import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { PostProvider } from './contexts/PostContext';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RegisterCompetitor from './pages/RegisterCompetitor';
import RegisterPromoter from './pages/RegisterPromoter';
import CompetitorOnboarding from './pages/CompetitorOnboarding';
import CompetitorDashboard from './pages/CompetitorDashboard';
import Community from './pages/Community';
import Profile from './pages/Profile';
import AthleteProfile from './pages/AthleteProfile';
import Voting from './pages/Voting';
import AdminDashboard from './pages/admin/AdminDashboard';
import CompetitorManagement from './pages/admin/CompetitorManagement';
import PlatformSettings from './pages/admin/PlatformSettings';
import SEOSettings from './pages/admin/SEOSettings';
import CompetitionManager from './pages/admin/CompetitionManager';
import Competitions from './pages/Competitions';
import CompetitionDetails from './pages/CompetitionDetails';
import Leaderboard from './pages/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrandingProvider>
          <PostProvider>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/community" element={<Community />} />
                <Route path="/voting" element={<Voting />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/competitions/:id" element={<CompetitionDetails />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/athlete/:username" element={<AthleteProfile />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/register/competitor" element={<RegisterCompetitor />} />
              <Route path="/register/promoter" element={<RegisterPromoter />} />

              {/* Protected Competitor Routes */}
              <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['competitor']}>
                      <CompetitorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute allowedRoles={['competitor']}>
                      <CompetitorOnboarding />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="competitors" element={<CompetitorManagement />} />
                <Route path="settings" element={<PlatformSettings />} />
                <Route path="seo" element={<SEOSettings />} />
                <Route path="competitions" element={<CompetitionManager />} />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PostProvider>
        </BrandingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;