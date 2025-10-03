import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, GraduationCap, Mail, Phone, BookOpen, Award, User, Building2, ChevronRight } from "lucide-react";

const Faculty = () => {
  // Enhanced data structure with more details
  const data = {
    "Architecture & Planning": {
      icon: Building2,
      color: "from-purple-600 to-purple-700",
      branches: {
        "Architecture": [
          {
            name: "Dr. Anita Sharma",
            designation: "Professor & Head",
            email: "asharma@manit.ac.in",
            phone: "0755-4051001",
            image: "/faculty/architecture/asharma.jpg",
            specialization: ["Urban Design", "Sustainable Architecture", "Smart Cities"],
            experience: "25 years",
            qualifications: "Ph.D. (Architecture), M.Arch (Urban Planning)",
            research: "Smart City Planning, Green Building Design, Urban Infrastructure",
            publications: "45+ papers in SCI/Scopus journals",
            bio: "Leading expert in urban design and sustainable architecture with extensive experience in smart city planning and green building technologies."
          },
          {
            name: "Dr. Rajesh Kumar",
            designation: "Associate Professor",
            email: "rkumar@manit.ac.in",
            phone: "0755-4051011",
            image: "/faculty/architecture/rkumar.jpg",
            specialization: ["Heritage Conservation", "Building Technology", "Construction Management"],
            experience: "18 years",
            qualifications: "Ph.D. (Architecture), M.Arch (Conservation)",
            research: "Heritage Building Conservation, Modern Construction Techniques",
            publications: "32+ research papers",
            bio: "Specialist in heritage conservation and modern building technologies with focus on sustainable construction practices."
          }
        ],
        "Planning": [
          {
            name: "Dr. Priya Mehta",
            designation: "Professor",
            email: "pmehta@manit.ac.in",
            phone: "0755-4051012",
            image: "/faculty/planning/pmehta.jpg",
            specialization: ["Regional Planning", "Transportation Planning", "GIS Applications"],
            experience: "22 years",
            qualifications: "Ph.D. (Planning), M.Plan (Regional Planning)",
            research: "Regional Development, Transportation Systems, Geospatial Planning",
            publications: "38+ research publications",
            bio: "Expert in regional planning and transportation systems with extensive research in GIS applications for urban planning."
          }
        ]
      }
    },
    "Engineering": {
      icon: GraduationCap,
      color: "from-blue-600 to-blue-700",
      branches: {
        "Computer Science": [
          {
            name: "Dr. Rahul Verma",
            designation: "Professor & Head",
            email: "rverma@manit.ac.in",
            phone: "0755-4051002",
            image: "/faculty/cse/rverma.jpg",
            specialization: ["Artificial Intelligence", "Machine Learning", "Data Science"],
            experience: "20 years",
            qualifications: "Ph.D. (Computer Science), M.Tech (CSE)",
            research: "AI/ML Applications, Big Data Analytics, Deep Learning",
            publications: "85+ papers in top-tier journals",
            bio: "Renowned researcher in AI and Machine Learning with significant contributions to data science and deep learning algorithms."
          },
          {
            name: "Dr. Ramesh Singh",
            designation: "Professor",
            email: "rsingh@manit.ac.in",
            phone: "0755-4051021",
            image: "/faculty/cse/rsingh.jpg",
            specialization: ["Computer Networks", "Cybersecurity", "IoT Systems"],
            experience: "18 years",
            qualifications: "Ph.D. (Computer Engineering), M.Tech (Networks)",
            research: "Network Security, IoT Applications, Wireless Systems",
            publications: "72+ research papers",
            bio: "Expert in computer networks and cybersecurity with focus on IoT systems and wireless network security."
          },
          {
            name: "Dr. Sneha Agarwal",
            designation: "Associate Professor",
            email: "sagarwal@manit.ac.in",
            phone: "0755-4051022",
            image: "/faculty/cse/sagarwal.jpg",
            specialization: ["Software Engineering", "Database Systems", "Web Technologies"],
            experience: "15 years",
            qualifications: "Ph.D. (Software Engineering), M.Tech (CSE)",
            research: "Software Quality, Database Optimization, Web Application Security",
            publications: "58+ publications",
            bio: "Specialist in software engineering and database systems with research focus on web technologies and application security."
          }
        ],
        "Electronics & Communication": [
          {
            name: "Dr. Pradeep Gupta",
            designation: "Professor & Head",
            email: "pgupta@manit.ac.in",
            phone: "0755-4051003",
            image: "/faculty/ece/pgupta.jpg",
            specialization: ["VLSI Design", "Signal Processing", "Wireless Communication"],
            experience: "23 years",
            qualifications: "Ph.D. (Electronics), M.Tech (VLSI Design)",
            research: "VLSI Circuit Design, Digital Signal Processing, 5G Communication",
            publications: "95+ research papers",
            bio: "Leading expert in VLSI design and signal processing with extensive research in wireless communication systems."
          },
          {
            name: "Dr. Anjali Sharma",
            designation: "Associate Professor",
            email: "anjali@manit.ac.in",
            phone: "0755-4051031",
            image: "/faculty/ece/asharma.jpg",
            specialization: ["Embedded Systems", "Robotics", "Control Systems"],
            experience: "16 years",
            qualifications: "Ph.D. (Electronics), M.Tech (Embedded Systems)",
            research: "Embedded System Design, Robotics Applications, Intelligent Control",
            publications: "64+ papers",
            bio: "Expert in embedded systems and robotics with focus on intelligent control systems and automation."
          }
        ],
        "Civil Engineering": [
          {
            name: "Dr. Krishnan Sharma",
            designation: "Professor & Head",
            email: "ksharma@manit.ac.in",
            phone: "0755-4051004",
            image: "/faculty/civil/ksharma.jpg",
            specialization: ["Structural Engineering", "Earthquake Engineering", "Construction Materials"],
            experience: "26 years",
            qualifications: "Ph.D. (Structural Engineering), M.Tech (Civil)",
            research: "Seismic Design, Advanced Materials, Structural Health Monitoring",
            publications: "110+ research publications",
            bio: "Renowned structural engineer with expertise in earthquake-resistant design and advanced construction materials."
          },
          {
            name: "Dr. Meera Patel",
            designation: "Professor",
            email: "mpatel@manit.ac.in",
            phone: "0755-4051041",
            image: "/faculty/civil/mpatel.jpg",
            specialization: ["Water Resources", "Environmental Engineering", "Hydrology"],
            experience: "21 years",
            qualifications: "Ph.D. (Water Resources), M.Tech (Environmental)",
            research: "Water Treatment, Environmental Sustainability, Hydrological Modeling",
            publications: "78+ papers",
            bio: "Expert in water resources and environmental engineering with focus on sustainable water management systems."
          }
        ],
        "Electrical Engineering": [
          {
            name: "Dr. Naveen Singh",
            designation: "Professor & Head",
            email: "nsingh@manit.ac.in",
            phone: "0755-4051005",
            image: "/faculty/eee/nsingh.jpg",
            specialization: ["Power Systems", "Renewable Energy", "Smart Grids"],
            experience: "19 years",
            qualifications: "Ph.D. (Power Systems), M.Tech (Electrical)",
            research: "Smart Grid Technologies, Solar Energy Systems, Power Quality",
            publications: "89+ research papers",
            bio: "Leading researcher in power systems and renewable energy with expertise in smart grid technologies."
          }
        ],
        "Mechanical Engineering": [
          {
            name: "Dr. Suresh Gupta",
            designation: "Professor & Head",
            email: "sgupta@manit.ac.in",
            phone: "0755-4051007",
            image: "/faculty/mech/sgupta.jpg",
            specialization: ["Thermal Engineering", "Manufacturing", "Robotics"],
            experience: "24 years",
            qualifications: "Ph.D. (Mechanical), M.Tech (Thermal Engineering)",
            research: "Heat Transfer, Advanced Manufacturing, Industrial Robotics",
            publications: "102+ publications",
            bio: "Expert in thermal engineering and manufacturing with research focus on advanced manufacturing techniques and robotics."
          }
        ],
        "Metallurgy & Materials": [
          {
            name: "Dr. Arif Khan",
            designation: "Professor & Head",
            email: "akhan@manit.ac.in",
            phone: "0755-4051006",
            image: "/faculty/mme/akhan.jpg",
            specialization: ["Metallurgy", "Nanomaterials", "Materials Testing"],
            experience: "22 years",
            qualifications: "Ph.D. (Metallurgy), M.Tech (Materials)",
            research: "Nanomaterial Synthesis, Material Characterization, Alloy Development",
            publications: "96+ research papers",
            bio: "Renowned metallurgist with expertise in nanomaterials and advanced material testing techniques."
          }
        ],
        "Biomedical Engineering": [
          {
            name: "Dr. Vaibhav Mehta",
            designation: "Associate Professor & Head",
            email: "vmehta@manit.ac.in",
            phone: "0755-4051008",
            image: "/faculty/bse/vmehta.jpg",
            specialization: ["Biomedical Signal Processing", "Medical Imaging", "Computational Biology"],
            experience: "14 years",
            qualifications: "Ph.D. (Biomedical Engineering), M.Tech (Biomedical)",
            research: "Medical Image Processing, Biosignal Analysis, Healthcare Technology",
            publications: "67+ papers",
            bio: "Expert in biomedical signal processing and medical imaging with focus on healthcare technology development."
          }
        ]
      }
    },
    "Applied Sciences": {
      icon: BookOpen,
      color: "from-green-600 to-green-700",
      branches: {
        "Mathematics": [
          {
            name: "Dr. Kavita Patel",
            designation: "Professor & Head",
            email: "kpatel@manit.ac.in",
            phone: "0755-4051101",
            image: "/faculty/math/kpatel.jpg",
            specialization: ["Applied Mathematics", "Numerical Analysis", "Operations Research"],
            experience: "27 years",
            qualifications: "Ph.D. (Mathematics), M.Sc (Applied Mathematics)",
            research: "Numerical Methods, Optimization Techniques, Mathematical Modeling",
            publications: "120+ research papers",
            bio: "Distinguished mathematician with expertise in applied mathematics and numerical analysis for engineering applications."
          },
          {
            name: "Dr. Ajay Mishra",
            designation: "Professor",
            email: "amishra@manit.ac.in",
            phone: "0755-4051111",
            image: "/faculty/math/amishra.jpg",
            specialization: ["Statistics", "Probability Theory", "Data Analysis"],
            experience: "20 years",
            qualifications: "Ph.D. (Statistics), M.Sc (Statistics)",
            research: "Statistical Modeling, Probability Applications, Data Science",
            publications: "85+ publications",
            bio: "Expert in statistics and probability theory with applications in engineering and data science."
          }
        ],
        "Physics": [
          {
            name: "Dr. Sanjay Rao",
            designation: "Professor & Head",
            email: "srao@manit.ac.in",
            phone: "0755-4051102",
            image: "/faculty/physics/srao.jpg",
            specialization: ["Condensed Matter Physics", "Photonics", "Quantum Mechanics"],
            experience: "25 years",
            qualifications: "Ph.D. (Physics), M.Sc (Physics)",
            research: "Quantum Materials, Optical Physics, Solid State Physics",
            publications: "135+ research papers",
            bio: "Renowned physicist with expertise in condensed matter physics and photonics research."
          }
        ],
        "Chemistry": [
          {
            name: "Dr. Ruchi Choudhary",
            designation: "Associate Professor & Head",
            email: "rchoudhary@manit.ac.in",
            phone: "0755-4051103",
            image: "/faculty/chemistry/rchoudhary.jpg",
            specialization: ["Organic Chemistry", "Environmental Chemistry", "Green Chemistry"],
            experience: "17 years",
            qualifications: "Ph.D. (Chemistry), M.Sc (Organic Chemistry)",
            research: "Green Synthesis, Environmental Remediation, Sustainable Chemistry",
            publications: "73+ papers",
            bio: "Expert in organic and environmental chemistry with focus on green chemistry and sustainable processes."
          }
        ]
      }
    },
    "Humanities & Management": {
      icon: Users,
      color: "from-orange-600 to-orange-700",
      branches: {
        "Humanities": [
          {
            name: "Dr. Anupama Sinha",
            designation: "Professor & Head",
            email: "asinha@manit.ac.in",
            phone: "0755-4051201",
            image: "/faculty/humanities/asinha.jpg",
            specialization: ["English Literature", "Communication Skills", "Technical Writing"],
            experience: "23 years",
            qualifications: "Ph.D. (English), M.A (English Literature)",
            research: "Technical Communication, Language Pedagogy, Literary Studies",
            publications: "68+ publications",
            bio: "Distinguished scholar in English literature and technical communication with expertise in language pedagogy."
          }
        ],
        "Management Studies": [
          {
            name: "Dr. Manoj Yadav",
            designation: "Professor & Head",
            email: "myadav@manit.ac.in",
            phone: "0755-4051301",
            image: "/faculty/management/myadav.jpg",
            specialization: ["Marketing", "Business Analytics", "Organizational Behavior"],
            experience: "21 years",
            qualifications: "Ph.D. (Management), MBA (Marketing)",
            research: "Digital Marketing, Business Intelligence, Consumer Behavior",
            publications: "92+ research papers",
            bio: "Expert in marketing and business analytics with extensive research in digital marketing and consumer behavior."
          }
        ]
      }
    }
  };

  const departments = Object.keys(data);

  // State
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("profile"); // profile, grid

  // Initialize state safely
  useEffect(() => {
    if (departments.length > 0) {
      const firstDept = departments[0];
      const firstBranch = Object.keys(data[firstDept].branches)[0];
      const firstFaculty = data[firstDept].branches[firstBranch][0];
      setSelectedDept(firstDept);
      setSelectedBranch(firstBranch);
      setSelectedFaculty(firstFaculty);
    }
  }, []);

  // Filter faculty based on search
  const getFilteredFaculty = () => {
    if (!searchTerm) return data[selectedDept]?.branches[selectedBranch] || [];
    
    return data[selectedDept]?.branches[selectedBranch]?.filter(faculty =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
      faculty.designation.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  };

  if (!selectedDept || !selectedBranch || !selectedFaculty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#002147] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading faculty data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Faculty Directory</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Discover our distinguished faculty members who are leaders in their respective fields of expertise
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search faculty by name, specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("profile")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === "profile" 
                    ? "bg-[#002147] text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Profile View
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === "grid" 
                    ? "bg-[#002147] text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Grid View
              </button>
            </div>
          </div>
        </motion.div>

        {/* Department Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {departments.map((dept, index) => {
              const DeptIcon = data[dept].icon;
              return (
                <motion.button
                  key={dept}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  onClick={() => {
                    const firstBranch = Object.keys(data[dept].branches)[0];
                    const firstFaculty = data[dept].branches[firstBranch][0];
                    setSelectedDept(dept);
                    setSelectedBranch(firstBranch);
                    setSelectedFaculty(firstFaculty);
                    setSearchTerm("");
                  }}
                  className={`p-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedDept === dept
                      ? `bg-gradient-to-r ${data[dept].color} text-white shadow-lg`
                      : "bg-white text-gray-700 hover:shadow-md border border-gray-200"
                  }`}
                >
                  <DeptIcon className={`w-8 h-8 mx-auto mb-2 ${
                    selectedDept === dept ? "text-white" : "text-[#002147]"
                  }`} />
                  <div className="text-sm font-medium">{dept}</div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Branch Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-[#002147] mb-4 flex items-center gap-2">
              <ChevronRight className="w-5 h-5" />
              {selectedDept} Departments
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.keys(data[selectedDept].branches).map((branch) => (
                <button
                  key={branch}
                  onClick={() => {
                    const firstFaculty = data[selectedDept].branches[branch][0];
                    setSelectedBranch(branch);
                    setSelectedFaculty(firstFaculty);
                    setSearchTerm("");
                  }}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedBranch === branch
                      ? `bg-gradient-to-r ${data[selectedDept].color} text-white shadow-lg transform scale-105`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  {branch}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Faculty Content */}
        {viewMode === "profile" ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Faculty List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full lg:w-1/3"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Faculty Members
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getFilteredFaculty().map((faculty, index) => (
                    <motion.button
                      key={faculty.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      onClick={() => setSelectedFaculty(faculty)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                        selectedFaculty.name === faculty.name
                          ? `bg-gradient-to-r ${data[selectedDept].color} text-white shadow-lg transform scale-105`
                          : "hover:bg-gray-100 hover:shadow-md border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
                          selectedFaculty.name === faculty.name ? "border-white" : "border-[#002147]"
                        }`}>
                          <img
                            src={faculty.image}
                            alt={faculty.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=002147&color=fff&size=128`;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{faculty.name}</h4>
                          <p className={`text-xs ${
                            selectedFaculty.name === faculty.name ? "text-blue-200" : "text-gray-600"
                          }`}>
                            {faculty.designation}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {faculty.specialization.slice(0, 2).map((spec, i) => (
                              <span
                                key={i}
                                className={`text-xs px-2 py-1 rounded ${
                                  selectedFaculty.name === faculty.name 
                                    ? "bg-white/20 text-white" 
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Faculty Profile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex-1"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFaculty.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Profile Header */}
                  <div className={`bg-gradient-to-r ${data[selectedDept].color} text-white p-8`}>
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white"
                      >
                        <img
                          src={selectedFaculty.image}
                          alt={selectedFaculty.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedFaculty.name)}&background=002147&color=fff&size=256`;
                          }}
                        />
                      </motion.div>
                      
                      <div className="text-center md:text-left flex-1">
                        <motion.h1
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-3xl md:text-4xl font-bold mb-2"
                        >
                          {selectedFaculty.name}
                        </motion.h1>
                        
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-xl text-blue-200 mb-4 font-medium"
                        >
                          {selectedFaculty.designation}
                        </motion.h2>
                        
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="text-blue-100 leading-relaxed mb-6"
                        >
                          {selectedFaculty.bio}
                        </motion.p>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="flex flex-col md:flex-row gap-4"
                        >
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{selectedFaculty.email}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{selectedFaculty.phone}</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-[#002147] mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Specialization
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedFaculty.specialization.map((spec, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-[#002147] mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Qualifications
                          </h3>
                          <p className="text-gray-700">{selectedFaculty.qualifications}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-[#002147] mb-3 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Experience
                          </h3>
                          <p className="text-gray-700">{selectedFaculty.experience}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-[#002147] mb-3">Research Areas</h3>
                          <p className="text-gray-700">{selectedFaculty.research}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-[#002147] mb-3">Publications</h3>
                          <p className="text-gray-700">{selectedFaculty.publications}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          // Grid View
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {getFilteredFaculty().map((faculty, index) => (
              <motion.div
                key={faculty.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#002147]">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=002147&color=fff&size=128`;
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#002147] mb-1">{faculty.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{faculty.designation}</p>
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {faculty.specialization.slice(0, 2).map((spec, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center gap-2">
                    <a
                      href={`mailto:${faculty.email}`}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${faculty.phone}`}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Faculty;
