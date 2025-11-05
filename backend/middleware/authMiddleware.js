import { verifyToken, extractTokenFromHeader } from '../utils/jwt.js';
import Student from '../models/Student.js';

// Middleware to authenticate users
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    
    // Find user in database
    const user = await Student.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. User not found.'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Account is deactivated.'
      });
    }

    // Add user to request object
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      studentName: user.studentName,
      status: user.status
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    
    if (error.message === 'Invalid or expired token') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid or expired token.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.'
    });
  }
};

// Middleware to authorize specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${roles.join(' or ')} role required.`
      });
    }

    next();
  };
};

// Convenience middleware for admin-only access
export const adminOnly = [authenticate, authorize('admin')];

// Convenience middleware for student-only access
export const studentOnly = [authenticate, authorize('student')];

// Convenience middleware for authenticated users (any role)
export const authenticatedOnly = [authenticate];

// Middleware for admin or user accessing their own data
export const adminOrOwner = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    // Allow if admin
    if (req.user.role === 'admin') {
      return next();
    }

    // Allow if user is accessing their own data
    const resourceId = req.params.id || req.params.userId || req.params.studentId;
    if (req.user.id === resourceId) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only access your own data.'
    });
  } catch (error) {
    console.error('Authorization error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authorization.'
    });
  }
};

// Middleware to check if user account is approved (for students)
export const requireApproval = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication required.'
    });
  }

  // Admins don't need approval
  if (req.user.role === 'admin') {
    return next();
  }

  // Students need approval
  if (req.user.role === 'student' && req.user.status !== 'approved') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Your account is pending approval.',
      accountStatus: req.user.status
    });
  }

  next();
};

export default {
  authenticate,
  authorize,
  adminOnly,
  studentOnly,
  authenticatedOnly,
  adminOrOwner,
  requireApproval
};