import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFacilityBySlug } from '../services/api';
import Loading from '../components/common/Loading';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const FacilityDetail = () => {
  const { slug } = useParams();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        setLoading(true);
        const response = await getFacilityBySlug(slug);
        setFacility(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching facility:', error);
        setError('Facility not found');
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error || !facility) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Facility Not Found</h1>
          <p className="text-gray-600 mb-8">The facility you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = facility.image
    ? `${import.meta.env.VITE_API_URL}/uploads/${facility.image}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">{facility.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {imageUrl && (
            <div className="w-full h-96 bg-gray-200">
              <img
                src={imageUrl}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Facility</h2>
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              {facility.description}
            </p>

            {facility.features && facility.features.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {facility.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetail;
