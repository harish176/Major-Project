import React from 'react';

const VisionGoals = () => {
  const visionPoints = [
    {
      icon: "🌍",
      title: "Global Recognition",
      description: "Establishing MANIT as a globally recognized center for technical and professional knowledge"
    },
    {
      icon: "🎓",
      title: "Excellence in Education",
      description: "Providing world-class technical education that meets international standards"
    },
    {
      icon: "🔬",
      title: "Research Innovation",
      description: "Fostering cutting-edge research and innovation in emerging technologies"
    },
    {
      icon: "🤝",
      title: "Industry Collaboration",
      description: "Building strong partnerships with industries and research organizations worldwide"
    }
  ];

  const missionComponents = [
    {
      icon: "💡",
      title: "Technical Competence",
      description: "Developing technical professionals with strong competence and expertise in their respective fields"
    },
    {
      icon: "🧠",
      title: "Logical Mindset",
      description: "Cultivating logical thinking and problem-solving abilities essential for modern challenges"
    },
    {
      icon: "⚖️",
      title: "Moral & Ethical Values",
      description: "Instilling strong moral and ethical values to create responsible professionals"
    },
    {
      icon: "💪",
      title: "Inner Strength",
      description: "Building inner strength and resilience to face future challenges with confidence"
    },
    {
      icon: "🚀",
      title: "Futuristic Approach",
      description: "Preparing students for futuristic requirements of global business and technology"
    },
    {
      icon: "🏛️",
      title: "National Economy",
      description: "Contributing to the strengthening of national economy through skilled professionals"
    }
  ];

  const strategicGoals = [
    {
      category: "Academic Excellence",
      goals: [
        "Maintain high standards in undergraduate and postgraduate programs",
        "Continuously update curriculum to meet industry demands",
        "Promote interdisciplinary learning and research",
        "Enhance faculty development and expertise"
      ]
    },
    {
      category: "Research & Innovation",
      goals: [
        "Establish centers of excellence in emerging technologies",
        "Promote collaborative research with national and international institutions",
        "Encourage student participation in research projects",
        "Develop intellectual property and patents"
      ]
    },
    {
      category: "Industry Partnership",
      goals: [
        "Strengthen industry-academia collaboration",
        "Facilitate internships and placement opportunities",
        "Develop industry-relevant skill development programs",
        "Create technology transfer mechanisms"
      ]
    },
    {
      category: "Infrastructure Development",
      goals: [
        "Modernize laboratories and research facilities",
        "Expand digital infrastructure and e-learning capabilities",
        "Develop sustainable and eco-friendly campus",
        "Enhance student amenities and recreational facilities"
      ]
    }
  ];

  const coreValues = [
    { value: "Excellence", description: "Striving for the highest standards in education, research, and service" },
    { value: "Innovation", description: "Encouraging creative thinking and innovative solutions to complex problems" },
    { value: "Integrity", description: "Maintaining honesty, transparency, and ethical conduct in all activities" },
    { value: "Inclusivity", description: "Promoting diversity and equal opportunities for all members of the community" },
    { value: "Sustainability", description: "Committed to environmental responsibility and sustainable development" },
    { value: "Service", description: "Dedicated service to society, nation, and the global community" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Vision & Goals
          </h1>
          <p className="text-xl text-center text-purple-100 max-w-3xl mx-auto">
            Shaping the Future of Technical Education and Innovation
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Vision Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
              <p className="text-xl font-medium">
                "MANIT looks forward to becoming a global centre for technical and professional knowledge"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {visionPoints.map((point, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{point.icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
              <p className="text-lg font-medium leading-relaxed">
                "To produce technical professionals abreast with competence, logical mindset, moral and ethical values 
                and inner strength synchronous with the futuristic requirement of global business so as to strengthen 
                the national economy"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {missionComponents.map((component, index) => (
              <div key={index} className="bg-green-50 border border-green-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{component.icon}</div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">{component.title}</h3>
                <p className="text-gray-600 text-sm">{component.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Goals */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Strategic Goals</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {strategicGoals.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-4 pb-2 border-b border-purple-200">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.goals.map((goal, goalIndex) => (
                    <li key={goalIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 p-6 rounded-lg text-center">
                <h3 className="text-lg font-bold text-orange-800 mb-3">{item.value}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Framework */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Implementation Framework</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Planning</h3>
              <p className="text-gray-600 text-sm">
                Strategic planning and resource allocation to achieve our vision and mission objectives
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Execution</h3>
              <p className="text-gray-600 text-sm">
                Systematic implementation of programs and initiatives with continuous monitoring
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Evaluation</h3>
              <p className="text-gray-600 text-sm">
                Regular assessment and feedback mechanisms to ensure continuous improvement
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Join Our Journey</h3>
          <p className="text-lg text-purple-100 max-w-3xl mx-auto mb-6">
            Together, we are building a future where MANIT stands as a beacon of excellence in technical education, 
            research, and innovation, contributing to the progress of our nation and the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg">
              <span className="font-medium">🎯 Excellence in Education</span>
            </div>
            <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg">
              <span className="font-medium">🔬 Innovation in Research</span>
            </div>
            <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg">
              <span className="font-medium">🌟 Service to Society</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionGoals;