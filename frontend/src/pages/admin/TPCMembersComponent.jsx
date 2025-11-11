import React, { useState, useEffect } from 'react';
import { FaUsers, FaPlus, FaEdit, FaTrash, FaSearch, FaUser, FaTimes } from 'react-icons/fa';
import { showError, showSuccess, showLoading, dismissToast } from '../../utils/toast.js';
import { tpcMemberAPI } from '../../utils/api.js';

const TPCMembersComponent = () => {
  const [tpcMembers, setTpcMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  const [memberFormData, setMemberFormData] = useState({
    name: '',
    contact_no: '',
    department: '',
    team: '',
    role: 'Member',
    category: 'faculty',
    session: ['2025-2026'],
    email: '',
    studentInfo: {
      rollNumber: '',
      year: '',
      semester: ''
    },
    facultyInfo: {
      employeeId: '',
      designation: ''
    },
    responsibilities: [],
    notes: ''
  });

  useEffect(() => {
    fetchTPCMembers();
  }, []);

  // Fetch TPC members from API
  const fetchTPCMembers = async (showRefreshMessage = false) => {
    setLoading(true);
    try {
      const response = await tpcMemberAPI.getAllMembers({
        limit: 100,
        page: 1
      });
      
      if (response.data.success) {
        const membersData = response.data.data.members || [];
        setTpcMembers(membersData);
        
        if (showRefreshMessage) {
          showSuccess(`Refreshed! Found ${membersData.length} TPC member records`);
        }
      } else {
        throw new Error(response.data.message || 'Failed to fetch TPC members');
      }
    } catch (error) {
      console.error('Error fetching TPC members:', error);
      
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
        
        if (error.response.status === 404) {
          showError('TPC Members API endpoint not found. Check if backend is running.');
        } else if (error.response.status === 500) {
          showError('Server error. Check backend logs.');
        } else if (error.response.status === 401) {
          showError('Authentication error. Please login again.');
        } else {
          showError(`Error: ${error.response.data?.message || 'Failed to fetch TPC members'}`);
        }
      } else if (error.request) {
        console.error('Network error:', error.request);
        showError('Network error. Check if backend is running on http://localhost:5000');
      } else {
        console.error('Request setup error:', error.message);
        showError('Request error: ' + error.message);
      }
      
      setTpcMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle member form functions
  const handleMemberFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setMemberFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setMemberFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSessionChange = (sessions) => {
    // Ensure sessions is always an array and validate format
    const sessionArray = Array.isArray(sessions) ? sessions : [sessions];
    const validSessions = sessionArray.filter(session => {
      return session && session.trim() && /^\d{4}-\d{4}$/.test(session.trim());
    });
    
    setMemberFormData(prev => ({
      ...prev,
      session: validSessions.length > 0 ? validSessions : ['2025-2026']
    }));
  };

  const handleAddMember = () => {
    setShowMemberForm(true);
  };

  const handleSaveMember = async () => {
    try {
      // Validate required fields
      if (!memberFormData.name?.trim() || !memberFormData.contact_no?.trim() || !memberFormData.department?.trim() || !memberFormData.team?.trim()) {
        showError('Please fill in all required fields (Name, Contact, Department, Team)');
        return;
      }

      // Validate contact number
      if (!/^\d{10}$/.test(memberFormData.contact_no)) {
        showError('Please enter a valid 10-digit contact number');
        return;
      }

      // Validate session format
      if (!memberFormData.session || memberFormData.session.length === 0) {
        showError('Please provide at least one session');
        return;
      }

      const invalidSessions = memberFormData.session.filter(session => 
        !session || !session.trim() || !/^\d{4}-\d{4}$/.test(session.trim())
      );

      if (invalidSessions.length > 0) {
        showError('Please provide sessions in valid format (YYYY-YYYY, e.g., 2025-2026)');
        return;
      }

      // Validate email if provided
      if (memberFormData.email && memberFormData.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(memberFormData.email.trim())) {
          showError('Please provide a valid email address');
          return;
        }
      }

      const isEditing = editingMember !== null;
      const loadingToast = showLoading(isEditing ? 'Updating TPC member...' : 'Adding TPC member...');
      
      // Clean up the data before sending
      const cleanedData = {
        name: memberFormData.name.trim(),
        contact_no: memberFormData.contact_no.trim(),
        department: memberFormData.department.trim(),
        team: memberFormData.team.trim(),
        role: memberFormData.role,
        category: memberFormData.category,
        session: memberFormData.session.filter(s => s && s.trim()),
        // Only include email if it's not empty
        ...(memberFormData.email && memberFormData.email.trim() && {
          email: memberFormData.email.trim()
        }),
        // Only include notes if not empty
        ...(memberFormData.notes && memberFormData.notes.trim() && {
          notes: memberFormData.notes.trim()
        }),
        // Only include responsibilities if not empty
        ...(memberFormData.responsibilities && memberFormData.responsibilities.length > 0 && {
          responsibilities: memberFormData.responsibilities.filter(r => r && r.trim())
        })
      };

      // Add category-specific information only if fields are not empty
      if (memberFormData.category !== 'faculty') {
        const studentInfo = {};
        if (memberFormData.studentInfo.rollNumber && memberFormData.studentInfo.rollNumber.trim()) {
          studentInfo.rollNumber = memberFormData.studentInfo.rollNumber.trim();
        }
        if (memberFormData.studentInfo.year && memberFormData.studentInfo.year !== '') {
          studentInfo.year = parseInt(memberFormData.studentInfo.year);
        }
        if (memberFormData.studentInfo.semester && memberFormData.studentInfo.semester !== '') {
          studentInfo.semester = parseInt(memberFormData.studentInfo.semester);
        }
        
        // Only add studentInfo if it has at least one property
        if (Object.keys(studentInfo).length > 0) {
          cleanedData.studentInfo = studentInfo;
        }
      } else {
        const facultyInfo = {};
        if (memberFormData.facultyInfo.employeeId && memberFormData.facultyInfo.employeeId.trim()) {
          facultyInfo.employeeId = memberFormData.facultyInfo.employeeId.trim();
        }
        if (memberFormData.facultyInfo.designation && memberFormData.facultyInfo.designation.trim()) {
          facultyInfo.designation = memberFormData.facultyInfo.designation.trim();
        }
        
        // Only add facultyInfo if it has at least one property
        if (Object.keys(facultyInfo).length > 0) {
          cleanedData.facultyInfo = facultyInfo;
        }
      }

      let response;
      
      if (isEditing) {
        response = await tpcMemberAPI.updateMember(editingMember._id || editingMember.id, cleanedData);
      } else {
        response = await tpcMemberAPI.createMember(cleanedData);
      }
      
      if (response.data.success) {
        dismissToast(loadingToast);
        const successMessage = isEditing 
          ? 'TPC Member updated successfully!' 
          : 'TPC Member added successfully!';
        showSuccess(successMessage);
        setShowMemberForm(false);
        setEditingMember(null); // Clear editing state
        resetMemberForm();
        await fetchTPCMembers(); // Refresh the list
      } else {
        throw new Error(response.data.message || `Failed to ${isEditing ? 'update' : 'add'} TPC member`);
      }
    } catch (error) {
      dismissToast(loadingToast);
      console.error('Error adding TPC member:', error);
      
      // Handle validation errors with detailed information
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        console.error('Validation errors:', validationErrors);
        
        // Create detailed error message showing which fields failed
        const errorDetails = validationErrors.map(err => {
          const field = err.field || err.path || 'Unknown field';
          const message = err.message || err.msg || 'Validation failed';
          const value = err.value !== undefined ? ` (received: "${err.value}")` : '';
          return `• ${field}: ${message}${value}`;
        }).join('\n');
        
        showError(`Validation Failed:\n\n${errorDetails}`);
      } else if (error.response?.data?.error?.field) {
        // Handle duplicate key errors
        const duplicateError = error.response.data.error;
        showError(`Duplicate Entry: ${duplicateError.message}`);
      } else {
        const operation = isEditing ? 'update' : 'add';
        const errorMessage = error.response?.data?.message || `Failed to ${operation} TPC member`;
        showError(errorMessage);
      }
    }
  };

  const resetMemberForm = () => {
    setMemberFormData({
      name: '',
      contact_no: '',
      department: '',
      team: '',
      role: 'Member',
      category: 'faculty',
      session: ['2025-2026'],
      email: '',
      studentInfo: {
        rollNumber: '',
        year: '',
        semester: ''
      },
      facultyInfo: {
        employeeId: '',
        designation: ''
      },
      responsibilities: [],
      notes: ''
    });
  };

  const handleCancelMember = () => {
    setShowMemberForm(false);
    setEditingMember(null); // Clear editing state
    resetMemberForm();
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    
    // Populate form with member data
    setMemberFormData({
      name: member.name || '',
      contact_no: member.contact_no || '',
      department: member.department || '',
      team: member.team || '',
      role: member.role || 'Member',
      category: member.category || 'faculty',
      session: member.session || ['2025-2026'],
      email: member.email || '',
      studentInfo: member.studentInfo || {
        rollNumber: '',
        year: '',
        semester: ''
      },
      facultyInfo: member.facultyInfo || {
        employeeId: '',
        designation: ''
      },
      responsibilities: member.responsibilities || [],
      notes: member.notes || ''
    });
    setShowMemberForm(true);
  };

  const handleDeleteMember = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const confirmDeleteMember = async (permanent = true) => {
    if (!memberToDelete) return;

    setDeleting(true);
    const deleteType = permanent ? 'Permanently deleting' : 'Deactivating';
    const loadingToast = showLoading(`${deleteType} TPC member...`);

    try {
      let response;
      
      
      if (permanent) {
        // Permanent delete - remove from database completely
        response = await tpcMemberAPI.permanentlyDeleteMember(memberToDelete._id || memberToDelete.id);
      } else {
        // Soft delete - set status to inactive
        response = await tpcMemberAPI.deleteMember(memberToDelete._id || memberToDelete.id);
      }
      
      if (response.data.success) {
        
        await fetchTPCMembers();
        
        dismissToast(loadingToast);
        const message = permanent 
          ? `${memberToDelete.name} permanently deleted from database`
          : `${memberToDelete.name} deactivated successfully`;
        showSuccess(message);
        
        // Reset state
        setShowDeleteModal(false);
        setMemberToDelete(null);
      } else {
        throw new Error(response.data.message || 'Failed to delete TPC member');
      }
    } catch (error) {
      dismissToast(loadingToast);
      console.error('Error deleting TPC member:', error);
      
      if (error.response?.data) {
        const { message } = error.response.data;
        showError(message || 'Failed to delete TPC member');
      } else {
        showError('An unexpected error occurred while deleting TPC member');
      }
    } finally {
      setDeleting(false);
    }
  };

  const cancelDeleteMember = () => {
    setShowDeleteModal(false);
    setMemberToDelete(null);
  };

  const filteredMembers = tpcMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading TPC members...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">TPC Team Members</h2>
          <p className="text-sm text-gray-600">Manage Training & Placement Cell team members</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleAddMember}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            <FaPlus className="mr-2" />
            Add Member
          </button>
          <button
            onClick={() => fetchTPCMembers(true)}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Refreshing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-8">
              <FaUsers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No TPC members found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.id || member._id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
                        <FaUser />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.department} - {member.team}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        member.role === 'Head' 
                          ? 'bg-red-100 text-red-800'
                          : member.role === 'Co-Head'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {member.role}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        member.category === 'faculty'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {member.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <strong>Contact:</strong> {member.contact_no}
                    </div>
                    {member.email && (
                      <div className="text-sm text-gray-600">
                        <strong>Email:</strong> {member.email}
                      </div>
                    )}
                    <div className="text-sm text-gray-600">
                      <strong>Session:</strong> {member.session.join(', ')}
                    </div>
                    {member.studentInfo?.rollNumber && (
                      <div className="text-sm text-gray-600">
                        <strong>Roll Number:</strong> {member.studentInfo.rollNumber}
                      </div>
                    )}
                    {member.facultyInfo?.employeeId && (
                      <div className="text-sm text-gray-600">
                        <strong>Employee ID:</strong> {member.facultyInfo.employeeId}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => handleEditMember(member)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                    >
                      <FaEdit className="inline mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteMember(member)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                    >
                      <FaTrash className="inline mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TPC Member Form Modal */}
      {showMemberForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingMember ? 'Edit TPC Member' : 'Add TPC Member'}
              </h3>
              <button
                onClick={handleCancelMember}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-4 max-h-96 overflow-y-auto">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={memberFormData.name}
                    onChange={handleMemberFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contact_no"
                    value={memberFormData.contact_no}
                    onChange={(e) => {
                      // Only allow digits and limit to 10 characters
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setMemberFormData(prev => ({
                        ...prev,
                        contact_no: value
                      }));
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="10-digit contact number"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    title="Please enter exactly 10 digits"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={memberFormData.department}
                    onChange={handleMemberFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., CSE, MCA, ECE"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Team <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="team"
                    value={memberFormData.team}
                    onChange={handleMemberFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., B-Tech, M-Tech, Faculty"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={memberFormData.role}
                    onChange={handleMemberFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Head">Head</option>
                    <option value="Co-Head">Co-Head</option>
                    <option value="Member">Member</option>
                    <option value="Coordinator">Coordinator</option>
                    <option value="Assistant Coordinator">Assistant Coordinator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={memberFormData.category}
                    onChange={handleMemberFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="faculty">Faculty</option>
                    <option value="b-tech">B-Tech</option>
                    <option value="m-tech">M-Tech</option>
                    <option value="mca">MCA</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={memberFormData.email}
                  onChange={handleMemberFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Session <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={memberFormData.session.join(', ')}
                  onChange={(e) => {
                    const sessions = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                    handleSessionChange(sessions);
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2025-2026 (comma separated for multiple)"
                  pattern="^\d{4}-\d{4}(,\s*\d{4}-\d{4})*$"
                  title="Session format should be YYYY-YYYY (e.g., 2025-2026)"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Format: YYYY-YYYY (e.g., 2025-2026). Use comma for multiple sessions.
                </p>
              </div>

              {/* Category-specific fields */}
              {memberFormData.category !== 'faculty' && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Student Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        name="studentInfo.rollNumber"
                        value={memberFormData.studentInfo.rollNumber}
                        onChange={handleMemberFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., CSE2021001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <select
                        name="studentInfo.year"
                        value={memberFormData.studentInfo.year}
                        onChange={handleMemberFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                        <option value="5">5th Year</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Semester
                      </label>
                      <select
                        name="studentInfo.semester"
                        value={memberFormData.studentInfo.semester}
                        onChange={handleMemberFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Semester</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(sem => (
                          <option key={sem} value={sem}>{sem}th Semester</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {memberFormData.category === 'faculty' && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Faculty Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        name="facultyInfo.employeeId"
                        value={memberFormData.facultyInfo.employeeId}
                        onChange={handleMemberFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., EMP001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Designation
                      </label>
                      <input
                        type="text"
                        name="facultyInfo.designation"
                        value={memberFormData.facultyInfo.designation}
                        onChange={handleMemberFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Assistant Professor"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={memberFormData.notes}
                  onChange={handleMemberFormChange}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Additional notes or responsibilities..."
                />
              </div>
            </form>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancelMember}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveMember}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {editingMember ? 'Update Member' : 'Save Member'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && memberToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Delete TPC Member
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 mb-4">
                  Choose how to delete{" "}
                  <span className="font-semibold text-gray-900">
                    {memberToDelete.name}
                  </span>
                  {" from "}
                  <span className="font-semibold text-gray-900">
                    {memberToDelete.team}
                  </span>:
                </p>
                <div className="text-left space-y-3 mb-4">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Deactivate:</strong> Member remains in database but is hidden from lists. Can be restored later.
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Permanent Delete:</strong> Member is completely removed from database. This cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={cancelDeleteMember}
                      disabled={deleting}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 text-base font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => confirmDeleteMember(false)}
                      disabled={deleting}
                      className="flex-1 px-4 py-2 bg-yellow-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                    >
                      {deleting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        'Deactivate'
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => confirmDeleteMember(true)}
                    disabled={deleting}
                    className="w-full px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                  >
                    {deleting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      'Permanent Delete'
                    )}
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

export default TPCMembersComponent;