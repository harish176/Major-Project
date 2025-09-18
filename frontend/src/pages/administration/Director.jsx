import React from "react";
import { motion } from "framer-motion";

const Director = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-8"
    >
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-[#002147] text-center">
        Director
      </h1>

      {/* Profile */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <img
          src="/director.jpeg" // <-- put director image in public/images folder
          alt="Prof. Karunesh Kumar Shukla"
          className="w-48 h-48 rounded-full object-cover shadow-md border-4 border-[#002147]"
        />

        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#002147]">
            Prof. Karunesh Kumar Shukla
          </h2>
          <p className="text-gray-600 font-medium mt-1">Director, MANIT Bhopal</p>
        </div>
      </div>

      {/* Bio */}
      <div className="text-gray-700 space-y-4 leading-relaxed">
        <p>
          Prof. Karunesh Kumar Shukla is currently the Director of MANIT Bhopal.
          Prior to this, he served as Director, NIT Jamshedpur for more than 5
          years. He obtained his Bachelor of Engineering Degree in Civil
          Engineering in 1986 from Madan Mohan Malviya Engineering College (now
          MMMUT), Gorakhpur and Masters in Structural Engineering in 1988 from
          Motilal Nehru Regional Engineering College (now MNNIT) Allahabad.
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

export default Director;
