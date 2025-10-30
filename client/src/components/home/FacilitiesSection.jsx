import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFacilities } from '../../services/api';
import Loading from '../common/Loading';
import {
  Bus, Monitor, Heart, Trophy, BookOpen,
  Beaker, Laptop, FlaskConical
} from 'lucide-react';

const iconMap = {
  'transportation': Bus,
  'computer-lab': Monitor,
  'medicare': Heart,
  'sports-games': Trophy,
  'library': BookOpen,
  'science-lab': Beaker,
  'smart-class': Laptop,
  'physics-chemistry-lab': FlaskConical
};

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await getFacilities();
        setFacilities(response.data);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (facilities.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Facilities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide world-class facilities to ensure our students receive the best education and experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility) => {
            const IconComponent = iconMap[facility.slug] || BookOpen;

            return (
              <Link
                key={facility._id}
                to={`/facilities/${facility.slug}`}
                className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {facility.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {facility.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
