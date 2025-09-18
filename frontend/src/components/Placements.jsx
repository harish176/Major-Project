import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- Data Extracted from ALl_BRANCHES_STATS.pdf ---
const placementData = {
  'Computer Science': {
    highest: 82,
    average: 25.2,
    percentage: 90.3,
    offers: { it: 180, core: 25, nonCore: 23 },
    currency: 'LPA',
  },
  'Electronics & Comm.': {
    highest: 52,
    average: 14.91,
    percentage: 65,
    offers: { it: 66, core: 13, nonCore: 15 },
    currency: 'LPA',
  },
  'Electrical': {
    highest: 52,
    average: 9,
    percentage: 83,
    offers: { it: 13, core: 28, nonCore: 57 },
    currency: 'LPA',
  },
  'Maths & Data Science': {
    highest: 13.2, // 1.1 LPM * 12 months
    average: 9, // 75k * 12 months
    percentage: 17.24,
    offers: { it: 2, core: 3, nonCore: 0 },
    currency: 'LPA (from Stipend)',
  },
  'Chemical': {
    highest: 15,
    average: 7.9,
    percentage: 82.4,
    offers: { it: 9, core: 44, nonCore: 8 },
    currency: 'LPA',
  },
  'Civil': {
    highest: 14.1,
    average: 8,
    percentage: 62.5,
    offers: { it: 6, core: 43, nonCore: 15 },
    currency: 'LPA',
  },
  'Metallurgical & Materials': {
    highest: 21,
    average: 9.5,
    percentage: 81,
    offers: { it: 14, core: 34, nonCore: 6 },
    currency: 'LPA',
  },
};

const departments = Object.keys(placementData);
const COLORS = ['#0ea5e9', '#10b981', '#f97316']; // Sky, Emerald, Orange for IT, Core, Non-Core

// --- Reusable Stat Card Component ---
const StatCard = ({ label, value, unit, currency }) => (
  <motion.div
    className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-md text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-2xl md:text-3xl font-bold text-[#002147]">
      {value}<span className="text-lg font-semibold">{unit}</span>
    </p>
    {currency && <p className="text-xs text-gray-400">{currency}</p>}
  </motion.div>
);

// --- Main Placement Statistics Component ---
export default function PlacementStats() {
  const [activeDept, setActiveDept] = useState(departments[0]);
  const data = placementData[activeDept];

  const packageChartData = [
    { name: 'Package', Highest: data.highest, Average: data.average },
  ];

  const offerChartData = [
    { name: 'IT Sector', value: data.offers.it },
    { name: 'Core Sector', value: data.offers.core },
    { name: 'Non-Core Sector', value: data.offers.nonCore },
  ].filter(d => d.value > 0);

  return (
    <>
       {/* Custom Keyframes for Blob Animation (same as research-showcase) */}
       <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
        <div className="relative isolate px-4 sm:px-6 lg:px-8 py-16">
          {/* Background Elements (same as research-showcase) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10"></div>
          <div className="absolute top-[-8rem] left-[-8rem] w-[25rem] h-[25rem] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 blur-3xl animate-blob -z-10"></div>
          <div className="absolute bottom-[-10rem] right-[-8rem] w-[28rem] h-[28rem] bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000 -z-10"></div>
          <div className="absolute top-[40%] left-[60%] w-[18rem] h-[18rem] bg-gradient-to-r from-green-300 to-teal-400 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000 -z-10"></div>
          
          {/* Header */}
          <header className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#002147]"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              MANIT Placement Highlights
            </motion.h1>
            <motion.p
              className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Department-wise placement statistics based on recent data.
            </motion.p>
          </header>

          {/* Department Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  activeDept === dept 
                    ? 'bg-[#002147] text-white shadow-lg' 
                    : 'bg-white/70 text-gray-700 hover:bg-white'
                } cursor-pointer`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Stats and Charts */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
                <StatCard label="Highest Package" value={data.highest} unit={data.currency.startsWith('LPA') ? ' LPA' : ''} currency={data.currency.includes('Stipend') ? data.currency : ''} />
                <StatCard label="Average Package" value={data.average} unit={data.currency.startsWith('LPA') ? ' LPA' : ''} currency={data.currency.includes('Stipend') ? data.currency : ''} />
                <StatCard label="Placement Rate" value={data.percentage} unit="%" />
              </div>

              {/* Charts Container */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Package Comparison Chart */}
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-md">
                   <h3 className="font-bold text-lg text-[#002147] mb-4 text-center">Package Comparison (LPA)</h3>
                   <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={packageChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                         <XAxis dataKey="name" tickLine={false} axisLine={false} />
                         <YAxis />
                         <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} />
                         <Legend />
                         <Bar dataKey="Highest" fill="#38bdf8" />
                         <Bar dataKey="Average" fill="#34d399" />
                      </BarChart>
                   </ResponsiveContainer>
                </div>

                {/* Offer Distribution Chart */}
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-[#002147] mb-4 text-center">Sector-wise Offer Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={offerChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {offerChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}
