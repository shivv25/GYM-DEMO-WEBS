import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Context
import { AuthProvider } from './context/AuthContext';

// Lazy load admin pages for code splitting
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const GymSettings = lazy(() => import('./pages/admin/GymSettings'));
const ProgramsManager = lazy(() => import('./pages/admin/ProgramsManager'));
const TrainersManager = lazy(() => import('./pages/admin/TrainersManager'));
const MembershipsManager = lazy(() => import('./pages/admin/MembershipsManager'));
const TestimonialsManager = lazy(() => import('./pages/admin/TestimonialsManager'));
const GalleryManager = lazy(() => import('./pages/admin/GalleryManager'));
const FAQManager = lazy(() => import('./pages/admin/FAQManager'));
const TrialLeads = lazy(() => import('./pages/admin/TrialLeads'));
const Messages = lazy(() => import('./pages/admin/Messages'));

const AdminFallback = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
      <p className="text-muted text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #2a2a2a',
          },
          success: {
            iconTheme: { primary: 'var(--color-accent)', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={
          <Suspense fallback={<AdminFallback />}>
            <AdminLogin />
          </Suspense>
        } />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <Suspense fallback={<AdminFallback />}>
            <AdminLayout />
          </Suspense>
        }>
          <Route index element={<Suspense fallback={<AdminFallback />}><Dashboard /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<AdminFallback />}><GymSettings /></Suspense>} />
          <Route path="programs" element={<Suspense fallback={<AdminFallback />}><ProgramsManager /></Suspense>} />
          <Route path="trainers" element={<Suspense fallback={<AdminFallback />}><TrainersManager /></Suspense>} />
          <Route path="memberships" element={<Suspense fallback={<AdminFallback />}><MembershipsManager /></Suspense>} />
          <Route path="testimonials" element={<Suspense fallback={<AdminFallback />}><TestimonialsManager /></Suspense>} />
          <Route path="gallery" element={<Suspense fallback={<AdminFallback />}><GalleryManager /></Suspense>} />
          <Route path="faq" element={<Suspense fallback={<AdminFallback />}><FAQManager /></Suspense>} />
          <Route path="leads" element={<Suspense fallback={<AdminFallback />}><TrialLeads /></Suspense>} />
          <Route path="messages" element={<Suspense fallback={<AdminFallback />}><Messages /></Suspense>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
