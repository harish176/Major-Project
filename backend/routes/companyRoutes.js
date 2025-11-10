import express from 'express';
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  permanentlyDeleteCompany,
  getCompaniesByDateRange,
  getCompaniesByBranch,
  getCompaniesByCourse,
  addYearlyData,
  getCompanyStats,
  restoreCompany
} from '../controllers/companyController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (no authentication required for viewing companies)
router.get('/', getAllCompanies);
router.get('/stats', getCompanyStats);
router.get('/date-range', getCompaniesByDateRange);
router.get('/branch/:branch', getCompaniesByBranch);
router.get('/course/:course', getCompaniesByCourse);
router.get('/:id', getCompanyById);

// Protected routes (require authentication)
router.use(authenticate); // Apply authentication middleware to all routes below

// CRUD operations (require authentication)
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany); // Soft delete
router.delete('/:id/permanent', permanentlyDeleteCompany); // Hard delete
router.patch('/:id/restore', restoreCompany); // Restore deleted company
router.post('/:id/yearly-data', addYearlyData); // Add yearly data to existing company

export default router;