import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Phone, BookOpen, Users, Award, FileText, Star, Lightbulb } from "lucide-react";
import { facultyAPI } from "../../utils/api";

const placeholder = "https://placehold.co/200x200?text=Dean";

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
                {content.map((c) => (
                  <div key={c} className="flex items-start gap-2">
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
  const [deans, setDeans] = useState([]);
  const [selectedDean, setSelectedDean] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadDeans = async () => {
      try {
        const { data } = await facultyAPI.getAdministration({ category: "dean" });
        if (!mounted) return;
        setDeans(data?.data || []);
        setSelectedDean(data?.data?.[0] || null);
      } catch (err) {
        setError("Unable to load dean profiles right now.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadDeans();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#002147] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dean profiles...</p>
        </div>
      </div>
    );
  }

  if (!selectedDean || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md mx-auto">
          <p className="text-gray-700 font-medium mb-3">{error || "Dean profiles are not available yet."}</p>
          <p className="text-sm text-gray-500">Please check back after the administration updates their details.</p>
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
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Deans of MANIT</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Profiles below update automatically when the administration changes data in the backend.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-[#002147] mb-6 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Our Deans
              </h2>
              <div className="space-y-3">
                {deans.map((dean) => (
                  <button
                    key={dean._id || dean.email || dean.name}
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
                          src={dean.imageUrl || placeholder}
                          alt={dean.altText || dean.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{dean.name}</h3>
                        <p className={`text-xs ${
                          selectedDean.name === dean.name ? "text-blue-200" : "text-gray-600"
                        }`}>
                          {dean.designation || "Dean"}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

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
                <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                      <img
                        src={selectedDean.imageUrl || placeholder}
                        alt={selectedDean.altText || selectedDean.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="text-center md:text-left flex-1">
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedDean.name}</h1>
                      <h2 className="text-xl text-blue-200 mb-4 font-medium">
                        {selectedDean.designation || "Dean"}
                      </h2>
                      <p className="text-blue-100 leading-relaxed mb-6">
                        {selectedDean.bio || "Profile will be updated soon."}
                      </p>
                      <div className="flex flex-col md:flex-row gap-4">
                        {selectedDean.email && (
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{selectedDean.email}</span>
                          </div>
                        )}
                        {selectedDean.contactNumber && (
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{selectedDean.contactNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#002147] mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    Academic & Research Profile
                  </h3>
                  
                  <div className="space-y-3">
                    <AccordionItem 
                      title="Areas of Expertise" 
                      content={selectedDean.areasOfExpertise?.length ? selectedDean.areasOfExpertise : ["Not provided"]} 
                      icon={BookOpen}
                    />
                    <AccordionItem 
                      title="Subjects Taught" 
                      content={selectedDean.subjectsTaught?.length ? selectedDean.subjectsTaught : ["Not provided"]} 
                      icon={BookOpen}
                    />
                    <AccordionItem 
                      title="Research Interests" 
                      content={selectedDean.researchInterests?.length ? selectedDean.researchInterests : ["Not provided"]} 
                      icon={Lightbulb}
                    />
                    <AccordionItem 
                      title="Committees" 
                      content={selectedDean.committees?.length ? selectedDean.committees.map((c) => `${c.name || c.type || "Committee"} (${c.role || "Member"})`) : "Not provided"} 
                      icon={Users}
                    />
                    <AccordionItem 
                      title="Awards / Achievements" 
                      content={selectedDean.awards?.length ? selectedDean.awards.map((a) => `${a.title} (${a.year || "Year n/a"})`) : "Not provided"} 
                      icon={Award}
                    />
                    <AccordionItem 
                      title="Publications" 
                      content={selectedDean.publications?.length ? selectedDean.publications.map((p) => p.title || "Publication") : "Not provided"} 
                      icon={FileText}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </motion.div>
  );
}
