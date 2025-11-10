import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Users, Code, Palette, BookOpen, Heart, Filter, X, User, GraduationCap, Camera, Brain, Eye, Globe } from 'lucide-react';

// Club data structure with all categories and information
const clubsData = {
  Technical: [
    {
      name: "Robotics Club",
      description: "Building autonomous robots and competing in national competitions. Explore AI, machine learning, and cutting-edge robotics technology.",
      link: "https://www.instagram.com/roboticsclub.manit/",
      icon: "🤖",
      featured: true
    },
    {
      name: "Web Development & Internet Radio Club (WDIRC)",
      description: "Creating innovative web solutions and broadcasting digital content. Learn full-stack development and digital media production.",
      link: "https://manit.ac.in",
      icon: "🌐",
      featured: false
    },
    {
      name: "Programming Club (Zenith)",
      description: "Competitive programming, algorithm challenges, and software development. Master data structures and problem-solving skills.",
      link: "https://www.linkedin.com/company/zenith-programming-club-manit/",
      icon: "💻",
      featured: true
    },
    {
      name: "IEEE Student Branch",
      description: "Professional development in electrical and electronics engineering. Access to global IEEE resources and networking opportunities.",
      link: "https://www.ieee.org/",
      icon: "⚡",
      featured: false
    },
    {
      name: "ISTE Student Chapter",
      description: "Technical education and skill development programs. Connect with industry professionals and enhance technical expertise.",
      link: "https://www.isteonline.in/",
      icon: "🔧",
      featured: false
    },
    {
      name: "SAE Collegiate Club",
      description: "Automotive engineering and mobility solutions. Design and build vehicles for national competitions and industry challenges.",
      link: "https://saeindia.org/",
      icon: "🚗",
      featured: false
    },
    {
      name: "GDSC MANIT",
      description: "Google Developer Student Club fostering innovation in technology. Learn Google technologies and build solutions for local problems.",
      link: "https://www.instagram.com/gdscmanit/",
      icon: "🚀",
      featured: true
    },
    {
      name: "Pixel",
      category: "Technical",
      description: "Photography and Animation Club",
      fullDescription: "Pixel is a creative technical club focused on photography and animation. The club provides a platform for students to explore visual storytelling, digital art, and multimedia content creation. Members engage in photography workshops, animation projects, and visual design competitions.",
      icon: Camera,
      link: "#",
      founded: 2017,
      faculty: ["Dr. Sushma Gupta", "Dr. Mukesh Kirar"],
      students: ["Arjun Sharma", "Priya Verma"],
      functions: [
        "Photography Workshops",
        "Animation Projects", 
        "Visual Design Competitions",
        "Digital Art Training",
        "Multimedia Content Creation"
      ]
      },
      {
        name: "Drishtant Cell",
        category: "Technical",
        description: "Vision and Innovation Cell",
        fullDescription: "Drishtant Cell focuses on developing innovative solutions and fostering a culture of creativity and vision among students. The cell encourages students to think beyond conventional boundaries and develop projects that can make a real-world impact.",
        icon: Eye,
        link: "#",
        founded: 2019,
        faculty: ["Dr. K.K. Dhote", "Dr. Pragati Agawal"],
        students: ["Vikash Kumar", "Anita Sharma"],
        functions: [
          "Innovation Projects",
          "Vision Development",
          "Creative Problem Solving",
          "Technology Innovation",
          "Research and Development"
        ]
      },
      {
        name: "IBC - Intellectual Browsers Consortium",
        category: "Technical",
        description: "Web Development and Internet Technologies Cell",
        fullDescription: "IBC (Intellectual Browsers Consortium) Cell is dedicated to advancing web development skills and internet technologies among students. The cell focuses on modern web technologies, browser compatibility, and creating innovative web solutions for various applications.",
        icon: Globe,
        link: "#",
        founded: 2018,
        faculty: ["Dr. K.K. Dhote", "Dr. Ramesh Kumar Nayak"],
        students: ["Amit Verma", "Pooja Singh"],
        functions: [
          "Web Development Projects",
          "Internet Technology Research",
          "Browser Compatibility Testing",
          "Modern Web Framework Training",
          "Digital Solution Development"
        ]
      }
    ],
  Cultural: [
    {
      name: "Roobaroo",
      description: "Founded in 2008, Roobaroo is MANIT's esteemed cultural society encompassing dance, music, art, designing, anchoring, theatre, and unconventional talents. Known for the biannual extravaganza 'GIG A NIGHT' and annual creative contest 'Abilità Artistica'.",
      fullDescription: "Founded in 2008 by a group of passionate individuals, Roobaroo, the esteemed cultural society of MANIT has flourished over the years and established itself as a platform for students gifted in various artistic disciplines. The society encompasses a diverse range of artistic pursuits, including dance, music, art, designing, anchoring, theatre, and unconventional talents. It serves as a nurturing ground for individuals providing them with opportunities to showcase their skills and express their artistic vision. One of the society's highlights is its biannual extravaganza, 'GIG A NIGHT.' This grand event mesmerizes the audience with captivating dance and musical performances, exhibiting the extraordinary talents of the performers. Additionally, Roobaroo actively participates in national celebrations such as Republic Day and Independence Day contributing its artistic flair to these occasions. The society holds its annual online creative contest, Abilità Artistica, which is open for students PAN India. The contest witnessess a hefty participation from institutes across the country. Moreover, the society's artists perform in intercollege events and festivals, representing the institution and sharing their artistic endeavors with a wider audience. The selection process to join Roobaroo is conducted annually through auditions known as 'Ticket to Roobaroo,' where aspiring artists showcase their abilities and vie for a place in the society.",
      faculty: {
        advisor: "Dr. Meena Agrawal",
        coordinator: "Dr. Neha Kolhe",
        convenor: "Dr. Vaibhav Soni"
      },
      students: {
        coordinator: "Amitesh Shukla",
        coCoordinators: ["Mitali Mahesh Swami", "Sanskriti Gupta"]
      },
      functions: ["Artistic Dance", "Music", "Theatre", "Talents"],
      link: "https://www.instagram.com/roobaroo.manit/",
      icon: "🎭",
      featured: true
    },
    {
      name: "Pixel (Photography)",
      description: "Capturing moments and visual storytelling through photography. Learn professional photography techniques and digital editing.",
      link: "https://www.instagram.com/pixel.manit/",
      icon: "📸",
      featured: true
    }
  ],
  Literary: [
    {
      name: "Quizzers' Club (QCM)",
      description: "Knowledge competitions, trivia, and intellectual challenges. Test your general knowledge and compete in inter-college quizzes.",
      link: "https://qcmanit.in",
      icon: "🧠",
      featured: true
    },
    {
      name: "DebSoc (Debating Society)",
      description: "Parliamentary debates, public speaking, and critical thinking. Develop eloquence and argumentation skills through structured debates.",
      link: "https://www.linkedin.com/company/debsoc-manit/",
      icon: "🗣️",
      featured: false
    },
    {
      name: "Drishtant",
      description: "Literary magazine and creative writing community. Express your thoughts through poetry, stories, and journalistic articles.",
      link: "https://manit.ac.in",
      icon: "✍️",
      featured: false
    },
    {
      name: "IBC (Innovative Business Club)",
      description: "Entrepreneurship, business strategy, and startup incubation. Learn business fundamentals and develop innovative business ideas.",
      link: "https://manit.ac.in",
      icon: "💼",
      featured: false
    },
    {
      name: "Quizzers Cell",
      category: "Literary",
      description: "Quiz and Knowledge Competition Club",
      fullDescription: "Quizzers Cell is dedicated to promoting quiz culture and knowledge competitions among students. The club organizes various quiz events including the Western Regional Electron Quiz and conducts preliminary rounds for national competitions. Members develop critical thinking, general knowledge, and competitive skills.",
      icon: Brain,
      link: "#",
      founded: 2015,
      faculty: ["Dr. K.K. Dhote", "Dr. Jyoti Sarup"],
      students: ["Rahul Gupta", "Sneha Patel"],
      functions: [
        "Western Regional Electron Quiz",
        "Preliminary Quiz Rounds",
        "Knowledge Competitions",
        "Quiz Event Organization",
        "Critical Thinking Development"
      ]
    }
  ],

  Professional: [
      {
      name: "NSS (National Service Scheme)",
      category: "Professional",
      description: "Community service and social development initiatives. Contribute to society through volunteer work and social awareness programs.",
      fullDescription: "National Service Scheme (NSS) is a Central Sector Scheme of Government of India under Ministry of Youth Affairs & Sports. NSS enables students to participate in various issues and programmes of relevant social service and national development. NSS unit MANIT aims to develop virtues like responsibility for helping the needy, passion for selfless service to society, proficient leadership with awareness of vital social issues, and a sharing approach for welfare of mankind. The Motto of NSS is 'Not Me But You'.",
      icon: Heart,
      link: "https://nss.gov.in/",
      founded: 2010,
      faculty: ["Dr. Meena Agrawal", "Dr. Vivek Garg", "Dr. Surabhi Mehrotra", "Dr. R Vishnu Priya"],
      students: ["Abhishek Bokade", "Apoorv Khandelwal", "Prashant Gokhale", "Harshit Bamne", "Komal Meena"],
      functions: [
        "Save Water Initiatives",
        "Save Environment Programs",
        "Save Energy - Electricity Conservation",
        "Swachha Bharat Abhiyaan",
        "Nashaa Mukti Abhiyaan",
        "Awakening Social Consciousness of Youth",
        "Overall Personality Development through Community Service"
      ],
      featured: false
    },
    {
      name: "Go Green Forum",
      description: "Environmental conservation and sustainability projects. Promote eco-friendly practices and environmental awareness on campus.",
      link: "https://manit.ac.in",
      icon: "🌱",
      featured: false
    },
    {
      name: "Students' Council",
      description: "Student governance and representation in academic matters. Bridge the gap between students and administration for better campus life.",
      link: "https://www.instagram.com/manit.studentscouncil/",
      icon: "🏛️",
      featured: true
    },
    {
      name: "Alumni Network",
      description: "Connect with MANIT graduates and industry professionals. Access mentorship opportunities and career guidance from alumni.",
      link: "https://manit.ac.in/alumni",
      icon: "🎓",
      featured: false
    }
  ]
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

// Club Modal Component
const ClubModal = ({ club, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#002147] to-blue-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">
                  {typeof club.icon === 'string' ? (
                    club.icon
                  ) : (
                    React.createElement(club.icon, { size: 48, className: 'text-white' })
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{club.name}</h2>
                  {club.functions && (
                    <p className="text-blue-100 text-sm">
                      {club.functions.join(" • ")}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">
                {club.fullDescription || club.description}
              </p>
            </div>

            {/* Faculty Section */}
            {club.faculty && (
              <div>
                <h3 className="text-xl font-bold text-[#002147] mb-3 flex items-center gap-2">
                  <GraduationCap size={20} />
                  Faculty Associated
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Advisor</h4>
                    <p className="text-gray-700">{club.faculty.advisor}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Coordinator</h4>
                    <p className="text-gray-700">{club.faculty.coordinator}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Convenor</h4>
                    <p className="text-gray-700">{club.faculty.convenor}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Students Section */}
            {club.students && (
              <div>
                <h3 className="text-xl font-bold text-[#002147] mb-3 flex items-center gap-2">
                  <User size={20} />
                  Students Associated
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800">Coordinator</h4>
                    <p className="text-gray-700">{club.students.coordinator}</p>
                  </div>
                  {club.students.coCoordinators && club.students.coCoordinators.map((coCoord, index) => (
                    <div key={index} className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800">Co-Coordinator</h4>
                      <p className="text-gray-700">{coCoord}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t">
              <a
                href={club.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-[#002147] to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-[#002147] transition-all duration-300"
              >
                Visit Official Page
                <ExternalLink size={16} />
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ClubCard = ({ club, index, onKnowMore }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group perspective-1000"
      style={{
        transformStyle: "preserve-3d"
      }}
    >


      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="p-6 relative z-10">
        {/* Club icon */}
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {typeof club.icon === 'string' ? (
            club.icon
          ) : (
            React.createElement(club.icon, { size: 48 })
          )}
        </div>

        {/* Club name */}
        <h3 className="text-xl font-bold text-[#002147] mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {club.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
          {club.description}
        </p>

        {/* Know More button */}
        <motion.button
          onClick={() => onKnowMore(club)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#002147] to-blue-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:from-blue-600 hover:to-[#002147] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Know More
          <ExternalLink size={16} />
        </motion.button>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
    </motion.div>
  );
};

const Clubs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Technical', 'Cultural', 'Literary', 'Professional'];

  const categoryIcons = {
    All: <Filter size={20} />,
    Technical: <Code size={20} />,
    Cultural: <Palette size={20} />,
    Literary: <BookOpen size={20} />,
    Professional: <Heart size={20} />
  };

  useEffect(() => {
    if (activeCategory === 'All') {
      const allClubs = Object.entries(clubsData).flatMap(([category, clubs]) =>
        clubs.map(club => ({ ...club, category }))
      );
      setFilteredClubs(allClubs);
    } else {
      setFilteredClubs(clubsData[activeCategory].map(club => ({ ...club, category: activeCategory })));
    }
  }, [activeCategory]);

  const handleKnowMore = (club) => {
    setSelectedClub(club);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClub(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-5xl md:text-6xl font-bold text-[#002147] mb-6"
          >
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Clubs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Discover your passion and connect with like-minded students through our diverse range of clubs. 
            From technical innovation to cultural expression, find your community at MANIT.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4 text-[#002147]"
          >
            <Users size={24} />
            <span className="text-lg font-semibold">{filteredClubs.length} Active Clubs</span>
          </motion.div>
        </div>
      </section>



      {/* Category Filters */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#002147] to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {categoryIcons[category]}
                {category}
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {category === 'All' 
                    ? Object.values(clubsData).flat().length 
                    : clubsData[category]?.length || 0
                  }
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredClubs.map((club, index) => (
                <ClubCard key={`${club.category}-${index}`} club={club} index={index} onKnowMore={handleKnowMore} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredClubs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No clubs found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#002147] to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Join a Club?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 opacity-90"
          >
            Connect with club coordinators and start your journey of growth, learning, and fun!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="bg-white text-[#002147] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Contact Student Affairs
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#002147] transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Club Modal */}
      <ClubModal 
        club={selectedClub} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Clubs;
