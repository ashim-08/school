import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Trophy, Heart, Star, Camera, MessageSquare, TrendingUp, UserCheck, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardHome = ({ stats }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const quickStats = [
    {
      title: 'Total Students',
      value: stats.students,
      icon: Users,
      color: 'bg-blue-500',
      change: '+5%'
    },
    {
      title: 'Total Teachers',
      value: stats.teachers,
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+2%'
    },
    {
      title: 'Success Rate',
      value: `${stats.result}%`,
      icon: Trophy,
      color: 'bg-yellow-500',
      change: '+1%'
    },
    {
      title: 'Satisfaction',
      value: `${stats.satisfaction}%`,
      icon: Heart,
      color: 'bg-red-500',
      change: '+3%'
    }
  ];

  const recentActivities = [
    { action: 'New staff member added', time: '2 hours ago', type: 'staff' },
    { action: 'Review approved', time: '4 hours ago', type: 'review' },
    { action: 'Gallery image uploaded', time: '6 hours ago', type: 'gallery' },
    { action: 'Contact message received', time: '1 day ago', type: 'contact' },
    { action: 'Notice published', time: '2 days ago', type: 'notice' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'staff': return UserCheck;
      case 'review': return Star;
      case 'gallery': return Camera;
      case 'contact': return MessageSquare;
      case 'notice': return Bell;
      default: return TrendingUp;
    }
  };

  const quickActions = [
    {
      label: 'Add Staff',
      icon: UserCheck,
      color: 'text-blue-600',
      path: '/admin/staff',
      roles: ['admin', 'super-admin']
    },
    {
      label: 'Upload Image',
      icon: Camera,
      color: 'text-green-600',
      path: '/admin/gallery',
      roles: ['admin', 'super-admin']
    },
    {
      label: 'Add Notice',
      icon: Bell,
      color: 'text-orange-600',
      path: '/admin/notices',
      roles: ['admin', 'super-admin']
    },
    {
      label: 'Update Stats',
      icon: TrendingUp,
      color: 'text-red-600',
      path: '/admin/stats',
      roles: ['super-admin']
    }
  ].filter(action => action.roles.includes(user?.role || 'admin'));

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome to Brahma Rupa Secondary School Admin Panel</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            user?.role === 'super-admin' ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            {user?.role === 'super-admin' ? (
              <>
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-green-900">Super Admin Access</span>
              </>
            ) : (
              <>
                <UserCheck className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">Admin Access</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Icon className={`h-6 w-6 ${action.color} mx-auto mb-2`} />
                    <p className="text-sm font-medium text-gray-900">{action.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">School Established</p>
            <p className="text-lg font-semibold text-gray-900">2018 BS (1958 AD)</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Academic Session</p>
            <p className="text-lg font-semibold text-gray-900">2081-2082</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">NEB Affiliation</p>
            <p className="text-lg font-semibold text-gray-900">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;