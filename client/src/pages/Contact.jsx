import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Globe, Clock, Send, Facebook } from 'lucide-react';
import { submitContact } from '../services/api';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Disable right-click globally
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitContact(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-teal-800 to-blue-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-5 rounded-full animate-pulse delay-500"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-10 rounded-full mb-6 backdrop-blur-sm">
            <Mail className="h-10 w-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-blue-100 animate-fade-in-up delay-300 max-w-3xl mx-auto">
            We're here to help and answer any question you might have
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-teal-600 rounded-full"></div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-lg text-gray-600">
                Reach out to us through any of these channels. We're always happy to help!
              </p>
            </div>
            
            <div className="space-y-5">
              <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Pokhara-32, Rajako Chautara<br />
                    Kaski, Gandaki Province<br />
                    Nepal
                  </p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-green-600 transition-colors">Phone Numbers</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <a href="tel:061-410055" className="hover:text-blue-600 transition-colors font-medium inline-flex items-center">
                        061-410055
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:061-410057" className="hover:text-blue-600 transition-colors font-medium inline-flex items-center">
                        061-410057
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:9846041215" className="hover:text-blue-600 transition-colors font-medium inline-flex items-center">
                        9846041215
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-red-600 transition-colors">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:brahmarupahss13@gmail.com" className="hover:text-blue-600 transition-colors font-medium break-all">
                      brahmarupahss13@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                  <Facebook className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2 text-lg">Connect on Facebook</h3>
                  <p className="text-blue-100">
                    <a
                      href="https://www.facebook.com/profile.php/?id=61566874538608"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors font-medium inline-flex items-center"
                    >
                      Visit our Facebook page →
                    </a>
                  </p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-amber-600 transition-colors">Office Hours</h3>
                  <div className="text-gray-600 space-y-1.5">
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Sunday - Friday: 6:00 AM - 4:00 PM
                    </p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Saturday: 6:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admission Notice */}
            <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-2xl p-8 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-8 -mb-8"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 mr-3" />
                  <h3 className="font-bold text-xl">Admission Information</h3>
                </div>
                <p className="leading-relaxed text-blue-50">
                  Admissions are open during the month of <strong className="text-white">Baisakh (April-May)</strong>.
                  Contact us during this period for admission inquiries and application procedures.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Send a Message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="+977-9812345678"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none hover:border-gray-300"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                {submitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Sending Message...
                  </div>
                ) : (
                  <>
                    <Send className="h-6 w-6 mr-3" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Us Here</h2>
            <p className="text-xl text-gray-600">Located in the heart of Pokhara</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d320.1415664860835!2d84.10329163637613!3d28.119766176684134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995a32c9d5999db%3A0xf2e7e76478e6a1a5!2sBrahma%20Rupa%20Higher%20Secondary%20School%2C%20GaganGaunda%20-%20JanaChautara%20Marga%2C%20Lekhnath%2033702!5e0!3m2!1sen!2snp!4v1761828628064!5m2!1sen!2snp"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="School Location"
            ></iframe>
          </div>
        </div>
      </div>

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
      `}</style>
    </div>
  );
};

export default Contact;