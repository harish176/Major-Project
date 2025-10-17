
import Student from '../models/Student.js';
import { generateTokenPair } from '../utils/jwt.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and role are required'
      });
    }

    if (!['admin', 'student'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be admin or student'
      });
    }

    // Find user in Student model (which handles both students and admins)
    const user = await Student.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify role matches
    if (user.role !== role) {
      return res.status(401).json({
        success: false,
        message: `Account found but not registered as ${role}. Your account role is: ${user.role}`
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact administrator.'
      });
    }

    // For student, check approval status
    if (role === 'student' && user.status === 'rejected') {
      return res.status(401).json({
        success: false,
        message: 'Your account has been rejected. Please contact administrator.'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT tokens
    const tokens = generateTokenPair(user);

    // Prepare user data for response (excluding sensitive info)
    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      studentName: user.studentName,
      name: user.studentName, // For compatibility
      status: user.status,
      studentPhone: user.studentPhone,
      studentPhotoUrl: user.studentPhotoUrl
    };

    res.json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} login successful`,
      data: {
        user: userData,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Since we're using stateless JWT tokens, logout is mainly a client-side operation
    // We could maintain a blacklist of tokens here if needed, but for now we'll just
    // return success and let the client handle token removal
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout.'
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Import JWT utilities
    const { verifyRefreshToken, generateTokenPair } = await import('../utils/jwt.js');

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    // Find user in database
    const user = await Student.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Generate new token pair
    const tokens = generateTokenPair(user);

    // Prepare user data for response
    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      studentName: user.studentName,
      name: user.studentName,
      status: user.status,
      studentPhone: user.studentPhone,
      studentPhotoUrl: user.studentPhotoUrl
    };

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        user: userData,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn
      }
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
  }
};