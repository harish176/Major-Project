import Placement from '../models/Placement.js';
import Student from '../models/Student.js';
import Companies from '../models/Comapnies.js';
import { validationResult } from 'express-validator';

// Get all placements
export const getAllPlacements = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, placementType, minPackage, maxPackage, status } = req.query;

    // Build query object
    let query = { isActive: true };

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
        { scholarNumber: { $regex: search, $options: 'i' } }
      ];
    }

    if (placementType) {
      query.placementType = placementType;
    }

    if (status) {
      query.status = status;
    }

    if (minPackage || maxPackage) {
      query.package = {};
      if (minPackage) query.package.$gte = parseFloat(minPackage);
      if (maxPackage) query.package.$lte = parseFloat(maxPackage);
    }

    const placements = await Placement.find(query)
      .populate('student', 'name email branch degree studentPhone category dateOfJoining jeeMainRank jeeAdvancedRank scholarNumber')
      .populate('company', 'companyName companyDetails')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Placement.countDocuments(query);

    res.status(200).json({
      success: true,
      data: placements,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching placements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch placements',
      error: error.message
    });
  }
};

// Get placement by ID
export const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id)
      .populate('student', 'name email branch degree studentPhone category dateOfJoining jeeMainRank jeeAdvancedRank scholarNumber')
      .populate('company', 'companyName companyDetails contactInfo');

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    res.status(200).json({
      success: true,
      data: placement
    });
  } catch (error) {
    console.error('Error fetching placement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch placement',
      error: error.message
    });
  }
};

// Create new placement
export const createPlacement = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    let placementData = { ...req.body };

    // Clean up the data - convert empty strings to null/undefined for optional fields
    if (placementData.stipend === '' || placementData.stipend === undefined) {
      delete placementData.stipend;
    }

    if (placementData.offerDate === '' || placementData.offerDate === undefined) {
      delete placementData.offerDate;
    }

    if (placementData.joiningDate === '' || placementData.joiningDate === undefined) {
      delete placementData.joiningDate;
    }

    if (placementData.notes === '' || placementData.notes === undefined) {
      delete placementData.notes;
    }

    // Clean up packageDetails
    if (placementData.packageDetails) {
      if (placementData.packageDetails.breakdown) {
        Object.keys(placementData.packageDetails.breakdown).forEach(key => {
          if (placementData.packageDetails.breakdown[key] === '' || placementData.packageDetails.breakdown[key] === undefined) {
            delete placementData.packageDetails.breakdown[key];
          }
        });
        
        // If breakdown is empty, remove packageDetails.breakdown
        if (Object.keys(placementData.packageDetails.breakdown).length === 0) {
          delete placementData.packageDetails.breakdown;
        }
      }
      
      // If packageDetails only has currency, just keep currency
      if (Object.keys(placementData.packageDetails).length === 1 && placementData.packageDetails.currency) {
        // Keep only currency
      } else if (Object.keys(placementData.packageDetails).length === 0) {
        delete placementData.packageDetails;
      }
    }

    // Clean up jobDetails
    if (placementData.jobDetails) {
      Object.keys(placementData.jobDetails).forEach(key => {
        if (placementData.jobDetails[key] === '' || placementData.jobDetails[key] === undefined) {
          delete placementData.jobDetails[key];
        }
      });
      
      // If jobDetails is empty, remove it
      if (Object.keys(placementData.jobDetails).length === 0) {
        delete placementData.jobDetails;
      }
    }

    console.log('Cleaned placement data:', placementData);

    // Validate student exists
    if (placementData.scholarNumber) {
      const student = await Student.findOne({ scholarNumber: placementData.scholarNumber });
      if (!student) {
        return res.status(400).json({
          success: false,
          message: 'Student not found with the provided scholar number'
        });
      }
      placementData.student = student._id;
      // Auto-populate studentName from the found student record
      if (student.name) {
        placementData.studentName = student.name;
      }
    }

    // Validate company exists
    if (placementData.companyName) {
      const company = await Companies.findOne({ 
        companyName: new RegExp(`^${placementData.companyName}$`, 'i') 
      });
      if (company) {
        placementData.company = company._id;
      }
    }

    const placement = new Placement(placementData);
    await placement.save();

    const populatedPlacement = await Placement.findById(placement._id)
      .populate('student', 'name email branch degree studentPhone category dateOfJoining jeeMainRank jeeAdvancedRank scholarNumber')
      .populate('company', 'companyName companyDetails');

    res.status(201).json({
      success: true,
      message: 'Placement created successfully',
      data: populatedPlacement
    });
  } catch (error) {
    console.error('Error creating placement:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate entry detected',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create placement',
      error: error.message
    });
  }
};

// Update placement
export const updatePlacement = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const placementId = req.params.id;
    let updateData = { ...req.body };

    // Clean up the data - convert empty strings to null/undefined for optional fields
    if (updateData.stipend === '' || updateData.stipend === undefined) {
      delete updateData.stipend;
    }

    if (updateData.offerDate === '' || updateData.offerDate === undefined) {
      delete updateData.offerDate;
    }

    if (updateData.joiningDate === '' || updateData.joiningDate === undefined) {
      delete updateData.joiningDate;
    }

    if (updateData.notes === '' || updateData.notes === undefined) {
      delete updateData.notes;
    }

    // Clean up packageDetails
    if (updateData.packageDetails) {
      if (updateData.packageDetails.breakdown) {
        Object.keys(updateData.packageDetails.breakdown).forEach(key => {
          if (updateData.packageDetails.breakdown[key] === '' || updateData.packageDetails.breakdown[key] === undefined) {
            delete updateData.packageDetails.breakdown[key];
          }
        });
        
        // If breakdown is empty, remove packageDetails.breakdown
        if (Object.keys(updateData.packageDetails.breakdown).length === 0) {
          delete updateData.packageDetails.breakdown;
        }
      }
      
      // If packageDetails only has currency, just keep currency
      if (Object.keys(updateData.packageDetails).length === 1 && updateData.packageDetails.currency) {
        // Keep only currency
      } else if (Object.keys(updateData.packageDetails).length === 0) {
        delete updateData.packageDetails;
      }
    }

    // Clean up jobDetails
    if (updateData.jobDetails) {
      Object.keys(updateData.jobDetails).forEach(key => {
        if (updateData.jobDetails[key] === '' || updateData.jobDetails[key] === undefined) {
          delete updateData.jobDetails[key];
        }
      });
      
      // If jobDetails is empty, remove it
      if (Object.keys(updateData.jobDetails).length === 0) {
        delete updateData.jobDetails;
      }
    }

    console.log('Cleaned update data:', updateData);

    // Validate student exists if scholarNumber is being updated
    if (updateData.scholarNumber) {
      const student = await Student.findOne({ scholarNumber: updateData.scholarNumber });
      if (!student) {
        return res.status(400).json({
          success: false,
          message: 'Student not found with the provided scholar number'
        });
      }
      updateData.student = student._id;
      // Auto-populate studentName from the found student record
      if (student.name) {
        updateData.studentName = student.name;
      }
    }

    // Validate company exists if companyName is being updated
    if (updateData.companyName) {
      const company = await Companies.findOne({ 
        companyName: new RegExp(`^${updateData.companyName}$`, 'i') 
      });
      if (company) {
        updateData.company = company._id;
      }
    }

    const placement = await Placement.findByIdAndUpdate(
      placementId,
      updateData,
      { new: true, runValidators: true }
    ).populate('student', 'name email branch degree studentPhone category dateOfJoining jeeMainRank jeeAdvancedRank scholarNumber')
     .populate('company', 'companyName companyDetails');

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Placement updated successfully',
      data: placement
    });
  } catch (error) {
    console.error('Error updating placement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update placement',
      error: error.message
    });
  }
};

// Delete placement (soft delete)
export const deletePlacement = async (req, res) => {
  try {
    const placementId = req.params.id;

    const placement = await Placement.findByIdAndUpdate(
      placementId,
      { isActive: false },
      { new: true }
    );

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Placement deactivated successfully'
    });
  } catch (error) {
    console.error('Error deleting placement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete placement',
      error: error.message
    });
  }
};

// Permanently delete placement (hard delete)
export const permanentlyDeletePlacement = async (req, res) => {
  try {
    const placementId = req.params.id;

    const placement = await Placement.findById(placementId);
    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    await Placement.findByIdAndDelete(placementId);

    res.status(200).json({
      success: true,
      message: 'Placement permanently deleted'
    });
  } catch (error) {
    console.error('Error permanently deleting placement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to permanently delete placement',
      error: error.message
    });
  }
};

// Get placement statistics
export const getPlacementStats = async (req, res) => {
  try {
    const stats = await Placement.getStats();
    
    // Get placement type distribution
    const typeStats = await Placement.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$placementType',
          count: { $sum: 1 },
          avgPackage: { $avg: '$package' },
          maxPackage: { $max: '$package' }
        }
      }
    ]);

    // Get top companies by placement count
    const topCompanies = await Placement.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$companyName',
          count: { $sum: 1 },
          avgPackage: { $avg: '$package' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overall: stats,
        byType: typeStats,
        topCompanies
      }
    });
  } catch (error) {
    console.error('Error fetching placement stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch placement statistics',
      error: error.message
    });
  }
};

// Get placements by student
export const getPlacementsByStudent = async (req, res) => {
  try {
    const { scholarNumber } = req.params;

    const placements = await Placement.find({ 
      scholarNumber,
      isActive: true 
    }).populate('company', 'companyName companyDetails')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: placements
    });
  } catch (error) {
    console.error('Error fetching student placements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student placements',
      error: error.message
    });
  }
};

// Get placements by company
export const getPlacementsByCompany = async (req, res) => {
  try {
    const { companyName } = req.params;

    const placements = await Placement.find({ 
      companyName: new RegExp(companyName, 'i'),
      isActive: true 
    }).populate('student', 'name email branch degree studentPhone category dateOfJoining jeeMainRank jeeAdvancedRank scholarNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: placements
    });
  } catch (error) {
    console.error('Error fetching company placements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company placements',
      error: error.message
    });
  }
};