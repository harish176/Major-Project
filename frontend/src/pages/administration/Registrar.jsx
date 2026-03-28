import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Building2 } from "lucide-react";
import { facultyAPI } from "../../utils/api";

const fallbackImage = "https://placehold.co/200x200?text=Registrar";

const Registrar = () => {
  const [registrar, setRegistrar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchRegistrar = async () => {
      try {
        const { data } = await facultyAPI.getAdministration({ category: "registrar", limit: 1 });
        if (!mounted) return;
        setRegistrar(data?.data?.[0] || null);
      } catch (err) {
        setError("Unable to load registrar details right now.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRegistrar();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#002147] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading registrar profile...</p>
        </div>
      </div>
    );
  }

  if (!registrar || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md mx-auto">
          <p className="text-gray-700 font-medium mb-3">{error || "Registrar profile is not available yet."}</p>
          <p className="text-sm text-gray-500">Please check back after the administration updates their details.</p>
        </div>
      </div>
    );
  }

  const { name, designation, department, bio, email, contactNumber, imageUrl, altText } = registrar;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-8"
    >
      <h1 className="text-3xl font-extrabold text-[#002147] text-center">Registrar</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={imageUrl || fallbackImage}
          alt={altText || name}
          className="w-48 h-48 rounded-full object-cover shadow-md border-4 border-[#002147]"
        />

        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#002147]">{name}</h2>
          <p className="text-gray-700 font-medium">{designation || "Registrar"}</p>
          {department && (
            <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
              <Building2 className="w-4 h-4" />
              {department}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {email && (
              <span className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm">
                <Mail className="w-4 h-4" />
                {email}
              </span>
            )}
            {contactNumber && (
              <span className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-800 rounded-lg text-sm">
                <Phone className="w-4 h-4" />
                {contactNumber}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-gray-700 space-y-4 leading-relaxed">
        <p>{bio || "Registrar biography will appear here once provided by the administration."}</p>
      </div>
    </motion.div>
  );
};

export default Registrar;
