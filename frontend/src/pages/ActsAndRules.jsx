import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, Download, ExternalLink } from 'lucide-react';

const ActsAndRules = () => {
  const actsAndRulesData = [
    {
      id: 1,
      title: 'Amendment in the statutes dated 11.03.2025',
      category: 'Statutes',
      isNew: true
    },
    {
      id: 2,
      title: 'NIT statutes 2017',
      category: 'Statutes'
    },
    {
      id: 3,
      title: 'NIT statutes 2009',
      category: 'Statutes'
    },
    {
      id: 4,
      title: 'NITSER ACT',
      category: 'Acts'
    },
    {
      id: 5,
      title: 'Gazette Publication - Amendment of statutes for NIT Bhopal',
      category: 'Gazette'
    },
    {
      id: 6,
      title: 'Central Vigilance Act',
      category: 'Acts'
    },
    {
      id: 7,
      title: 'Manual on Consultants',
      category: 'Manuals'
    },
    {
      id: 8,
      title: 'Manual on Works',
      category: 'Manuals'
    },
    {
      id: 9,
      title: 'Faculty Recruitment Rules',
      category: 'Recruitment Rules'
    },
    {
      id: 10,
      title: 'General Financial Rules 2017',
      category: 'Financial Rules'
    },
    {
      id: 11,
      title: 'Manual on Procurement of Goods-2017',
      category: 'Procurement'
    },
    {
      id: 12,
      title: 'Non-Faculty Recruitment Rules, 2019',
      category: 'Recruitment Rules'
    },
    {
      id: 13,
      title: 'Revised pay Rule 2008',
      category: 'Pay Rules'
    },
    {
      id: 14,
      title: 'Revised pay Rule 2016',
      category: 'Pay Rules'
    },
    {
      id: 15,
      title: 'Manual for Procurement of Consultancy & Other Services 2017',
      category: 'Procurement'
    },
    {
      id: 16,
      title: 'Hindi Niyam Pustak',
      category: 'Hindi Rules'
    },
    {
      id: 17,
      title: 'Handbook for IO and DA',
      category: 'Handbooks'
    },
    {
      id: 18,
      title: 'CCS (CCA) Rules, 1965',
      category: 'CCS Rules'
    },
    {
      id: 19,
      title: 'CCS (Conduct) Rules, 1964',
      category: 'CCS Rules'
    },
    {
      id: 20,
      title: 'केन्द्रीय सिविल सेवाएं (आचरण) नियमावली, 1964',
      category: 'CCS Rules (Hindi)'
    },
    {
      id: 21,
      title: 'House Allotment Rules',
      category: 'Housing Rules'
    }
  ];

  const categories = [...new Set(actsAndRulesData.map(item => item.category))];

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
          <div className="flex items-center justify-center mb-4">
            <Scale size={48} className="mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Acts & Rules</h1>
          </div>
          <p className="text-center text-blue-100 text-lg">
            Legal framework and regulatory guidelines governing MANIT Bhopal
          </p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6"
        >
          {categories.map((category) => {
            const categoryItems = actsAndRulesData.filter(item => item.category === category);
            
            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-blue-600 text-white px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <FileText className="mr-2" size={20} />
                    {category}
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {categoryItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center flex-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                            {item.title}
                            {item.isNew && (
                              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                NEW
                              </span>
                            )}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600"
        >
          <div className="flex items-start">
            <Scale className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Important Notice</h3>
              <p className="text-blue-700 text-sm">
                All acts, rules, and regulations listed here are subject to periodic updates and amendments. 
                Please refer to the latest versions for current information. For any clarifications or 
                additional information, please contact the administration office.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActsAndRules;