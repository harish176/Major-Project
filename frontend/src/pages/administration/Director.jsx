import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Award, BookOpen, Users, Building, GraduationCap, Calendar, Star, ChevronDown, ExternalLink, User } from "lucide-react";

const Director = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const directorData = {
    name: "Prof. Karunesh Kumar Shukla",
    designation: "Director",
    institute: "MANIT Bhopal",
    image: "/director.jpeg",
    email: "director@manit.ac.in",
    phone: "0755-4051000",
    office: "Director's Office, MANIT Bhopal",
    
    education: [
      {
        degree: "Ph.D.",
        field: "Structural Engineering",
        institution: "IIT Delhi",
        year: "2001"
      },
      {
        degree: "M.Tech",
        field: "Structural Engineering",
        institution: "MNNIT Allahabad",
        year: "1988"
      },
      {
        degree: "B.E.",
        field: "Civil Engineering",
        institution: "MMMUT Gorakhpur",
        year: "1986"
      }
    ],
    
    experience: [
      {
        position: "Director",
        institution: "MANIT Bhopal",
        period: "2020 - Present",
        description: "Leading the premier technical institution with focus on academic excellence and research innovation."
      },
      {
        position: "Director",
        institution: "NIT Jamshedpur",
        period: "2015 - 2020",
        description: "Successfully led the institution for over 5 years, implementing significant academic and infrastructure reforms."
      },
      {
        position: "Visiting Research Fellow",
        institution: "Feng Chia University, Taiwan",
        period: "2010",
        description: "Conducted collaborative research in structural engineering and composite materials."
      },
      {
        position: "Research Scholar (QIP)",
        institution: "IIT Delhi",
        period: "1997 - 2000",
        description: "Pursued doctoral research in computational mechanics and structural analysis."
      }
    ],
    
    research: [
      "Computational Mechanics",
      "Composite Structures",
      "Plates and Shells Analysis",
      "Stability and Dynamics of Structures",
      "Retrofitting of Structures",
      "Nano Composites",
      "Structural Health Monitoring",
      "Advanced Material Testing"
    ],
    
    achievements: {
      phd: "15",
      papers: "80+",
      books: "1",
      projects: "3",
      consultancy: "Multiple"
    },
    
    publications: [
      {
        title: "An Introduction to Strength of Materials",
        type: "Textbook",
        year: "2018"
      }
    ],
    
    vision: "To transform MANIT into a globally recognized center of excellence in technical education and research, fostering innovation and developing world-class engineers and technologists.",
    
    message: "Welcome to MANIT Bhopal, where we are committed to nurturing the next generation of engineers and researchers. Our institute stands as a beacon of technical excellence, combining traditional values with modern innovation. We strive to create an environment that encourages creativity, critical thinking, and ethical leadership among our students and faculty."
  };

  const sections = [
    { id: "overview", label: "Overview", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Building },
    { id: "research", label: "Research", icon: BookOpen },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "message", label: "Director's Message", icon: Star }
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Director's Profile</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Leading MANIT towards excellence in technical education and research innovation
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Director Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={directorData.image}
                    alt={directorData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center lg:text-left flex-1"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-3">{directorData.name}</h1>
                <h2 className="text-2xl text-blue-200 mb-6 font-medium">
                  {directorData.designation}, {directorData.institute}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                    <Mail className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-blue-200">Email</p>
                      <p className="text-sm font-medium">{directorData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                    <Phone className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-blue-200">Phone</p>
                      <p className="text-sm font-medium">{directorData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-blue-200">Office</p>
                      <p className="text-sm font-medium">Director's Office</p>
                    </div>
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-blue-100 leading-relaxed text-lg"
                >
                  {directorData.vision}
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-gray-50 px-8 py-4">
            <div className="flex flex-wrap gap-2">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-[#002147] text-white shadow-lg transform scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </motion.button>
                );
              })}
            </div>
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
                <h3 className="text-2xl font-bold text-[#002147] mb-4">Professional Overview</h3>
                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Prof. Karunesh Kumar Shukla is currently the Director of MANIT Bhopal, bringing over three decades of distinguished academic and administrative experience. Prior to this prestigious appointment, he served as Director of NIT Jamshedpur for more than 5 years, where he implemented significant reforms in academic programs and research initiatives.
                  </p>
                  <p>
                    His academic journey began with a Bachelor of Engineering Degree in Civil Engineering in 1986 from Madan Mohan Malviya Engineering College (now MMMUT), Gorakhpur, followed by a Masters in Structural Engineering in 1988 from Motilal Nehru Regional Engineering College (now MNNIT) Allahabad.
                  </p>
                  <p>
                    Prof. Shukla's commitment to research excellence led him to pursue doctoral studies as a research scholar under QIP at IIT Delhi from 1997 to 2000, culminating in his PhD from IIT Delhi in 2001. His international exposure includes a tenure as a visiting research fellow at Feng Chia University, Taiwan, where he collaborated on cutting-edge research in structural engineering.
                  </p>
                </div>
              </motion.div>
            )}

            {activeSection === "education" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-[#002147] mb-6">Educational Background</h3>
                <div className="space-y-4">
                  {directorData.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-[#002147]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-[#002147] text-white rounded-full p-2">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-[#002147]">{edu.degree}</h4>
                          <p className="text-lg text-gray-700 mb-1">{edu.field}</p>
                          <p className="text-gray-600">{edu.institution}</p>
                          <span className="inline-block bg-[#002147] text-white px-3 py-1 rounded-full text-sm mt-2">
                            {edu.year}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "experience" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-[#002147] mb-6">Professional Experience</h3>
                <div className="space-y-6">
                  {directorData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white rounded-lg p-3">
                          <Building className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-[#002147] mb-1">{exp.position}</h4>
                          <p className="text-lg text-gray-700 mb-2">{exp.institution}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-600">{exp.period}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "research" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-[#002147] mb-6">Research Interests</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {directorData.research.map((area, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-[#002147]" />
                        <span className="font-medium text-gray-800">{area}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "achievements" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-[#002147] mb-6">Key Achievements</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                  {Object.entries(directorData.achievements).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="text-center bg-gradient-to-br from-[#002147] to-[#003366] text-white rounded-2xl p-6 shadow-lg"
                    >
                      <div className="text-3xl font-bold mb-2">{value}</div>
                      <div className="text-sm opacity-90 capitalize">
                        {key === "phd" ? "Ph.D. Supervised" : 
                         key === "papers" ? "Research Papers" :
                         key === "books" ? "Books Authored" :
                         key === "projects" ? "Sponsored Projects" :
                         "Consultancy Works"}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6" />
                    Notable Contributions
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      Authored the textbook "An Introduction to Strength of Materials"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      Extensive consultancy services in Structural Design and Material Testing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      Successfully completed multiple sponsored research projects
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      International research collaboration at Feng Chia University, Taiwan
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeSection === "message" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-[#002147] mb-6">Director's Message</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                  <div className="flex items-start gap-6">
                    <div className="bg-[#002147] text-white rounded-full p-4 flex-shrink-0">
                      <Star className="w-8 h-8" />
                    </div>
                    <div>
                      <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-4">
                        "{directorData.message}"
                      </blockquote>
                      <div className="flex items-center gap-2 text-[#002147] font-semibold">
                        <span>— Prof. Karunesh Kumar Shukla</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Director;