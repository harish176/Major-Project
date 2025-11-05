import React, { useState, useEffect } from 'react';
import { FaUserTie, FaPlus, FaEdit, FaTrash, FaSearch, FaEnvelope, FaPhone, FaTimes, FaSave, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess, showLoading, dismissToast } from '../../utils/toast.js';
import { facultyAPI } from '../../utils/api.js';
import { uploadImageToCloudinary } from '../../utils/cloudinary.js';
import AdminNavbar from './AdminNavbar.jsx';

const AdminFaculty = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [facultyLoading, setFacultyLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [activeSection, setActiveSection] = useState('basic');
  const [isEditMode, setIsEditMode] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Fixed at 10 items per page
  
  // Form state for adding faculty
  const [facultyForm, setFacultyForm] = useState({
    // Basic Information
    facultyId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    contactNumber: '',
    email: '',
    password: '',
    photo: {
      url: '',
      publicId: ''
    },
    
    // Address Information
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    currentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    sameAsPermanent: false,
    
    // Personal Details
    maritalStatus: '',
    bloodGroup: '',
    
    // Emergency Contact
    emergencyContact: {
      name: '',
      relationship: '',
      contactNumber: '',
      address: ''
    },
    
    // Educational Qualifications
    qualifications: [{
      degree: '',
      specialization: '',
      university: '',
      yearOfPassing: '',
      percentage: '',
      cgpa: ''
    }],
    
    // Certifications
    certifications: [],
    
    // Professional Information
    department: '',
    designation: '',
    otherDesignation: '',
    employeeType: '',
    dateOfJoining: '',
    totalExperience: '',
    previousInstitutions: [],
    areasOfExpertise: [''],
    subjectsTaught: [''],
    researchInterests: [''],
    
    // Publications
    publications: [],
    
    // Awards
    awards: [],
    
    // Administrative Roles
    administrativeRoles: [],
    
    // Committees
    committees: [],
    
    // Financial Information
    bankDetails: {
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      branchName: ''
    },
    panNumber: '',
    aadharNumber: '',
    pfNumber: '',
    
    // Salary Details
    salaryDetails: {
      basicPay: '',
      allowances: {
        hra: '',
        da: '',
        medical: '',
        transport: '',
        other: ''
      },
      deductions: {
        pf: '',
        tax: '',
        insurance: '',
        other: ''
      }
    }
  });

  useEffect(() => {
    const initializeAdmin = async () => {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!userData || !token) {
        showError('Please login to access dashboard');
        navigate('/login');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.role !== 'admin') {
          showError('Access denied. Admin access required.');
          navigate('/login');
          return;
        }
        setUser(parsedUser);
        await fetchFaculty();
      } catch (error) {
        showError('Invalid user data. Please login again.');
        navigate('/login');
        return;
      }

      setLoading(false);
    };

    initializeAdmin();
  }, [navigate]);

  // Fetch faculty data from backend
  const fetchFaculty = async () => {
    setFacultyLoading(true);
    try {
      const response = await facultyAPI.getAllFaculty();
      
      if (response.data.success) {
        setFaculty(response.data.data || []);
      } else {
        showError(response.data.message || 'Failed to fetch faculty data');
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
      // Error handling is done by axios interceptor
      setFaculty([]); // Set empty array on error
    } finally {
      setFacultyLoading(false);
    }
  };

  // Handle form changes
  const handleFormChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFacultyForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFacultyForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Handle array field changes
  const handleArrayChange = (field, index, value) => {
    setFacultyForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // Add array item
  const addArrayItem = (field, defaultItem = '') => {
    setFacultyForm(prev => ({
      ...prev,
      [field]: [...prev[field], defaultItem]
    }));
  };

  // Remove array item
  const removeArrayItem = (field, index) => {
    setFacultyForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Copy permanent address to current address
  const copyPermanentAddress = (checked) => {
    setFacultyForm(prev => ({
      ...prev,
      sameAsPermanent: checked,
      currentAddress: checked ? { ...prev.permanentAddress } : {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      }
    }));
  };

  // Handle photo file selection
  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showError('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        showError('Image size should be less than 5MB');
        return;
      }
      
      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected photo
  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setFacultyForm(prev => ({
      ...prev,
      photo: {
        url: '',
        publicId: ''
      }
    }));
  };

  // Upload photo to Cloudinary
  const uploadPhoto = async () => {
    if (!photoFile) return null;
    
    setUploadingPhoto(true);
    
    try {
      const result = await uploadImageToCloudinary(photoFile, 'faculty-photos');
      
      if (result.success) {
        return {
          url: result.url,
          publicId: result.public_id
        };
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Photo upload error:', error);
      showError('Failed to upload photo: ' + error.message);
      return null;
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Handle edit faculty - populate form with existing data
  const handleEditFaculty = (faculty) => {
    console.log('Editing faculty:', faculty);
    
    // Set the form data with existing faculty information
    setFacultyForm({
      // Basic Information
      facultyId: faculty.facultyId || '',
      firstName: faculty.firstName || '',
      middleName: faculty.middleName || '',
      lastName: faculty.lastName || '',
      gender: faculty.gender || '',
      dateOfBirth: faculty.dateOfBirth ? faculty.dateOfBirth.split('T')[0] : '',
      contactNumber: faculty.contactNumber || '',
      email: faculty.email || '',
      password: '', // Don't populate password for security
      photo: faculty.photo || { url: '', publicId: '' },
      
      // Address Information
      permanentAddress: faculty.permanentAddress || {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      currentAddress: faculty.currentAddress || {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      sameAsPermanent: false,
      
      // Personal Details
      maritalStatus: faculty.maritalStatus || '',
      bloodGroup: faculty.bloodGroup || '',
      
      // Emergency Contact
      emergencyContact: faculty.emergencyContact || {
        name: '',
        relationship: '',
        contactNumber: '',
        address: ''
      },
      
      // Educational Qualifications
      qualifications: faculty.qualifications && faculty.qualifications.length > 0 
        ? faculty.qualifications 
        : [{ degree: '', specialization: '', university: '', yearOfPassing: '', percentage: '', cgpa: '' }],
      
      // Certifications
      certifications: faculty.certifications || [],
      
      // Professional Information
      department: faculty.department || '',
      designation: faculty.designation || '',
      otherDesignation: faculty.otherDesignation || '',
      employeeType: faculty.employeeType || '',
      dateOfJoining: faculty.dateOfJoining ? faculty.dateOfJoining.split('T')[0] : '',
      totalExperience: faculty.totalExperience || '',
      previousInstitutions: faculty.previousInstitutions || [],
      areasOfExpertise: faculty.areasOfExpertise && faculty.areasOfExpertise.length > 0 
        ? faculty.areasOfExpertise 
        : [''],
      subjectsTaught: faculty.subjectsTaught && faculty.subjectsTaught.length > 0 
        ? faculty.subjectsTaught 
        : [''],
      researchInterests: faculty.researchInterests && faculty.researchInterests.length > 0 
        ? faculty.researchInterests 
        : [''],
      
      // Publications
      publications: faculty.publications || [],
      
      // Awards
      awards: faculty.awards || [],
      
      // Administrative Roles
      administrativeRoles: faculty.administrativeRoles || [],
      
      // Committees
      committees: faculty.committees || [],
      
      // Financial Information
      bankDetails: faculty.bankDetails || {
        accountNumber: '',
        bankName: '',
        ifscCode: '',
        branchName: ''
      },
      panNumber: faculty.panNumber || '',
      aadharNumber: faculty.aadharNumber || '',
      pfNumber: faculty.pfNumber || '',
      
      // Salary Details
      salaryDetails: faculty.salaryDetails || {
        basicPay: '',
        allowances: {
          hra: '',
          da: '',
          medical: '',
          transport: '',
          other: ''
        },
        deductions: {
          pf: '',
          tax: '',
          insurance: '',
          other: ''
        }
      }
    });
    
    // Set selected faculty for reference
    setSelectedFaculty(faculty);
    setIsEditMode(true);
    setActiveSection('basic');
    setShowEditModal(true);
  };

  // Handle update faculty
  const handleUpdateFaculty = async () => {
    let currentToast = null;
    
    try {
      // Validate required fields
      if (!facultyForm.facultyId || !facultyForm.firstName || !facultyForm.lastName || 
          !facultyForm.email || !facultyForm.contactNumber) {
        showError('Please fill all required fields in Basic Information section');
        setActiveSection('basic');
        return;
      }

      if (!facultyForm.department || !facultyForm.designation) {
        showError('Please fill Department and Designation in Professional Information section');
        setActiveSection('professional');
        return;
      }

      // Upload photo if a new one is selected
      let photoData = facultyForm.photo;
      if (photoFile) {
        currentToast = showLoading('Uploading photo...');
        try {
          const uploadResult = await uploadPhoto();
          dismissToast(currentToast);
          
          if (uploadResult) {
            photoData = uploadResult;
            showSuccess('Photo uploaded successfully');
          } else {
            showError('Photo upload failed. Please try again.');
            return;
          }
        } catch (uploadError) {
          dismissToast(currentToast);
          console.error('Photo upload error:', uploadError);
          showError('Photo upload failed. Please try again.');
          return;
        }
      }

      // Update faculty data
      currentToast = showLoading('Updating faculty data...');
      
      const facultyDataWithPhoto = {
        ...facultyForm,
        photo: photoData
      };

      // Remove password if it's empty (don't update password unless provided)
      if (!facultyDataWithPhoto.password) {
        delete facultyDataWithPhoto.password;
      }

      // Submit to API
      const response = await facultyAPI.updateFaculty(selectedFaculty._id, facultyDataWithPhoto);
      
      dismissToast(currentToast);
      
      if (response.data.success) {
        showSuccess('Faculty updated successfully!');
        
        // Refresh faculty list
        await fetchFaculty();
        
        // Reset states
        setShowEditModal(false);
        setIsEditMode(false);
        setSelectedFaculty(null);
        setPhotoFile(null);
        setPhotoPreview(null);
      } else {
        showError(response.data.message || 'Failed to update faculty');
      }
    } catch (error) {
      // Make sure to dismiss any active toasts
      if (currentToast) {
        dismissToast(currentToast);
      }
      console.error('Error updating faculty:', error);
      
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        
        if (errors && typeof errors === 'object') {
          const firstError = Object.keys(errors)[0];
          showError(`${firstError}: ${errors[firstError]}`);
        } else if (message) {
          showError(message);
        } else {
          showError('Failed to update faculty data');
        }
      } else if (error.message) {
        showError(error.message);
      } else {
        showError('An unexpected error occurred while updating faculty data');
      }
    }
  };

  // Reset form and close modals
  const resetFormAndClose = () => {
    // Reset form to initial state
    setFacultyForm({
      facultyId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      contactNumber: '',
      email: '',
      password: '',
      photo: {
        url: '',
        publicId: ''
      },
      permanentAddress: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      currentAddress: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      sameAsPermanent: false,
      maritalStatus: '',
      bloodGroup: '',
      emergencyContact: {
        name: '',
        relationship: '',
        contactNumber: '',
        address: ''
      },
      qualifications: [{
        degree: '',
        specialization: '',
        university: '',
        yearOfPassing: '',
        percentage: '',
        cgpa: ''
      }],
      certifications: [],
      department: '',
      designation: '',
      otherDesignation: '',
      employeeType: '',
      dateOfJoining: '',
      totalExperience: '',
      previousInstitutions: [],
      areasOfExpertise: [''],
      subjectsTaught: [''],
      researchInterests: [''],
      publications: [],
      awards: [],
      administrativeRoles: [],
      committees: [],
      bankDetails: {
        accountNumber: '',
        bankName: '',
        ifscCode: '',
        branchName: ''
      },
      panNumber: '',
      aadharNumber: '',
      pfNumber: '',
      salaryDetails: {
        basicPay: '',
        allowances: {
          hra: '',
          da: '',
          medical: '',
          transport: '',
          other: ''
        },
        deductions: {
          pf: '',
          tax: '',
          insurance: '',
          other: ''
        }
      }
    });
    
    // Reset other states
    setPhotoFile(null);
    setPhotoPreview(null);
    setActiveSection('basic');
    setIsEditMode(false);
    setSelectedFaculty(null);
    setShowAddModal(false);
    setShowEditModal(false);
  };

  // Save faculty to database
  const handleSaveFaculty = async () => {
    let currentToast = null;
    
    try {
      // Validate required fields first (no toast needed for validation)
      if (!facultyForm.facultyId || !facultyForm.firstName || !facultyForm.lastName || 
          !facultyForm.email || !facultyForm.contactNumber || !facultyForm.password) {
        showError('Please fill all required fields in Basic Information section');
        setActiveSection('basic');
        return;
      }

      if (!facultyForm.department || !facultyForm.designation) {
        showError('Please fill Department and Designation in Professional Information section');
        setActiveSection('professional');
        return;
      }

      // Upload photo if selected
      let photoData = facultyForm.photo;
      if (photoFile) {
        currentToast = showLoading('Uploading photo...');
        try {
          const uploadResult = await uploadPhoto();
          dismissToast(currentToast);
          
          if (uploadResult) {
            photoData = uploadResult;
            showSuccess('Photo uploaded successfully');
          } else {
            showError('Photo upload failed. Please try again.');
            return; // Don't proceed if photo upload fails
          }
        } catch (uploadError) {
          dismissToast(currentToast);
          console.error('Photo upload error:', uploadError);
          showError('Photo upload failed. Please try again.');
          return;
        }
      }

      // Now save faculty data to database
      currentToast = showLoading('Saving faculty data...');
      
      const facultyDataWithPhoto = {
        ...facultyForm,
        photo: photoData
      };

      // Submit to API (using the correct method name)
      const response = await facultyAPI.register(facultyDataWithPhoto);
      
      dismissToast(currentToast);
      
      if (response.data.success) {
        showSuccess('Faculty registered successfully!');
        
        // Refresh faculty list
        await fetchFaculty();
        
        // Reset form and photo
        setPhotoFile(null);
        setPhotoPreview(null);
        setFacultyForm({
          facultyId: '',
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          contactNumber: '',
          email: '',
          password: '',
          photo: {
            url: '',
            publicId: ''
          },
          permanentAddress: {
            street: '',
            city: '',
            state: '',
            pincode: '',
            country: 'India'
          },
          currentAddress: {
            street: '',
            city: '',
            state: '',
            pincode: '',
            country: 'India'
          },
          sameAsPermanent: false,
          maritalStatus: '',
          bloodGroup: '',
          nationality: 'Indian',
          religion: '',
          category: '',
          aadharNumber: '',
          panNumber: '',
          department: '',
          designation: '',
          otherDesignation: '',
          dateOfJoining: '',
          employeeType: '',
          totalExperience: '',
          teachingExperience: '',
          industryExperience: '',
          researchExperience: '',
          officeAddress: '',
          qualifications: [],
          certifications: [],
          specializations: [],
          researchAreas: [],
          publications: [],
          awards: [],
          patents: [],
          conferences: [],
          workshops: [],
          committees: [],
          bankName: '',
          accountNumber: '',
          ifscCode: '',
          panCardNumber: '',
          pfAccountNumber: '',
          esiNumber: '',
          salary: {
            basic: '',
            hra: '',
            da: '',
            ta: '',
            allowances: '',
            deductions: '',
            providentFund: '',
            professionalTax: '',
            incomeTax: ''
          },
          emergencyContact: {
            name: '',
            relationship: '',
            contactNumber: ''
          },
          status: 'active'
        });
        setActiveSection('basic');
        setShowAddModal(false);
      } else {
        // Handle API response errors
        if (response.data.error && typeof response.data.error === 'object') {
          const errorFields = Object.keys(response.data.error);
          if (errorFields.length > 0) {
            const firstField = errorFields[0];
            const errorMessage = response.data.error[firstField];
            showError(`${firstField}: ${errorMessage}`);
            
            // Navigate to appropriate section based on field
            if (['facultyId', 'firstName', 'lastName', 'email', 'contactNumber', 'password', 'gender', 'dateOfBirth'].includes(firstField)) {
              setActiveSection('basic');
            } else if (['department', 'designation', 'joiningDate', 'employeeType', 'otherDesignation'].includes(firstField)) {
              setActiveSection('professional');
            } else if (['qualifications'].includes(firstField)) {
              setActiveSection('qualifications');
            } else if (['experience'].includes(firstField)) {
              setActiveSection('experience');
            } else if (['permanentAddress', 'currentAddress'].includes(firstField)) {
              setActiveSection('address');
            } else if (['bankName', 'accountNumber', 'ifscCode'].includes(firstField)) {
              setActiveSection('bank');
            }
          } else {
            showError(response.data.message || 'Registration failed');
          }
        } else {
          showError(response.data.message || 'Failed to register faculty');
        }
      }
    } catch (error) {
      // Make sure to dismiss any active toasts
      if (currentToast) {
        dismissToast(currentToast);
      }
      console.error('Error saving faculty:', error);
      
      // Show specific validation errors
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        
        // If there are specific field validation errors
        if (errors && typeof errors === 'object') {
          const firstError = Object.keys(errors)[0];
          showError(`${firstError}: ${errors[firstError]}`);
        } else if (message) {
          showError(message);
        } else {
          showError('Failed to save faculty data');
        }
      } else if (error.message) {
        showError(error.message);
      } else {
        showError('An unexpected error occurred while saving faculty data');
      }
    }
  };

  // Handle delete faculty confirmation
  const handleDeleteFaculty = (faculty) => {
    setFacultyToDelete(faculty);
    setShowDeleteModal(true);
  };

  // Confirm and execute delete
  const confirmDeleteFaculty = async () => {
    if (!facultyToDelete) return;

    setDeleting(true);
    const loadingToast = showLoading(`Deleting ${facultyToDelete.firstName} ${facultyToDelete.lastName}...`);

    try {
      await facultyAPI.deleteFaculty(facultyToDelete._id);
      
      // Remove from local state
      setFaculty(prev => prev.filter(f => f._id !== facultyToDelete._id));
      
      dismissToast(loadingToast);
      showSuccess(`${facultyToDelete.firstName} ${facultyToDelete.lastName} deleted successfully`);
      
      // Reset state
      setShowDeleteModal(false);
      setFacultyToDelete(null);
    } catch (error) {
      dismissToast(loadingToast);
      console.error('Error deleting faculty:', error);
      
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        showError(message || 'Failed to delete faculty');
      } else {
        showError('An unexpected error occurred while deleting faculty');
      }
    } finally {
      setDeleting(false);
    }
  };

  // Cancel delete operation
  const cancelDeleteFaculty = () => {
    setShowDeleteModal(false);
    setFacultyToDelete(null);
  };

  // Filter faculty based on search term
  const filteredFaculty = faculty.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.facultyId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFaculty = filteredFaculty.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading faculty management...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <AdminNavbar user={user} />

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Faculty Management</h1>
                <p className="text-sm text-gray-600">Manage faculty members and their information</p>
              </div>
              <button
                onClick={() => {
                  resetFormAndClose(); // Reset form first
                  setIsEditMode(false); // Ensure it's add mode
                  setShowAddModal(true);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              >
                <FaPlus className="mr-2" />
                Add Faculty
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Filters */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 mr-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search faculty by name, email, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Faculty List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Faculty Members</h3>
                {!facultyLoading && filteredFaculty.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Showing {paginatedFaculty.length} of {filteredFaculty.length} faculty members
                    {searchTerm && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Filtered
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {facultyLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading faculty members...</p>
                </div>
              ) : filteredFaculty.length === 0 ? (
                <div className="text-center py-8">
                  <FaUserTie className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No faculty members found matching your criteria.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Faculty Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Experience
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedFaculty.map((member) => (
                        <tr key={member._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {member.photo?.url ? (
                                <img
                                  src={member.photo.url}
                                  alt={`${member.firstName} ${member.lastName}`}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                  {member.firstName?.[0]}{member.lastName?.[0]}
                                </div>
                              )}
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {member.firstName} {member.lastName}
                                </div>
                                <div className="text-sm text-gray-500">ID: {member.facultyId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{member.email}</div>
                            <div className="text-sm text-gray-500">{member.contactNumber}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{member.department}</div>
                            <div className="text-sm text-gray-500">
                              {member.designation}
                              {member.otherDesignation && (
                                <span className="text-blue-600 ml-1">({member.otherDesignation})</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{member.totalExperience || 0} years</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => {
                                setSelectedFaculty(member);
                                setShowViewModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 cursor-pointer"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleEditFaculty(member)}
                              className="text-green-600 hover:text-green-900 cursor-pointer"
                              title="Edit Faculty"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              onClick={() => handleDeleteFaculty(member)}
                              className="text-red-600 hover:text-red-900 cursor-pointer"
                              title="Delete Faculty"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing{' '}
                          <span className="font-medium">{startIndex + 1}</span>
                          {' '}to{' '}
                          <span className="font-medium">
                            {Math.min(endIndex, filteredFaculty.length)}
                          </span>
                          {' '}of{' '}
                          <span className="font-medium">{filteredFaculty.length}</span>
                          {' '}results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaChevronLeft className="h-3 w-3" />
                            <span className="ml-1">Previous</span>
                          </button>
                          
                          {/* Page numbers */}
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === currentPage
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          
                          <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="mr-1">Next</span>
                            <FaChevronRight className="h-3 w-3" />
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
      </div>

      {/* Add/Edit Faculty Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-6xl shadow-lg rounded-md bg-white mb-10">
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white z-10 pb-3 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditMode ? 'Edit Faculty Member' : 'Add New Faculty Member'}
              </h3>
              <button
                onClick={resetFormAndClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            {/* Section Navigation */}
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
              {['basic', 'address', 'professional', 'qualifications', 'optional', 'financial'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    activeSection === section
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              {/* Basic Information Section */}
              {activeSection === 'basic' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Faculty ID *</label>
                      <input
                        type="text"
                        value={facultyForm.facultyId}
                        onChange={(e) => handleFormChange('facultyId', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="FAC001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={facultyForm.firstName}
                        onChange={(e) => handleFormChange('firstName', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={facultyForm.middleName}
                        onChange={(e) => handleFormChange('middleName', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={facultyForm.lastName}
                        onChange={(e) => handleFormChange('lastName', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        value={facultyForm.gender}
                        onChange={(e) => handleFormChange('gender', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        value={facultyForm.dateOfBirth}
                        onChange={(e) => handleFormChange('dateOfBirth', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                      <input
                        type="text"
                        value={facultyForm.contactNumber}
                        onChange={(e) => handleFormChange('contactNumber', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="10 digits"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        value={facultyForm.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password {!isEditMode && '*'}
                      </label>
                      <input
                        type="password"
                        value={facultyForm.password}
                        onChange={(e) => handleFormChange('password', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={isEditMode ? "Leave empty to keep current password" : "Min 6 characters"}
                      />
                      {isEditMode && (
                        <p className="text-xs text-gray-500 mt-1">
                          Leave empty to keep the current password unchanged
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status *</label>
                      <select
                        value={facultyForm.maritalStatus}
                        onChange={(e) => handleFormChange('maritalStatus', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                      <select
                        value={facultyForm.bloodGroup}
                        onChange={(e) => handleFormChange('bloodGroup', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-md">
                    <h5 className="text-md font-medium text-gray-900 mb-3">Faculty Photo</h5>
                    <div className="flex items-start space-x-4">
                      {/* Photo Preview */}
                      <div className="flex-shrink-0">
                        {photoPreview || (isEditMode && facultyForm.photo?.url) ? (
                          <div className="relative">
                            <img
                              src={photoPreview || facultyForm.photo?.url}
                              alt="Faculty Preview"
                              className="w-24 h-24 object-cover rounded-md border"
                            />
                            <button
                              type="button"
                              onClick={removePhoto}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                            <FaUserTie className="text-gray-400 text-2xl" />
                          </div>
                        )}
                      </div>
                      
                      {/* Upload Controls */}
                      <div className="flex-1">
                        <input
                          type="file"
                          id="facultyPhoto"
                          accept="image/*"
                          onChange={handlePhotoSelect}
                          className="hidden"
                        />
                        <label
                          htmlFor="facultyPhoto"
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                            uploadingPhoto ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                          }`}
                        >
                          {uploadingPhoto ? 'Uploading...' : 'Choose Photo'}
                        </label>
                        <p className="mt-2 text-sm text-gray-500">
                          Upload a photo of the faculty member (JPG, PNG, max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <h5 className="text-md font-medium text-gray-900 mb-3">Emergency Contact</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input
                          type="text"
                          value={facultyForm.emergencyContact.name}
                          onChange={(e) => handleFormChange('emergencyContact.name', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                        <input
                          type="text"
                          value={facultyForm.emergencyContact.relationship}
                          onChange={(e) => handleFormChange('emergencyContact.relationship', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                        <input
                          type="text"
                          value={facultyForm.emergencyContact.contactNumber}
                          onChange={(e) => handleFormChange('emergencyContact.contactNumber', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          maxLength={10}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={facultyForm.emergencyContact.address}
                          onChange={(e) => handleFormChange('emergencyContact.address', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Address Section */}
              {activeSection === 'address' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Address Information</h4>
                  
                  {/* Permanent Address */}
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h5 className="text-md font-medium text-gray-900 mb-3">Permanent Address</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                        <input
                          type="text"
                          value={facultyForm.permanentAddress.street}
                          onChange={(e) => handleFormChange('permanentAddress.street', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          value={facultyForm.permanentAddress.city}
                          onChange={(e) => handleFormChange('permanentAddress.city', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          value={facultyForm.permanentAddress.state}
                          onChange={(e) => handleFormChange('permanentAddress.state', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                          type="text"
                          value={facultyForm.permanentAddress.pincode}
                          onChange={(e) => handleFormChange('permanentAddress.pincode', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          maxLength={6}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          value={facultyForm.permanentAddress.country}
                          onChange={(e) => handleFormChange('permanentAddress.country', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Current Address */}
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-md font-medium text-gray-900">Current Address</h5>
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={facultyForm.sameAsPermanent}
                          onChange={(e) => copyPermanentAddress(e.target.checked)}
                          className="mr-2"
                        />
                        Same as Permanent
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                        <input
                          type="text"
                          value={facultyForm.currentAddress.street}
                          onChange={(e) => handleFormChange('currentAddress.street', e.target.value)}
                          disabled={facultyForm.sameAsPermanent}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          value={facultyForm.currentAddress.city}
                          onChange={(e) => handleFormChange('currentAddress.city', e.target.value)}
                          disabled={facultyForm.sameAsPermanent}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          value={facultyForm.currentAddress.state}
                          onChange={(e) => handleFormChange('currentAddress.state', e.target.value)}
                          disabled={facultyForm.sameAsPermanent}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                          type="text"
                          value={facultyForm.currentAddress.pincode}
                          onChange={(e) => handleFormChange('currentAddress.pincode', e.target.value)}
                          disabled={facultyForm.sameAsPermanent}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
                          maxLength={6}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          value={facultyForm.currentAddress.country}
                          onChange={(e) => handleFormChange('currentAddress.country', e.target.value)}
                          disabled={facultyForm.sameAsPermanent}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Professional Section */}
              {activeSection === 'professional' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Professional Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                      <input
                        type="text"
                        value={facultyForm.department}
                        onChange={(e) => handleFormChange('department', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                      <select
                        value={facultyForm.designation}
                        onChange={(e) => handleFormChange('designation', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Professor">Professor</option>
                        <option value="HOD">HOD</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Senior Lecturer">Senior Lecturer</option>
                        <option value="Principal">Principal</option>
                        <option value="Director">Director</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Other Designation</label>
                      <input
                        type="text"
                        value={facultyForm.otherDesignation}
                        onChange={(e) => handleFormChange('otherDesignation', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter additional designation (optional)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee Type *</label>
                      <select
                        value={facultyForm.employeeType}
                        onChange={(e) => handleFormChange('employeeType', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Permanent">Permanent</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Visiting">Visiting</option>
                        <option value="Contract">Contract</option>
                        <option value="Adhoc">Adhoc</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining *</label>
                      <input
                        type="date"
                        value={facultyForm.dateOfJoining}
                        onChange={(e) => handleFormChange('dateOfJoining', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Experience (years) *</label>
                      <input
                        type="number"
                        value={facultyForm.totalExperience}
                        onChange={(e) => handleFormChange('totalExperience', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Areas of Expertise */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Areas of Expertise</label>
                      <button
                        onClick={() => addArrayItem('areasOfExpertise', '')}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <FaPlus className="mr-1" /> Add
                      </button>
                    </div>
                    {facultyForm.areasOfExpertise.map((area, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={area}
                          onChange={(e) => handleArrayChange('areasOfExpertise', index, e.target.value)}
                          className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Machine Learning"
                        />
                        {facultyForm.areasOfExpertise.length > 1 && (
                          <button
                            onClick={() => removeArrayItem('areasOfExpertise', index)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Subjects Taught */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Subjects Taught</label>
                      <button
                        onClick={() => addArrayItem('subjectsTaught', '')}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <FaPlus className="mr-1" /> Add
                      </button>
                    </div>
                    {facultyForm.subjectsTaught.map((subject, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => handleArrayChange('subjectsTaught', index, e.target.value)}
                          className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Data Structures"
                        />
                        {facultyForm.subjectsTaught.length > 1 && (
                          <button
                            onClick={() => removeArrayItem('subjectsTaught', index)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Research Interests */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Research Interests</label>
                      <button
                        onClick={() => addArrayItem('researchInterests', '')}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <FaPlus className="mr-1" /> Add
                      </button>
                    </div>
                    {facultyForm.researchInterests.map((interest, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={interest}
                          onChange={(e) => handleArrayChange('researchInterests', index, e.target.value)}
                          className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Artificial Intelligence"
                        />
                        {facultyForm.researchInterests.length > 1 && (
                          <button
                            onClick={() => removeArrayItem('researchInterests', index)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Qualifications Section */}
              {activeSection === 'qualifications' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-gray-900">Educational Qualifications</h4>
                    <button
                      onClick={() => addArrayItem('qualifications', { degree: '', specialization: '', university: '', yearOfPassing: '', percentage: '', cgpa: '' })}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FaPlus className="mr-1" /> Add Qualification
                    </button>
                  </div>
                  {facultyForm.qualifications.map((qual, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-md relative">
                      {facultyForm.qualifications.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('qualifications', index)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      )}
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Qualification {index + 1}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                          <select
                            value={qual.degree}
                            onChange={(e) => handleArrayChange('qualifications', index, { ...qual, degree: e.target.value })}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select</option>
                            <option value="B.Sc.">B.Sc.</option>
                            <option value="M.Sc.">M.Sc.</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="M.Tech">M.Tech</option>
                            <option value="Ph.D.">Ph.D.</option>
                            <option value="B.A.">B.A.</option>
                            <option value="M.A.">M.A.</option>
                            <option value="B.Com">B.Com</option>
                            <option value="M.Com">M.Com</option>
                            <option value="MBA">MBA</option>
                            <option value="MCA">MCA</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                          <input
                            type="text"
                            value={qual.specialization}
                            onChange={(e) => handleArrayChange('qualifications', index, { ...qual, specialization: e.target.value })}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">University *</label>
                          <input
                            type="text"
                            value={qual.university}
                            onChange={(e) => handleArrayChange('qualifications', index, { ...qual, university: e.target.value })}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year of Passing *</label>
                          <input
                            type="number"
                            value={qual.yearOfPassing}
                            onChange={(e) => handleArrayChange('qualifications', index, { ...qual, yearOfPassing: e.target.value })}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            min="1950"
                            max={new Date().getFullYear()}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                          <input
                            type="number"
                            value={qual.percentage}
                            onChange={(e) => handleArrayChange('qualifications', index, { ...qual, percentage: e.target.value })}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                          <input
                            type="number"
                            value={qual.cgpa}
                            onChange={(e) => handleArrayChange('qualifications', index, { ...qual, cgpa: e.target.value })}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            max="10"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional Section - Publications, Awards, Committees */}
              {activeSection === 'optional' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900">Optional Information</h4>
                  
                  {/* Publications */}
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-md font-medium text-gray-900">Publications</h5>
                      <button
                        onClick={() => addArrayItem('publications', { title: '', journal: '', year: '', type: '' })}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <FaPlus className="mr-1" /> Add Publication
                      </button>
                    </div>
                    {facultyForm.publications.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No publications added yet. Click "Add Publication" to add one.</p>
                    ) : (
                      facultyForm.publications.map((pub, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md mb-3 relative">
                          <button
                            onClick={() => removeArrayItem('publications', index)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash size={14} />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
                              <input
                                type="text"
                                value={pub.title}
                                onChange={(e) => handleArrayChange('publications', index, { ...pub, title: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Publication title"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                              <select
                                value={pub.type}
                                onChange={(e) => handleArrayChange('publications', index, { ...pub, type: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Select</option>
                                <option value="Journal Paper">Journal Paper</option>
                                <option value="Conference Paper">Conference Paper</option>
                                <option value="Book">Book</option>
                                <option value="Book Chapter">Book Chapter</option>
                                <option value="Patent">Patent</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Journal/Conference</label>
                              <input
                                type="text"
                                value={pub.journal}
                                onChange={(e) => handleArrayChange('publications', index, { ...pub, journal: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                              <input
                                type="number"
                                value={pub.year}
                                onChange={(e) => handleArrayChange('publications', index, { ...pub, year: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                min="1900"
                                max={new Date().getFullYear() + 1}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Awards */}
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-md font-medium text-gray-900">Awards & Achievements</h5>
                      <button
                        onClick={() => addArrayItem('awards', { title: '', awardingBody: '', year: '', description: '' })}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <FaPlus className="mr-1" /> Add Award
                      </button>
                    </div>
                    {facultyForm.awards.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No awards added yet. Click "Add Award" to add one.</p>
                    ) : (
                      facultyForm.awards.map((award, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md mb-3 relative">
                          <button
                            onClick={() => removeArrayItem('awards', index)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash size={14} />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Award Title</label>
                              <input
                                type="text"
                                value={award.title}
                                onChange={(e) => handleArrayChange('awards', index, { ...award, title: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                              <input
                                type="number"
                                value={award.year}
                                onChange={(e) => handleArrayChange('awards', index, { ...award, year: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                min="1950"
                                max={new Date().getFullYear()}
                              />
                            </div>
                            <div className="md:col-span-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Awarding Body</label>
                              <input
                                type="text"
                                value={award.awardingBody}
                                onChange={(e) => handleArrayChange('awards', index, { ...award, awardingBody: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Committees */}
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-md font-medium text-gray-900">Committee Memberships</h5>
                      <button
                        onClick={() => addArrayItem('committees', { name: '', type: '', role: 'Member', duration: { from: '', to: '' } })}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <FaPlus className="mr-1" /> Add Committee
                      </button>
                    </div>
                    {facultyForm.committees.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No committees added yet. Click "Add Committee" to add one.</p>
                    ) : (
                      facultyForm.committees.map((committee, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md mb-3 relative">
                          <button
                            onClick={() => removeArrayItem('committees', index)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash size={14} />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Committee Name</label>
                              <input
                                type="text"
                                value={committee.name}
                                onChange={(e) => handleArrayChange('committees', index, { ...committee, name: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                              <select
                                value={committee.type}
                                onChange={(e) => handleArrayChange('committees', index, { ...committee, type: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Select</option>
                                <option value="Academic Council">Academic Council</option>
                                <option value="NAAC">NAAC</option>
                                <option value="NBA">NBA</option>
                                <option value="Research Committee">Research Committee</option>
                                <option value="Examination Committee">Examination Committee</option>
                                <option value="Purchase Committee">Purchase Committee</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                              <select
                                value={committee.role}
                                onChange={(e) => handleArrayChange('committees', index, { ...committee, role: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="Chairperson">Chairperson</option>
                                <option value="Member">Member</option>
                                <option value="Secretary">Secretary</option>
                                <option value="Convener">Convener</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                              <input
                                type="text"
                                value={committee.duration}
                                onChange={(e) => handleArrayChange('committees', index, { ...committee, duration: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., 2020-2023"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Financial Section */}
              {activeSection === 'financial' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Financial Information</h4>
                  
                  {/* Bank Details */}
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h5 className="text-md font-medium text-gray-900 mb-3">Bank Details</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
                        <input
                          type="text"
                          value={facultyForm.bankDetails.accountNumber}
                          onChange={(e) => handleFormChange('bankDetails.accountNumber', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                        <input
                          type="text"
                          value={facultyForm.bankDetails.bankName}
                          onChange={(e) => handleFormChange('bankDetails.bankName', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code *</label>
                        <input
                          type="text"
                          value={facultyForm.bankDetails.ifscCode}
                          onChange={(e) => handleFormChange('bankDetails.ifscCode', e.target.value.toUpperCase())}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          maxLength={11}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                        <input
                          type="text"
                          value={facultyForm.bankDetails.branchName}
                          onChange={(e) => handleFormChange('bankDetails.branchName', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Other Financial Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number *</label>
                      <input
                        type="text"
                        value={facultyForm.panNumber}
                        onChange={(e) => handleFormChange('panNumber', e.target.value.toUpperCase())}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        maxLength={10}
                        placeholder="ABCDE1234F"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                      <input
                        type="text"
                        value={facultyForm.aadharNumber}
                        onChange={(e) => handleFormChange('aadharNumber', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        maxLength={12}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PF Number</label>
                      <input
                        type="text"
                        value={facultyForm.pfNumber}
                        onChange={(e) => handleFormChange('pfNumber', e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Salary Details */}
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h5 className="text-md font-medium text-gray-900 mb-3">Salary Details</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Basic Pay *</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.basicPay}
                          onChange={(e) => handleFormChange('salaryDetails.basicPay', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="col-span-2 md:col-span-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Allowances</label>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">HRA</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.allowances.hra}
                          onChange={(e) => handleFormChange('salaryDetails.allowances.hra', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">DA</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.allowances.da}
                          onChange={(e) => handleFormChange('salaryDetails.allowances.da', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Medical</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.allowances.medical}
                          onChange={(e) => handleFormChange('salaryDetails.allowances.medical', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Transport</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.allowances.transport}
                          onChange={(e) => handleFormChange('salaryDetails.allowances.transport', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Other</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.allowances.other}
                          onChange={(e) => handleFormChange('salaryDetails.allowances.other', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="col-span-2 md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deductions</label>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">PF</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.deductions.pf}
                          onChange={(e) => handleFormChange('salaryDetails.deductions.pf', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Tax</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.deductions.tax}
                          onChange={(e) => handleFormChange('salaryDetails.deductions.tax', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Insurance</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.deductions.insurance}
                          onChange={(e) => handleFormChange('salaryDetails.deductions.insurance', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Other</label>
                        <input
                          type="number"
                          value={facultyForm.salaryDetails.deductions.other}
                          onChange={(e) => handleFormChange('salaryDetails.deductions.other', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t sticky bottom-0 bg-white">
              <button
                onClick={resetFormAndClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const sections = ['basic', 'address', 'professional', 'qualifications', 'optional', 'financial'];
                    const currentIndex = sections.indexOf(activeSection);
                    if (currentIndex > 0) {
                      setActiveSection(sections[currentIndex - 1]);
                    }
                  }}
                  disabled={activeSection === 'basic'}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {activeSection !== 'financial' ? (
                  <button
                    onClick={() => {
                      const sections = ['basic', 'address', 'professional', 'qualifications', 'optional', 'financial'];
                      const currentIndex = sections.indexOf(activeSection);
                      if (currentIndex < sections.length - 1) {
                        setActiveSection(sections[currentIndex + 1]);
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={isEditMode ? handleUpdateFaculty : handleSaveFaculty}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    {isEditMode ? 'Update Faculty' : 'Save Faculty'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Faculty Modal */}
      {showViewModal && selectedFaculty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Faculty Details</h3>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedFaculty(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Faculty ID</p>
                  <p className="font-medium">{selectedFaculty.facultyId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{selectedFaculty.firstName} {selectedFaculty.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{selectedFaculty.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium">{selectedFaculty.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium">{selectedFaculty.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Designation</p>
                  <p className="font-medium">{selectedFaculty.designation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-medium">{selectedFaculty.totalExperience} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedFaculty.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedFaculty.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && facultyToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Delete Faculty Member
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900">
                    {facultyToDelete.firstName} {facultyToDelete.lastName}
                  </span>
                  ? This action cannot be undone and will permanently remove all faculty data.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex space-x-3">
                  <button
                    onClick={cancelDeleteFaculty}
                    disabled={deleting}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 text-base font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteFaculty}
                    disabled={deleting}
                    className="flex-1 px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                  >
                    {deleting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      'Delete'
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

export default AdminFaculty;