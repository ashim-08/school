import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Shield, User, Lock, Key, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getAdmins, createAdmin, updateCredentials, deleteAdmin, toggleAdminStatus } from '../../services/api';

const SettingsManagement = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('credentials');
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
    newAdmin: false
  });

  const [credentialsForm, setCredentialsForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [newAdminForm, setNewAdminForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'admin'
  });

  useEffect(() => {
    if (activeTab === 'accounts') {
      fetchAdmins();
    }
  }, [activeTab]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await getAdmins();
      setAdmins(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load admin accounts' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();

    if (credentialsForm.newPassword && credentialsForm.newPassword !== credentialsForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (!credentialsForm.currentPassword) {
      setMessage({ type: 'error', text: 'Current password is required' });
      return;
    }

    if (!credentialsForm.newUsername && !credentialsForm.newPassword) {
      setMessage({ type: 'error', text: 'Please provide new username or new password' });
      return;
    }

    try {
      setLoading(true);
      await updateCredentials({
        currentPassword: credentialsForm.currentPassword,
        newUsername: credentialsForm.newUsername || undefined,
        newPassword: credentialsForm.newPassword || undefined
      });

      setMessage({ type: 'success', text: 'Credentials updated successfully. Please login again.' });
      setCredentialsForm({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: ''
      });

      setTimeout(() => {
        window.location.href = '/admin/login';
      }, 2000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update credentials' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    if (newAdminForm.password !== newAdminForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    try {
      setLoading(true);
      await createAdmin({
        username: newAdminForm.username,
        password: newAdminForm.password,
        role: newAdminForm.role
      });

      setMessage({ type: 'success', text: 'Admin account created successfully' });
      setNewAdminForm({
        username: '',
        password: '',
        confirmPassword: '',
        role: 'admin'
      });
      fetchAdmins();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to create admin account' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin account?')) {
      return;
    }

    try {
      setLoading(true);
      await deleteAdmin(id);
      setMessage({ type: 'success', text: 'Admin account deleted successfully' });
      fetchAdmins();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete admin account' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      setLoading(true);
      await toggleAdminStatus(id);
      setMessage({ type: 'success', text: 'Admin status updated successfully' });
      fetchAdmins();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update admin status' });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600 mt-1">Manage your account and admin access</p>
        </div>

        {message.text && (
          <div className={`mx-6 mt-6 p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'credentials'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Key className="h-4 w-4 inline mr-2" />
            My Credentials
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'accounts'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="h-4 w-4 inline mr-2" />
            Admin Accounts
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'credentials' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Your Credentials</h3>
              <form onSubmit={handleUpdateCredentials} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword.current ? 'text' : 'password'}
                      value={credentialsForm.currentPassword}
                      onChange={(e) => setCredentialsForm({ ...credentialsForm, currentPassword: e.target.value })}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Username (leave blank to keep current)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={credentialsForm.newUsername}
                      onChange={(e) => setCredentialsForm({ ...credentialsForm, newUsername: e.target.value })}
                      className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={user?.username}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password (leave blank to keep current)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      value={credentialsForm.newPassword}
                      onChange={(e) => setCredentialsForm({ ...credentialsForm, newPassword: e.target.value })}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {credentialsForm.newPassword && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        value={credentialsForm.confirmPassword}
                        onChange={(e) => setCredentialsForm({ ...credentialsForm, confirmPassword: e.target.value })}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? 'Updating...' : 'Update Credentials'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div>
              {user?.role === 'super-admin' && (
                <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create New Admin Account
                  </h3>
                  <form onSubmit={handleCreateAdmin} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username *
                        </label>
                        <input
                          type="text"
                          value={newAdminForm.username}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, username: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role *
                        </label>
                        <select
                          value={newAdminForm.role}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="admin">Admin (Limited Access)</option>
                          <option value="super-admin">Super Admin (Full Control)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.newAdmin ? 'text' : 'password'}
                            value={newAdminForm.password}
                            onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            minLength={6}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('newAdmin')}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword.newAdmin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password *
                        </label>
                        <input
                          type="password"
                          value={newAdminForm.confirmPassword}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, confirmPassword: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                    >
                      {loading ? 'Creating...' : 'Create Admin Account'}
                    </button>
                  </form>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Accounts</h3>
                {loading && admins.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">Loading...</div>
                ) : admins.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">No admin accounts found</div>
                ) : (
                  <div className="grid gap-4">
                    {admins.map((admin) => (
                      <div
                        key={admin._id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                            admin.role === 'super-admin' ? 'bg-green-600' : 'bg-blue-600'
                          }`}>
                            {admin.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900">{admin.username}</p>
                              {admin._id === user?.id && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">You</span>
                              )}
                              {!admin.isActive && (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Inactive</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {admin.role === 'super-admin' ? (
                                <Shield className="h-4 w-4 text-green-600" />
                              ) : (
                                <User className="h-4 w-4 text-blue-600" />
                              )}
                              <p className="text-sm text-gray-600 capitalize">{admin.role === 'super-admin' ? 'Super Admin' : 'Admin'}</p>
                            </div>
                          </div>
                        </div>

                        {user?.role === 'super-admin' && admin._id !== user?.id && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleStatus(admin._id)}
                              disabled={loading}
                              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                admin.isActive
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                            >
                              {admin.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleDeleteAdmin(admin._id)}
                              disabled={loading}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Role Information
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Super Admin Account:</strong> Full control including creating/deleting admin accounts and managing all system settings.</p>
          <p><strong>Admin Account:</strong> Limited access to manage content, staff, notices, reviews, and view contacts. Cannot manage other admin accounts.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
