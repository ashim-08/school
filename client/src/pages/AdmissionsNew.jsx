import React, { useState, useEffect } from 'react';
import { Calendar, FileText, CheckCircle, Phone, Mail, MapPin, Clock, AlertCircle, GraduationCap } from 'lucide-react';
import { getAdmissionContent } from '../services/api';
import Loading from '../components/common/Loading';

const AdmissionsNew = () => {
  const [admissionContent, setAdmissionContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState([]);

  const academicPrograms = [
    {
      title: '+2 Management',
      level: 'Higher Secondary',
      duration: '2 Years',
      description: 'Comprehensive business and management education preparing students for leadership roles.',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Nepali', 'Mathematics'],
      eligibility: 'Completion of SEE (Grade 10) with minimum C+ grade',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: '+2 Education',
      level: 'Higher Secondary',
      duration: '2 Years',
      description: 'Teacher training program focusing on educational theory and practical teaching skills.',
      subjects: ['Education', 'Psychology', 'Sociology', 'English', 'Nepali', 'Health & Physical Education'],
      eligibility: 'Completion of SEE (Grade 10) with minimum C+ grade',
      color: 'from-green-500 to-green-600'
    },
    {
      title: '+2 Computer Engineering',
      level: 'Pre-Diploma',
      duration: '2 Years',
      description: 'Foundation program in computer engineering and technology.',
      subjects: ['Computer Science', 'Mathematics', 'Physics', 'English', 'Nepali', 'Chemistry'],
      eligibility: 'Completion of SEE (Grade 10) with minimum C+ grade in Science and Mathematics',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Pre-primary',
      level: 'Early Childhood',
      duration: '1-2 Years',
      description: 'Foundation learning program for young children aged 3-5 years.',
      subjects: ['Play-based Learning', 'Basic Literacy', 'Numeracy', 'Creative Arts', 'Social Skills'],
      eligibility: 'Age 3-5 years',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Basic Level',
      level: 'Primary & Lower Secondary',
      duration: '8 Years (Grades 1-8)',
      description: 'Comprehensive basic education following national curriculum.',
      subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health & Physical Education'],
      eligibility: 'Age-appropriate admission',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Secondary Level',
      level: 'Secondary Education',
      duration: '2 Years (Grades 9-10)',
      description: 'Secondary education preparing students for SEE examination.',
      subjects: ['Compulsory English', 'Compulsory Nepali', 'Compulsory Mathematics', 'Science', 'Social Studies', 'Health & Physical Education'],
      eligibility: 'Completion of Grade 8',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  useEffect(() => {
    // Disable right-click globally
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await getAdmissionContent();
        setAdmissionContent(response.data);
        setIsOpen(response.data?.isOpen || false);
        setStatusMessage(response.data?.isOpen ?
          (response.data?.openMessage || 'We are currently accepting applications for the new academic session. Apply now to secure your seat!') :
          (response.data?.closedMessage || 'Admissions are only open during the month of Baisakh (April-May). Please check back during the admission period.')
        );
        setAdditionalRequirements(response.data?.requirements || []);
      } catch (error) {
        console.error('Error fetching admission content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">Admissions</h1>
          <p className="text-xl md:text-2xl text-emerald-100 animate-fade-in-up delay-300">
            Join our community of learners and achievers
          </p>
          {isOpen && (
            <div className="mt-8 animate-fade-in-up delay-500">
              <span className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg animate-pulse inline-flex items-center">
                <GraduationCap className="h-6 w-6 mr-2" />
                Admissions Open Now!
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Admission Status */}
        <div className={`rounded-2xl p-8 mb-12 ${isOpen ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' : 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200'}`}>
          <div className="flex items-center justify-center">
            {isOpen ? (
              <CheckCircle className="h-12 w-12 text-green-600 mr-6" />
            ) : (
              <AlertCircle className="h-12 w-12 text-red-600 mr-6" />
            )}
            <div className="text-center">
              <h2 className={`text-3xl font-bold mb-4 ${isOpen ? 'text-green-900' : 'text-red-900'}`}>
                {isOpen ? 'Admissions Open!' : 'Admissions Closed'}
              </h2>
              <p className={`text-lg ${isOpen ? 'text-green-700' : 'text-red-700'}`}>
                {statusMessage}
              </p>
              {isOpen && additionalRequirements.length > 0 && (
                <div className="mt-6 pt-6 border-t border-green-300 text-left max-w-2xl mx-auto">
                  <h3 className="font-semibold text-green-900 mb-3 text-lg">Additional Requirements:</h3>
                  <ul className="space-y-2">
                    {additionalRequirements.map((req, index) => (
                      <li key={index} className="text-green-700 flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Academic Programs */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Academic Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive education programs designed to nurture students at every stage of their academic journey
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {academicPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${program.color}`}>
                      {program.level}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">{program.duration}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.subjects.slice(0, 4).map((subject, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {subject}
                        </span>
                      ))}
                      {program.subjects.length > 4 && (
                        <span className="text-gray-500 text-sm">+{program.subjects.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                    <p className="text-gray-600 text-sm">{program.eligibility}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Process */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: 1, title: 'Application', description: 'Fill out the admission form', icon: FileText },
              { step: 2, title: 'Documents', description: 'Submit required documents', icon: FileText },
              { step: 3, title: 'Entrance Test', description: 'Appear for entrance examination', icon: FileText },
              { step: 4, title: 'Interview', description: 'Attend interview session', icon: FileText },
              { step: 5, title: 'Admission', description: 'Complete fee payment', icon: CheckCircle }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 text-emerald-600 mr-3" />
              Important Dates
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg">
                <span className="font-medium text-gray-900">Application Period</span>
                <span className="text-emerald-600 font-bold">Baisakh 1-30 (April-May)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-900">Entrance Examination</span>
                <span className="text-blue-600 font-bold">First week of Jestha</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <span className="font-medium text-gray-900">Results & Interview</span>
                <span className="text-purple-600 font-bold">Second week of Jestha</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-900">Final Admission</span>
                <span className="text-green-600 font-bold">Third week of Jestha</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 text-emerald-600 mr-3" />
              Required Documents
            </h3>
            <ul className="space-y-3">
              {[
                'Completed admission application form',
                'Previous academic transcripts/certificates',
                'Character certificate from previous school',
                'Birth certificate or citizenship certificate',
                '4 passport-size photographs',
                'Medical certificate (if required)',
                'Transfer certificate (for students from other schools)'
              ].map((doc, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact for Admission */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Need Help with Admission?</h2>
            <p className="text-emerald-100 text-lg">
              Our admission team is here to help you through the process. Contact us for any queries or assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Phone</h3>
              <div className="space-y-1 text-emerald-100">
                <p>061-410055</p>
                <p>061-410057</p>
                <p>9846041215</p>
              </div>
            </div>
            
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-emerald-100">brahmarupahss13@gmail.com</p>
            </div>
            
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <MapPin className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Address</h3>
              <p className="text-emerald-100">Pokhara-32, Rajako Chautara</p>
            </div>
            
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <Clock className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Office Hours</h3>
              <div className="text-emerald-100 text-sm">
                <p>Sun-Fri: 6AM-4PM</p>
                <p>Sat: 6AM-12PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default AdmissionsNew;