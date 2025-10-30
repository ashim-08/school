import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { getReviews } from '../../services/api';

const ParentsReview = () => {
  const [parentReviews, setParentReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParentReviews();
  }, []);

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
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (parentReviews.length === 0) {
    return null;
  }

  const currentReview = parentReviews[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Parents Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from parents who trust us with their children's education
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <Quote className="absolute top-6 left-6 h-16 w-16 text-blue-100 opacity-50" />

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                {renderStars(currentReview.rating)}
              </div>

              <p className="text-xl md:text-2xl text-gray-700 italic text-center mb-8 leading-relaxed">
                "{currentReview.comment}"
              </p>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  {currentReview.photo ? (
                    <img
                      src={`/uploads/${currentReview.photo}`}
                      alt={currentReview.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-4 border-blue-100"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-blue-100">
                      <span className="text-2xl font-bold text-white">
                        {currentReview.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <h4 className="font-semibold text-lg text-gray-900">
                    {currentReview.name}
                  </h4>
                  <p className="text-sm text-gray-600">Parent</p>
                </div>
              </div>
            </div>
          </div>

          {parentReviews.length > 1 && (
            <>
              <button
                onClick={prevReview}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>

              <button
                onClick={nextReview}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next review"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>

              <div className="flex justify-center mt-8 space-x-2">
                {parentReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'w-8 bg-blue-600'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ParentsReview;
