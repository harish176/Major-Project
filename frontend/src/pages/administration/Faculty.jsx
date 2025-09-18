import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


const Faculty = () => {
  // Data structure
  const data = {
    "Architecture and Planning": {
      branches: {
        "General": [
          {
            name: "Dr. A. Sharma",
            designation: "Professor",
            email: "asharma@manit.ac.in",
            phone: "0755-4051001",
            bio: "Expert in urban design, sustainable architecture, and smart city planning."
          }
        ]
      }
    },
    Engineering: {
      branches: {
        CSE: [
          {
            name: "Dr. R. Verma",
            designation: "Professor",
            email: "rverma@manit.ac.in",
            phone: "0755-4051002",
            bio: "Specializes in AI, Machine Learning, and Data Science."
          }
        ],
        ECE: [
          {
            name: "Dr. P. Gupta",
            designation: "Associate Professor",
            email: "pgupta@manit.ac.in",
            phone: "0755-4051003",
            bio: "Research areas include VLSI Design, Signal Processing, and Wireless Networks."
          }
        ],
        Civil: [
          {
            name: "Dr. K. Sharma",
            designation: "Professor",
            email: "ksharma@manit.ac.in",
            phone: "0755-4051004",
            bio: "Expert in Structural Engineering, Hydraulics, and Transportation."
          }
        ],
        EEE: [
          {
            name: "Dr. N. Singh",
            designation: "Assistant Professor",
            email: "nsingh@manit.ac.in",
            phone: "0755-4051005",
            bio: "Specializes in Power Systems, Smart Grids, and Renewable Energy."
          }
        ],
        MME: [
          {
            name: "Dr. A. Khan",
            designation: "Professor",
            email: "akhan@manit.ac.in",
            phone: "0755-4051006",
            bio: "Expert in Metallurgy, Nanomaterials, and Material Testing."
          }
        ],
        Mech: [
          {
            name: "Dr. S. Gupta",
            designation: "Professor",
            email: "sgupta@manit.ac.in",
            phone: "0755-4051007",
            bio: "Research includes Thermal Engineering, Robotics, and Manufacturing."
          }
        ],
        BSE: [
          {
            name: "Dr. V. Mehta",
            designation: "Assistant Professor",
            email: "vmehta@manit.ac.in",
            phone: "0755-4051008",
            bio: "Specializes in Biomedical Signal Processing and Computational Biology."
          }
        ]
      }
    },
    Science: {
      branches: {
        Mathematics: [
          {
            name: "Dr. K. Patel",
            designation: "Professor",
            email: "kpatel@manit.ac.in",
            phone: "0755-4051101",
            bio: "Research includes Applied Mathematics, Numerical Analysis, and Statistics."
          }
        ],
        Physics: [
          {
            name: "Dr. S. Rao",
            designation: "Associate Professor",
            email: "srao@manit.ac.in",
            phone: "0755-4051102",
            bio: "Specializes in Condensed Matter Physics and Photonics."
          }
        ],
        Chemistry: [
          {
            name: "Dr. R. Choudhary",
            designation: "Assistant Professor",
            email: "rchoudhary@manit.ac.in",
            phone: "0755-4051103",
            bio: "Expert in Organic Chemistry and Environmental Chemistry."
          }
        ]
      }
    },
    Humanities: {
      branches: {
        "General": [
          {
            name: "Dr. A. Sinha",
            designation: "Professor",
            email: "asinha@manit.ac.in",
            phone: "0755-4051201",
            bio: "Specializes in English Literature, Communication Skills, and Linguistics."
          }
        ]
      }
    },
    "Management Studies": {
      branches: {
        "General": [
          {
            name: "Dr. M. Yadav",
            designation: "Professor",
            email: "myadav@manit.ac.in",
            phone: "0755-4051301",
            bio: "Expert in Marketing, Organizational Behavior, and Business Analytics."
          }
        ]
      }
    }
  };

  const departments = Object.keys(data);

  // State
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Initialize state safely
  useEffect(() => {
    if (departments.length > 0) {
      const firstDept = departments[0];
      const firstBranch = Object.keys(data[firstDept].branches)[0];
      const firstFaculty = data[firstDept].branches[firstBranch][0];
      setSelectedDept(firstDept);
      setSelectedBranch(firstBranch);
      setSelectedFaculty(firstFaculty);
    }
  }, []);

  if (!selectedDept || !selectedBranch || !selectedFaculty) {
    return <div className="p-10 text-gray-600">Loading faculty data...</div>;
  }

  return (
    <div className="p-1">
      {/* Department Tabs */}
      <div className="flex space-x-6 border-b-2 border-gray-200 pb-2 mb-6 overflow-x-auto">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => {
              const firstBranch = Object.keys(data[dept].branches)[0];
              const firstFaculty = data[dept].branches[firstBranch][0];
              setSelectedDept(dept);
              setSelectedBranch(firstBranch);
              setSelectedFaculty(firstFaculty);
            }}
            className={`px-4 py-2 rounded-t-lg font-semibold ${
              selectedDept === dept
                ? "bg-[#002147] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Branch Tabs */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {Object.keys(data[selectedDept].branches).map((branch) => (
          <button
            key={branch}
            onClick={() => {
              const firstFaculty = data[selectedDept].branches[branch][0];
              setSelectedBranch(branch);
              setSelectedFaculty(firstFaculty);
            }}
            className={`px-4 py-2 rounded-full font-medium ${
              selectedBranch === branch
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Faculty Names */}
        <div className="w-1/3 bg-gray-50 rounded-xl shadow-md p-4 space-y-3">
          {data[selectedDept].branches[selectedBranch].map((faculty) => (
            <button
              key={faculty.name}
              onClick={() => setSelectedFaculty(faculty)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                selectedFaculty.name === faculty.name
                  ? "bg-blue-100 text-blue-900 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {faculty.name}
            </button>
          ))}
        </div>

        {/* Faculty Info */}
        <motion.div
          key={selectedFaculty.name}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 bg-white shadow-lg rounded-xl p-6 border"
        >
          <h2 className="text-2xl font-bold text-[#002147]">
            {selectedFaculty.name}
          </h2>
          <p className="text-gray-600">{selectedFaculty.designation}</p>
          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> {selectedFaculty.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedFaculty.phone}
            </p>
            <p>{selectedFaculty.bio}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Faculty;
