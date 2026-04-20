import React, { useEffect, useState } from 'react'
import { noticeAPI } from '../utils/api.js';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);

  const getNoticeTimestamp = (notice) => {
    const dateValue = notice?.publishedAt || notice?.createdAt || notice?.updatedAt;
    const timestamp = dateValue ? new Date(dateValue).getTime() : 0;
    return Number.isNaN(timestamp) ? 0 : timestamp;
  };

  const formatNoticeDate = (notice) => {
    if (notice?.dateText) {
      return notice.dateText;
    }

    const dateValue = notice?.publishedAt || notice?.createdAt;
    if (dateValue) {
      const parsed = new Date(dateValue);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }
    }

    return 'Recent';
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoadingNotices(true);
        const response = await noticeAPI.getAllNotices();
        const fetchedNotices = response?.data?.data || [];
        const sortedNotices = [...fetchedNotices].sort((a, b) => getNoticeTimestamp(b) - getNoticeTimestamp(a));
        setNotices(sortedNotices);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
        setNotices([]);
      } finally {
        setLoadingNotices(false);
      }
    };

    fetchNotices();
  }, []);

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
                {loadingNotices && (
                  <div className="p-4 text-sm text-gray-600 text-left">Loading notices...</div>
                )}

                {!loadingNotices && notices.length === 0 && (
                  <div className="p-4 text-sm text-gray-600 text-left">No notices available right now.</div>
                )}

                {!loadingNotices && notices.map((notice, index) => (
                  <div key={notice._id || notice.id || `${notice.title}-${index}`} className="p-4 hover:bg-gray-50 transition-colors">
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
                        <p className="text-xs text-gray-500 mt-1 text-left">{formatNoticeDate(notice)}</p>
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
