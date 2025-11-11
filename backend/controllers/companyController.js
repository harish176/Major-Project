import Companies from '../models/Comapnies.js';

// Get all companies with filtering and pagination
export const getAllCompanies = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      year,
      branch,
      course,
      interviewMode,
      search,
      isActive
    } = req.query;

    // Build filter object - only add isActive filter if explicitly provided
    const filter = {};
    
    // Only filter by isActive if explicitly provided
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true' || isActive === true;
    }
    
    // Add search functionality
    if (search) {
      filter.$or = [
        { companyName: new RegExp(search, 'i') },
        { 'companyDetails.industry': new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Year-specific filters
    if (year || branch || course || interviewMode) {
      const yearFilter = {};
      if (year) yearFilter['yearlyData.year'] = parseInt(year);
      if (branch) yearFilter['yearlyData.branchesAllowed'] = { $in: [branch, 'All Branches'] };
      if (course) yearFilter['yearlyData.coursesAllowed'] = { $in: [course, 'All Courses'] };
      if (interviewMode) yearFilter['yearlyData.interviewMode'] = interviewMode;
      
      Object.assign(filter, yearFilter);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const companies = await Companies.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Companies.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        companies,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCompanies: total,
          hasMore: parseInt(page) < totalPages
        }
      }
    });
  } catch (error) {
    console.error('Get all companies error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch companies',
      error: error.message
    });
  }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Companies.findById(id).select('-__v');
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    console.error('Get company by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company',
      error: error.message
    });
  }
};

// Create new company
export const createCompany = async (req, res) => {
  try {
    const companyData = req.body;

    // Validate required fields
    if (!companyData.companyName) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required'
      });
    }

    if (!companyData.yearlyData || companyData.yearlyData.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one yearly data entry is required'
      });
    }

    // Check if company already exists
    const existingCompany = await Companies.findOne({ 
      companyName: new RegExp(`^${companyData.companyName}$`, 'i') 
    });
    
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: 'Company with this name already exists'
      });
    }

    // Create new company
    const newCompany = new Companies(companyData);
    await newCompany.save();

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: newCompany
    });
  } catch (error) {
    console.error('Create company error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create company',
      error: error.message
    });
  }
};

// Update company
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if company exists
    const existingCompany = await Companies.findById(id);
    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Check for duplicate company name (excluding current company)
    if (updateData.companyName) {
      const duplicateCompany = await Companies.findOne({ 
        companyName: new RegExp(`^${updateData.companyName}$`, 'i'),
        _id: { $ne: id }
      });
      
      if (duplicateCompany) {
        return res.status(400).json({
          success: false,
          message: 'Company with this name already exists'
        });
      }
    }

    // Update company
    const updatedCompany = await Companies.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    res.status(200).json({
      success: true,
      message: 'Company updated successfully',
      data: updatedCompany
    });
  } catch (error) {
    console.error('Update company error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update company',
      error: error.message
    });
  }
};

// Delete company (soft delete)
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Companies.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Soft delete by setting isActive to false
    const deletedCompany = await Companies.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Company deleted successfully',
      data: deletedCompany
    });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete company',
      error: error.message
    });
  }
};

// Permanently delete company (hard delete)
export const permanentlyDeleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Companies.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    await Companies.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Company permanently deleted'
    });
  } catch (error) {
    console.error('Permanently delete company error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to permanently delete company',
      error: error.message
    });
  }
};

// Get companies by date range
export const getCompaniesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const companies = await Companies.findByDateRange(
      new Date(startDate),
      new Date(endDate)
    );

    res.status(200).json({
      success: true,
      data: companies
    });
  } catch (error) {
    console.error('Get companies by date range error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch companies by date range',
      error: error.message
    });
  }
};

// Get companies by branch
export const getCompaniesByBranch = async (req, res) => {
  try {
    const { branch } = req.params;
    const { year } = req.query;
    
    const companies = await Companies.findByBranch(branch, year ? parseInt(year) : null);

    res.status(200).json({
      success: true,
      data: companies
    });
  } catch (error) {
    console.error('Get companies by branch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch companies by branch',
      error: error.message
    });
  }
};

// Get companies by course
export const getCompaniesByCourse = async (req, res) => {
  try {
    const { course } = req.params;
    const { year } = req.query;
    
    const companies = await Companies.findByCourse(course, year ? parseInt(year) : null);

    res.status(200).json({
      success: true,
      data: companies
    });
  } catch (error) {
    console.error('Get companies by course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch companies by course',
      error: error.message
    });
  }
};

// Add yearly data to existing company
export const addYearlyData = async (req, res) => {
  try {
    const { id } = req.params;
    const yearlyData = req.body;

    const company = await Companies.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    await company.addYearlyData(yearlyData);

    res.status(200).json({
      success: true,
      message: 'Yearly data added successfully',
      data: company
    });
  } catch (error) {
    console.error('Add yearly data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add yearly data',
      error: error.message
    });
  }
};

// Get company statistics
export const getCompanyStats = async (req, res) => {
  try {
    const totalCompanies = await Companies.countDocuments({ isActive: true });
    
    const companiesByIndustry = await Companies.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$companyDetails.industry', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const companiesByYear = await Companies.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$yearlyData' },
      { $group: { _id: '$yearlyData.year', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    const avgPackageByYear = await Companies.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$yearlyData' },
      { $group: { 
        _id: '$yearlyData.year', 
        avgPackage: { $avg: '$yearlyData.package.ctc' },
        maxPackage: { $max: '$yearlyData.package.ctc' },
        minPackage: { $min: '$yearlyData.package.ctc' }
      }},
      { $sort: { _id: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCompanies,
        companiesByIndustry,
        companiesByYear,
        avgPackageByYear
      }
    });
  } catch (error) {
    console.error('Get company stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company statistics',
      error: error.message
    });
  }
};

// Restore deleted company
export const restoreCompany = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Companies.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    const restoredCompany = await Companies.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Company restored successfully',
      data: restoredCompany
    });
  } catch (error) {
    console.error('Restore company error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to restore company',
      error: error.message
    });
  }
};