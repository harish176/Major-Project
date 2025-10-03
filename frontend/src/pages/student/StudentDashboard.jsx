import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaIdCard, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess, showLoading, dismissToast } from '../../utils/toast.js';
import { studentAPI, authAPI } from '../../utils/api.js';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        showError('Please login to access dashboard');
        navigate('/login');
        return;
      }

      try {
        // Parse stored user data to check role
        const parsedUser = JSON.parse(userData);
        if (parsedUser.role !== 'student') {
          showError('Access denied. Student access required.');
          navigate('/login');
          return;
        }

        // Fetch fresh user profile data from API
        const loadingToast = showLoading('Loading profile...');
        const response = await studentAPI.getProfile();
        dismissToast(loadingToast);

        if (response.data.success) {
          setUser(response.data.data);
          // Update localStorage with fresh data
          localStorage.setItem('user', JSON.stringify(response.data.data));
        } else {
          // Fallback to localStorage data if API fails
          setUser(parsedUser);
          showError('Could not load latest profile data');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        
        // Fallback to localStorage data
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (parseError) {
          showError('Invalid user data. Please login again.');
          navigate('/login');
          return;
        }
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    const loadingToast = showLoading('Signing out...');
    
    try {
      // Call logout API (optional - JWT is stateless)
      await authAPI.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed, continuing with client-side logout:', error);
    }
    
    // Always clear local storage and logout user
    dismissToast(loadingToast);
    
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    showSuccess('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img src="/logo.jpg" alt="MANIT Logo" className="h-10 w-10 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.studentName || user.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors duration-200"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Status Alert */}
          <div className={`mb-6 p-4 rounded-md ${getStatusColor(user.status)}`}>
            <div className="flex items-center">
              <FaIdCard className="mr-3" />
              <div>
                <h3 className="font-medium">Account Status: {user.status?.toUpperCase()}</h3>
                <p className="text-sm mt-1">
                  {user.status === 'pending' && 'Your account is under review. You will be notified once approved.'}
                  {user.status === 'approved' && 'Your account has been approved. You have full access to all features.'}
                  {user.status === 'rejected' && 'Your account application was rejected. Please contact administration.'}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                {user.studentPhotoUrl ? (
                  <img
                    src={user.studentPhotoUrl}
                    alt="Student Photo"
                    className="h-20 w-20 rounded-full object-cover mr-6"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center mr-6">
                    <FaUser className="h-10 w-10 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{user.studentName || user.name}</h2>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <FaEnvelope className="mr-2" />
                    {user.email}
                  </p>
                  {user.studentPhone && (
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <FaPhone className="mr-2" />
                      {user.studentPhone}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <FaGraduationCap className="mr-2" />
                    Student ID: {user.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaUser className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Profile</dt>
                      <dd className="text-lg font-medium text-gray-900">View & Edit</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Manage Profile →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaGraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Academics</dt>
                      <dd className="text-lg font-medium text-gray-900">View Records</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="text-sm font-medium text-green-600 hover:text-green-500">
                    View Academics →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaCalendarAlt className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Schedule</dt>
                      <dd className="text-lg font-medium text-gray-900">View Timetable</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="text-sm font-medium text-purple-600 hover:text-purple-500">
                    View Schedule →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    <li className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaUser className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800">Account created and submitted for approval</p>
                          <p className="text-sm text-gray-500">
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                    </li>
                    {user.status === 'approved' && (
                      <li className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <FaGraduationCap className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800">Account approved by administration</p>
                            <p className="text-sm text-gray-500">Welcome to MANIT!</p>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;