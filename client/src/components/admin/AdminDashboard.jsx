import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, Star, BarChart3, Camera, MessageSquare, Settings, Menu, X, LogOut, Bell, FileText, UserCheck, GraduationCap, Building2, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getStats } from '../../services/api';

// Import admin components
import DashboardHome from './DashboardHome';
import ReviewsManagement from './ReviewsManagement';
import ParentsReviewManagement from './ParentsReviewManagement';
import StatsManagement from './StatsManagement';
import GalleryManagement from './GalleryManagement';
import ContactsManagement from './ContactsManagement';
import StaffManagement from './StaffManagement';
import NoticesManagement from './NoticesManagement';
import AdminMessagesManagement from './AdminMessagesManagement';
import AdmissionsManagement from './AdmissionsManagement';
import FacilitiesManagement from './FacilitiesManagement';
import SettingsManagement from './SettingsManagement';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ students: 0, teachers: 0, result: 0, satisfaction: 0 });
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const menuSections = {
    main: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, roles: ['admin', 'super-admin'] }
    ],
    content: [
      { name: 'Admin Messages', path: '/admin/admin-messages', icon: FileText, roles: ['admin', 'super-admin'] },
      { name: 'Notices', path: '/admin/notices', icon: Bell, roles: ['admin', 'super-admin'] },
      { name: 'Gallery', path: '/admin/gallery', icon: Camera, roles: ['admin', 'super-admin'] }
    ],
    people: [
      { name: 'Staff', path: '/admin/staff', icon: UserCheck, roles: ['admin', 'super-admin'] },
      { name: 'Reviews', path: '/admin/reviews', icon: Star, roles: ['admin', 'super-admin'] },
      { name: 'Parents Review', path: '/admin/parents-review', icon: Star, roles: ['admin', 'super-admin'] }
    ],
    admissions: [
      { name: 'Admissions', path: '/admin/admissions', icon: GraduationCap, roles: ['admin', 'super-admin'] },
      { name: 'Facilities', path: '/admin/facilities', icon: Building2, roles: ['admin', 'super-admin'] }
    ],
    system: [
      { name: 'Statistics', path: '/admin/stats', icon: BarChart3, roles: ['super-admin'] },
      { name: 'Contacts', path: '/admin/contacts', icon: MessageSquare, roles: ['admin', 'super-admin'] },
      { name: 'Settings', path: '/admin/settings', icon: Settings, roles: ['admin', 'super-admin'] }
    ]
  };

  const getAccessibleMenuItems = () => {
    const userRole = user?.role || 'admin';
    const items = [];

    Object.entries(menuSections).forEach(([section, sectionItems]) => {
      const accessibleItems = sectionItems.filter(item => item.roles.includes(userRole));
      if (accessibleItems.length > 0) {
        items.push({ section, items: accessibleItems });
      }
    });

    return items;
  };

  const accessibleMenuItems = getAccessibleMenuItems();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {accessibleMenuItems.map(({ section, items }) => (
            <div key={section} className="mb-6">
              <div className="px-6 mb-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section === 'main' ? 'Main' :
                   section === 'content' ? 'Content Management' :
                   section === 'people' ? 'People & Reviews' :
                   section === 'admissions' ? 'Admissions & Facilities' :
                   'System'}
                </h3>
              </div>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t">
          <div className="flex items-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
              user?.role === 'super-admin' ? 'bg-green-600' : 'bg-blue-600'
            }`}>
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <div className="flex items-center gap-1">
                {user?.role === 'super-admin' && <Shield className="h-3 w-3 text-green-600" />}
                <p className={`text-xs font-medium capitalize ${
                  user?.role === 'super-admin' ? 'text-green-700' : 'text-blue-700'
                }`}>{user?.role === 'super-admin' ? 'Super Admin' : 'Admin'}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Welcome back, <span className="font-medium text-gray-900">{user?.username}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardHome stats={stats} />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/reviews" element={<ReviewsManagement />} />
            <Route path="/parents-review" element={<ParentsReviewManagement />} />
            <Route path="/notices" element={<NoticesManagement />} />
            <Route path="/admissions" element={<AdmissionsManagement />} />
            <Route path="/admin-messages" element={<AdminMessagesManagement />} />
            <Route path="/facilities" element={<FacilitiesManagement />} />
            <Route path="/stats" element={<StatsManagement stats={stats} setStats={setStats} />} />
            <Route path="/gallery" element={<GalleryManagement />} />
            <Route path="/contacts" element={<ContactsManagement />} />
            <Route path="/settings" element={<SettingsManagement />} />
          </Routes>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;