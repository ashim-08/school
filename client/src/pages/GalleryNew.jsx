import React, { useState, useEffect } from 'react';
import { Camera, Filter, X, Download, ZoomIn } from 'lucide-react';
import { getGallery } from '../services/api';
import Loading from '../components/common/Loading';

const GalleryNew = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const categories = [
    { id: '', name: 'All Photos', color: 'from-blue-500 to-blue-600' },
    { id: 'academic', name: 'Academic', color: 'from-green-500 to-green-600' },
    { id: 'sports', name: 'Sports', color: 'from-red-500 to-red-600' },
    { id: 'cultural', name: 'Cultural', color: 'from-purple-500 to-purple-600' },
    { id: 'infrastructure', name: 'Infrastructure', color: 'from-gray-500 to-gray-600' },
    { id: 'events', name: 'Events', color: 'from-yellow-500 to-yellow-600' },
    { id: 'other', name: 'Other', color: 'from-pink-500 to-pink-600' }
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getGallery(selectedCategory);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [selectedCategory]);

  // Disable right-click globally except for gallery images
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (!e.target.classList.contains('gallery-image')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setImageLoading(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setImageLoading(false);
  };

  const handleImageRightClick = (e, image) => {
    e.preventDefault();
    
    // Create custom context menu
    const contextMenu = document.createElement('div');
    contextMenu.className = 'fixed bg-white border border-gray-300 rounded-xl shadow-2xl z-50 py-2 min-w-48';
    contextMenu.style.left = `${Math.min(e.pageX, window.innerWidth - 200)}px`;
    contextMenu.style.top = `${Math.min(e.pageY, window.innerHeight - 100)}px`;
    
    const downloadOption = document.createElement('div');
    downloadOption.className = 'px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center transition-colors duration-200';
    downloadOption.innerHTML = `
      <svg class="h-5 w-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <span class="text-gray-700 font-medium">Download Image</span>
    `;
    
    downloadOption.onclick = () => {
      const link = document.createElement('a');
      link.href = `/uploads/${image.image}`;
      link.download = `${image.title || 'image'}.jpg`;
      link.click();
      document.body.removeChild(contextMenu);
    };
    
    contextMenu.appendChild(downloadOption);
    document.body.appendChild(contextMenu);
    
    // Remove context menu when clicking elsewhere
    const removeMenu = (e) => {
      if (!contextMenu.contains(e.target)) {
        if (document.body.contains(contextMenu)) {
          document.body.removeChild(contextMenu);
        }
        document.removeEventListener('click', removeMenu);
      }
    };
    
    setTimeout(() => {
      document.addEventListener('click', removeMenu);
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (selectedImage) {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = images.findIndex(img => img._id === selectedImage._id);
        if (currentIndex > 0) {
          setSelectedImage(images[currentIndex - 1]);
          setImageLoading(true);
        }
      } else if (e.key === 'ArrowRight') {
        const currentIndex = images.findIndex(img => img._id === selectedImage._id);
        if (currentIndex < images.length - 1) {
          setSelectedImage(images[currentIndex + 1]);
          setImageLoading(true);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, images]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-pink-900 via-pink-800 to-pink-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">School Gallery</h1>
          <p className="text-xl md:text-2xl text-pink-100 animate-fade-in-up delay-300">
            Capturing moments of learning, growth, and achievement
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center mr-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Filter by:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="text-center py-16">
            <Camera className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-4">No Images Found</h3>
            <p className="text-gray-500 text-lg">Gallery images will be displayed here once uploaded by the admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={image._id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
                  <img
                    src={`/uploads/${image.image}`}
                    alt={image.title}
                    className="gallery-image w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    onContextMenu={(e) => handleImageRightClick(e, image)}
                    onError={(e) => {
                      console.error('Gallery image failed to load:', image.image);
                      e.target.src = 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-pink-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full capitalize font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold mb-1 text-lg">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
            >
              <X className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            {/* Download Button */}
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = `/uploads/${selectedImage.image}`;
                link.download = `${selectedImage.title || 'image'}.jpg`;
                link.click();
              }}
              className="absolute top-6 left-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
              title="Download Image"
            >
              <Download className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const currentIndex = images.findIndex(img => img._id === selectedImage._id);
                    if (currentIndex > 0) {
                      setSelectedImage(images[currentIndex - 1]);
                      setImageLoading(true);
                    }
                  }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                  disabled={images.findIndex(img => img._id === selectedImage._id) === 0}
                >
                  <svg className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => {
                    const currentIndex = images.findIndex(img => img._id === selectedImage._id);
                    if (currentIndex < images.length - 1) {
                      setSelectedImage(images[currentIndex + 1]);
                      setImageLoading(true);
                    }
                  }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                  disabled={images.findIndex(img => img._id === selectedImage._id) === images.length - 1}
                >
                  <svg className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="relative max-w-full max-h-full flex items-center justify-center">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
              <img
                src={`/uploads/${selectedImage.image}`}
                alt={selectedImage.title}
                className="gallery-image max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                onContextMenu={(e) => handleImageRightClick(e, selectedImage)}
                onLoad={() => setImageLoading(false)}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-sm text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-gray-200 text-lg">{selectedImage.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {selectedImage.category}
                  </span>
                  <p className="text-gray-300 text-sm mt-2">
                    {images.findIndex(img => img._id === selectedImage._id) + 1} of {images.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default GalleryNew;