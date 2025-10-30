import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        method: error.config?.method,
        url: error.config?.url,
        data: error.config?.data
      }
    });

    if (error.response?.status === 401 && error.config?.url !== '/auth/login') {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin') && !currentPath.startsWith('/admin/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth services
export const login = (credentials) =>
  api.post('/auth/login', credentials);

// Stats services
export const getStats = () => api.get('/stats');
export const updateStats = (stats) => api.put('/stats', stats);

// Teachers services
export const getTeachers = () => api.get('/teachers');
export const getTeacher = (id) => api.get(`/teachers/${id}`);
export const createTeacher = (data) => api.post('/teachers', data);
export const updateTeacher = (id, data) => api.put(`/teachers/${id}`, data);
export const deleteTeacher = (id) => api.delete(`/teachers/${id}`);

// Reviews services
export const getReviews = () => api.get('/reviews');
export const getAdminReviews = () => api.get('/reviews/admin');
export const createReview = (data) => api.post('/reviews', data);
export const submitReview = (data) => api.post('/reviews/submit', data);
export const approveReview = (id) => api.put(`/reviews/${id}/approve`);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// Programs services
export const getPrograms = () => api.get('/programs');
export const getProgram = (id) => api.get(`/programs/${id}`);
export const createProgram = (data) => api.post('/programs', data);
export const updateProgram = (id, data) => api.put(`/programs/${id}`, data);
export const deleteProgram = (id) => api.delete(`/programs/${id}`);

// Gallery services
export const getGallery = (category) => api.get(`/gallery${category ? `?category=${category}` : ''}`);
export const uploadImage = (data) => api.post('/gallery', data);
export const deleteImage = (id) => api.delete(`/gallery/${id}`);

// Contact services
export const submitContact = (data) => api.post('/contact', data);
export const getContacts = () => api.get('/contact');
export const markAsRead = (id) => api.put(`/contact/${id}/read`);

// Staff services
export const getStaff = () => api.get('/staff');
export const getStaffMember = (id) => api.get(`/staff/${id}`);
export const createStaff = (data) => api.post('/staff', data);
export const updateStaff = (id, data) => api.put(`/staff/${id}`, data);
export const deleteStaff = (id) => api.delete(`/staff/${id}`);

// Notice services
export const getNotices = (type, limit) => api.get(`/notices${type ? `?type=${type}` : ''}${limit ? `${type ? '&' : '?'}limit=${limit}` : ''}`);
export const getNotice = (id) => api.get(`/notices/${id}`);
export const getAdminNotices = () => api.get('/notices/admin/all');
export const createNotice = (data) => api.post('/notices', data);
export const updateNotice = (id, data) => api.put(`/notices/${id}`, data);
export const deleteNotice = (id) => api.delete(`/notices/${id}`);
export const recoverNotice = (id) => api.post(`/notices/${id}/recover`);
export const permanentDeleteNotice = (id) => api.delete(`/notices/${id}/permanent`);

// Result services
export const getResultClasses = () => api.get('/results/classes');
export const getClassResults = (className, examType, academicYear) => {
  let url = `/results/class/${encodeURIComponent(className)}`;
  const params = new URLSearchParams();
  if (examType) params.append('examType', examType);
  if (academicYear) params.append('academicYear', academicYear);
  if (params.toString()) url += `?${params.toString()}`;
  return api.get(url);
};
export const getClassExamTypes = (className) => api.get(`/results/class/${encodeURIComponent(className)}/exams`);
export const getAdminResults = () => api.get('/results/admin/all');
export const createResult = (data) => api.post('/results', data);
export const updateResult = (id, data) => api.put(`/results/${id}`, data);
export const deleteResult = (id) => api.delete(`/results/${id}`);
export const publishResult = (id, isPublished) => api.patch(`/results/${id}/publish`, { isPublished });

// Admin Message services
export const getAdminMessages = () => api.get('/admin-messages');
export const getAdminMessage = (id) => api.get(`/admin-messages/${id}`);
export const getAllAdminMessages = () => api.get('/admin-messages/admin/all');
export const createAdminMessage = (data) => api.post('/admin-messages', data);
export const updateAdminMessage = (id, data) => api.put(`/admin-messages/${id}`, data);
export const deleteAdminMessage = (id) => api.delete(`/admin-messages/${id}`);
export const recoverAdminMessage = (id) => api.post(`/admin-messages/${id}/recover`);
export const permanentDeleteAdminMessage = (id) => api.delete(`/admin-messages/${id}/permanent`);

// Academic Content services
export const getAcademicContent = (category) => api.get(`/academic-content${category ? `?category=${category}` : ''}`);
export const getAcademicContentById = (id) => api.get(`/academic-content/${id}`);
export const getAcademicContentByCategory = (category) => api.get(`/academic-content/category/${encodeURIComponent(category)}`);
export const getAllAcademicContent = () => api.get('/academic-content/admin/all');
export const createAcademicContent = (data) => api.post('/academic-content', data);
export const updateAcademicContent = (id, data) => api.put(`/academic-content/${id}`, data);
export const deleteAcademicContent = (id) => api.delete(`/academic-content/${id}`);

// Admission Content services
export const getAdmissionContent = () => api.get('/admission-content');
export const getAdminAdmissionContent = () => api.get('/admission-content/admin');
export const updateAdmissionContent = (data) => api.put('/admission-content', data);

// Settings services
export const getAdmins = () => api.get('/settings/admins');
export const createAdmin = (data) => api.post('/settings/admins', data);
export const updateCredentials = (data) => api.put('/settings/credentials', data);
export const deleteAdmin = (id) => api.delete(`/settings/admins/${id}`);
export const toggleAdminStatus = (id) => api.put(`/settings/admins/${id}/toggle-status`);

// Facilities services
export const getFacilities = () => api.get('/facilities');
export const getFacilityBySlug = (slug) => api.get(`/facilities/${slug}`);
export const getFacilitiesAdmin = () => api.get('/facilities/admin/all');
export const getAdminFacilities = () => api.get('/facilities/admin/all');
export const createFacility = (data) => api.post('/facilities', data);
export const updateFacility = (id, data) => api.put(`/facilities/${id}`, data);
export const deleteFacility = (id) => api.delete(`/facilities/${id}`);
export const recoverFacility = (id) => api.post(`/facilities/${id}/recover`);
export const permanentDeleteFacility = (id) => api.delete(`/facilities/${id}/permanent`);

export default api;