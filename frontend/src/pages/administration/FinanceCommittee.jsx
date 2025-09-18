import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const members = [
  {
    name: "Prof. (Retd.) Arvind A Natu",
    role: "Chairperson",
    designation: "Former Professor of Chemistry, IISER Pune",
    img: "/images/finance/arvind_natu.jpg",
    details:
      "Prof. Natu has decades of experience in academia and administration, contributing to scientific policy making in India.",
  },
  {
    name: "Dr. Karunesh Kumar Shukla",
    role: "Director, MANIT Bhopal",
    designation: "Member",
    img: "/images/finance/karunesh_shukla.jpg",
    details:
      "Specialist in Computational Mechanics with over 80 research publications and author of 'Introduction to Strength of Materials'.",
  },
  {
    name: "Ms. Saumya Gupta, IAS",
    role: "Joint Secretary (NITs), Govt. of India",
    designation: "Member",
    img: "/images/finance/saumya_gupta.jpg",
    details:
      "An experienced administrator in the Ministry of Education, she oversees policies related to NITs and higher education governance.",
  },
  {
    name: "Shri Sanjog Kapoor",
    role: "Joint Secretary & Financial Advisor",
    designation: "Member",
    img: "/images/finance/sanjog_kapoor.jpg",
    details:
      "Provides financial oversight and policy guidance for higher education funding within the Ministry of Education.",
  },
  {
    name: "Shri Manish Singh, IAS",
    role: "Principal Secretary, Govt. of Madhya Pradesh",
    designation: "Member",
    img: "/images/finance/manish_singh.jpg",
    details:
      "Responsible for Technical Education & Skill Development in Madhya Pradesh, focusing on youth empowerment and employability.",
  },
  {
    name: "Prof. Shailendra Jain",
    role: "Professor, Dept. of Electrical Engg., MANIT Bhopal",
    designation: "Member",
    img: "/images/finance/shailendra_jain.jpg",
    details:
      "Researcher in Power Electronics and Electrical Machines with contributions to renewable energy integration.",
  },
  {
    name: "Mr. Gaurav Dwivedi",
    role: "Incharge Registrar, MANIT Bhopal",
    designation: "Member Secretary",
    img: "/images/finance/gaurav_dwivedi.jpg",
    details:
      "Coordinates academic and administrative processes at MANIT, ensuring smooth governance operations.",
  },
];

const FinanceCommittee = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleCard = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-[#002147] mb-10"
      >
        Finance Committee - MANIT Bhopal
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#002147] hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
          >
            <div className="flex flex-col items-center text-center">
              {/* Image */}
              <img
                src={member.img || `https://i.pravatar.cc/150?img=${index + 10}`}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover mb-4 shadow-md"
              />

              {/* Name + Role */}
              <h2 className="text-xl font-bold text-[#002147]">
                {member.name}
              </h2>
              <p className="mt-2 text-gray-700 font-medium">{member.role}</p>
              {member.designation && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  {member.designation}
                </p>
              )}

              {/* Read More Button */}
              <button
                onClick={() => toggleCard(index)}
                className="mt-4 px-5 py-2 bg-[#002147] text-white rounded-full text-sm font-semibold shadow-md hover:bg-[#003366] transition"
              >
                {expandedIndex === index ? "Read Less" : "Read More"}
              </button>
            </div>

            {/* Expanding Details Section */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="mt-4 text-sm text-gray-600 leading-relaxed"
                >
                  <p>{member.details}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FinanceCommittee;
