import express from 'express';
import {
  getStudentsForAdmin,
  getStudentByIdForAdmin,
  updateStudentStatusForAdmin,
  deleteStudentForAdmin,
  getStudentStatsForAdmin,
  approveStudent,
  rejectStudent
} from '../controllers/adminController.js';
import { adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/admin/students
// @desc    Get all students with pagination and filtering
// @access  Private/Admin
router.get('/students', adminOnly, getStudentsForAdmin);

// @route   GET /api/admin/students/stats
// @desc    Get student statistics
// @access  Private/Admin
router.get('/students/stats', adminOnly, getStudentStatsForAdmin);

// @route   GET /api/admin/students/:id
// @desc    Get student by ID
// @access  Private/Admin
router.get('/students/:id', adminOnly, getStudentByIdForAdmin);

// @route   PUT /api/admin/students/:id/approve
// @desc    Approve student
// @access  Private/Admin
router.put('/students/:id/approve', adminOnly, approveStudent);

// @route   PUT /api/admin/students/:id/reject
// @desc    Reject student
// @access  Private/Admin
router.put('/students/:id/reject', adminOnly, rejectStudent);

// @route   PUT /api/admin/students/:id/status
// @desc    Update student status (approve/reject/pending)
// @access  Private/Admin
router.put('/students/:id/status', adminOnly, updateStudentStatusForAdmin);

// @route   DELETE /api/admin/students/:id
// @desc    Delete student
// @access  Private/Admin
router.delete('/students/:id', adminOnly, deleteStudentForAdmin);

export default router;