import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaPlus, FaEdit, FaTrash, FaSearch, FaBuilding, FaTimes } from 'react-icons/fa';
import { showError, showSuccess, showLoading, dismissToast } from '../../utils/toast.js';
import api, { companyAPI } from '../../utils/api.js';

const CompaniesComponent = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  const [companyFormData, setCompanyFormData] = useState({
    companyName: '',
    companyDetails: {
      description: ''
    },
    yearlyData: [{
      year: new Date().getFullYear(),
      package: {
        ctc: '',
        currency: 'INR',
        breakdown: {
          base: '',
          bonus: '',
          stockOptions: '',
          other: ''
        }
      },
      branchesAllowed: [''],
      coursesAllowed: [''],
      interviewMode: 'Virtual',
      visitDate: '',
      additionalInfo: {
        jobRole: '',
        jobLocation: [''],
        eligibilityCriteria: {
          minCGPA: '',
          maxBacklogs: '',
          other: ''
        },
        selectionProcess: [''],
        bondPeriod: '',
        notes: ''
      }
    }],
    contactInfo: {
      hrName: '',
      hrEmail: '',
      hrPhone: '',
      companyEmail: ''
    },
    tags: [''],
    rating: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Fetch companies from API
  const fetchCompanies = async (showRefreshMessage = false) => {
    setLoading(true);
    try {
      // First try: Get all companies without filters and with a higher limit
      const response = await companyAPI.getAllCompanies({ 
        limit: 100,
        page: 1
      });
      
      if (response && response.data) {
        // Handle different possible response structures
        let companiesData = [];
        
        if (response.data.success && response.data.data && response.data.data.companies) {
          companiesData = response.data.data.companies;
        } else if (response.data.companies) {
          companiesData = response.data.companies;
        } else if (Array.isArray(response.data)) {
          companiesData = response.data;
        } else if (response.data.success && Array.isArray(response.data.data)) {
          companiesData = response.data.data;
        }
        
        setCompanies(companiesData);
        
        if (showRefreshMessage) {
          showSuccess(`Refreshed! Found ${companiesData.length} company records`);
        } else if (companiesData.length === 0) {
          showError('No companies found in the database');
        }
      } else {
        console.error('Invalid response structure:', response);
        showError('Invalid response from server');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
        
        if (error.response.status === 404) {
          showError('Companies API endpoint not found. Check if backend is running.');
        } else if (error.response.status === 500) {
          showError('Server error. Check backend logs.');
        } else if (error.response.status === 401) {
          showError('Authentication error. Please login again.');
        } else {
          showError(`Error: ${error.response.data?.message || 'Failed to fetch companies'}`);
        }
      } else if (error.request) {
        console.error('Network error:', error.request);
        showError('Network error. Check if backend is running on http://localhost:5000');
      } else {
        console.error('Request setup error:', error.message);
        showError('Request error: ' + error.message);
      }
      
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = () => {
    setShowCompanyForm(true);
  };

  const handleCompanyFormChange = (e, yearIndex = null, fieldPath = '') => {
    const { name, value } = e.target;
    
    setCompanyFormData(prev => {
      if (yearIndex !== null && fieldPath) {
        // Handle nested fields in yearly data
        const updatedYearlyData = [...prev.yearlyData];
        const keys = fieldPath.split('.');
        let current = updatedYearlyData[yearIndex];
        
        // Navigate to the correct nested object
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        
        const newData = { ...prev, yearlyData: updatedYearlyData };
        return newData;
      } else if (name && name.includes('.')) {
        // Handle nested fields for non-yearly data
        const keys = name.split('.');
        const newData = { ...prev };
        let current = newData;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        
        return newData;
      } else {
        // Handle simple fields
        const newData = { ...prev, [name]: value };
        return newData;
      }
    });
  };

  const addYearData = () => {
    setCompanyFormData(prev => ({
      ...prev,
      yearlyData: [...prev.yearlyData, {
        year: new Date().getFullYear() + prev.yearlyData.length,
        package: {
          ctc: '',
          currency: 'INR',
          breakdown: { base: '', bonus: '', stockOptions: '', other: '' }
        },
        branchesAllowed: [''],
        coursesAllowed: [''],
        interviewMode: 'Virtual',
        visitDate: '',
        additionalInfo: {
          jobRole: '',
          jobLocation: [''],
          eligibilityCriteria: { minCGPA: '', maxBacklogs: '', other: '' },
          selectionProcess: [''],
          bondPeriod: '',
          notes: ''
        }
      }]
    }));
  };

  const removeYearData = (index) => {
    setCompanyFormData(prev => ({
      ...prev,
      yearlyData: prev.yearlyData.filter((_, i) => i !== index)
    }));
  };

  const handleSaveCompany = async () => {
    if (editingCompany) {
      await handleUpdateCompany();
    } else {
      await handleCreateCompany();
    }
  };

  const handleCreateCompany = async () => {
    let loadingToast;
    try {
      // Validate required fields
      if (!companyFormData.companyName?.trim()) {
        showError('Company name is required');
        return;
      }

      if (!companyFormData.yearlyData || companyFormData.yearlyData.length === 0) {
        showError('At least one year data is required');
        return;
      }

      // Validate yearly data
      for (let i = 0; i < companyFormData.yearlyData.length; i++) {
        const yearData = companyFormData.yearlyData[i];
        
        if (!yearData.year || !yearData.package.ctc || !yearData.visitDate) {
          showError(`Year ${i + 1}: Year, Package CTC, and Visit Date are required`);
          return;
        }

        if (!yearData.branchesAllowed.some(branch => branch.trim())) {
          showError(`Year ${i + 1}: At least one branch must be specified`);
          return;
        }

        if (!yearData.coursesAllowed.some(course => course.trim())) {
          showError(`Year ${i + 1}: At least one course must be specified`);
          return;
        }
      }

      loadingToast = showLoading('Adding company...');

      // Clean up the data before sending
      const cleanedData = {
        companyName: companyFormData.companyName.trim(),
        companyDetails: {
          ...(companyFormData.companyDetails.description && { description: companyFormData.companyDetails.description.trim() })
        },
        yearlyData: companyFormData.yearlyData.map(yearData => ({
          year: parseInt(yearData.year),
          package: {
            ctc: parseFloat(yearData.package.ctc),
            currency: yearData.package.currency,
            ...(yearData.package.breakdown.base && { breakdown: {
              ...(yearData.package.breakdown.base && { base: parseFloat(yearData.package.breakdown.base) }),
              ...(yearData.package.breakdown.bonus && { bonus: parseFloat(yearData.package.breakdown.bonus) }),
              ...(yearData.package.breakdown.stockOptions && { stockOptions: parseFloat(yearData.package.breakdown.stockOptions) }),
              ...(yearData.package.breakdown.other && { other: parseFloat(yearData.package.breakdown.other) })
            }})
          },
          branchesAllowed: yearData.branchesAllowed.filter(b => b.trim()),
          coursesAllowed: yearData.coursesAllowed.filter(c => c.trim()),
          interviewMode: yearData.interviewMode,
          visitDate: new Date(yearData.visitDate),
          additionalInfo: {
            ...(yearData.additionalInfo.jobRole && { jobRole: yearData.additionalInfo.jobRole.trim() }),
            ...(yearData.additionalInfo.jobLocation.some(loc => loc.trim()) && { 
              jobLocation: yearData.additionalInfo.jobLocation.filter(loc => loc.trim()) 
            }),
            eligibilityCriteria: {
              ...(yearData.additionalInfo.eligibilityCriteria.minCGPA && { 
                minCGPA: parseFloat(yearData.additionalInfo.eligibilityCriteria.minCGPA) 
              }),
              ...(yearData.additionalInfo.eligibilityCriteria.maxBacklogs && { 
                maxBacklogs: parseInt(yearData.additionalInfo.eligibilityCriteria.maxBacklogs) 
              }),
              ...(yearData.additionalInfo.eligibilityCriteria.other && { 
                other: yearData.additionalInfo.eligibilityCriteria.other.trim() 
              })
            },
            ...(yearData.additionalInfo.selectionProcess.some(proc => proc.trim()) && { 
              selectionProcess: yearData.additionalInfo.selectionProcess.filter(proc => proc.trim()) 
            }),
            ...(yearData.additionalInfo.bondPeriod && { bondPeriod: parseInt(yearData.additionalInfo.bondPeriod) }),
            ...(yearData.additionalInfo.notes && { notes: yearData.additionalInfo.notes.trim() })
          }
        })),
        contactInfo: {
          ...(companyFormData.contactInfo.hrName && { hrName: companyFormData.contactInfo.hrName.trim() }),
          ...(companyFormData.contactInfo.hrEmail && { hrEmail: companyFormData.contactInfo.hrEmail.trim() }),
          ...(companyFormData.contactInfo.hrPhone && { hrPhone: companyFormData.contactInfo.hrPhone.trim() }),
          ...(companyFormData.contactInfo.companyEmail && { companyEmail: companyFormData.contactInfo.companyEmail.trim() })
        },
        ...(companyFormData.tags.some(tag => tag.trim()) && { 
          tags: companyFormData.tags.filter(tag => tag.trim()) 
        }),
        ...(companyFormData.rating && { rating: parseFloat(companyFormData.rating) })
      };

      // Add API call here
      const response = await companyAPI.createCompany(cleanedData);
      
      if (response.data.success) {
        dismissToast(loadingToast);
        showSuccess('Company added successfully!');
        setShowCompanyForm(false);
        resetCompanyForm();
        await fetchCompanies(); // Refresh the companies list
      } else {
        throw new Error(response.data.message || 'Failed to add company');
      }
    } catch (error) {
      if (loadingToast) {
        dismissToast(loadingToast);
      }
      console.error('Error adding company:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add company';
      showError(errorMessage);
    }
  };

  const resetCompanyForm = () => {
    setCompanyFormData({
      companyName: '',
      companyDetails: {
        description: ''
      },
      yearlyData: [{
        year: new Date().getFullYear(),
        package: {
          ctc: '',
          currency: 'INR',
          breakdown: {
            base: '',
            bonus: '',
            stockOptions: '',
            other: ''
          }
        },
        branchesAllowed: [''],
        coursesAllowed: [''],
        interviewMode: 'Virtual',
        visitDate: '',
        additionalInfo: {
          jobRole: '',
          jobLocation: [''],
          eligibilityCriteria: {
            minCGPA: '',
            maxBacklogs: '',
            other: ''
          },
          selectionProcess: [''],
          bondPeriod: '',
          notes: ''
        }
      }],
      contactInfo: {
        hrName: '',
        hrEmail: '',
        hrPhone: '',
        companyEmail: ''
      },
      tags: [''],
      rating: ''
    });
  };

  const handleCancelCompany = () => {
    setShowCompanyForm(false);
    setEditingCompany(null);
    resetCompanyForm();
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    const formData = {
      companyName: company.companyName || '',
      companyDetails: {
        description: company.companyDetails?.description || ''
      },
      yearlyData: company.yearlyData && company.yearlyData.length > 0 ? company.yearlyData.map(yearData => ({
        year: yearData.year || new Date().getFullYear(),
        package: {
          ctc: yearData.package?.ctc || '',
          currency: yearData.package?.currency || 'INR',
          breakdown: {
            base: yearData.package?.breakdown?.base || '',
            bonus: yearData.package?.breakdown?.bonus || '',
            stockOptions: yearData.package?.breakdown?.stockOptions || '',
            other: yearData.package?.breakdown?.other || ''
          }
        },
        branchesAllowed: yearData.branchesAllowed || [''],
        coursesAllowed: yearData.coursesAllowed || [''],
        interviewMode: yearData.interviewMode || 'Virtual',
        visitDate: yearData.visitDate ? new Date(yearData.visitDate).toISOString().split('T')[0] : '',
        additionalInfo: {
          jobRole: yearData.additionalInfo?.jobRole || '',
          jobLocation: yearData.additionalInfo?.jobLocation || [''],
          eligibilityCriteria: {
            minCGPA: yearData.additionalInfo?.eligibilityCriteria?.minCGPA || '',
            maxBacklogs: yearData.additionalInfo?.eligibilityCriteria?.maxBacklogs || '',
            other: yearData.additionalInfo?.eligibilityCriteria?.other || ''
          },
          selectionProcess: yearData.additionalInfo?.selectionProcess || [''],
          bondPeriod: yearData.additionalInfo?.bondPeriod || '',
          notes: yearData.additionalInfo?.notes || ''
        }
      })) : [{
        year: new Date().getFullYear(),
        package: {
          ctc: '',
          currency: 'INR',
          breakdown: { base: '', bonus: '', stockOptions: '', other: '' }
        },
        branchesAllowed: [''],
        coursesAllowed: [''],
        interviewMode: 'Virtual',
        visitDate: '',
        additionalInfo: {
          jobRole: '',
          jobLocation: [''],
          eligibilityCriteria: { minCGPA: '', maxBacklogs: '', other: '' },
          selectionProcess: [''],
          bondPeriod: '',
          notes: ''
        }
      }],
      contactInfo: {
        hrName: company.contactInfo?.hrName || '',
        hrEmail: company.contactInfo?.hrEmail || '',
        hrPhone: company.contactInfo?.hrPhone || '',
        companyEmail: company.contactInfo?.companyEmail || ''
      },
      tags: company.tags || [''],
      rating: company.rating || ''
    };
    setCompanyFormData(formData);
    setShowCompanyForm(true);
  };

  const handleUpdateCompany = async () => {
    let loadingToast;
    try {
      // Use the same validation logic as save
      if (!companyFormData.companyName?.trim()) {
        showError('Company name is required');
        return;
      }

      if (!companyFormData.yearlyData || companyFormData.yearlyData.length === 0) {
        showError('At least one year data is required');
        return;
      }

      // Validate yearly data
      for (let i = 0; i < companyFormData.yearlyData.length; i++) {
        const yearData = companyFormData.yearlyData[i];
        
        if (!yearData.year || !yearData.package.ctc || !yearData.visitDate) {
          showError(`Year ${i + 1}: Year, Package CTC, and Visit Date are required`);
          return;
        }

        if (!yearData.branchesAllowed.some(branch => branch.trim())) {
          showError(`Year ${i + 1}: At least one branch must be specified`);
          return;
        }

        if (!yearData.coursesAllowed.some(course => course.trim())) {
          showError(`Year ${i + 1}: At least one course must be specified`);
          return;
        }
      }

      loadingToast = showLoading('Updating company...');

      // Use the same data cleaning logic as save
      const cleanedData = {
        companyName: companyFormData.companyName.trim(),
        companyDetails: {
          ...(companyFormData.companyDetails.description && { description: companyFormData.companyDetails.description.trim() })
        },
        yearlyData: companyFormData.yearlyData.map(yearData => ({
          year: parseInt(yearData.year),
          package: {
            ctc: parseFloat(yearData.package.ctc),
            currency: yearData.package.currency,
            ...(yearData.package.breakdown.base && { breakdown: {
              ...(yearData.package.breakdown.base && { base: parseFloat(yearData.package.breakdown.base) }),
              ...(yearData.package.breakdown.bonus && { bonus: parseFloat(yearData.package.breakdown.bonus) }),
              ...(yearData.package.breakdown.stockOptions && { stockOptions: parseFloat(yearData.package.breakdown.stockOptions) }),
              ...(yearData.package.breakdown.other && { other: parseFloat(yearData.package.breakdown.other) })
            }})
          },
          branchesAllowed: yearData.branchesAllowed.filter(b => b.trim()),
          coursesAllowed: yearData.coursesAllowed.filter(c => c.trim()),
          interviewMode: yearData.interviewMode,
          visitDate: new Date(yearData.visitDate),
          additionalInfo: {
            ...(yearData.additionalInfo.jobRole && { jobRole: yearData.additionalInfo.jobRole.trim() }),
            ...(yearData.additionalInfo.jobLocation.some(loc => loc.trim()) && { 
              jobLocation: yearData.additionalInfo.jobLocation.filter(loc => loc.trim()) 
            }),
            eligibilityCriteria: {
              ...(yearData.additionalInfo.eligibilityCriteria.minCGPA && { 
                minCGPA: parseFloat(yearData.additionalInfo.eligibilityCriteria.minCGPA) 
              }),
              ...(yearData.additionalInfo.eligibilityCriteria.maxBacklogs && { 
                maxBacklogs: parseInt(yearData.additionalInfo.eligibilityCriteria.maxBacklogs) 
              }),
              ...(yearData.additionalInfo.eligibilityCriteria.other && { 
                other: yearData.additionalInfo.eligibilityCriteria.other.trim() 
              })
            },
            ...(yearData.additionalInfo.selectionProcess.some(proc => proc.trim()) && { 
              selectionProcess: yearData.additionalInfo.selectionProcess.filter(proc => proc.trim()) 
            }),
            ...(yearData.additionalInfo.bondPeriod && { bondPeriod: parseInt(yearData.additionalInfo.bondPeriod) }),
            ...(yearData.additionalInfo.notes && { notes: yearData.additionalInfo.notes.trim() })
          }
        })),
        contactInfo: {
          ...(companyFormData.contactInfo.hrName && { hrName: companyFormData.contactInfo.hrName.trim() }),
          ...(companyFormData.contactInfo.hrEmail && { hrEmail: companyFormData.contactInfo.hrEmail.trim() }),
          ...(companyFormData.contactInfo.hrPhone && { hrPhone: companyFormData.contactInfo.hrPhone.trim() }),
          ...(companyFormData.contactInfo.companyEmail && { companyEmail: companyFormData.contactInfo.companyEmail.trim() })
        },
        ...(companyFormData.tags.some(tag => tag.trim()) && { 
          tags: companyFormData.tags.filter(tag => tag.trim()) 
        }),
        ...(companyFormData.rating && { rating: parseFloat(companyFormData.rating) })
      };

      const response = await companyAPI.updateCompany(editingCompany._id, cleanedData);
      
      if (response.data.success) {
        dismissToast(loadingToast);
        showSuccess('Company updated successfully!');
        setShowCompanyForm(false);
        setEditingCompany(null);
        resetCompanyForm();
        await fetchCompanies();
      } else {
        throw new Error(response.data.message || 'Failed to update company');
      }
    } catch (error) {
      if (loadingToast) {
        dismissToast(loadingToast);
      }
      console.error('Error updating company:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update company';
      showError(errorMessage);
    }
  };

  const handleDeleteCompany = (company) => {
    setCompanyToDelete(company);
    setShowDeleteModal(true);
  };

  const confirmDeleteCompany = async (permanent = true) => {
    if (!companyToDelete) return;

    setDeleting(true);
    const deleteType = permanent ? 'Permanently deleting' : 'Deactivating';
    const loadingToast = showLoading(`${deleteType} ${companyToDelete.companyName}...`);

    try {
      let response;
      
      
      if (permanent) {
        // Permanent delete - remove from database completely
        response = await companyAPI.permanentlyDeleteCompany(companyToDelete._id);
      } else {
        // Soft delete - set isActive to false
        response = await companyAPI.deleteCompany(companyToDelete._id);
      }
      
      if (response.data.success) {
        
        // Remove from local state (for both soft and hard delete)
        setCompanies(prev => {
          const filteredCompanies = prev.filter(c => c._id !== companyToDelete._id);
          return filteredCompanies;
        });
        
        dismissToast(loadingToast);
        const message = permanent 
          ? `${companyToDelete.companyName} permanently deleted from database`
          : `${companyToDelete.companyName} deactivated successfully`;
        showSuccess(message);
        
        // Reset state
        setShowDeleteModal(false);
        setCompanyToDelete(null);
        
        // Refresh the companies list to ensure we have the latest data
        fetchCompanies();
      } else {
        throw new Error(response.data.message || 'Failed to delete company');
      }
    } catch (error) {
      dismissToast(loadingToast);
      console.error('Error deleting company:', error);
      
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        showError(message || 'Failed to delete company');
      } else {
        showError('An unexpected error occurred while deleting company');
      }
    } finally {
      setDeleting(false);
    }
  };

  const cancelDeleteCompany = () => {
    setShowDeleteModal(false);
    setCompanyToDelete(null);
  };

  const filteredCompanies = companies.filter(company => {
    if (!company) return false;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Check company name
    const nameMatch = company.companyName && company.companyName.toLowerCase().includes(searchLower);
    
    // Check description
    const descriptionMatch = company.companyDetails?.description && 
      company.companyDetails.description.toLowerCase().includes(searchLower);
    
    // Check tags
    const tagMatch = company.tags && Array.isArray(company.tags) && 
      company.tags.some(tag => tag && tag.toLowerCase().includes(searchLower));
    
    return nameMatch || descriptionMatch || tagMatch;
  });

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading companies...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Company Visits</h2>
          <p className="text-sm text-gray-600">Manage company visits and recruitment drives</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleAddCompany}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            <FaPlus className="mr-2" />
            Add Company
          </button>
          <button
            onClick={() => fetchCompanies(true)}
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
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-8">
              <FaBriefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No companies found matching your criteria.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Companies in state: {companies.length}</p>
                <p>Filtered data length: {filteredCompanies.length}</p>
                <p>Search term: "{searchTerm}"</p>
                {companies.length > 0 && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                    <p>Sample company structure:</p>
                    <pre>{JSON.stringify(companies[0], null, 2)}</pre>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <div key={company._id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-medium">
                        <FaBuilding />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">{company.companyName}</h4>
                        <p className="text-sm text-gray-600">
                          {company.companyDetails?.description || 'No description available'}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      company.isActive 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {company.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {company.yearlyData && company.yearlyData.length > 0 && (
                      <>
                        <div className="text-sm text-gray-600">
                          <strong>Latest Visit:</strong> {company.yearlyData[0].visitDate ? new Date(company.yearlyData[0].visitDate).toLocaleDateString() : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Package:</strong> {company.yearlyData[0].package?.currency || 'INR'} {company.yearlyData[0].package?.ctc?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Interview Mode:</strong> {company.yearlyData[0].interviewMode || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Branches:</strong> {company.yearlyData[0].branchesAllowed?.join(', ') || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Courses:</strong> {company.yearlyData[0].coursesAllowed?.join(', ') || 'N/A'}
                        </div>
                      </>
                    )}
                    {company.tags && company.tags.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <strong>Tags:</strong> {company.tags.join(', ')}
                      </div>
                    )}
                    {company.rating && (
                      <div className="text-sm text-gray-600">
                        <strong>Rating:</strong> {company.rating}/5
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => handleEditCompany(company)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                    >
                      <FaEdit className="inline mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCompany(company)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                    >
                      <FaTrash className="inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Company Form Modal - Similar structure as in original file */}
      {showCompanyForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-5/6 lg:w-4/5 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingCompany ? 'Edit Company' : 'Add Company'}
              </h3>
              <button
                onClick={handleCancelCompany}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            {/* Company Form Content */}
            <form className="space-y-6 max-h-96 overflow-y-auto">
              {/* Basic Company Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={companyFormData.companyName}
                      onChange={handleCompanyFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      value={companyFormData.rating}
                      onChange={handleCompanyFormChange}
                      min="1"
                      max="5"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Rating (1-5)"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="companyDetails.description" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Description
                  </label>
                  <textarea
                    id="companyDetails.description"
                    name="companyDetails.description"
                    value={companyFormData.companyDetails.description}
                    onChange={handleCompanyFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter company description"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactInfo.hrName" className="block text-sm font-medium text-gray-700 mb-1">
                      HR Name
                    </label>
                    <input
                      type="text"
                      id="contactInfo.hrName"
                      name="contactInfo.hrName"
                      value={companyFormData.contactInfo.hrName}
                      onChange={handleCompanyFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="HR Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactInfo.hrEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      HR Email
                    </label>
                    <input
                      type="email"
                      id="contactInfo.hrEmail"
                      name="contactInfo.hrEmail"
                      value={companyFormData.contactInfo.hrEmail}
                      onChange={handleCompanyFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="HR Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactInfo.hrPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      HR Phone
                    </label>
                    <input
                      type="tel"
                      id="contactInfo.hrPhone"
                      name="contactInfo.hrPhone"
                      value={companyFormData.contactInfo.hrPhone}
                      onChange={handleCompanyFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="HR Phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactInfo.companyEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Email
                    </label>
                    <input
                      type="email"
                      id="contactInfo.companyEmail"
                      name="contactInfo.companyEmail"
                      value={companyFormData.contactInfo.companyEmail}
                      onChange={handleCompanyFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Company Email"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-3">Tags</h4>
                <div className="space-y-2">
                  {companyFormData.tags.map((tag, tagIndex) => (
                    <div key={tagIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => {
                          const updatedTags = [...companyFormData.tags];
                          updatedTags[tagIndex] = e.target.value;
                          setCompanyFormData(prev => ({ ...prev, tags: updatedTags }));
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Core, IT, Finance, Consulting"
                      />
                      {companyFormData.tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedTags = companyFormData.tags.filter((_, i) => i !== tagIndex);
                            setCompanyFormData(prev => ({ ...prev, tags: updatedTags }));
                          }}
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedTags = [...companyFormData.tags, ''];
                      setCompanyFormData(prev => ({ ...prev, tags: updatedTags }));
                    }}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Yearly Data */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-md font-medium text-gray-900">Yearly Data</h4>
                  <button
                    type="button"
                    onClick={addYearData}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                  >
                    Add Year
                  </button>
                </div>
                
                {companyFormData.yearlyData.map((yearData, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-sm font-medium text-gray-800">Year Data {index + 1}</h5>
                      {companyFormData.yearlyData.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeYearData(index)}
                          className="px-2 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                        <input
                          type="number"
                          value={yearData.year}
                          onChange={(e) => handleCompanyFormChange(e, index, 'year')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Year (e.g., 2024)"
                          min="2000"
                          max="2100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CTC (Amount) *</label>
                        <input
                          type="number"
                          value={yearData.package.ctc}
                          onChange={(e) => handleCompanyFormChange(e, index, 'package.ctc')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="CTC in numbers (e.g., 1200000)"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                        <select
                          value={yearData.package.currency}
                          onChange={(e) => handleCompanyFormChange(e, index, 'package.currency')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="INR">INR</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Interview Mode *</label>
                        <select
                          value={yearData.interviewMode}
                          onChange={(e) => handleCompanyFormChange(e, index, 'interviewMode')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="Virtual">Virtual</option>
                          <option value="Offline">Offline</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date *</label>
                        <input
                          type="date"
                          value={yearData.visitDate}
                          onChange={(e) => handleCompanyFormChange(e, index, 'visitDate')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                        <input
                          type="text"
                          value={yearData.additionalInfo.jobRole}
                          onChange={(e) => handleCompanyFormChange(e, index, 'additionalInfo.jobRole')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Software Engineer, Analyst, etc."
                        />
                      </div>
                    </div>

                    {/* Package Breakdown (Optional) */}
                    <div className="mt-4">
                      <h6 className="text-sm font-medium text-gray-700 mb-2">Package Breakdown (Optional)</h6>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Base Salary</label>
                          <input
                            type="number"
                            min="0"
                            value={yearData.package.breakdown.base}
                            onChange={(e) => handleCompanyFormChange(e, index, 'package.breakdown.base')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Base salary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Bonus</label>
                          <input
                            type="number"
                            min="0"
                            value={yearData.package.breakdown.bonus}
                            onChange={(e) => handleCompanyFormChange(e, index, 'package.breakdown.bonus')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Annual bonus"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Stock Options</label>
                          <input
                            type="number"
                            min="0"
                            value={yearData.package.breakdown.stockOptions}
                            onChange={(e) => handleCompanyFormChange(e, index, 'package.breakdown.stockOptions')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Stock options value"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Other Benefits</label>
                          <input
                            type="number"
                            min="0"
                            value={yearData.package.breakdown.other}
                            onChange={(e) => handleCompanyFormChange(e, index, 'package.breakdown.other')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Other benefits value"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Branches Allowed */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Branches Allowed *</label>
                      <div className="space-y-2">
                        {yearData.branchesAllowed.map((branch, branchIndex) => (
                          <div key={branchIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={branch}
                              onChange={(e) => {
                                const updatedBranches = [...yearData.branchesAllowed];
                                updatedBranches[branchIndex] = e.target.value;
                                handleCompanyFormChange({ target: { value: updatedBranches } }, index, 'branchesAllowed');
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Computer Science, Mechanical, All Branches"
                            />
                            {yearData.branchesAllowed.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedBranches = yearData.branchesAllowed.filter((_, i) => i !== branchIndex);
                                  handleCompanyFormChange({ target: { value: updatedBranches } }, index, 'branchesAllowed');
                                }}
                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedBranches = [...yearData.branchesAllowed, ''];
                            handleCompanyFormChange({ target: { value: updatedBranches } }, index, 'branchesAllowed');
                          }}
                          className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Add Branch
                        </button>
                      </div>
                    </div>

                    {/* Courses Allowed */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Courses Allowed *</label>
                      <div className="space-y-2">
                        {yearData.coursesAllowed.map((course, courseIndex) => (
                          <div key={courseIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={course}
                              onChange={(e) => {
                                const updatedCourses = [...yearData.coursesAllowed];
                                updatedCourses[courseIndex] = e.target.value;
                                handleCompanyFormChange({ target: { value: updatedCourses } }, index, 'coursesAllowed');
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., B.Tech, M.Tech, MBA, All Courses"
                            />
                            {yearData.coursesAllowed.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedCourses = yearData.coursesAllowed.filter((_, i) => i !== courseIndex);
                                  handleCompanyFormChange({ target: { value: updatedCourses } }, index, 'coursesAllowed');
                                }}
                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedCourses = [...yearData.coursesAllowed, ''];
                            handleCompanyFormChange({ target: { value: updatedCourses } }, index, 'coursesAllowed');
                          }}
                          className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Add Course
                        </button>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min CGPA</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          value={yearData.additionalInfo.eligibilityCriteria.minCGPA}
                          onChange={(e) => handleCompanyFormChange(e, index, 'additionalInfo.eligibilityCriteria.minCGPA')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 7.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Backlogs</label>
                        <input
                          type="number"
                          min="0"
                          value={yearData.additionalInfo.eligibilityCriteria.maxBacklogs}
                          onChange={(e) => handleCompanyFormChange(e, index, 'additionalInfo.eligibilityCriteria.maxBacklogs')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bond Period (months)</label>
                        <input
                          type="number"
                          min="0"
                          value={yearData.additionalInfo.bondPeriod}
                          onChange={(e) => handleCompanyFormChange(e, index, 'additionalInfo.bondPeriod')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 24"
                        />
                      </div>
                    </div>

                    {/* Other Eligibility Criteria */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Other Eligibility Criteria</label>
                      <textarea
                        value={yearData.additionalInfo.eligibilityCriteria.other}
                        onChange={(e) => handleCompanyFormChange(e, index, 'additionalInfo.eligibilityCriteria.other')}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Any other eligibility criteria or requirements"
                      />
                    </div>

                    {/* Job Locations */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Locations</label>
                      <div className="space-y-2">
                        {yearData.additionalInfo.jobLocation.map((location, locationIndex) => (
                          <div key={locationIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={location}
                              onChange={(e) => {
                                const updatedLocations = [...yearData.additionalInfo.jobLocation];
                                updatedLocations[locationIndex] = e.target.value;
                                handleCompanyFormChange({ target: { value: updatedLocations } }, index, 'additionalInfo.jobLocation');
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Bangalore, Mumbai, Remote"
                            />
                            {yearData.additionalInfo.jobLocation.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedLocations = yearData.additionalInfo.jobLocation.filter((_, i) => i !== locationIndex);
                                  handleCompanyFormChange({ target: { value: updatedLocations } }, index, 'additionalInfo.jobLocation');
                                }}
                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedLocations = [...yearData.additionalInfo.jobLocation, ''];
                            handleCompanyFormChange({ target: { value: updatedLocations } }, index, 'additionalInfo.jobLocation');
                          }}
                          className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Add Location
                        </button>
                      </div>
                    </div>

                    {/* Selection Process */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Selection Process</label>
                      <div className="space-y-2">
                        {yearData.additionalInfo.selectionProcess.map((process, processIndex) => (
                          <div key={processIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={process}
                              onChange={(e) => {
                                const updatedProcess = [...yearData.additionalInfo.selectionProcess];
                                updatedProcess[processIndex] = e.target.value;
                                handleCompanyFormChange({ target: { value: updatedProcess } }, index, 'additionalInfo.selectionProcess');
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Online Test, Technical Interview, HR Interview"
                            />
                            {yearData.additionalInfo.selectionProcess.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedProcess = yearData.additionalInfo.selectionProcess.filter((_, i) => i !== processIndex);
                                  handleCompanyFormChange({ target: { value: updatedProcess } }, index, 'additionalInfo.selectionProcess');
                                }}
                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedProcess = [...yearData.additionalInfo.selectionProcess, ''];
                            handleCompanyFormChange({ target: { value: updatedProcess } }, index, 'additionalInfo.selectionProcess');
                          }}
                          className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Add Process Step
                        </button>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        value={yearData.additionalInfo.notes}
                        onChange={(e) => handleCompanyFormChange(e, index, 'additionalInfo.notes')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Additional notes about the company or placement process"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </form>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancelCompany}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCompany}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {editingCompany ? 'Update Company' : 'Save Company'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && companyToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Delete Company
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 mb-4">
                  Choose how to delete{" "}
                  <span className="font-semibold text-gray-900">
                    {companyToDelete.companyName}
                  </span>:
                </p>
                <div className="text-left space-y-3 mb-4">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Deactivate:</strong> Company remains in database but is hidden from lists. Can be restored later.
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Permanent Delete:</strong> Company is completely removed from database. This cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={cancelDeleteCompany}
                      disabled={deleting}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 text-base font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => confirmDeleteCompany(false)}
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
                    onClick={() => confirmDeleteCompany(true)}
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

export default CompaniesComponent;