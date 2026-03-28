import express from 'express';
import {
  getFacultyById,
  searchFaculty,
  getAdministrationFaculty
} from '../controllers/facultyController.js';
import { authenticatedOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for administration pages
router.get('/public/administration', getAdministrationFaculty);

router.get('/search', authenticatedOnly, searchFaculty);
router.get('/:id', authenticatedOnly, getFacultyById);

export default router;
