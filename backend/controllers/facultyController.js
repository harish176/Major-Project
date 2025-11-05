import Faculty from '../models/Faculty.js';

// @desc    Register a new faculty member
// @route   POST /api/faculty/register
// @access  Private/Admin
export const registerFaculty = async (req, res) => {
  try {
    console.log('Received faculty registration data:', req.body);

    // Extract data from request body
    const facultyData = req.body;

    // Basic validation for required fields (only truly essential fields)
    const requiredFields = [
      'facultyId', 'firstName', 'lastName', 'contactNumber', 
      'email', 'password', 'department', 'designation'
    ];

    const missingFields = requiredFields.filter(field => !facultyData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        errors: missingFields.reduce((acc, field) => {
          acc[field] = `${field} is required`;
          return acc;
        }, {})
      });
    }

    // Check if faculty already exists
    const existingFaculty = await Faculty.findByEmailOrContact(
      facultyData.email, 
      facultyData.contactNumber
    );
    
    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: 'Faculty with this email or contact number already exists'
      });
    }

    // Check for duplicate Faculty ID
    const existingFacultyId = await Faculty.findOne({ facultyId: facultyData.facultyId });
    if (existingFacultyId) {
      return res.status(400).json({
        success: false,
        message: 'Faculty with this Faculty ID already exists'
      });
    }

    // Check for duplicate PAN number
    if (facultyData.panNumber) {
      const existingPan = await Faculty.findOne({ panNumber: facultyData.panNumber });
      if (existingPan) {
        return res.status(400).json({
          success: false,
          message: 'Faculty with this PAN number already exists'
        });
      }
    }

    // Check for duplicate Aadhar number if provided
    if (facultyData.aadharNumber) {
      const existingAadhar = await Faculty.findOne({ aadharNumber: facultyData.aadharNumber });
      if (existingAadhar) {
        return res.status(400).json({
          success: false,
          message: 'Faculty with this Aadhar number already exists'
        });
      }
    }

    // Clean up empty arrays and objects
    if (facultyData.publications && facultyData.publications.length === 0) {
      delete facultyData.publications;
    }
    if (facultyData.awards && facultyData.awards.length === 0) {
      delete facultyData.awards;
    }
    if (facultyData.committees && facultyData.committees.length === 0) {
      delete facultyData.committees;
    }
    if (facultyData.certifications && facultyData.certifications.length === 0) {
      delete facultyData.certifications;
    }
    if (facultyData.previousInstitutions && facultyData.previousInstitutions.length === 0) {
      delete facultyData.previousInstitutions;
    }

    // Filter out empty strings from arrays
    if (facultyData.areasOfExpertise) {
      facultyData.areasOfExpertise = facultyData.areasOfExpertise.filter(item => item && item.trim() !== '');
    }
    if (facultyData.subjectsTaught) {
      facultyData.subjectsTaught = facultyData.subjectsTaught.filter(item => item && item.trim() !== '');
    }
    if (facultyData.researchInterests) {
      facultyData.researchInterests = facultyData.researchInterests.filter(item => item && item.trim() !== '');
    }

    // Remove undefined, null, or empty string values from nested objects
    const cleanObject = (obj) => {
      if (!obj || typeof obj !== 'object') return obj;
      
      Object.keys(obj).forEach(key => {
        if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
          delete obj[key];
        } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          cleanObject(obj[key]);
          if (Object.keys(obj[key]).length === 0) {
            delete obj[key];
          }
        }
      });
      return obj;
    };

    cleanObject(facultyData);

    // Set default status
    facultyData.status = facultyData.status || 'active';
    facultyData.isActive = true;

    // Create new faculty
    const newFaculty = new Faculty(facultyData);
    const savedFaculty = await newFaculty.save();

    console.log('Faculty saved successfully:', savedFaculty._id);

    // Return success response (excluding password)
    const facultyResponse = savedFaculty.toJSON();

    res.status(201).json({
      success: true,
      message: 'Faculty member registered successfully',
      data: {
        facultyId: facultyResponse.facultyId,
        name: `${facultyResponse.firstName} ${facultyResponse.middleName || ''} ${facultyResponse.lastName}`.trim(),
        email: facultyResponse.email,
        department: facultyResponse.department,
        designation: facultyResponse.designation,
        status: facultyResponse.status,
        createdAt: facultyResponse.createdAt
      }
    });

  } catch (error) {
    console.error('Faculty registration error:', error);
    
    if (error.code === 11000) {
      // Duplicate key error (MongoDB)
      const duplicateField = Object.keys(error.keyPattern)[0];
      let fieldName = duplicateField;
      
      // Make field names more user-friendly
      if (duplicateField === 'contactNumber') fieldName = 'Contact Number';
      if (duplicateField === 'aadharNumber') fieldName = 'Aadhar Number';
      if (duplicateField === 'panNumber') fieldName = 'PAN Number';
      if (duplicateField === 'facultyId') fieldName = 'Faculty ID';
      if (duplicateField === 'email') fieldName = 'Email';
      
      return res.status(400).json({
        success: false,
        message: `${fieldName} already exists`,
        errors: {
          [duplicateField]: `A faculty member with this ${fieldName} already exists`
        }
      });
    }

    if (error.name === 'ValidationError') {
      // Mongoose validation error - format as object with field names
      const validationErrors = {};
      Object.keys(error.errors).forEach(field => {
        validationErrors[field] = error.errors[field].message;
      });
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed: ' + Object.keys(validationErrors).join(', '),
        errors: validationErrors
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format provided'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
      error: error.message
    });
  }
};

// @desc    Get all faculty members
// @route   GET /api/faculty
// @access  Private/Admin
export const getAllFaculty = async (req, res) => {
  try {
    const { status, department, designation, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    if (status) query.status = status;
    if (department) query.department = new RegExp(department, 'i');
    if (designation) query.designation = designation;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get faculty with pagination
    const faculty = await Faculty.find(query)
      .select('-password') // Exclude password field
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Faculty.countDocuments(query);

    res.json({
      success: true,
      data: faculty,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalFaculty: total,
        hasNext: skip + faculty.length < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Get faculty by ID
// @route   GET /api/faculty/:id
// @access  Private
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).select('-password');
    
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.json({
      success: true,
      data: faculty
    });

  } catch (error) {
    console.error('Get faculty error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid faculty ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Update faculty member
// @route   PUT /api/faculty/:id
// @access  Private/Admin
export const updateFaculty = async (req, res) => {
  try {
    const updateData = req.body;

    // Don't allow updating certain fields
    delete updateData.password; // Password should be updated separately
    delete updateData.createdAt;
    delete updateData._id;

    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-password');

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.json({
      success: true,
      message: 'Faculty member updated successfully',
      data: faculty
    });

  } catch (error) {
    console.error('Update faculty error:', error);
    
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `A faculty member with this ${duplicateField} already exists`
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid faculty ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Update faculty status
// @route   PUT /api/faculty/:id/status
// @access  Private/Admin
export const updateFacultyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['active', 'inactive', 'retired', 'terminated'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be active, inactive, retired, or terminated'
      });
    }

    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        isActive: status === 'active',
        updatedAt: new Date() 
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.json({
      success: true,
      message: `Faculty status updated to ${status}`,
      data: faculty
    });

  } catch (error) {
    console.error('Update faculty status error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid faculty ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Delete faculty member
// @route   DELETE /api/faculty/:id
// @access  Private/Admin
export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.json({
      success: true,
      message: 'Faculty member deleted successfully'
    });

  } catch (error) {
    console.error('Delete faculty error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid faculty ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Get faculty statistics
// @route   GET /api/faculty/stats
// @access  Private/Admin
export const getFacultyStats = async (req, res) => {
  try {
    const statusStats = await Faculty.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const departmentStats = await Faculty.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const designationStats = await Faculty.aggregate([
      {
        $group: {
          _id: '$designation',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const totalFaculty = await Faculty.countDocuments();
    
    // Format stats
    const formattedStatusStats = {
      total: totalFaculty,
      active: 0,
      inactive: 0,
      retired: 0,
      terminated: 0
    };

    statusStats.forEach(stat => {
      formattedStatusStats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: {
        status: formattedStatusStats,
        byDepartment: departmentStats,
        byDesignation: designationStats
      }
    });

  } catch (error) {
    console.error('Get faculty stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Search faculty members
// @route   GET /api/faculty/search
// @access  Private
export const searchFaculty = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchRegex = new RegExp(query, 'i');

    const faculty = await Faculty.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { facultyId: searchRegex },
        { department: searchRegex }
      ]
    })
    .select('-password')
    .limit(20);

    res.json({
      success: true,
      data: faculty,
      count: faculty.length
    });

  } catch (error) {
    console.error('Search faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
