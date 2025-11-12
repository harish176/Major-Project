import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, User, GraduationCap, Users, FileSearch, Calendar, Mail, Phone, Download, ExternalLink, ChevronRight } from 'lucide-react';

const Careers = () => {
  const [activeTab, setActiveTab] = useState('faculty');

  const contactPersons = [
    {
      name: 'Dr. KK Dhote',
      position: 'Teaching Positions',
      icon: GraduationCap
    },
    {
      name: 'Dr. Manmohan Kapshe',
      positions: [
        'Non-Teaching Positions',
        'Positions Under Project',
        'Contractual Positions'
      ],
      icon: User
    }
  ];

  const facultyPositions = [
    {
      title: 'Faculty Positions',
      category: 'Current Openings'
    },
    {
      title: 'Backlog Faculty Positions Under Special Recruitment Drive October 2025',
      category: 'Special Drive',
      isNew: true
    },
    {
      title: 'Faculty Recruitment (Internal)',
      category: 'Internal'
    },
    {
      title: 'Faculty Recruitment 2025',
      category: 'Latest',
      isNew: true
    },
    {
      title: 'Faculty Recruitment 2024',
      category: 'Previous'
    }
  ];

  const nonTeachingPositions = [
    {
      title: 'Non-Teaching Positions',
      category: 'General'
    },
    {
      title: 'Non-Teaching Recruitment June - 2025',
      category: 'Latest',
      isNew: true
    },
    {
      title: 'Non-Teaching Recruitment 2024',
      category: 'Previous'
    },
    {
      title: 'Non-Teaching Recruitment 2022',
      category: 'Archive'
    }
  ];

  const jrfPositions = [
    {
      title: 'Advertisement for the Post of Three Field Investigators on contract in a ICSSR funded Research Project',
      category: 'Research Project',
      fundingAgency: 'ICSSR'
    },
    {
      title: 'Advertisement for Research Assistant in the Department of Humanities and Social Sciences',
      category: 'Research Assistant',
      department: 'Humanities & Social Sciences'
    },
    {
      title: 'Advertisement for the Post of Junior Research Fellow (JRF) under Project (IIT Guwahati TIDF TIH)',
      category: 'JRF',
      fundingAgency: 'IIT Guwahati TIDF TIH'
    },
    {
      title: 'Advertisement for student paid internship position under ISEA project',
      category: 'Internship',
      fundingAgency: 'ISEA Project'
    },
    {
      title: 'Advertisement for the Post of Junior Research Fellow (On Contract/Temporary) Under ISEA Project',
      category: 'JRF',
      fundingAgency: 'ISEA Project'
    },
    {
      title: 'Advertisement for the Post of Project Staff (On Contract/Temporary)Under ISEA Project',
      category: 'Project Staff',
      fundingAgency: 'ISEA Project'
    },
    {
      title: 'Advertisement for Technical Assistance (TA) in research project entitled "Development and Deployment of Reliable, Robust and Cost-Effective Positioning Solution within inches Accuracy for enabling Digital Bharat"',
      category: 'Technical Assistant',
      fundingAgency: 'IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)'
    }
  ];

  const contractualPositions = [
    {
      title: 'Corrigendum for the position of Consultant-Finance',
      category: 'Finance',
      type: 'Corrigendum'
    },
    {
      title: 'Advertisement for Walk in interview for temporary faculty in the department of Computer Science and Engineering',
      category: 'Walk-in Interview',
      department: 'CSE'
    },
    {
      title: 'Advertisement for the Position of Consultant-Finance(On Contract)',
      category: 'Finance'
    },
    {
      title: 'Walk-in-Interview for the post of Senior Software Developer (on contract)',
      category: 'Walk-in Interview',
      type: 'Software Developer'
    },
    {
      title: 'Corrigendum-2 reg. qualification for the department of Humanities',
      category: 'Corrigendum',
      department: 'Humanities'
    },
    {
      title: 'Corrigendum of Advt. No. AB/Estt/Tem.Fac./2025 dated 16/06/2025',
      category: 'Corrigendum'
    },
    {
      title: 'Advertisement for Walk in Interview for Temporary Faculty',
      category: 'Walk-in Interview'
    }
  ];

  const tabs = [
    { id: 'faculty', label: 'Faculty Positions', icon: GraduationCap, count: facultyPositions.length },
    { id: 'nonteaching', label: 'Non-Teaching', icon: Users, count: nonTeachingPositions.length },
    { id: 'jrf', label: 'JRF & RF Positions', icon: FileSearch, count: jrfPositions.length },
    { id: 'contractual', label: 'Contractual', icon: Briefcase, count: contractualPositions.length }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const renderPositionList = (positions) => (
    <div className="space-y-3">
      {positions.map((position, index) => (
        <motion.div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 group cursor-pointer"
          whileHover={{ x: 5 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {position.title}
                  {position.isNew && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </h3>
              </div>
              <div className="ml-5 flex flex-wrap gap-2">
                <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {position.category}
                </span>
                {position.department && (
                  <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {position.department}
                  </span>
                )}
                {position.fundingAgency && (
                  <span className="inline-block text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {position.fundingAgency}
                  </span>
                )}
                {position.type && (
                  <span className="inline-block text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    {position.type}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                <Download size={16} />
              </button>
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const getActivePositions = () => {
    switch (activeTab) {
      case 'faculty':
        return facultyPositions;
      case 'nonteaching':
        return nonTeachingPositions;
      case 'jrf':
        return jrfPositions;
      case 'contractual':
        return contractualPositions;
      default:
        return facultyPositions;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.div 
        className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Briefcase size={48} className="mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Careers</h1>
            </div>
            <p className="text-teal-100 text-lg">
              Join the MANIT Family - Explore Career Opportunities
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Contact Persons Section */}
          <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <User className="text-teal-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Contact Persons</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {contactPersons.map((person, index) => {
                const IconComponent = person.icon;
                return (
                  <div key={index} className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                    <div className="flex items-start">
                      <div className="bg-teal-600 text-white p-3 rounded-full mr-4">
                        <IconComponent size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-teal-800 mb-2">
                          {person.name}
                        </h3>
                        {person.position && (
                          <p className="text-teal-700 text-sm mb-1">{person.position}</p>
                        )}
                        {person.positions && (
                          <ul className="text-teal-700 text-sm space-y-1">
                            {person.positions.map((pos, idx) => (
                              <li key={idx} className="flex items-center">
                                <ChevronRight size={14} className="mr-1" />
                                {pos}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Tabs Section */}
          <motion.section variants={itemVariants}>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Content Area */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-6">
                <Briefcase className="text-teal-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
              </div>
              
              {renderPositionList(getActivePositions())}
            </motion.div>
          </motion.section>

          {/* Information Box */}
          <motion.div
            variants={itemVariants}
            className="bg-teal-50 rounded-lg p-6 border-l-4 border-teal-600"
          >
            <div className="flex items-start">
              <Briefcase className="text-teal-600 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-teal-800 mb-2">How to Apply</h3>
                <p className="text-teal-700 text-sm leading-relaxed mb-3">
                  All applications must be submitted as per the guidelines mentioned in the respective 
                  advertisement. Candidates are advised to carefully read the eligibility criteria, 
                  application process, and important dates before applying.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center text-teal-700 text-sm">
                    <Calendar size={16} className="mr-2" />
                    <span>Check Application Deadlines</span>
                  </div>
                  <div className="flex items-center text-teal-700 text-sm">
                    <FileSearch size={16} className="mr-2" />
                    <span>Review Eligibility Criteria</span>
                  </div>
                  <div className="flex items-center text-teal-700 text-sm">
                    <Mail size={16} className="mr-2" />
                    <span>Submit Complete Documents</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;