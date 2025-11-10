import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from 'react-icons/fa';
import { showError, showSuccess, showLoading, dismissToast } from '../../utils/toast.js';
import { placementAPI } from '../../utils/api.js';

const PlacementsComponent = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPlacementForm, setShowPlacementForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingPlacement, setEditingPlacement] = useState(null);
  const [placementToDelete, setPlacementToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [placementFormData, setPlacementFormData] = useState({
    companyName: '',
    scholarNumber: '',
    placementType: 'FTE',
    package: '',
    stipend: '',
    offerDate: '',
    joiningDate: '',
    status: 'offered',
    packageDetails: {
      currency: 'INR',
      breakdown: {
        base: '',
        bonus: '',
        stockOptions: '',
        other: ''
      }
    },
    jobDetails: {
      role: '',
      location: '',
      department: ''
    },
    notes: ''
  });

  const [studentDetails, setStudentDetails] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(false);

  useEffect(() => {
    fetchPlacements();
  }, []);

  // Fetch placements from API
  const fetchPlacements = async (showRefreshMessage = false) => {
    setLoading(true);
    try {
      const response = await placementAPI.getAllPlacements({
        limit: 100,
        page: 1
      });
      
      if (response.data.success) {
        const placementsData = response.data.data || [];
        setPlacements(placementsData);
        
        if (showRefreshMessage) {
          showSuccess(`Refreshed! Found ${placementsData.length} placement records`);
        }
      } else {
        throw new Error(response.data.message || 'Failed to fetch placements');
      }
    } catch (error) {
      console.error('Error fetching placements:', error);
      
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
        
        if (error.response.status === 404) {
          showError('Placements API endpoint not found. Check if backend is running.');
        } else if (error.response.status === 500) {
          showError('Server error. Check backend logs.');
        } else if (error.response.status === 401) {
          showError('Authentication error. Please login again.');
        } else {
          showError(`Error: ${error.response.data?.message || 'Failed to fetch placements'}`);
        }
      } else if (error.request) {
        console.error('Network error:', error.request);
        showError('Network error. Check if backend is running on http://localhost:5000');
      } else {
        console.error('Request setup error:', error.message);
        showError('Request error: ' + error.message);
      }
      
      setPlacements([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch student details by scholar number
  const fetchStudentByScholarNumber = async (scholarNumber) => {
    if (!scholarNumber.trim()) {
      setStudentDetails(null);
      return;
    }

    setLoadingStudent(true);
    try {
      const response = await placementAPI.getStudentByScholarNumber(scholarNumber);
      if (response.data.success && response.data.data) {
        setStudentDetails(response.data.data);
      } else {
        setStudentDetails(null);
        showError('No student found with this scholar number');
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      setStudentDetails(null);
      if (error.response?.status !== 404) {
        showError('Error fetching student details');
      }
    } finally {
      setLoadingStudent(false);
    }
  };

  // Placement form handlers
  const handlePlacementFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const keys = name.split('.');
      setPlacementFormData(prev => {
        const newData = { ...prev };
        let current = newData;
        
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        
        return newData;
      });
    } else {
      setPlacementFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Clear student details when scholar number changes
      if (name === 'scholarNumber') {
        setStudentDetails(null);
      }
    }
  };

  const handleAddPlacement = () => {
    setShowPlacementForm(true);
    setEditingPlacement(null);
    resetPlacementForm();
  };

  const resetPlacementForm = () => {
    setPlacementFormData({
      companyName: '',
      scholarNumber: '',
      placementType: 'FTE',
      package: '',
      stipend: '',
      offerDate: '',
      joiningDate: '',
      status: 'offered',
      packageDetails: {
        currency: 'INR',
        breakdown: {
          base: '',
          bonus: '',
          stockOptions: '',
          other: ''
        }
      },
      jobDetails: {
        role: '',
        location: '',
        department: ''
      },
      notes: ''
    });
    setStudentDetails(null);
  };

  const handleCancelPlacement = () => {
    setShowPlacementForm(false);
    setEditingPlacement(null);
    resetPlacementForm();
  };

  const handleEditPlacement = (placement) => {
    setEditingPlacement(placement);
    setPlacementFormData({
      companyName: placement.companyName || '',
      scholarNumber: placement.scholarNumber || '',
      placementType: placement.placementType || 'FTE',
      package: placement.package || '',
      stipend: placement.stipend || '',
      offerDate: placement.offerDate ? placement.offerDate.split('T')[0] : '',
      joiningDate: placement.joiningDate ? placement.joiningDate.split('T')[0] : '',
      status: placement.status || 'offered',
      packageDetails: {
        currency: placement.packageDetails?.currency || 'INR',
        breakdown: {
          base: placement.packageDetails?.breakdown?.base || '',
          bonus: placement.packageDetails?.breakdown?.bonus || '',
          stockOptions: placement.packageDetails?.breakdown?.stockOptions || '',
          other: placement.packageDetails?.breakdown?.other || ''
        }
      },
      jobDetails: {
        role: placement.jobDetails?.role || '',
        location: placement.jobDetails?.location || '',
        department: placement.jobDetails?.department || ''
      },
      notes: placement.notes || ''
    });
    
    // Load student details for editing
    if (placement.scholarNumber) {
      fetchStudentByScholarNumber(placement.scholarNumber);
    }
    
    setShowPlacementForm(true);
  };

  const handleSavePlacement = async () => {
    // Basic validation before sending
    if (!placementFormData.companyName.trim()) {
      showError('Company name is required');
      return;
    }
    if (!placementFormData.scholarNumber.trim()) {
      showError('Scholar number is required');
      return;
    }
    if (!placementFormData.package || isNaN(parseFloat(placementFormData.package))) {
      showError('Valid package amount is required');
      return;
    }

    // Fetch student details if not already fetched
    if (!studentDetails) {
      showError('Please fetch student details first by clicking the "Fetch" button');
      return;
    }
    
    const loadingToast = showLoading('Saving placement...');
    
    try {
      // Clean and validate the data
      const placementData = {
        companyName: placementFormData.companyName.trim(),
        scholarNumber: placementFormData.scholarNumber.trim(),
        placementType: placementFormData.placementType,
        package: parseFloat(placementFormData.package),
        status: placementFormData.status,
        // Only include stipend if it has a value
        ...(placementFormData.stipend && placementFormData.stipend !== '' && {
          stipend: parseFloat(placementFormData.stipend)
        }),
        // Only include dates if they have values
        ...(placementFormData.offerDate && {
          offerDate: new Date(placementFormData.offerDate).toISOString()
        }),
        ...(placementFormData.joiningDate && {
          joiningDate: new Date(placementFormData.joiningDate).toISOString()
        }),
        // Clean up packageDetails - only include if there are values
        ...(placementFormData.packageDetails && {
          packageDetails: {
            currency: placementFormData.packageDetails.currency,
            breakdown: {
              ...(placementFormData.packageDetails.breakdown.base && placementFormData.packageDetails.breakdown.base !== '' && {
                base: parseFloat(placementFormData.packageDetails.breakdown.base)
              }),
              ...(placementFormData.packageDetails.breakdown.bonus && placementFormData.packageDetails.breakdown.bonus !== '' && {
                bonus: parseFloat(placementFormData.packageDetails.breakdown.bonus)
              }),
              ...(placementFormData.packageDetails.breakdown.stockOptions && placementFormData.packageDetails.breakdown.stockOptions !== '' && {
                stockOptions: parseFloat(placementFormData.packageDetails.breakdown.stockOptions)
              }),
              ...(placementFormData.packageDetails.breakdown.other && placementFormData.packageDetails.breakdown.other !== '' && {
                other: parseFloat(placementFormData.packageDetails.breakdown.other)
              })
            }
          }
        }),
        // Clean up jobDetails - only include if there are values
        ...(placementFormData.jobDetails && (
          placementFormData.jobDetails.role || 
          placementFormData.jobDetails.location || 
          placementFormData.jobDetails.department
        ) && {
          jobDetails: {
            ...(placementFormData.jobDetails.role && placementFormData.jobDetails.role !== '' && {
              role: placementFormData.jobDetails.role.trim()
            }),
            ...(placementFormData.jobDetails.location && placementFormData.jobDetails.location !== '' && {
              location: placementFormData.jobDetails.location.trim()
            }),
            ...(placementFormData.jobDetails.department && placementFormData.jobDetails.department !== '' && {
              department: placementFormData.jobDetails.department.trim()
            })
          }
        }),
        // Only include notes if it has content
        ...(placementFormData.notes && placementFormData.notes.trim() !== '' && {
          notes: placementFormData.notes.trim()
        })
      };

      if (editingPlacement) {
        await placementAPI.updatePlacement(editingPlacement._id, placementData);
        showSuccess('Placement updated successfully');
      } else {
        await placementAPI.createPlacement(placementData);
        showSuccess('Placement created successfully');
      }

      await fetchPlacements();
      setShowPlacementForm(false);
      setEditingPlacement(null);
      resetPlacementForm();
    } catch (error) {
      console.error('Error saving placement:', error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Handle validation errors
          const errorMessages = errorData.errors.map(err => err.msg || err.message).join(', ');
          showError(`Validation errors: ${errorMessages}`);
        } else if (errorData.message) {
          showError(errorData.message);
        } else {
          showError('Failed to save placement');
        }
      } else if (error.message) {
        showError(error.message);
      } else {
        showError('Failed to save placement');
      }
    } finally {
      dismissToast(loadingToast);
    }
  };

  const handleDeletePlacement = (placement) => {
    setPlacementToDelete(placement);
    setShowDeleteModal(true);
  };

  const confirmDeletePlacement = async (permanent = true) => {
    if (!placementToDelete) return;

    setDeleting(true);
    const deleteType = permanent ? 'Permanently deleting' : 'Deactivating';
    const loadingToast = showLoading(`${deleteType} placement...`);

    try {
      let response;
      
      
      if (permanent) {
        // Permanent delete - remove from database completely
        response = await placementAPI.permanentlyDeletePlacement(placementToDelete._id);
      } else {
        // Soft delete - set isActive to false
        response = await placementAPI.deletePlacement(placementToDelete._id);
      }
      
      if (response.data.success) {
        
        await fetchPlacements();
        
        dismissToast(loadingToast);
        const message = permanent 
          ? `Placement permanently deleted from database`
          : `Placement deactivated successfully`;
        showSuccess(message);
        
        // Reset state
        setShowDeleteModal(false);
        setPlacementToDelete(null);
      } else {
        throw new Error(response.data.message || 'Failed to delete placement');
      }
    } catch (error) {
      dismissToast(loadingToast);
      console.error('Error deleting placement:', error);
      
      if (error.response?.data) {
        const { message } = error.response.data;
        showError(message || 'Failed to delete placement');
      } else {
        showError('An unexpected error occurred while deleting placement');
      }
    } finally {
      setDeleting(false);
    }
  };

  const cancelDeletePlacement = () => {
    setShowDeleteModal(false);
    setPlacementToDelete(null);
  };

  const filteredPlacements = placements.filter(placement =>
    (placement.studentName && placement.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (placement.companyName && placement.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (placement.scholarNumber && placement.scholarNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (placement.placementType && placement.placementType.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (placement.jobDetails?.role && placement.jobDetails.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading placements...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Student Placements</h2>
          <p className="text-sm text-gray-600">Manage student placement records</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleAddPlacement}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            <FaPlus className="mr-2" />
            Add Placement
          </button>
          <button
            onClick={() => fetchPlacements(true)}
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
              placeholder="Search placements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {filteredPlacements.length === 0 ? (
            <div className="text-center py-8">
              <FaBriefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No placements found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPlacements.map((placement) => (
                <div key={placement._id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
                        {(placement.student?.name || placement.studentName) ? 
                          (placement.student?.name || placement.studentName).split(' ').map(n => n[0]).join('') : '??'}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {placement.student?.name || placement.studentName || 'Unknown Student'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Scholar: {placement.student?.scholarNumber || placement.scholarNumber || 'N/A'}
                        </p>
                        {placement.student && (
                          <p className="text-xs text-gray-500">
                            {placement.student.branch && `${placement.student.branch} • `}
                            {placement.student.degree}
                            {placement.student.email && ` • ${placement.student.email}`}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        placement.placementType === 'FTE' 
                          ? 'bg-blue-100 text-blue-800'
                          : (placement.placementType && placement.placementType.includes('PPO'))
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {placement.placementType || 'N/A'}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                        placement.status === 'offered'
                          ? 'bg-yellow-100 text-yellow-800'
                          : placement.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : placement.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {placement.status || 'Unknown'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-600">
                      <strong>Company:</strong> {placement.companyName || 'Unknown Company'}
                    </div>
                    {placement.jobDetails?.role && (
                      <div className="text-sm text-gray-600">
                        <strong>Role:</strong> {placement.jobDetails.role}
                      </div>
                    )}
                    <div className="text-sm text-gray-600">
                      <strong>Package:</strong> ₹{placement.package?.toLocaleString('en-IN') || 'N/A'}
                    </div>
                    {placement.stipend && (
                      <div className="text-sm text-gray-600">
                        <strong>Stipend:</strong> ₹{Number(placement.stipend).toLocaleString('en-IN')}
                      </div>
                    )}
                    {placement.jobDetails?.location && (
                      <div className="text-sm text-gray-600">
                        <strong>Location:</strong> {placement.jobDetails.location}
                      </div>
                    )}
                    {placement.offerDate && (
                      <div className="text-sm text-gray-600">
                        <strong>Offer Date:</strong> {new Date(placement.offerDate).toLocaleDateString()}
                      </div>
                    )}
                    
                    {/* Additional Student Information */}
                    {placement.student && (
                      <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                        <div className="text-xs text-gray-500 font-medium">Student Details:</div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          {placement.student.studentPhone && (
                            <div><strong>Phone:</strong> {placement.student.studentPhone}</div>
                          )}
                          {placement.student.category && (
                            <div><strong>Category:</strong> {placement.student.category}</div>
                          )}
                          {placement.student.dateOfJoining && (
                            <div><strong>Joined:</strong> {new Date(placement.student.dateOfJoining).toLocaleDateString('en-IN')}</div>
                          )}
                          {(placement.student.jeeMainRank || placement.student.jeeAdvancedRank) && (
                            <div>
                              <strong>JEE:</strong> 
                              {placement.student.jeeMainRank && ` Main: ${placement.student.jeeMainRank}`}
                              {placement.student.jeeAdvancedRank && ` Adv: ${placement.student.jeeAdvancedRank}`}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => handleEditPlacement(placement)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                    >
                      <FaEdit className="inline mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeletePlacement(placement)}
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

      {/* Placement Form Modal */}
      {showPlacementForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {editingPlacement ? 'Edit Placement' : 'Add New Placement'}
              </h3>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSavePlacement(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900 border-b pb-2">Basic Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={placementFormData.companyName}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Scholar Number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        name="scholarNumber"
                        value={placementFormData.scholarNumber}
                        onChange={handlePlacementFormChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                        placeholder="e.g., 22104056"
                      />
                      <button
                        type="button"
                        onClick={() => fetchStudentByScholarNumber(placementFormData.scholarNumber)}
                        disabled={!placementFormData.scholarNumber.trim() || loadingStudent}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer text-sm"
                      >
                        {loadingStudent ? 'Loading...' : 'Fetch'}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Enter scholar number and click "Fetch" to get student details.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Student Details
                    </label>
                    <div className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 min-h-[80px]">
                      {loadingStudent ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                          <span className="text-gray-500 text-sm">Loading student details...</span>
                        </div>
                      ) : studentDetails ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                              {studentDetails.name ? studentDetails.name.split(' ').map(n => n[0]).join('').substring(0, 2) : '??'}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{studentDetails.name || 'Unknown'}</div>
                              <div className="text-xs text-gray-500">Scholar: {studentDetails.scholarNumber || 'N/A'}</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="font-medium text-gray-700">Branch:</span>
                              <div className="text-gray-600">{studentDetails.branch || 'N/A'}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Degree:</span>
                              <div className="text-gray-600">{studentDetails.degree || 'N/A'}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Email:</span>
                              <div className="text-gray-600 truncate">{studentDetails.email || 'N/A'}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Phone:</span>
                              <div className="text-gray-600">{studentDetails.studentPhone || 'N/A'}</div>
                            </div>
                            {studentDetails.dateOfJoining && (
                              <div>
                                <span className="font-medium text-gray-700">Joined:</span>
                                <div className="text-gray-600">
                                  {new Date(studentDetails.dateOfJoining).toLocaleDateString('en-IN')}
                                </div>
                              </div>
                            )}
                            {studentDetails.category && (
                              <div>
                                <span className="font-medium text-gray-700">Category:</span>
                                <div className="text-gray-600">{studentDetails.category}</div>
                              </div>
                            )}
                          </div>
                          
                          {(studentDetails.jeeMainRank || studentDetails.jeeAdvancedRank) && (
                            <div className="pt-2 border-t border-gray-200">
                              <span className="font-medium text-gray-700 text-xs">JEE Ranks:</span>
                              <div className="flex space-x-4 text-xs text-gray-600">
                                {studentDetails.jeeMainRank && (
                                  <span>Main: {studentDetails.jeeMainRank}</span>
                                )}
                                {studentDetails.jeeAdvancedRank && (
                                  <span>Advanced: {studentDetails.jeeAdvancedRank}</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : placementFormData.scholarNumber ? (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-red-500 text-sm">❌ No student found with this scholar number</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-gray-400 text-sm">🔍 Enter scholar number above and click "Fetch"</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Placement Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="placementType"
                      value={placementFormData.placementType}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="FTE">FTE</option>
                      <option value="2M+PPO">2M+PPO</option>
                      <option value="6M+PPO">6M+PPO</option>
                      <option value="6M+FTE">6M+FTE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Package <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="package"
                      value={placementFormData.package}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Stipend (Optional)
                    </label>
                    <input
                      type="number"
                      name="stipend"
                      value={placementFormData.stipend}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900 border-b pb-2">Additional Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      value={placementFormData.status}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="offered">Offered</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Role
                    </label>
                    <input
                      type="text"
                      name="jobDetails.role"
                      value={placementFormData.jobDetails.role}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Location
                    </label>
                    <input
                      type="text"
                      name="jobDetails.location"
                      value={placementFormData.jobDetails.location}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <input
                      type="text"
                      name="jobDetails.department"
                      value={placementFormData.jobDetails.department}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Offer Date
                    </label>
                    <input
                      type="date"
                      name="offerDate"
                      value={placementFormData.offerDate}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={placementFormData.joiningDate}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Package Breakdown */}
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Package Breakdown (Optional)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Base Salary</label>
                    <input
                      type="number"
                      name="packageDetails.breakdown.base"
                      value={placementFormData.packageDetails.breakdown.base}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bonus</label>
                    <input
                      type="number"
                      name="packageDetails.breakdown.bonus"
                      value={placementFormData.packageDetails.breakdown.bonus}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock Options</label>
                    <input
                      type="number"
                      name="packageDetails.breakdown.stockOptions"
                      value={placementFormData.packageDetails.breakdown.stockOptions}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Other</label>
                    <input
                      type="number"
                      name="packageDetails.breakdown.other"
                      value={placementFormData.packageDetails.breakdown.other}
                      onChange={handlePlacementFormChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={placementFormData.notes}
                  onChange={handlePlacementFormChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Additional notes about the placement..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCancelPlacement}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {editingPlacement ? 'Update Placement' : 'Save Placement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && placementToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Delete Placement
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 mb-4">
                  Choose how to delete the placement for{" "}
                  <span className="font-semibold text-gray-900">
                    {placementToDelete.studentName}
                  </span>
                  {" at "}
                  <span className="font-semibold text-gray-900">
                    {placementToDelete.companyName}
                  </span>:
                </p>
                <div className="text-left space-y-3 mb-4">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Deactivate:</strong> Placement remains in database but is hidden from lists. Can be restored later.
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Permanent Delete:</strong> Placement is completely removed from database. This cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={cancelDeletePlacement}
                      disabled={deleting}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 text-base font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => confirmDeletePlacement(false)}
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
                    onClick={() => confirmDeletePlacement(true)}
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

export default PlacementsComponent;