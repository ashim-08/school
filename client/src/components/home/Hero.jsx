import React, { useEffect, useState } from 'react';
import { Users, BookOpen, Trophy, Heart } from 'lucide-react';
import { getStats } from '../../services/api';

const Hero = () => {
  const [stats, setStats] = useState({
    students: 700,
    teachers: 60,
    result: 98,
    satisfaction: 95
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg")'
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Shree Brahma Rupa
            <span className="block text-emerald-400">Secondary School</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Nurturing Excellence Since 1958 - Building Tomorrow's Leaders Through Quality Education
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a 
              href="/admissions"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block"
            >
              🎓 Admissions Open - Learn More
            </a>
            <button className="border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Learn More
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
              <div className="text-3xl font-bold">{stats.students}+</div>
              <div className="text-gray-300">Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
              <div className="text-3xl font-bold">{stats.teachers}+</div>
              <div className="text-gray-300">Teachers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
              <div className="text-3xl font-bold">{stats.result}%</div>
              <div className="text-gray-300">Result</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
              <div className="text-3xl font-bold">{stats.satisfaction}%</div>
              <div className="text-gray-300">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;