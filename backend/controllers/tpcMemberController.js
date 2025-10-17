import TPCMember from '../models/TPCMember.js';

// Get all TPC members with filtering and pagination
export const getAllTPCMembers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      department,
      team,
      role,
      session,
      status = 'active',
      search
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (department) filter.department = new RegExp(department, 'i');
    if (team) filter.team = new RegExp(team, 'i');
    if (role) filter.role = role;
    if (session) filter.session = { $in: [session] };
    
    // Add search functionality
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { department: new RegExp(search, 'i') },
        { team: new RegExp(search, 'i') },
        { contact_no: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const members = await TPCMember.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await TPCMember.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        members,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalMembers: total,
          hasMore: parseInt(page) < totalPages
        }
      }
    });
  } catch (error) {
    console.error('Get all TPC members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch TPC members',
      error: error.message
    });
  }
};

// Get TPC member by ID
export const getTPCMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await TPCMember.findById(id).select('-__v');
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'TPC member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Get TPC member by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch TPC member',
      error: error.message
    });
  }
};

// Create new TPC member
export const createTPCMember = async (req, res) => {
  try {
    const memberData = req.body;

    // Create new member
    const newMember = new TPCMember(memberData);
    await newMember.save();

    res.status(201).json({
      success: true,
      message: 'TPC member created successfully',
      data: newMember
    });
  } catch (error) {
    console.error('Create TPC member error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to create TPC member',
      error: error.message
    });
  }
};

// Update TPC member
export const updateTPCMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if member exists
    const existingMember = await TPCMember.findById(id);
    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: 'TPC member not found'
      });
    }

    // Update member
    const updatedMember = await TPCMember.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: false }
    ).select('-__v');

    res.status(200).json({
      success: true,
      message: 'TPC member updated successfully',
      data: updatedMember
    });
  } catch (error) {
    console.error('Update TPC member error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to update TPC member',
      error: error.message
    });
  }
};

// Delete TPC member (soft delete)
export const deleteTPCMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await TPCMember.findById(id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'TPC member not found'
      });
    }

    // Soft delete by setting status to inactive
    const deletedMember = await TPCMember.findByIdAndUpdate(
      id,
      { 
        status: 'inactive',
        isActive: false
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'TPC member deleted successfully',
      data: deletedMember
    });
  } catch (error) {
    console.error('Delete TPC member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete TPC member',
      error: error.message
    });
  }
};

// Permanently delete TPC member (hard delete)
export const permanentlyDeleteTPCMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await TPCMember.findById(id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'TPC member not found'
      });
    }

    await TPCMember.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'TPC member permanently deleted'
    });
  } catch (error) {
    console.error('Permanently delete TPC member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to permanently delete TPC member',
      error: error.message
    });
  }
};

// Get TPC members by category
export const getTPCMembersByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const members = await TPCMember.findByCategory(category)
      .sort({ name: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Get TPC members by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch TPC members by category',
      error: error.message
    });
  }
};

// Get TPC members by team
export const getTPCMembersByTeam = async (req, res) => {
  try {
    const { team } = req.params;
    
    const members = await TPCMember.findByTeam(team)
      .sort({ name: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Get TPC members by team error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch TPC members by team',
      error: error.message
    });
  }
};

// Get TPC members by session
export const getTPCMembersBySession = async (req, res) => {
  try {
    const { session } = req.params;
    
    const members = await TPCMember.findBySession(session)
      .sort({ name: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Get TPC members by session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch TPC members by session',
      error: error.message
    });
  }
};

// Get TPC statistics
export const getTPCStats = async (req, res) => {
  try {
    const totalMembers = await TPCMember.countDocuments({ isActive: true });
    
    const membersByCategory = await TPCMember.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const membersByRole = await TPCMember.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const membersByDepartment = await TPCMember.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalMembers,
        membersByCategory,
        membersByRole,
        membersByDepartment
      }
    });
  } catch (error) {
    console.error('Get TPC stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch TPC statistics',
      error: error.message
    });
  }
};

// Restore deleted member
export const restoreTPCMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await TPCMember.findById(id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'TPC member not found'
      });
    }

    const restoredMember = await TPCMember.findByIdAndUpdate(
      id,
      { 
        status: 'active',
        isActive: true
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'TPC member restored successfully',
      data: restoredMember
    });
  } catch (error) {
    console.error('Restore TPC member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to restore TPC member',
      error: error.message
    });
  }
};