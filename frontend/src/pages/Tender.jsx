import React, { useState } from 'react';

const Tender = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tenderData = [
    {
      id: 1,
      title: "Supply of Portable Oscilloscope",
      tenderNo: "MANIT/CHEMICAL/2024:9847",
      dueDate: "24-Nov-2025",
      department: "Chemical Engineering",
      status: "Open"
    },
    {
      id: 2,
      title: "Supply of Electrospinwriting Machine",
      tenderNo: "MANIT/CHEMICAL/2024:9852",
      dueDate: "28-Nov-2025",
      department: "Chemical Engineering",
      status: "Open"
    },
    {
      id: 3,
      title: "Supply of Cyclical Force Generator",
      tenderNo: "MANIT/CHEMICAL/2024:9851",
      dueDate: "24-Nov-2025",
      department: "Chemical Engineering",
      status: "Open"
    },
    {
      id: 4,
      title: "NIQ of Grass Cutting for Cricket Ground & Track and Field Ground at MANIT Bhopal",
      tenderNo: "CM/2025/NIQ/1650",
      dueDate: "13-Nov-2025",
      department: "Civil Maintenance",
      status: "Closed"
    },
    {
      id: 5,
      title: "NIQ OF PROVIDING AND LAYING SEWAGE LINE",
      tenderNo: "CM/2025/NIQ/1651",
      dueDate: "14-Nov-2025",
      department: "Civil Maintenance",
      status: "Closed"
    },
    {
      id: 6,
      title: "Supply of Dual Arc-melting Furnace assembly",
      tenderNo: "MANIT/PHY/2025:14",
      dueDate: "27-Nov-2025",
      department: "Physics",
      status: "Open"
    },
    {
      id: 7,
      title: "Supply of Load Testing module",
      tenderNo: "MANIT/EN/2025:10",
      dueDate: "24-Nov-2025",
      department: "Engineering",
      status: "Open"
    },
    {
      id: 8,
      title: "Supply of Autonomous Ground Vehicle",
      tenderNo: "MANIT/ECE/2025:07",
      dueDate: "25-Nov-2025",
      department: "Electronics & Communication",
      status: "Open"
    },
    {
      id: 9,
      title: "Supply of 2 DOF Helicopter Workstation",
      tenderNo: "MANIT/ECE/2025:09",
      dueDate: "25-Nov-2025",
      department: "Electronics & Communication",
      status: "Open"
    },
    {
      id: 10,
      title: "Supply of Rotary Inverted Pendulum",
      tenderNo: "MANIT/ECE/2025:08",
      dueDate: "25-Nov-2025",
      department: "Electronics & Communication",
      status: "Open"
    },
    {
      id: 11,
      title: "Installation of Pre-fabricated aluminium alloy pandal and other venue arrangements for 22nd Convocation Ceremony near LRC Building at MANIT, Bhopal",
      tenderNo: "MANIT/CONV/2025:01",
      dueDate: "07-Nov-2025",
      department: "Administration",
      status: "Closed"
    },
    {
      id: 12,
      title: "Supply of Mathematica Software",
      tenderNo: "MANIT/PHY/2025:13",
      dueDate: "21-Nov-2025",
      department: "Physics",
      status: "Open"
    },
    {
      id: 13,
      title: "NIQ for Civil Work",
      tenderNo: "CM/2025/NIQ/1589",
      dueDate: "04-Nov-2025",
      department: "Civil Maintenance",
      status: "Closed"
    },
    {
      id: 14,
      title: "Services for Chemical profile for Air pollutants assessment in Source apportionment study in Dewas City",
      tenderNo: "MANIT/Civil/2025:1S",
      dueDate: "07-Nov-2025",
      department: "Civil Engineering",
      status: "Closed"
    },
    {
      id: 15,
      title: "NIQ for Construction of pedestal electric Pole at Sport Ground in MANIT Bhopal",
      tenderNo: "CM/2025/NIQ/1551",
      dueDate: "24-Oct-2025",
      department: "Civil Maintenance",
      status: "Closed"
    },
    {
      id: 16,
      title: "Supply, Installation, Testing & Commissioning of CTs (Current Transformers) in existing panels of 33/11 KV Sub-station, MANIT Bhopal",
      tenderNo: "MANIT/EM/2025/508",
      dueDate: "10-Nov-2025",
      department: "Electrical Maintenance",
      status: "Closed"
    },
    {
      id: 17,
      title: "Supply of Gaussian 16 and Gauss View 06 (Academic Departmental Site License on Windows)",
      tenderNo: "MANIT/CHEM/2025/18",
      dueDate: "03-Nov-2025",
      department: "Chemistry",
      status: "Closed"
    },
    {
      id: 18,
      title: "Supply of Multi Process Control Trainer Workstation",
      tenderNo: "MANIT/ECE/2025:05",
      dueDate: "03-Nov-2025",
      department: "Electronics & Communication",
      status: "Closed"
    },
    {
      id: 19,
      title: "Supply of Four Quadrant Chopper Fed DC Drive",
      tenderNo: "MANIT/EE/2025/018",
      dueDate: "04-Sep-2025",
      department: "Electrical Engineering",
      status: "Closed"
    }
  ];

  // Function to check if tender is still open
  const isTenderOpen = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due >= today;
  };

  // Filter tenders based on search term
  const filteredTenders = tenderData.filter(tender =>
    tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.tenderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Tender/Quotation
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            View all active and closed tenders for equipment procurement and services at MANIT Bhopal
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by title, tender number, or department..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-600">
              Total Tenders: {filteredTenders.length}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm">Open Tenders</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              <span className="text-sm">Closed Tenders</span>
            </div>
          </div>
        </div>

        {/* Tenders List */}
        <div className="space-y-4">
          {filteredTenders.map((tender) => {
            const isOpen = isTenderOpen(tender.dueDate);
            return (
              <div key={tender.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`w-3 h-3 rounded-full mr-3 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {tender.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Tender No:</strong> {tender.tenderNo}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Department:</strong> {tender.department}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        isOpen 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {isOpen ? 'Open' : 'Closed'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <strong>Due Date:</strong> <span className="ml-1">{tender.dueDate}</span>
                    </div>
                    {isOpen && (
                      <button className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTenders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No tenders found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        )}

        {/* Panel Contractor Info */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Panel Contractor Information</h2>
          <p className="text-gray-600 mb-4">
            For information about empaneled contractors and vendor registration, please contact the Purchase Department.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> All tenders are subject to terms and conditions as specified in the tender documents. 
                  For technical queries, contact the respective departments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tender;