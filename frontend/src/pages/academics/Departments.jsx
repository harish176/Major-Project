import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, FlaskConical, Wrench, Microscope, BarChart3, BookOpen, PenSquare, ChevronRight, User, GraduationCap, Telescope, FlaskRound, Code, ShieldCheck, Landmark } from 'lucide-react';

// --- Expanded Data structure with detailed info for each department ---
const departmentDetailsContent = {
    'Computer Science Engineering': {
        'About the Department': 'Established in 1986, the Department of Computer Science & Engineering at MANIT Bhopal is a center of excellence in computer science education and research. We are committed to fostering a dynamic learning environment that prepares students for the challenges of the rapidly evolving tech industry.',
        'Vision': 'To be a globally recognized department for outstanding education and research in computer science, producing innovators and leaders who can solve real-world problems.',
        'Mission': 'To provide a strong theoretical and practical foundation in computer science. \nTo cultivate a research-oriented culture among students and faculty. \nTo establish strong industry connections for collaborative projects and placements.',
        'Courses': [
            { program: 'B.Tech in CSE', degree: 'Bachelor of Technology', duration: '4 Years', intake: 229 },
            { program: 'M.Tech in Advanced Computing', degree: 'Master of Technology', duration: '2 Years', intake: 25 },
            { program: 'M.Tech in Computer Networks', degree: 'Master of Technology', duration: '2 Years', intake: 21 },
            { program: 'M.Tech in Information Security', degree: 'Master of Technology', duration: '2 Years', intake: 25 },
            { program: 'Ph.D.', degree: 'Doctor of Philosophy', duration: '3-5 Years', intake: 'As per vacancy' },
        ],
        'People': 'The department is home to a dedicated team of over 30 faculty members with diverse specializations, including Artificial Intelligence, Cybersecurity, and Cloud Computing. Our faculty are actively involved in research and have published numerous papers in prestigious international journals.',
        'Research Groups': 'Active research groups are working in areas like Machine Learning, Natural Language Processing, Blockchain Technology, and High-Performance Computing.',
        'Labs': 'State-of-the-art laboratories including AI & ML Lab, Cybersecurity Lab, IoT Lab, and a dedicated Data Center.',
        'Projects/Patent/Consultant': 'The department handles numerous sponsored research projects from government agencies like DST and MeitY, and provides consultancy services to various industries. Several patents have been filed by our faculty and students.',
        'Event/News': 'The department regularly hosts national-level symposiums, workshops, and the annual tech fest "Technosearch".',
        'Students': 'Our students are consistently placed in top multinational companies like Google, Microsoft, Amazon, and Adobe, with many pursuing higher studies at renowned universities worldwide.',
        'Out Reach activities': 'We conduct coding bootcamps for local school students and awareness programs on digital literacy as part of our social responsibility initiatives.',
    },
    'Mechanical Engineering': {
        'About the Department': 'The Department of Mechanical Engineering is one of the oldest and largest departments at MANIT Bhopal. It is renowned for its robust curriculum that blends theoretical knowledge with hands-on practical experience.',
        'Vision': 'To be a leader in mechanical engineering education, research, and innovation, contributing significantly to national development and societal needs.',
        'Mission': 'To produce highly competent mechanical engineers with a strong foundation in core principles. \nTo encourage interdisciplinary research and development. \nTo foster a spirit of entrepreneurship and ethical responsibility.',
        'Courses': [
            { program: 'B.Tech in Mechanical Engg.', degree: 'Bachelor of Technology', duration: '4 Years', intake: 184 },
            { program: 'M.Tech in Automation and Robotics', degree: 'Master of Technology', duration: '2 Years', intake: 15 },
            { program: 'M.Tech in Machine Design', degree: 'Master of Technology', duration: '2 Years', intake: 15 },
            { program: 'M.Tech in Thermal Engineering', degree: 'Master of Technology', duration: '2 Years', intake: 12 },
        ],
        'People': 'Our faculty comprises experienced professors and dynamic young researchers specializing in fields like Robotics, Thermodynamics, Fluid Mechanics, and Industrial Design. Many have extensive industry and research experience.',
        'Labs': 'Includes Advanced Manufacturing Lab, Robotics Lab, CAD/CAM Center, Thermal Engineering Lab, and a state-of-the-art workshop.',
        'Students': 'Alumni of the department hold prominent positions in major public and private sector organizations, including ISRO, DRDO, Tata Motors, and General Electric.',
    },
    'Architecture & Planning': {
        'About the Department': 'The Department of Architecture & Planning, established in 1963, is a pioneering institution in Central India. It offers comprehensive programs that integrate the art and science of building design with the principles of sustainable urban development.',
        'Vision': 'To be a premier institution for architectural and planning education, creating professionals who can design and build sustainable, resilient, and inclusive environments.',
        'Courses': [
            { program: 'B.Arch', degree: 'Bachelor of Architecture', duration: '5 Years', intake: 100 },
            { program: 'B.Plan', degree: 'Bachelor of Planning', duration: '4 Years', intake: 52 },
            { program: 'M.Plan in Urban Planning', degree: 'Master of Planning', duration: '2 Years', intake: 21 },
        ],
        'Mission': 'To impart knowledge in architectural design, building technology, and urban planning. \nTo develop critical thinking and creative problem-solving skills. \nTo promote research on sustainable habitats and smart cities.',
        'Labs': 'Equipped with Design Studios, Computer-Aided Design (CAD) Lab, Climatology Lab, and a Building Materials Museum.',
    }
};

const departmentSections = [
    'About the Department', 'Vision', 'Mission', 'Courses', 'People', 
    'Research Groups', 'Labs', 'Projects/Patent/Consultant', 
    'Event/News', 'Students', 'Out Reach activities'
];

const departmentsData = [
    {
        category: 'Engineering',
        icon: Wrench,
        departments: [
            { name: 'Civil Engineering', icon: Building, details: departmentDetailsContent['Mechanical Engineering'] }, // Placeholder
            { name: 'Chemical Engineering', icon: FlaskRound, details: departmentDetailsContent['Mechanical Engineering'] }, // Placeholder
            { name: 'Computer Science Engineering', icon: Code, details: departmentDetailsContent['Computer Science Engineering'] },
            { name: 'Electrical Engineering', icon: ShieldCheck, details: departmentDetailsContent['Mechanical Engineering'] }, // Placeholder
            { name: 'Electronics & Communication Engg.', icon: Landmark, details: departmentDetailsContent['Computer Science Engineering'] }, // Placeholder
            { name: 'Mechanical Engineering', icon: Wrench, details: departmentDetailsContent['Mechanical Engineering'] },
            { name: 'Material & Metallurgical Engg.', icon: Microscope, details: departmentDetailsContent['Mechanical Engineering'] }, // Placeholder
        ]
    },
    {
        category: 'Architecture & Planning',
        icon: PenSquare,
        departments: [
            { name: 'Architecture & Planning', icon: PenSquare, details: departmentDetailsContent['Architecture & Planning'] },
        ]
    },
    {
        category: 'Science',
        icon: FlaskConical,
        departments: [
            { name: 'Biological Science', icon: Microscope, details: departmentDetailsContent['Architecture & Planning'] }, // Placeholder
            { name: 'Maths', icon: BarChart3, details: departmentDetailsContent['Architecture & Planning'] }, // Placeholder
            { name: 'Physics', icon: Telescope, details: departmentDetailsContent['Architecture & Planning'] }, // Placeholder
            { name: 'Chemistry', icon: FlaskConical, details: departmentDetailsContent['Architecture & Planning'] }, // Placeholder
        ]
    },
    {
        category: 'Humanities',
        icon: BookOpen,
        departments: [
            { name: 'Humanities', icon: BookOpen, details: departmentDetailsContent['Architecture & Planning'] }, // Placeholder
        ]
    },
    {
        category: 'Management Studies',
        icon: User,
        departments: [
            { name: 'Management Studies', icon: GraduationCap, details: departmentDetailsContent['Architecture & Planning'] }, // Placeholder
        ]
    }
];


// --- Framer Motion Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

// --- Main Page Component ---
const MANITBhopalDepartmentsPage = () => {
    const [activeTab, setActiveTab] = useState(departmentsData[0].category);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const activeDepartmentList = departmentsData.find(cat => cat.category === activeTab)?.departments || [];

    const handleTabClick = (category) => {
        setActiveTab(category);
        setSelectedDepartment(null);
    };
    
    const handleDeptClick = (dept) => {
        setSelectedDepartment(dept);
    };
    
    // -- Component to render the content for each section --
    const renderSectionContent = (section, content) => {
        if (section === 'Courses' && Array.isArray(content)) {
            return (
                 <div className="overflow-x-auto -ml-6">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th className="p-3 font-semibold">Program</th>
                                <th className="p-3 font-semibold">Degree</th>
                                <th className="p-3 font-semibold text-center">Duration</th>
                                <th className="p-3 font-semibold text-center">Intake</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((course, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="p-3">{course.program}</td>
                                    <td className="p-3">{course.degree}</td>
                                    <td className="p-3 text-center">{course.duration}</td>
                                    <td className="p-3 text-center">{course.intake}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // Handle multi-line mission statements
        if (typeof content === 'string' && content.includes('\n')) {
            return (
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 pl-6">
                    {content.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            );
        }
        
        return (
            <p className="text-gray-400 text-sm pl-6">
                {content || `Information about ${section.toLowerCase()} will be displayed here.`}
            </p>
        );
    };


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
                    <p className="text-lg sm:text-xl text-gray-300">Academic Departments</p>
                </motion.header>

                {/* Department Categories (Tabs) */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                    {departmentsData.map(category => (
                        <motion.button
                            key={category.category}
                            variants={itemVariants}
                            onClick={() => handleTabClick(category.category)}
                            className={`px-4 py-2 text-sm sm:px-6 sm:py-3 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${activeTab === category.category ? 'bg-cyan-500 text-gray-900 shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                            <category.icon size={18}/>
                            {category.category}
                        </motion.button>
                    ))}
                </motion.div>
                
                {/* Horizontal Department Selection Bar */}
                <motion.div 
                    key={activeTab} // Animate when tab changes
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {activeDepartmentList.map((dept) => (
                        <motion.button
                            key={dept.name}
                            onClick={() => handleDeptClick(dept)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 ${selectedDepartment?.name === dept.name ? 'bg-cyan-800 text-white ring-2 ring-cyan-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                        >
                            <dept.icon size={16}/>
                            {dept.name}
                        </motion.button>
                    ))}
                </motion.div>


                {/* Department Details Section */}
                <AnimatePresence mode="wait">
                    {selectedDepartment && (
                        <motion.section
                            key={selectedDepartment.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8"
                        >
                            <div className="flex items-center text-3xl font-bold text-cyan-400 mb-6 border-b-2 border-cyan-500/30 pb-4">
                                <selectedDepartment.icon className="mr-4" size={40} />
                                {selectedDepartment.name}
                            </div>
                            
                            <motion.div 
                                key={selectedDepartment.name + "-details"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10"
                            >
                                {departmentSections.map(section => (
                                    <div key={section}>
                                        <h3 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center">
                                            <ChevronRight size={18} className="mr-2 text-cyan-500"/>
                                            {section}
                                        </h3>
                                        {renderSectionContent(section, selectedDepartment.details[section])}
                                    </div>
                                ))}
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default MANITBhopalDepartmentsPage;

