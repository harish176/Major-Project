import Student from '../models/Student.js';
import bcrypt from 'bcrypt';

// @desc    Register a new student
// @route   POST /api/students/register
// @access  Public
export const registerStudent = async (req, res) => {
  try {
    console.log('Received student registration data:', req.body);

    // Extract data from request body
    const {
      studentName,
      scholarNumber,
      studentPhone,
      email,
      password,
      role,
      studentPhotoUrl,
      studentPhotoPublicId,
      fatherName,
      fatherPhone,
      motherName,
      fatherOccupation,
      motherOccupation,
      category,
      income,
      jeeMainRank,
      jeeAdvancedRank,
      branch,
      degree,
      dateOfJoining,
      state,
      city,
      pincode,
      nationality,
      motherTongue,
      aadharNumber
    } = req.body;

    // Basic validation
    if (!studentName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Student name, email, and password are required'
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findByEmailOrPhone(email, studentPhone);
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email or phone number already exists'
      });
    }

    // Check for duplicate scholar number if provided
    if (scholarNumber) {
      const existingScholar = await Student.findOne({ scholarNumber });
      if (existingScholar) {
        return res.status(400).json({
          success: false,
          message: 'Student with this scholar number already exists'
        });
      }
    }

    // Check for duplicate Aadhar number if provided
    if (aadharNumber) {
      const existingAadhar = await Student.findOne({ aadharNumber });
      if (existingAadhar) {
        return res.status(400).json({
          success: false,
          message: 'Student with this Aadhar number already exists'
        });
      }
    }

    // Create student data object
    const studentData = {
      studentName,
      scholarNumber,
      studentPhone,
      email,
      password, // Will be hashed by the pre-save middleware
      role: role || 'student',
      studentPhotoUrl,
      studentPhotoPublicId,
      fatherName,
      fatherPhone,
      motherName,
      fatherOccupation,
      motherOccupation,
      category,
      income: income ? parseFloat(income) : null,
      jeeMainRank: jeeMainRank ? parseInt(jeeMainRank) : null,
      jeeAdvancedRank: jeeAdvancedRank ? parseInt(jeeAdvancedRank) : null,
      branch,
      degree,
      dateOfJoining: dateOfJoining ? new Date(dateOfJoining) : null,
      state,
      city,
      pincode,
      nationality,
      motherTongue,
      aadharNumber,
      status: 'pending'
    };

    // Remove undefined/null/empty values
    Object.keys(studentData).forEach(key => {
      if (studentData[key] === undefined || studentData[key] === null || studentData[key] === '') {
        delete studentData[key];
      }
    });

    // Create new student
    const newStudent = new Student(studentData);
    const savedStudent = await newStudent.save();

    console.log('Student saved successfully:', savedStudent._id);

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Student registration submitted successfully. Please wait for approval.',
      data: {
        studentId: savedStudent._id,
        studentName: savedStudent.studentName,
        scholarNumber: savedStudent.scholarNumber,
        email: savedStudent.email,
        role: savedStudent.role,
        status: savedStudent.status,
        studentPhotoUrl: savedStudent.studentPhotoUrl,
        registrationDate: savedStudent.createdAt
      }
    });

  } catch (error) {
    console.error('Student registration error:', error);
    
    if (error.code === 11000) {
      // Duplicate key error (MongoDB)
      const duplicateField = Object.keys(error.keyPattern)[0];
      let fieldName = duplicateField;
      
      // Make field names more user-friendly
      if (duplicateField === 'studentPhone') fieldName = 'phone number';
      if (duplicateField === 'aadharNumber') fieldName = 'Aadhar number';
      if (duplicateField === 'scholarNumber') fieldName = 'scholar number';
      
      return res.status(400).json({
        success: false,
        message: `A student with this ${fieldName} already exists`
      });
    }

    if (error.name === 'ValidationError') {
      // Mongoose validation error
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
        message: 'Invalid data format provided'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

// @desc    Get all students (for admin)
// @route   GET /api/students
// @access  Private/Admin
export const getAllStudents = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get students with pagination
    const students = await Student.find(query)
      .select('-password') // Exclude password field
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Student.countDocuments(query);

    res.json({
      success: true,
      data: students,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalStudents: total,
        hasNext: skip + students.length < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error('Get student error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Update student status (approve/reject)
// @route   PUT /api/students/:id/status
// @access  Private/Admin
export const updateStudentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, approved, or rejected'
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
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
      message: `Student status updated to ${status}`,
      data: student
    });

  } catch (error) {
    console.error('Update student status error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Update student information
// @route   PUT /api/students/:id
// @access  Private/Admin
export const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updateData = req.body;

    // Remove password from update data for security
    delete updateData.password;

    // Check if updating email or phone, ensure they're not already taken by another student
    if (updateData.email || updateData.studentPhone) {
      const existingStudent = await Student.findOne({
        $or: [
          updateData.email ? { email: updateData.email } : null,
          updateData.studentPhone ? { studentPhone: updateData.studentPhone } : null
        ].filter(Boolean),
        _id: { $ne: studentId }
      });

      if (existingStudent) {
        const duplicateField = existingStudent.email === updateData.email ? 'email' : 'phone number';
        return res.status(400).json({
          success: false,
          message: `A student with this ${duplicateField} already exists`
        });
      }
    }

    // Check for duplicate scholar number if provided
    if (updateData.scholarNumber) {
      const existingScholar = await Student.findOne({ 
        scholarNumber: updateData.scholarNumber,
        _id: { $ne: studentId }
      });
      if (existingScholar) {
        return res.status(400).json({
          success: false,
          message: 'A student with this scholar number already exists'
        });
      }
    }

    // Check for duplicate Aadhar number if provided
    if (updateData.aadharNumber) {
      const existingAadhar = await Student.findOne({ 
        aadharNumber: updateData.aadharNumber,
        _id: { $ne: studentId }
      });
      if (existingAadhar) {
        return res.status(400).json({
          success: false,
          message: 'A student with this Aadhar number already exists'
        });
      }
    }

    // Convert date string to Date object if provided
    if (updateData.dateOfJoining) {
      updateData.dateOfJoining = new Date(updateData.dateOfJoining);
    }

    // Remove empty/null values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === '' || updateData[key] === null || updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });

  } catch (error) {
    console.error('Update student error:', error);
    
    if (error.code === 11000) {
      // Duplicate key error
      const duplicateField = Object.keys(error.keyPattern)[0];
      let fieldName = duplicateField;
      
      if (duplicateField === 'studentPhone') fieldName = 'phone number';
      if (duplicateField === 'aadharNumber') fieldName = 'Aadhar number';
      if (duplicateField === 'scholarNumber') fieldName = 'scholar number';
      
      return res.status(400).json({
        success: false,
        message: `A student with this ${fieldName} already exists`
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
        message: 'Invalid student ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });

  } catch (error) {
    console.error('Delete student error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Get student statistics
// @route   GET /api/students/stats
// @access  Private/Admin
export const getStudentStats = async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalStudents = await Student.countDocuments();
    
    // Format stats
    const formattedStats = {
      total: totalStudents,
      pending: 0,
      approved: 0,
      rejected: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: formattedStats
    });

  } catch (error) {
    console.error('Get student stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};