import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';

// --- Data for PG Seat Matrix ---

const mPlanPrograms = [
    { sno: 1, department: 'Architecture & Planning', course: 'Urban Planning', seats: 21 },
    { sno: 2, department: 'Architecture & Planning', course: 'Real Estate Development', seats: 10 },
];

const mTechPrograms = [
    { sno: 1, department: 'Biological Science and Engineering', course: 'Bio-Technology', seats: 10 },
    { sno: 2, department: 'Centre for Artificial Intelligence', course: 'Artificial Intelligence', seats: 25 },
    { sno: 3, department: 'Centre of Excellence in Product Design & Smart Manufacturing', course: 'Smart Manufacturing', seats: 10 },
    { sno: 4, department: 'Chemical Engineering', course: 'Chemical Engineering', seats: 10 },
    { sno: 5, department: 'Civil Engineering', course: 'Environmental Engineering', seats: 15 },
    { sno: 6, department: 'Civil Engineering', course: 'Geoinformatics & its Applications', seats: 10 },
    { sno: 7, department: 'Civil Engineering', course: 'Geotechnical Engineering', seats: 21 },
    { sno: 8, department: 'Civil Engineering', course: 'Water Resource Engineering & Management', seats: 10 },
    { sno: 9, department: 'Civil Engineering', course: 'Structural Engineering', seats: 25 },
    { sno: 10, department: 'Civil Engineering', course: 'Transportation Engineering', seats: 21 },
    { sno: 11, department: 'Civil Engineering', course: 'Infrastructure Engineering And Construction Management', seats: 12 },
    { sno: 12, department: 'Computer Science & Engineering', course: 'Advanced Computing', seats: 25 },
    { sno: 13, department: 'Computer Science & Engineering', course: 'Computer Networks', seats: 21 },
    { sno: 14, department: 'Computer Science & Engineering', course: 'Information Security', seats: 25 },
    { sno: 15, department: 'Electrical Engineering Electronics & Communication Engineering', course: 'Power Electronics & Drives', seats: 15 },
    { sno: 16, department: 'Electrical Engineering Electronics & Communication Engineering', course: 'Integrated Power System', seats: 12 },
    { sno: 17, department: 'Electronics & Communication Engineering', course: 'Communication Systems', seats: 12 },
    { sno: 18, department: 'Electronics & Communication Engineering', course: 'VLSI design & Embedded System', seats: 25 },
    { sno: 19, department: 'Energy Centre', course: 'Renewable Energy', seats: 10 },
    { sno: 20, department: 'Materials & Metallurgical Engineering', course: 'Material Science & Technology', seats: 8 },
    { sno: 21, department: 'Mathematics, Bioinformatics & Computer Applications (MBC)', course: 'Bioinformatics', seats: 8 },
    { sno: 22, department: 'Mathematics, Bioinformatics & Computer Applications (MBC)', course: 'Agile Software Engineering', seats: 18 },
    { sno: 23, department: 'Mechanical Engineering', course: 'Automation and Robotics', seats: 15 },
    { sno: 24, department: 'Mechanical Engineering', course: 'Machine Design', seats: 15 },
    { sno: 25, department: 'Mechanical Engineering', course: 'Industrial Engineering and Management', seats: 12 },
    { sno: 26, department: 'Mechanical Engineering', course: 'Thermal Engineering', seats: 12 },
    { sno: 27, department: 'Physics', course: 'Nano Technology', seats: 8 },
];

const mcaProgram = [
    { sno: 1, department: 'Mathematics, Bioinformatics & Computer Applications (MBC)', course: 'MCA', seats: 115 },
];

const mbaProgram = [
    { sno: 1, department: 'Management Studies', course: 'MBA', seats: 66 },
];

const mscPrograms = [
    { sno: 1, department: 'Physics', course: 'M.Sc in Physics', seats: 20 },
    { sno: 2, department: 'Chemistry', course: 'M.Sc in Chemistry', seats: 20 },
    { sno: 3, department: 'Energy Economics and Management', course: 'M.Sc In Energy', seats: 20 },
];

// --- Updated Data structure for Nested Dropdowns ---
const pgSchemesData = [
    {
      title: 'M.Tech / M.Plan',
      subheadings: [
        { 
            subTitle: 'For Students admitted in 2022 Onwards', 
            links:
[
  { name: 'M Tech in Digital Communication', href: '/pdfs/pg-scheme-mtech-digital-communication.pdf' },
  { name: 'M Tech in VLSI Design and Embedded Systems', href: '/pdfs/pg-scheme-mtech-vlsi-design-and-embedded-systems.pdf' },
  { name: 'M. Plan in Housing', href: '/pdfs/pg-scheme-mplan-housing.pdf' },
  { name: 'M Plan in Urban Planning', href: '/pdfs/pg-scheme-mplan-urban-planning.pdf' },
  { name: 'M Tech in Bio Technology', href: '/pdfs/pg-scheme-mtech-bio-technology.pdf' },
  { name: 'M Tech in Industrial Safety and Pollution Abatement', href: '/pdfs/pg-scheme-mtech-industrial-safety-and-pollution-abatement.pdf' },
  { name: 'M Tech in Environmental Engineering', href: '/pdfs/pg-scheme-mtech-environmental-engineering.pdf' },
  { name: 'M Tech in Geotechnical Engineering', href: '/pdfs/pg-scheme-mtech-geotechnical-engineering.pdf' },
  { name: 'M Tech in Geoinformatics and its applications', href: '/pdfs/pg-scheme-mtech-geoinformatics-and-its-applications.pdf' },
  { name: 'M Tech in Hydropower Engineering', href: '/pdfs/pg-scheme-mtech-hydropower-engineering.pdf' },
  { name: 'M Tech in Structural Engineering', href: '/pdfs/pg-scheme-mtech-structural-engineering.pdf' },
  { name: 'M Tech in Transportation Engineering', href: '/pdfs/pg-scheme-mtech-transportation-engineering.pdf' },
  { name: 'M. Tech in Smart Manufacturing', href: '/pdfs/pg-scheme-mtech-smart-manufacturing.pdf' },
  { name: 'M Tech in Artificial Intelligence', href: '/pdfs/pg-scheme-mtech-artificial-intelligence.pdf' },
  { name: 'M. Tech in Water Resources Engineering and Management', href: '/pdfs/pg-scheme-mtech-water-resources-engineering-and-management.pdf' },
  { name: 'M Tech in Advanced Computing', href: '/pdfs/pg-scheme-mtech-advanced-computing.pdf' },
  { name: 'M Tech in Computer Networking', href: '/pdfs/pg-scheme-mtech-computer-networking.pdf' },
  { name: 'M Tech in Information Security', href: '/pdfs/pg-scheme-mtech-information-security.pdf' },
  { name: 'M Tech in Electrical Drives', href: '/pdfs/pg-scheme-mtech-electrical-drives.pdf' },
  { name: 'M Tech in Power System', href: '/pdfs/pg-scheme-mtech-power-system.pdf' },
  { name: 'M Tech in Bioinformatics', href: '/pdfs/pg-scheme-mtech-bioinformatics.pdf' },
  { name: 'M.Tech in Energy System Management', href: '/pdfs/pg-scheme-mtech-energy-system-management.pdf' },
  { name: 'M Tech in Renewable Energy', href: '/pdfs/pg-scheme-mtech-renewable-energy.pdf' },
  { name: 'M Tech in Computational and Systems Biology', href: '/pdfs/pg-scheme-mtech-computational-and-systems-biology.pdf' },
  { name: 'M Tech in Advanced Material Technology', href: '/pdfs/pg-scheme-mtech-advanced-material-technology.pdf' },
  { name: 'M Tech in Industrial Design', href: '/pdfs/pg-scheme-mtech-industrial-design.pdf' },
  { name: 'M Tech in Stress and Vibration Analysis', href: '/pdfs/pg-scheme-mtech-stress-and-vibration-analysis.pdf' },
  { name: 'M Tech in Thermal Engineering', href: '/pdfs/pg-scheme-mtech-thermal-engineering.pdf' },
  { name: 'M. Tech in Material Science and Technology', href: '/pdfs/pg-scheme-mtech-material-science-and-technology.pdf' },
  { name: 'M Tech in Nanotechnology', href: '/pdfs/pg-scheme-mtech-nanotechnology.pdf' }
]
        },
        { 
            subTitle: 'For Students admitted in 2021 Onwards', 
                       links:
[
  { name: 'M Tech in Digital Communication', href: '/pdfs/pg-scheme-mtech-digital-communication.pdf' },
  { name: 'M Tech in VLSI Design and Embedded Systems', href: '/pdfs/pg-scheme-mtech-vlsi-design-and-embedded-systems.pdf' },
  { name: 'M. Plan in Housing', href: '/pdfs/pg-scheme-mplan-housing.pdf' },
  { name: 'M Plan in Urban Planning', href: '/pdfs/pg-scheme-mplan-urban-planning.pdf' },
  { name: 'M Tech in Bio Technology', href: '/pdfs/pg-scheme-mtech-bio-technology.pdf' },
  { name: 'M Tech in Industrial Safety and Pollution Abatement', href: '/pdfs/pg-scheme-mtech-industrial-safety-and-pollution-abatement.pdf' },
  { name: 'M Tech in Environmental Engineering', href: '/pdfs/pg-scheme-mtech-environmental-engineering.pdf' },
  { name: 'M Tech in Geotechnical Engineering', href: '/pdfs/pg-scheme-mtech-geotechnical-engineering.pdf' },
  { name: 'M Tech in Geoinformatics and its applications', href: '/pdfs/pg-scheme-mtech-geoinformatics-and-its-applications.pdf' },
  { name: 'M Tech in Hydropower Engineering', href: '/pdfs/pg-scheme-mtech-hydropower-engineering.pdf' },
  { name: 'M Tech in Structural Engineering', href: '/pdfs/pg-scheme-mtech-structural-engineering.pdf' },
  { name: 'M Tech in Transportation Engineering', href: '/pdfs/pg-scheme-mtech-transportation-engineering.pdf' },
  { name: 'M. Tech in Smart Manufacturing', href: '/pdfs/pg-scheme-mtech-smart-manufacturing.pdf' },
  { name: 'M Tech in Artificial Intelligence', href: '/pdfs/pg-scheme-mtech-artificial-intelligence.pdf' },
  { name: 'M. Tech in Water Resources Engineering and Management', href: '/pdfs/pg-scheme-mtech-water-resources-engineering-and-management.pdf' },
  { name: 'M Tech in Advanced Computing', href: '/pdfs/pg-scheme-mtech-advanced-computing.pdf' },
  { name: 'M Tech in Computer Networking', href: '/pdfs/pg-scheme-mtech-computer-networking.pdf' },
  { name: 'M Tech in Information Security', href: '/pdfs/pg-scheme-mtech-information-security.pdf' },
  { name: 'M Tech in Electrical Drives', href: '/pdfs/pg-scheme-mtech-electrical-drives.pdf' },
  { name: 'M Tech in Power System', href: '/pdfs/pg-scheme-mtech-power-system.pdf' },
  { name: 'M Tech in Bioinformatics', href: '/pdfs/pg-scheme-mtech-bioinformatics.pdf' },
  { name: 'M.Tech in Energy System Management', href: '/pdfs/pg-scheme-mtech-energy-system-management.pdf' },
  { name: 'M Tech in Renewable Energy', href: '/pdfs/pg-scheme-mtech-renewable-energy.pdf' },
  { name: 'M Tech in Computational and Systems Biology', href: '/pdfs/pg-scheme-mtech-computational-and-systems-biology.pdf' },
  { name: 'M Tech in Advanced Material Technology', href: '/pdfs/pg-scheme-mtech-advanced-material-technology.pdf' },
  { name: 'M Tech in Industrial Design', href: '/pdfs/pg-scheme-mtech-industrial-design.pdf' },
  { name: 'M Tech in Stress and Vibration Analysis', href: '/pdfs/pg-scheme-mtech-stress-and-vibration-analysis.pdf' },
  { name: 'M Tech in Thermal Engineering', href: '/pdfs/pg-scheme-mtech-thermal-engineering.pdf' },
  { name: 'M. Tech in Material Science and Technology', href: '/pdfs/pg-scheme-mtech-material-science-and-technology.pdf' },
  { name: 'M Tech in Nanotechnology', href: '/pdfs/pg-scheme-mtech-nanotechnology.pdf' }
]
        },
      ],
    },
    {
      title: 'Master of Computer Applications (MCA)',
      subheadings: [
        {
            subTitle: 'New Scheme (Admission Year 2020-21 Onwards)',
            links: [
                { name: 'Download MCA Scheme', href: '/pdfs/pg-scheme-mca-2020.pdf' }
            ]
        }
      ],
    },
    {
      title: 'Master of Business Administration (MBA)',
       subheadings: [
        { 
            subTitle: 'New Scheme (Admission Year 2022 Onwards)',
            links: [
                { name: 'Download MBA 2022 Scheme', href: '/pdfs/pg-scheme-mba-2022.pdf' }
            ]
        },
        { 
            subTitle: 'New Scheme (Admission Year 2020-21 Onwards)',
            links: [
                { name: 'Download MBA 2020 Scheme', href: '/pdfs/pg-scheme-mba-2020.pdf' }
            ]
        },
      ],
    },
    {
      title: 'M.Sc.',
       subheadings: [
        { 
            subTitle: 'New Scheme for MSc (Session 2022 Onwards)',
            links: [
                { name: 'Physics Scheme', href: '/pdfs/pg-scheme-msc-2022-phy.pdf' },
                { name: 'Chemistry Scheme', href: '/pdfs/pg-scheme-msc-2022-chem.pdf' },
            ]
        },
        { 
            subTitle: 'New Scheme for MSc (Session 2021-22 Onwards)',
            links: [
                { name: 'Download 2021-22 Scheme', href: '/pdfs/pg-scheme-msc-2021.pdf' }
            ]
        },
      ],
    },
];


// --- Framer Motion Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Main Page Component ---
const MANITBhopalPGPage = () => {
    const [openIndices, setOpenIndices] = useState({ main: null, sub: null });

    const handleMainClick = (index) => {
        setOpenIndices(prev => ({
            main: prev.main === index ? null : index,
            sub: null // Reset sub-dropdown when a main one is clicked
        }));
    };

    const handleSubClick = (mainIndex, subIndex) => {
        setOpenIndices(prev => ({
            ...prev,
            sub: prev.main === mainIndex && prev.sub === subIndex ? null : subIndex
        }));
    };


    const renderTableRows = (programs) => (
        programs.map((program) => (
            <motion.tr key={`${program.course}-${program.sno}`} variants={itemVariants} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                <td className="p-3 sm:p-4 text-center">{program.sno}</td>
                <td className="p-3 sm:p-4">{program.department}</td>
                <td className="p-3 sm:p-4">{program.course}</td>
                <td className="p-3 sm:p-4 text-center font-medium">{program.seats}</td>
            </motion.tr>
        ))
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto">

                <motion.header
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-2">MANIT Bhopal</h1>
                    <p className="text-lg sm:text-xl text-gray-300">Postgraduate Programmes (Session 2025-26)</p>
                </motion.header>

                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-cyan-300 border-b-2 border-cyan-500 pb-2">
                        PG Programmes & Seat Matrix
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide text-center">S.No.</th>
                                    <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide">Department</th>
                                    <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide">Course/Program</th>
                                    <th className="p-3 sm:p-4 text-sm font-semibold tracking-wide text-center">Seats</th>
                                </tr>
                            </thead>
                            <tbody>
                                <motion.tr variants={itemVariants} className="bg-gray-700 font-bold"><td colSpan="4" className="p-3 sm:p-4 text-cyan-400">Master of Planning (M.Plan)</td></motion.tr>
                                {renderTableRows(mPlanPrograms)}

                                <motion.tr variants={itemVariants} className="bg-gray-700 font-bold"><td colSpan="4" className="p-3 sm:p-4 text-cyan-400">Master of Technology (M.Tech.)</td></motion.tr>
                                {renderTableRows(mTechPrograms)}

                                <motion.tr variants={itemVariants} className="bg-gray-700 font-bold"><td colSpan="4" className="p-3 sm:p-4 text-cyan-400">Master of Computer Applications (MCA)</td></motion.tr>
                                {renderTableRows(mcaProgram)}

                                <motion.tr variants={itemVariants} className="bg-gray-700 font-bold"><td colSpan="4" className="p-3 sm:p-4 text-cyan-400">Master of Business Administration (MBA)</td></motion.tr>
                                {renderTableRows(mbaProgram)}
                                
                                <motion.tr variants={itemVariants} className="bg-gray-700 font-bold"><td colSpan="4" className="p-3 sm:p-4 text-cyan-400">Master of Science (M.Sc)</td></motion.tr>
                                {renderTableRows(mscPrograms)}
                            </tbody>
                        </table>
                    </div>
                     <motion.p variants={itemVariants} className="text-sm text-gray-400 mt-4 italic">
                        <strong>Note:</strong> DASA, ICCR, QIP, Defence and Part Time Seats are Extra.
                    </motion.p>
                </motion.section>

                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-800 rounded-xl shadow-2xl p-6"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-cyan-300 border-b-2 border-cyan-500 pb-2">
                        Postgraduate Course Schemes
                    </h2>
                     <div className="flex flex-col space-y-3">
                        {pgSchemesData.map((scheme, mainIndex) => (
                        <motion.div key={mainIndex} variants={itemVariants} className="flex flex-col">
                            <button
                                onClick={() => handleMainClick(mainIndex)}
                                className="flex justify-between items-center w-full p-4 bg-gray-700 rounded-lg text-left text-white font-medium hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <span>» {scheme.title}</span>
                                <motion.div animate={{ rotate: openIndices.main === mainIndex ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                    <ChevronDown size={20} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                            {openIndices.main === mainIndex && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden pl-4 pt-2"
                                >
                                    <div className="bg-gray-900/50 rounded-md p-2 flex flex-col space-y-2">
                                        {scheme.subheadings.map((subheading, subIndex) => (
                                            <div key={subIndex}>
                                                <button
                                                    onClick={() => handleSubClick(mainIndex, subIndex)}
                                                    className="flex justify-between items-center w-full p-3 bg-gray-700/50 rounded-md text-left text-gray-300 font-medium hover:bg-gray-600/50 transition-colors"
                                                >
                                                    <span>{subheading.subTitle}</span>
                                                    <motion.div animate={{ rotate: openIndices.sub === subIndex ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                                        <ChevronDown size={18} />
                                                    </motion.div>
                                                </button>

                                                <AnimatePresence>
                                                    {openIndices.sub === subIndex && (
                                                         <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                            className="overflow-hidden pl-4 pt-2"
                                                        >
                                                             <div className="flex flex-col space-y-1">
                                                                {subheading.links.map((link, linkIndex) => (
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
                                            </div>
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

export default MANITBhopalPGPage;

