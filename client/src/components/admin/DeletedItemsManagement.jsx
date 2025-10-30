import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, AlertCircle, MessageSquare, Bell } from 'lucide-react';
import { getAllAdminMessages, recoverAdminMessage, permanentDeleteAdminMessage, getAdminNotices, recoverNotice, permanentDeleteNotice } from '../../services/api';
import { toast } from 'react-toastify';

const DeletedItemsManagement = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [deletedMessages, setDeletedMessages] = useState([]);
  const [deletedNotices, setDeletedNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeletedItems();
  }, [activeTab]);

  const fetchDeletedItems = async () => {
    try {
      setLoading(true);
      if (activeTab === 'messages') {
        const response = await getAllAdminMessages();
        setDeletedMessages(response.data.filter(m => !m.isActive));
      } else {
        const response = await getAdminNotices();
        setDeletedNotices(response.data.filter(n => !n.isActive));
      }
    } catch (error) {
      console.error('Error fetching deleted items:', error);
      toast.error('Failed to load deleted items');
    } finally {
      setLoading(false);
    }
  };

  const handleRecover = async (id, type) => {
    try {
      if (type === 'message') {
        await recoverAdminMessage(id);
        toast.success('Message recovered successfully');
      } else {
        await recoverNotice(id);
        toast.success('Notice recovered successfully');
      }
      fetchDeletedItems();
    } catch (error) {
      toast.error('Failed to recover item');
    }
  };

  const handlePermanentDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to permanently delete this item? This action cannot be undone.')) {
      return;
    }

    try {
      if (type === 'message') {
        await permanentDeleteAdminMessage(id);
        toast.success('Message permanently deleted');
      } else {
        await permanentDeleteNotice(id);
        toast.success('Notice permanently deleted');
      }
      fetchDeletedItems();
    } catch (error) {
      toast.error('Failed to permanently delete item');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trash2 className="h-6 w-6" />
            Deleted Items
          </h2>
          <p className="text-gray-600 mt-1">Recover or permanently delete items</p>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'messages'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="h-4 w-4 inline mr-2" />
            Admin Messages ({deletedMessages.length})
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'notices'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell className="h-4 w-4 inline mr-2" />
            Notices ({deletedNotices.length})
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12 text-gray-600">Loading...</div>
          ) : activeTab === 'messages' ? (
            deletedMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Deleted Messages</h3>
                <p className="text-gray-500">Deleted admin messages will appear here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deletedMessages.map((message) => (
                  <div key={message._id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        Deleted
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRecover(message._id, 'message')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Recover"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(message._id, 'message')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Permanently Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{message.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>{message.authorName}</strong> - {message.authorPosition}
                    </p>
                    <p className="text-gray-700 line-clamp-3">{message.message}</p>
                    <div className="mt-4 text-xs text-gray-500">
                      Deleted: {new Date(message.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            deletedNotices.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Deleted Notices</h3>
                <p className="text-gray-500">Deleted notices will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {deletedNotices.map((notice) => (
                  <div key={notice._id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Deleted
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800 capitalize">
                            {notice.type}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{notice.title}</h2>
                        <p className="text-gray-600 line-clamp-3">{notice.content}</p>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        <button
                          onClick={() => handleRecover(notice._id, 'notice')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Recover"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(notice._id, 'notice')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Permanently Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Deleted: {new Date(notice.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Important Information
        </h3>
        <div className="space-y-2 text-sm text-yellow-800">
          <p><strong>Recover:</strong> Restores the item to its original state and makes it visible again.</p>
          <p><strong>Permanent Delete:</strong> Removes the item completely from the database. This action cannot be undone!</p>
        </div>
      </div>
    </div>
  );
};

export default DeletedItemsManagement;
