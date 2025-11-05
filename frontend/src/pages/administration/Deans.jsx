import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Phone, BookOpen, Users, Award, FileText, Lightbulb, Star } from "lucide-react";

const deans = [
  {
    name: "Dr. Krishna K Dhote",
    designation: "Dean Planning & Development",
    email: "deanpd@manit.ac.in",
    phone: "(O) 0755-4051024",
    img: "/deans/dhote.jpg",
    bio: "Expert in Urban Planning and Sustainable Development with over 25 years of experience in teaching and research. Leading pioneer in smart city development and sustainable infrastructure planning.",
    details: {
      subjects: ["Urban Planning", "Smart Cities", "Sustainability", "Infrastructure Development"],
      teaching: "25 years of teaching in UG and PG programs with expertise in urban development methodologies.",
      phd: "Supervised 10 Ph.D. theses, 5 ongoing in areas of urban planning and smart cities.",
      research: "Handled 12 sponsored projects from AICTE, UGC, DST worth ₹2.5 crores.",
      consultancy: "Smart City projects for Bhopal, Indore, and Gwalior. Urban planning consultant for MP Government.",
      publications: "50+ research papers in SCI/Scopus journals, 3 books authored on urban planning.",
      patents: "2 patents filed on urban infrastructure systems and smart city technologies."
    }
  },
  {
    name: "Dr. Nilay Khare",
    designation: "Dean Research & Consultancy",
    email: "deanrc@manit.ac.in",
    phone: "(O) 0755-4051025",
    img: "/deans/nilaykhare.jpg",
    bio: "Distinguished researcher in Computer Science with specialization in AI and Machine Learning. Published over 120 research papers with significant contributions to data mining and intelligent systems.",
    details: {
      subjects: ["Artificial Intelligence", "Machine Learning", "Data Mining", "Pattern Recognition"],
      teaching: "20 years of teaching experience in computer science and engineering disciplines.",
      phd: "Supervised 15 Ph.D. students, 7 ongoing in AI/ML domains.",
      research: "25 projects funded by SERB, DST, and Industry totaling ₹3.8 crores.",
      consultancy: "Consulted for IT industries in Bhopal and Pune on AI implementation and data analytics.",
      publications: "120+ research papers in top-tier journals, H-index: 18, Citations: 2500+.",
      patents: "3 patents filed in ML applications for healthcare and smart systems."
    }
  },
  {
    name: "Dr. Shailendra Jain",
    designation: "Dean Student Welfare",
    email: "deansw@manit.ac.in",
    phone: "(O) 0755-4051026",
    img: "/deans/ShailendraJain.jpg",
    bio: "Dedicated educator and researcher in Electronics Engineering with focus on student development and welfare. Champion of holistic education and student-centric policies.",
    details: {
      subjects: ["Electronics Engineering", "VLSI Design", "Digital Systems", "Embedded Systems"],
      teaching: "22 years of teaching experience with focus on practical learning and student mentorship.",
      phd: "Supervised 12 Ph.D. students, 6 ongoing in electronics and embedded systems.",
      research: "18 projects funded by various agencies focusing on student welfare technologies.",
      consultancy: "Electronics system design for various industries and educational institutions.",
      publications: "85+ research papers with focus on student welfare and educational technology.",
      patents: "4 patents in educational technology and student welfare systems."
    }
  },
  {
    name: "Dr. M. M. Malik",
    designation: "Dean Academic Affairs",
    email: "deanaa@manit.ac.in",
    phone: "(O) 0755-4051027",
    img: "/deans/malik.jpg",
    bio: "Experienced academician with expertise in curriculum development and academic administration. Leading initiatives in educational reform and quality assurance.",
    details: {
      subjects: ["Mechanical Engineering", "Thermal Engineering", "Energy Systems", "Academic Administration"],
      teaching: "28 years of comprehensive teaching and administrative experience.",
      phd: "Supervised 18 Ph.D. students, 8 ongoing in thermal and energy systems.",
      research: "22 projects on energy efficiency and academic quality improvement.",
      consultancy: "Academic consultancy for various technical institutions and industries.",
      publications: "95+ research papers in mechanical and thermal engineering domains.",
      patents: "5 patents in energy systems and educational methodologies."
    }
  },
  {
    name: "Dr. Alka Bharat",
    designation: "Dean International Relations",
    email: "deanir@manit.ac.in",
    phone: "(O) 0755-4051028",
    img: "/deans/alkabharat.jpg",
    bio: "Pioneer in international academic collaborations and cross-cultural educational exchange. Expert in computer science with global research partnerships.",
    details: {
      subjects: ["Computer Networks", "International Collaborations", "Software Engineering", "Global Education"],
      teaching: "24 years of teaching with international exposure and collaborative research.",
      phd: "Supervised 14 Ph.D. students, 9 ongoing with international co-supervision.",
      research: "20 international collaborative projects with universities in USA, Europe, and Asia.",
      consultancy: "International education consultant for various global initiatives.",
      publications: "110+ research papers in international journals with global co-authors.",
      patents: "6 patents filed in collaboration with international partners."
    }
  },
  {
    name: "Dr. Satish Pal Singh Rajput",
    designation: "Dean Continuing Education",
    email: "deance@manit.ac.in",
    phone: "(O) 0755-4051029",
    img: "/deans/rajput.jpg",
    bio: "Champion of lifelong learning and continuing education programs. Expert in bridging industry-academia gap through innovative educational initiatives.",
    details: {
      subjects: ["Continuing Education", "Professional Development", "Industry Training", "Skill Enhancement"],
      teaching: "26 years of experience in formal and continuing education programs.",
      phd: "Supervised 16 Ph.D. students, 7 ongoing in educational technology and professional development.",
      research: "30 projects on skill development and continuing education methodologies.",
      consultancy: "Training and development consultant for various industries and government organizations.",
      publications: "75+ research papers on education technology and professional development.",
      patents: "3 patents in educational delivery systems and skill assessment technologies."
    }
  },
];

const AccordionItem = ({ title, content, icon: Icon }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-6 py-4 bg-gradient-to-r from-[#002147] to-[#003366] text-white font-semibold hover:from-[#003366] hover:to-[#004488] transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          {title}
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="px-6 py-4 text-gray-700 bg-gradient-to-r from-gray-50 to-blue-50"
          >
            {Array.isArray(content) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {content.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#002147] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{c}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{content}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function DeansPage() {
  const [selectedDean, setSelectedDean] = useState(deans[0]);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Deans of MANIT</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Meet our distinguished academic leaders who guide the institution towards excellence in education, research, and innovation
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-1/3"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-[#002147] mb-6 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Our Deans
              </h2>
              <div className="space-y-3">
                {deans.map((dean, index) => (
                  <motion.div
                    key={dean.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <button
                      onClick={() => setSelectedDean(dean)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                        selectedDean.name === dean.name
                          ? "bg-gradient-to-r from-[#002147] to-[#003366] text-white shadow-lg transform scale-105"
                          : "hover:bg-gray-100 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
                          selectedDean.name === dean.name ? "border-white" : "border-[#002147]"
                        }`}>
                          <img
                            src={dean.img}
                            alt={dean.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{dean.name}</h3>
                          <p className={`text-xs ${
                            selectedDean.name === dean.name ? "text-blue-200" : "text-gray-600"
                          }`}>
                            {dean.designation}
                          </p>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Right Content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDean.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Dean Profile Header */}
                <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white"
                    >
                      <img
                        src={selectedDean.img}
                        alt={selectedDean.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    <div className="text-center md:text-left flex-1">
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold mb-2"
                      >
                        {selectedDean.name}
                      </motion.h1>
                      
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl text-blue-200 mb-4 font-medium"
                      >
                        {selectedDean.designation}
                      </motion.h2>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-blue-100 leading-relaxed mb-6"
                      >
                        {selectedDean.bio}
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-col md:flex-row gap-4"
                      >
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{selectedDean.email}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{selectedDean.phone}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Accordion Section */}
                <div className="p-8">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-2xl font-bold text-[#002147] mb-6 flex items-center gap-2"
                  >
                    <Star className="w-6 h-6" />
                    Academic & Research Profile
                  </motion.h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="space-y-3"
                  >
                    <AccordionItem 
                      title="Areas of Expertise" 
                      content={selectedDean.details.subjects} 
                      icon={BookOpen}
                    />
                    <AccordionItem 
                      title="Teaching Experience" 
                      content={selectedDean.details.teaching} 
                      icon={Users}
                    />
                    <AccordionItem 
                      title="Ph.D. Supervision" 
                      content={selectedDean.details.phd} 
                      icon={Award}
                    />
                    <AccordionItem 
                      title="Research Projects" 
                      content={selectedDean.details.research} 
                      icon={Lightbulb}
                    />
                    <AccordionItem 
                      title="Consultancy Work" 
                      content={selectedDean.details.consultancy} 
                      icon={Star}
                    />
                    <AccordionItem 
                      title="Publications & Research Output" 
                      content={selectedDean.details.publications} 
                      icon={FileText}
                    />
                    <AccordionItem 
                      title="Patents & Innovations" 
                      content={selectedDean.details.patents} 
                      icon={Lightbulb}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </motion.div>
  );
}
