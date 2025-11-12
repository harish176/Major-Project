import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Phone, User, Download, ExternalLink, Info, Shield, Eye } from 'lucide-react';

const RTIAndPublicGrievance = () => {
  const rtiOfficers = [
    {
      id: 1,
      name: 'Mr. Gaurav Dwivedi',
      designation: 'In-charge Registrar',
      email: 'registrar@manit.ac.in',
      role: 'First Appellate Authority / Registrar'
    },
    {
      id: 2,
      name: 'Mr. Manav Kumar Singh',
      designation: 'Assistant Registrar (Estt.)',
      email: 'arestablishment@manit.ac.in',
      role: 'Central Public Information Officer (Establishment matters)'
    },
    {
      id: 3,
      name: 'Dr. Juned Raheem',
      designation: 'Assistant Professor',
      email: 'raheemjuned@gmail.com',
      role: 'Central Public Information Officer (Civil/Electrical & other departments matters)'
    },
    {
      id: 4,
      name: 'Mr. Prashant Bhatnagar',
      designation: 'Assistant Registrar (Academic Section)',
      email: 'pb2167@manit.ac.in',
      role: 'Central Public Information Officer (Academic matters)'
    }
  ];

  const rtiDocuments = [
    { title: 'RTI Act', category: 'Legal Documents' },
    { title: 'Suo motu disclosure Under Section 4 of the RTI Act 2005', category: 'Disclosures' },
    { title: 'Procedure for Obtaining Information under RTI', category: 'Procedures' },
    { title: 'Application Form (Right to Information ACT, 2005)', category: 'Forms' },
    { title: 'Portal for RTI Online', category: 'Online Services', isLink: true },
    { title: 'RTI FAQs', category: 'Help & Support' },
    { title: 'Overall Implementation of RTI Act 2005 in the Institute', category: 'Implementation' },
    { title: 'Public Grievance', category: 'Grievance' },
    { title: 'Transparency Officer', category: 'Officers' },
    { title: 'Details of Questions asked and replies given in the Parliament', category: 'Parliamentary' },
    { title: 'Right To Information', category: 'General' },
    { title: 'Final SAR MANIT Bhopal 2023-24', category: 'Annual Reports', isNew: true }
  ];

  const transparencyOfficer = {
    name: 'Dr. Venkata Rao Pokuri',
    designation: 'Librarian & Section Head (Central Library)',
    email: 'venkata@manit.ac.in'
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <FileText size={48} className="mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">RTI & Public Grievance</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Right To Information and Public Grievance Portal - MANIT Bhopal
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
          {/* RTI Officers Section */}
          <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <User className="text-blue-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">RTI Officers</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Name & Contact</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rtiOfficers.map((officer) => (
                    <motion.tr 
                      key={officer.id}
                      className="hover:bg-gray-50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <td className="px-4 py-4 text-center font-medium text-blue-600">
                        {officer.id}
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-gray-800">{officer.name}</div>
                          <div className="text-sm text-gray-600">{officer.designation}</div>
                          <div className="flex items-center mt-1 text-blue-600">
                            <Mail size={14} className="mr-1" />
                            <a href={`mailto:${officer.email}`} className="text-sm hover:underline">
                              {officer.email}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-700 leading-relaxed">
                          {officer.role}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Important RTI Documents & Links */}
          <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <FileText className="text-blue-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Important RTI Documents & Links</h2>
            </div>
            
            <div className="grid gap-4">
              {rtiDocuments.map((doc, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center flex-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                    <div>
                      <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                        {doc.isNew && (
                          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500">{doc.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {doc.isLink ? (
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    ) : (
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Transparency Officer */}
          <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Eye className="text-blue-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Transparency Officer</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white p-3 rounded-full mr-4">
                  <User size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {transparencyOfficer.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {transparencyOfficer.designation}
                  </p>
                  <div className="flex items-center text-blue-600">
                    <Mail size={16} className="mr-2" />
                    <a 
                      href={`mailto:${transparencyOfficer.email}`}
                      className="hover:underline font-medium"
                    >
                      {transparencyOfficer.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Information Box */}
          <motion.div
            variants={itemVariants}
            className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600"
          >
            <div className="flex items-start">
              <Info className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">About RTI</h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  The Right to Information Act, 2005 is an Act of the Parliament of India to provide for setting out 
                  the practical regime of right to information for citizens to secure access to information under the 
                  control of public authorities, in order to promote transparency and accountability in the working 
                  of every public authority.
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-blue-600">
                    <Shield size={16} className="mr-2" />
                    <span className="text-sm font-medium">Transparency</span>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Eye size={16} className="mr-2" />
                    <span className="text-sm font-medium">Accountability</span>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <FileText size={16} className="mr-2" />
                    <span className="text-sm font-medium">Public Access</span>
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

export default RTIAndPublicGrievance;