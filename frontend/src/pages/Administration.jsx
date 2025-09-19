import { useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Administration() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Director", path: "director" },
    { name: "Chairperson", path: "chairperson" },
    { name: "Finance Committee", path: "finance" },
    { name: "Deans", path: "deans" },
    { name: "Registrar", path: "registrar" },
    { name: "Faculty", path: "faculty" },
  ];

  return (
    <div className="flex min-h-[80vh] bg-gray-50">
      {/* Sidebar for large screens */}
      <aside className="hidden md:block w-64 bg-[#002147] text-white p-6 space-y-6 shadow-xl">
        <h2 className="text-xl font-bold tracking-wide mb-4">Administration</h2>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/administration/${item.path}`}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-white text-[#002147] font-semibold shadow-md"
                    : "hover:bg-white/20"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-20 left-4 z-50">
        <button
          className="text-2xl text-[#002147] bg-white shadow-md p-2 rounded-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <aside className="fixed top-14 left-0 h-full w-64 bg-[#002147] text-white shadow-xl z-40 md:hidden overflow-y-auto">
          <div className="pt-16 px-6 space-y-6">
            <h2 className="text-xl font-bold tracking-wide mb-4">
              Administration
            </h2>
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={`/administration/${item.path}`}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-white text-[#002147] font-semibold shadow-md"
                        : "hover:bg-white/20"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Default hierarchy display with animation */}
        {location.pathname === "/administration" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#002147] text-center mb-10">
              MANIT Administration Hierarchy
            </h1>

            <div className="flex flex-col items-center">
              {/* Director */}
              <div className="bg-[#002147] text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold text-center">
                Director: Prof. Karunesh Kumar Shukla
              </div>

              {/* Chairperson */}
              <div className="relative mt-8 flex flex-col items-center">
                <div className="w-1 h-8 bg-gray-400"></div>
                <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300 text-[#002147] font-medium text-center">
                  Chairperson: Prof. (Retd.) Arvind A. Natu
                </div>
              </div>

              {/* Others */}
              <div className="relative mt-8 flex flex-col items-center">
                <div className="w-1 h-8 bg-gray-400"></div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                  {/* Finance */}
                  <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300 text-[#002147]">
                    <h2 className="font-semibold">Finance Committee</h2>
                    <p className="text-sm mt-2 text-gray-600">
                      Prof. Shukla (Chair), Ms. Saumya Gupta (IAS), Shri Sanjog
                      Kapoor, Shri Raghuraj Rajendran (IAS), Prof. Shailendra
                      Jain, Mr. Binod Doley
                    </p>
                  </div>

                  {/* Deans */}
                  <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300 text-[#002147]">
                    <h2 className="font-semibold">Deans</h2>
                    <p className="text-sm mt-2 text-gray-600">
                      Dr. K. K. Dhote (P&amp;D), Dr. Nilay Khare (R&amp;C), Dr.
                      S. Jain (SW), Dr. M. M. Malik (Academics), Dr. Alka Bharat
                      (Faculty Welfare), Dr. S. P. S. Rajput (ID &amp; IR)
                    </p>
                  </div>

                  {/* Registrar */}
                  <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300 text-[#002147]">
                    <h2 className="font-semibold">Registrar</h2>
                    <p className="text-sm mt-2 text-gray-600">
                      Mr. Gaurav Dwivedi
                    </p>
                  </div>

                  {/* Board of Governors */}
                  <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300 text-[#002147]">
                    <h2 className="font-semibold">Board of Governors</h2>
                    <p className="text-sm mt-2 text-gray-600">
                      Eminent academicians, industry experts &amp; govt.
                      representatives guiding MANIT.
                    </p>
                  </div>

                  {/* Faculty */}
                  <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300 text-[#002147]">
                    <h2 className="font-semibold">Faculty</h2>
                    <p className="text-sm mt-2 text-gray-600">
                      Highly qualified faculty across departments driving
                      teaching &amp; research.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sub-routes */}
        <Outlet />
      </main>
    </div>
  );
}
