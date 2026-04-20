import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { noticeAPI } from '../utils/api.js';

const NoticeOverlay = () => {
  const navigate = useNavigate();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showSideButton, setShowSideButton] = useState(false);
  const [notices, setNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [showAllNotices, setShowAllNotices] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const visibleNotices = showAllNotices ? notices : notices.slice(0, 5);
  const hasMoreNotices = notices.length > 5;
  const latestNoticeCount = notices.length > 5 ? 5 : notices.length;

  const getNoticeTimestamp = (notice) => {
    const dateValue = notice?.publishedAt || notice?.createdAt || notice?.updatedAt;
    const timestamp = dateValue ? new Date(dateValue).getTime() : 0;
    return Number.isNaN(timestamp) ? 0 : timestamp;
  };

  const getAssetUrl = (asset) => {
    if (!asset) {
      return null;
    }

    if (typeof asset === 'string') {
      return asset;
    }

    return (
      asset.url
      || asset.secure_url
      || asset.fileUrl
      || asset.fileURL
      || asset.downloadUrl
      || asset.path
      || asset.location
      || asset.Location
      || null
    );
  };

  const getPdfFileName = (notice) => {
    const pdfAsset = notice?.pdf;
    if (!pdfAsset) {
      return 'notice.pdf';
    }

    if (typeof pdfAsset === 'object') {
      return pdfAsset.original_filename
        || pdfAsset.filename
        || pdfAsset.name
        || pdfAsset.fileName
        || 'notice.pdf';
    }

    return 'notice.pdf';
  };

  const buildCloudinaryDownloadUrl = (pdfAsset, fallbackUrl) => {
    const publicId = pdfAsset?.public_id || pdfAsset?.publicId;
    if (!publicId) {
      return fallbackUrl;
    }

    const cloudName = pdfAsset?.cloud_name || pdfAsset?.cloudName;
    if (cloudName) {
      return `https://res.cloudinary.com/${cloudName}/raw/upload/fl_attachment/${publicId}`;
    }

    return fallbackUrl;
  };

  const handleDownloadPdf = async (notice) => {
    const rawPdfUrl = notice?.pdfUrl || getAssetUrl(notice?.pdf);
    const pdfUrl = buildCloudinaryDownloadUrl(notice?.pdf, rawPdfUrl);

    if (!pdfUrl) {
      return;
    }

    const fileName = getPdfFileName(notice);

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('Could not fetch PDF file');
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      // Fallback when cross-origin fetch is blocked: still open the file URL.
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.rel = 'noreferrer';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
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
        console.error('Failed to load notices:', error);
        setNotices([]);
      } finally {
        setLoadingNotices(false);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    // Check if overlay has been shown today
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem('noticeOverlayLastShown');
    
    if (!lastShown || lastShown !== today) {
      setIsOverlayOpen(true);
      localStorage.setItem('noticeOverlayLastShown', today);
    } else {
      setShowSideButton(true);
    }
  }, []);

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setShowSideButton(true);
    setShowAllNotices(false);
    setSelectedNotice(null);
  };

  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
  };

  const handleViewAllNotices = () => {
    handleCloseOverlay();
    navigate('/notice');
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
                    <p className="text-blue-100 text-sm">Important announcements ({latestNoticeCount})</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 overflow-y-auto notice-overlay-scrollbar">
                <div className="space-y-3">
                  {loadingNotices && (
                    <div className="text-sm text-gray-600">Loading notices...</div>
                  )}

                  {!loadingNotices && visibleNotices.length === 0 && (
                    <div className="text-sm text-gray-600">No notices available right now.</div>
                  )}

                  {!loadingNotices && visibleNotices.map((notice, index) => (
                    <motion.div
                      key={notice._id || notice.id || `${notice.title}-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:border-blue-300 bg-white cursor-pointer"
                      onClick={() => setSelectedNotice(notice)}
                    >
                      <div className="flex items-start space-x-2 mb-2">
                        {notice.isNew && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                            NEW
                          </span>
                        )}
                        <span className="text-xs text-gray-500 flex-shrink-0">{formatNoticeDate(notice)}</span>
                      </div>
                      <h3 className="font-medium text-gray-800 text-sm leading-relaxed mb-2 line-clamp-3">
                        {notice.title}
                      </h3>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedNotice(notice);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center space-x-1"
                      >
                        <span>Read more</span>
                        <ChevronRight size={14} />
                      </button>
                    </motion.div>
                  ))}

                  {!loadingNotices && hasMoreNotices && (
                    <button
                      onClick={() => setShowAllNotices((previous) => !previous)}
                      className="w-full border border-blue-200 text-blue-700 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                    >
                      {showAllNotices ? 'Show Less' : `Show More (${notices.length - 5} more)`}
                    </button>
                  )}
                </div>

                <div className="mt-6 p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 text-sm mb-3">
                    For more notices and updates
                  </p>
                  <button
                    onClick={handleViewAllNotices}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                  >
                    View All Notices
                  </button>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {selectedNotice && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 z-[10001] flex items-center justify-center p-4"
                  onClick={(event) => {
                    if (event.target === event.currentTarget) {
                      setSelectedNotice(null);
                    }
                  }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="bg-white w-full max-w-2xl max-h-[85vh] rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="flex items-start justify-between p-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 pr-4">{selectedNotice.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{formatNoticeDate(selectedNotice)}</p>
                      </div>
                      <button
                        onClick={() => setSelectedNotice(null)}
                        className="p-1.5 rounded-full hover:bg-gray-100"
                      >
                        <X size={16} className="text-gray-700" />
                      </button>
                    </div>

                    <div className="p-4 overflow-y-auto max-h-[calc(85vh-80px)] space-y-4">
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {selectedNotice.content || 'No additional description available for this notice.'}
                      </p>

                      {getAssetUrl(selectedNotice.image) && (
                        <img
                          src={getAssetUrl(selectedNotice.image)}
                          alt={selectedNotice.title}
                          className="w-full rounded-lg border border-gray-200"
                        />
                      )}

                      {(selectedNotice.pdfUrl || getAssetUrl(selectedNotice.pdf)) && (
                        <button
                          onClick={() => handleDownloadPdf(selectedNotice)}
                          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          Download PDF
                          <ChevronRight size={14} className="ml-1" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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
                {latestNoticeCount}
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