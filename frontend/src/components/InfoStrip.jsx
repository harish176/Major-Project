import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  GraduationCap, 
  Scale, 
  FileText, 
  Shield, 
  Newspaper, 
  Briefcase, 
  Gavel 
} from 'lucide-react';

const InfoStrip = () => {
  const infoItems = [
    {
      id: 1,
      title: 'Notice/Circular',
      icon: Bell,
      link: '/notice'
    },
    {
      id: 2,
      title: 'MANIT Alumni',
      icon: GraduationCap,
      link: 'https://www.manitbhopalalumni.com/',
      external: true
    },
    {
      id: 3,
      title: 'Acts & Rules',
      icon: Scale,
      link: '/acts-rules'
    },
    {
      id: 4,
      title: 'RTI and public Grievance',
      icon: FileText,
      link: '/rti-grievance'
    },
    {
      id: 5,
      title: 'Anti Ragging/Zero Ragging',
      icon: Shield,
      link: '/anti-ragging'
    },
    {
      id: 6,
      title: 'Newsletter/ Magazines',
      icon: Newspaper,
      link: '/newsletter'
    },
    {
      id: 7,
      title: 'Careers',
      icon: Briefcase,
      link: '/careers'
    },
    {
      id: 8,
      title: 'Tender',
      icon: Gavel,
      link: '/tender'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-2">
      <motion.div 
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 md:gap-2">
          {infoItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.a
                key={item.id}
                href={item.link}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transition: { duration: 0 }
                }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center justify-center p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all duration-75 cursor-pointer group"
              >
                <div className="mb-1 p-2 bg-white bg-opacity-90 rounded-full group-hover:bg-opacity-100 transition-all duration-75 shadow-md">
                  <IconComponent 
                    size={20} 
                    className="text-blue-700 group-hover:scale-110 transition-transform duration-75" 
                  />
                </div>
                <span className="text-xs font-medium text-center leading-tight text-white">
                  {item.title}
                </span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default InfoStrip;