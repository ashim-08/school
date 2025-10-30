import React, { useEffect } from 'react';
import { Award, Users, BookOpen, Target, Calendar, MapPin } from 'lucide-react';

const Overview = () => {
  useEffect(() => {
    // Disable right-click globally
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const schoolImages = [
    {
      src: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
      alt: 'School Gate',
      title: 'Main Entrance'
    },
    {
      src: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg',
      alt: 'Modern Classroom',
      title: 'Smart Classrooms'
    },
    {
      src: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
      alt: 'Computer Laboratory',
      title: 'Computer Lab'
    },
    {
      src: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
      alt: 'Science Laboratory',
      title: 'Science Lab'
    },
    {
      src: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg',
      alt: 'School Library',
      title: 'Library'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-5 rounded-full animate-pulse delay-500"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            About Our School
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-fade-in-up delay-300">
            Discover our rich heritage of educational excellence spanning over six decades
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* School Description */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Brahma Rupa Higher Secondary School
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Established in 2018 BS (1958 AD), Shree Brahma Rupa Higher Secondary School stands as a 
                beacon of educational excellence in Pokhara, Nepal. For over six decades, we have been 
                committed to nurturing young minds and shaping future leaders through quality education 
                and holistic development.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Located in the scenic city of Pokhara, our institution offers comprehensive educational 
                programs from Pre-primary to Higher Secondary levels, including specialized streams in 
                Management, Education, and Computer Engineering. We pride ourselves on maintaining the 
                highest academic standards while fostering creativity, critical thinking, and moral values.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our dedicated faculty, modern infrastructure, and student-centered approach create an 
                environment where every student can thrive and reach their full potential. We believe 
                in preparing our students not just for academic success, but for meaningful contributions 
                to society.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
              <img 
                src="https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg"
                alt="Students in classroom"
                className="relative rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Campus Images Gallery */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Campus</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our modern facilities designed to provide the best learning environment
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schoolImages.map((image, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: Award,
              title: 'NEB Affiliated',
              description: 'Officially recognized by National Examination Board',
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: Users,
              title: '700+ Students',
              description: 'Diverse community of learners from various backgrounds',
              color: 'from-green-500 to-green-600'
            },
            {
              icon: BookOpen,
              title: 'Multiple Programs',
              description: 'Comprehensive education from Pre-primary to +2',
              color: 'from-purple-500 to-purple-600'
            },
            {
              icon: Target,
              title: '98% Success Rate',
              description: 'Consistently high academic performance',
              color: 'from-red-500 to-red-600'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To provide quality education that develops well-rounded individuals equipped with 
              knowledge, skills, and values necessary for success in an ever-changing world. 
              We strive to foster critical thinking, creativity, and social responsibility 
              among our students while maintaining the highest academic standards.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To be a leading educational institution that nurtures future leaders and 
              contributing members of society. We envision creating a learning environment 
              that promotes academic excellence, character development, and lifelong learning 
              for all our students in the beautiful setting of Pokhara.
            </p>
          </div>
        </div>

        {/* Location & Contact Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Campus</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Strategically located in Pokhara-32, Rajako Chautara, Kaski district of 
                    Gandaki Province, our school is easily accessible and situated in a peaceful 
                    environment conducive to learning.
                  </p>
                  <div className="mt-4 space-y-2 text-gray-600">
                    <p><strong>Address:</strong> Pokhara-32, Rajako Chautara</p>
                    <p><strong>District:</strong> Kaski, Gandaki Province, Nepal</p>
                    <p><strong>Established:</strong> 2018 BS (1958 AD)</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Academic Calendar</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our academic year follows the Nepali calendar system, with admissions 
                    typically opening during Baisakh (April-May) for the upcoming session.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.8234567890123!2d83.98765432!3d28.21098765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDEyJzM5LjYiTiA4M8KwNTknMTUuNiJF!5e0!3m2!1sen!2snp!4v1234567890123"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="School Location"
                className="rounded-xl"
              ></iframe>
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
      `}</style>
    </div>
  );
};

export default Overview;