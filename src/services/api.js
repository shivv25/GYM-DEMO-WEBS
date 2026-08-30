import axios from 'axios';

const TOKEN_KEY = 'neurofit_admin_token';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      // Optional: Handle redirection or state update if needed
      if (window.location.pathname.startsWith('/admin')) {
         window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const authService = {
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Gym
export const gymService = {
  getGymInfo: () => api.get('/gym'),
  updateGymInfo: (data) => api.put('/gym', data),
};

// Programs
export const programService = {
  getAll: () => api.get('/programs'),
  getById: (id) => api.get(`/programs/${id}`),
  create: (data) => api.post('/programs', data),
  update: (id, data) => api.put(`/programs/${id}`, data),
  delete: (id) => api.delete(`/programs/${id}`),
};

// Trainers
export const trainerService = {
  getAll: () => api.get('/trainers'),
  getById: (id) => api.get(`/trainers/${id}`),
  create: (data) => api.post('/trainers', data),
  update: (id, data) => api.put(`/trainers/${id}`, data),
  delete: (id) => api.delete(`/trainers/${id}`),
};

// Memberships
export const membershipService = {
  getAll: () => api.get('/memberships'),
  getById: (id) => api.get(`/memberships/${id}`),
  create: (data) => api.post('/memberships', data),
  update: (id, data) => api.put(`/memberships/${id}`, data),
  delete: (id) => api.delete(`/memberships/${id}`),
};

// Testimonials
export const testimonialService = {
  getAll: () => api.get('/testimonials'),
  getById: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// Gallery
export const galleryService = {
  getAll: () => api.get('/gallery'),
  create: (data) => api.post('/gallery', data),
  delete: (id) => api.delete(`/gallery/${id}`),
};

// FAQ
export const faqService = {
  getAll: () => api.get('/faq'),
  getById: (id) => api.get(`/faq/${id}`),
  create: (data) => api.post('/faq', data),
  update: (id, data) => api.put(`/faq/${id}`, data),
  delete: (id) => api.delete(`/faq/${id}`),
};

// Trials
export const trialService = {
  getAll: () => api.get('/trials'),
  create: (data) => api.post('/trials', data),
  updateStatus: (id, status) => api.put(`/trials/${id}`, { status }),
  delete: (id) => api.delete(`/trials/${id}`),
};

// Contact
export const contactService = {
  getAll: () => api.get('/contact'),
  create: (data) => api.post('/contact', data),
  updateStatus: (id, status) => api.put(`/contact/${id}`, { status }),
  delete: (id) => api.delete(`/contact/${id}`),
};

// Dashboard
export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
};

export default api;
