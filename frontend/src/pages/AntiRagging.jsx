import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Users, AlertTriangle, Calendar, Award, MessageSquare, Download, ExternalLink } from 'lucide-react';

const AntiRagging = () => {
  const sections = [
    {
      id: 1,
      title: 'Anti-Ragging Committee',
      icon: Shield,
      description: 'Committee members and their roles in preventing ragging incidents',
      category: 'Committee'
    },
    {
      id: 2,
      title: 'Helpline Numbers for Anti-Ragging 25-\'26',
      icon: Phone,
      description: '24x7 helpline numbers for reporting ragging incidents',
      category: 'Emergency Contact',
      isImportant: true
    },
    {
      id: 3,
      title: 'Anti-Ragging Squad',
      icon: Users,
      description: 'Dedicated squad for immediate response to ragging complaints',
      category: 'Response Team'
    },
    {
      id: 4,
      title: 'Proctorial Committee',
      icon: AlertTriangle,
      description: 'Committee for maintaining discipline and order in the campus',
      category: 'Discipline'
    },
    {
      id: 5,
      title: 'Anti-Ragging Duty Chart for the academic year 2025-\'26',
      icon: Calendar,
      description: 'Duty roster and schedule for anti-ragging activities',
      category: 'Schedule',
      isNew: true
    },
    {
      id: 6,
      title: 'MESSAGE FROM CHAIRMAN, ANTI-RAGGING COMMITTEE (ARC)',
      icon: MessageSquare,
      description: 'Important message from the committee chairman',
      category: 'Message'
    },
    {
      id: 7,
      title: 'Anti-Ragging Week Celebrations in MANIT Bhopal during 12-18, August 2025',
      icon: Calendar,
      description: 'Details about anti-ragging awareness week celebrations',
      category: 'Events'
    },
    {
      id: 8,
      title: 'National Contest 2025 on \'Youth Against Ragging\'',
      icon: Award,
      description: 'Participation details for national level contest',
      category: 'Competition',
      isNew: true
    }
  ];

  const emergencyContacts = [
    {
      title: 'Anti-Ragging Helpline',
      number: '1800-180-5522',
      availability: '24x7',
      type: 'National Helpline'
    },
    {
      title: 'MANIT Security',
      number: '+91-755-4051000',
      availability: '24x7',
      type: 'Campus Security'
    },
    {
      title: 'Emergency Response',
      number: '100',
      availability: '24x7',
      type: 'Police Emergency'
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.div 
        className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield size={48} className="mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Anti-Ragging / Zero Ragging</h1>
            </div>
            <p className="text-red-100 text-lg">
              Creating a Safe and Supportive Campus Environment - MANIT Bhopal
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
          {/* Emergency Helpline Section */}
          <motion.section variants={itemVariants} className="bg-red-50 rounded-lg border-l-4 border-red-600 p-6">
            <div className="flex items-center mb-4">
              <Phone className="text-red-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-red-800">Emergency Helpline Numbers</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">{contact.title}</h3>
                  <div className="text-2xl font-bold text-red-600 mb-1">{contact.number}</div>
                  <div className="text-sm text-gray-600">{contact.type}</div>
                  <div className="text-sm text-red-600 font-medium">{contact.availability}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <p className="text-red-800 text-sm font-medium">
                <AlertTriangle className="inline mr-2" size={16} />
                Report any incident of ragging immediately. All complaints will be handled with strict confidentiality.
              </p>
            </div>
          </motion.section>

          {/* Anti-Ragging Information Sections */}
          <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Shield className="text-red-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Anti-Ragging Information & Resources</h2>
            </div>
            
            <div className="grid gap-4">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center flex-1">
                      <div className={`p-2 rounded-full mr-4 ${
                        section.isImportant ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <IconComponent 
                          size={20} 
                          className={section.isImportant ? 'text-red-600' : 'text-gray-600'} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium text-gray-800 group-hover:text-red-600 transition-colors">
                            {section.title}
                          </h3>
                          {section.isNew && (
                            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              NEW
                            </span>
                          )}
                          {section.isImportant && (
                            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                              URGENT
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{section.description}</p>
                        <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {section.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Important Information */}
          <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <AlertTriangle className="text-orange-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">What is Ragging?</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Ragging means any conduct by any student or students whether by words spoken or written or by an act which has the effect of teasing, treating or handling with rudeness a fresher or any other student, or indulging in rowdy or undisciplined activities by any student or students which causes or is likely to cause annoyance, hardship or psychological harm or to raise fear or apprehension thereof in any fresher or any other student.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                    <AlertTriangle size={18} className="mr-2" />
                    Forms of Ragging Include:
                  </h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Physical assault or threat</li>
                    <li>• Verbal abuse or humiliation</li>
                    <li>• Psychological harassment</li>
                    <li>• Forcing to do any act against will</li>
                    <li>• Any form of discrimination</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Shield size={18} className="mr-2" />
                    Our Commitment:
                  </h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Zero tolerance for ragging</li>
                    <li>• Swift action on complaints</li>
                    <li>• Confidential reporting system</li>
                    <li>• Counseling and support services</li>
                    <li>• Regular awareness programs</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Legal Information */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 text-white rounded-lg p-6"
          >
            <div className="flex items-start">
              <Shield className="text-red-400 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-white mb-2">Legal Notice</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ragging is a criminal offense under the UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009. 
                  Any student found guilty of ragging shall be liable for punishment including expulsion from the institution. 
                  MANIT Bhopal has zero tolerance for ragging and is committed to providing a safe learning environment for all students.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AntiRagging;