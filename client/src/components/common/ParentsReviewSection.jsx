import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { getReviews } from '../../services/api';

const ParentsReviewSection = () => {
  const [parentReviews, setParentReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchParentReviews = async () => {
      try {
        const response = await getReviews();
        const parents = response.data.filter(review => review.relation === 'parent');
        setParentReviews(parents);
      } catch (error) {
        console.error('Error fetching parent reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParentReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === parentReviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? parentReviews.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center justify-center">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 ${
              index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (parentReviews.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 via-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Parents Reviews
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what parents have to say about their children's educational journey at our school
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-teal-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {parentReviews.length === 1 ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <Quote className="h-12 w-12 text-green-200 mb-6 mx-auto" />

              <div className="mb-6">
                {renderStars(parentReviews[0].rating)}
              </div>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center italic">
                "{parentReviews[0].comment}"
              </p>

              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  {parentReviews[0].photo ? (
                    <img
                      src={`/uploads/${parentReviews[0].photo}`}
                      alt={parentReviews[0].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-green-600" />
                  )}
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-gray-900">{parentReviews[0].name}</h4>
                  <span className="text-sm text-gray-600">Parent</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
                <Quote className="h-12 w-12 text-green-200 mb-6 mx-auto" />

                <div className="mb-6">
                  {renderStars(parentReviews[currentIndex].rating)}
                </div>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center italic min-h-[120px]">
                  "{parentReviews[currentIndex].comment}"
                </p>

                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    {parentReviews[currentIndex].photo ? (
                      <img
                        src={`/uploads/${parentReviews[currentIndex].photo}`}
                        alt={parentReviews[currentIndex].name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-gray-900">{parentReviews[currentIndex].name}</h4>
                    <span className="text-sm text-gray-600">Parent</span>
                  </div>
                </div>
              </div>

              <button
                onClick={prevReview}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-gray-50 text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextReview}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-gray-50 text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Next review"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="flex justify-center mt-8 space-x-2">
                {parentReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-gradient-to-r from-green-600 to-teal-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentsReviewSection;
