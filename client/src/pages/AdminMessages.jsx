import React, { useState, useEffect } from 'react';
import { User, Quote, Calendar } from 'lucide-react';
import { getAdminMessages } from '../services/api';
import Loading from '../components/common/Loading';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getAdminMessages();
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching admin messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const getTypeColor = (type) => {
    const colors = {
      principal: 'bg-blue-100 text-blue-800',
      'vice-principal': 'bg-green-100 text-green-800',
      management: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Message from Administration</h1>
          <p className="text-xl text-gray-200">Leadership messages and communications</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <Quote className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Messages Available</h3>
            <p className="text-gray-500">Administrative messages will be displayed here once published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {messages.map((message) => (
              <div
                key={message._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedMessage(message)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTypeColor(message.type)}`}>
                      {message.type.replace('-', ' ')}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(message.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-4">{message.title}</h2>

                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      {message.authorPhoto ? (
                        <img
                          src={`/uploads/${message.authorPhoto}`}
                          alt={message.authorName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <User className="h-8 w-8 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{message.authorName}</h3>
                      <p className="text-gray-600 text-sm">{message.authorPosition}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="h-8 w-8 text-indigo-200 absolute -top-2 -left-2" />
                    <p className="text-gray-700 italic pl-6 line-clamp-4">
                      {message.message}
                    </p>
                  </div>

                  <div className="mt-4 text-right">
                    <span className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTypeColor(selectedMessage.type)}`}>
                    {selectedMessage.type.replace('-', ' ')}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{selectedMessage.title}</h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Published: {new Date(selectedMessage.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden mr-6">
                  {selectedMessage.authorPhoto ? (
                    <img
                      src={`/uploads/${selectedMessage.authorPhoto}`}
                      alt={selectedMessage.authorName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedMessage.authorName}</h3>
                  <p className="text-gray-600">{selectedMessage.authorPosition}</p>
                </div>
              </div>

              <div className="relative bg-gray-50 p-6 rounded-lg">
                <Quote className="h-12 w-12 text-indigo-200 absolute -top-2 -left-2" />
                <div className="pl-8">
                  <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;