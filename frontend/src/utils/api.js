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
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response) {
      // Server responded with error status
      const { status, data, config } = error.response;
      
      // Check if this is a login, signup, or refresh request
      const isAuthRequest = config.url.includes('/auth/login') || 
                           config.url.includes('/auth/signup') || 
                           config.url.includes('/auth/refresh');
      
      if (status === 401 && !isAuthRequest && !originalRequest._retry) {
        // Try to refresh the token
        originalRequest._retry = true;
        
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const response = await api.post('/auth/refresh', { refreshToken });
            const { data } = response.data;
            
            // Update stored tokens
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Update the Authorization header
            originalRequest.headers.Authorization = `Bearer ${data.token}`;
            
            // Retry the original request
            return api(originalRequest);
          } catch (refreshError) {
            // Refresh token is invalid, clear everything
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            showError('Session expired. Please login again.');
            // Redirect to login page
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token available
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          showError('Session expired. Please login again.');
          window.location.href = '/login';
        }
      } else if (status === 401 && isAuthRequest) {
        // For auth requests, let the component handle the error
        return Promise.reject(error);
      } else if (status === 403) {
        showError('Access denied. You do not have permission to perform this action.');
      } else if (status >= 500) {
        showError('Server error. Please try again later.');
      } else if (data && data.message && !isAuthRequest) {
        // Don't show error messages for auth requests as they're handled by the component
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
  // Student Management
  getStudents: (params) => api.get('/students', { params }),
  getStudentById: (id) => api.get(`/students/${id}`),
  updateStudent: (id, studentData) => api.put(`/students/${id}`, studentData),
  approveStudent: (studentId) => api.put(`/students/${studentId}/status`, { status: 'approved' }),
  rejectStudent: (studentId) => api.put(`/students/${studentId}/status`, { status: 'rejected' }),
  updateStudentStatus: (studentId, status) => api.put(`/students/${studentId}/status`, { status }),
  deleteStudent: (id) => api.delete(`/students/${id}`),
  getStudentStats: () => api.get('/students/stats'),
};

export const facultyAPI = {
  register: (facultyData) => api.post('/faculty/register', facultyData),
  getAllFaculty: (params) => api.get('/faculty', { params }),
  getFacultyById: (id) => api.get(`/faculty/${id}`),
  updateFaculty: (id, facultyData) => api.put(`/faculty/${id}`, facultyData),
  updateFacultyStatus: (id, status) => api.put(`/faculty/${id}/status`, { status }),
  deleteFaculty: (id) => api.delete(`/faculty/${id}`),
  getFacultyStats: () => api.get('/faculty/stats'),
  searchFaculty: (params) => api.get('/faculty/search', { params }),
};

export const tpcMemberAPI = {
  // CRUD operations
  createMember: (memberData) => api.post('/tpc-members', memberData),
  getAllMembers: (params) => api.get('/tpc-members', { params }),
  getMemberById: (id) => api.get(`/tpc-members/${id}`),
  updateMember: (id, memberData) => api.put(`/tpc-members/${id}`, memberData),
  deleteMember: (id) => api.delete(`/tpc-members/${id}`),
  permanentlyDeleteMember: (id) => api.delete(`/tpc-members/${id}/permanent`),
  restoreMember: (id) => api.patch(`/tpc-members/${id}/restore`),

  // Filter operations
  getMembersByCategory: (category) => api.get(`/tpc-members/category/${category}`),
  getMembersByTeam: (team) => api.get(`/tpc-members/team/${team}`),
  getMembersBySession: (session) => api.get(`/tpc-members/session/${session}`),

  // Statistics
  getStats: () => api.get('/tpc-members/stats'),
};

export const companyAPI = {
  // CRUD operations
  createCompany: (companyData) => api.post('/companies', companyData),
  getAllCompanies: (params) => api.get('/companies', { params }),
  getCompanyById: (id) => api.get(`/companies/${id}`),
  updateCompany: (id, companyData) => api.put(`/companies/${id}`, companyData),
  deleteCompany: (id) => api.delete(`/companies/${id}`),
  permanentlyDeleteCompany: (id) => api.delete(`/companies/${id}/permanent`),
  restoreCompany: (id) => api.patch(`/companies/${id}/restore`),

  // Filter operations
  getCompaniesByDateRange: (startDate, endDate) => api.get('/companies/date-range', { 
    params: { startDate, endDate } 
  }),
  getCompaniesByBranch: (branch, year) => api.get(`/companies/branch/${branch}`, { 
    params: year ? { year } : {} 
  }),
  getCompaniesByCourse: (course, year) => api.get(`/companies/course/${course}`, { 
    params: year ? { year } : {} 
  }),

  // Yearly data operations
  addYearlyData: (id, yearlyData) => api.post(`/companies/${id}/yearly-data`, yearlyData),

  // Statistics
  getStats: () => api.get('/companies/stats'),
};

export const placementAPI = {
  // CRUD operations
  createPlacement: (placementData) => api.post('/placements', placementData),
  getAllPlacements: (params) => api.get('/placements', { params }),
  getPlacementById: (id) => api.get(`/placements/${id}`),
  updatePlacement: (id, placementData) => api.put(`/placements/${id}`, placementData),
  deletePlacement: (id) => api.delete(`/placements/${id}`),
  permanentlyDeletePlacement: (id) => api.delete(`/placements/${id}/permanent`),

  // Filter operations
  getPlacementsByStudent: (scholarNumber) => api.get(`/placements/student/${scholarNumber}`),
  getPlacementsByCompany: (companyName) => api.get(`/placements/company/${encodeURIComponent(companyName)}`),
  getStudentByScholarNumber: (scholarNumber) => api.get(`/students/scholar/${scholarNumber}`),

  // Statistics
  getStats: () => api.get('/placements/stats'),
};

export default api;