import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { showError } from '../utils/toast.js';

const ProtectedRoute = ({ children, requiredRole = null, requireApproval = false }) => {
  const location = useLocation();
  
  // Get user data from localStorage
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  
  // Check if user is authenticated
  if (!token || !userData) {
    showError('Please login to access this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  let user;
  try {
    user = JSON.parse(userData);
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showError('Invalid session. Please login again.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if specific role is required
  if (requiredRole && user.role !== requiredRole) {
    showError(`Access denied. ${requiredRole} role required.`);
    return <Navigate to="/login" replace />;
  }
  
  // Check if approval is required (for students)
  if (requireApproval && user.role === 'student' && user.status !== 'approved') {
    const statusMessages = {
      pending: 'Your account is pending approval. Please wait for admin approval.',
      rejected: 'Your account has been rejected. Please contact administration.'
    };
    
    showError(statusMessages[user.status] || 'Account approval required.');
    return <Navigate to="/login" replace />;
  }
  
  // User is authenticated and authorized
  return children;
};

export default ProtectedRoute;