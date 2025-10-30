import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative">
          <h1 className="text-9xl font-bold text-blue-600 animate-bounce">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>

        <div className="mt-8 space-y-4 animate-fade-in">
          <h2 className="text-3xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Go Home
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-12 animate-float">
          <svg
            className="w-64 h-64 mx-auto opacity-30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
              fill="currentColor"
              className="text-blue-400"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
