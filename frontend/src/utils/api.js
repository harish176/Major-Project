import axios from 'axios';
import { showError } from './toast.js';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        showError('Session expired. Please login again.');
        // You might want to redirect to login page here
        // window.location.href = '/login';
      } else if (status === 403) {
        showError('Access denied. You do not have permission to perform this action.');
      } else if (status >= 500) {
        showError('Server error. Please try again later.');
      } else if (data && data.message) {
        showError(data.message);
      }
    } else if (error.request) {
      // Network error
      showError('Network error. Please check your internet connection.');
    } else {
      showError('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};

export const studentAPI = {
  register: (studentData) => api.post('/students/register', studentData),
  getProfile: () => api.get('/students/profile'),
  updateProfile: (data) => api.put('/students/profile', data),
  uploadPhoto: (formData) => api.post('/students/upload-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export const adminAPI = {
  getStudents: () => api.get('/admin/students'),
  approveStudent: (studentId) => api.put(`/admin/students/${studentId}/approve`),
  rejectStudent: (studentId) => api.put(`/admin/students/${studentId}/reject`),
};

export default api;