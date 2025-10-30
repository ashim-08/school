import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown, Home, Users, BookOpen, Camera, Phone, MessageSquare, User, Bell } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { 
      name: 'About', 
      path: '#',
      icon: User,
      dropdown: [
        { name: 'Overview', path: '/overview' },
        { name: 'Administration', path: '/admin-messages' },
        { name: 'Notices', path: '/notices' },
        { name: 'Staffs', path: '/staff' }
      ]
    },
    { name: 'Admission', path: '/admissions', icon: BookOpen },
    { name: 'Gallery', path: '/gallery', icon: Camera },
    { name: 'Contact', path: '/contact', icon: Phone }
  ];

  const isActive = (path) => location.pathname === path;

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsAboutOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsAboutOpen(false);
  };

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <nav className={`hidden lg:block fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg backdrop-blur-md' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <GraduationCap className="h-10 w-10 text-blue-700 group-hover:text-blue-800 transition-colors duration-300" />
                <div className="absolute -inset-1 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                  Brahma Rupa
                </span>
                <span className="text-sm text-gray-600 block leading-tight">Higher Secondary School</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsAboutOpen(true)}
                      onMouseLeave={() => setIsAboutOpen(false)}
                    >
                      <button className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 font-medium">
                        {link.name}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          isAboutOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                        isAboutOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                      }`}>
                        <div className="py-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`block px-4 py-3 text-sm transition-all duration-200 ${
                                isActive(item.path)
                                  ? 'text-blue-700 bg-blue-50 border-r-2 border-blue-700'
                                  : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                        isActive(link.path)
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Facebook Style */}
      <div className="lg:hidden">
        {/* Top Mobile Bar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg backdrop-blur-md' : 'bg-white/95 backdrop-blur-sm'
        }`}>
          <div className="px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                <GraduationCap className="h-8 w-8 text-blue-700" />
                <div>
                  <span className="font-bold text-lg text-gray-800">Brahma Rupa</span>
                  <span className="text-xs text-gray-600 block leading-tight">Higher Secondary School</span>
                </div>
              </Link>

              {/* Top Right Icons */}
              <div className="flex items-center space-x-3">
                <Link to="/notices" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Link>
                <button
                  onClick={handleMenuClick}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-6 h-6 relative">
                    <span className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 translate-y-0' : 'rotate-0'
                    }`}>
                      <Menu className={`w-6 h-6 ${isMenuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`} />
                    </span>
                    <span className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen ? 'rotate-0 translate-y-0' : 'rotate-45'
                    }`}>
                      <X className={`w-6 h-6 ${isMenuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`} />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom Mobile Navigation Bar - Facebook Style */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
          <div className="grid grid-cols-5 h-16">
            {navLinks.slice(0, 5).map((link, index) => {
              const Icon = link.icon;
              const isActiveLink = isActive(link.path) || (link.dropdown && link.dropdown.some(item => isActive(item.path)));
              
              if (link.dropdown) {
                return (
                  <button
                    key={link.name}
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                    className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                      isActiveLink ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs font-medium">{link.name}</span>
                    {isActiveLink && <div className="w-1 h-1 bg-blue-600 rounded-full"></div>}
                  </button>
                );
              }
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    isActiveLink ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{link.name}</span>
                  {isActiveLink && <div className="w-1 h-1 bg-blue-600 rounded-full"></div>}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={closeMobileMenu} />
        )}

        {/* Mobile Slide-out Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="py-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => setIsAboutOpen(!isAboutOpen)}
                      className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <link.icon className="h-5 w-5 text-gray-600 mr-3" />
                        <span className="font-medium text-gray-800">{link.name}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform duration-300 ${
                        isAboutOpen ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isAboutOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeMobileMenu}
                          className={`block px-12 py-3 text-sm transition-colors ${
                            isActive(item.path)
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-6 py-4 hover:bg-gray-50 transition-colors ${
                      isActive(link.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-800'
                    }`}
                  >
                    <link.icon className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* About Dropdown in Mobile Menu */}
          {isAboutOpen && (
            <div className="border-t bg-gray-50">
              <div className="py-2">
                {navLinks.find(link => link.dropdown)?.dropdown.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`block px-6 py-3 text-sm transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-100'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Spacer for Bottom Navigation */}
        <div className="h-16"></div>
      </div>

      {/* Desktop Spacer */}
      <div className="hidden lg:block h-16"></div>
    </>
  );
};

export default Navbar;