import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, FileText, Target, Mail, Phone, Building, Star } from "lucide-react";
import { facultyAPI } from "../../utils/api";

const placeholder = "https://placehold.co/200x200?text=Member";

const FinanceCommittee = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadMembers = async () => {
      try {
        const { data } = await facultyAPI.getAdministration({ category: "finance-committee" });
        if (!mounted) return;
        setMembers(data?.data || []);
      } catch (err) {
        setError("Unable to load finance committee details right now.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadMembers();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#002147] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading finance committee...</p>
        </div>
      </div>
    );
  }

  if (!members.length || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md mx-auto">
          <p className="text-gray-700 font-medium mb-3">{error || "Finance committee data is not available yet."}</p>
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
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Finance Committee</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            This page pulls live committee information directly from the backend so updates appear automatically.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Meets quarterly</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">{members.length} members</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-start gap-3 mb-4">
            <Target className="w-5 h-5 text-[#002147]" />
            <div>
              <h2 className="text-2xl font-bold text-[#002147]">Mandate</h2>
              <p className="text-gray-700 mt-2">
                The Finance Committee oversees budgeting, compliance, and strategic allocation of resources. Any change in the backend roster is reflected here instantly.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {["Budget planning", "Compliance & audits", "Resource allocation"].map((item) => (
              <div key={item} className="border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member._id || member.email || member.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white p-4 flex items-center gap-3">
                <Star className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-80">{member.category || "Member"}</p>
                  <p className="font-semibold">{member.designation || member.branch || "Finance Committee"}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={member.imageUrl || placeholder}
                    alt={member.altText || member.name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white -mt-12"
                  />
                </div>

                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-[#002147] mb-1">{member.name}</h4>
                  <p className="text-sm text-gray-700 mb-1">{member.role || member.designation || "Member"}</p>
                  {member.department && <p className="text-xs text-gray-500">{member.department}</p>}
                </div>

                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {(member.areasOfExpertise || member.researchInterests || []).slice(0, 4).map((item) => (
                    <span key={item} className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded-full">{item}</span>
                  ))}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {member.bio || "Details will be updated by the administration."}
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#002147]" />
                      <span>{member.email}</span>
                    </div>
                  )}
                  {member.contactNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#002147]" />
                      <span>{member.contactNumber}</span>
                    </div>
                  )}
                  {member.branch && (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#002147]" />
                      <span>{member.branch}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceCommittee;
