import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import PlacementTest from './pages/PlacementTest';
import Dashboard from './pages/Dashboard';
import CoursePlayer from './pages/CoursePlayer';
import ProgressTracking from './pages/ProgressTracking';
import Forum from './pages/Forum';
import Pricing from './pages/Pricing';
import AdminDashboard from './pages/AdminDashboard';
import StudentProgress from './pages/StudentProgress';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Certificates from './pages/Certificates';
import Settings from './pages/Settings';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/placement-test" element={
                <ProtectedRoute>
                  <PlacementTest />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/course/:id" element={
                <ProtectedRoute>
                  <CoursePlayer />
                </ProtectedRoute>
              } />
              <Route path="/progress" element={<ProgressTracking />} />
              <Route path="/forum" element={
                <ProtectedRoute>
                  <Forum />
                </ProtectedRoute>
              } />
              <Route path="/certificates" element={
                <ProtectedRoute>
                  <Certificates />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/pricing" element={
                <ProtectedRoute>
                  <Pricing />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/student/:id" element={
                <ProtectedRoute>
                  <StudentProgress />
                </ProtectedRoute>
              } />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
