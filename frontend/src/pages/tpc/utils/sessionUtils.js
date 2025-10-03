/**
 * Utility functions for extracting and managing sessions from TPC data
 */

/**
 * Extracts unique sessions from data array and returns sorted array
 * @param {Array} dataArray - Array of objects containing session information
 * @param {string} sessionKey - Key name for session property (default: 'session')
 * @returns {Array} - Sorted array of unique sessions
 */
export const extractSessionsFromData = (dataArray, sessionKey = 'session') => {
  const sessions = new Set();
  
  if (!dataArray || !Array.isArray(dataArray)) {
    return [];
  }
  
  dataArray.forEach(item => {
    const sessionData = item[sessionKey];
    if (sessionData && Array.isArray(sessionData)) {
      sessionData.forEach(session => sessions.add(session));
    }
  });
  
  return Array.from(sessions).sort();
};

/**
 * Extracts sessions from multiple data sources and returns combined unique sessions
 * @param {Array} dataSources - Array of objects with {data, sessionKey} structure
 * @returns {Array} - Sorted array of unique sessions from all sources
 */
export const extractSessionsFromMultipleSources = (dataSources) => {
  const sessions = new Set();
  
  dataSources.forEach(({ data, sessionKey = 'session' }) => {
    const sourceSessions = extractSessionsFromData(data, sessionKey);
    sourceSessions.forEach(session => sessions.add(session));
  });
  
  return Array.from(sessions).sort();
};

/**
 * Calculates pagination details for a given dataset
 * @param {Array} filteredData - Filtered array of data
 * @param {number} currentPage - Current page number
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Object} - Pagination details including totalPages, startIndex, endIndex, currentItems
 */
export const calculatePagination = (filteredData, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);
  
  return {
    totalPages,
    startIndex,
    endIndex,
    currentItems
  };
};

/**
 * Creates a page change handler function
 * @param {Function} setCurrentPage - State setter function for current page
 * @returns {Function} - Page change handler function
 */
export const createPageChangeHandler = (setCurrentPage) => {
  return (page) => {
    setCurrentPage(page);
  };
};

/**
 * Filters and searches data based on session and search term
 * @param {Array} data - Array of data to filter
 * @param {string} selectedSession - Selected session for filtering
 * @param {string} searchTerm - Search term for filtering
 * @param {Array} searchFields - Array of field names to search in
 * @param {string} sessionField - Field name for session (default: 'session')
 * @returns {Array} - Filtered and searched data
 */
export const filterAndSearchData = (data, selectedSession, searchTerm, searchFields, sessionField = 'session') => {
  // Filter by session
  const filtered = data.filter(item => {
    if (Array.isArray(item[sessionField])) {
      return item[sessionField].includes(selectedSession);
    }
    return item[sessionField] === selectedSession;
  });
  
  // Apply search if search term exists
  if (!searchTerm) return filtered;
  
  return filtered.filter(item => 
    searchFields.some(field => {
      const fieldValue = item[field];
      return fieldValue && fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
    })
  );
};

/**
 * Generates pagination button configuration
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {Array} - Array of button configurations
 */
export const renderPaginationButtons = (currentPage, totalPages) => {
  const buttons = [];
  
  // Previous button
  buttons.push({
    type: 'button',
    key: 'prev',
    page: currentPage - 1,
    disabled: currentPage === 1,
    label: 'Previous'
  });
  
  // Show first page
  if (currentPage > 3) {
    buttons.push({
      type: 'button',
      key: 'first',
      page: 1,
      label: '1'
    });
    
    if (currentPage > 4) {
      buttons.push({
        type: 'ellipsis',
        key: 'ellipsis1',
        label: '...'
      });
    }
  }
  
  // Show current page and surrounding pages
  for (let i = 0; i < Math.min(5, totalPages); i++) {
    let page;
    if (totalPages <= 5) {
      page = i + 1;
    } else if (currentPage <= 3) {
      page = i + 1;
    } else if (currentPage >= totalPages - 2) {
      page = totalPages - 4 + i;
    } else {
      page = currentPage - 2 + i;
    }
    
    if (page < 1 || page > totalPages) continue;
    
    // Skip if already shown as first page
    if (page === 1 && currentPage > 3) continue;
    // Skip if will be shown as last page
    if (page === totalPages && currentPage < totalPages - 2) continue;
    
    buttons.push({
      type: 'button',
      key: `page-${page}`,
      page: page,
      current: currentPage === page,
      label: page.toString()
    });
  }
  
  // Show last page
  if (currentPage < totalPages - 2) {
    if (currentPage < totalPages - 3) {
      buttons.push({
        type: 'ellipsis',
        key: 'ellipsis2',
        label: '...'
      });
    }
    
    buttons.push({
      type: 'button',
      key: 'last',
      page: totalPages,
      label: totalPages.toString()
    });
  }
  
  // Next button
  buttons.push({
    type: 'button',
    key: 'next',
    page: currentPage + 1,
    disabled: currentPage === totalPages,
    label: 'Next'
  });
  
  return buttons;
};

export default {
  extractSessionsFromData,
  extractSessionsFromMultipleSources,
  calculatePagination,
  createPageChangeHandler,
  filterAndSearchData,
  renderPaginationButtons
};