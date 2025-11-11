import express from 'express';
import { body } from 'express-validator';
import {
  getAllPlacements,
  getPlacementById,
  createPlacement,
  updatePlacement,
  deletePlacement,
  permanentlyDeletePlacement,
  getPlacementStats,
  getPlacementsByStudent,
  getPlacementsByCompany
} from '../controllers/placementController.js';
import { authenticate, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules for placement
const placementValidationRules = [
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),
  
  body('scholarNumber')
    .trim()
    .notEmpty()
    .withMessage('Scholar number is required for placement')
    .isLength({ max: 20 })
    .withMessage('Scholar number cannot exceed 20 characters'),
  
  body('placementType')
    .notEmpty()
    .withMessage('Placement type is required')
    .isIn(['2M+PPO', '6M+PPO', '6M+FTE', 'FTE'])
    .withMessage('Invalid placement type'),
  
  body('package')
    .notEmpty()
    .withMessage('Package is required')
    .isNumeric()
    .withMessage('Package must be a number')
    .custom(value => {
      if (parseFloat(value) < 0) {
        throw new Error('Package cannot be negative');
      }
      return true;
    }),
  
  body('stipend')
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage('Stipend must be a number')
    .custom(value => {
      if (value !== undefined && value !== null && value !== '' && parseFloat(value) < 0) {
        throw new Error('Stipend cannot be negative');
      }
      return true;
    }),
  
  body('status')
    .optional()
    .isIn(['offered', 'accepted', 'rejected', 'completed'])
    .withMessage('Invalid status'),
  
  body('packageDetails.currency')
    .optional()
    .isIn(['INR', 'USD', 'EUR', 'GBP'])
    .withMessage('Invalid currency'),
  
  body('offerDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage('Invalid offer date format'),
  
  body('joiningDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage('Invalid joining date format'),
  
  body('notes')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),

  // Validate nested fields
  body('packageDetails.breakdown.base')
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage('Base salary must be a number'),

  body('packageDetails.breakdown.bonus')
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage('Bonus must be a number'),

  body('packageDetails.breakdown.stockOptions')
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage('Stock options must be a number'),

  body('packageDetails.breakdown.other')
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage('Other compensation must be a number'),

  body('jobDetails.role')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Job role cannot exceed 100 characters'),

  body('jobDetails.location')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Job location cannot exceed 100 characters'),

  body('jobDetails.department')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Department cannot exceed 100 characters')
];

// Public routes (with authentication)
router.get('/', authenticate, getAllPlacements);
router.get('/stats', authenticate, getPlacementStats);
router.get('/student/:scholarNumber', authenticate, getPlacementsByStudent);
router.get('/company/:companyName', authenticate, getPlacementsByCompany);
router.get('/:id', authenticate, getPlacementById);

// Admin only routes
router.post('/', ...adminOnly, placementValidationRules, createPlacement);
router.put('/:id', ...adminOnly, placementValidationRules, updatePlacement);
router.delete('/:id', ...adminOnly, deletePlacement); // Soft delete
router.delete('/:id/permanent', ...adminOnly, permanentlyDeletePlacement); // Hard delete

export default router;