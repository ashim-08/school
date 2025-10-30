import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ReviewWidget from './components/common/ReviewWidget';
import ParentsReview from './components/home/ParentsReview';
import ParentsReviewSection from './components/common/ParentsReviewSection';
import ScrollToTop from './components/common/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import Staff from './pages/Staff';
import Notices from './pages/Notices';
import AdminMessages from './pages/AdminMessages';
import AdmissionsNew from './pages/AdmissionsNew';
import GalleryNew from './pages/GalleryNew';
import Reviews from './pages/Reviews';
import FacilityDetail from './pages/FacilityDetail';
import NotFound from './pages/NotFound';
import Overview from './pages/Overview';
import Contact from './pages/Contact';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminRoute from './components/admin/AdminRoute';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/overview" element={<Overview />} />
                      <Route path="/staff" element={<Staff />} />
                      <Route path="/notices" element={<Notices />} />
                      <Route path="/admin-messages" element={<AdminMessages />} />
                      <Route path="/admissions" element={<AdmissionsNew />} />
                      <Route path="/gallery" element={<GalleryNew />} />
                      <Route path="*" element={<NotFound />} />
                      <Route path="/reviews" element={<Reviews />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/facilities/:slug" element={<FacilityDetail />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  <ParentsReview />
                  </main>
                  <ParentsReviewSection />
                  <Footer />
                  <ReviewWidget />
                </>
              }
            />
          </Routes>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </AuthProvider>
  );
}

export default App;