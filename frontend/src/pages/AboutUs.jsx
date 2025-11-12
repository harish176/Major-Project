import React from 'react';

const AboutUs = () => {
  const campusStats = [
    { label: "Total Campus Area", value: "650 acres", icon: "🏞️" },
    { label: "Academic Block Area", value: "265 hectares", icon: "🏛️" },
    { label: "Office Building Area", value: "250 sq. m.", icon: "🏢" },
    { label: "Hostel Built Area", value: "14,011 sq. m.", icon: "🏠" },
    { label: "Staff Quarters Area", value: "25,116 sq. m.", icon: "🏘️" },
    { label: "Staff Quarters Count", value: "369 units", icon: "🏡" }
  ];

  const academicFacilities = [
    {
      title: "Computer Center",
      description: "A new computer center equipped with 200 latest systems providing state-of-the-art computing facilities"
    },
    {
      title: "Medical Facilities",
      description: "A dispensary with two medical doctors and weekly visits from expert doctors"
    },
    {
      title: "Auditorium",
      description: "An auditorium with seating capacity of 1000 persons for various events and ceremonies"
    },
    {
      title: "Dining Facilities",
      description: "Institute Cafeteria, Amul parlor, nest café huts, and fast food court"
    },
    {
      title: "Fitness Center",
      description: "A gymnastic hall equipped with modern gadgets for student fitness"
    }
  ];

  const sportsFacilities = [
    "Football Ground",
    "Track and Field Ground",
    "Cricket Ground",
    "Basketball Courts",
    "Volleyball Courts",
    "Sports Complex with Indoor Games",
    "Table Tennis Facilities",
    "Badminton Courts",
    "Meditation Hall"
  ];

  const hostelFacilities = [
    {
      type: "Boys Hostels",
      count: "7 Hostels",
      capacity: "2,500 students",
      features: "Indoor and outdoor games facilities in each hostel"
    },
    {
      type: "Girls Hostels", 
      count: "2 Hostels",
      capacity: "900 students",
      features: "Modern amenities and recreational facilities"
    }
  ];

  const residentialAmenities = [
    "Children Park",
    "Officers Club", 
    "Artificial Lake 'Lotus Lake'",
    "Boat Club",
    "Shopping Complex",
    "School for Children",
    "Post Office"
  ];

  const visitorAccommodation = [
    "Faculty/Officer Quarters",
    "Bachelor Flats",
    "Dormitory",
    "VIP Guest House",
    "Faculty Guest House"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About MANIT
          </h1>
          <p className="text-xl text-center text-green-100 max-w-3xl mx-auto">
            Maulana Azad National Institute of Technology - A Premier Technical Institution
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Commitment</h2>
          <div className="prose max-w-none text-gray-600 leading-relaxed text-center">
            <p className="text-lg mb-6">
              The Institute is successfully meeting the objective of producing skilled Technocrats of the 
              highest quality who are able to take up the challenges of the industries and Research 
              organizations of the country.
            </p>
            <p className="text-lg mb-6">
              MANIT offers various undergraduate and post graduate courses and research programs. 
              Under the peaceful and friendly environment, MANIT is producing technocrats who are 
              resources to the Nation and the world.
            </p>
            <p className="text-lg">
              Our bright students with excellent technical skills have always contributed to the 
              successes of various sections towards the technical group.
            </p>
          </div>
        </div>

        {/* Campus Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">MANIT Campus</h2>
          <p className="text-lg text-gray-600 mb-8">
            The total area of campus is 650 acres and protected by boundary wall and ring road. 
            The entire campus consists of administrative and academic buildings, workshop, library 
            and community center, residential area accommodation for students and staff and other 
            general amenities.
          </p>

          {/* Campus Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {campusStats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-blue-800 font-medium">
              The campus is divided into three main sections: Academic Sector, Hostel Section, and Residential Area, 
              each designed to provide comprehensive facilities for education, accommodation, and community living.
            </p>
          </div>
        </div>

        {/* Academic Sector */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Academic Sector</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academicFacilities.map((facility, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>

          {/* Sports Facilities */}
          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Sports & Recreation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sportsFacilities.map((sport, index) => (
                <div key={index} className="bg-white p-3 rounded shadow-sm text-center">
                  <span className="text-sm font-medium text-gray-700">{sport}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hostel Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Hostel Section</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {hostelFacilities.map((hostel, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">{hostel.type}</h3>
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Count:</strong> {hostel.count}</p>
                  <p className="text-gray-700"><strong>Capacity:</strong> {hostel.capacity}</p>
                  <p className="text-gray-700"><strong>Features:</strong> {hostel.features}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-medium">
              <strong>Built-in area of Hostels:</strong> 14,011 sq. m. providing comfortable accommodation 
              for over 3,400 students with modern amenities and recreational facilities.
            </p>
          </div>
        </div>

        {/* Residential Area */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Residential Area</h2>
          
          <div className="mb-6">
            <div className="bg-orange-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Staff Accommodation</h3>
              <p className="text-gray-700 mb-2"><strong>Built-in Area:</strong> 25,116 sq. m.</p>
              <p className="text-gray-700"><strong>Total Quarters:</strong> 369 units for faculty and staff</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {residentialAmenities.map((amenity, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded text-center">
                <span className="text-sm font-medium text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Accommodation */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Visitor Accommodation</h2>
          <p className="text-gray-600 mb-6">
            MANIT provides comprehensive accommodation facilities for visitors, guests, and temporary residents:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visitorAccommodation.map((accommodation, index) => (
              <div key={index} className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-center">
                <span className="font-medium text-indigo-800">{accommodation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Special Features */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Special Campus Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">🏞️ Lotus Lake</h4>
              <p className="text-green-100">
                An artificial lake created in 2014 with boat club facilities, providing a serene environment for relaxation and recreation.
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">🌳 Eco-Friendly Campus</h4>
              <p className="text-green-100">
                650-acre campus with extensive green spaces, protected by boundary walls and ring roads, creating a pollution-free learning environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;