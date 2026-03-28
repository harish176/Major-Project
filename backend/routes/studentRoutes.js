import express from 'express';
import {
  registerStudent,
  getStudentById,
  getStudentStats
} from '../controllers/studentController.js';
import { studentOnly, authenticatedOnly } from '../middleware/authMiddleware.js';
import Student from '../models/Student.js';

const router = express.Router();

// @route   POST /api/students/register
// @desc    Register a new student
// @access  Public
router.post('/register', registerStudent);

// @route   GET /api/students/stats
// @desc    Get student statistics
// @access  Private
router.get('/stats', authenticatedOnly, getStudentStats);

// @route   GET /api/students/profile
// @desc    Get current student's profile
// @access  Private/Student
router.get('/profile', studentOnly, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/students/profile
// @desc    Update current student's profile
// @access  Private/Student
router.put('/profile', studentOnly, async (req, res) => {
  try {
    const allowedUpdates = [
      'studentName', 'studentPhone', 'studentPhotoUrl', 'studentPhotoPublicId',
      'fatherName', 'fatherPhone', 'motherName', 'fatherOccupation', 'motherOccupation',
      'category', 'income', 'jeeMainRank', 'jeeAdvancedRank', 'branch', 'degree',
      'dateOfJoining', 'state', 'city', 'pincode', 'nationality', 'motherTongue', 'aadharNumber'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: student
    });
  } catch (error) {
    console.error('Update student profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/students/scholar/:scholarNumber
// @desc    Get student by scholar number
// @access  Private
router.get('/scholar/:scholarNumber', authenticatedOnly, async (req, res) => {
  try {
    const { scholarNumber } = req.params;
    
    const student = await Student.findOne({ scholarNumber }).select('-password');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found with this scholar number'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student by scholar number error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private (Admin or own profile for student)
router.get('/:id', authenticatedOnly, getStudentById);

export default router;