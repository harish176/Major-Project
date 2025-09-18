import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


// --- Mock Data for Research Projects ---
const researchProjects = [
  {
    id: 1,
    title: "Thermo-electrostrictive unequal-biaxial deformation instability of electro-active polymeric composites",
    category: "Non Linear Mechanics",
    authors: "Mr.Sankalp, Dr. Deepak Kumar",
    publication: "Physical Review, 2023",
    description: "That topic deals with how electro-active polymer composites deform when exposed to electric fields. Specifically, it studies unequal biaxial strains caused by thermo-electrostrictive coupling, which can lead to mechanical instability and failure in advanced soft actuators or sensors.",
    imageUrl: "/research1.png"
  },
  {
    id: 2,
    title: "GARL-Net: Graph Based Adaptive Learning Network",
    category: "Machine Learning",
    authors: "Vivek Patel, Vijayashri Chaurasia, Mahadev R",
    publication: "Science, 2012",
    description: "This paper introduces a revolutionary gene-editing technology derived from bacterial immune systems. We demonstrate its potential for precise genomic modifications in various organisms.",
    imageUrl: "/research2.png"
  },
  {
    id: 3,
    title: "Deep Learning for Image Recognition",
    category: "Artificial Intelligence",
    authors: "A. Krizhevsky, I. Sutskever, G. Hinton",
    publication: "NIPS, 2012",
    description: "We present a large, deep convolutional neural network that achieved a top-5 test error rate of 15.3% in the ImageNet LSVRC-2012 contest. This result dramatically advanced the state of the art in image recognition.",
    imageUrl: "/research3.png"
  },
];

// --- ProjectSection Component ---
// Displays a single research project in an alternating layout.
const ProjectSection = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="relative w-full py-2">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 lg:gap-6 items-center">
        {/* Text Content */}
        <motion.div
          className={`text-gray-800 ${isEven ? 'md:order-1' : 'md:order-2'}`}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <span className="inline-block bg-sky-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-2 uppercase tracking-wide">
            {project.category}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#002147] mb-1">
            {project.title}
          </h2>
          <p className="text-gray-600 font-medium mb-2 text-xs sm:text-sm">
            {project.authors} — <em className="italic">{project.publication}</em>
          </p>
          <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
            {project.description}
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className={`flex justify-center ${isEven ? 'md:order-2' : 'md:order-1'}`}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
        <Link to="/research" className="block hover:opacity-90 transition-opacity duration-300">
  <img
    src={project.imageUrl}
    alt={`Visual for ${project.title}`}
    className="rounded-xl shadow-md w-2/3 sm:w-3/4 object-cover"
  />
</Link>

        </motion.div>
      </div>
    </section>
  );
};



// --- Main App Component ---
export default function App() {
  return (
    <>
      {/* Custom Keyframes for Blob Animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
      `}</style>
      
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
        <div className="relative isolate">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10"></div>
          <div className="absolute top-[-8rem] left-[-8rem] w-[25rem] h-[25rem] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 blur-3xl animate-blob -z-10"></div>
          <div className="absolute bottom-[-10rem] right-[-8rem] w-[28rem] h-[28rem] bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000 -z-10"></div>
          <div className="absolute top-[40%] left-[60%] w-[18rem] h-[18rem] bg-gradient-to-r from-green-300 to-teal-400 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000 -z-10"></div>
          <div className="absolute top-20 left-10 w-24 h-24 border-4 border-blue-300 rounded-xl rotate-12 opacity-50 -z-10"></div>
          <div className="absolute bottom-32 right-20 w-16 h-16 border-4 border-pink-300 rounded-full opacity-50 -z-10"></div>


          {/* Header */}
          <header className="text-center py-16 px-4">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#002147]"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Groundbreaking Research
            </motion.h1>
            <motion.p
              className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A curated collection of pivotal studies and discoveries that have shaped our world.
            </motion.p>
          </header>

          {/* Projects Sections */}
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex flex-col gap-8 md:gap-12">
            {researchProjects.map((project, index) => (
              <ProjectSection key={project.id} project={project} index={index} />
            ))}
          </main>
        </div>
      </div>
    </>
  );
}




