import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const deans = [
  {
    name: "Dr. Krishna K Dhote",
    designation: "Dean Planning & Development",
    email: "deanpd@manit.ac.in",
    phone: "(O) 0755-4051024",
    img: "/deans/dhote.jpg",
    bio: "Expert in Urban Planning and Sustainable Development. 25+ years in teaching and research.",
    details: {
      subjects: ["Urban Planning", "Smart Cities", "Sustainability"],
      teaching: "25 years of teaching in UG and PG programs.",
      phd: "Supervised 10 Ph.D. theses, 5 ongoing.",
      research: "Handled 12 sponsored projects from AICTE, UGC, DST.",
      consultancy: "Smart City projects for Bhopal, Indore, and Gwalior.",
      publications: "50+ research papers, 3 books authored.",
      patents: "2 patents filed on urban infrastructure systems."
    }
  },
  {
    name: "Dr. Nilay Khare",
    designation: "Dean Research & Consultancy",
    email: "deanrc@manit.ac.in",
    phone: "(O) 0755-4051025",
    img: "/deans/nilaykhare.jpg",
    bio: "Specialist in Computer Science and Research methodologies. Published 100+ papers.",
    details: {
      subjects: ["Artificial Intelligence", "Machine Learning", "Data Mining"],
      teaching: "20 years of teaching experience.",
      phd: "Supervised 15 Ph.D., 7 ongoing.",
      research: "25 projects funded by SERB, DST, and Industry.",
      consultancy: "Consulted for IT industries in Bhopal and Pune.",
      publications: "120+ research papers, H-index: 18.",
      patents: "3 patents in ML applications."
    }
  },
  {
    name: "Dr. Shailendra Jain",
    designation: " Dean Student Welfare",
    email: "deanrc@manit.ac.in",
    phone: "(O) 0755-4051025",
    img: "/deans/ShailendraJain.jpg",
    bio: "Specialist in Electronics and Research methodologies. Published 100+ papers.",
    details: {
      subjects: ["Artificial Intelligence", "Machine Learning", "Data Mining"],
      teaching: "20 years of teaching experience.",
      phd: "Supervised 15 Ph.D., 7 ongoing.",
      research: "25 projects funded by SERB, DST, and Industry.",
      consultancy: "Consulted for IT industries in Bhopal and Pune.",
      publications: "120+ research papers, H-index: 18.",
      patents: "3 patents in ML applications."
    }
  },
  {
    name: "Dr. M. M. Malik",
    designation: "Dean Research & Consultancy",
    email: "deanrc@manit.ac.in",
    phone: "(O) 0755-4051025",
    img: "/images/deans/khare.jpg",
    bio: "Specialist in Computer Science and Research methodologies. Published 100+ papers.",
    details: {
      subjects: ["Artificial Intelligence", "Machine Learning", "Data Mining"],
      teaching: "20 years of teaching experience.",
      phd: "Supervised 15 Ph.D., 7 ongoing.",
      research: "25 projects funded by SERB, DST, and Industry.",
      consultancy: "Consulted for IT industries in Bhopal and Pune.",
      publications: "120+ research papers, H-index: 18.",
      patents: "3 patents in ML applications."
    }
  },
  {
    name: " Dr.Alka Bharat",
    designation: "Dean Research & Consultancy",
    email: "deanrc@manit.ac.in",
    phone: "(O) 0755-4051025",
    img: "/deans/alkabharat.jpg",
    bio: "Specialist in Computer Science and Research methodologies. Published 100+ papers.",
    details: {
      subjects: ["Artificial Intelligence", "Machine Learning", "Data Mining"],
      teaching: "20 years of teaching experience.",
      phd: "Supervised 15 Ph.D., 7 ongoing.",
      research: "25 projects funded by SERB, DST, and Industry.",
      consultancy: "Consulted for IT industries in Bhopal and Pune.",
      publications: "120+ research papers, H-index: 18.",
      patents: "3 patents in ML applications."
    }
  },
  {
    name: " Dr. Satish Pal Singh Rajput",
    designation: "Dean Research & Consultancy",
    email: "deanrc@manit.ac.in",
    phone: "(O) 0755-4051025",
    img: "/deans/rajput.jpg",
    bio: "Specialist in Computer Science and Research methodologies. Published 100+ papers.",
    details: {
      subjects: ["Artificial Intelligence", "Machine Learning", "Data Mining"],
      teaching: "20 years of teaching experience.",
      phd: "Supervised 15 Ph.D., 7 ongoing.",
      research: "25 projects funded by SERB, DST, and Industry.",
      consultancy: "Consulted for IT industries in Bhopal and Pune.",
      publications: "120+ research papers, H-index: 18.",
      patents: "3 patents in ML applications."
    }
  },
];

const AccordionItem = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-4 py-3 bg-blue-800 text-white font-semibold hover:bg-blue-700 transition"
      >
        {title}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 text-gray-700 bg-gray-50"
          >
            {Array.isArray(content) ? (
              <ul className="list-disc ml-6">
                {content.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <p>{content}</p>
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-[#002147] text-white p-6 space-y-4 shadow-xl">
        <h2 className="text-xl font-bold tracking-wide mb-4">Deans</h2>
        <ul className="space-y-2">
          {deans.map((dean) => (
            <li key={dean.name}>
              <button
                onClick={() => setSelectedDean(dean)}
                className={`w-full text-left px-4 py-2 rounded-md transition ${
                  selectedDean.name === dean.name
                    ? "bg-white text-[#002147] font-semibold"
                    : "hover:bg-white/20"
                }`}
              >
                {dean.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Content */}
      <main className="flex-1 p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDean.name}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* Header Section */}
            <div className="flex gap-8 mb-6">
              <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border-4 border-[#002147]">
                <img
                  src={selectedDean.img}
                  alt={selectedDean.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#002147]">
                  {selectedDean.name}
                </h1>
                <h2 className="text-lg text-gray-600">{selectedDean.designation}</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">{selectedDean.bio}</p>
                <div className="mt-6 space-y-1 text-sm text-gray-600">
                  <p><strong>Email:</strong> {selectedDean.email}</p>
                  <p><strong>Phone:</strong> {selectedDean.phone}</p>
                </div>
              </div>
            </div>

            {/* Accordion Section */}
            <div className="rounded-md overflow-hidden shadow border">
              <AccordionItem title="Subjects Taught" content={selectedDean.details.subjects} />
              <AccordionItem title="Teaching Experience" content={selectedDean.details.teaching} />
              <AccordionItem title="Ph.D. Supervised/Ongoing" content={selectedDean.details.phd} />
              <AccordionItem title="Sponsored Research Projects" content={selectedDean.details.research} />
              <AccordionItem title="Major Consultancy Projects" content={selectedDean.details.consultancy} />
              <AccordionItem title="Publications" content={selectedDean.details.publications} />
              <AccordionItem title="Patents" content={selectedDean.details.patents} />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
