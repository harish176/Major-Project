import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserTie,
  FaBook,
  FaFlask,
  FaBuilding,
  FaBriefcase,
  FaUsers,
  FaHome,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/administration", label: "Administration", icon: <FaUserTie /> },
    { to: "/academics", label: "Academics", icon: <FaBook /> },
    { to: "/research", label: "Research", icon: <FaFlask /> },
    { to: "/facilities", label: "Facilities", icon: <FaBuilding /> },
    { to: "/tpc", label: "TPC", icon: <FaBriefcase /> },
    { to: "/clubs", label: "Clubs", icon: <FaUsers /> },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo.jpg" // replace with your logo path
            alt="Logo"
            className="h-10 w-10 mr-3"
          />
          <span className="font-bold text-xl text-[#002147]">MANIT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `relative flex items-center gap-2 transition-colors duration-300 
                 ${
                   isActive
                     ? "text-blue-600" // active: only text & icon blue
                     : "text-gray-700 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                 }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col items-start gap-4 px-6 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-3 text-lg transition-colors duration-300
                   ${
                     isActive
                       ? "text-blue-600"
                       : "text-gray-700 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                   }`
                }
                onClick={() => setIsOpen(false)} // close on click
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
