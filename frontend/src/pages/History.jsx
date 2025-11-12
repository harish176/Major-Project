import React from 'react';

const History = () => {
  const foundingFaculty = [
    { sno: 1, name: "Dr. C.S. BHATNAGAR", department: "Physics" },
    { sno: 2, name: "Shri S.S. SHARMA", department: "Chemistry" },
    { sno: 3, name: "H.L.KAPOOR", department: "Chemistry" },
    { sno: 4, name: "M.L. KHARE", department: "Physics" },
    { sno: 5, name: "Shri V.P. SINHA", department: "Mathematics" },
    { sno: 6, name: "Shri R.M. PALAIYA", department: "Mathematics" },
    { sno: 7, name: "Shri N.K.MITTAL", department: "Mechanical" }
  ];

  const timelineData = [
    {
      period: "1960-1969",
      events: [
        "1960: MACT started functioning at Govt. S.V. Polytechnic with 120 students and 7 faculty members",
        "1962: Shri J.N.Moudgill joined as the first principal of MACT",
        "1963: MACT shifted to new campus partially completed academic building",
        "1963: Five year program in Architecture (B. Arch) started",
        "1964: Institute shifted to its own building in present campus",
        "1964-1965: Hostel 1 and 2 started functioning, post office opened",
        "1966: Library and lecture hall G1 to G9 constructed, hostel 4 and 5 started",
        "1966: Industrial oriented M.Tech program in Thermal and Hydro Electrical started under UNESCO assistance",
        "1967: Hostel 6 completed",
        "1968: Two M.Tech courses in Engineering Material for Design and Hydro Electrical and Foundation Engineering started",
        "1969: Two M.Tech part time programs started to cater industrial needs"
      ]
    },
    {
      period: "1970-1979",
      events: [
        "1970-1971: Additional M.Tech part time course started",
        "1971: Student's cooperative store started",
        "1972: Bachelor degree program in Electronics and Communication engineering started",
        "1975: 12 new Type VIII quarters completed, Girl's Hostel of capacity 48 completed",
        "1976: Dispensary building, III and IV type quarters constructed",
        "1976: Journal of MACT started as academic improvement program",
        "1976: PORL started in collaboration with BHEL to test hydro machines"
      ]
    },
    {
      period: "1980-1989",
      events: [
        "1980: Lecture hall G7, G8 and G9, Workshop and library building completed",
        "1981: Full time M.Tech course on Stress and Vibration started",
        "1982-1984: First floor of D block, another Girls Hostel (capacity 48), PG classroom, C block and 8 bachelor's flats constructed",
        "1985: Silver jubilee auditorium renovated",
        "1986-1987: Bachelor degree in Computer Science and Engineering and three years MCA program started",
        "1988: First floor of J block constructed",
        "1989: Officer's club constructed"
      ]
    },
    {
      period: "1990-1999",
      events: [
        "1990: Two more M.Tech programs started, pension scheme implemented",
        "1991: 53 type IX quarters constructed, visitors hostel and dispensary extension completed",
        "1992: Masters program in urban development started with six laboratories",
        "1993: Type III quarters and new garage completed",
        "1994: Remaining part of first floor of B and C block completed",
        "1995: Two M.Tech courses (Maintenance Engineering and MMW) started, 12 VIII quarters constructed",
        "1996: M.Tech course in Industrial Designing started, MP Step building and type IX quarter constructed",
        "1997: Institute received academic autonomy, Energy Center, new guest hostel and 8 Type III duplex quarters completed, M.Tech program in Energy started",
        "1999: Second sump well and RCC overhead tank of capacity 750KL built"
      ]
    },
    {
      period: "2000-2009",
      events: [
        "2001: B.Tech course in IT started, beautification and widening of road from MANIT square completed",
        "2002: Institute received status of Deemed University, fully funded by MHRD Govt. of India",
        "2002: B.Tech curriculum revised, library modernized and computerized, internet facility and website launched",
        "2003: World Bank assisted Technical Education Quality Improvement Program (TEQUIP) started",
        "2004: First convocation held, Dr. Natrajan delivered convocation address",
        "2004: Second convocation held on 24th October, address by Governor Dr. Balram Jakhar",
        "2005: PG courses in Computer Engineering started, new department of GIS and remote sensing started",
        "2005: Third convocation held on 3rd November, address by Hon. Minister Shri Arjun Singh",
        "2006: New M.Tech Program and Masters of Business Administration (MBA) started",
        "2007: VLSI Laboratory established, IV convocation held on 27th April",
        "2007: Six new undergraduate programs started",
        "2008-2009: 5th and 6th convocations held"
      ]
    },
    {
      period: "2010-Present",
      events: [
        "2010: Student intake increased from 12 to 18, presently 29 M.Tech courses running",
        "2012: New girls hostel of capacity 600 built (currently housing about 900 students)",
        "2013: Boys hostel with capacity 1000 completed, sports complex and vehicle shed completed",
        "2014: Artificial lake 'Lotus Lake' and Boat club created",
        "2014: Department of Biological Science and Engineering established",
        "2014: Three centres of excellence established: Energy Centre, Remote GIS and GPS, and Nano Science and Engineering",
        "2014-2015: Four department blocks and new teaching block completed"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            History of MANIT
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            A Journey Through Time - From Maulana Azad College of Technology to Modern MANIT
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Foundation Story */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Beginning (1960)</h2>
          <div className="prose max-w-none text-gray-600 leading-relaxed">
            <p className="text-lg mb-6">
              Maulana Azad College of Technology (MACT) started functioning in 1960 at Govt. S.V. Polytechnic 
              with an intake of 120 students and seven dedicated faculty members. The institute is named after 
              the renowned educationalist and scholar, <strong>Maulana Abul Kalam Azad</strong>, former Union 
              Education Minister, Government of India.
            </p>
            <p className="text-lg mb-6">
              The foundation stone of the Institute building was laid by the Prime Minister, 
              late <strong>Pt. Jawaharlal Nehru</strong> on <strong>23rd April 1961</strong>. 
              At that time, Shri S.R. Beedkar, Principal of S.V. Polytechnic, served as the planning officer 
              of the institute.
            </p>
          </div>
        </div>

        {/* Founding Faculty */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Founding Faculty (1960)</h2>
          <p className="text-lg text-gray-600 mb-6">
            The seven founding faculty members who laid the foundation of excellence at MACT:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">S.No.</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Department</th>
                </tr>
              </thead>
              <tbody>
                {foundingFaculty.map((faculty) => (
                  <tr key={faculty.sno} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">{faculty.sno}</td>
                    <td className="border border-gray-300 px-4 py-3 font-medium">{faculty.name}</td>
                    <td className="border border-gray-300 px-4 py-3">{faculty.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 mt-4 italic">
            Shri J.N. Moudgill joined in 1962 as the first principal of MACT.
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Journey Through the Decades</h2>
          
          <div className="space-y-12">
            {timelineData.map((period, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index !== timelineData.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-full bg-blue-200"></div>
                )}
                
                {/* Period marker */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {period.period.split('-')[0]}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">{period.period}</h3>
                    <div className="space-y-3">
                      {period.events.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4"></div>
                          <p className="text-gray-700 leading-relaxed">{event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legacy Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Our Legacy Continues</h3>
          <p className="text-lg text-blue-100 max-w-4xl mx-auto">
            From a humble beginning with 120 students and 7 faculty members to becoming a premier 
            technical institution, MANIT has consistently evolved to meet the changing demands of 
            technology and society. The Institute has progressed into a higher level of education 
            center through steady development of infrastructure as well as academics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;