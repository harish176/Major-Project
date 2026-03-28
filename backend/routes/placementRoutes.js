import express from 'express';
import {
  getAllPlacements,
  getPlacementById,
  getPlacementStats,
  getPlacementsByStudent,
  getPlacementsByCompany
} from '../controllers/placementController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (with authentication)
router.get('/', authenticate, getAllPlacements);
router.get('/stats', authenticate, getPlacementStats);
router.get('/student/:scholarNumber', authenticate, getPlacementsByStudent);
router.get('/company/:companyName', authenticate, getPlacementsByCompany);
router.get('/:id', authenticate, getPlacementById);

export default router;