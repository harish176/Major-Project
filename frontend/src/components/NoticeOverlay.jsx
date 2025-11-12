import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, ChevronRight } from 'lucide-react';

const NoticeOverlay = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showSideButton, setShowSideButton] = useState(false);

  // Notice data from the Notice component
  const notices = [
    {
      id: 1,
      title: "Even and Odd Semester Supplementary Examination Notice October 2025 Only for UG (Admitted Upto Academic Year 2021-22) and PG (Admitted Upto Academic Year 2022-23) to Be Filled on MIS",
      date: "October 2025",
      isNew: true
    },
    {
      id: 2,
      title: "Even and Odd Semester Supplementary Examination Notice October 2025 Only for UG (Admitted from Academic Year 2022-23 to 2024-25) and PG (Admitted in the Academic Year from 2023-24 to 2024-25) to Be Filled on ERP Smile",
      date: "October 2025",
      isNew: true
    },
    {
      id: 3,
      title: "Opening of central Library at 8:30 am for cleaning purpose",
      date: "Recent",
      isNew: true
    },
    {
      id: 4,
      title: "Revised Choices for Group C (Open Elective)- UG VII Semester (2025) M.A.N.I.T. Bhopal",
      date: "26/09/2025",
      isNew: false
    },
    {
      id: 5,
      title: "One Day Workshop on Entrepreneurship Awareness Programme (EAP) Sponsored program by MSME under ESDP Scheme",
      date: "Upcoming",
      isNew: true
    },
    {
      id: 6,
      title: "Six Days Online ATAL FDP on Emerging Power Converter Topologies and Control Methods for Electric Vehicles and Renewable Energy Systems",
      date: "17th – 22nd November 2025",
      isNew: true
    }
  ];

  useEffect(() => {
    // Check if overlay has been shown today
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem('noticeOverlayLastShown');
    
    if (!lastShown || lastShown !== today) {
      setIsFirstVisit(true);
      setIsOverlayOpen(true);
      localStorage.setItem('noticeOverlayLastShown', today);
    } else {
      setShowSideButton(true);
    }
  }, []);

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setShowSideButton(true);
  };

  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
  };

  return (
    <>
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999]"
            onClick={(e) => e.target === e.currentTarget && handleCloseOverlay()}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white shadow-2xl w-1/2 h-full ml-auto overflow-hidden flex flex-col relative"
            >
              {/* Close Button - Fixed at top */}
              <button
                onClick={handleCloseOverlay}
                className="absolute top-2 right-2 z-[10000] p-1.5 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <X size={16} className="text-gray-700" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <Bell size={28} />
                  <div>
                    <h2 className="text-xl font-bold">Latest Notices</h2>
                    <p className="text-blue-100 text-sm">Important announcements</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 overflow-y-auto notice-overlay-scrollbar">
                <div className="space-y-3">
                  {notices.map((notice) => (
                    <motion.div
                      key={notice.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: notice.id * 0.05 }}
                      className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:border-blue-300 bg-white"
                    >
                      <div className="flex items-start space-x-2 mb-2">
                        {notice.isNew && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                            NEW
                          </span>
                        )}
                        <span className="text-xs text-gray-500 flex-shrink-0">{notice.date}</span>
                      </div>
                      <h3 className="font-medium text-gray-800 text-sm leading-relaxed mb-2 line-clamp-3">
                        {notice.title}
                      </h3>
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center space-x-1">
                        <span>Read more</span>
                        <ChevronRight size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 text-sm mb-3">
                    For more notices and updates
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full">
                    View All Notices
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Button */}
      <AnimatePresence>
        {showSideButton && !isOverlayOpen && (
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            onClick={handleOpenOverlay}
            className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 bg-gradient-to-b from-blue-600 to-purple-600 text-white p-2 rounded-l-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <div className="flex flex-col items-center space-y-1.5">
              <Bell size={18} className="animate-pulse" />
              <span className="font-medium text-xs tracking-wider">NOTICES</span>
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
                {notices.filter(n => n.isNew).length}
              </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 bg-gray-800 text-white text-xs px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Click to view notices
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-3 border-l-gray-800 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default NoticeOverlay;