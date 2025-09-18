import React from "react";
import { motion } from "framer-motion";

const Registrar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-8"
    >
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-[#002147] text-center">
        Registrar
      </h1>

      {/* Profile */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <img
          src="/registrar.png" 
          alt="Prof. Karunesh Kumar Shukla"
          className="w-48 h-48 rounded-full object-cover shadow-md border-4 border-[#002147]"
        />

        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#002147]">
            Mr. Gaurav Dwivedi
          </h2>
          <p className="text-gray-600 font-medium mt-1">Registrar, MANIT Bhopal</p>
        </div>
      </div>

      {/* Bio */}
      <div className="text-gray-700 space-y-4 leading-relaxed">
        <p>
          Mr. Gaurav Dwivedi is currently serving as the Registrar (In-Charge) of MANIT Bhopal. 
  He plays a key role in overseeing the institute’s administrative framework, 
  managing academic processes, faculty services, and student records. 
  With extensive experience in institutional governance, 
  he contributes significantly to ensuring smooth coordination 
  between departments and effective implementation of policies at MANIT.
        </p>
        <p>
          He was a research scholar under QIP at IIT Delhi from 1997 to 2000 and
          obtained his PhD from IIT Delhi in 2001. Prof. Shukla was a visiting
          research fellow at Feng Chia University, Taiwan. His research interest
          includes Computational Mechanics, Composite Structures, Plates and
          Shells, Stability and Dynamics of Structures, Retrofitting of
          Structures, and Nano composites.
        </p>
        <p>
          Prof Shukla has supervised 15 PhDs, authored 80+ research papers, and
          written the textbook “An Introduction to Strength of Materials”. He
          has also rendered consultancy services in Structural Design and
          Material Testing and completed three sponsored research projects.
        </p>
      </div>
    </motion.div>
  );
};

export default Registrar;
