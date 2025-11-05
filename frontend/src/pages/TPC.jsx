import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function TPC() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "home" },
    { name: "Placement Team", path: "placement-team" },
    { name: "Placement Policy", path: "placement-policy" },
  ];

  return (
    <div className="flex min-h-[80vh] bg-gray-50">
      {/* Sidebar for large screens */}
      <aside className="hidden md:block w-64 bg-[#002147] text-white p-6 space-y-6 shadow-xl">
        <h2 className="text-xl font-bold tracking-wide mb-4">Training & Placement Cell</h2>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/tpc/${item.path}`}
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
              Training & Placement Cell
            </h2>
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={`/tpc/${item.path}`}
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
        {/* Sub-routes */}
        <Outlet />
      </main>
    </div>
  );
}
