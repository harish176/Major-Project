import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaCamera, FaMapMarkerAlt, FaIdCard, FaGraduationCap, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { showError, showSuccess, showLoading, dismissToast, ValidationMessages } from '../utils/toast.js';
import { authAPI } from '../utils/api.js';
import { uploadImageToCloudinary, isCloudinaryConfigured, getConfigurationStatus } from '../utils/cloudinary.js';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    studentPhoto: null,
    studentName: '',
    studentPhone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Default role
    
    // Family Information
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    
    // Category and Financial Information
    category: '',
    income: '',
    
    // Academic Information
    scholarNumber: '',
    jeeMainRank: '',
    jeeAdvancedRank: '',
    branch: '',
    degree: '',
    dateOfJoining: '',
    
    // Address Information
    state: '',
    city: '',
    pincode: '',
    
    // Personal Information
    nationality: '',
    motherTongue: '',
    aadharNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;
    const aadharRegex = /^[0-9]{12}$/;
    
    // Basic Information Validation
    if (!formData.studentName.trim()) {
      showError('Student name is required');
      return false;
    }
    
    if (!formData.studentPhone.trim()) {
      showError('Student phone number is required');
      return false;
    }
    
    if (!phoneRegex.test(formData.studentPhone.replace(/\s/g, ''))) {
      showError('Please enter a valid 10-digit phone number');
      return false;
    }
    
    if (!formData.email.trim()) {
      showError('Email is required');
      return false;
    }
    
    if (!emailRegex.test(formData.email)) {
      showError(ValidationMessages.INVALID_EMAIL);
      return false;
    }
    
    if (!formData.password.trim()) {
      showError('Password is required');
      return false;
    }
    
    if (formData.password.length < 8) {
      showError('Password must be at least 8 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      showError(ValidationMessages.PASSWORD_MISMATCH);
      return false;
    }
    
    // Family Information Validation
    if (!formData.fatherName.trim()) {
      showError('Father name is required');
      return false;
    }
    
    if (!formData.fatherPhone.trim()) {
      showError('Father phone number is required');
      return false;
    }
    
    if (!phoneRegex.test(formData.fatherPhone.replace(/\s/g, ''))) {
      showError('Please enter a valid father phone number');
      return false;
    }
    
    if (!formData.motherName.trim()) {
      showError('Mother name is required');
      return false;
    }
    
    // Academic Information Validation
    if (!formData.branch.trim()) {
      showError('Branch is required');
      return false;
    }
    
    if (!formData.degree.trim()) {
      showError('Degree is required');
      return false;
    }
    
    if (!formData.dateOfJoining.trim()) {
      showError('Date of joining is required');
      return false;
    }
    
    // Address Information Validation
    if (!formData.state.trim()) {
      showError('State is required');
      return false;
    }
    
    if (!formData.city.trim()) {
      showError('City is required');
      return false;
    }
    
    if (!formData.pincode.trim()) {
      showError('Pincode is required');
      return false;
    }
    
    if (!pincodeRegex.test(formData.pincode)) {
      showError('Please enter a valid 6-digit pincode');
      return false;
    }
    
    // Personal Information Validation
    if (!formData.nationality.trim()) {
      showError('Nationality is required');
      return false;
    }
    
    if (!formData.aadharNumber.trim()) {
      showError('Aadhar number is required');
      return false;
    }
    
    if (!aadharRegex.test(formData.aadharNumber.replace(/\s/g, ''))) {
      showError('Please enter a valid 12-digit Aadhar number');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const loadingToastId = showLoading('Creating account...');
    
    try {
      let studentPhotoUrl = null;
      let studentPhotoPublicId = null;

      // Upload image to Cloudinary if photo is selected
      if (formData.studentPhoto) {
        // Check Cloudinary configuration
        if (!isCloudinaryConfigured()) {
          dismissToast(loadingToastId);
          const configStatus = getConfigurationStatus();
          console.warn('Cloudinary configuration status:', configStatus);
          showError('Image upload is not configured. Please contact administrator.');
          return;
        }

        try {
          dismissToast(loadingToastId);
          const uploadingToastId = showLoading('Uploading photo...');
          
          const uploadResult = await uploadImageToCloudinary(
            formData.studentPhoto, 
            'student-photos'
          );
          
          dismissToast(uploadingToastId);
          const processingToastId = showLoading('Processing registration...');
          
          studentPhotoUrl = uploadResult.url;
          studentPhotoPublicId = uploadResult.public_id;
          
          dismissToast(processingToastId);
          
        } catch (uploadError) {
          dismissToast(loadingToastId);
          console.error('Photo upload error:', uploadError);
          showError(`Photo upload failed: ${uploadError.message}`);
          return;
        }
      }

      // Prepare data for API submission (JSON format, not FormData)
      const submitData = {
        // Basic Information
        studentName: formData.studentName,
        studentPhone: formData.studentPhone,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        studentPhotoUrl: studentPhotoUrl,
        studentPhotoPublicId: studentPhotoPublicId,
        
        // Family Information
        fatherName: formData.fatherName,
        fatherPhone: formData.fatherPhone,
        motherName: formData.motherName,
        fatherOccupation: formData.fatherOccupation,
        motherOccupation: formData.motherOccupation,
        
        // Category and Financial Information
        category: formData.category,
        income: formData.income ? parseFloat(formData.income) : null,
        
        // Academic Information
        scholarNumber: formData.scholarNumber,
        jeeMainRank: formData.jeeMainRank ? parseInt(formData.jeeMainRank) : null,
        jeeAdvancedRank: formData.jeeAdvancedRank ? parseInt(formData.jeeAdvancedRank) : null,
        branch: formData.branch,
        degree: formData.degree,
        dateOfJoining: formData.dateOfJoining,
        
        // Address Information
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        
        // Personal Information
        nationality: formData.nationality,
        motherTongue: formData.motherTongue,
        aadharNumber: formData.aadharNumber
      };

      // Remove empty fields
      Object.keys(submitData).forEach(key => {
        if (submitData[key] === '' || submitData[key] === null || submitData[key] === undefined) {
          delete submitData[key];
        }
      });

      const finalLoadingToastId = showLoading('Creating account...');

      // Send data to backend using the API instance
      const response = await authAPI.signup(submitData);
      
      dismissToast(finalLoadingToastId);
      
      if (response.data && response.data.success) {
        showSuccess(response.data.message || ValidationMessages.SIGNUP_SUCCESS);
        console.log('Signup successful:', response.data);
        
        // Clear form after successful signup
        setFormData({
          studentPhoto: null,
          studentName: '',
          studentPhone: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'student',
          fatherName: '',
          fatherPhone: '',
          motherName: '',
          fatherOccupation: '',
          motherOccupation: '',
          category: '',
          income: '',
          scholarNumber: '',
          jeeMainRank: '',
          jeeAdvancedRank: '',
          branch: '',
          degree: '',
          dateOfJoining: '',
          state: '',
          city: '',
          pincode: '',
          nationality: '',
          motherTongue: '',
          aadharNumber: ''
        });
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        showError(response.data?.message || 'Registration failed. Please try again.');
      }
      
    } catch (error) {
      dismissToast(loadingToastId);
      
      // Error handling is done by axios interceptor, but we can add specific handling here
      if (error.response?.data?.message) {
        showError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const errors = error.response.data.errors;
        if (Array.isArray(errors)) {
          errors.forEach(err => showError(err));
        } else {
          Object.values(errors).forEach(err => showError(err));
        }
      } else if (error.message) {
        showError(error.message);
      } else {
        showError(ValidationMessages.SIGNUP_FAILED);
      }
      
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="flex justify-center">
            <img src="/logo.jpg" alt="MANIT Logo" className="h-16 w-16" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Student Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <NavLink
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Sign in
            </NavLink>
          </p>
        </div>
        
        <form className="mt-8 bg-white shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Basic Information Section */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Basic Information</h3>
            </div>
            
            {/* Student Photo */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="studentPhoto" className="block text-sm font-medium text-gray-700 mb-2">
                Student Photo
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                  <FaCamera className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  id="studentPhoto"
                  name="studentPhoto"
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Student Name */}
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                Student Name *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Student Phone */}
            <div>
              <label htmlFor="studentPhone" className="block text-sm font-medium text-gray-700">
                Student Phone Number *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="studentPhone"
                  name="studentPhone"
                  type="tel"
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter 10-digit phone number"
                  value={formData.studentPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none focus:text-gray-800 z-20"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none focus:text-gray-800 z-20"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Family Information Section */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2 mt-6">Family Information</h3>
            </div>

            {/* Father Name */}
            <div>
              <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                Father Name *
              </label>
              <input
                id="fatherName"
                name="fatherName"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter father's name"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
            </div>

            {/* Father Phone */}
            <div>
              <label htmlFor="fatherPhone" className="block text-sm font-medium text-gray-700">
                Father Phone Number *
              </label>
              <input
                id="fatherPhone"
                name="fatherPhone"
                type="tel"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter father's phone number"
                value={formData.fatherPhone}
                onChange={handleInputChange}
              />
            </div>

            {/* Mother Name */}
            <div>
              <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
                Mother Name *
              </label>
              <input
                id="motherName"
                name="motherName"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter mother's name"
                value={formData.motherName}
                onChange={handleInputChange}
              />
            </div>

            {/* Father Occupation */}
            <div>
              <label htmlFor="fatherOccupation" className="block text-sm font-medium text-gray-700">
                Father Occupation
              </label>
              <input
                id="fatherOccupation"
                name="fatherOccupation"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter father's occupation"
                value={formData.fatherOccupation}
                onChange={handleInputChange}
              />
            </div>

            {/* Mother Occupation */}
            <div>
              <label htmlFor="motherOccupation" className="block text-sm font-medium text-gray-700">
                Mother Occupation
              </label>
              <input
                id="motherOccupation"
                name="motherOccupation"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter mother's occupation"
                value={formData.motherOccupation}
                onChange={handleInputChange}
              />
            </div>

            {/* Category and Financial Information */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2 mt-6">Category & Financial Information</h3>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>

            {/* Income */}
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-700">
                Family Income (Annual)
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaRupeeSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="income"
                  name="income"
                  type="number"
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter annual family income"
                  value={formData.income}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2 mt-6">Academic Information</h3>
            </div>

            {/* Scholar Number */}
            <div>
              <label htmlFor="scholarNumber" className="block text-sm font-medium text-gray-700">
                Scholar Number
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="scholarNumber"
                  name="scholarNumber"
                  type="text"
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter scholar number (e.g., 22104056)"
                  value={formData.scholarNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* JEE Main Rank */}
            <div>
              <label htmlFor="jeeMainRank" className="block text-sm font-medium text-gray-700">
                JEE Main Rank
              </label>
              <input
                id="jeeMainRank"
                name="jeeMainRank"
                type="number"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter JEE Main rank"
                value={formData.jeeMainRank}
                onChange={handleInputChange}
              />
            </div>

            {/* JEE Advanced Rank */}
            <div>
              <label htmlFor="jeeAdvancedRank" className="block text-sm font-medium text-gray-700">
                JEE Advanced Rank
              </label>
              <input
                id="jeeAdvancedRank"
                name="jeeAdvancedRank"
                type="number"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter JEE Advanced rank"
                value={formData.jeeAdvancedRank}
                onChange={handleInputChange}
              />
            </div>

            {/* Branch */}
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                Branch *
              </label>
              <select
                id="branch"
                name="branch"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.branch}
                onChange={handleInputChange}
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

            {/* Degree */}
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                Degree *
              </label>
              <select
                id="degree"
                name="degree"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.degree}
                onChange={handleInputChange}
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

            {/* Date of Joining */}
            <div>
              <label htmlFor="dateOfJoining" className="block text-sm font-medium text-gray-700">
                Date of Joining *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="dateOfJoining"
                  name="dateOfJoining"
                  type="date"
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2 mt-6">Address Information</h3>
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State *
              </label>
              <input
                id="state"
                name="state"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Pincode *
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter 6-digit pincode"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>

            {/* Personal Information */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2 mt-6">Personal Information</h3>
            </div>

            {/* Nationality */}
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                Nationality *
              </label>
              <input
                id="nationality"
                name="nationality"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              />
            </div>

            {/* Mother Tongue */}
            <div>
              <label htmlFor="motherTongue" className="block text-sm font-medium text-gray-700">
                Mother Tongue
              </label>
              <input
                id="motherTongue"
                name="motherTongue"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter mother tongue"
                value={formData.motherTongue}
                onChange={handleInputChange}
              />
            </div>

            {/* Aadhar Number */}
            <div>
              <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                Aadhar Number *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="aadharNumber"
                  name="aadharNumber"
                  type="text"
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter 12-digit Aadhar number"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 mt-8">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#002147] hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 cursor-pointer"
              >
                <FaGraduationCap className="mr-2" />
                Register Student
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;