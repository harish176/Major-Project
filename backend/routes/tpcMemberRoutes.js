import express from 'express';
import {
  getAllTPCMembers,
  getTPCMemberById,
  createTPCMember,
  updateTPCMember,
  deleteTPCMember,
  permanentlyDeleteTPCMember,
  getTPCMembersByCategory,
  getTPCMembersByTeam,
  getTPCMembersBySession,
  getTPCStats,
  restoreTPCMember
} from '../controllers/tpcMemberController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (no authentication required for viewing TPC members)
router.get('/', getAllTPCMembers);
router.get('/stats', getTPCStats);
router.get('/category/:category', getTPCMembersByCategory);
router.get('/team/:team', getTPCMembersByTeam);
router.get('/session/:session', getTPCMembersBySession);
router.get('/:id', getTPCMemberById);

// Protected routes (require authentication)
router.use(authenticate); // Apply authentication middleware to all routes below

// CRUD operations (require authentication)
router.post('/', createTPCMember);
router.put('/:id', updateTPCMember);
router.delete('/:id', deleteTPCMember); // Soft delete
router.delete('/:id/permanent', permanentlyDeleteTPCMember); // Hard delete
router.patch('/:id/restore', restoreTPCMember); // Restore deleted member

export default router;