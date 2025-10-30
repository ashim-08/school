import React, { useState, useEffect } from 'react';
import { Calendar, FileText, AlertCircle, Download, Eye } from 'lucide-react';
import { getNotices } from '../services/api';
import Loading from '../components/common/Loading';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [selectedNotice, setSelectedNotice] = useState(null);

  const noticeTypes = [
    { id: 'all', name: 'All Notices' },
    { id: 'general', name: 'General' },
    { id: 'result', name: 'Results' },
    { id: 'admission', name: 'Admission' },
    { id: 'exam', name: 'Examination' },
    { id: 'event', name: 'Events' },
    { id: 'holiday', name: 'Holidays' }
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const type = filterType === 'all' ? null : filterType;
        const response = await getNotices(type);
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [filterType]);

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type) => {
    const colors = {
      general: 'bg-gray-100 text-gray-800',
      result: 'bg-green-100 text-green-800',
      admission: 'bg-blue-100 text-blue-800',
      exam: 'bg-purple-100 text-purple-800',
      event: 'bg-pink-100 text-pink-800',
      holiday: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const handleNoticeClick = (notice) => {
    if (notice.type === 'result') {
      // Redirect to results page for result notices
      window.location.href = '/results';
    } else {
      setSelectedNotice(notice);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notice Board</h1>
          <p className="text-xl text-gray-200">Stay updated with the latest announcements and information</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {noticeTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                filterType === type.id
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-300'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Notices List */}
        {notices.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Notices Found</h3>
            <p className="text-gray-500">Notices will be displayed here once published by the admin.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleNoticeClick(notice)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTypeColor(notice.type)}`}>
                        {notice.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getPriorityColor(notice.priority)}`}>
                        {notice.priority}
                      </span>
                      {notice.type === 'result' && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          Click to view results
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{notice.title}</h2>
                    <p className="text-gray-600 line-clamp-3">{notice.content}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(notice.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    {notice.expiryDate && (
                      <div className="text-xs text-red-500">
                        Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {notice.attachments && notice.attachments.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                    <div className="flex flex-wrap gap-2">
                      {notice.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={`/uploads/${attachment.filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm bg-blue-50 px-3 py-1 rounded"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          {attachment.originalName}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTypeColor(selectedNotice.type)}`}>
                      {selectedNotice.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getPriorityColor(selectedNotice.priority)}`}>
                      {selectedNotice.priority}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedNotice.title}</h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Published: {new Date(selectedNotice.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="prose max-w-none mb-6">
                <div className="text-gray-700 whitespace-pre-wrap">{selectedNotice.content}</div>
              </div>

              {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Attachments:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedNotice.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={`/uploads/${attachment.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Download className="h-5 w-5 mr-3" />
                        <span className="font-medium">{attachment.originalName}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;