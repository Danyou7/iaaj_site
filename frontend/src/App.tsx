import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { ScrollToTop } from './components/common/ScrollToTop';
// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { AlumniDirectory } from './pages/AlumniDirectory';
import { Jobs } from './pages/Jobs';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Contact } from './pages/Contact';

// Admin Pages
import { Login } from './pages/admin/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAlumni } from './pages/admin/AdminAlumni';
import { AdminJobs } from './pages/admin/AdminJobs';
import { AdminNews } from './pages/admin/AdminNews';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminAbout } from './pages/admin/AdminAbout';

import './App.css';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  const isLoginPage = location.pathname === '/admin/login';

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <ScrollToTop />
      {!isLoginPage && <Navbar isAdmin={isAdminRoute} />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tentang-kami" element={<About />} />
          <Route path="/alumni" element={<AlumniDirectory />} />
          <Route path="/loker" element={<Jobs />} />
          <Route path="/berita" element={<News />} />
          <Route path="/berita/:id" element={<NewsDetail />} />
          <Route path="/hubungi-kami" element={<Contact />} />

          {/* Admin Auth Route */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/alumni" element={<ProtectedRoute><AdminAlumni /></ProtectedRoute>} />
          <Route path="/admin/loker" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin/berita" element={<ProtectedRoute><AdminNews /></ProtectedRoute>} />
          <Route path="/admin/tentang" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
          <Route path="/admin/pesan" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
