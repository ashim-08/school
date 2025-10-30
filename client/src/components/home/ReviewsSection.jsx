import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { getReviews } from '../../services/api';
import { Link } from 'react-router-dom';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
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

  const getRelationBadge = (relation) => {
    const badges = {
      student: { text: 'Student', color: 'bg-blue-100 text-blue-800' },
      parent: { text: 'Parent', color: 'bg-green-100 text-green-800' },
      alumni: { text: 'Alumni', color: 'bg-purple-100 text-purple-800' }
    };
    return badges[relation] || badges.student;
  };

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mb-4">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from students, parents, and alumni about their experiences at our school
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {reviews.length === 1 ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              <Quote className="absolute top-8 left-8 h-16 w-16 text-blue-100 transform -rotate-12" />
              <Quote className="absolute bottom-8 right-8 h-16 w-16 text-teal-100 transform rotate-12" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  {renderStars(reviews[0].rating)}
                </div>

                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 text-center italic">
                  "{reviews[0].comment}"
                </p>

                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {reviews[0].name}
                  </h4>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium capitalize ${getRelationBadge(reviews[0].relation).color}`}>
                    {getRelationBadge(reviews[0].relation).text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              <Quote className="absolute top-8 left-8 h-16 w-16 text-blue-100 transform -rotate-12" />
              <Quote className="absolute bottom-8 right-8 h-16 w-16 text-teal-100 transform rotate-12" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  {renderStars(reviews[currentIndex].rating)}
                </div>

                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 text-center italic min-h-[120px]">
                  "{reviews[currentIndex].comment}"
                </p>

                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {reviews[currentIndex].name}
                  </h4>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium capitalize ${getRelationBadge(reviews[currentIndex].relation).color}`}>
                    {getRelationBadge(reviews[currentIndex].relation).text}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-gray-50 text-gray-800 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
            </button>

            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-gray-50 text-gray-800 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next review"
            >
              <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
            </button>

            <div className="flex justify-center mt-8 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-blue-600 to-teal-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/reviews"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Share Your Experience
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
