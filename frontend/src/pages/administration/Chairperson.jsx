import React from "react";
import { motion } from "framer-motion";

const Chairperson = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-8"
    >
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-[#002147] text-center">
        Chairperson
      </h1>

      {/* Profile */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <img
          src="/chairperson.png" // <-- Add chairperson image in public/images
          alt="Prof. (Retd.) Arvind A. Natu"
          className="w-48 h-48 rounded-full object-cover shadow-md border-4 border-[#002147]"
        />

        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#002147]">
            Prof. (Retd.) Arvind A. Natu
          </h2>
          <p className="text-gray-600 font-medium mt-1">
            Chairperson, Board of Governors, MANIT Bhopal
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="text-gray-700 space-y-4 leading-relaxed">
        <p>
          Prof. (Retd.) Arvind A. Natu is the current Chairperson of the Board of
          Governors at MANIT Bhopal. With decades of academic and research
          experience, he has significantly contributed to advancing higher
          education and institutional governance in India.
        </p>
        <p>
          He has held senior academic and administrative positions during his
          career, contributing to policy formulation, research guidance, and
          national-level committees. His leadership ensures the institute’s
          smooth functioning and alignment with the vision of technical education
          excellence in India.
        </p>
        <p>
          As Chairperson, Prof. Natu provides strategic direction to the Board of
          Governors, ensuring that MANIT continues to grow as a premier institute
          fostering innovation, research, and skill development.
        </p>
      </div>
    </motion.div>
  );
};

export default Chairperson;
