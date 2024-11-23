import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { PostProvider } from './contexts/PostContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CheckEmail from './pages/CheckEmail';
import VerifyEmail from './pages/VerifyEmail';
import CompetitorOnboarding from './pages/CompetitorOnboarding';
import CompetitorDashboard from './pages/CompetitorDashboard';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Voting from './pages/Voting';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrandingProvider>
          <PostProvider>
            <Routes>
              {/* Public Routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/community" element={<Community />} />
                <Route path="/voting" element={<Voting />} />
                <Route path="/profile/:username" element={<Profile />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/check-email" element={<CheckEmail />} />
              <Route path="/verify-email" element={<VerifyEmail />} />

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

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="top-right" />
          </PostProvider>
        </BrandingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;