import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaUsers, FaUserTie, FaBriefcase, FaTachometerAlt } from 'react-icons/fa';
import { showError, showSuccess, showLoading, dismissToast } from '../../utils/toast.js';
import { authAPI } from '../../utils/api.js';

const AdminNavbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/admin-dashboard',
      icon: FaTachometerAlt,
      description: 'Admin Dashboard'
    },
    {
      name: 'Students',
      path: '/admin/students',
      icon: FaUsers,
      description: 'Student Management'
    },
    {
      name: 'Faculty',
      path: '/admin/faculty',
      icon: FaUserTie,
      description: 'Faculty Management'
    },
    {
      name: 'TPC',
      path: '/admin/tpc',
      icon: FaBriefcase,
      description: 'Training & Placement'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/admin-dashboard' && location.pathname === '/admin');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <img src="/logo.jpg" alt="MANIT Logo" className="h-10 w-10 mr-3" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
              <span className="text-xs text-gray-600 hidden sm:block">MANIT Administrative Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title={item.description}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">
                {user?.studentName || user?.name || 'Admin'}
              </span>
              <span className="text-xs text-gray-500">Administrator</span>
            </div>

            {/* User Avatar */}
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white text-sm font-medium">
              {(user?.studentName || user?.name || 'A').charAt(0).toUpperCase()}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200 border border-red-200 cursor-pointer"
              title="Sign out"
            >
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1 overflow-x-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex-shrink-0 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 flex items-center space-x-1 cursor-pointer ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;