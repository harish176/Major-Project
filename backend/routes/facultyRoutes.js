import express from 'express';
import {
  registerFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  updateFacultyStatus,
  deleteFaculty,
  getFacultyStats,
  searchFaculty
} from '../controllers/facultyController.js';
import { adminOnly, authenticatedOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin routes for faculty management
router.post('/register', adminOnly, registerFaculty);
router.get('/stats', adminOnly, getFacultyStats);
router.get('/search', authenticatedOnly, searchFaculty);
router.get('/', adminOnly, getAllFaculty);
router.get('/:id', authenticatedOnly, getFacultyById);
router.put('/:id', adminOnly, updateFaculty);
router.put('/:id/status', adminOnly, updateFacultyStatus);
router.delete('/:id', adminOnly, deleteFaculty);

export default router;
