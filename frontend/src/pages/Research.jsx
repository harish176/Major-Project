import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Research = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const researchAreas = [
    {
      title: "Artificial Intelligence & Machine Learning",
      description: "Advanced research in AI, deep learning, neural networks, and intelligent systems for various engineering applications.",
      icon: "🤖"
    },
    {
      title: "Renewable Energy Systems",
      description: "Solar energy, wind power, energy storage systems, and sustainable energy solutions for rural and urban applications.",
      icon: "⚡"
    },
    {
      title: "Advanced Materials & Nanotechnology",
      description: "Development of smart materials, nanocomposites, and bio-degradable materials for industrial applications.",
      icon: "🔬"
    },
    {
      title: "Environmental Engineering",
      description: "Water treatment technologies, air pollution control, waste management, and environmental sustainability research.",
      icon: "🌿"
    },
    {
      title: "Structural Engineering & Mechanics",
      description: "Earthquake engineering, computational mechanics, and innovative construction technologies.",
      icon: "🏗️"
    },
    {
      title: "Electronics & Communication",
      description: "RF systems, antenna design, radar technology, VLSI design, and communication networks.",
      icon: "📡"
    },
    {
      title: "Mechanical Design & Manufacturing",
      description: "CAD/CAM, robotics, automation, and advanced manufacturing processes.",
      icon: "⚙️"
    },
    {
      title: "Computer Science & IT",
      description: "IoT, cyber security, software engineering, and distributed computing systems.",
      icon: "💻"
    }
  ];

  const centerOfExcellence = [
    {
      name: "Energy Centre",
      description: "Research in renewable energy, energy efficiency, and sustainable power systems",
      established: "2014",
      focus: ["Solar Energy", "Wind Power", "Energy Storage", "Smart Grids"]
    },
    {
      name: "Remote Sensing, GIS and GPS Centre",
      description: "Geospatial technology applications for urban planning and environmental monitoring",
      established: "2014",
      focus: ["Satellite Imaging", "Urban Planning", "Environmental Monitoring", "Geodesy"]
    },
    {
      name: "Nano Science and Engineering Centre",
      description: "Advanced research in nanomaterials and nanotechnology applications",
      established: "2014",
      focus: ["Nanomaterials", "Nanocomposites", "Biomedical Applications", "Smart Materials"]
    },
    {
      name: "Space Technology Incubation Centre (STIC)",
      description: "Fostering innovation in space technology and satellite applications",
      established: "2018",
      focus: ["Satellite Technology", "Space Applications", "Innovation Support", "Technology Transfer"]
    }
  ];

  const recentProjects = [
    {
      title: "CASCADED MULTILEVEL INVERTER",
      pi: "Dr. Shailendra Jain",
      department: "Electrical Engineering",
      status: "Patented",
      funding: "Industry Sponsored"
    },
    {
      title: "Smart Helmet Mechanism for Industrial Safety",
      pi: "Dr. Ravi Mandava",
      department: "Electronics & Communication",
      status: "Under Development",
      funding: "Government Grant"
    },
    {
      title: "Greenhouse System for Agricultural Drying",
      pi: "Dr. Anil K",
      department: "Mechanical Engineering",
      status: "Prototype Ready",
      funding: "DST Funded"
    },
    {
      title: "Non-Destructive Testing for High Voltage Systems",
      pi: "Dr. Ujjwal Kalla",
      department: "Electrical Engineering",
      status: "Patent Filed",
      funding: "Industry Partnership"
    },
    {
      title: "Biodegradable Composite Materials",
      pi: "Dr. Research Team",
      department: "Chemical Engineering",
      status: "Commercial Ready",
      funding: "SERB Grant"
    },
    {
      title: "Swelling Pressure Reduction in Expansive Soils",
      pi: "Dr. Civil Team",
      department: "Civil Engineering",
      status: "Field Testing",
      funding: "MHRD Project"
    }
  ];

  const researchFacilities = [
    {
      name: "Central Research Facility",
      equipment: "Advanced characterization tools, SEM, XRD, FTIR",
      area: "Materials Research"
    },
    {
      name: "VLSI Design Laboratory",
      equipment: "IC design tools, testing equipment, fabrication facilities",
      area: "Electronics & VLSI"
    },
    {
      name: "Environmental Engineering Lab",
      equipment: "Water quality analyzers, air monitoring systems",
      area: "Environmental Studies"
    },
    {
      name: "Renewable Energy Lab",
      equipment: "Solar simulators, wind tunnel, energy storage systems",
      area: "Energy Research"
    },
    {
      name: "Computational Lab",
      equipment: "High-performance computing cluster, simulation software",
      area: "Numerical Studies"
    },
    {
      name: "Mechanical Testing Lab",
      equipment: "UTM, fatigue testing, impact testing machines",
      area: "Mechanical Engineering"
    }
  ];

  const publicationsStats = [
    { year: "2024", publications: 245, impact: "High Impact Journals: 180" },
    { year: "2023", publications: 230, impact: "High Impact Journals: 165" },
    { year: "2022", publications: 215, impact: "High Impact Journals: 150" },
    { year: "2021", publications: 200, impact: "High Impact Journals: 140" }
  ];

  const patentsData = [
    { year: "2024", patents: 25, status: "15 Granted, 10 Filed" },
    { year: "2023", patents: 22, status: "18 Granted, 4 Filed" },
    { year: "2022", patents: 18, status: "12 Granted, 6 Filed" },
    { year: "2021", patents: 15, status: "10 Granted, 5 Filed" }
  ];

  const collaborations = [
    {
      type: "International",
      partners: ["MIT, USA", "University of Cambridge, UK", "TU Delft, Netherlands", "IIT Delhi", "IISc Bangalore"]
    },
    {
      type: "Industry",
      partners: ["BHEL", "DRDO", "ISRO", "L&T", "Tata Steel", "Mahindra Group"]
    },
    {
      type: "Government",
      partners: ["DST", "SERB", "CSIR", "MHRD", "DBT", "AICTE"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Research & Innovation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-center text-blue-100 max-w-3xl mx-auto"
          >
            Advancing Knowledge Through Cutting-Edge Research and Innovation at MANIT Bhopal
          </motion.p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'areas', label: 'Research Areas' },
              { id: 'centers', label: 'Centers of Excellence' },
              { id: 'projects', label: 'Projects' },
              { id: 'facilities', label: 'Facilities' },
              { id: 'publications', label: 'Publications & Patents' },
              { id: 'collaboration', label: 'Collaborations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 whitespace-nowrap font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Overview Section */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Research Excellence at MANIT</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    MANIT Bhopal stands as a beacon of research excellence in Central India, fostering innovation 
                    and technological advancement across multiple engineering disciplines. Our research ecosystem 
                    is designed to address real-world challenges while contributing to the global knowledge base.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">29 Active M.Tech Programs</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">PhD Programs in All Departments</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">State-of-the-art Research Facilities</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-sm text-gray-600">Research Publications</div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">80+</div>
                    <div className="text-sm text-gray-600">Patents Filed</div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
                    <div className="text-sm text-gray-600">Ongoing Projects</div>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
                    <div className="text-sm text-gray-600">Centers of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Research Areas Section */}
        {activeTab === 'areas' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Research Areas</h2>
              <p className="text-lg text-gray-600">
                Our multidisciplinary research spans across various domains of engineering and technology
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{area.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800">{area.title}</h3>
                  </div>
                  <p className="text-gray-600">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Centers of Excellence Section */}
        {activeTab === 'centers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Centers of Excellence</h2>
              <p className="text-lg text-gray-600">
                Specialized research centers driving innovation in key technology domains
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {centerOfExcellence.map((center, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">{center.name}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Established: {center.established}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{center.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {center.focus.map((area, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Section */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Current Research Projects</h2>
              <p className="text-lg text-gray-600">
                Ongoing research projects addressing industry needs and societal challenges
              </p>
            </div>
            
            <div className="space-y-6">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                      <div className="text-gray-600 space-y-1">
                        <p><strong>Principal Investigator:</strong> {project.pi}</p>
                        <p><strong>Department:</strong> {project.department}</p>
                        <p><strong>Funding:</strong> {project.funding}</p>
                      </div>
                    </div>
                    <div className="lg:ml-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        project.status === 'Patented' ? 'bg-green-100 text-green-800' :
                        project.status === 'Commercial Ready' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'Patent Filed' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Facilities Section */}
        {activeTab === 'facilities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Research Facilities</h2>
              <p className="text-lg text-gray-600">
                State-of-the-art laboratories and equipment supporting advanced research
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchFacilities.map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">{facility.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{facility.equipment}</p>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {facility.area}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Publications & Patents Section */}
        {activeTab === 'publications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Publications & Patents</h2>
              <p className="text-lg text-gray-600">
                Our research impact through scholarly publications and intellectual property
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Publications */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-blue-800 mb-6">Publications</h3>
                <div className="space-y-4">
                  {publicationsStats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <div className="text-lg font-semibold text-gray-800">{stat.year}</div>
                        <div className="text-sm text-gray-600">{stat.impact}</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{stat.publications}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patents */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-6">Patents</h3>
                <div className="space-y-4">
                  {patentsData.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div>
                        <div className="text-lg font-semibold text-gray-800">{stat.year}</div>
                        <div className="text-sm text-gray-600">{stat.status}</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{stat.patents}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Collaborations Section */}
        {activeTab === 'collaboration' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Research Collaborations</h2>
              <p className="text-lg text-gray-600">
                Strategic partnerships fostering innovation and knowledge exchange
              </p>
            </div>
            
            <div className="space-y-8">
              {collaborations.map((collab, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">{collab.type} Collaborations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {collab.partners.map((partner, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg text-center">
                        <span className="font-medium text-gray-700">{partner}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">Join Our Research Community</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Be part of cutting-edge research that shapes the future of technology and society
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Explore PhD Programs
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors">
              Research Opportunities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;