import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Mail, Phone, Building2 } from "lucide-react";
import { facultyAPI } from "../../utils/api";

const placeholder = "https://placehold.co/160x160?text=Faculty";

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadFaculty = async () => {
      try {
        const { data } = await facultyAPI.getAdministration({ category: "faculty" });
        if (!mounted) return;
        setFaculty(data?.data || []);
      } catch (err) {
        setError("Unable to load faculty directory right now.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadFaculty();
    return () => {
      mounted = false;
    };
  }, []);

  const grouped = useMemo(() => {
    const result = {};
    faculty.forEach((item) => {
      const dept = item.department || "Other";
      const branch = item.branch || dept;
      if (!result[dept]) result[dept] = {};
      if (!result[dept][branch]) result[dept][branch] = [];
      result[dept][branch].push(item);
    });
    return result;
  }, [faculty]);

  useEffect(() => {
    const departments = Object.keys(grouped);
    if (departments.length && !selectedDept) {
      const firstDept = departments[0];
      const firstBranch = Object.keys(grouped[firstDept])[0];
      setSelectedDept(firstDept);
      setSelectedBranch(firstBranch);
    }
  }, [grouped, selectedDept]);

  const filteredFaculty = useMemo(() => {
    if (!selectedDept || !selectedBranch) return [];
    const list = grouped[selectedDept]?.[selectedBranch] || [];
    if (!searchTerm) return list;
    const needle = searchTerm.toLowerCase();
    return list.filter((f) =>
      (f.name || "").toLowerCase().includes(needle) ||
      (f.designation || "").toLowerCase().includes(needle) ||
      (f.areasOfExpertise || []).some((s) => s.toLowerCase().includes(needle)) ||
      (f.researchInterests || []).some((s) => s.toLowerCase().includes(needle))
    );
  }, [grouped, selectedDept, selectedBranch, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#002147] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading faculty data...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedDept) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md mx-auto">
          <p className="text-gray-700 font-medium mb-3">{error || "Faculty data is not available yet."}</p>
          <p className="text-sm text-gray-500">Please check back after the administration updates their details.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Faculty Directory</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            This directory is powered by live data from the backend. Any updates made there appear here instantly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
        >
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, designation, or expertise"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002147] focus:border-transparent bg-gray-50"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {Object.keys(grouped).map((dept) => (
              <button
                key={dept}
                onClick={() => {
                  setSelectedDept(dept);
                  const firstBranch = Object.keys(grouped[dept])[0];
                  setSelectedBranch(firstBranch);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors ${
                  selectedDept === dept ? "bg-[#002147] text-white border-[#002147]" : "border-gray-200 bg-white hover:border-[#002147]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6"
          >
            <h2 className="text-xl font-bold text-[#002147] mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Branches
            </h2>
            <div className="space-y-2">
              {Object.keys(grouped[selectedDept] || {}).map((branch) => (
                <button
                  key={branch}
                  onClick={() => setSelectedBranch(branch)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedBranch === branch ? "bg-[#002147] text-white border-[#002147]" : "border-gray-200 hover:border-[#002147]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {branch}
                  </span>
                  <span className="text-xs text-gray-500 block mt-1">
                    {(grouped[selectedDept]?.[branch] || []).length} faculty
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            {filteredFaculty.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-600">
                No faculty found for this branch.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFaculty.map((facultyMember) => (
                  <div
                    key={facultyMember._id || facultyMember.email || facultyMember.name}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div className="h-2 bg-gradient-to-r from-[#002147] to-[#003366]"></div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#002147]">
                          <img
                            src={facultyMember.imageUrl || facultyMember.photo?.url || placeholder}
                            alt={facultyMember.altText || facultyMember.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#002147]">{facultyMember.name}</h4>
                          <p className="text-sm text-gray-600">{facultyMember.designation}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        {(facultyMember.areasOfExpertise || facultyMember.researchInterests || []).slice(0, 3).map((spec) => (
                          <span key={spec} className="px-2 py-1 bg-blue-50 text-blue-800 rounded-full">{spec}</span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-3">
                        {facultyMember.bio || "Profile will be updated soon."}
                      </p>

                      <div className="text-sm text-gray-600 space-y-1">
                        {facultyMember.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{facultyMember.email}</span>
                          </div>
                        )}
                        {facultyMember.contactNumber && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{facultyMember.contactNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Faculty;
