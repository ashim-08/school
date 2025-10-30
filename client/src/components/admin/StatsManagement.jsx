import React, { useState } from 'react';
import { Users, BookOpen, Trophy, Heart, Save, Lock } from 'lucide-react';
import { updateStats } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const StatsManagement = ({ stats, setStats }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    students: stats.students,
    teachers: stats.teachers,
    result: stats.result,
    satisfaction: stats.satisfaction
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await updateStats(formData);
      setStats(response.data.stats);
      toast.success('Statistics updated successfully');
    } catch (error) {
      toast.error('Failed to update statistics');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }));
  };

  const statCards = [
    {
      title: 'Total Students',
      field: 'students',
      icon: Users,
      color: 'bg-blue-500',
      description: 'Number of enrolled students'
    },
    {
      title: 'Total Teachers',
      field: 'teachers',
      icon: BookOpen,
      color: 'bg-green-500',
      description: 'Number of teaching staff'
    },
    {
      title: 'Success Rate',
      field: 'result',
      icon: Trophy,
      color: 'bg-yellow-500',
      description: 'Academic success percentage',
      suffix: '%'
    },
    {
      title: 'Satisfaction Rate',
      field: 'satisfaction',
      icon: Heart,
      color: 'bg-red-500',
      description: 'Student/parent satisfaction percentage',
      suffix: '%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Statistics Management</h1>
      </div>

      {/* Current Stats Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.field} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats[stat.field]}{stat.suffix || ''}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Update Form */}
      {user?.role !== 'super-admin' ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center flex-col py-12">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Lock className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Super Admin Access Required</h3>
            <p className="text-gray-600 text-center max-w-md">
              Only users with Super Admin role can update system statistics. Please contact a super admin if you need to make changes.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Update Statistics</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.field} className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Icon className="h-4 w-4 mr-2" />
                    {stat.title}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={stat.suffix ? "100" : undefined}
                    value={formData[stat.field]}
                    onChange={(e) => handleChange(stat.field, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={stat.description}
                  />
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Update Statistics'}
            </button>
          </div>
        </form>
        </div>
      )}

      {/* Usage Guidelines */}
      {user?.role === 'super-admin' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Usage Guidelines</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• <strong>Students:</strong> Total number of currently enrolled students across all levels</li>
            <li>• <strong>Teachers:</strong> Total number of teaching and administrative staff</li>
            <li>• <strong>Success Rate:</strong> Academic success percentage (0-100%)</li>
            <li>• <strong>Satisfaction:</strong> Overall satisfaction rate from students and parents (0-100%)</li>
          </ul>
          <p className="mt-3 text-sm text-blue-700">
            These statistics are displayed on the homepage and should be updated regularly to reflect current data.
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsManagement;