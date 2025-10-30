import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Building, 
  Camera, 
  Star, 
  Phone,
  GraduationCap,
  Award
} from 'lucide-react';

const QuickLinks = () => {
  const links = [
    {
      title: 'About School',
      description: 'Learn about our history and mission',
      icon: BookOpen,
      path: '/overview',
      color: 'bg-blue-500'
    },
    {
      title: 'Administration',
      description: 'Messages from school leadership',
      icon: Users,
      path: '/admin-messages',
      color: 'bg-green-500'
    },
    {
      title: 'Notices',
      description: 'Latest announcements and updates',
      icon: Award,
      path: '/notices',
      color: 'bg-purple-500'
    },
    {
      title: 'Staff',
      description: 'Meet our dedicated teaching faculty',
      icon: Users,
      path: '/staff',
      color: 'bg-indigo-500'
    },
    {
      title: 'Gallery',
      description: 'View our school life moments',
      icon: Camera,
      path: '/gallery',
      color: 'bg-pink-500'
    },
    {
      title: 'Admissions',
      description: 'Join our school community',
      icon: GraduationCap,
      path: '/admissions',
      color: 'bg-yellow-500'
    },
    {
      title: 'Contact',
      description: 'Get in touch with us',
      icon: Phone,
      path: '/contact',
      color: 'bg-red-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quick Navigation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover everything about Brahma Rupa Secondary School through our comprehensive sections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                to={link.path}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6"
              >
                <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {link.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;