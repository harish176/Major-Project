import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';

// --- Data Arrays for the page ---

const ugPrograms = [
  { sno: 1, name: 'Chemical Engineering', seats: 71 },
  { sno: 2, name: 'Civil Engineering', seats: 101 },
  { sno: 3, name: 'Computer Science & Engineering', seats: 229 },
  { sno: 4, name: 'Electrical Engineering', seats: 132 },
  { sno: 5, name: 'Electronics & Communication Engineering', seats: 173 },
  { sno: 6, name: 'Mechanical Engineering', seats: 184 },
  { sno: 7, name: 'Materials & Metallurgical Engineering', seats: 71 },
];

const otherPrograms = [
    { sno: 8, name: 'Bachelor of Architecture (B.Arch.) (Five Years Program)', seats: 100 },
    { sno: 9, name: 'Bachelor of Planning (B.Plan.) (Four Years Program)', seats: 52 },
    { sno: 10, name: 'Energy and Electrical Vehicle Engineering', seats: 30 },
];

const dualDegreePrograms = [
  { sno: 1, name: 'Mathematics and Data Science', seats: 30 },
  { sno: 2, name: 'Engineering and Computational Mechanics', seats: 30 },
];

// --- Data for UG Schemes Dropdowns ---
const ugSchemesData = [
  {
    title: 'For Students admitted after 2024',
    links: [
      { name: 'First Year Common Scheme', href: '/pdfs/ug-scheme-2024-common.pdf' },
      { name: 'Computer Science & Engineering', href: '/pdfs/ug-scheme-2024-cse.pdf' },
      { name: 'Mechanical Engineering', href: '/pdfs/ug-scheme-2024-mech.pdf' },
      { name: 'Electronics & Communication', href: '/pdfs/ug-scheme-2024-ece.pdf' },
    ],
  },
  {
    title: 'For Students admitted in 2021 Onwards',
    links: [
      { name: 'Overall Scheme Document (2021)', href: '/pdfs/ug-scheme-2021-overall.pdf' },
    ],
  },
  {
    title: 'For Students admitted in 2020',
    links: [
        { name: 'Overall Scheme Document (2020)', href: '/pdfs/ug-scheme-2020-overall.pdf' },
    ],
  },
  {
    title: 'Revised scheme (VII & VIII Sem only) for the Students Admitted in 2019',
    links: [
        { name: 'Revised Syllabus PDF (2019)', href: '/pdfs/ug-scheme-2019-revised.pdf' },
    ],
  },
  {
    title: 'For Students admitted in 2016 to 2019',
    links: [
        { name: 'Scheme Document (2016-19)', href: '/pdfs/ug-scheme-2016-2019.pdf' },
    ],
  },
];

// --- Framer Motion Variants for Animation ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// --- Main Page Component ---
const MANITBhopalAdmissionsPage = () => {
  const totalSeats = [...ugPrograms, ...otherPrograms, ...dualDegreePrograms].reduce((acc, curr) => acc + curr.seats, 0);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-2">MANIT Bhopal</h1>
          <p className="text-lg sm:text-xl text-gray-300">Undergraduate Programmes (Session 2025-26)</p>
        </motion.header>

        {/* Programmes and Seat Matrix Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-cyan-300 border-b-2 border-cyan-500 pb-2">
            Programmes & Seat Matrix
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide">S.No.</th>
                  <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide">Programme Name</th>
                  <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide text-center">Total Seats</th>
                </tr>
              </thead>
              <tbody>
                <motion.tr variants={itemVariants} className="bg-gray-700 font-bold"><td colSpan="3" className="p-3 sm:p-4 text-cyan-400">Bachelor of Technology (B.Tech.) (Four Years Program)</td></motion.tr>
                {ugPrograms.map((program) => (
                  <motion.tr key={program.sno} variants={itemVariants} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="p-3 sm:p-4">{program.sno}</td>
                    <td className="p-3 sm:p-4">{program.name}</td>
                    <td className="p-3 sm:p-4 text-center font-medium">{program.seats}</td>
                  </motion.tr>
                ))}
                
                 {otherPrograms.map((program) => (
                  <motion.tr key={program.sno} variants={itemVariants} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="p-3 sm:p-4">{program.sno}</td>
                    <td className="p-3 sm:p-4">{program.name}</td>
                    <td className="p-3 sm:p-4 text-center font-medium">{program.seats}</td>
                  </motion.tr>
                ))}

                <motion.tr variants={itemVariants} className="bg-gray-700 font-bold"><td colSpan="3" className="p-3 sm:p-4 text-cyan-400">DUAL DEGREE (B.Tech.-M.Tech.) (Five Years Program)</td></motion.tr>
                {dualDegreePrograms.map((program) => (
                  <motion.tr key={program.sno} variants={itemVariants} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="p-3 sm:p-4">{program.sno}</td>
                    <td className="p-3 sm:p-4">{program.name}</td>
                    <td className="p-3 sm:p-4 text-center font-medium">{program.seats}</td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                 <motion.tr variants={itemVariants} className="font-bold bg-gray-900">
                    <td colSpan="2" className="p-4 text-right text-cyan-400">GRAND TOTAL</td>
                    <td className="p-4 text-center text-xl">{totalSeats}</td>
                 </motion.tr>
              </tfoot>
            </table>
          </div>
          <motion.p variants={itemVariants} className="text-sm text-gray-400 mt-4 italic">
            <strong>Note:</strong> DASA, MEA, ICCR Seats are Extra.
          </motion.p>
        </motion.section>

        {/* UG Schemes Section - MODIFIED TO DROPDOWNS */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 rounded-xl shadow-2xl p-6"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-cyan-300 border-b-2 border-cyan-500 pb-2">
            Undergraduate Course Schemes
          </h2>
          <div className="flex flex-col space-y-3">
            {ugSchemesData.map((scheme, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex justify-between items-center w-full p-4 bg-gray-700 rounded-lg text-left text-white font-medium hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <span>» {scheme.title}</span>
                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden pl-4 pt-2"
                    >
                      <div className="bg-gray-900/50 rounded-md p-2 flex flex-col space-y-2">
                        {scheme.links.map((link, linkIndex) => (
                          <motion.a
                            key={linkIndex}
                            href={link.href}
                            download
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: linkIndex * 0.05 }}
                            className="flex items-center p-3 text-gray-300 rounded-md hover:bg-cyan-500 hover:text-gray-900 transition-colors duration-200"
                          >
                            <Download size={16} className="mr-3 flex-shrink-0" />
                            {link.name}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
      </div>
    </div>
  );
};

export default MANITBhopalAdmissionsPage;

