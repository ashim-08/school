import React from 'react';
import { CheckCircle, Users, Award, Globe } from 'lucide-react';

const Introduction = () => {
  const highlights = [
    'NEB Affiliated Secondary School',
    '65+ Years of Educational Excellence',
    'Pre-Diploma Computer Engineering Program',
    'Modern Infrastructure & Facilities',
    'Experienced Teaching Faculty',
    'Holistic Student Development'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Welcome to Brahma Rupa Secondary School
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Established in 2018 BS (1958 AD), Shree Brahma Rupa Secondary School has been a 
              cornerstone of quality education in Pokhara for over six decades. Located in the 
              beautiful city of Pokhara, we are committed to providing excellent education from 
              ECD to +2 levels.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our school is affiliated with the National Examination Board (NEB) and offers 
              comprehensive programs including Management, Education, and Pre-Diploma Computer 
              Engineering. We pride ourselves on our holistic approach to education, focusing 
              on academic excellence, character development, and preparing students for future success.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
              alt="School Building"
              className="rounded-lg shadow-lg"
            />
            
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">700+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-emerald-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">65+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <Globe className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To provide quality education that develops well-rounded individuals equipped with 
              knowledge, skills, and values necessary for success in an ever-changing world. 
              We strive to foster critical thinking, creativity, and social responsibility 
              among our students.
            </p>
          </div>
          
          <div className="bg-emerald-50 p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-emerald-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be a leading educational institution that nurtures future leaders and 
              contributing members of society. We envision creating a learning environment 
              that promotes academic excellence, character development, and lifelong learning 
              for all our students.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;