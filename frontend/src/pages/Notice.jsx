import React from 'react'

const Notice = () => {
  const notices = [
    {
      id: 1,
      title: "Even and Odd Semester Supplementary Examination Notice October 2025 Only for UG (Admitted Upto Academic Year 2021-22) and PG (Admitted Upto Academic Year 2022-23) to Be Filled on MIS",
      date: "October 2025"
    },
    {
      id: 2,
      title: "Even and Odd Semester Supplementary Examination Notice October 2025 Only for UG (Admitted from Academic Year 2022-23 to 2024-25) and PG (Admitted in the Academic Year from 2023-24 to 2024-25) to Be Filled on ERP Smile",
      date: "October 2025"
    },
    {
      id: 3,
      title: "Opening of central Library at 8:30 am for cleaning purpose",
      date: "Recent"
    },
    {
      id: 4,
      title: "Revised Choices for Group C (Open Elective)- UG VII Semester (2025) M.A.N.I.T. Bhopal",
      date: "26/09/2025"
    },
    {
      id: 5,
      title: "One Day Workshop on Entrepreneurship Awareness Programme (EAP) Sponsored program by MSME under ESDP Scheme",
      date: "Upcoming"
    },
    {
      id: 6,
      title: "Exemption from Mandatory Use of FTMS Module under SAMARTH Portal for Certain Sections - reg.",
      date: "Recent"
    },
    {
      id: 7,
      title: "Time Table for Mid Term examination",
      date: "Recent"
    },
    {
      id: 8,
      title: "Circular for Shutdown of Power Supply",
      date: "Recent"
    },
    {
      id: 9,
      title: "Six Days Online ATAL FDP on Emerging Power Converter Topologies and Control Methods for Electric Vehicles and Renewable Energy Systems",
      date: "17th – 22nd November 2025"
    },
    {
      id: 10,
      title: "International Conference on Recent Trends in Functional Materials (ICRTFM-2025) Mode of Organization: Offline & Online",
      date: "1st to 3rd DEC 2025"
    },
    {
      id: 11,
      title: "1st International Conference on Statistics, Optimization and Machine Learning",
      date: "27th - 28th February, 2026"
    },
    {
      id: 12,
      title: "10th International Conference on Internet of Things and Connected Technologies (ICIoTCT) 2025 Mode of Organization: Hybrid",
      date: "December 18th – 19th, 2025"
    },
    {
      id: 13,
      title: "Short Term Training Programme (Hybrid Mode) Recent Advances in Civil Engg for Sustainable Development (RACESD-2025)",
      date: "Oct. 10 - 14, 2025"
    },
    {
      id: 14,
      title: "1st IEEE International Conference on Recent Trends in Computing and Smart Mobility (RCSM)",
      date: "December 5th – 6th, 2025"
    }
  ];

  const quickLinks = [
    "Registration / Examination",
    "NIRF",
    "ARIIA 2021",
    "Academic Calendar",
    "House Allotment",
    "Internal Complaints Committee (ICC)",
    "Faculty Recruitment",
    "Non-Teaching Recruitment",
    "Integrity Pact & Appointment of IEM",
    "Innovation",
    "SC/ST Cell",
    "Space Technology Incubation Centre",
    "Notices for Recruitment Drive",
    "Non-Teaching Recruitment",
    "BIS Corner",
    "Holiday 2025",
    "MANIT Web Services",
    "Regional Centre for Geodesy",
    "Unnat Bharat Abhiyan"
  ];

  return (
    <div className="notice-page">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Half - Latest News */}
          <div className="left-section">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 text-left">Latest News</h1>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg">
              <div className="divide-y divide-gray-200">
                {notices.map((notice, index) => (
                  <div key={notice.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <a 
                          href="#" 
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium leading-relaxed block text-left"
                          onClick={(e) => e.preventDefault()}
                        >
                          {notice.title}
                        </a>
                        <p className="text-xs text-gray-500 mt-1 text-left">{notice.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Half - Quick Links */}
          <div className="right-section">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 text-left">Quick Links</h1>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg">
              <div className="divide-y divide-gray-200">
                {quickLinks.map((link, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <a 
                          href="#" 
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium leading-relaxed block text-left"
                          onClick={(e) => e.preventDefault()}
                        >
                          {link}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notice
