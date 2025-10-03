import {
  getAllStudents,
  getStudentById,
  updateStudentStatus,
  deleteStudent,
  getStudentStats
} from './studentController.js';

// Wrapper function for approving students
export const approveStudent = async (req, res) => {
  try {
    // Set the status to approved in the request body
    req.body = { ...req.body, status: 'approved' };
    
    // Call the existing updateStudentStatus function
    await updateStudentStatus(req, res);
  } catch (error) {
    console.error('Approve student error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while approving student'
    });
  }
};

// Wrapper function for rejecting students
export const rejectStudent = async (req, res) => {
  try {
    // Set the status to rejected in the request body
    req.body = { ...req.body, status: 'rejected' };
    
    // Call the existing updateStudentStatus function
    await updateStudentStatus(req, res);
  } catch (error) {
    console.error('Reject student error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while rejecting student'
    });
  }
};

// Re-export the functions from studentController for admin use
export {
  getAllStudents as getStudentsForAdmin,
  getStudentById as getStudentByIdForAdmin,
  updateStudentStatus as updateStudentStatusForAdmin,
  deleteStudent as deleteStudentForAdmin,
  getStudentStats as getStudentStatsForAdmin
} from './studentController.js';

// Additional admin-specific functions can be added here
export const getAdminDashboardStats = async (req, res) => {
  try {
    // Get comprehensive stats for admin dashboard
    const stats = await getStudentStats(req, res);
    // Could add more admin-specific statistics here
    return stats;
  } catch (error) {
    console.error('Get admin dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching admin stats'
    });
  }
};