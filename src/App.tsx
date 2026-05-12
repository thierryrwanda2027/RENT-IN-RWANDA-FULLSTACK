import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Navbar } from './shared/components/Navbar';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { NotFound } from './shared/components/NotFound';
import { ListingsPage } from './features/listings';
import { LoginPage } from './features/auth';
import './App.css';

// Lazy loaded pages
const DashboardPage = React.lazy(() => import('./features/auth').then(m => ({ default: m.DashboardPage })));
const ListingDetail = React.lazy(() => import('./features/listings/pages/ListingDetail').then(m => ({ default: m.ListingDetail })));
const BookingPage = React.lazy(() => import('./features/bookings/pages/BookingPage').then(m => ({ default: m.BookingPage })));
const BookingsList = React.lazy(() => import('./features/bookings/pages/BookingsList').then(m => ({ default: m.BookingsList })));

// Host features
const HostDashboard = React.lazy(() => import('./features/host').then(m => ({ default: m.HostDashboard })));
const CreateListingPage = React.lazy(() => import('./features/host').then(m => ({ default: m.CreateListingPage })));
const EditListingPage = React.lazy(() => import('./features/host').then(m => ({ default: m.EditListingPage })));

// Admin features
const AdminDashboard = React.lazy(() => import('./features/admin').then(m => ({ default: m.AdminDashboard })));
const ModerationQueue = React.lazy(() => import('./features/admin').then(m => ({ default: m.ModerationQueue })));

function App() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 100);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="app-container">
      <Navbar />
      <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Guest Flow */}
          <Route path="/book/:id" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><BookingsList /></ProtectedRoute>} />

          {/* Host Flow */}
          <Route path="/host" element={<ProtectedRoute><HostDashboard /></ProtectedRoute>} />
          <Route path="/host/create" element={<ProtectedRoute><CreateListingPage /></ProtectedRoute>} />
          <Route path="/host/edit/:id" element={<ProtectedRoute><EditListingPage /></ProtectedRoute>} />

          {/* Admin Flow */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/moderation" element={<ProtectedRoute><ModerationQueue /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

