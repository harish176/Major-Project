import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUserShield, FaGraduationCap } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { showError, showSuccess, showLoading, dismissToast, ValidationMessages } from '../utils/toast.js';
import { authAPI } from '../utils/api.js';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' // Default to student
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.trim()) {
      showError('Email is required');
      return false;
    }
    
    if (!emailRegex.test(formData.email)) {
      showError(ValidationMessages.INVALID_EMAIL);
      return false;
    }
    
    if (!formData.password.trim()) {
      showError('Password is required');
      return false;
    }
    
    if (formData.password.length < 6) {
      showError(ValidationMessages.INVALID_PASSWORD);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const loadingToastId = showLoading('Signing in...');
    
    try {
      // Use axios API for login
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // Always dismiss loading toast first
      dismissToast(loadingToastId);

      const data = response.data;

      if (data.success) {
        showSuccess(data.message);
        console.log('Login successful:', data);
        
        // Store token and user data
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Redirect based on role
        if (data.data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
        
      } else {
        // Backend returned success: false
        showError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Always ensure loading toast is dismissed in catch block
      dismissToast(loadingToastId);
      
      // Axios error handling is done by interceptor in api.js
      // But we can add additional specific handling here if needed
      console.error('Login error:', error);
      
      // If error wasn't handled by interceptor, show generic message
      if (!error.response) {
        showError('Network error. Please check your connection and try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img src="/logo.jpg" alt="MANIT Logo" className="h-16 w-16" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {formData.role === 'admin' ? 'Admin Login' : 'Student Login'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {formData.role === 'student' && (
              <>
                Don't have an account?{' '}
                <NavLink
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  Sign up
                </NavLink>
              </>
            )}
            {formData.role === 'admin' && (
              <span className="text-red-600 font-medium">
                Admin access only - Contact system administrator for account
              </span>
            )}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Login as
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`flex items-center px-4 py-2 rounded-md border-2 transition-all duration-200 ${
                    formData.role === 'student' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}>
                    <FaGraduationCap className="mr-2" />
                    <span className="font-medium">Student</span>
                  </div>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`flex items-center px-4 py-2 rounded-md border-2 transition-all duration-200 ${
                    formData.role === 'admin' 
                      ? 'border-red-500 bg-red-50 text-red-700' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}>
                    <FaUserShield className="mr-2" />
                    <span className="font-medium">Admin</span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none focus:text-gray-800 z-20"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                formData.role === 'admin' 
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                  : 'bg-[#002147] hover:bg-[#003366] focus:ring-blue-500'
              }`}
            >
              <span className="flex items-center">
                {formData.role === 'admin' ? (
                  <>
                    <FaUserShield className="mr-2" />
                    Sign in as Admin
                  </>
                ) : (
                  <>
                    <FaGraduationCap className="mr-2" />
                    Sign in as Student
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;