import React from 'react';
import { motion } from 'framer-motion';
import { BookUser, Building, Users, Briefcase, ChevronRight } from 'lucide-react';

// --- Data for the page ---

const phdDepartments = [
    'Architecture & Planning', 'Biological Science & Engineering', 'Centre of Artificial Intelligence',
    'Centre for Excellence in Product Design & Smart Manufacturing', 'Centre for Excellence in Water Management',
    'Chemical Engineering', 'Chemistry', 'Civil Engineering', 'Computer Science & Engineering', 'Energy Centre',
    'Electrical Engineering', 'Electronics & Communication Engineering', 'Humanities and Social Sciences',
    'Management Studies', 'Materials & Metallurgical Engineering', 'Mathematics, Bioinformatics & Computer Application (MBC)',
    'Mechanical Engineering', 'Physics'
];

const eligibilityCat134 = [
    { stream: 'Engineering', qualification: 'Bachelors & Master degree in Relevant Engineering with minimum of 60% or CGPA 6.5, with GATE qualified.' },
    { stream: 'Sciences', qualification: 'Bachelors & Master degree in Relevant Sciences/ Engineering with minimum of 60% or CGPA 6.5 with NET/ GATE qualified.' },
    { stream: 'Architecture and Planning', qualification: 'Bachelors & Master degree in Architecture / Planning with minimum of 60% or CGPA 6.5 with GATE qualified.' },
    { stream: 'Humanities and Social Sciences', qualification: 'Bachelors & Master degree in Humanities / Social Sciences with minimum of 60% or CGPA 6.5 with NET qualified.' },
    { stream: 'Management', qualification: 'Bachelors & Master degree in Management /Engineering with minimum of 60% or CGPA 6.5 with NET/GATE qualified' },
];

const eligibilityCat2 = [
    { stream: 'Engineering', qualification: 'Bachelors & Master degree in relevant Engineering with minimum of 60% or CGPA 6.5.' },
    { stream: 'Sciences', qualification: 'Bachelors & Master degree in relevant Sciences/ Engineering with minimum of 60% or CGPA 6.5.' },
    { stream: 'Architecture and Planning', qualification: 'Bachelors & Master degree in Architecture / Planning with minimum of 60% or CGPA 6.5.' },
    { stream: 'Humanities and Social Sciences', qualification: 'Bachelors & Master degree in Humanities / Social Sciences with minimum of 60% or CGPA 6.5.' },
    { stream: 'Management', qualification: 'Bachelors & Master degree in Management /Engineering with minimum of 60% or CGPA 6.5.' },
];

// --- Framer Motion Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

// --- Main Page Component ---
const MANITBhopalPhDPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
                
                <motion.header 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-2">MANIT Bhopal</h1>
                    <p className="text-lg sm:text-xl text-gray-300">Ph.D. Programme (Session 2025-26)</p>
                </motion.header>

                {/* Admission Categories Section */}
                <motion.section 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-cyan-300 border-b-2 border-cyan-500 pb-2">
                        Admission Categories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="bg-gray-700/50 p-5 rounded-lg">
                            <h3 className="font-semibold text-lg flex items-center"><BookUser className="mr-3 text-cyan-400"/>Category 1: Full Time / Part Time</h3>
                            <p className="text-gray-300 mt-2">200 seats for Full Time Research Students.<br/>200 seats for Part Time Research Students.</p>
                        </motion.div>
                         <motion.div variants={itemVariants} className="bg-gray-700/50 p-5 rounded-lg">
                            <h3 className="font-semibold text-lg flex items-center"><Briefcase className="mr-3 text-cyan-400"/>Category 2: Sponsored Full Time</h3>
                            <p className="text-gray-300 mt-2">36 seats for candidates from Government organizations, Public Sector & Research Institutes.</p>
                        </motion.div>
                         <motion.div variants={itemVariants} className="bg-gray-700/50 p-5 rounded-lg">
                            <h3 className="font-semibold text-lg flex items-center"><Users className="mr-3 text-cyan-400"/>Category 3: JRF/Project Associates</h3>
                            <p className="text-gray-300 mt-2">For project staff working in all Departments/Centres of MANIT, Bhopal.</p>
                        </motion.div>
                         <motion.div variants={itemVariants} className="bg-gray-700/50 p-5 rounded-lg">
                            <h3 className="font-semibold text-lg flex items-center"><Building className="mr-3 text-cyan-400"/>Category 4: Internal Faculty</h3>
                            <p className="text-gray-300 mt-2">For regular faculty members of MANIT Bhopal, admitted as "Part Time (Internal)".</p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Departments Section */}
                <motion.section
                     variants={containerVariants}
                     initial="hidden"
                     animate="visible"
                     className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-cyan-300 border-b-2 border-cyan-500 pb-2">
                        Departments Offering Ph.D. Programs
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                        {phdDepartments.map((dept, index) => (
                            <motion.p key={index} variants={itemVariants} className="flex items-center text-gray-300">
                                <ChevronRight size={16} className="text-cyan-400 mr-2 flex-shrink-0"/> {dept}
                            </motion.p>
                        ))}
                    </div>
                </motion.section>
                
                {/* Eligibility Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-cyan-300 border-b-2 border-cyan-500 pb-2">
                        Eligibility Criteria
                    </h2>
                    <div className="space-y-10">
                        {/* Categories 1, 3, 4 */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-4">For Categories 1, 3 & 4 (Full-time, Part-time, JRF, Internal)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-700">
                                        <tr>
                                            <th className="p-3">Stream</th>
                                            <th className="p-3">Essential Qualification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eligibilityCat134.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-700">
                                                <td className="p-3 font-medium">{item.stream}</td>
                                                <td className="p-3 text-gray-300">{item.qualification}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Category 2 */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-4">For Category 2 (Sponsored Full Time)</h3>
                             <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-700">
                                        <tr>
                                            <th className="p-3">Stream</th>
                                            <th className="p-3">Essential Qualification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eligibilityCat2.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-700">
                                                <td className="p-3 font-medium">{item.stream}</td>
                                                <td className="p-3 text-gray-300">{item.qualification}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Important Notes Section */}
                 <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-800 rounded-xl shadow-2xl p-6"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-cyan-300 border-b-2 border-cyan-500 pb-2">
                        Important Information
                    </h2>
                    <div className="space-y-4 text-gray-300">
                        <motion.p variants={itemVariants}><strong>Reservations:</strong> As per prevailing Government of India Norms. A 5% relaxation (0.5 in CGPA) is applicable for SC/ST/PwD candidates.</motion.p>
                        <motion.p variants={itemVariants}><strong>Fee Structure:</strong> The fee structure for 2025-26 will be notified on the Institute website. No tuition fee exemption is available for any Ph.D. category.</motion.p>
                        <motion.p variants={itemVariants}><strong>Hostel Facility:</strong> Hostel accommodation is not available for Ph.D. students.</motion.p>
                        <motion.p variants={itemVariants}><strong>Admission Process:</strong> Admission is conducted through an Institute Entrance Examination followed by a personal interview.</motion.p>
                         <motion.p variants={itemVariants} className="text-sm text-gray-400 mt-4 italic">
                            <strong>Note:</strong> JRF, ICCR, QIP, Sponsored, and MOU seats are extra.
                        </motion.p>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default MANITBhopalPhDPage;
