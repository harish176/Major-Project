import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, BookOpen, ExternalLink, Archive } from 'lucide-react';

const NewslettersAndMagazines = () => {
  const resources = [
    {
      id: 1,
      title: 'Newsletters',
      description: 'Stay updated with the latest news, announcements, and developments from MANIT Bhopal through our regular newsletters.',
      icon: Newspaper,
      link: 'https://flip.manit.ac.in/newsletters/#',
      color: 'blue',
      features: [
        'Latest campus news and updates',
        'Academic announcements',
        'Student achievements',
        'Faculty publications',
        'Event highlights'
      ]
    },
    {
      id: 2,
      title: 'Magazines',
      description: 'Explore our collection of magazines featuring research articles, student contributions, and institutional highlights.',
      icon: BookOpen,
      link: 'https://flip.manit.ac.in/#',
      color: 'green',
      features: [
        'Research articles and papers',
        'Student literary contributions',
        'Technical articles',
        'Cultural events coverage',
        'Alumni stories'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'from-blue-500 to-blue-700',
          hover: 'hover:from-blue-600 hover:to-blue-800',
          text: 'text-blue-600',
          bgLight: 'bg-blue-50',
          border: 'border-blue-200'
        };
      case 'green':
        return {
          bg: 'from-green-500 to-green-700',
          hover: 'hover:from-green-600 hover:to-green-800',
          text: 'text-green-600',
          bgLight: 'bg-green-50',
          border: 'border-green-200'
        };
      default:
        return {
          bg: 'from-gray-500 to-gray-700',
          hover: 'hover:from-gray-600 hover:to-gray-800',
          text: 'text-gray-600',
          bgLight: 'bg-gray-50',
          border: 'border-gray-200'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Newspaper size={48} className="mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Newsletters & Magazines</h1>
            </div>
            <p className="text-indigo-100 text-lg">
              Digital Publications and Media Resources - MANIT Bhopal
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Main Resources Section */}
          <motion.section variants={itemVariants}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Access Our Digital Publications</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Discover the latest updates, research publications, and creative works from the MANIT community. 
                Click on the buttons below to explore our comprehensive digital library.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {resources.map((resource) => {
                const IconComponent = resource.icon;
                const colorClasses = getColorClasses(resource.color);
                
                return (
                  <motion.div
                    key={resource.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    {/* Card Header */}
                    <div className={`bg-gradient-to-r ${colorClasses.bg} p-6 text-white`}>
                      <div className="flex items-center justify-center mb-4">
                        <IconComponent size={48} />
                      </div>
                      <h3 className="text-2xl font-bold text-center">{resource.title}</h3>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <p className="text-gray-700 mb-6 text-center">
                        {resource.description}
                      </p>

                      {/* Features List */}
                      <div className={`${colorClasses.bgLight} ${colorClasses.border} border rounded-lg p-4 mb-6`}>
                        <h4 className={`font-semibold ${colorClasses.text} mb-3 flex items-center`}>
                          <Archive size={18} className="mr-2" />
                          What You'll Find:
                        </h4>
                        <ul className="space-y-2">
                          {resource.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center">
                              <div className={`w-2 h-2 ${resource.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'} rounded-full mr-3 flex-shrink-0`}></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Button */}
                      <motion.a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full bg-gradient-to-r ${colorClasses.bg} ${colorClasses.hover} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center group`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Explore {resource.title}</span>
                        <ExternalLink 
                          size={18} 
                          className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                        />
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Old Newsletter & Journals Section */}
          <motion.section variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Archive className="text-gray-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Old Newsletter & Journals</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Archive size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Archive Collection</h3>
              <p className="text-gray-600 mb-4">
                Access historical newsletters and journals from previous years. These archived publications 
                contain valuable information about MANIT's development, achievements, and milestones over time.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2">Newsletter Archives</h4>
                  <p className="text-sm text-gray-600">Historical newsletters from 2010 onwards</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2">Journal Archives</h4>
                  <p className="text-sm text-gray-600">Academic journals and research publications</p>
                </div>
              </div>

              <motion.button
                className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Browse Archives
              </motion.button>
            </div>
          </motion.section>

          {/* Information Box */}
          <motion.div
            variants={itemVariants}
            className="bg-indigo-50 rounded-lg p-6 border-l-4 border-indigo-600"
          >
            <div className="flex items-start">
              <Newspaper className="text-indigo-600 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-indigo-800 mb-2">About Our Publications</h3>
                <p className="text-indigo-700 text-sm leading-relaxed">
                  MANIT Bhopal's newsletters and magazines serve as important communication channels, 
                  showcasing our academic excellence, research contributions, and vibrant campus life. 
                  These publications are regularly updated and provide insights into the institution's 
                  ongoing activities, achievements, and future plans. They also feature student works, 
                  faculty research, and alumni success stories.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewslettersAndMagazines;