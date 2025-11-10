import React, { useState, useEffect } from 'react';
import { FaUsers, FaSearch, FaEye, FaEdit, FaCheck, FaTimes, FaTrash, FaChevronLeft, FaChevronRight, FaGraduationCap, FaPhone, FaEnvelope, FaIdCard, FaCalendarAlt, FaMapMarkerAlt, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess, showLoading, dismissToast } from '../../utils/toast.js';
import { adminAPI } from '../../utils/api.js';
import AdminNavbar from './AdminNavbar.jsx';

const AdminStudents = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({});
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    studentName: '',
    email: '',
    studentPhone: '',
    scholarNumber: '',
    branch: '',
    degree: '',
    dateOfJoining: '',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    category: '',
    income: '',
    jeeMainRank: '',
    jeeAdvancedRank: '',
    state: '',
    city: '',
    pincode: '',
    nationality: '',
    motherTongue: '',
    aadharNumber: '',
    status: ''
  });

  // Check authentication and get user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin') {
        showError('Access denied. Admin privileges required.');
        navigate('/login');
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Fetch students
  useEffect(() => {
    if (user) {
      fetchStudents();
      fetchStats();
    }
  }, [user]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getStudents({
        limit: 100, // Fetch more students for better overview
        search: searchTerm,
        status: filterStatus !== 'all' ? filterStatus : undefined
      });

      if (response.data.success) {
        setStudents(response.data.data || []);
      } else {
        showError('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      showError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStudentStats();
      if (response.data.success) {
        setStats(response.data.data || {});
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === '' ||
      student.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.scholarNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentPhone?.includes(searchTerm) ||
      student.branch?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setEditForm({
      studentName: student.studentName || '',
      email: student.email || '',
      studentPhone: student.studentPhone || '',
      scholarNumber: student.scholarNumber || '',
      branch: student.branch || '',
      degree: student.degree || '',
      dateOfJoining: student.dateOfJoining ? student.dateOfJoining.split('T')[0] : '',
      fatherName: student.fatherName || '',
      fatherPhone: student.fatherPhone || '',
      motherName: student.motherName || '',
      fatherOccupation: student.fatherOccupation || '',
      motherOccupation: student.motherOccupation || '',
      category: student.category || '',
      income: student.income || '',
      jeeMainRank: student.jeeMainRank || '',
      jeeAdvancedRank: student.jeeAdvancedRank || '',
      state: student.state || '',
      city: student.city || '',
      pincode: student.pincode || '',
      nationality: student.nationality || '',
      motherTongue: student.motherTongue || '',
      aadharNumber: student.aadharNumber || '',
      status: student.status || ''
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent) return;

    setUpdating(true);
    const loadingToast = showLoading('Updating student...');

    try {
      // Prepare update data
      const updateData = { ...editForm };
      
      // Convert empty strings to null for optional fields
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === '') {
          updateData[key] = null;
        }
      });

      // Convert numeric fields
      if (updateData.income) updateData.income = parseFloat(updateData.income);
      if (updateData.jeeMainRank) updateData.jeeMainRank = parseInt(updateData.jeeMainRank);
      if (updateData.jeeAdvancedRank) updateData.jeeAdvancedRank = parseInt(updateData.jeeAdvancedRank);
      
      // Convert date
      if (updateData.dateOfJoining) {
        updateData.dateOfJoining = new Date(updateData.dateOfJoining).toISOString();
      }

      await adminAPI.updateStudent(editingStudent._id, updateData);
      showSuccess('Student updated successfully');
      fetchStudents();
      fetchStats();
      setShowEditModal(false);
      setEditingStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
      if (error.response?.data?.message) {
        showError(error.response.data.message);
      } else {
        showError('Failed to update student');
      }
    } finally {
      setUpdating(false);
      dismissToast(loadingToast);
    }
  };

  const handleApproveStudent = async (studentId) => {
    const loadingToast = showLoading('Approving student...');
    try {
      await adminAPI.approveStudent(studentId);
      showSuccess('Student approved successfully');
      fetchStudents();
      fetchStats();
    } catch (error) {
      console.error('Error approving student:', error);
      showError('Failed to approve student');
    } finally {
      dismissToast(loadingToast);
    }
  };

  const handleRejectStudent = async (studentId) => {
    const loadingToast = showLoading('Rejecting student...');
    try {
      await adminAPI.rejectStudent(studentId);
      showSuccess('Student rejected successfully');
      fetchStudents();
      fetchStats();
    } catch (error) {
      console.error('Error rejecting student:', error);
      showError('Failed to reject student');
    } finally {
      dismissToast(loadingToast);
    }
  };

  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;

    setDeleting(true);
    const loadingToast = showLoading('Deleting student...');

    try {
      await adminAPI.deleteStudent(studentToDelete._id);
      showSuccess('Student deleted successfully');
      fetchStudents();
      fetchStats();
      setShowDeleteModal(false);
      setStudentToDelete(null);
    } catch (error) {
      console.error('Error deleting student:', error);
      showError('Failed to delete student');
    } finally {
      setDeleting(false);
      dismissToast(loadingToast);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusClasses[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
      </span>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar user={user} />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage student registrations and approvals
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaUsers className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Students
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalStudents || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaCheck className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Approved
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.approvedStudents || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaCalendarAlt className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.pendingStudents || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaTimes className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Rejected
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.rejectedStudents || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by name, email, scholar number, phone..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="flex-shrink-0">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading students...</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <FaUsers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No students found matching your criteria.</p>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-gray-200">
                  {currentStudents.map((student) => (
                    <li key={student._id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            {student.studentPhotoUrl ? (
                              <img 
                                className="h-12 w-12 rounded-full object-cover" 
                                src={student.studentPhotoUrl} 
                                alt={student.studentName}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.studentName)}&background=3b82f6&color=fff`;
                                }}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                                {student.studentName?.charAt(0)?.toUpperCase() || 'S'}
                              </div>
                            )}
                          </div>

                          {/* Student Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {student.studentName}
                              </h3>
                              {getStatusBadge(student.status)}
                            </div>
                            <div className="mt-1 flex flex-col sm:flex-row sm:space-x-4 text-xs text-gray-500">
                              <div className="flex items-center">
                                <FaEnvelope className="mr-1" />
                                {student.email}
                              </div>
                              {student.scholarNumber && (
                                <div className="flex items-center">
                                  <FaIdCard className="mr-1" />
                                  {student.scholarNumber}
                                </div>
                              )}
                              {student.branch && (
                                <div className="flex items-center">
                                  <FaGraduationCap className="mr-1" />
                                  {student.branch}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewStudent(student)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50"
                            title="View Details"
                          >
                            <FaEye className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleEditStudent(student)}
                            className="text-yellow-600 hover:text-yellow-900 p-2 rounded-md hover:bg-yellow-50"
                            title="Edit Student"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>

                          {student.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveStudent(student._id)}
                                className="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50"
                                title="Approve"
                              >
                                <FaCheck className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleRejectStudent(student._id)}
                                className="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
                                title="Reject"
                              >
                                <FaTimes className="h-4 w-4" />
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => handleDeleteStudent(student)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
                            title="Delete"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                          <span className="font-medium">{Math.min(endIndex, filteredStudents.length)}</span> of{' '}
                          <span className="font-medium">{filteredStudents.length}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaChevronLeft className="h-4 w-4" />
                          </button>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNumber = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i));
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === pageNumber
                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          })}
                          <button
                            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaChevronRight className="h-4 w-4" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Student Details
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {selectedStudent.studentName}</div>
                  <div><strong>Email:</strong> {selectedStudent.email}</div>
                  <div><strong>Phone:</strong> {selectedStudent.studentPhone}</div>
                  {selectedStudent.scholarNumber && (
                    <div><strong>Scholar Number:</strong> {selectedStudent.scholarNumber}</div>
                  )}
                  <div><strong>Status:</strong> {getStatusBadge(selectedStudent.status)}</div>
                  <div><strong>Registration Date:</strong> {new Date(selectedStudent.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Academic Information</h4>
                <div className="space-y-2 text-sm">
                  {selectedStudent.branch && <div><strong>Branch:</strong> {selectedStudent.branch}</div>}
                  {selectedStudent.degree && <div><strong>Degree:</strong> {selectedStudent.degree}</div>}
                  {selectedStudent.dateOfJoining && (
                    <div><strong>Date of Joining:</strong> {new Date(selectedStudent.dateOfJoining).toLocaleDateString()}</div>
                  )}
                  {selectedStudent.jeeMainRank && <div><strong>JEE Main Rank:</strong> {selectedStudent.jeeMainRank}</div>}
                  {selectedStudent.jeeAdvancedRank && <div><strong>JEE Advanced Rank:</strong> {selectedStudent.jeeAdvancedRank}</div>}
                </div>
              </div>

              {/* Family Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Family Information</h4>
                <div className="space-y-2 text-sm">
                  {selectedStudent.fatherName && <div><strong>Father Name:</strong> {selectedStudent.fatherName}</div>}
                  {selectedStudent.fatherPhone && <div><strong>Father Phone:</strong> {selectedStudent.fatherPhone}</div>}
                  {selectedStudent.motherName && <div><strong>Mother Name:</strong> {selectedStudent.motherName}</div>}
                  {selectedStudent.fatherOccupation && <div><strong>Father Occupation:</strong> {selectedStudent.fatherOccupation}</div>}
                  {selectedStudent.motherOccupation && <div><strong>Mother Occupation:</strong> {selectedStudent.motherOccupation}</div>}
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Address & Personal</h4>
                <div className="space-y-2 text-sm">
                  {selectedStudent.state && <div><strong>State:</strong> {selectedStudent.state}</div>}
                  {selectedStudent.city && <div><strong>City:</strong> {selectedStudent.city}</div>}
                  {selectedStudent.pincode && <div><strong>Pincode:</strong> {selectedStudent.pincode}</div>}
                  {selectedStudent.nationality && <div><strong>Nationality:</strong> {selectedStudent.nationality}</div>}
                  {selectedStudent.motherTongue && <div><strong>Mother Tongue:</strong> {selectedStudent.motherTongue}</div>}
                  {selectedStudent.category && <div><strong>Category:</strong> {selectedStudent.category}</div>}
                  {selectedStudent.aadharNumber && <div><strong>Aadhar Number:</strong> {selectedStudent.aadharNumber}</div>}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              {selectedStudent.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleRejectStudent(selectedStudent._id);
                      setShowViewModal(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleApproveStudent(selectedStudent._id);
                      setShowViewModal(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                </>
              )}
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && editingStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-6xl shadow-lg rounded-md bg-white">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Student - {editingStudent.studentName}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleUpdateStudent(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Basic Information */}
                <div className="col-span-full">
                  <h4 className="text-md font-medium text-gray-900 mb-3 border-b pb-2">Basic Information</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Student Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={editForm.studentName}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                  <input
                    type="tel"
                    name="studentPhone"
                    value={editForm.studentPhone}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Scholar Number</label>
                  <input
                    type="text"
                    name="scholarNumber"
                    value={editForm.scholarNumber}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Academic Information */}
                <div className="col-span-full">
                  <h4 className="text-md font-medium text-gray-900 mb-3 border-b pb-2 mt-6">Academic Information</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Branch</label>
                  <select
                    name="branch"
                    value={editForm.branch}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Branch</option>
                    <option value="Computer Science Engineering">Computer Science Engineering</option>
                    <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Architecture & Planning">Architecture & Planning</option>
                    <option value="Information Technology">Information Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <select
                    name="degree"
                    value={editForm.degree}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Degree</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="PhD">PhD</option>
                    <option value="B.Arch">B.Arch</option>
                    <option value="M.Arch">M.Arch</option>
                    <option value="MCA">MCA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
                  <input
                    type="date"
                    name="dateOfJoining"
                    value={editForm.dateOfJoining}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">JEE Main Rank</label>
                  <input
                    type="number"
                    name="jeeMainRank"
                    value={editForm.jeeMainRank}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">JEE Advanced Rank</label>
                  <input
                    type="number"
                    name="jeeAdvancedRank"
                    value={editForm.jeeAdvancedRank}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Family Information */}
                <div className="col-span-full">
                  <h4 className="text-md font-medium text-gray-900 mb-3 border-b pb-2 mt-6">Family Information</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Father Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={editForm.fatherName}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Father Phone</label>
                  <input
                    type="tel"
                    name="fatherPhone"
                    value={editForm.fatherPhone}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother Name</label>
                  <input
                    type="text"
                    name="motherName"
                    value={editForm.motherName}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Father Occupation</label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    value={editForm.fatherOccupation}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother Occupation</label>
                  <input
                    type="text"
                    name="motherOccupation"
                    value={editForm.motherOccupation}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Family Income (Annual)</label>
                  <input
                    type="number"
                    name="income"
                    value={editForm.income}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Address Information */}
                <div className="col-span-full">
                  <h4 className="text-md font-medium text-gray-900 mb-3 border-b pb-2 mt-6">Address & Personal Information</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={editForm.state}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={editForm.city}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={editForm.pincode}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={editForm.nationality}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother Tongue</label>
                  <input
                    type="text"
                    name="motherTongue"
                    value={editForm.motherTongue}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={editForm.aadharNumber}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={updating}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <FaSave className="mr-2 h-4 w-4" />
                  {updating ? 'Updating...' : 'Update Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && studentToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Delete Student
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900">
                    {studentToDelete.studentName}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    disabled={deleting}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 text-base font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteStudent}
                    disabled={deleting}
                    className="flex-1 px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;