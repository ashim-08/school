import React, { useState } from 'react';
import { Star, Send, MessageSquare, Award } from 'lucide-react';
import { submitReview } from '../services/api';
import { toast } from 'react-toastify';

const Reviews = () => {
  const [formData, setFormData] = useState({
    name: '',
    relation: 'student',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitReview(formData);
      toast.success('Thank you for your review! It will be published after approval.');
      setFormData({
        name: '',
        relation: 'student',
        rating: 5,
        comment: ''
      });
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderStarInput = () => {
    return (
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className="focus:outline-none transition-all duration-200 hover:scale-110"
          >
            <Star
              className={`h-8 w-8 ${
                star <= formData.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-gray-700 font-medium">
          {formData.rating} {formData.rating === 1 ? 'Star' : 'Stars'}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Share Your Experience</h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Your feedback helps us improve and helps others make informed decisions
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="h-10 w-10 mr-3" />
              <h2 className="text-3xl font-bold">Write a Review</h2>
            </div>
            <p className="text-center text-blue-100">
              Share your thoughts and experiences with our school community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="relation" className="block text-sm font-semibold text-gray-700 mb-3">
                I am a *
              </label>
              <select
                id="relation"
                name="relation"
                required
                value={formData.relation}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
              >
                <option value="student">Current Student</option>
                <option value="parent">Parent</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Rating *
              </label>
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                {renderStarInput()}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-3">
                Your Review *
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={6}
                required
                value={formData.comment}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-lg"
                placeholder="Tell us about your experience with our school. What did you like? What could be improved?"
              />
              <p className="mt-2 text-sm text-gray-500">
                Minimum 20 characters ({formData.comment.length} / 20)
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your review will be reviewed by our admin team before being published on the website.
                We aim to review submissions within 24-48 hours.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting || formData.comment.length < 20}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-5 rounded-xl font-semibold text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              {submitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Submitting...
                </div>
              ) : (
                <>
                  <Send className="h-6 w-6 mr-3" />
                  Submit Review
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Why Your Review Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Help Others</h4>
              <p className="text-sm text-gray-600">
                Your experience helps prospective students and parents make informed decisions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Improve Quality</h4>
              <p className="text-sm text-gray-600">
                Your feedback helps us identify areas for improvement and maintain excellence
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Build Community</h4>
              <p className="text-sm text-gray-600">
                Share your story and connect with others who have similar experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
