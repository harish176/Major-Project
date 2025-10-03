import { body, validationResult } from 'express-validator';

// Validation middleware to check for validation errors
export const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Student registration validation rules
export const validateStudentRegistration = [
  body('studentName')
    .trim()
    .notEmpty()
    .withMessage('Student name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Student name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

  body('studentPhone')
    .notEmpty()
    .withMessage('Student phone is required')
    .matches(/^\d{10}$/)
    .withMessage('Please provide a valid 10-digit phone number'),

  body('role')
    .optional()
    .isIn(['student', 'admin', 'faculty'])
    .withMessage('Role must be student, admin, or faculty'),

  body('fatherPhone')
    .optional()
    .matches(/^\d{10}$/)
    .withMessage('Please provide a valid 10-digit father phone number'),

  body('pincode')
    .optional()
    .matches(/^\d{6}$/)
    .withMessage('Please provide a valid 6-digit pincode'),

  body('aadharNumber')
    .optional()
    .matches(/^\d{12}$/)
    .withMessage('Please provide a valid 12-digit Aadhar number'),

  body('income')
    .optional()
    .isNumeric()
    .withMessage('Income must be a number')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Income cannot be negative');
      }
      return true;
    }),

  body('jeeMainRank')
    .optional()
    .isInt({ min: 1 })
    .withMessage('JEE Main rank must be a positive integer'),

  body('jeeAdvancedRank')
    .optional()
    .isInt({ min: 1 })
    .withMessage('JEE Advanced rank must be a positive integer'),

  body('category')
    .optional()
    .isIn(['General', 'OBC', 'SC', 'ST', 'EWS'])
    .withMessage('Category must be General, OBC, SC, ST, or EWS'),

  body('degree')
    .optional()
    .isIn(['B.Tech', 'M.Tech', 'PhD', 'MBA', 'MCA'])
    .withMessage('Degree must be B.Tech, M.Tech, PhD, MBA, or MCA'),

  checkValidationErrors
];

// Login validation rules
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  checkValidationErrors
];

// Student status update validation
export const validateStatusUpdate = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Status must be pending, approved, or rejected'),

  checkValidationErrors
];