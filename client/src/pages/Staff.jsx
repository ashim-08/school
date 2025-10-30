import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Award } from 'lucide-react';
import { getStaff } from '../services/api';
import Loading from '../components/common/Loading';

const Staff = () => {
  const [staffData, setStaffData] = useState({ staff: [], hierarchy: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getStaff();
        setStaffData(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const renderStaffSection = (title, members, bgColor = 'bg-white') => {
    if (!members || members.length === 0) return null;

    return (
      <div className={`${bgColor} rounded-lg shadow-lg p-6 mb-8`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center border-b pb-4">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <div key={member._id} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-300">
              <div className="mb-4">
                {member.photo ? (
                  <img
                    src={`/uploads/${member.photo}`}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto bg-gray-300 flex items-center justify-center border-4 border-blue-200">
                    <User className="h-12 w-12 text-gray-600" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
              <div className="flex items-center justify-center mb-2">
                <Award className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-blue-600 font-medium text-sm">{member.position}</span>
              </div>
              {(member.subject || member.responsibility) && (
                <p className="text-gray-700 text-sm mb-3 font-medium">
                  {member.subject || member.responsibility}
                </p>
              )}
              {member.qualification && (
                <p className="text-gray-600 text-xs mb-2">{member.qualification}</p>
              )}
              <div className="flex justify-center space-x-3 text-xs">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-blue-800">
                    <Mail className="h-4 w-4" />
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="text-green-600 hover:text-green-800">
                    <Phone className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Staff</h1>
          <p className="text-xl text-gray-200">Meet our dedicated team of educators and professionals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Head Teacher */}
        {renderStaffSection('Head Teacher', staffData.hierarchy['Head Teacher'], 'bg-gradient-to-r from-blue-50 to-indigo-50')}
        
        {/* Vice Principal */}
        {renderStaffSection('Vice Principal', staffData.hierarchy['Vice Principal'], 'bg-gradient-to-r from-green-50 to-emerald-50')}
        
        {/* +2 Faculty */}
        {renderStaffSection('+2 Faculty Members', staffData.hierarchy['+2 Faculty'], 'bg-gradient-to-r from-purple-50 to-pink-50')}
        
        {/* School Level Teachers */}
        {renderStaffSection('School Level Teachers', staffData.hierarchy['School Level'], 'bg-gradient-to-r from-yellow-50 to-orange-50')}
        
        {/* Non-Teaching Staff */}
        {renderStaffSection('Non-Teaching Staff', staffData.hierarchy['Non-Teaching Staff'], 'bg-gradient-to-r from-gray-50 to-slate-50')}

        {staffData.staff.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Staff Members Found</h3>
            <p className="text-gray-500">Staff information will be displayed here once added by the admin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;