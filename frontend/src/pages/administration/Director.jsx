import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Mail, Phone, Quote, Star, Users } from "lucide-react";
import { facultyAPI } from "../../utils/api";

const SectionCard = ({ title, children }) => (
  <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-white/70 p-6 md:p-7">
    <h3 className="text-lg font-semibold text-[#002147] mb-4">{title}</h3>
    {children}
  </div>
);

const PillList = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <span key={item} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 rounded-full text-sm border border-blue-100">
        {item}
      </span>
    ))}
  </div>
);

const formatList = (value) => {
  if (!value) return [];

  if (!Array.isArray(value)) {
    return [String(value)].filter(Boolean);
  }

  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (!item || typeof item !== "object") return "";
      return item.name || item.title || item.role || item.designation || item.value || "";
    })
    .filter(Boolean);
};

const getDirectorRecord = (records) => {
  if (!records.length) return null;

  const exactMatch = records.find(
    (person) => String(person.designation || "").trim().toLowerCase() === "director"
  );

  if (exactMatch) return exactMatch;

  return (
    records.find((person) => String(person.designation || "").toLowerCase().includes("director")) ||
    null
  );
};

const InfoBadge = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur px-4 py-3">
    <Icon className="w-5 h-5 text-blue-100 mt-0.5" />
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-blue-100/80">{label}</p>
      <p className="text-sm md:text-base font-medium text-white">{value}</p>
    </div>
  </div>
);

const DetailList = ({ items, emptyText }) => {
  if (!items.length) {
    return <p className="text-gray-500 text-sm">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-3">
          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#002147] flex-shrink-0" />
          <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  );
};

const Director = () => {
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadDirector = async () => {
      try {
        const { data } = await facultyAPI.getAdministration();
        if (!mounted) return;
        setDirector(getDirectorRecord(data?.data || []));
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

  const expertise = formatList(director?.areasOfExpertise);
  const researchInterests = formatList(director?.researchInterests);
  const subjects = formatList(director?.subjectsTaught);
  const committees = director?.committees || [];
  const adminRoles = director?.administrativeRoles || [];
  const publications = director?.publications || [];
  const awards = director?.awards || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,33,71,0.08),transparent_35%),linear-gradient(135deg,#f8fafc_0%,#eef4ff_100%)]">
        <div className="text-center px-4">
          <div className="w-16 h-16 border-4 border-[#002147] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading director profile...</p>
        </div>
      </div>
    );
  }

  if (!director || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,33,71,0.08),transparent_35%),linear-gradient(135deg,#f8fafc_0%,#eef4ff_100%)]">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md mx-auto border border-gray-100">
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
    altText
  } = director;

  const initials =
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("") || "D";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(0,33,71,0.08),transparent_35%),linear-gradient(135deg,#f8fafc_0%,#eef4ff_100%)]"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-[#002147] via-[#002b55] to-[#003366] text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-300 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-300 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
            <div className="relative mx-auto lg:mx-0">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-[2rem] overflow-hidden shadow-2xl border border-white/30 bg-white/10 backdrop-blur">
                {imageUrl ? (
                  <img src={imageUrl} alt={altText || name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/10 text-5xl font-bold tracking-[0.2em]">
                    {initials}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-3 -right-3 rounded-full bg-amber-400 p-3 shadow-lg border-4 border-[#002147]">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left w-full">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-blue-50 mb-5">
                <Quote className="w-4 h-4" />
                Administrative leadership profile
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">{name}</h1>
              <p className="mt-3 text-xl sm:text-2xl text-blue-100 font-medium">{designation || "Director"}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <InfoBadge icon={Building2} label="Department" value={department || "Not specified"} />
                <InfoBadge icon={Mail} label="Email" value={email || "Not shared"} />
                <InfoBadge icon={Phone} label="Contact" value={contactNumber || "Not shared"} />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white text-[#002147] px-4 py-2 text-sm font-semibold shadow-sm">
                  <Users className="w-4 h-4" />
                  Current Director
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-blue-50 border border-white/15">
                  <Star className="w-4 h-4 text-amber-300" />
                  Active leadership record
                </span>
              </div>

              <div className="mt-7 rounded-3xl border border-white/15 bg-white/10 backdrop-blur px-5 py-5 text-left shadow-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-blue-100/75 mb-2">Profile summary</p>
                <p className="text-base sm:text-lg leading-relaxed text-blue-50">
                  {bio || "The director profile will appear here once the administration publishes the details in the backend."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <SectionCard title="Research & Expertise">
            {expertise.length ? <PillList items={expertise} /> : <p className="text-gray-500 text-sm">No expertise has been shared yet.</p>}
          </SectionCard>

          <SectionCard title="Research Interests">
            {researchInterests.length ? <PillList items={researchInterests} /> : <p className="text-gray-500 text-sm">No research interests have been shared yet.</p>}
          </SectionCard>

          <SectionCard title="Teaching Focus">
            {subjects.length ? <PillList items={subjects} /> : <p className="text-gray-500 text-sm">No teaching subjects are listed yet.</p>}
          </SectionCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Administrative Roles">
            <DetailList
              items={adminRoles.map((role) => {
                if (typeof role === "string") return role;
                const title = role.role || role.title || role.name || "Administrative role";
                const departmentLabel = role.department ? ` - ${role.department}` : "";
                return `${title}${departmentLabel}`;
              })}
              emptyText="Administrative roles will appear here once they are updated in the backend."
            />
          </SectionCard>

          <SectionCard title="Committees & Memberships">
            <DetailList
              items={committees.map((item) => {
                if (typeof item === "string") return item;
                const committeeName = item.name || item.type || "Committee";
                const committeeRole = item.role || "Member";
                return `${committeeName} - ${committeeRole}`;
              })}
              emptyText="Committee memberships will appear here once available."
            />
          </SectionCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Achievements">
            <DetailList
              items={awards.map((award) => {
                if (typeof award === "string") return award;
                const awardTitle = award.title || award.name || "Award";
                const year = award.year ? ` (${award.year})` : "";
                return `${awardTitle}${year}`;
              })}
              emptyText="Awards and recognitions will appear here once shared."
            />
          </SectionCard>

          <SectionCard title="Publications">
            <DetailList
              items={publications.map((publication) => {
                if (typeof publication === "string") return publication;
                const publicationTitle = publication.title || publication.name || "Publication";
                const year = publication.year ? ` (${publication.year})` : "";
                return `${publicationTitle}${year}`;
              })}
              emptyText="Publications will appear here once shared."
            />
          </SectionCard>
        </div>

        <SectionCard title="Vision & Message">
          <div className="rounded-2xl border border-[#002147]/10 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-6">
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {researchInterests.length
                ? `The director's current focus includes ${researchInterests.join(", ")}.`
                : bio || "The director's message will be published here once the backend record includes it."}
            </p>
          </div>
        </SectionCard>
      </div>
    </motion.div>
  );
};

export default Director;
