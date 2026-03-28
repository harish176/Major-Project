import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserTie,
  FaBook,
  FaBuilding,
  FaBriefcase,
  FaUsers,
  FaHome,
  FaUser,
  FaFlask,
  FaUniversity
} from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome />, dropdown: true, dropdownType: "home" },
    { to: "/administration", label: "Administration", icon: <FaUserTie /> },
    { to: "/academics", label: "Academics", icon: <FaBook />, dropdown: true, dropdownType: "academics" },
    { to: "/academics/departments", label: "Departments", icon: <FaUniversity /> },
    { to: "/facilities", label: "Facilities", icon: <FaBuilding /> },
    { to: "/research", label: "Research", icon: <FaFlask />, dropdown: true, dropdownType: "research" },
    { to: "/tpc", label: "TPC", icon: <FaBriefcase /> },
    { to: "/clubs", label: "Clubs", icon: <FaUsers /> },
  ];

  const academicDropdown = [
    { to: "/academics/dual-degree", label: "Dual Degree" },
    { to: "/academics/ug", label: "UG Program" },
    { to: "/academics/pg", label: "PG Program" },
    { to: "/academics/phd", label: "PhD Program" },
    { to: "/academics/scholarship", label: "Scholarship" }
  ];

  const homeDropdown = [
    { to: "/history", label: "History" },
    { to: "/about-us", label: "About Us" },
    { to: "/vision-goals", label: "Vision & Goals" }
  ];

  const researchDropdown = [
    { to: "/research/area", label: "Area of Research" },
    { to: "/research/projects", label: "Projects" },
    { to: "/research/icsc", label: "Industrial Consultancy Service Center (ICSC)" },
    { to: "/research/grants", label: "Research Support/Grants" },
    { to: "/research/mous", label: "MOUs" },
    { to: "/research/patents", label: "Patents" },
    { to: "/research/publication", label: "Publication" },
    { to: "/research/collaboration", label: "International Collaboration" }
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-[100]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center justify-start flex-shrink-0">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-10 mr-3" />
          <span className="font-bold text-xl text-[#002147]">MANIT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-2 text-gray-700 font-medium relative justify-center flex-1 max-w-4xl">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group/dropdown">
                {link.to ? (
                  <div className="flex items-center gap-1.5 px-2 py-1 cursor-pointer transition-colors duration-300 text-gray-700 hover:text-blue-600 group-hover/dropdown:text-blue-600">
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center gap-1.5 ${
                          isActive ? "text-blue-600" : "text-inherit"
                        }`
                      }
                    >
                      <span className="text-sm">{link.icon}</span>
                      <span>{link.label}</span>
                    </NavLink>
                    <FaChevronDown className="text-xs mt-[1px] ml-0.5 transition-transform group-hover/dropdown:rotate-180" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2 py-1 cursor-pointer text-gray-700 hover:text-blue-600 group-hover/dropdown:text-blue-600 transition-colors duration-300">
                    <span className="text-sm">{link.icon}</span>
                    <span>{link.label}</span>
                    <FaChevronDown className="text-xs mt-[1px] transition-transform group-hover/dropdown:rotate-180" />
                  </div>
                )}

                {/* Dropdown Menu with hover bridge */}
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 z-50">
                  <div className="w-64 bg-white shadow-xl rounded-lg py-2 border border-gray-200">
                    {(link.dropdownType === "academics" ? academicDropdown : 
                      link.dropdownType === "research" ? researchDropdown : 
                      homeDropdown).map((item) => (
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
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 px-2 py-1 transition-colors duration-300
                   ${
                     isActive
                       ? "text-blue-600"
                       : "text-gray-700 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                   }`
                }
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            )
          )}
        </div>

        {/* Right Side - Login Button & Mobile Menu */}
        <div className="flex items-center justify-end flex-shrink-0 ml-4 gap-2">
          {/* Login Button (Desktop) */}
          <NavLink 
            to="/login"
            className="hidden lg:flex items-center gap-1.5 bg-[#002147] text-white px-2.5 py-1.5 rounded-lg hover:bg-[#003366] transition-colors duration-300 font-medium cursor-pointer text-sm"
          >
            <FaUser className="text-sm" />
            Login/Signup
          </NavLink>

          {/* Login Button (Tablet) - Shows on medium screens only */}
          <NavLink 
            to="/login"
            className="hidden md:flex lg:hidden items-center gap-1 bg-[#002147] text-white px-2 py-2 rounded-lg hover:bg-[#003366] transition-colors duration-300 cursor-pointer text-xs"
          >
            <FaUser className="text-xs" />
            Login
          </NavLink>

          {/* Hamburger Button (Mobile & Tablet) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl text-gray-700"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg z-[100] max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col items-start gap-4 px-6 py-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="w-full">
                  {link.to ? (
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg transition-colors duration-300
                         ${isActive ? "text-blue-600" : "text-gray-700"}`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </NavLink>
                  ) : (
                    <div className="flex items-center gap-2 text-lg text-gray-700">
                      {link.icon}
                      {link.label}
                    </div>
                  )}
                  <div className="ml-8 mt-2 flex flex-col gap-2">
                    {(link.dropdownType === "academics" ? academicDropdown : 
                      link.dropdownType === "research" ? researchDropdown : 
                      homeDropdown).map((item) => (
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
            
            {/* Mobile Login Button */}
            <NavLink 
              to="/login"
              className="flex items-center gap-2 bg-[#002147] text-white px-4 py-2 rounded-lg hover:bg-[#003366] transition-colors duration-300 font-medium mt-2 w-full justify-center cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <FaUser className="text-sm" />
              Login/Signup
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
