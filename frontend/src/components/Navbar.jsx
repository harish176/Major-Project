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
import { FaChevronDown } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/administration", label: "Administration", icon: <FaUserTie /> },
    { label: "Academics", icon: <FaBook />, dropdown: true }, // removed "to"
    { to: "/research", label: "Research", icon: <FaFlask /> },
    { to: "/facilities", label: "Facilities", icon: <FaBuilding /> },
    { to: "/tpc", label: "TPC", icon: <FaBriefcase /> },
    { to: "/clubs", label: "Clubs", icon: <FaUsers /> },
  ];

  const academicDropdown = [
    { to: "/academics/dual-degree", label: "Dual Degree" },
    { to: "/academics/ug", label: "UG Program" },
    { to: "/academics/pg", label: "PG Program" },
    { to: "/academics/phd", label: "PhD Program" },
    { to: "/academics/departments", label: "Departments" },
    { to: "/academics/scholarship", label: "Scholarship" }
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-10 mr-3" />
          <span className="font-bold text-xl text-[#002147]">MANIT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium relative">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group">
                <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300">
                  {link.icon}
                  {link.label}
                  <FaChevronDown className="text-xs mt-[2px]" />
                </div>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {academicDropdown.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition-colors 
                        ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-2 transition-colors duration-300 
                   ${
                     isActive
                       ? "text-blue-600"
                       : "text-gray-700 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                   }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            )
          )}
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
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="w-full">
                  <div className="flex items-center gap-2 text-lg text-gray-700">
                    {link.icon}
                    {link.label}
                  </div>
                  <div className="ml-8 mt-2 flex flex-col gap-2">
                    {academicDropdown.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className="text-gray-600 text-base hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 text-lg transition-colors duration-300
                     ${isActive ? "text-blue-600" : "text-gray-700"}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
