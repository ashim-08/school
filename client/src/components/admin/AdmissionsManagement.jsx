import React, { useState, useEffect } from 'react';
import { GraduationCap, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { getAdminAdmissionContent, updateAdmissionContent } from '../../services/api';
import { toast } from 'react-toastify';

const AdmissionsManagement = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    isOpen: false,
    openMessage: '',
    closedMessage: '',
    requirements: []
  });

  useEffect(() => {
    fetchAdmissionContent();
  }, []);

  const fetchAdmissionContent = async () => {
    try {
      const response = await getAdminAdmissionContent();
      if (response.data) {
        setFormData({
          isOpen: response.data.isOpen || false,
          openMessage: response.data.openMessage || '',
          closedMessage: response.data.closedMessage || 'Admissions are only open during the month of Baisakh (April-May). Please check back during the admission period.',
          requirements: response.data.requirements || []
        });
      }
    } catch (error) {
      console.error('Error fetching admission content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updateAdmissionContent(formData);
      toast.success('Admission settings updated successfully');
      fetchAdmissionContent();
    } catch (error) {
      console.error('Error updating admission content:', error);
      toast.error('Failed to update admission settings');
    } finally {
      setSaving(false);
    }
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const updateRequirement = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({ ...formData, requirements: newRequirements });
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newRequirements });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Admissions Management
          </h2>
          <p className="text-gray-600 mt-1">Control admission status and customize messages</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Admission Status */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admission Status</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isOpen"
                  checked={formData.isOpen === true}
                  onChange={() => setFormData({ ...formData, isOpen: true })}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-900">
                  <CheckCircle className="h-5 w-5 inline text-green-600 mr-1" />
                  Open - Accepting Applications
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isOpen"
                  checked={formData.isOpen === false}
                  onChange={() => setFormData({ ...formData, isOpen: false })}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-900">
                  <AlertCircle className="h-5 w-5 inline text-red-600 mr-1" />
                  Closed - Not Accepting
                </span>
              </label>
            </div>
          </div>

          {/* Open Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admission Open Message
              <span className="text-gray-500 text-xs ml-2">(Shown when admissions are open)</span>
            </label>
            <textarea
              rows={4}
              value={formData.openMessage}
              onChange={(e) => setFormData({ ...formData, openMessage: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the message to display when admissions are open..."
            />
          </div>

          {/* Closed Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admission Closed Message
              <span className="text-gray-500 text-xs ml-2">(Shown when admissions are closed)</span>
            </label>
            <textarea
              rows={4}
              value={formData.closedMessage}
              onChange={(e) => setFormData({ ...formData, closedMessage: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the message to display when admissions are closed..."
            />
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Additional Requirements
                <span className="text-gray-500 text-xs ml-2">(Optional - shown when admissions are open)</span>
              </label>
              <button
                type="button"
                onClick={addRequirement}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                + Add Requirement
              </button>
            </div>

            {formData.requirements.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500">No requirements added yet. Click "Add Requirement" to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Requirement ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2 font-medium"
            >
              <Save className="h-5 w-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        <div className={`rounded-xl p-6 ${formData.isOpen ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center mb-3">
            {formData.isOpen ? (
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            ) : (
              <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
            )}
            <h2 className={`text-2xl font-bold ${formData.isOpen ? 'text-green-900' : 'text-red-900'}`}>
              {formData.isOpen ? 'Admissions Open!' : 'Admissions Closed'}
            </h2>
          </div>
          <p className={`text-lg ${formData.isOpen ? 'text-green-700' : 'text-red-700'}`}>
            {formData.isOpen ? formData.openMessage || 'No message set' : formData.closedMessage || 'No message set'}
          </p>
          {formData.isOpen && formData.requirements.length > 0 && (
            <div className="mt-4 pt-4 border-t border-green-300">
              <h4 className="font-semibold text-green-900 mb-2">Additional Requirements:</h4>
              <ul className="space-y-1">
                {formData.requirements.map((req, index) => (
                  <li key={index} className="text-green-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{req || `Requirement ${index + 1}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionsManagement;
