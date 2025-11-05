import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, FileText, Target, ChevronDown, ChevronUp, Mail, Phone, MapPin, Award, Building, User, Star, BookOpen } from "lucide-react";

const committeeInfo = {
  overview: "The Finance Committee of MANIT Bhopal is constituted as per the guidelines of the Ministry of Education, Government of India. The committee oversees financial planning, budget allocation, and strategic financial decisions to ensure the sustainable growth and development of the institute.",
  
  objectives: [
    "Review and approve annual budgets and financial plans",
    "Monitor expenditure and ensure financial compliance",
    "Evaluate infrastructure development proposals",
    "Oversee resource allocation for academic and research activities",
    "Ensure transparency in financial operations",
    "Guide strategic financial planning for institutional growth"
  ],
  
  meetingSchedule: "The committee meets quarterly or as required for urgent financial matters",
  
  responsibilities: [
    "Budget Planning & Approval",
    "Financial Policy Development",
    "Infrastructure Investment Decisions",
    "Resource Optimization",
    "Compliance Monitoring",
    "Strategic Financial Planning"
  ]
};

const members = [
  {
    name: "Prof. (Retd.) Arvind A Natu",
    role: "Chairperson",
    designation: "Former Professor of Chemistry, IISER Pune",
    img: "/images/finance/arvind_natu.jpg",
    category: "chairperson",
    expertise: ["Academic Administration", "Scientific Policy", "Higher Education Governance"],
    experience: "35+ years",
    details: "Prof. Natu has decades of experience in academia and administration, contributing to scientific policy making in India. He has served in various capacities in premier educational institutions and has been instrumental in shaping higher education policies.",
    achievements: ["Former Director of IISER", "Member of various national committees", "Expert in institutional governance"]
  },
  {
    name: "Dr. Karunesh Kumar Shukla",
    role: "Director, MANIT Bhopal",
    designation: "Member",
    img: "/director.jpeg",
    category: "institutional",
    expertise: ["Computational Mechanics", "Structural Engineering", "Research Administration"],
    experience: "30+ years",
    details: "Specialist in Computational Mechanics with over 80 research publications and author of 'Introduction to Strength of Materials'. He brings extensive experience in institutional leadership and academic excellence.",
    achievements: ["80+ Research Publications", "Former Director NIT Jamshedpur", "Author of Engineering Textbook"]
  },
  {
    name: "Ms. Saumya Gupta, IAS",
    role: "Joint Secretary (NITs), Govt. of India",
    designation: "Member",
    img: "/images/finance/saumya_gupta.jpg",
    category: "government",
    expertise: ["Education Policy", "Administrative Management", "Higher Education Governance"],
    experience: "20+ years",
    details: "An experienced administrator in the Ministry of Education, she oversees policies related to NITs and higher education governance. Her expertise in policy formulation and implementation makes her invaluable to the committee.",
    achievements: ["Policy Expert", "NIT Oversight", "Education Administration"]
  },
  {
    name: "Shri Sanjog Kapoor",
    role: "Joint Secretary & Financial Advisor",
    designation: "Member",
    img: "/images/finance/sanjog_kapoor.jpg",
    category: "financial",
    expertise: ["Financial Planning", "Budget Management", "Policy Guidance"],
    experience: "25+ years",
    details: "Provides financial oversight and policy guidance for higher education funding within the Ministry of Education. His expertise in financial management ensures prudent use of resources and strategic planning.",
    achievements: ["Financial Policy Expert", "Budget Management", "Higher Education Funding"]
  },
  {
    name: "Shri Manish Singh, IAS",
    role: "Principal Secretary, Govt. of Madhya Pradesh",
    designation: "Member",
    img: "/images/finance/manish_singh.jpg",
    category: "government",
    expertise: ["Technical Education", "Skill Development", "Youth Empowerment"],
    experience: "22+ years",
    details: "Responsible for Technical Education & Skill Development in Madhya Pradesh, focusing on youth empowerment and employability. His regional expertise provides valuable insights for state-level coordination.",
    achievements: ["Technical Education Leader", "Skill Development Expert", "Youth Empowerment Advocate"]
  },
  {
    name: "Prof. Shailendra Jain",
    role: "Professor, Dept. of Electrical Engg., MANIT Bhopal",
    designation: "Member",
    img: "/deans/ShailendraJain.jpg",
    category: "faculty",
    expertise: ["Power Electronics", "Electrical Machines", "Renewable Energy"],
    experience: "25+ years",
    details: "Researcher in Power Electronics and Electrical Machines with contributions to renewable energy integration. His academic perspective ensures that financial decisions align with educational and research objectives.",
    achievements: ["Research Excellence", "Renewable Energy Expert", "Academic Leadership"]
  },
  {
    name: "Mr. Gaurav Dwivedi",
    role: "Incharge Registrar, MANIT Bhopal",
    designation: "Member Secretary",
    img: "/images/finance/gaurav_dwivedi.jpg",
    category: "administrative",
    expertise: ["Academic Administration", "Governance Operations", "Process Management"],
    experience: "15+ years",
    details: "Coordinates academic and administrative processes at MANIT, ensuring smooth governance operations. As Member Secretary, he facilitates committee proceedings and ensures implementation of decisions.",
    achievements: ["Administrative Excellence", "Process Optimization", "Governance Coordination"]
  },
];

const FinanceCommittee = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");

  const toggleCard = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "chairperson": return <Star className="w-5 h-5" />;
      case "institutional": return <Building className="w-5 h-5" />;
      case "government": return <Award className="w-5 h-5" />;
      case "financial": return <FileText className="w-5 h-5" />;
      case "faculty": return <BookOpen className="w-5 h-5" />;
      case "administrative": return <User className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "chairperson": return "from-yellow-500 to-orange-500";
      case "institutional": return "from-blue-500 to-indigo-500";
      case "government": return "from-green-500 to-emerald-500";
      case "financial": return "from-purple-500 to-violet-500";
      case "faculty": return "from-red-500 to-pink-500";
      case "administrative": return "from-teal-500 to-cyan-500";
      default: return "from-gray-500 to-slate-500";
    }
  };

  const sections = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "objectives", label: "Objectives", icon: FileText },
    { id: "responsibilities", label: "Key Responsibilities", icon: Building },
    { id: "members", label: "Committee Members", icon: Users }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Finance Committee</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Overseeing financial planning and strategic resource allocation for institutional excellence
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Quarterly Meetings</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">{members.length} Members</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden"
        >
          <div className="flex flex-wrap border-b border-gray-200">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 flex-1 justify-center ${
                    activeSection === section.id
                      ? "bg-[#002147] text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#002147]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{section.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Content Sections */}
          <div className="p-8">
            {activeSection === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-[#002147] mb-4">Committee Overview</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-[#002147]">
                  <p className="text-gray-700 leading-relaxed text-lg">{committeeInfo.overview}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-6 h-6 text-[#002147]" />
                      <h4 className="text-lg font-semibold text-[#002147]">Meeting Schedule</h4>
                    </div>
                    <p className="text-gray-700">{committeeInfo.meetingSchedule}</p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-6 h-6 text-[#002147]" />
                      <h4 className="text-lg font-semibold text-[#002147]">Committee Composition</h4>
                    </div>
                    <p className="text-gray-700">
                      The committee comprises {members.length} distinguished members from academia, 
                      government, and administrative backgrounds.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "objectives" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-[#002147] mb-6">Committee Objectives</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {committeeInfo.objectives.map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-6 border border-blue-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-[#002147] text-white rounded-full p-2 flex-shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <p className="text-gray-700 font-medium">{objective}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "responsibilities" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-[#002147] mb-6">Key Responsibilities</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {committeeInfo.responsibilities.map((responsibility, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-gradient-to-br from-[#002147] to-[#003366] text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="text-center">
                        <FileText className="w-8 h-8 mx-auto mb-3" />
                        <h4 className="font-semibold">{responsibility}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "members" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold text-[#002147] mb-6">Committee Members</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {/* Category Badge */}
                      <div className={`bg-gradient-to-r ${getCategoryColor(member.category)} p-4 text-white`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(member.category)}
                            <span className="text-sm font-medium capitalize">{member.category}</span>
                          </div>
                          <span className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                            {member.experience}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Profile Image */}
                        <div className="flex justify-center mb-4">
                          <img
                            src={member.img || `https://i.pravatar.cc/150?img=${index + 10}`}
                            alt={member.name}
                            className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
                            style={{ marginTop: '-3rem' }}
                          />
                        </div>

                        {/* Member Info */}
                        <div className="text-center mb-4">
                          <h4 className="text-xl font-bold text-[#002147] mb-2">{member.name}</h4>
                          <p className="text-gray-700 font-medium mb-1">{member.role}</p>
                          <p className="text-sm text-gray-600 italic">{member.designation}</p>
                        </div>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.expertise.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{member.expertise.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Expand Button */}
                        <button
                          onClick={() => toggleCard(index)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#002147] text-white rounded-lg hover:bg-[#003366] transition-colors"
                        >
                          <span className="text-sm font-medium">
                            {expandedIndex === index ? "Show Less" : "View Details"}
                          </span>
                          {expandedIndex === index ? 
                            <ChevronUp className="w-4 h-4" /> : 
                            <ChevronDown className="w-4 h-4" />
                          }
                        </button>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {expandedIndex === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                              className="mt-4 space-y-4"
                            >
                              <div className="border-t border-gray-200 pt-4">
                                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                  {member.details}
                                </p>
                                
                                <div className="space-y-3">
                                  <div>
                                    <h5 className="text-sm font-semibold text-[#002147] mb-2">All Expertise Areas:</h5>
                                    <div className="flex flex-wrap gap-1">
                                      {member.expertise.map((skill, skillIndex) => (
                                        <span
                                          key={skillIndex}
                                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h5 className="text-sm font-semibold text-[#002147] mb-2">Key Achievements:</h5>
                                    <ul className="space-y-1">
                                      {member.achievements.map((achievement, achIndex) => (
                                        <li key={achIndex} className="text-xs text-gray-600 flex items-start gap-2">
                                          <span className="text-[#002147] mt-1">•</span>
                                          {achievement}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FinanceCommittee;
