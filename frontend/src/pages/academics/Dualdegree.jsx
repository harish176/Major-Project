import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

// --- Data for the tables to keep JSX clean ---

const firstSemesterCourses = [
  { code: 'MTH24101', name: 'Mathematics I', periods: '3 1 -', credits: 4 },
  { code: 'PHY24102 / CHY24107', name: 'Physics / Engineering Chemistry', periods: '3 - -', credits: 3 },
  { code: 'CE24103 / EE24108', name: 'Engineering Mechanics / Basic Electrical & Electronics Engg.', periods: '3 1 -', credits: 4 },
  { code: 'ME24104 / ME24109', name: 'Engineering Graphics / Manufacturing Science', periods: '1 - -', credits: 1 },
  { code: 'CSE24105 / CHY24110', name: 'Computer Programming & Problem Solving / Environmental Science', periods: '2 - -', credits: 2 },
  { code: 'HUM24106 / BSE24111', name: 'Communication Skill / Biology for Engineers', periods: '1/2 - -', credits: '1/2' },
];

const secondSemesterCourses = [
  { code: 'MTH24102', name: 'Mathematics II', periods: '3 1 -', credits: 4 },
  { code: 'CHY24107 / PHY24102', name: 'Engineering Chemistry / Physics', periods: '3 - -', credits: 3 },
  { code: 'EE24108 / CE24103', name: 'Basic Electrical & Electronics Engg. / Engineering Mechanics', periods: '3 1 -', credits: 4 },
  { code: 'ME24109 / ME24104', name: 'Manufacturing Science / Engineering Graphics', periods: '1 - -', credits: 1 },
  { code: 'CHY24110 / CSE24105', name: 'Environmental Science / Computer Programming & Problem Solving', periods: '2 - -', credits: 2 },
  { code: 'BSE24111 / HUM24106', name: 'Biology for Engineers / Communication Skill', periods: '2/1 - -', credits: '2/1' },
];

// --- Framer Motion Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};


// --- Main Page Component ---

const DualDegree = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* First Year Scheme Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4 border-b-2 border-cyan-500 pb-2 inline-block">
            First Year Scheme
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-300 mb-10">
            For B.Tech and Dual Degree (Mathematics and Data Science) students admitted 2024 onwards.
          </motion.p>

          {/* Semester Tables Container */}
          <div className="space-y-12">
            {/* First Semester Card */}
            <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-semibold text-cyan-300 mb-6">📘 First Semester</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-700 text-gray-300">
                    <tr>
                      <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide">Course Code</th>
                      <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide">Course Name</th>
                      <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide text-center">L T P</th>
                      <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide text-center">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firstSemesterCourses.map((course, index) => (
                      <motion.tr key={index} variants={itemVariants} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                        <td className="p-3 font-mono text-sm">{course.code}</td>
                        <td className="p-3">{course.name}</td>
                        <td className="p-3 text-center">{course.periods}</td>
                        <td className="p-3 text-center font-medium">{course.credits}</td>
                      </motion.tr>
                    ))}
                     <motion.tr variants={itemVariants} className="bg-gray-700/80 font-medium">
                        <td className="p-3" colSpan="2">Engineering/Science Labs, Language Lab, Life Skills, NCC</td>
                        <td className="p-3 text-center">- - 10+</td>
                        <td className="p-3 text-center">~7</td>
                    </motion.tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Second Semester Card */}
            <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-semibold text-cyan-300 mb-6">📗 Second Semester</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-700 text-gray-300">
                    <tr>
                      <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide">Course Code</th>
                      <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide">Course Name</th>
                      <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide text-center">L T P</th>
                      <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide text-center">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondSemesterCourses.map((course, index) => (
                      <motion.tr key={index} variants={itemVariants} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                        <td className="p-3 font-mono text-sm">{course.code}</td>
                        <td className="p-3">{course.name}</td>
                        <td className="p-3 text-center">{course.periods}</td>
                        <td className="p-3 text-center font-medium">{course.credits}</td>
                      </motion.tr>
                    ))}
                     <motion.tr variants={itemVariants} className="bg-gray-700/80 font-medium">
                        <td className="p-3" colSpan="2">Engineering/Science Labs, Language Lab, Life Skills, NCC</td>
                        <td className="p-3 text-center">- - 10+</td>
                        <td className="p-3 text-center">~7</td>
                    </motion.tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Other Schemes Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 rounded-xl shadow-2xl p-6"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-cyan-300 border-b-2 border-cyan-500 pb-2">
            Scheme for Previous Batches
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <motion.a
              href="/pdfs/MDS-2022.pdf"
              download
              variants={itemVariants}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-700 transform hover:-translate-y-1 transition-all duration-300"
            >
              <Download size={20} /> MDS Scheme (2022 Batch)
            </motion.a>

            <motion.a
              href="/pdfs/MDS-2021.pdf"
              download
              variants={itemVariants}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-700 transform hover:-translate-y-1 transition-all duration-300"
            >
              <Download size={20} /> MDS Scheme (2021 Batch)
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default DualDegree;