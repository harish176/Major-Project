import React from "react";
import Carousel from "../components/Carousel.jsx";
import { motion } from "framer-motion";
import LifeAtManit from "../components/LifeatManit.jsx";
import Location from "../components/Location.jsx";
import Placements from "../components/Placements.jsx";

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Carousel Section */}
      <Carousel />

      {/* Welcome Section */}
<section className="relative w-full bg-gray-50 py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
  {/* Background Gradient Layer */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10"></div>

  {/* Abstract Blobs */}
  <div className="absolute top-[-8rem] left-[-8rem] w-[25rem] h-[25rem] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 blur-3xl animate-blob"></div>
  <div className="absolute bottom-[-10rem] right-[-8rem] w-[28rem] h-[28rem] bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
  <div className="absolute top-[40%] left-[60%] w-[18rem] h-[18rem] bg-gradient-to-r from-green-300 to-teal-400 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"></div>

  {/* Decorative Geometric Shapes */}
  <div className="absolute top-20 left-10 w-24 h-24 border-4 border-blue-300 rounded-xl rotate-12 opacity-50"></div>
  <div className="absolute bottom-32 right-20 w-16 h-16 border-4 border-pink-300 rounded-full opacity-50"></div>

  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
    {/* Left Content */}
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4">
        Welcome to <br />
        <motion.span
          className="text-blue-600 inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Maulana Azad National Institute of Technology (MANIT)
        </motion.span>
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Established in 1960, MANIT Bhopal is one of the leading technical institutions of India. 
        It is recognized for academic excellence, cutting-edge research, and fostering innovation. 
        The campus provides world-class infrastructure, vibrant student life, and a culture of 
        knowledge, discovery, and progress.
      </p>
    </motion.div>

    {/* Right Image */}
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <img
        src="manitporch.jpeg"
        alt="MANIT Campus"
        className="rounded-2xl shadow-xl w-full md:w-[90%] object-cover"
      />
    </motion.div>
  </div>
</section>
      <LifeAtManit />
      <Placements />
      <Location />
    </div>
  );
};

export default Home;
