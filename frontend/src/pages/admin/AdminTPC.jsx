import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showError } from '../../utils/toast.js';
import AdminNavbar from './AdminNavbar.jsx';
import CompaniesComponent from './CompaniesComponent.jsx';
import PlacementsComponent from './PlacementsComponent.jsx';
import TPCMembersComponent from './TPCMembersComponent.jsx';

const AdminTPC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('companies');

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
      } catch (error) {
        showError('Invalid user data. Please login again.');
        navigate('/login');
        return;
      }

      setLoading(false);
    };

    initializeAdmin();
  }, [navigate]);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'companies':
        return <CompaniesComponent />;
      case 'placements':
        return <PlacementsComponent />;
      case 'members':
        return <TPCMembersComponent />;
      default:
        return <CompaniesComponent />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading TPC management...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar user={user} />
      
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Training & Placement Cell</h1>
                <p className="text-sm text-gray-600">Manage companies, placements, and recruitment drives</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('companies')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'companies'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                  }`}
                >
                  Companies
                </button>
                <button
                  onClick={() => setActiveTab('placements')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'placements'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                  }`}
                >
                  Placements
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'members'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                  }`}
                >
                  TPC Members
                </button>
              </nav>
            </div>
          </div>

          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminTPC;