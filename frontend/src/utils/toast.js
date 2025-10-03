// Simple toast system that works with React 19
let toastContainer = null;
let toastId = 0;
let keyboardListenerAdded = false;

// Add keyboard support for closing toasts
const addKeyboardSupport = () => {
  if (keyboardListenerAdded) return;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toastContainer && toastContainer.children.length > 0) {
      // Close the most recent toast (last child)
      const lastToast = toastContainer.children[toastContainer.children.length - 1];
      if (lastToast) {
        removeToast(lastToast);
      }
    }
  });
  
  keyboardListenerAdded = true;
};

// Create toast container
const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 420px;
    `;
    document.body.appendChild(toastContainer);
    
    // Add keyboard support when container is first created
    addKeyboardSupport();
  }
  return toastContainer;
};

// Create individual toast element
const createToastElement = (message, type) => {
  const toast = document.createElement('div');
  const id = ++toastId;
  
  const colors = {
    success: { bg: '#10b981', border: '#059669', icon: '✓' },
    error: { bg: '#ef4444', border: '#dc2626', icon: '✕' },
    warning: { bg: '#f59e0b', border: '#d97706', icon: '⚠' },
    info: { bg: '#3b82f6', border: '#2563eb', icon: 'i' },
    loading: { bg: '#6b7280', border: '#4b5563', icon: '⟳' }
  };
  
  const color = colors[type] || colors.info;
  
  toast.style.cssText = `
    background: white;
    border-left: 4px solid ${color.border};
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 12px 16px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    pointer-events: auto;
    animation: slideIn 0.3s ease-out;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    color: #374151;
    position: relative;
    overflow: hidden;
  `;
  
  const icon = document.createElement('span');
  icon.style.cssText = `
    color: ${color.bg};
    font-weight: bold;
    font-size: 16px;
    ${type === 'loading' ? 'animation: spin 1s linear infinite;' : ''}
  `;
  icon.textContent = color.icon;
  
  const text = document.createElement('span');
  text.textContent = message;
  text.style.flex = '1';
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    padding: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;
    margin-left: 8px;
    flex-shrink: 0;
  `;
  
  // Add hover effects
  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.background = '#f3f4f6';
    closeBtn.style.color = '#374151';
  });
  
  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.background = 'none';
    closeBtn.style.color = '#9ca3af';
  });
  
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removeToast(toast);
  });
  
  toast.appendChild(icon);
  toast.appendChild(text);
  
  // Add close button to all toasts, but make it subtle for loading toasts
  if (type === 'loading') {
    closeBtn.style.opacity = '0.5';
    closeBtn.title = 'Cancel operation';
  } else {
    closeBtn.title = 'Close notification';
  }
  
  toast.appendChild(closeBtn);
  
  return { element: toast, id };
};

// Remove toast
const removeToast = (toastElement) => {
  if (toastElement && toastElement.parentNode) {
    toastElement.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => {
      if (toastElement.parentNode) {
        toastElement.parentNode.removeChild(toastElement);
      }
    }, 300);
  }
};

// Add CSS animations
const addToastStyles = () => {
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
};

// Initialize styles
addToastStyles();

// Success toast
export const showSuccess = (message, duration = 4000) => {
  const container = createToastContainer();
  const { element, id } = createToastElement(message, 'success');
  container.appendChild(element);
  
  const toastObj = { element, id };
  
  if (duration > 0) {
    setTimeout(() => removeToast(element), duration);
  }
  
  return toastObj;
};

// Error toast (stays longer since errors are important)
export const showError = (message, duration = 7000) => {
  const container = createToastContainer();
  const { element, id } = createToastElement(message, 'error');
  container.appendChild(element);
  
  // Error toasts stay longer so users can read them
  // Return the toast object so it can be manually dismissed if needed
  const toastObj = { element, id };
  
  if (duration > 0) {
    setTimeout(() => removeToast(element), duration);
  }
  
  return toastObj;
};

// Info toast
export const showInfo = (message) => {
  const container = createToastContainer();
  const { element } = createToastElement(message, 'info');
  container.appendChild(element);
  
  setTimeout(() => removeToast(element), 4000);
};

// Warning toast
export const showWarning = (message) => {
  const container = createToastContainer();
  const { element } = createToastElement(message, 'warning');
  container.appendChild(element);
  
  setTimeout(() => removeToast(element), 4000);
};

// Loading toast
export const showLoading = (message) => {
  const container = createToastContainer();
  const { element, id } = createToastElement(message, 'loading');
  container.appendChild(element);
  
  return { element, id };
};

// Dismiss a specific toast
export const dismissToast = (toast) => {
  if (!toast) return;
  
  // Handle both object format { element, id } and direct element
  if (toast.element) {
    removeToast(toast.element);
  } else if (toast.nodeType === Node.ELEMENT_NODE) {
    // Direct element passed
    removeToast(toast);
  }
};

// Dismiss all toasts with animation
export const dismissAllToasts = () => {
  if (toastContainer && toastContainer.children.length > 0) {
    // Convert HTMLCollection to array to avoid issues with changing collection
    const toasts = Array.from(toastContainer.children);
    toasts.forEach((toast, index) => {
      // Stagger the dismissal for a nice effect
      setTimeout(() => removeToast(toast), index * 100);
    });
  }
};

// Dismiss all toasts immediately (for cleanup)
export const clearAllToasts = () => {
  if (toastContainer) {
    toastContainer.innerHTML = '';
  }
};

// Custom toast with promise
export const showPromiseToast = async (promise, messages) => {
  const loadingToast = showLoading(messages.loading || 'Loading...');
  
  try {
    const result = await promise;
    dismissToast(loadingToast);
    showSuccess(messages.success || 'Success!');
    return result;
  } catch (error) {
    dismissToast(loadingToast);
    showError(messages.error || 'Error occurred!');
    throw error;
  }
};

// Validation-specific toasts
export const showValidationError = (field, message) => {
  showError(`${field}: ${message}`);
};

// Common validation messages
export const ValidationMessages = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 6 characters long',
  PASSWORD_MISMATCH: 'Passwords do not match',
  REQUIRED_FIELD: 'This field is required',
  LOGIN_SUCCESS: 'Login successful! Welcome back.',
  LOGIN_FAILED: 'Invalid email or password. Please try again.',
  SIGNUP_SUCCESS: 'Account created successfully! Please login.',
  SIGNUP_FAILED: 'Failed to create account. Please try again.',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Utility object for easier toast usage
export const toast = {
  success: (message, duration) => showSuccess(message, duration),
  error: (message, duration) => showError(message, duration),
  info: (message, duration) => showInfo(message, duration),
  loading: (message) => showLoading(message),
  dismiss: (toast) => dismissToast(toast),
  dismissAll: () => dismissAllToasts(),
  clear: () => clearAllToasts()
};