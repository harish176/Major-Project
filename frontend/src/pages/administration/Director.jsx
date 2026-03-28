import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Award, BookOpen, Users, Building, Star } from "lucide-react";
import { facultyAPI } from "../../utils/api";

const placeholder = "https://placehold.co/200x200?text=Director";

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-[#002147] mb-4">{title}</h3>
    {children}
  </div>
);

const PillList = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <span key={item} className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm">
        {item}
      </span>
    ))}
  </div>
);

const Director = () => {
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadDirector = async () => {
      try {
        const { data } = await facultyAPI.getAdministration({ category: "director", limit: 1 });
        if (!mounted) return;
        setDirector(data?.data?.[0] || null);
      } catch (err) {
        setError("Unable to load director details right now.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadDirector();
    return () => {
      mounted = false;
    };
  }, []);

  const expertise = useMemo(() => director?.areasOfExpertise || director?.researchInterests || [], [director]);
  const subjects = useMemo(() => director?.subjectsTaught || [], [director]);
  const committees = useMemo(() => director?.committees || [], [director]);
  const adminRoles = useMemo(() => director?.administrativeRoles || [], [director]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#002147] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading director profile...</p>
        </div>
      </div>
    );
  }

  if (!director || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md mx-auto">
          <p className="text-gray-700 font-medium mb-3">{error || "Director profile is not available yet."}</p>
          <p className="text-sm text-gray-500">Please check back after the administration updates their details.</p>
        </div>
      </div>
    );
  }

  const {
    name,
    designation,
    department,
    bio,
    email,
    contactNumber,
    imageUrl,
    altText,
    researchInterests
  } = director;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="relative">
              <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <img src={imageUrl || placeholder} alt={altText || name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-3">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="text-center lg:text-left flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{name}</h1>
              <p className="text-2xl text-blue-200 mb-4">{designation || "Director"}</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:flex-wrap text-sm">
                {email && (
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <Mail className="w-4 h-4" />
                    {email}
                  </span>
                )}
                {contactNumber && (
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <Phone className="w-4 h-4" />
                    {contactNumber}
                  </span>
                )}
                {department && (
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <Building className="w-4 h-4" />
                    {department}
                  </span>
                )}
              </div>
              <p className="mt-6 text-blue-100 leading-relaxed text-lg">
                {bio || "Director's profile will appear here once provided by the administration."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <SectionCard title="Research & Expertise">
          {expertise.length ? (
            <PillList items={expertise} />
          ) : (
            <p className="text-gray-500 text-sm">Research interests will appear once shared by the director's office.</p>
          )}
        </SectionCard>

        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard title="Subjects Taught">
            {subjects.length ? <PillList items={subjects} /> : <p className="text-gray-500 text-sm">Not provided.</p>}
          </SectionCard>

          <SectionCard title="Administrative Roles">
            {adminRoles.length ? (
              <div className="space-y-3">
                {adminRoles.map((role, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-[#002147] mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">{role.role}</p>
                      {role.department && <p className="text-sm text-gray-600">{role.department}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Administrative roles will appear here once available.</p>
            )}
          </SectionCard>
        </div>

        <SectionCard title="Committees & Memberships">
          {committees.length ? (
            <div className="grid md:grid-cols-2 gap-3">
              {committees.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 border border-gray-100 rounded-lg p-3 bg-gray-50">
                  <Award className="w-4 h-4 text-[#002147] mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name || item.type || "Committee"}</p>
                    <p className="text-sm text-gray-600">{item.role || "Member"}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Committee memberships will be listed after they are updated.</p>
          )}
        </SectionCard>

        <SectionCard title="Vision & Message">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              {researchInterests?.length
                ? `Focused on ${researchInterests.join(', ')}`
                : "The director's message will be shared here once available."}
            </p>
          </div>
        </SectionCard>
      </div>
    </motion.div>
  );
};

export default Director;
